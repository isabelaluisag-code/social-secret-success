import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Menu, X, CheckCircle, AlertTriangle, ArrowRight, Target, Rocket, ArrowLeft } from "lucide-react";
import SectionCard from "@/components/SectionCard";
import MessageCard from "@/components/MessageCard";
import SideNav from "@/components/SideNav";
import logoLegatto from "@/assets/logo-legatto.png";

const navItems = [
  { id: "meta", label: "🎯 Meta diária", number: "🎯" },
  { id: "cronograma", label: "Cronograma", number: "📅" },
  { id: "regras", label: "Regras de ouro", number: "⚠️" },
  { id: "mensagens", label: "As 3 mensagens", number: "💬" },
  { id: "planilha", label: "Planilha", number: "📊" },
  { id: "respondeu", label: "Se ela respondeu", number: "→" },
  { id: "agendamento", label: "Agendar com a Fá", number: "📞" },
  { id: "nao-fazer", label: "NÃO fazer", number: "🚫" },
  { id: "abril", label: "Estratégias de Abril", number: "🚀" },
];

const Index = () => {
  const [activeId, setActiveId] = useState("cronograma");
  const [mobileNav, setMobileNav] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollTo = (id: string) => {
    setActiveId(id);
    setMobileNav(false);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0.1 }
    );
    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const setRef = (id: string) => (el: HTMLDivElement | null) => {
    sectionRefs.current[id] = el;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-xs font-body hidden sm:inline">Menu</span>
            </Link>
            <div className="h-5 w-px bg-border" />
            <img src={logoLegatto} alt="Legatto" className="h-8 w-auto" />
            <div className="h-6 w-px bg-border" />
            <div>
              <h1 className="text-sm font-display font-semibold text-foreground leading-tight">Guia de Mensagens</h1>
              <p className="text-xs text-muted-foreground font-body">Legatto — Instagram</p>
            </div>
          </div>
          <button
            onClick={() => setMobileNav(!mobileNav)}
            className="md:hidden p-2 rounded-md hover:bg-muted"
          >
            {mobileNav ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar Desktop */}
        <aside className="hidden md:block w-56 flex-shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-8 px-4 border-r border-border">
          <SideNav items={navItems} activeId={activeId} onSelect={scrollTo} />
        </aside>

        {/* Mobile Nav */}
        {mobileNav && (
          <div className="fixed inset-0 top-16 z-40 bg-card/95 backdrop-blur-md md:hidden overflow-y-auto p-6">
            <SideNav items={navItems} activeId={activeId} onSelect={scrollTo} />
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 max-w-3xl mx-auto px-4 md:px-8 py-8 space-y-8">
          {/* Hero */}
          <div className="text-center py-6">
            <img src={logoLegatto} alt="Legatto" className="h-12 mx-auto mb-4" />
            <div className="inline-flex items-center gap-2 bg-coral-light text-primary px-4 py-1.5 rounded-full text-xs font-semibold mb-3">
              <MessageCircle className="w-3.5 h-3.5" /> DOCUMENTO INTERNO
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
              Guia de Mensagens — Instagram
            </h1>
            <p className="text-base text-muted-foreground font-body">
              Foco: profissionais da <strong>saúde e bem-estar</strong>
            </p>
          </div>

          {/* ════════════════════════════════════════ */}
          {/* META DIÁRIA */}
          {/* ════════════════════════════════════════ */}
          <div id="meta" ref={setRef("meta")}>
            <div className="bg-primary text-primary-foreground rounded-xl p-6 text-center">
              <Target className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <p className="font-display text-2xl font-bold mb-1">Meta diária</p>
              <p className="text-4xl font-bold font-display mb-2">97 seguidores / dia</p>
              <p className="text-sm opacity-90 mb-4">Checar 97 perfis por dia útil até 31/03 — enviar mensagem apenas para quem é da <strong>área da saúde e bem-estar</strong></p>
              <div className="bg-white/10 rounded-lg p-3 inline-block">
                <p className="text-xs opacity-80">Começamos hoje — vamos testar quanto tempo leva!</p>
              </div>
            </div>
          </div>

          {/* ════════════════════════════════════════ */}
          {/* CRONOGRAMA / LINHA DO TEMPO */}
          {/* ════════════════════════════════════════ */}
          <div id="cronograma" ref={setRef("cronograma")}>
            <SectionCard title="📅 Cronograma — O que fazer e quando">
              <div className="space-y-4">
                {/* Fase 1 */}
                <div className="border-l-4 border-primary pl-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded">AGORA → ATÉ 31/03</span>
                  </div>
                   <h3 className="font-display font-semibold text-foreground text-base mb-1">Fase 1 — Seguidores atuais</h3>
                   <p className="text-sm text-secondary-foreground">
                     Vá na lista de seguidores e cheque cada perfil. <strong>Só mande mensagem para quem é da área da saúde e bem-estar.</strong> Os outros perfis, apenas pule.
                   </p>
                </div>

                {/* Fase 2 */}
                <div className="border-l-4 border-muted-foreground/40 pl-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-muted text-muted-foreground text-xs font-bold px-2.5 py-1 rounded">A PARTIR DE 01/04</span>
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-base mb-1">Fase 2 — Novos contatos</h3>
                  <p className="text-sm text-secondary-foreground">
                    Depois de terminar todos os seguidores, vamos definir juntas os próximos contatos e estratégias. <strong>Por enquanto, foque só nos seguidores.</strong>
                  </p>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* ════════════════════════════════════════ */}
          {/* REGRAS DE OURO */}
          {/* ════════════════════════════════════════ */}
          <div id="regras" ref={setRef("regras")}>
            <SectionCard title="⚠️ Regras — Só mandar para SAÚDE e BEM-ESTAR">
              <p className="font-semibold text-foreground mb-3">✅ Mandar mensagem APENAS para:</p>
              <div className="space-y-1.5 mb-4">
                 {[
                   "🩺 Médicas, dentistas, fisioterapeutas, nutricionistas, psicólogas, fonoaudiólogas, enfermeiras...",
                   "💆 Esteticistas, personal trainers, terapeutas, coaches de saúde, pilates, yoga...",
                   "💅 Profissionais de bem-estar em geral (spa, massagem, acupuntura, etc.)",
                 ].map((i) => (
                   <div key={i} className="flex items-start gap-2 bg-coral-light/50 rounded-md px-3 py-2 text-sm font-medium">
                     <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />{i}
                   </div>
                 ))}
              </div>

              <p className="font-semibold text-foreground mb-3">🚫 NÃO mandar mensagem para:</p>
              <div className="space-y-1.5">
                 {[
                   "❌ Advogadas — pular SEMPRE",
                   "❌ Quem vende produto (loja, e-commerce, artesanato, moda) — pular",
                   "❌ Outras áreas que NÃO são saúde/bem-estar — pular",
                   "❌ Perfis de homens (nosso público é feminino)",
                   "❌ Perfis sem informação na bio / empresas grandes",
                 ].map((i) => (
                   <div key={i} className="flex items-start gap-2 bg-destructive/5 border border-destructive/10 rounded-md px-3 py-2 text-sm">
                     <AlertTriangle className="w-3.5 h-3.5 text-destructive mt-0.5 flex-shrink-0" />{i}
                   </div>
                 ))}
              </div>

              <div className="bg-warm-light rounded-lg p-4 mt-4">
                <p className="text-sm text-secondary-foreground">
                  <strong>Resumo rápido:</strong> Olhou o perfil → é mulher da área da saúde ou bem-estar? → MANDA. Qualquer outra coisa → PULA.
                </p>
              </div>
            </SectionCard>
          </div>

          {/* ════════════════════════════════════════ */}
          {/* AS 3 MENSAGENS */}
          {/* ════════════════════════════════════════ */}
          <div id="mensagens" ref={setRef("mensagens")}>
            <SectionCard title="💬 As 3 mensagens — Copie e envie nessa ordem">
              <p className="mb-3">A mensagem é <strong>a mesma para todo mundo</strong>. Envie as 3 em sequência, uma atrás da outra:</p>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">1</span>
                    <p className="text-sm font-semibold text-foreground">Quebra de gelo</p>
                  </div>
                  <MessageCard label="Copiar msg 1" message="Buenasss tudo bem? Que bom você por aqui, to tirando um tempinho para interagir com as pessoas por aqui!" />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-xs font-bold">2</span>
                    <p className="text-sm font-semibold text-foreground">Compartilhar a Legatto</p>
                  </div>
                  <MessageCard label="Copiar msg 2" message="Aproveitando, compartilho o insta da Legatto com você! Lá a gente posta bastante conteúdo sobre gestão, vendas e estrutura de negócio 👉 https://www.instagram.com/legatto/" variant="warm" />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-full bg-sage flex items-center justify-center text-white text-xs font-bold">3</span>
                    <p className="text-sm font-semibold text-foreground">Abrir conversa</p>
                  </div>
                  <MessageCard label="Copiar msg 3" message="Me conta, como estão os desafios por aí? 😊" variant="sage" />
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-4">
                <p className="text-sm text-secondary-foreground">
                  <strong>Importante:</strong> Mande as 3 mensagens seguidas. Não precisa esperar resposta entre uma e outra. Depois de mandar, passe para a próxima pessoa.
                </p>
              </div>
            </SectionCard>
          </div>

          {/* ════════════════════════════════════════ */}
          {/* PLANILHA */}
          {/* ════════════════════════════════════════ */}
          <div id="planilha" ref={setRef("planilha")}>
            <SectionCard title="📊 Planilha — Registrar todo dia">
              <p className="mb-3">Depois de mandar mensagem, anote na planilha. Só precisa de duas informações:</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-coral-light/50 rounded-lg p-4 text-center">
                  <p className="text-lg font-bold text-primary">Nome</p>
                  <p className="text-xs text-muted-foreground mt-1">Nome da pessoa</p>
                </div>
                <div className="bg-warm-light rounded-lg p-4 text-center">
                  <p className="text-lg font-bold text-accent">@</p>
                  <p className="text-xs text-muted-foreground mt-1">Arroba do Instagram</p>
                </div>
              </div>
              <a
                href="https://docs.google.com/spreadsheets/d/1YpzzshNRcYVsN1atLe2ELTOFwCRCgHBA/edit?usp=sharing&ouid=116760956957557564850&rtpof=true&sd=true"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors w-full justify-center"
              >
                📊 Abrir Planilha de Registro
              </a>
            </SectionCard>
          </div>

          {/* ════════════════════════════════════════ */}
          {/* SE ELA RESPONDEU */}
          {/* ════════════════════════════════════════ */}
          <div id="respondeu" ref={setRef("respondeu")}>
            <SectionCard title="→ Se a pessoa respondeu — O que fazer">
              <p className="mb-3">Quando alguém responder a msg 3 ("como estão os desafios"), siga esse caminho simples:</p>

              <div className="space-y-4">
                {/* Caso 1 */}
                <div className="border-l-4 border-primary/50 pl-4">
                  <h3 className="font-display font-semibold text-foreground text-sm mb-1">Se trouxe alguma dificuldade</h3>
                  <p className="text-xs text-muted-foreground mb-2">Ex: "tá difícil", "quero crescer", "tô perdida", fala de algum problema</p>
                  <MessageCard label="Responder com" message="Entendi! E o que mais tem te incomodado nisso? Me conta mais 😊" />
                  <p className="text-xs text-muted-foreground mt-2">→ Depois que ela falar mais, siga para o <strong>agendamento com a Fá</strong> (próxima seção).</p>
                </div>

                {/* Caso 2 */}
                <div className="border-l-4 border-accent/50 pl-4">
                  <h3 className="font-display font-semibold text-foreground text-sm mb-1">Se respondeu de forma genérica</h3>
                  <p className="text-xs text-muted-foreground mb-2">Ex: "tá tudo bem", "na luta", "tudo certo"</p>
                  <MessageCard label="Responder com" message="Que bom! E hoje no seu negócio, qual área mais pede atenção?" variant="warm" />
                </div>

                {/* Caso 3 */}
                <div className="border-l-4 border-muted-foreground/30 pl-4">
                  <h3 className="font-display font-semibold text-foreground text-sm mb-1">Se não empreende</h3>
                  <p className="text-xs text-muted-foreground mb-2">Ex: "não tenho negócio", "sou funcionária"</p>
                  <MessageCard label="Responder com" message="Que legal! Fica por aqui que a gente sempre compartilha conteúdos que podem te inspirar 💛" variant="sage" />
                  <p className="text-xs text-muted-foreground mt-2">→ Encerre com carinho. Não precisa aprofundar.</p>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* ════════════════════════════════════════ */}
          {/* AGENDAMENTO */}
          {/* ════════════════════════════════════════ */}
          <div id="agendamento" ref={setRef("agendamento")}>
            <SectionCard title="📞 Agendar conversa com a Fá">
              <p className="mb-3">Se a pessoa trouxe uma dificuldade real e a conversa fluiu, ofereça a conversa com a Fá:</p>

              <div className="space-y-3">
                <MessageCard label="Oferecer a conversa" message="Pelo que você me trouxe, acho que vale muito a pena ter uma conversa com a Fá. É rápido, 100% focado no seu cenário, e você sai com clareza do que fazer." />
                <MessageCard label="Dar os horários" message="Que dia fica melhor pra você: [dia 1, horário] ou [dia 2, horário]?" variant="warm" />
              </div>

              <p className="font-semibold text-foreground mt-5 mb-3">Depois que ela confirmar o dia:</p>
              <div className="space-y-3">
                <MessageCard label="Pedir o e-mail" message="Que maravilha! Já estou colocando na agenda. Consegue me passar seu e-mail para eu te enviar o convite?" variant="warm" />
                <MessageCard label="Confirmar" message="Pronto, chegou aí né? Que bom! Estamos animados para nossa conversa. Nos vemos [dia]! 💛" variant="sage" />
              </div>

              <div className="bg-coral-light/50 border border-primary/15 rounded-lg p-4 mt-4">
                <p className="text-sm font-semibold text-primary mb-2">Checklist depois do agendamento:</p>
                <div className="space-y-1">
                  {[
                    "Pegar o e-mail",
                    "Colocar o horário na agenda da Fá",
                    "Enviar convite e confirmar que recebeu",
                  ].map((i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-secondary-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />{i}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-4">
                <p className="text-sm text-secondary-foreground">
                  <strong>⚠️ Sempre dê duas opções de horário.</strong> Nunca pergunte "qual horário é bom pra você?" porque a pessoa enrola. Dê duas opções específicas com dia e hora.
                </p>
              </div>
            </SectionCard>
          </div>

          {/* ════════════════════════════════════════ */}
          {/* O QUE NÃO FAZER */}
          {/* ════════════════════════════════════════ */}
          <div id="nao-fazer" ref={setRef("nao-fazer")}>
            <SectionCard title="🚫 O que NÃO fazer">
              <div className="space-y-2">
                 {[
                   "Não mandar para quem NÃO é da área da saúde/bem-estar",
                   "Não mandar para advogadas — nunca",
                   "Não mandar para quem vende produto",
                   "Não oferecer serviço logo na primeira mensagem",
                   "Não insistir se a pessoa não responde",
                   "Não esquecer de anotar na planilha",
                   "Não aceitar 'de manhã' ou 'de tarde' como horário — pedir dia e hora exatos",
                 ].map((rule) => (
                  <div key={rule} className="flex items-start gap-2 bg-destructive/5 border border-destructive/10 rounded-md px-3 py-2.5 text-sm">
                    <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />{rule}
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* ════════════════════════════════════════ */}
          {/* ESTRATÉGIAS DE ABRIL */}
          {/* ════════════════════════════════════════ */}
          <div id="abril" ref={setRef("abril")}>
            <SectionCard title="🚀 Estratégias de Abril — O que vem depois">
              <p className="mb-3">Depois de passar por todos os seguidores, em abril vamos expandir. Próximas estratégias:</p>
              <div className="space-y-3">
                {[
                  { title: "Novos seguidores em tempo real", desc: "Mandar as 3 mensagens para toda pessoa nova que seguir, no mesmo dia." },
                  { title: "Interações em stories e posts", desc: "Quem curtir, comentar ou reagir — abrir conversa no direct." },
                  { title: "Social Selling ativo", desc: "Buscar perfis de profissionais da saúde e bem-estar na região e iniciar conversa." },
                  { title: "Reativação", desc: "Voltar em quem não respondeu em março e tentar segunda abordagem." },
                  { title: "Indicações", desc: "Pedir para clientes atuais indicarem profissionais que podem se beneficiar." },
                ].map((item) => (
                  <div key={item.title} className="border-l-4 border-accent/50 pl-4">
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="bg-warm-light rounded-lg p-4 mt-4">
                <p className="text-sm text-secondary-foreground">
                  <strong>Calma!</strong> Isso tudo é para abril. Por agora, foque na meta de <strong>97 seguidores por dia</strong> até 31/03. Vamos definir os detalhes juntas.
                </p>
              </div>
            </SectionCard>
          </div>

          {/* RESUMO VISUAL */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
            <p className="font-display text-lg font-semibold text-foreground mb-4 text-center">Resumo do dia a dia</p>
            <div className="space-y-3">
              {[
                { step: "1", text: "Abrir a lista de seguidores" },
                { step: "2", text: "Olhar o perfil — é da área da saúde ou bem-estar? → manda. Se não → pula." },
                { step: "3", text: "Enviar as 3 mensagens (copiar daqui)" },
                { step: "4", text: "Anotar nome + @ na planilha" },
                { step: "5", text: "Se respondeu com dificuldade → conversar → agendar com a Fá" },
              ].map((item, i) => (
                <div key={item.step} className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold flex-shrink-0">{item.step}</span>
                  <p className="text-sm font-medium text-foreground">{item.text}</p>
                  {i < 4 && <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0 hidden md:block ml-auto" />}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center py-6 text-xs text-muted-foreground border-t border-border">
            <img src={logoLegatto} alt="Legatto" className="h-8 mx-auto mb-3 opacity-50" />
            <p>Documento interno — Legatto</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
