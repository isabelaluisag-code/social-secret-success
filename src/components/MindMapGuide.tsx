import { useState } from "react";
import {
  User, Eye, Lightbulb, Target, Heart, MessageSquare, XCircle, Star,
  Search, Zap, AlertTriangle, BookOpen, Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

/* ─── Data ─── */
const BRANCHES = [
  {
    id: "perfil", label: "Entrar no Perfil", icon: <User className="w-4 h-4" />, bg: "bg-blue-400", text: "text-white",
    items: ["Bio", "Feed", "Stories / Destaques", "Frequência de postagem", "Tipo de perfil", "Jeito de se comunicar"],
  },
  {
    id: "observar", label: "O que Observar", icon: <Eye className="w-4 h-4" />, bg: "bg-emerald-400", text: "text-white",
    items: ["Família e rotina pessoal", "Rotina profissional", "Equipe / sócios", "Bastidores do negócio", "Viagens / Lazer / Hobbies", "Datas especiais", "Causas e valores", "Reclamações ou desabafos", "Posts sobre cansaço ou sobrecarga"],
  },
  {
    id: "interpretar", label: "Como Interpretar", icon: <Lightbulb className="w-4 h-4" />, bg: "bg-amber-400", text: "text-white",
    items: ["Rotina dele(a)", "Prioridades do negócio", "Estilo de vida", "Momento profissional", "Dores ocultas", "Linguagem ideal de abordagem"],
  },
  {
    id: "icp", label: "Cruzamento com ICP", icon: <Target className="w-4 h-4" />, bg: "bg-rose-400", text: "text-white",
    items: ["Sobrecarga", "Centralização", "Dificuldade com equipe", "Falta de processo", "Dificuldade em vendas", "Desejo de crescer", "Necessidade de organização", "Desejo por mais tempo livre"],
  },
  {
    id: "links", label: "Links de Contato", icon: <Heart className="w-4 h-4" />, bg: "bg-violet-400", text: "text-white",
    items: ["Afinidade por rotina", "Afinidade por família", "Afinidade por hobbies", "Afinidade por bastidores", "Afinidade por desafios do negócio", "Afinidade por crescimento"],
  },
  {
    id: "abordagem", label: "Observação → Ação", icon: <MessageSquare className="w-4 h-4" />, bg: "bg-teal-400", text: "text-white",
    items: ["Adaptar o tom", "Curtir, comentar ou responder story", "Evitar mensagem genérica", "Priorizar contexto real", "Linguagem humana", "Familiaridade antes da abordagem"],
  },
  {
    id: "evitar", label: "O que Evitar", icon: <XCircle className="w-4 h-4" />, bg: "bg-red-400", text: "text-white",
    items: ["Não soar invasiva", "Não citar detalhes íntimos", "Não forçar intimidade", "Não interpretar demais", "Não parecer stalker", "Não abordar sem contexto"],
  },
  {
    id: "resultado", label: "Resultado Esperado", icon: <Star className="w-4 h-4" />, bg: "bg-indigo-400", text: "text-white",
    items: ["Abordagem natural", "Mais chance de resposta", "Conexão genuína", "Personalização real", "Social selling com intenção"],
  },
];

const EXAMPLES = [
  { obs: "Tem filhos", leitura: "Rotina corrida, valoriza organização", link: "Conteúdo sobre gestão do tempo" },
  { obs: "Postou sobre viagem", leitura: "Valoriza qualidade de vida", link: "Abordagem sobre liberdade e equilíbrio" },
  { obs: "Reclama de falta de tempo", leitura: "Dor de gestão / sobrecarga", link: "Conversa sobre processos e delegação" },
  { obs: "Mostra bastidores", leitura: "Orgulho da operação", link: "Elogio genuíno ao trabalho" },
  { obs: "Sobrecarregada(o)", leitura: "Centralização, dor ativa", link: "Empatia + solução prática" },
];

/* ─── Branch Column Component ─── */
const BranchColumn = ({ branch, side }: { branch: typeof BRANCHES[0]; side: "left" | "right" }) => (
  <div className={`flex items-start gap-2 ${side === "left" ? "flex-row-reverse" : "flex-row"}`}>
    <div className="flex flex-col items-center pt-3">
      <div className={`w-8 h-0.5 ${branch.bg}`} />
    </div>
    <div className="flex-1 min-w-0">
      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${branch.bg} ${branch.text} text-xs font-bold font-body shadow-sm mb-1.5`}>
        {branch.icon}
        {branch.label}
      </div>
      <div className={`space-y-1 ${side === "left" ? "text-right" : "text-left"}`}>
        {branch.items.map((item, i) => (
          <div
            key={i}
            className={`inline-block px-2.5 py-1 rounded-lg bg-muted/60 border border-border text-[11px] text-foreground font-body ${side === "left" ? "ml-auto block" : "mr-auto block"}`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ─── Main Component ─── */
const MindMapGuide = () => {
  const leftBranches = BRANCHES.slice(0, 4);
  const rightBranches = BRANCHES.slice(4);

  return (
    <div className="space-y-6">
      {/* Mind Map */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/20 flex items-center justify-between">
          <h2 className="text-sm font-bold font-body text-foreground flex items-center gap-2">
            <Search className="w-4 h-4 text-primary" />
            Mapa Mental — Como Analisar o Perfil do Seu Cliente Ideal
          </h2>
          <Badge variant="outline" className="text-[10px] font-body">Guia para Empreendedoras</Badge>
        </div>

        <div className="p-4 md:p-6 overflow-x-auto">
          <div className="min-w-[700px] grid grid-cols-[1fr_auto_1fr] gap-4 items-start">
            <div className="space-y-5 pt-2">
              {leftBranches.map(b => (
                <BranchColumn key={b.id} branch={b} side="left" />
              ))}
            </div>

            <div className="flex flex-col items-center justify-center pt-16">
              <div className="w-36 h-36 rounded-full bg-primary/10 border-2 border-primary flex flex-col items-center justify-center text-center shadow-lg">
                <Search className="w-6 h-6 text-primary mb-1" />
                <span className="text-xs font-bold text-primary font-body leading-tight px-3">
                  Analisar Perfil do Cliente Ideal
                </span>
              </div>
              <div className="w-0.5 h-6 bg-primary/30" />
              <div className="px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold font-body">
                Social Selling
              </div>
            </div>

            <div className="space-y-5 pt-2">
              {rightBranches.map(b => (
                <BranchColumn key={b.id} branch={b} side="right" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Principle */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <Zap className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700 font-body">
          <strong>Link de contato não é assunto aleatório.</strong> É um ponto natural de aproximação que nasce da leitura do perfil do seu cliente ideal.
        </p>
      </div>

      {/* Legend + Examples side by side */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-3 border-b border-border bg-muted/20">
            <h3 className="text-xs font-bold text-foreground font-body flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-primary" /> Legenda Rápida
            </h3>
          </div>
          <div className="divide-y divide-border">
            {[
              { icon: <Eye className="w-3.5 h-3.5 text-blue-600" />, title: "O que observar", desc: "Bio, feed, stories, bastidores, família, equipe, desabafos" },
              { icon: <Lightbulb className="w-3.5 h-3.5 text-amber-600" />, title: "O que pode significar", desc: "Sobrecarga, centralização, falta de processo, desejo de crescer" },
              { icon: <Heart className="w-3.5 h-3.5 text-rose-600" />, title: "Qual pode ser o link", desc: "Empatia, afinidade real, comentário contextual, elogio genuíno" },
            ].map((l, i) => (
              <div key={i} className="p-3 flex items-start gap-2">
                {l.icon}
                <div>
                  <p className="text-[10px] font-bold text-foreground font-body uppercase tracking-wide">{l.title}</p>
                  <p className="text-[11px] text-muted-foreground font-body mt-0.5">{l.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-3 border-b border-border bg-muted/20">
            <h3 className="text-xs font-bold text-foreground font-body flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-primary" /> Exemplos Práticos
            </h3>
          </div>
          <div className="divide-y divide-border">
            {EXAMPLES.map((ex, i) => (
              <div key={i} className="p-3 grid grid-cols-3 gap-2 text-[11px] font-body">
                <div><span className="font-semibold text-foreground">{ex.obs}</span></div>
                <div className="text-muted-foreground">{ex.leitura}</div>
                <div className="text-primary font-medium">{ex.link}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alert */}
      <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-rose-700 font-body">
          Olhe o conteúdo para <strong>identificar pistas de aderência ao seu cliente ideal</strong>, não como curiosidade.
        </p>
      </div>
    </div>
  );
};

export default MindMapGuide;
