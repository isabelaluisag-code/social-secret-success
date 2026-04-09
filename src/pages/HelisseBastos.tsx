import { useState, useEffect, useMemo, useCallback, useRef, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ArrowLeft, Users, CheckCircle2, Clock, AlertCircle, Search, Plus, X,
  ExternalLink, ChevronRight, BarChart3, Filter, Eye, ChevronDown, Columns3, BookOpen,
  Check, Copy, MessageSquare, Target, TrendingUp, XCircle, Send, CalendarIcon, Save,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  initialLeads, createCadence, STATUS_CONFIG,
  type Lead, type LeadStatus, type DiscardReason, type Priority,
} from "@/data/social-selling-data";
import logoLegatto from "@/assets/logo-legatto.png";
import MindMapGuide from "@/components/MindMapGuide";

const RechartsCharts = lazy(() => import("@/components/LeadershipCharts"));

const STORAGE_KEY = "social-selling-leads-v3";
const DB_ROW_ID = "helisse-bastos";

function loadLeadsFromLocal(): Lead[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return initialLeads;
}

function saveLeadsToLocal(leads: Lead[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  } catch { /* ignore */ }
}

async function loadLeadsFromDB(): Promise<Lead[] | null> {
  try {
    const { data, error } = await supabase
      .from("leads_data")
      .select("data")
      .eq("id", DB_ROW_ID)
      .maybeSingle();
    if (error || !data) return null;
    return data.data as unknown as Lead[];
  } catch { return null; }
}

async function saveLeadsToDB(leads: Lead[]) {
  try {
    await supabase
      .from("leads_data")
      .upsert({ id: DB_ROW_ID, data: leads as any, updated_at: new Date().toISOString() });
  } catch { /* ignore */ }
}

const NICHOS = ["Todos", "Dermatologia", "Nutrição e Emagrecimento", "Dentista", "Terapeuta e Fisioterapeuta", "Capilar", "Parcerias", "Outros"];
const ALL_STATUSES: LeadStatus[] = ["novo","em_checagem","dia_1","dia_2","dia_3","dia_4","dia_5","dia_6","abordado","em_followup","respondeu","reuniao","oportunidade","perdido"];
const DISCARD_OPTIONS: { value: DiscardReason; label: string }[] = [
  { value: null, label: "Nenhum" },
  { value: "hater", label: "Hater" },
  { value: "concorrente", label: "Concorrente" },
  { value: "sem_aderencia", label: "Sem aderência" },
  { value: "fake", label: "Fake" },
  { value: "dados_errados", label: "Dados errados" },
  { value: "outro", label: "Outro" },
];



