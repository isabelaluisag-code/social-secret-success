import { Link } from "react-router-dom";
import { ArrowRight, Users, BookOpen, Shield, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import logoLegatto from "@/assets/logo-legatto.png";

const menuItems = [
  {
    title: "Como Utilizar — Growman",
    description: "Passo a passo para instalar a extensão Growman e encontrar seus clientes ideais no Instagram.",
    icon: BookOpen,
    href: "/como-utilizar",
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Rotina de Social Selling",
    description: "",
    icon: Users,
    href: "/helisse-bastos",
    color: "bg-accent/10 text-accent",
  },
];

const Home = () => {
  const { user, isAdmin, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/90 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-3">
          <img src={logoLegatto} alt="Legatto" className="h-12 w-auto" />
          <div className="h-5 w-px bg-border" />
          <p className="text-sm font-semibold text-foreground font-body flex-1">Painel de Operações</p>
          <span className="text-xs text-muted-foreground font-body hidden sm:block">{user?.email}</span>
          <Button variant="ghost" size="icon" onClick={signOut} title="Sair">
            <LogOut className="w-4 h-4" />
          </Button>
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
                {item.description && <p className="text-xs text-muted-foreground font-body mt-0.5">{item.description}</p>}
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
            </Link>
          ))}

          {isAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-4 bg-card border border-primary/20 rounded-xl p-5 hover:border-primary/50 hover:shadow-md transition-all group"
            >
              <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 bg-primary/10 text-primary">
                <Shield className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground font-body">Painel Admin</p>
                <p className="text-xs text-muted-foreground font-body mt-0.5">Ver todos os usuários cadastrados</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
            </Link>
          )}
        </div>
      </main>

      <footer className="text-center py-4 text-xs text-muted-foreground border-t border-border font-body">
        Documento interno — Legatto
      </footer>
    </div>
  );
};

export default Home;
