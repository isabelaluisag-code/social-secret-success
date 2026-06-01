import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Search, Target, Lightbulb, ExternalLink, Users, Instagram, MousePointerClick, Play, FileDown, Upload, Sparkles, FileSpreadsheet, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logoLegatto from "@/assets/logo-legatto.png";
import growmanStep1 from "@/assets/growman-step1.png";
import growmanStep2 from "@/assets/growman-step2.png";
import growmanStep3 from "@/assets/growman-step3.png";

const ComoUtilizar = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
      "text/csv",
    ];
    if (!validTypes.includes(file.type)) {
      toast.error("Por favor, envie um arquivo Excel (.xlsx, .xls) ou CSV.");
      return;
    }

    setUploading(true);
    const fileName = `${Date.now()}_${file.name}`;
    const { error } = await supabase.storage
      .from("planilhas")
      .upload(fileName, file);

    if (error) {
      toast.error("Erro ao enviar o arquivo. Tente novamente.");
      console.error(error);
    } else {
      setUploadedFile(file.name);
      toast.success("Planilha enviada com sucesso! 🎉");
    }
    setUploading(false);
  };
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
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-px w-8 bg-border flex-shrink-0" />
            <span>Caso o Growman não funcione</span>
            <span className="h-px w-8 bg-border flex-shrink-0" />
          </div>
          <a
            href="https://chromewebstore.google.com/detail/igfollow-follower-export/pkafmmmfdgphkffldekomeaofhgickcg?hl=pt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-secondary/80 transition-colors"
          >
            <Download className="w-4 h-4" />
            Instalar IGFollow (alternativa)
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

        {/* Step 4 - Ativar extensão */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center font-bold text-lg">4</div>
            <h2 className="text-lg font-bold text-foreground font-body">Ative a extensão no perfil</h2>
          </div>
          <p className="text-sm text-muted-foreground font-body leading-relaxed">
            Após encontrar o perfil desejado, <strong className="text-foreground">clique no ícone da extensão Growman</strong> no canto superior direito do Chrome para ativá-la. Ela abrirá um painel lateral onde você poderá configurar a extração.
          </p>
          <div className="rounded-lg overflow-hidden border border-border">
            <img src={growmanStep1} alt="Perfil do Instagram para extração" className="w-full h-auto" />
          </div>
          <p className="text-xs text-muted-foreground font-body italic">
            Acesse o perfil do qual deseja extrair os seguidores e clique na extensão.
          </p>
        </div>

        {/* Step 5 - Configurar e iniciar */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">5</div>
            <h2 className="text-lg font-bold text-foreground font-body">Configure e clique em "Iniciar"</h2>
          </div>
          <p className="text-sm text-muted-foreground font-body leading-relaxed">
            No painel da extensão, digite o <strong className="text-foreground">@</strong> do perfil alvo, ative a opção <strong className="text-foreground">"Detalhado"</strong> para obter mais informações e clique no botão verde <strong className="text-foreground">"INICIAR"</strong>. A extensão começará a extrair os contatos automaticamente.
          </p>
          <div className="rounded-lg overflow-hidden border border-border">
            <img src={growmanStep2} alt="Painel do Growman com botão Iniciar" className="w-full h-auto" />
          </div>
          <div className="flex items-start gap-2 bg-muted/50 border border-border rounded-lg px-4 py-3">
            <Play className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-sm text-muted-foreground font-body">Clique em <strong className="text-foreground">INICIAR</strong> e aguarde a extração dos seguidores.</span>
          </div>
        </div>

        {/* Step 6 - Exportar para Excel */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center font-bold text-lg">6</div>
            <h2 className="text-lg font-bold text-foreground font-body">Exporte para Excel</h2>
          </div>
          <p className="text-sm text-muted-foreground font-body leading-relaxed">
            Após a extração, clique no botão <strong className="text-foreground">"EXPORTAR PERFIL PARA EXCEL"</strong> para baixar a planilha com todos os dados dos seguidores extraídos.
          </p>
          <div className="rounded-lg overflow-hidden border border-border">
            <img src={growmanStep3} alt="Tela de exportação do Growman" className="w-full h-auto" />
          </div>
          <div className="flex items-start gap-2 bg-muted/50 border border-border rounded-lg px-4 py-3">
            <FileDown className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-sm text-muted-foreground font-body">Clique em <strong className="text-foreground">"EXPORTAR PERFIL PARA EXCEL"</strong> para baixar a planilha.</span>
          </div>
        </div>

        {/* Step 7 - Filtrar com IA */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">7</div>
            <h2 className="text-lg font-bold text-foreground font-body">Filtre com Inteligência Artificial</h2>
          </div>
          <p className="text-sm text-muted-foreground font-body leading-relaxed">
            Suba a planilha exportada no <strong className="text-foreground">ChatGPT</strong> (ou outra IA) e peça para filtrar apenas os perfis que são seus clientes ideais. Isso vai organizar sua lista e deixar sua prospecção muito mais assertiva!
          </p>

          <div className="bg-muted/50 border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground font-body">
              <Sparkles className="w-4 h-4 text-primary" />
              Prompt exemplo
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-sm text-foreground font-body italic leading-relaxed">
                "Na planilha anexada, deixe apenas <strong className="text-primary">[seu cliente ideal]</strong> o restante exclua e me reenvie em Excel!"
              </p>
            </div>
            <p className="text-xs text-muted-foreground font-body">
              Substitua <strong className="text-foreground">[seu cliente ideal]</strong> pelo perfil que você deseja prospectar. Ex: "mentores", "coaches", "donos de e-commerce", etc.
            </p>
          </div>

          <div className="flex items-start gap-2 bg-primary/5 border border-primary/20 rounded-lg px-4 py-3">
            <Upload className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-sm text-muted-foreground font-body">
              Assim, a IA já organiza tudo pra você e te leva para um <strong className="text-foreground">caminho mais assertivo</strong>! 🎯
            </span>
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

        {/* Upload Section */}
        <div className="bg-card border-2 border-dashed border-primary/30 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-foreground font-body">Hora da mágica! ✨</h2>
          </div>
          <p className="text-sm text-muted-foreground font-body leading-relaxed">
            Após fazer a filtragem com a IA, <strong className="text-foreground">faça o upload da planilha aqui</strong> que a mágica irá acontecer!
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleUpload}
            className="hidden"
          />

          {uploadedFile ? (
            <div className="flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-lg px-5 py-4">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground font-body">Arquivo enviado!</p>
                <p className="text-xs text-muted-foreground font-body">{uploadedFile}</p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full flex items-center justify-center gap-3 bg-primary text-primary-foreground px-6 py-4 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Fazer upload da planilha
                </>
              )}
            </button>
          )}
        </div>
      </main>

      <footer className="text-center py-4 text-xs text-muted-foreground border-t border-border font-body">
        Documento interno — Legatto
      </footer>
    </div>
  );
};

export default ComoUtilizar;
