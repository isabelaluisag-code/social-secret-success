import { Link } from "react-router-dom";
import { ArrowLeft, Download, Search, Target, Lightbulb, ExternalLink, Users, Instagram } from "lucide-react";
import logoLegatto from "@/assets/logo-legatto.png";

const ComoUtilizar = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link to="/" className="p-1.5 rounded-lg hover:bg-muted transition-colors">
            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
          </Link>
          <img src={logoLegatto} alt="Legatto" className="h-12 w-auto" />
          <div className="h-5 w-px bg-border" />
          <p className="text-sm font-semibold text-foreground font-body">Como Utilizar</p>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 space-y-6">
        {/* Step 1 */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">1</div>
            <h2 className="text-lg font-bold text-foreground font-body">Instale a extensão Growman</h2>
          </div>
          <p className="text-sm text-muted-foreground font-body leading-relaxed">
            Acesse a Chrome Web Store e instale a extensão <strong className="text-foreground">Growman — IG Email Extractor</strong> no seu Google Chrome. Ela será essencial para extrair dados de seguidores do Instagram.
          </p>
          <a
            href="https://chromewebstore.google.com/detail/growman-ig-email-extracto/hndnabgpcmhdmaejoapophbidipmgnpb?hl=pt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Download className="w-4 h-4" />
            Instalar extensão Growman
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>

        {/* Step 2 */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center font-bold text-lg">2</div>
            <h2 className="text-lg font-bold text-foreground font-body">Identifique seu cliente ideal</h2>
          </div>
          <p className="text-sm text-muted-foreground font-body leading-relaxed">
            Lembre-se de quem é seu <strong className="text-foreground">cliente ideal</strong>. Pense: onde essas pessoas estão no Instagram? Quem elas seguem? Quais páginas elas acompanham?
          </p>

          <div className="bg-muted/50 border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground font-body">
              <Target className="w-4 h-4 text-primary" />
              Exemplo prático
            </div>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">
              Se os seus clientes ideais são <strong className="text-foreground">mentores</strong>, onde eles estão? Eles podem estar em:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground font-body">
              <li className="flex items-start gap-2">
                <Users className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Páginas de <strong className="text-foreground">mentorias para mentores</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <Users className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Comunidades de <strong className="text-foreground">masterminds</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <Instagram className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Perfis de pessoas que seu cliente ideal <strong className="text-foreground">admira ou segue</strong></span>
              </li>
            </ul>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">3</div>
            <h2 className="text-lg font-bold text-foreground font-body">Busque no Instagram</h2>
          </div>
          <p className="text-sm text-muted-foreground font-body leading-relaxed">
            Procure no Instagram perfis que possivelmente seu cliente ideal admira ou segue. Use a extensão Growman para extrair os seguidores dessas páginas e criar sua lista de prospecção.
          </p>
          <div className="flex items-center gap-2 bg-muted/50 border border-border rounded-lg px-4 py-3">
            <Search className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-body">Ex: "mentoria para mentores", "mastermind empresarial"...</span>
          </div>
        </div>

        {/* Dica Extra */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-foreground font-body">Dica extra</h2>
          </div>
          <p className="text-sm text-muted-foreground font-body leading-relaxed">
            Puxar os <strong className="text-foreground">seguidores do seu concorrente</strong> também é uma jogada de mestre! 🎯 Esses seguidores já demonstraram interesse no tipo de serviço que você oferece, tornando-os leads altamente qualificados.
          </p>
        </div>
      </main>

      <footer className="text-center py-4 text-xs text-muted-foreground border-t border-border font-body">
        Documento interno — Legatto
      </footer>
    </div>
  );
};

export default ComoUtilizar;
