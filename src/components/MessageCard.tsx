import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface MessageCardProps {
  label: string;
  message: string;
  variant?: "coral" | "warm" | "sage";
}

const MessageCard = ({ label, message, variant = "coral" }: MessageCardProps) => {
  const [copied, setCopied] = useState(false);

  const bgMap = {
    coral: "bg-coral-light border-coral/20",
    warm: "bg-warm-light border-accent/20",
    sage: "bg-sage-light border-sage/20",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative rounded-lg border p-4 ${bgMap[variant]} group`}>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{label}</p>
      <p className="text-sm leading-relaxed text-foreground italic">"{message}"</p>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-1.5 rounded-md bg-card/80 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card"
        title="Copiar mensagem"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-sage" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
      </button>
    </div>
  );
};

export default MessageCard;
