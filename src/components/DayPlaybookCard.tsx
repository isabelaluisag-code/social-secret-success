import { useState } from "react";
import { Copy, Check, Target, Lightbulb, ListChecks, XCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDayPlaybook } from "@/data/cadence-playbook";
import { toast } from "sonner";

interface Props { day: number; }

const DayPlaybookCard = ({ day }: Props) => {
  const pb = getDayPlaybook(day);
  const [copied, setCopied] = useState<number | null>(null);
  if (!pb) return null;

  const copy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    toast.success("Mensagem copiada");
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 space-y-3 text-xs font-body">
      <div className="flex items-start gap-2">
        <Target className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
        <div>
          <p className="font-bold text-foreground">Dia {pb.day} — {pb.title}</p>
          <p className="text-muted-foreground mt-0.5">{pb.goal}</p>
          <p className="text-[11px] text-primary italic mt-1">{pb.intent}</p>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <ListChecks className="w-3 h-3 text-emerald-600" />
          <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">O que fazer hoje</span>
        </div>
        <ul className="space-y-0.5 pl-4 list-disc text-foreground">
          {pb.actions.map((a, i) => <li key={i}>{a}</li>)}
        </ul>
      </div>

      {pb.tips.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <Lightbulb className="w-3 h-3 text-amber-600" />
            <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Dicas de tom</span>
          </div>
          <ul className="space-y-0.5 pl-4 list-disc text-muted-foreground">
            {pb.tips.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
      )}

      {pb.avoid.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <XCircle className="w-3 h-3 text-destructive" />
            <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Evite hoje</span>
          </div>
          <ul className="space-y-0.5 pl-4 list-disc text-muted-foreground">
            {pb.avoid.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </div>
      )}

      {pb.messageExamples.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <MessageSquare className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Modelos de mensagem</span>
          </div>
          <div className="space-y-2">
            {pb.messageExamples.map((m, i) => (
              <div key={i} className="bg-background border border-border rounded p-2 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-semibold text-primary uppercase tracking-wide">{m.context}</span>
                  <Button size="sm" variant="ghost" className="h-6 px-2 text-[10px] gap-1" onClick={() => copy(m.text, i)}>
                    {copied === i ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    {copied === i ? "Copiado" : "Copiar"}
                  </Button>
                </div>
                <p className="text-[11px] text-foreground leading-relaxed whitespace-pre-wrap">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DayPlaybookCard;
