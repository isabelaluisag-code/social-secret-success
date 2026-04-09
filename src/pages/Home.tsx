import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Users } from "lucide-react";
import logoLegatto from "@/assets/logo-legatto.png";

const menuItems = [
  {
    title: "Social Selling — Seguidores Março 2025",
    description: "Guia de mensagens para abordagem de seguidores existentes no Instagram. Meta: 97 seguidores/dia.",
    icon: MessageCircle,
    href: "/guia-mensagens",
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Social Selling — Helisse Bastos",
    description: "Operacional da Rejane: 129 leads qualificados divididos em 5 dias com cadência personalizada e scripts editáveis.",
    icon: Users,
    href: "/helisse-bastos",
    color: "bg-accent/10 text-accent",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/90 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-3">
          <img src={logoLegatto} alt="Legatto" className="h-12 w-auto" />
          <div className="h-5 w-px bg-border" />
          <p className="text-sm font-semibold text-foreground font-body">Painel de Operações</p>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-lg w-full space-y-4">
          <div className="text-center mb-8">
            <img src={logoLegatto} alt="Legatto" className="h-20 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-1">Legatto</h1>
            <p className="text-sm text-muted-foreground font-body">Selecione um módulo para acessar</p>
          </div>

          {menuItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center gap-4 bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all group"
            >
              <div className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground font-body">{item.title}</p>
                <p className="text-xs text-muted-foreground font-body mt-0.5">{item.description}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
            </Link>
          ))}
        </div>
      </main>

      <footer className="text-center py-4 text-xs text-muted-foreground border-t border-border font-body">
        Documento interno — Legatto
      </footer>
    </div>
  );
};

export default Home;
