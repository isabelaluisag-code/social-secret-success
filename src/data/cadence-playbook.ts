// Playbook diário do Social Selling — Método Radar Legatto
// Guia que aparece em cada Dia da cadência para orientar o que fazer com o lead.

export interface DayPlaybook {
  day: number;
  title: string;
  goal: string;
  intent: string;
  actions: string[];
  tips: string[];
  avoid: string[];
  messageExamples: { context: string; text: string }[];
}

export const CADENCE_PLAYBOOK: DayPlaybook[] = [
  {
    day: 1,
    title: "Entrar no radar",
    goal: "Aparecer com presença leve, sem invadir.",
    intent: "Mostrar que você existe e olhou o trabalho dela com atenção.",
    actions: [
      "Seguir o perfil",
      "Assistir todos os stories",
      "Curtir 2 a 3 posts (mistura recente + antigo)",
      "Observar bio, destaques, bastidores, equipe, rotina",
      "Anotar nicho, oferta e possíveis dores na observação",
    ],
    tips: [
      "Escolha posts que mostrem bastidor, entrega, agenda, clientes ou rotina.",
      "Não curta tudo de uma vez — fica com cara de campainha tocando.",
      "Procure sinais de negócio real: bio com serviço, link, depoimentos, agenda aberta.",
    ],
    avoid: [
      "Mandar mensagem hoje",
      "Comentar antes de entender o tom dela",
      "Seguir e sumir sem registrar nada",
    ],
    messageExamples: [],
  },
  {
    day: 2,
    title: "Criar familiaridade com comentário",
    goal: "Aparecer com um comentário real que mostre leitura do trabalho dela.",
    intent: "Comentário bom não é elogio vazio — mostra que você entendeu algo.",
    actions: [
      "Assistir stories novamente",
      "Curtir 1 ou 2 posts novos",
      "Comentar com profundidade em um post com abertura real",
      "Registrar o comentário enviado na observação do dia",
    ],
    tips: [
      "Prefira posts de bastidor, entrega, equipe ou desabafo profissional.",
      "Linguagem humana: traga uma reflexão, não um elogio genérico.",
      "Adapte o tom ao nicho (fotógrafa, videomaker, social media, designer, microagência).",
    ],
    avoid: [
      "Comentários tipo 'arrasou', 'top', 'lindo demais'",
      "Falar de você ou do seu serviço",
      "Forçar intimidade ou citar detalhes pessoais",
    ],
    messageExamples: [
      {
        context: "Bastidor de entrega",
        text: "Dá para sentir o cuidado daqui. Não é só a entrega final, né? Tem todo um caminho antes para a pessoa se sentir segura.",
      },
      {
        context: "Agenda cheia",
        text: "Agenda cheia é muito bom, mas também exige um bastidor bem cuidado para não virar peso demais em cima de você.",
      },
      {
        context: "Equipe/microagência",
        text: "Quando a equipe cresce, o que antes se resolvia na conversa começa a precisar de processo. Essa virada é silenciosa, mas muda tudo.",
      },
    ],
  },
  {
    day: 3,
    title: "Abrir conversa pelo Story",
    goal: "Iniciar diálogo natural via resposta de story.",
    intent: "Stories são o melhor caminho — a resposta já nasce com contexto.",
    actions: [
      "Responder 1 story com pergunta aberta",
      "Curtir mais 1 post se fizer sentido",
      "Registrar reação/resposta dela na observação",
    ],
    tips: [
      "Pergunta aberta convida resposta. Termine com '?'.",
      "Relacione a resposta a algo que ela mostrou (rotina, agenda, bastidor).",
      "Se ela respondeu, não emende venda — continue a conversa humana.",
    ],
    avoid: [
      "Mandar áudio longo",
      "Responder com explicação ou aula",
      "Falar de você antes de entender o momento dela",
    ],
    messageExamples: [
      {
        context: "Story de agenda cheia",
        text: "Que semana cheia por aí. Você sente que consegue organizar tudo com calma ou vai ajustando conforme as demandas aparecem?",
      },
      {
        context: "Story de cansaço",
        text: "Entendo demais. Às vezes nem é só o volume de trabalho, é ter que lembrar, decidir e resolver tudo ao mesmo tempo.",
      },
      {
        context: "Story de entrega para cliente",
        text: "Que entrega bonita. Fiquei curiosa: você já tem um caminho bem definido do primeiro contato até a entrega ou cada cliente acaba indo de um jeito?",
      },
    ],
  },
  {
    day: 4,
    title: "Continuar a conversa",
    goal: "Nutrir o vínculo iniciado e mapear o timing da abordagem.",
    intent: "Aprofundar a leitura: rotina, atendimento ou entrega — onde mais pesa?",
    actions: [
      "Continuar conversa se ela respondeu o story",
      "Nova interação leve (curtir/comentar) se não respondeu",
      "Mapear dor percebida e anotar na observação",
    ],
    tips: [
      "Faça uma pergunta de qualificação por vez.",
      "Demonstre escuta antes de oferecer qualquer coisa.",
      "Reforce que o problema é comum — tira a sensação de culpa.",
    ],
    avoid: [
      "Tentar fechar nada ainda",
      "Encher de perguntas no mesmo áudio/mensagem",
      "Diagnosticar sem ela ter contado",
    ],
    messageExamples: [
      {
        context: "Ela contou uma dor",
        text: "Imagino o quanto isso vai cansando, porque não é uma coisa grande só. São vários pequenos lembretes, decisões e ajustes durante o dia. Isso tem pesado mais no seu tempo ou na sua cabeça?",
      },
      {
        context: "Ela disse 'faço tudo sozinha'",
        text: "Fazer tudo sozinha já é muita coisa, mas o que mais cansa é ter que lembrar de tudo sozinha também. Tem alguma parte da sua rotina que você sente que poderia ser mais simples se estivesse documentada?",
      },
    ],
  },
  {
    day: 5,
    title: "Preparar a abordagem",
    goal: "Montar a DM contextual com base no que você observou.",
    intent: "A DM precisa parecer 'passei por aqui, observei seu trabalho e tive uma curiosidade real'.",
    actions: [
      "Reler observações dos dias 1 a 4",
      "Escolher o modelo de DM mais adequado ao nicho",
      "Personalizar com 1 ponto específico do trabalho dela",
      "Enviar a DM",
    ],
    tips: [
      "Cite algo específico que você observou (post, story, bastidor).",
      "Termine com pergunta aberta sobre o bastidor/operação.",
      "Mantenha tom íntimo e curioso, nunca comercial.",
    ],
    avoid: [
      "'Olá, tudo bem?'",
      "'Vi seu perfil e achei interessante'",
      "'Tenho uma solução para você'",
      "'Vamos marcar uma call?'",
    ],
    messageExamples: [
      {
        context: "Modelo geral",
        text: "Oi, [nome]. Vi alguns conteúdos seus esses dias e gostei de acompanhar um pouco do seu trabalho, principalmente [ponto específico]. Fiquei com uma curiosidade: hoje você sente que o bastidor do seu negócio acompanha bem o volume das entregas ou ainda tem muita coisa ficando na sua cabeça?",
      },
      {
        context: "Para fotógrafa",
        text: "Oi, [nome]. Vi alguns ensaios seus e gostei muito do cuidado que aparece na forma como você conduz o trabalho. Fiquei curiosa: hoje o seu processo, do primeiro contato até a entrega final, já está bem redondinho ou ainda depende muito de você ir lembrando e conduzindo tudo manualmente?",
      },
      {
        context: "Para microagência",
        text: "Oi, [nome]. Vi que vocês já têm uma estrutura de clientes e entregas por aí. Que movimento bonito. Fiquei curiosa: hoje a operação da agência já roda com processos claros ou muita coisa ainda passa por você para revisar, decidir e destravar?",
      },
    ],
  },
  {
    day: 6,
    title: "Qualificar e direcionar",
    goal: "Entender a dor com profundidade e direcionar para comunidade ou diagnóstico.",
    intent: "Comunidade para quem ainda precisa de consciência. Diagnóstico para dor madura.",
    actions: [
      "Fazer 1 a 2 perguntas de qualificação",
      "Classificar lead: comunidade Donas do Tempo OU diagnóstico Legatto",
      "Enviar convite contextual",
      "Atualizar status (Respondeu, Reunião, Oportunidade ou Follow-up)",
    ],
    tips: [
      "Sinais para comunidade: 'estou tentando me organizar', 'estou perdida', 'quero melhorar minha rotina'.",
      "Sinais para diagnóstico: 'tenho equipe', 'tudo depende de mim', 'estou perdendo prazo', 'crescendo sem estrutura'.",
      "Sem resposta? Mantenha aquecendo sem insistir.",
    ],
    avoid: [
      "Oferecer comunidade E diagnóstico ao mesmo tempo",
      "Cobrar resposta",
      "Mandar link sem contexto",
    ],
    messageExamples: [
      {
        context: "Convite para comunidade",
        text: "Pelo que você me contou, acho que você ia gostar da Donas do Tempo. É uma comunidade que estou construindo para mulheres criativas que querem organizar rotina, clientes e bastidores do negócio sem transformar tudo numa coisa pesada. Posso te mandar o convite?",
      },
      {
        context: "Convite para diagnóstico",
        text: "Pelo que você me contou, parece que já passou daquela fase de só tentar se organizar melhor na rotina. Tem um gargalo de operação aí. O diagnóstico da Legatto serve justamente para olhar para esse bastidor com calma e entender o que precisa ser estruturado primeiro. Quer que eu te explique como funciona?",
      },
      {
        context: "Follow-up final (sem resposta)",
        text: "Vou deixar essa conversa tranquila por aqui para não ficar te chamando sem necessidade. Gostei de conhecer um pouco do seu trabalho. Quando sentir que é hora de organizar esse bastidor com mais clareza, pode me chamar.",
      },
    ],
  },
];

export function getDayPlaybook(day: number): DayPlaybook | undefined {
  return CADENCE_PLAYBOOK.find(p => p.day === day);
}
