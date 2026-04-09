import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import { Users, CheckCircle2, MessageSquare, Target } from "lucide-react";
import { CalendarIcon } from "lucide-react";
import { type Lead, STATUS_CONFIG, type LeadStatus } from "@/data/social-selling-data";

const PIE_COLORS = ["#3b82f6","#eab308","#ef4444","#22c55e","#6366f1","#6366f1","#6366f1","#6366f1","#8b5cf6","#8b5cf6","#14b8a6","#f97316","#10b981","#ec4899","#6b7280"];
const ALL_STATUSES: LeadStatus[] = ["novo","em_checagem","dia_1","dia_2","dia_3","dia_4","dia_5","dia_6","abordado","em_followup","respondeu","reuniao","oportunidade","perdido"];

interface Props {
  leads: Lead[];
}

const LeadershipCharts = ({ leads }: Props) => {
  const statusCounts = ALL_STATUSES
    .map(s => ({ name: STATUS_CONFIG[s].label, value: leads.filter(l => l.status === s).length }))
    .filter(d => d.value > 0);

  const nichoCounts = Object.entries(
    leads.reduce<Record<string, number>>((acc, l) => { acc[l.nicho] = (acc[l.nicho] || 0) + 1; return acc; }, {})
  ).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);

  const discardCounts = Object.entries(
    leads.filter(l => l.motivoDescarte).reduce<Record<string, number>>((acc, l) => { acc[l.motivoDescarte!] = (acc[l.motivoDescarte!] || 0) + 1; return acc; }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-6">
      {/* KPI Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: "Total de Leads", value: leads.length, icon: Users },
          { label: "Aprovados", value: leads.filter(l => !["novo","em_checagem"].includes(l.status)).length, icon: CheckCircle2 },
          { label: "Responderam", value: leads.filter(l => l.status === "respondeu").length, icon: MessageSquare },
          { label: "Reuniões", value: leads.filter(l => l.status === "reuniao").length, icon: CalendarIcon },
          { label: "Oportunidades", value: leads.filter(l => l.status === "oportunidade").length, icon: Target },
        ].map(k => (
          <div key={k.label} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <k.icon className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground font-body">{k.label}</span>
            </div>
            <p className="text-2xl font-bold font-body text-foreground">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Leads por Status */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-sm font-semibold font-body mb-3">Leads por Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusCounts} layout="vertical" margin={{ left: 80 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" fill="hsl(192, 80%, 30%)" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Leads por Nicho */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-sm font-semibold font-body mb-3">Leads por Nicho</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={nichoCounts} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({name, value}) => `${name}: ${value}`}>
                {nichoCounts.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Funil de conversão */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-sm font-semibold font-body mb-3">Funil de Conversão</h3>
          <div className="space-y-2">
            {[
              { label: "Total de Leads", value: leads.length },
              { label: "Em Checagem / Aprovados", value: leads.filter(l => !["novo","perdido"].includes(l.status)).length },
              { label: "Em Cadência", value: leads.filter(l => ["dia_1","dia_2","dia_3","dia_4","dia_5","dia_6"].includes(l.status)).length },
              { label: "Abordados", value: leads.filter(l => ["abordado","em_followup","respondeu","reuniao","oportunidade"].includes(l.status)).length },
              { label: "Responderam", value: leads.filter(l => ["respondeu","reuniao","oportunidade"].includes(l.status)).length },
              { label: "Reuniões", value: leads.filter(l => ["reuniao","oportunidade"].includes(l.status)).length },
              { label: "Oportunidades", value: leads.filter(l => l.status === "oportunidade").length },
            ].map((step, i) => (
              <div key={step.label}>
                <div className="flex justify-between text-xs font-body mb-1">
                  <span className="text-muted-foreground">{step.label}</span>
                  <span className="font-semibold">{step.value}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-primary/80 rounded-full h-3 transition-all"
                    style={{ width: `${leads.length > 0 ? (step.value / leads.length) * 100 : 0}%`, opacity: 1 - i * 0.12 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Motivos de Descarte */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-sm font-semibold font-body mb-3">Motivos de Descarte</h3>
          {discardCounts.length === 0 ? (
            <p className="text-sm text-muted-foreground font-body py-8 text-center">Nenhum descarte registrado</p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={discardCounts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(0, 84%, 60%)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Taxa de avanço */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-sm font-semibold font-body mb-3">Taxa de Avanço entre Etapas</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { from: "Novo → Checagem", value: leads.filter(l => l.status !== "novo").length, total: leads.length },
            { from: "Checagem → Cadência", value: leads.filter(l => !["novo","em_checagem"].includes(l.status)).length, total: leads.filter(l => l.status !== "novo").length || 1 },
            { from: "Cadência → Abordado", value: leads.filter(l => ["abordado","em_followup","respondeu","oportunidade"].includes(l.status)).length, total: leads.filter(l => ["dia_1","dia_2","dia_3","dia_4","dia_5","dia_6","abordado","em_followup","respondeu","oportunidade"].includes(l.status)).length || 1 },
            { from: "Abordado → Oportunidade", value: leads.filter(l => l.status === "oportunidade").length, total: leads.filter(l => ["abordado","em_followup","respondeu","oportunidade"].includes(l.status)).length || 1 },
          ].map(r => (
            <div key={r.from} className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-[11px] text-muted-foreground font-body mb-1">{r.from}</p>
              <p className="text-lg font-bold text-primary font-body">{Math.round((r.value / r.total) * 100)}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeadershipCharts;
