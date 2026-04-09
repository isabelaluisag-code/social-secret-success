import { ReactNode } from "react";

interface SectionCardProps {
  number?: string;
  title: string;
  children: ReactNode;
}

const SectionCard = ({ number, title, children }: SectionCardProps) => {
  return (
    <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm animate-fade-in">
      <div className="flex items-start gap-4 mb-6">
        {number && (
          <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            {number}
          </span>
        )}
        <h2 className="text-xl md:text-2xl font-semibold text-foreground leading-tight pt-1">{title}</h2>
      </div>
      <div className="space-y-4 text-sm leading-relaxed text-secondary-foreground">{children}</div>
    </div>
  );
};

export default SectionCard;