const HelisseBastos = () => {
  const [leads, setLeads] = useState<Lead[]>(loadLeadsFromLocal);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("todos");
  const [filterNicho, setFilterNicho] = useState("Todos");
  const [showNewLead, setShowNewLead] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [kpiDetail, setKpiDetail] = useState<{ label: string; leads: Lead[] } | null>(null);
  const [page, setPage] = useState(0);
  const [dbLoaded, setDbLoaded] = useState(false);
  const PAGE_SIZE = 25;
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load from database on mount (takes priority over localStorage)
  useEffect(() => {
    let cancelled = false;
    loadLeadsFromDB().then(dbLeads => {
      if (cancelled) return;
      if (dbLeads && dbLeads.length > 0) {
        setLeads(dbLeads);
        saveLeadsToLocal(dbLeads);
      } else {
        // Only push to DB if localStorage has NON-default data (user actually edited something)
        const local = loadLeadsFromLocal();
        const hasCustomData = local.some(l => l.status !== "novo" || l.observacoes?.length > 0 || l.cadencia?.some(d => d.completedAt));
        if (hasCustomData) {
          saveLeadsToDB(local);
        }
        // If no custom data, just use initial leads without overwriting DB
      }
      setDbLoaded(true);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => setPage(0), [searchTerm, filterStatus, filterNicho]);

  const persistLeads = useCallback((updater: (prev: Lead[]) => Lead[]) => {
    setLeads((prev) => {
      const next = updater(prev);
      saveLeadsToLocal(next);
      // Debounce DB save to avoid too many requests
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => saveLeadsToDB(next), 500);
      return next;
    });
  }, []);

  const selectedLead = leads.find(l => l.id === selectedLeadId) || null;

  const filtered = useMemo(() => {
    return leads.filter(l => {
      if (l.perfilFechado) return false;
      if (l.motivoDescarte === "dados_errados") return false;
      if (searchTerm && !l.nome.toLowerCase().includes(searchTerm.toLowerCase()) && !l.instagram.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (filterStatus !== "todos" && l.status !== filterStatus) return false;
      if (filterNicho !== "Todos" && l.nicho !== filterNicho) return false;
      return true;
    });
  }, [leads, searchTerm, filterStatus, filterNicho]);

  const updateLead = (id: string, updates: Partial<Lead>) => {
    persistLeads((prev) => prev.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const activeLeads = useMemo(() => leads.filter(l => !l.perfilFechado && l.motivoDescarte !== "dados_errados"), [leads]);
  const perfisPrivados = useMemo(() => leads.filter(l => l.perfilFechado).length, [leads]);
  const dadosErrados = useMemo(() => leads.filter(l => l.motivoDescarte === "dados_errados").length, [leads]);

  const kpis = useMemo(() => {
    const s = { total: activeLeads.length, perfisPrivados, dadosErrados, checagem: 0, cadencia: 0, abordados: 0, responderam: 0, reunioes: 0, oportunidades: 0, atrasados: 0 };
    activeLeads.forEach(l => {
      if (l.status === "em_checagem") s.checagem++;
      if (["dia_1","dia_2","dia_3","dia_4","dia_5","dia_6"].includes(l.status)) s.cadencia++;
      if (l.status === "abordado" || l.status === "em_followup") s.abordados++;
      if (l.status === "respondeu") s.responderam++;
      if (l.status === "reuniao") s.reunioes++;
      if (l.status === "oportunidade") s.oportunidades++;
    });
    return s;
  }, [activeLeads, perfisPrivados, dadosErrados]);

  // Projeção de data de conclusão
  const projecao = useMemo(() => {
    const HORAS_POR_DIA = 2;
    const MIN_POR_LEAD_DIA = 15; // minutos médios por lead por dia de cadência
    const DIAS_CADENCIA = 6;
    const leadsPerDay = Math.floor((HORAS_POR_DIA * 60) / MIN_POR_LEAD_DIA); // ~8 leads/dia em paralelo
    const concluidos = activeLeads.filter(l => ["abordado","em_followup","respondeu","reuniao","oportunidade","perdido"].includes(l.status)).length;
    const pendentes = activeLeads.length - concluidos;
    const ciclos = Math.ceil(pendentes / leadsPerDay);
    const diasUteis = ciclos + DIAS_CADENCIA;
    // Calcular data fim pulando fins de semana
    const inicio = new Date(2025, 2, 25); // 25/03/2025
    let diasAdded = 0;
    const dataFim = new Date(inicio);
    while (diasAdded < diasUteis) {
      dataFim.setDate(dataFim.getDate() + 1);
      const dow = dataFim.getDay();
      if (dow !== 0 && dow !== 6) diasAdded++;
    }
    return { leadsPerDay, pendentes, concluidos, diasUteis, dataFim };
  }, [activeLeads]);

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const addNewLead = (data: { nome: string; instagram: string; linkPerfil: string; empresa: string; nicho: string }) => {
    const newLead: Lead = {
      id: `lead_${Date.now()}`,
      ...data,
      bio: "",
      postKeywords: "",
      abordagem: "",
      perfilFechado: false,
      bioOk: null,
      palavrasChave: "",
      aderenteIcp: null,
      motivoDescarte: null,
      status: "novo",
      responsavel: "Rejane",
      prioridade: "media",
      resultado: "",
      observacoes: [],
      cadencia: createCadence(),
      ultimaInteracao: null,
      criadoEm: new Date().toISOString().split("T")[0],
    };
    persistLeads((prev) => [newLead, ...prev]);
    setShowNewLead(false);
  };


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <img src={logoLegatto} alt="Legatto" className="h-6 w-auto" />
            <div>
              <p className="text-sm font-semibold text-foreground leading-tight font-body">Gestão de Social Selling</p>
              <p className="text-[11px] text-muted-foreground font-body">Helisse Bastos · Operacional: Rejane</p>
            </div>
          </div>
          <Button size="sm" onClick={() => setShowNewLead(true)} className="gap-1">
            <Plus className="w-4 h-4" /> Novo Lead
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <Tabs defaultValue="operacional" className="space-y-4">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="operacional" className="gap-2 font-body"><Eye className="w-4 h-4" /> Operacional</TabsTrigger>
            <TabsTrigger value="kanban" className="gap-2 font-body"><Columns3 className="w-4 h-4" /> Kanban</TabsTrigger>
            <TabsTrigger value="mindmap" className="gap-2 font-body"><BookOpen className="w-4 h-4" /> Guia</TabsTrigger>
            <TabsTrigger value="lideranca" className="gap-2 font-body"><BarChart3 className="w-4 h-4" /> Liderança</TabsTrigger>
          </TabsList>

          {/* ═══════ OPERACIONAL TAB ═══════ */}
          <TabsContent value="operacional" className="space-y-4">
            {/* KPIs */}
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-3">
              {[
                { label: "Perfis Privados", value: kpis.perfisPrivados, icon: XCircle, color: "text-orange-600", filter: () => leads.filter(l => l.perfilFechado) },
                { label: "Dados Errados", value: kpis.dadosErrados, icon: AlertCircle, color: "text-red-500", filter: () => leads.filter(l => l.motivoDescarte === "dados_errados") },
                { label: "Total Ativos", value: kpis.total, icon: Users, color: "text-primary", filter: () => activeLeads },
                { label: "Em Checagem", value: kpis.checagem, icon: Search, color: "text-yellow-600", filter: () => activeLeads.filter(l => l.status === "em_checagem") },
                { label: "Em Cadência", value: kpis.cadencia, icon: Clock, color: "text-indigo-600", filter: () => activeLeads.filter(l => ["dia_1","dia_2","dia_3","dia_4","dia_5","dia_6"].includes(l.status)) },
                { label: "Abordados", value: kpis.abordados, icon: Send, color: "text-teal-600", filter: () => activeLeads.filter(l => l.status === "abordado" || l.status === "em_followup") },
                { label: "Responderam", value: kpis.responderam, icon: MessageSquare, color: "text-emerald-600", filter: () => activeLeads.filter(l => l.status === "respondeu") },
                { label: "Reuniões", value: kpis.reunioes, icon: CalendarIcon, color: "text-cyan-600", filter: () => activeLeads.filter(l => l.status === "reuniao") },
                { label: "Oportunidades", value: kpis.oportunidades, icon: Target, color: "text-pink-600", filter: () => activeLeads.filter(l => l.status === "oportunidade") },
                { label: "Atrasados", value: kpis.atrasados, icon: AlertCircle, color: "text-red-600", filter: () => [] },
              ].map(k => (
                <div
                  key={k.label}
                  onClick={() => k.value > 0 && setKpiDetail({ label: k.label, leads: k.filter() })}
                  className={`bg-card border border-border rounded-lg p-3 transition-colors ${k.value > 0 ? "cursor-pointer hover:bg-muted/50 hover:border-primary/30" : ""}`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <k.icon className={`w-3.5 h-3.5 ${k.color}`} />
                    <span className="text-[11px] text-muted-foreground font-body truncate">{k.label}</span>
                  </div>
                  <p className={`text-xl font-bold font-body ${k.color}`}>{k.value}</p>
                </div>
              ))}
            </div>

            {/* KPI Detail Dialog */}
            <Dialog open={!!kpiDetail} onOpenChange={(open) => !open && setKpiDetail(null)}>
              <DialogContent className="max-w-lg max-h-[70vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-body">{kpiDetail?.label} ({kpiDetail?.leads.length})</DialogTitle>
                </DialogHeader>
                <div className="space-y-2 mt-2">
                  {kpiDetail?.leads.map(l => {
                    const sc = STATUS_CONFIG[l.status];
                    return (
                      <div
                        key={l.id}
                        onClick={() => { setKpiDetail(null); setSelectedLeadId(l.id); }}
                        className="flex items-center justify-between p-2.5 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium font-body text-foreground truncate">{l.nome}</p>
                          <p className="text-xs text-muted-foreground font-body">@{l.instagram} · {l.nicho}</p>
                        </div>
                        <span className={`shrink-0 ml-2 inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold font-body ${sc.color} ${sc.bg}`}>
                          {sc.label}
                        </span>
                      </div>
                    );
                  })}
                  {kpiDetail?.leads.length === 0 && (
                    <p className="text-center text-muted-foreground font-body text-sm py-6">Nenhum lead nesta categoria</p>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            {/* Projeção */}
            <div className="bg-card border border-border rounded-lg p-4 flex flex-wrap items-center gap-4 text-sm font-body">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-primary" />
                <span className="font-semibold text-foreground">Projeção de conclusão</span>
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 2h/dia</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> ~{projecao.leadsPerDay} leads/dia</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> {projecao.concluidos} concluídos</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-amber-500" /> {projecao.pendentes} pendentes</span>
                <span className="flex items-center gap-1"><CalendarIcon className="w-3 h-3" /> ~{projecao.diasUteis} dias úteis</span>
              </div>
              <div className="ml-auto">
                <Badge className="font-body text-xs bg-primary/10 text-primary border-primary/30">
                  Previsão: {projecao.dataFim.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })}
                </Badge>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Buscar por nome ou @..." className="pl-9 font-body" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[160px] font-body"><Filter className="w-3.5 h-3.5 mr-1" /><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos Status</SelectItem>
                  {ALL_STATUSES.map(s => <SelectItem key={s} value={s}>{STATUS_CONFIG[s].label}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={filterNicho} onValueChange={setFilterNicho}>
                <SelectTrigger className="w-[180px] font-body"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {NICHOS.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}
                </SelectContent>
              </Select>
              <span className="text-xs text-muted-foreground font-body">{filtered.length} leads</span>
            </div>

            {/* Lead Table */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      {["Nome","@Perfil","Nicho","Status","Prioridade","Resultado"].map(h => (
                        <th key={h} className="text-left px-3 py-2.5 text-xs font-semibold text-muted-foreground font-body">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE).map(lead => {
                      const sc = STATUS_CONFIG[lead.status];
                      return (
                        <tr
                          key={lead.id}
                          onClick={() => setSelectedLeadId(lead.id)}
                          className="border-b border-border last:border-0 hover:bg-muted/30 cursor-pointer transition-colors"
                        >
                          <td className="px-3 py-2.5 font-body font-medium text-foreground max-w-[200px] truncate">{lead.nome}</td>
                          <td className="px-3 py-2.5 font-body text-muted-foreground">@{lead.instagram}</td>
                          <td className="px-3 py-2.5">
                            <Badge variant="outline" className="font-body text-[11px]">{lead.nicho}</Badge>
                          </td>
                          <td className="px-3 py-2.5">
                            <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold font-body ${sc.color} ${sc.bg}`}>
                              {sc.label}
                            </span>
                          </td>
                          <td className="px-3 py-2.5">
                            <span className={`text-xs font-body flex items-center gap-1 ${lead.prioridade === "alta" ? "text-destructive" : lead.prioridade === "baixa" ? "text-muted-foreground" : "text-muted-foreground"}`}>
                              <span className={`w-2 h-2 rounded-full inline-block ${lead.prioridade === "alta" ? "bg-destructive" : lead.prioridade === "baixa" ? "bg-muted" : "bg-accent"}`} /> {lead.prioridade}
                            </span>
                          </td>
                          <td className="px-3 py-2.5 font-body text-muted-foreground text-xs max-w-[120px] truncate">{lead.resultado || "—"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {filtered.length === 0 && (
                <div className="py-12 text-center text-muted-foreground font-body">Nenhum lead encontrado</div>
              )}
              {filtered.length > PAGE_SIZE && (
                <div className="flex items-center justify-between px-3 py-2 border-t border-border">
                  <span className="text-xs text-muted-foreground font-body">
                    {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filtered.length)} de {filtered.length}
                  </span>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" disabled={page === 0} onClick={() => setPage(p => p - 1)} className="h-7 text-xs font-body">Anterior</Button>
                    <Button size="sm" variant="ghost" disabled={(page + 1) * PAGE_SIZE >= filtered.length} onClick={() => setPage(p => p + 1)} className="h-7 text-xs font-body">Próximo</Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* ═══════ KANBAN TAB ═══════ */}
          <TabsContent value="kanban" className="space-y-4">
            <div
              className="flex overflow-x-auto gap-3 pb-4 snap-x scroll-smooth"
              style={{ minHeight: 'calc(100vh - 240px)', WebkitOverflowScrolling: 'touch' }}
              onDragOver={e => {
                e.preventDefault();
                const container = e.currentTarget;
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const scrollSpeed = 15;
                if (x < 80) container.scrollLeft -= scrollSpeed;
                else if (x > rect.width - 80) container.scrollLeft += scrollSpeed;
              }}
            >
              {([
                { title: "Novos", statuses: ["novo"] as LeadStatus[], dropStatus: "novo" as LeadStatus, color: "border-blue-400" },
                { title: "Checagem", statuses: ["em_checagem"] as LeadStatus[], dropStatus: "em_checagem" as LeadStatus, color: "border-yellow-400" },
                { title: "Cadência", statuses: ["dia_1","dia_2","dia_3","dia_4","dia_5","dia_6"] as LeadStatus[], dropStatus: "dia_1" as LeadStatus, color: "border-indigo-400" },
                { title: "Abordados", statuses: ["abordado","em_followup"] as LeadStatus[], dropStatus: "abordado" as LeadStatus, color: "border-teal-400" },
                { title: "Responderam", statuses: ["respondeu"] as LeadStatus[], dropStatus: "respondeu" as LeadStatus, color: "border-emerald-400" },
                { title: "Reunião", statuses: ["reuniao"] as LeadStatus[], dropStatus: "reuniao" as LeadStatus, color: "border-cyan-400" },
                { title: "Oportunidades", statuses: ["oportunidade"] as LeadStatus[], dropStatus: "oportunidade" as LeadStatus, color: "border-pink-400" },
                { title: "Perdidos", statuses: ["perdido"] as LeadStatus[], dropStatus: "perdido" as LeadStatus, color: "border-gray-400" },
              ]).map(col => {
                const colLeads = activeLeads.filter(l => col.statuses.includes(l.status));
                return (
                  <div
                    key={col.title}
                    className={`flex-shrink-0 w-[260px] snap-start bg-muted/30 rounded-lg border-t-4 ${col.color} transition-colors`}
                    onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add("ring-2", "ring-primary/40"); }}
                    onDragLeave={e => { e.currentTarget.classList.remove("ring-2", "ring-primary/40"); }}
                    onDrop={e => {
                      e.preventDefault();
                      e.currentTarget.classList.remove("ring-2", "ring-primary/40");
                      const leadId = e.dataTransfer.getData("text/plain");
                      if (leadId) updateLead(leadId, { status: col.dropStatus });
                    }}
                  >
                    <div className="p-3 border-b border-border">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold font-body text-foreground">{col.title}</h3>
                        <Badge variant="secondary" className="text-[11px] font-body">{colLeads.length}</Badge>
                      </div>
                    </div>
                    <div className="p-2 space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto">
                      {colLeads.length === 0 && (
                        <p className="text-xs text-muted-foreground text-center py-4 font-body">Nenhum lead</p>
                      )}
                      {colLeads.map(lead => {
                        const sc = STATUS_CONFIG[lead.status];
                        return (
                          <div
                            key={lead.id}
                            draggable
                            onDragStart={e => {
                              e.dataTransfer.setData("text/plain", lead.id);
                              e.dataTransfer.effectAllowed = "move";
                              (e.currentTarget as HTMLElement).style.opacity = "0.5";
                            }}
                            onDragEnd={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                            onClick={() => setSelectedLeadId(lead.id)}
                            className="bg-card border border-border rounded-md p-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
                          >
                            <p className="text-sm font-medium font-body text-foreground truncate">{lead.nome}</p>
                            <p className="text-[11px] text-muted-foreground font-body mt-0.5">@{lead.instagram}</p>
                            <div className="flex items-center justify-between mt-2">
                              <Badge variant="outline" className="text-[10px] font-body">{lead.nicho}</Badge>
                              <span className={`text-[10px] font-semibold font-body ${sc.color}`}>{sc.label}</span>
                            </div>
                            {lead.prioridade === "alta" && (
                              <span className="text-[10px] text-red-600 font-body mt-1 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" /> Alta prioridade</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          {/* ═══════ GUIA / MIND MAP TAB ═══════ */}
          <TabsContent value="mindmap" className="space-y-4">
            <MindMapGuide />
          </TabsContent>

          {/* ═══════ LIDERANÇA TAB ═══════ */}
          <TabsContent value="lideranca" className="space-y-6">
            <Suspense fallback={<div className="flex justify-center py-12"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
              <RechartsCharts leads={leads} />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>

      {/* ═══════ LEAD DETAIL DIALOG ═══════ */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLeadId(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedLead && (
            <LeadDetail
              lead={selectedLead}
              onUpdate={(updates) => updateLead(selectedLead.id, updates)}
              onCopy={copyText}
              copiedId={copiedId}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* ═══════ NEW LEAD DIALOG ═══════ */}
      <Dialog open={showNewLead} onOpenChange={setShowNewLead}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle className="font-body">Novo Lead</DialogTitle></DialogHeader>
          <NewLeadForm onSubmit={addNewLead} onCancel={() => setShowNewLead(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

/* ═══════ LEAD DETAIL COMPONENT ═══════ */
function LeadDetail({ lead, onUpdate, onCopy, copiedId }: {
  lead: Lead;
  onUpdate: (updates: Partial<Lead>) => void;
  onCopy: (text: string, id: string) => void;
  copiedId: string | null;
}) {
  const [obsInput, setObsInput] = useState("");
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [dayObsDrafts, setDayObsDrafts] = useState<Record<number, string>>({});
  const [resultadoDraft, setResultadoDraft] = useState<string | null>(null);
  const [resultadoSaved, setResultadoSaved] = useState(false);
  const [aiComments, setAiComments] = useState<Record<number, string>>({});
  const [aiLoading, setAiLoading] = useState<Record<number, boolean>>({});
  const sc = STATUS_CONFIG[lead.status];

  const generateAiComment = async (dayIdx: number) => {
    setAiLoading(prev => ({ ...prev, [dayIdx]: true }));
    try {
      // Collect all saved observations from all days
      const observations = lead.cadencia
        .filter(d => (d.observationHistory?.length > 0))
        .flatMap(d => d.observationHistory.map(o => `Dia ${d.day}: ${o}`));
      // Also include general observations
      const allObs = [...lead.observacoes, ...observations];

      const { data, error } = await supabase.functions.invoke("generate-comment", {
        body: {
          leadName: lead.nome,
          leadBio: lead.bio,
          leadNicho: lead.nicho,
          leadKeywords: lead.postKeywords,
          observations: allObs,
        },
      });
      if (error) throw error;
      setAiComments(prev => ({ ...prev, [dayIdx]: data.comment }));
    } catch (err: any) {
      setAiComments(prev => ({ ...prev, [dayIdx]: `❌ Erro: ${err?.message || "Não foi possível gerar comentário."}` }));
    } finally {
      setAiLoading(prev => ({ ...prev, [dayIdx]: false }));
    }
  };

  const toggleTask = (dayIdx: number, taskIdx: number) => {
    const newCadencia = lead.cadencia.map((d, di) =>
      di === dayIdx ? { ...d, tasks: d.tasks.map((t, ti) => ti === taskIdx ? { ...t, completed: !t.completed } : t) } : d
    );
    const dayNumber = lead.cadencia[dayIdx]?.day ?? (dayIdx + 1);
    const cadenceStatus = `dia_${dayNumber}` as LeadStatus;
    const updates: Partial<Lead> = { cadencia: newCadencia, ultimaInteracao: new Date().toISOString().split("T")[0] };
    if (["novo", "em_checagem", "dia_1", "dia_2", "dia_3", "dia_4", "dia_5", "dia_6"].includes(lead.status)) {
      updates.status = cadenceStatus;
    }
    onUpdate(updates);
  };

  const saveDayObs = (dayIdx: number) => {
    const obs = (dayObsDrafts[dayIdx] ?? "").trim();
    if (!obs) return;
    const day = lead.cadencia[dayIdx];
    const history = [...(day?.observationHistory || []), obs];
    const newCadencia = lead.cadencia.map((d, di) => di === dayIdx ? { ...d, observation: "", observationHistory: history, observationSaved: true } : d);
    onUpdate({ cadencia: newCadencia });
    setDayObsDrafts(prev => { const n = { ...prev }; delete n[dayIdx]; return n; });
  };

  const setDayExecutionDate = (dayIdx: number, date: Date | undefined) => {
    const newCadencia = lead.cadencia.map((d, di) => di === dayIdx ? { ...d, executionDate: date ? date.toISOString().split("T")[0] : null } : d);
    // Auto-update status to match the cadence day being worked on
    const dayNumber = lead.cadencia[dayIdx]?.day ?? (dayIdx + 1);
    const cadenceStatus = `dia_${dayNumber}` as LeadStatus;
    const statusUpdate: Partial<Lead> = { cadencia: newCadencia };
    if (date && ["novo", "em_checagem", "dia_1", "dia_2", "dia_3", "dia_4", "dia_5", "dia_6"].includes(lead.status)) {
      statusUpdate.status = cadenceStatus;
    }
    onUpdate(statusUpdate);
  };

  const addObs = () => {
    if (!obsInput.trim()) return;
    onUpdate({ observacoes: [...lead.observacoes, obsInput.trim()] });
    setObsInput("");
  };

  const removeObs = (i: number) => {
    onUpdate({ observacoes: lead.observacoes.filter((_, idx) => idx !== i) });
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold font-body text-foreground">{lead.nome}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-muted-foreground font-body">@{lead.instagram}</span>
              <a href={lead.linkPerfil} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold font-body ${sc.color} ${sc.bg}`}>
            {sc.label}
          </span>
        </div>
        <Badge variant="outline" className="mt-2 font-body text-[11px]">{lead.nicho}</Badge>
      </div>

      {/* Qualification */}
      <div className="space-y-3 bg-muted/30 rounded-lg p-3">
        <h3 className="text-xs font-bold text-muted-foreground font-body uppercase tracking-wide">Qualificação do Perfil</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground font-body">Status</label>
            <Select value={lead.status} onValueChange={(v: LeadStatus) => onUpdate({ status: v })}>
              <SelectTrigger className="mt-1 font-body text-xs h-8"><SelectValue /></SelectTrigger>
              <SelectContent>{ALL_STATUSES.map(s => <SelectItem key={s} value={s} className="text-xs">{STATUS_CONFIG[s].label}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground font-body">Prioridade</label>
            <Select value={lead.prioridade} onValueChange={(v: Priority) => onUpdate({ prioridade: v })}>
              <SelectTrigger className="mt-1 font-body text-xs h-8"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="alta"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" /> Alta</span></SelectItem>
                <SelectItem value="media"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /> Média</span></SelectItem>
                <SelectItem value="baixa"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gray-300" /> Baixa</span></SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="text-xs text-muted-foreground font-body">Perfil fechado?</label>
            <Select value={lead.perfilFechado ? "sim" : "nao"} onValueChange={(v) => onUpdate({ perfilFechado: v === "sim" })}>
              <SelectTrigger className="mt-1 font-body text-xs h-8"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="nao">Não</SelectItem>
                <SelectItem value="sim">Sim</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox checked={lead.bioOk === true} onCheckedChange={(c) => onUpdate({ bioOk: !!c })} />
            <span className="text-xs font-body">O nome e a profissão estão certos?</span>
          </div>
        </div>

        {lead.status === "perdido" && (
        <div>
          <label className="text-xs text-muted-foreground font-body">Motivo de descarte</label>
          <Select value={lead.motivoDescarte || "none"} onValueChange={(v) => onUpdate({ motivoDescarte: v === "none" ? null : v as DiscardReason })}>
            <SelectTrigger className="mt-1 font-body text-xs h-8"><SelectValue /></SelectTrigger>
            <SelectContent>
              {DISCARD_OPTIONS.map(o => <SelectItem key={o.value || "none"} value={o.value || "none"}>{o.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        )}
      </div>

      {/* Bio & Keywords */}
      {lead.bio && (
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-muted-foreground font-body uppercase tracking-wide">Bio</h3>
          <p className="text-xs text-foreground font-body whitespace-pre-wrap bg-muted/30 rounded p-2">{lead.bio}</p>
        </div>
      )}

      {lead.postKeywords && (
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-muted-foreground font-body uppercase tracking-wide">Palavras-chave dos posts</h3>
          <div className="flex flex-wrap gap-1">
            {lead.postKeywords.split(",").map((k, i) => (
              <Badge key={i} variant="secondary" className="text-[10px] font-body">{k.trim()}</Badge>
            ))}
          </div>
        </div>
      )}


      {/* Observações (tags) */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-muted-foreground font-body uppercase tracking-wide">Observações</h3>
        {lead.observacoes.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {lead.observacoes.map((obs, i) => (
              <span key={i} className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-body bg-accent/20 text-accent-foreground border border-accent/30">
                {obs}
                <button onClick={() => removeObs(i)} className="hover:text-destructive"><X className="w-3 h-3" /></button>
              </span>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <Input value={obsInput} onChange={e => setObsInput(e.target.value)} placeholder="Adicionar observação..." className="text-xs font-body h-8" onKeyDown={e => { if (e.key === "Enter") { addObs(); (e.target as HTMLInputElement).blur(); } }} />
          <Button size="sm" variant="outline" onClick={() => { addObs(); }} className="h-8 font-body text-xs">Salvar</Button>
        </div>
      </div>

      {/* Resultado */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-muted-foreground font-body uppercase tracking-wide flex items-center gap-2">
          Resultado
          {lead.resultado && resultadoSaved && <span className="text-[10px] text-emerald-600 font-body flex items-center gap-1 normal-case tracking-normal"><Check className="w-3 h-3" /> Salvo</span>}
        </h3>
        <div className="flex gap-2">
          <Input
            value={resultadoDraft ?? lead.resultado}
            onChange={e => { setResultadoDraft(e.target.value); setResultadoSaved(false); }}
            placeholder="Ex: Agendou reunião, sem interesse..."
            className="text-xs font-body h-8"
            onKeyDown={e => {
              if (e.key === "Enter") {
                const val = resultadoDraft ?? lead.resultado;
                onUpdate({ resultado: val });
                setResultadoDraft(null);
                setResultadoSaved(true);
                (e.target as HTMLInputElement).blur();
              }
            }}
          />
          <Button size="sm" variant="default" onClick={() => {
            const val = resultadoDraft ?? lead.resultado;
            onUpdate({ resultado: val });
            setResultadoDraft(null);
            setResultadoSaved(true);
          }} className="h-8 font-body text-xs gap-1">
            <Save className="w-3 h-3" /> Salvar
          </Button>
        </div>
      </div>

      {/* Cadência */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-muted-foreground font-body uppercase tracking-wide">Cadência (6 dias)</h3>
        <div className="space-y-1">
          {lead.cadencia.map((day, dayIdx) => {
            const completed = day.tasks.filter(t => t.completed).length;
            const total = day.tasks.length;
            const isOpen = expandedDay === day.day;
            return (
              <div key={day.day} className="border border-border rounded-lg overflow-hidden">
                <button onClick={() => setExpandedDay(isOpen ? null : day.day)} className="w-full flex items-center justify-between px-3 py-2 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-2">
                    {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />}
                    <span className="text-xs font-semibold font-body">Dia {day.day}</span>
                    {day.executionDate && (
                      <span className="text-[10px] text-muted-foreground font-body">({day.executionDate})</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {(day.observationHistory?.length > 0) && <Save className="w-3 h-3 text-primary" />}
                    <span className="text-[11px] text-muted-foreground font-body">{completed}/{total}</span>
                    {completed === total && total > 0 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-3 pb-3 space-y-3 border-t border-border pt-2">
                    {/* Data de execução */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-muted-foreground font-body">Data de execução:</span>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm" className={cn("h-7 text-[11px] font-body gap-1", !day.executionDate && "text-muted-foreground")}>
                            <CalendarIcon className="w-3 h-3" />
                            {day.executionDate ? day.executionDate : "Selecionar data"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={day.executionDate ? new Date(day.executionDate + "T12:00:00") : undefined}
                            onSelect={(d) => setDayExecutionDate(dayIdx, d)}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      {day.executionDate && (
                        <button onClick={() => setDayExecutionDate(dayIdx, undefined)} className="text-muted-foreground hover:text-destructive">
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    {/* Tasks */}
                    {day.tasks.map((task, taskIdx) => (
                      <label key={task.id} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(dayIdx, taskIdx)} />
                        <span className={`text-xs font-body ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>{task.label}</span>
                      </label>
                    ))}

                    {/* Histórico de observações */}
                    {(day.observationHistory?.length > 0) && (
                      <div className="space-y-1 mt-2">
                        <span className="text-[10px] font-semibold text-muted-foreground font-body uppercase tracking-wide">Histórico</span>
                        <div className="space-y-1">
                          {day.observationHistory.map((obs, obsIdx) => (
                            <div key={obsIdx} className="flex items-start gap-2 px-2 py-1.5 rounded bg-muted/40 border border-border">
                              <Check className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" />
                              <span className="text-[11px] font-body text-foreground">{obs}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Nova observação */}
                    <div className="space-y-1.5 mt-2">
                      <Textarea
                        value={dayObsDrafts[dayIdx] ?? ""}
                        onChange={e => setDayObsDrafts(prev => ({ ...prev, [dayIdx]: e.target.value }))}
                        placeholder="Adicionar observação..."
                        className="text-xs font-body min-h-[50px]"
                      />
                      <Button size="sm" variant="default" onClick={() => saveDayObs(dayIdx)} className="h-7 text-[11px] font-body gap-1">
                        <Save className="w-3 h-3" /> Salvar observação
                      </Button>
                    </div>

                    {/* Comentário Estratégico com IA */}
                    <div className="space-y-1.5 mt-3 border-t border-border pt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-muted-foreground font-body uppercase tracking-wide">💡 Comentário Estratégico (IA)</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => generateAiComment(dayIdx)}
                          disabled={aiLoading[dayIdx]}
                          className="h-7 text-[11px] font-body gap-1"
                        >
                          {aiLoading[dayIdx] ? (
                            <>
                              <Clock className="w-3 h-3 animate-spin" /> Gerando...
                            </>
                          ) : (
                            <>
                              <TrendingUp className="w-3 h-3" /> Gerar comentário
                            </>
                          )}
                        </Button>
                      </div>
                      {aiComments[dayIdx] && (
                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-xs font-body text-foreground whitespace-pre-wrap">
                          {aiComments[dayIdx]}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════ NEW LEAD FORM ═══════ */
function NewLeadForm({ onSubmit, onCancel }: { onSubmit: (data: any) => void; onCancel: () => void }) {
  const [nome, setNome] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkPerfil, setLinkPerfil] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [nicho, setNicho] = useState("Outros");

  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs text-muted-foreground font-body">Nome *</label>
        <Input value={nome} onChange={e => setNome(e.target.value)} className="mt-1 font-body" />
      </div>
      <div>
        <label className="text-xs text-muted-foreground font-body">@ Instagram</label>
        <Input value={instagram} onChange={e => setInstagram(e.target.value)} className="mt-1 font-body" />
      </div>
      <div>
        <label className="text-xs text-muted-foreground font-body">Link do perfil</label>
        <Input value={linkPerfil} onChange={e => setLinkPerfil(e.target.value)} className="mt-1 font-body" />
      </div>
      <div>
        <label className="text-xs text-muted-foreground font-body">Empresa</label>
        <Input value={empresa} onChange={e => setEmpresa(e.target.value)} className="mt-1 font-body" />
      </div>
      <div>
        <label className="text-xs text-muted-foreground font-body">Nicho</label>
        <Select value={nicho} onValueChange={setNicho}>
          <SelectTrigger className="mt-1 font-body"><SelectValue /></SelectTrigger>
          <SelectContent>{NICHOS.filter(n => n !== "Todos").map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <div className="flex gap-2 pt-2">
        <Button onClick={() => { if (nome.trim()) onSubmit({ nome, instagram, linkPerfil, empresa, nicho }); }} className="flex-1 font-body">Adicionar</Button>
        <Button variant="outline" onClick={onCancel} className="font-body">Cancelar</Button>
      </div>
    </div>
  );
}

export default HelisseBastos;
