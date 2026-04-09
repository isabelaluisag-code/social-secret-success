// Auto-generated from XLSX - Social Selling Leads
export type LeadStatus =
  | "novo" | "em_checagem"
  | "dia_1" | "dia_2" | "dia_3" | "dia_4" | "dia_5" | "dia_6"
  | "abordado" | "em_followup" | "respondeu" | "reuniao" | "oportunidade" | "perdido";

export type DiscardReason = "hater" | "concorrente" | "sem_aderencia" | "fake" | "dados_errados" | "outro" | null;
export type Priority = "alta" | "media" | "baixa";

export interface CadenceDay {
  day: number;
  tasks: CadenceTask[];
  observation: string;
  observationHistory: string[];
  observationSaved: boolean;
  completedAt: string | null;
  executionDate: string | null;
}

export interface CadenceTask {
  id: string;
  label: string;
  completed: boolean;
}

export interface Lead {
  id: string;
  nome: string;
  instagram: string;
  linkPerfil: string;
  empresa: string;
  nicho: string;
  bio: string;
  postKeywords: string;
  abordagem: string;
  perfilFechado: boolean;
  bioOk: boolean | null;
  palavrasChave: string;
  aderenteIcp: boolean | null;
  motivoDescarte: DiscardReason;
  status: LeadStatus;
  responsavel: string;
  prioridade: Priority;
  resultado: string;
  observacoes: string[];
  cadencia: CadenceDay[];
  ultimaInteracao: string | null;
  criadoEm: string;
}

export const CADENCE_TEMPLATE: { day: number; tasks: string[] }[] = [
  { day: 1, tasks: ["Seguir perfil", "Assistir stories", "Curtir 3 posts recentes", "Curtir 2 posts antigos", "Registrar observação"] },
  { day: 2, tasks: ["Assistir stories", "Curtir posts novos", "Avaliar repertório do lead", "Registrar comentário possível"] },
  { day: 3, tasks: ["Comentário estratégico", "Assistir stories", "Registrar resposta ou reação"] },
  { day: 4, tasks: ["Nova interação leve", "Assistir stories", "Mapear timing de abordagem"] },
  { day: 5, tasks: ["Preparar abordagem", "Assistir stories", "Anexar modelo sugerido"] },
  { day: 6, tasks: ["Análise final", "Enviar abordagem", "Registrar link enviado", "Fazer follow-up"] },
];

export function createCadence(): CadenceDay[] {
  return CADENCE_TEMPLATE.map(t => ({
    day: t.day,
    tasks: t.tasks.map((label, i) => ({ id: "d" + t.day + "_t" + i, label, completed: false })),
    observation: "",
    observationHistory: [],
    observationSaved: false,
    completedAt: null,
    executionDate: null,
  }));
}

export const STATUS_CONFIG: Record<LeadStatus, { label: string; color: string; bg: string }> = {
  novo: { label: "Novo Lead", color: "text-blue-700", bg: "bg-blue-100" },
  em_checagem: { label: "Em Checagem", color: "text-yellow-700", bg: "bg-yellow-100" },
  dia_1: { label: "Dia 1", color: "text-indigo-700", bg: "bg-indigo-100" },
  dia_2: { label: "Dia 2", color: "text-indigo-700", bg: "bg-indigo-100" },
  dia_3: { label: "Dia 3", color: "text-indigo-700", bg: "bg-indigo-100" },
  dia_4: { label: "Dia 4", color: "text-indigo-700", bg: "bg-indigo-100" },
  dia_5: { label: "Dia 5", color: "text-purple-700", bg: "bg-purple-100" },
  dia_6: { label: "Dia 6", color: "text-purple-700", bg: "bg-purple-100" },
  abordado: { label: "Abordado", color: "text-teal-700", bg: "bg-teal-100" },
  em_followup: { label: "Em Follow-up", color: "text-orange-700", bg: "bg-orange-100" },
  respondeu: { label: "Respondeu", color: "text-emerald-700", bg: "bg-emerald-100" },
  reuniao: { label: "Reunião", color: "text-cyan-700", bg: "bg-cyan-100" },
  oportunidade: { label: "Oportunidade", color: "text-pink-700", bg: "bg-pink-100" },
  perdido: { label: "Perdido", color: "text-gray-700", bg: "bg-gray-100" },
};

const RAW_LEADS: Array<{id:string;nome:string;instagram:string;linkPerfil:string;nicho:string;bio:string;postKeywords:string;abordagem:string}> = [
  {
    "id": "lead_1",
    "nome": "Dra Ana Maria Doffemond - Ultrassom Dermatológico BH",
    "instagram": "anadoffemond",
    "linkPerfil": "https://www.instagram.com/anadoffemond/",
    "nicho": "Dermatologia",
    "bio": "US para cosmiatria, doenças cutâneas, procedimentos guiados e tto de complicações\\nObservership para colegas médicos \\nMembro CBR\\nCRM 47551 | RQE 47026",
    "postKeywords": "pele, autocuidado, ciência, naturalidade, rejuvenescimento",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei bem forte o posicionamento de vocês. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios da saúde e estética a crescerem com mais previsibilidade. Queria trocar uma ideia rápida contigo, pode ser?"
  },
  {
    "id": "lead_2",
    "nome": "Dra Isabella Rezende Yared - Dermatologista",
    "instagram": "clinicaisabellarezende",
    "linkPerfil": "https://www.instagram.com/clinicaisabellarezende/",
    "nicho": "Dermatologia",
    "bio": "Moema-SP E Curitiba\\nCriadora do Vertical Lift®️: técnica exclusiva para lifting facial sem volume \\nIRYS Wellness Spa    @pure4u.br\\nDermatologista SBD",
    "postKeywords": "pele, autocuidado, ciência, naturalidade, rejuvenescimento",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei bem forte o posicionamento de vocês. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios da saúde e estética a crescerem com mais previsibilidade. Queria trocar uma ideia rápida contigo, pode ser?"
  },
  {
    "id": "lead_3",
    "nome": "Dra Lorena Almeida / Dermatologia",
    "instagram": "dralorena.almeida",
    "linkPerfil": "https://www.instagram.com/dralorena.almeida/",
    "nicho": "Dermatologia",
    "bio": "Especializanda em Dermatologia 💋\\nDicas de saúde / cuidados com a pele/",
    "postKeywords": "pele, autocuidado, ciência, naturalidade, rejuvenescimento, dermatologia, pele saudável",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei bem forte o posicionamento de vocês. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios da saúde e estética a crescerem com mais previsibilidade. Queria trocar uma ideia rápida contigo, pode ser?"
  },
  {
    "id": "lead_4",
    "nome": "Dra. Julia Real | Deep plane facelift • Blefaroplastia • BH",
    "instagram": "drajuliareal",
    "linkPerfil": "https://www.instagram.com/drajuliareal/",
    "nicho": "Dermatologia",
    "bio": "Cirurgiã Plástica • RQE 47938\\nBeleza e Rejuvenescimento com naturalidade ❤️\\nDeep Plane Facelift • Pálpebras • Otoplastia sem cicatrizes\\n📍@clinica.avah",
    "postKeywords": "pele, autocuidado, ciência, naturalidade, rejuvenescimento",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei bem forte o posicionamento de vocês. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios da saúde e estética a crescerem com mais previsibilidade. Queria trocar uma ideia rápida contigo, pode ser?"
  },
  {
    "id": "lead_5",
    "nome": "Dra. Vanessa Casteli | Dermatologista Cuiabá",
    "instagram": "dravanessacasteli",
    "linkPerfil": "https://www.instagram.com/dravanessacasteli/",
    "nicho": "Dermatologia",
    "bio": "🌿Beleza Clean & Ciência \\nDermatologista SBD e farmacêutica \\nFundadora @sinevie.beautycare \\nProf. Dermatologia HUJM/UFMT\\nDiretoria Científica @sbdmt",
    "postKeywords": "pele, autocuidado, ciência, naturalidade, rejuvenescimento, dermatologia",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei bem forte o posicionamento de vocês. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios da saúde e estética a crescerem com mais previsibilidade. Queria trocar uma ideia rápida contigo, pode ser?"
  },
  {
    "id": "lead_6",
    "nome": "Isabela Aguiar | Botox | Saúde Integrativa| Pele",
    "instagram": "draisabelaaguiar",
    "linkPerfil": "https://www.instagram.com/draisabelaaguiar/",
    "nicho": "Dermatologia",
    "bio": "Seja bem vinda(o)!\\n🌿Mentoria vip para iniciantes da HOF\\n🧬Estética Integrativa\\n👩🏼‍🏫 Docente|Cursos\\n2 Reis 4:6 Isaías 60:22\\nInicie seu auto cuidado⬇️",
    "postKeywords": "pele, autocuidado, ciência, naturalidade, rejuvenescimento",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei bem forte o posicionamento de vocês. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios da saúde e estética a crescerem com mais previsibilidade. Queria trocar uma ideia rápida contigo, pode ser?"
  },
  {
    "id": "lead_7",
    "nome": "Júlia Gorjão",
    "instagram": "drajuliagorjao",
    "linkPerfil": "https://www.instagram.com/drajuliagorjao/",
    "nicho": "Dermatologia",
    "bio": "✨Pele saudável começa com informação\\nAutocuidado, ciência e beleza natural\\nCRM BA 35707 | RQE 23518\\nAgendamentos👇",
    "postKeywords": "pele, autocuidado, ciência, naturalidade, rejuvenescimento, pele saudável",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei bem forte o posicionamento de vocês. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios da saúde e estética a crescerem com mais previsibilidade. Queria trocar uma ideia rápida contigo, pode ser?"
  },
  {
    "id": "lead_8",
    "nome": "Larissa Lage | Micropigmentação Realista",
    "instagram": "larissalage_pmu",
    "linkPerfil": "https://www.instagram.com/larissalage_pmu/",
    "nicho": "Dermatologia",
    "bio": "🧬 Biomédica em formação | Estética \\n✨ Micropigmentação e Design de Sobrancelhas \\n🧴Skincare com base científica\\n👶 Mãe do Léo \\n📍BH\\n👇🏼 Agendamentos",
    "postKeywords": "pele, autocuidado, ciência, naturalidade, rejuvenescimento",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei bem forte o posicionamento de vocês. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios da saúde e estética a crescerem com mais previsibilidade. Queria trocar uma ideia rápida contigo, pode ser?"
  },
  {
    "id": "lead_9",
    "nome": "Núcleo Nidia Borges | Dermatologia, Estética e Emagrecimento",
    "instagram": "nucleonidiaborges",
    "linkPerfil": "https://www.instagram.com/nucleonidiaborges/",
    "nicho": "Dermatologia",
    "bio": "▫️Por trás de cada pele, existe uma história.\\n▫️+30 anos cuidando de você!\\n▫️ CRM 83255/SP | RQE 51367\\n📍Santo André/SP | Ribeirão Pires/SP",
    "postKeywords": "pele, autocuidado, ciência, naturalidade, rejuvenescimento, pele saudável",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei bem forte o posicionamento de vocês. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios da saúde e estética a crescerem com mais previsibilidade. Queria trocar uma ideia rápida contigo, pode ser?"
  },
  {
    "id": "lead_10",
    "nome": "Rafaela Vasconcelos| Médica",
    "instagram": "drarafavasconcelos",
    "linkPerfil": "https://www.instagram.com/drarafavasconcelos/",
    "nicho": "Dermatologia",
    "bio": "Dermatologia & Medicina do Emagrecimento\\n💫 Cuido da sua pele e do seu corpo por completo\\n📍 BH - Médica CRMMG 79912",
    "postKeywords": "pele, autocuidado, ciência, naturalidade, rejuvenescimento, dermatologia, pele saudável, constância",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei bem forte o posicionamento de vocês. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios da saúde e estética a crescerem com mais previsibilidade. Queria trocar uma ideia rápida contigo, pode ser?"
  },
  {
    "id": "lead_11",
    "nome": "ANNA LACOMBE NUTRIÇÃO E ESTILO DE VIDA",
    "instagram": "alacombe.nutricaointegrativa",
    "linkPerfil": "https://www.instagram.com/alacombe.nutricaointegrativa/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "Nutricionista Esportiva e Integrativa!\\nModulação Intestinal \\ncorpo•mente•espírito\\nAlegra \\n3498-8383/98648-0992\\nDOM\\n98242-8398\\nLink abaixo!",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, nutrição",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_12",
    "nome": "Aline Passos",
    "instagram": "alinepassosferreira",
    "linkPerfil": "https://www.instagram.com/alinepassosferreira/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "Enfermeira/ Estética Avançada/ Integrativa.      Graduanda em Nutrição                                  ☕️🍷💉👩‍👧🍎",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, nutrição",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_13",
    "nome": "Ana Paula Lopes",
    "instagram": "anapaulalopesnutri2018",
    "linkPerfil": "https://www.instagram.com/anapaulalopesnutri2018/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "◾🥝🥥nutricionista clínica esportiva🥑🍒\\n📌Agende sua consulta pelo link abaixo.",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, nutrição",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_14",
    "nome": "Angela Vianello",
    "instagram": "angelavianello",
    "linkPerfil": "https://www.instagram.com/angelavianello/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "👩‍⚕️ Emagrecimento de Alta Performance & Medicina Integrativa| Fundadora da @clinicaless | 20 anos transformando vidas| Mãe, Esposa e Empreendedora",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, constância",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_15",
    "nome": "Clarissa Hsieh",
    "instagram": "clahsieh",
    "linkPerfil": "https://www.instagram.com/clahsieh/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "Nutri que vive o que acredita 🧡🥑\\nBH📍\\n👩‍💻 @sovita.ativos • @myozamei\\n🏋️‍♀️ Treino, rock e viagens pra viver tudo 🤘✈️ | Mãe da Petit 🐶",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, nutrição",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_16",
    "nome": "Dayanne Moreira",
    "instagram": "daydaymoreira",
    "linkPerfil": "https://www.instagram.com/daydaymoreira/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "\"Se fordes o que devereis ser, incendiareis o mundo!”🙏🕊️\\nNutri 🍉🎓\\nMãe de dois 🧑🏻🧑🏼",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, nutrição",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_17",
    "nome": "Dayse Lopes",
    "instagram": "dradayselopesnutri",
    "linkPerfil": "https://www.instagram.com/dradayselopesnutri/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "🧡 Vida real, saúde feminina e momentos que importam.\\n2026 tudo nosso ✨\\nProtocolo Aura – Tratamento do Lipedema",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, lipedema",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_18",
    "nome": "Dr Cristiano Cruz | Médico Nutrólogo",
    "instagram": "drcristianocruz",
    "linkPerfil": "https://www.instagram.com/drcristianocruz/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "Tratamento da obesidade / Emagrecimento\\nReposição hormonal\\nLipedema\\n📚 Especialista em Nutrologia RQE 65243\\nCRM 51749 \\nRQE 35044\\nAgendamentos ⬇️",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, constância, equilíbrio hormonal, lipedema",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_19",
    "nome": "Dr Edir Soccol Jr | Emagrecimento Avançado",
    "instagram": "dredirsoccoljr",
    "linkPerfil": "https://www.instagram.com/dredirsoccoljr/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "🩺 Estratégias avançadas para emagrecimento\\n🏆 Método médico, seguro e individualizado\\n📚 Aprenda a destravar seu metabolismo\\n🔒 Atendimento exclusivo 👇",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, constância",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_20",
    "nome": "Dr. Cater",
    "instagram": "doutor.cater",
    "linkPerfil": "https://www.instagram.com/doutor.cater/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "MÉDICO CRM/MS 12360\\nEmagrecimento . Lipedema\\n📍 Mato Grosso do Sul\\nContato 👇🏼",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, constância, lipedema",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_21",
    "nome": "Dr. Diego Fernando | Médico | Emagrecimento | Lipedema",
    "instagram": "drdiegofernando",
    "linkPerfil": "https://www.instagram.com/drdiegofernando/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "Te ajudo a emagrecer mais rápido com saúde, segurança e repondo seus hormônios.\\n📍S. J. do Rio Preto \\nAgendar Consulta⤵️ |FAMECA / EINSTEIN-CRM:239495",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, constância, equilíbrio hormonal",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_22",
    "nome": "Dr. Felipe Balem | Médico | Lipedema",
    "instagram": "drfelipebalem",
    "linkPerfil": "https://www.instagram.com/drfelipebalem/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "👨‍⚕️ Expert em Transformar Vidas\\n💊 Emagrecimento & Performance\\n🌐 Tratamento Avançado de LIPEDEMA\\nCRM/PR 31992 | RQE 37779",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, constância, lipedema",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_23",
    "nome": "Dr. Fred Corte | Emagrecimento em Araras - SP",
    "instagram": "drfredcorte.medico",
    "linkPerfil": "https://www.instagram.com/drfredcorte.medico/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "Há 18 anos cuidando da sua saúde \\nEmagrecimento | Reposição Hormonal | Lipedema\\nCRM 130854 | RQE 57599\\n👇🏻Agende a sua consulta",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, constância, equilíbrio hormonal, lipedema",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_24",
    "nome": "Dr. Leonardo Matthew",
    "instagram": "drleonardomatthew",
    "linkPerfil": "https://www.instagram.com/drleonardomatthew/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "Emagrecimento | Educação Médica\\n 📚 +3mil médicos ensinados com base em evidência\\n 📍 Salvador 31460 • São Paulo 240346\\n Consultas e Mentorias👇🏻",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, constância",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_25",
    "nome": "Dr. Thiago Omena | Médico",
    "instagram": "thiagoomena",
    "linkPerfil": "https://www.instagram.com/thiagoomena/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "🧠 Médico, Empresário e Palestrante\\n🩺Emagrecimento, Reposição Hormonal e Longevidade!\\nCRM-AL: 7.554 | CRM-SP: 164.118 | RQE: 4.629\\n📍 @itoinstituto",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, constância, equilíbrio hormonal",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_26",
    "nome": "Dr. Thiago Sgobbi | Hormônios & Emagrecimento",
    "instagram": "drthiagosgobbi",
    "linkPerfil": "https://www.instagram.com/drthiagosgobbi/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "Medicina de alta performance\\nEmagrecimento • Hormônios • Longevidade\\n👨‍⚕️ Atendimento exclusivo\\n📍 Referência em Novo Hamburgo e região\\n⬇️ Consultas",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, constância, equilíbrio hormonal",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_27",
    "nome": "Dr. Vinícius Bonfante : Ortopedia & Emagrecimento",
    "instagram": "drviniciusbonfante",
    "linkPerfil": "https://www.instagram.com/drviniciusbonfante/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "Dor constante? Dificuldade para emagrecer? Recupere a autoestima. \\nOrtopedista e Pós Graduado em Obesidade e Sarcopenia \\nCRM: 52807010 / RQE: 37626",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, constância",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_28",
    "nome": "Dra Cris Nolasco | Saúde da Mulher",
    "instagram": "dracrisnolasco",
    "linkPerfil": "https://www.instagram.com/dracrisnolasco/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "✨Saúde Hormonal Feminina\\n✨Metabolismo e Intimidade\\n25 anos de dedicação à saúde da mulher\\nCRM 7083/ES • RQE 5066\\n📍Vitória – ES e online",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, equilíbrio hormonal",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_29",
    "nome": "Dra Karina Ancioto - Instituto Médico Ancioto",
    "instagram": "dra.karinaancioto",
    "linkPerfil": "https://www.instagram.com/dra.karinaancioto/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "⚜️ Emagreci 65kg e hoje ajudo pessoas a transformarem suas vidas.\\n⚜️ Médica Cirurgiã CRM/PR 30.171 | RQE 24149\\n📍 Londrina/PR",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, constância",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_30",
    "nome": "Dra Nicole Yabrudi",
    "instagram": "dranicoleyabrudi",
    "linkPerfil": "https://www.instagram.com/dranicoleyabrudi/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "CRM 26939 - BA\\nAjudo pessoas a emagrecer\\ncom estratégia,equilíbrio hormonal e leveza\\n📍Salvador / Online \\nInformações ⬇️",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, constância, equilíbrio hormonal",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_31",
    "nome": "Dra Roberta Miele/ Endocrinologista",
    "instagram": "dra.robertamiele",
    "linkPerfil": "https://www.instagram.com/dra.robertamiele/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "🩺 Emagrecimento e equilíbrio hormonal\\n📍 Bento Gonçalves | São Paulo\\n📜 CRM-RS 26936 | CRM-SP 276984\\nRQE 19892 • 19893\\n👇🏻 Agende sua avaliação",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, constância, equilíbrio hormonal",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_32",
    "nome": "Dra Thaísa Bramusse",
    "instagram": "drathaisa.bramusse",
    "linkPerfil": "https://www.instagram.com/drathaisa.bramusse/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "👩🏼‍⚕️Médica CRM-MG 50338 \\n🙏🏻Cristã\\n🚀Emagrecimento, saúde, equilíbrio hormonal e qualidade de vida\\n🇺🇸🇦🇷🇨🇱🇧🇪🇫🇷🇯🇲🇰🇾🇦🇹🇨🇿🇭🇺🇳🇱🇮🇹🇨🇭🇵🇹🇵🇪🇵🇾🇺🇾🇸🇪🇳🇴🇩🇰🇪🇸🇫🇮",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, constância, equilíbrio hormonal",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_33",
    "nome": "Dra. Amanda Lins | Emagrecimento | Lipedema | Performance",
    "instagram": "draamandalins",
    "linkPerfil": "https://www.instagram.com/draamandalins/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "📍Vitória @clinicajardins.vix \\n+ de 3.000 vidas transformadas\\n✨Performance, hipertrofia e saúde \\n👩🏻‍⚕️ Médica - CRM 16.123/ES\\nAgende seu horário",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_34",
    "nome": "Dra. Ana Rachel  | Emagrecimento",
    "instagram": "dra.anarachelsiqueira",
    "linkPerfil": "https://www.instagram.com/dra.anarachelsiqueira/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "⚕️. Descomplico o emagrecimento com ciência, estratégia e acolhimento. Mais que tratar sintomas, cuido de pessoas. \\nCRM MG 45606\\n👇🏼Agende sua consulta",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, constância",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_35",
    "nome": "Dra. Ana Terra | CRM 23636",
    "instagram": "dra.anaterra",
    "linkPerfil": "https://www.instagram.com/dra.anaterra/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "Quer emagrecer, gerenciar o envelhecimento e equilibrar os hormônios? Conte comigo! \\n💉 Procedimentos dermatológicos\\n💪🏻 Emagrecimento e menopausa",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, constância, equilíbrio hormonal, menopausa",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_36",
    "nome": "Dra. Danielle Beran | Ginecologista no RJ",
    "instagram": "dradanielleberan",
    "linkPerfil": "https://www.instagram.com/dradanielleberan/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "Especialista em cuidados integrados à saúde feminina\\nEmagrecimento | Estética Íntima | Menopausa\\nCRM 621986 RQE 18291/18292\\n📲 Agende sua consulta",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, constância, menopausa",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_37",
    "nome": "Dra. Marcela Brasil | Médica",
    "instagram": "dra.marcelabrasil",
    "linkPerfil": "https://www.instagram.com/dra.marcelabrasil/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "Emagrecimento, reposição hormonal e fertilidade com base em ciência e resultados reais.\\nMãe, médica e corredora.\\nCRM-MG 63868 | Divinópolis - MG",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, constância, equilíbrio hormonal",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_38",
    "nome": "Dra. Marina Pagotto | Emagrecimento | Lipedema",
    "instagram": "dramarinapagotto",
    "linkPerfil": "https://www.instagram.com/dramarinapagotto/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "Otimização Biológica & Performance Humana. | Medicina de Precisão para quem busca o extraordinário. \\n📌Manaus - AM\\n⚕️CRM 10499\\n⬇️agendamentos",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_39",
    "nome": "Dra. Marina Piau | Curso Rejuvenescimento Íntimo 👇31-972568215",
    "instagram": "dramarinapiau",
    "linkPerfil": "https://www.instagram.com/dramarinapiau/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "💪🏻 Cirurgia/ Rejuvenescimento Íntimo         💃🏼Reposição hormonal\\n📚Cursos para médicos                                             ❤️Gineco BH",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, equilíbrio hormonal",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_40",
    "nome": "Dra. Olivia Caxias | Emagrecimento Contagem &  Belo Horizonte",
    "instagram": "dra.olivia_caxias",
    "linkPerfil": "https://www.instagram.com/dra.olivia_caxias/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "🩺CRM MG 80937 \\n ✨ Sua saúde  em 1º lugar \\n💔 Cansado de dietas sem sucesso?\\n🚀 Sua jornada saudável começa agora\\n👇 Agende sua transformação!",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_41",
    "nome": "Dra. Renata Braga | Emagrecimento & Menopausa",
    "instagram": "drarenatabraga_",
    "linkPerfil": "https://www.instagram.com/drarenatabraga_/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "A médica do ♥️ da mulher \\nPerimenopausa & Menopausa • Reposição hormonal • Emagrecimento \\n🩺Cardio • Pós-Endócrino\\nCRMMG 47529 | RQE 35109\\nConsulta👇🏻",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, constância, equilíbrio hormonal, menopausa",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_42",
    "nome": "Julia Ferreira",
    "instagram": "analistajuliaferreira",
    "linkPerfil": "https://www.instagram.com/analistajuliaferreira/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "Analista de Relacionamento @centralnutritionbrasil\\nFale com o analista! ⬇️",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, nutrição",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_43",
    "nome": "Juliana",
    "instagram": "julifloras",
    "linkPerfil": "https://www.instagram.com/julifloras/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "Juliana Flora🍉\\nNUTRIÇÃO 🍏📚📚💪😍\\nProvérbios 16:3🙌",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, nutrição",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_44",
    "nome": "Manu Prieto",
    "instagram": "prieto_ma",
    "linkPerfil": "https://www.instagram.com/prieto_ma/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "Médica de Mulheres | RQE 108238 CRM-SP 196873\\nCuidando de quem cuida de todos!\\nHormônios, disposição, autoestima e libido\\nSaúde com ciência \\n🌸Agenda👇",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, equilíbrio hormonal",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_45",
    "nome": "Nathana Torres",
    "instagram": "nnathanatorres",
    "linkPerfil": "https://www.instagram.com/nnathanatorres/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "Nutricionista \\n@bonavitta_saudavel",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, nutrição",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_46",
    "nome": "Nicolli | Nutri & Personal | Emagrecimento & Saúde da Mulher",
    "instagram": "nutrinicolliperdigao",
    "linkPerfil": "https://www.instagram.com/nutrinicolliperdigao/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "✨ Emagrecimento feminino • saúde da mulher • nutrição estética\\n💪🏼 Nutricionista e Personal Trainer\\n🌎 Atendimento on-line e presencial em BH",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, constância, nutrição",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_47",
    "nome": "Nutricionista Nádia Azevedo",
    "instagram": "nadia.azevedo.nutri",
    "linkPerfil": "https://www.instagram.com/nadia.azevedo.nutri/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "🌿 Doenças/ Intestino/Emagrecimento\\nNutrição com ciência, afeto, escuta e leveza. \\nCuidar de você é meu propósito.💚\\nAtendimentos Online e Presencial",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, constância, nutrição",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_48",
    "nome": "Priscila Nascimento Pianes",
    "instagram": "drapriscilanascimento",
    "linkPerfil": "https://www.instagram.com/drapriscilanascimento/",
    "nicho": "Nutrição e Emagrecimento",
    "bio": "Medicina voltada à organização do metabolismo, hormônios e composição corporal.\\n⚕️CRM 8509-MA | 14946-PA\\nMais Informações ⤵️",
    "postKeywords": "emagrecimento, metabolismo, hormônios, saúde, resultado real, equilíbrio hormonal",
    "abordagem": "Buenasss, tudo certo? Vi seu perfil e gostei da forma como você comunica seu trabalho com nutrição e emagrecimento. Hoje eu ajudo profissionais e negócios desse nicho a estruturarem melhor a parte comercial, porque muitas vezes o atendimento é bom, a demanda existe, mas a operação não acompanha o crescimento. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_49",
    "nome": "Alther Loja Afiliada",
    "instagram": "alther_suplementos__dermos",
    "linkPerfil": "https://www.instagram.com/alther_suplementos__dermos/",
    "nicho": "Dentista",
    "bio": "Cuidado de dentro para fora\\n💊 Suplementos | 🧴 Dermocosméticos \\n🌿 Bem-estar, saúde e autocuidado\\n🔗 Comprar pelo Link:",
    "postKeywords": "sorriso, alinhadores, odontologia, consulta, confiança",
    "abordagem": "Eisss, tudo certo? Dei uma olhada no seu perfil e achei interessante o trabalho de vocês. Atuo com consultoria de vendas e BPO comercial, apoiando clínicas a terem mais previsibilidade e crescimento sem depender só de indicação. Posso te chamar em uma pergunta bem objetiva?"
  },
  {
    "id": "lead_50",
    "nome": "Andressa Faria - Odontologia Estética e Reabilitação Oral",
    "instagram": "dra.andressasfaria",
    "linkPerfil": "https://www.instagram.com/dra.andressasfaria/",
    "nicho": "Dentista",
    "bio": "Sou dentista e cuido de pessoas, para além de dentes. \\nOdontologia Estética e Reabilitação Oral.\\nCROMG 58.904 - Belo Horizonte/MG\\nAgende sua consulta:",
    "postKeywords": "sorriso, alinhadores, odontologia, consulta, confiança",
    "abordagem": "Eisss, tudo certo? Dei uma olhada no seu perfil e achei interessante o trabalho de vocês. Atuo com consultoria de vendas e BPO comercial, apoiando clínicas a terem mais previsibilidade e crescimento sem depender só de indicação. Posso te chamar em uma pergunta bem objetiva?"
  },
  {
    "id": "lead_51",
    "nome": "Fernanda Assis Da Mata",
    "instagram": "nandinhadamata",
    "linkPerfil": "https://www.instagram.com/nandinhadamata/",
    "nicho": "Dentista",
    "bio": "Mamãe do Felipe e do Daniel 👨‍👩‍👦‍👦💕 \\nDentista - UFMG \\nEndodontista UFMG 🦷\\n Radiologista  PUC-MG 🌋\\nTorcedora do Galo 🐓\\nBH ↔️ Caeté",
    "postKeywords": "sorriso, alinhadores, odontologia, consulta, confiança",
    "abordagem": "Eisss, tudo certo? Dei uma olhada no seu perfil e achei interessante o trabalho de vocês. Atuo com consultoria de vendas e BPO comercial, apoiando clínicas a terem mais previsibilidade e crescimento sem depender só de indicação. Posso te chamar em uma pergunta bem objetiva?"
  },
  {
    "id": "lead_52",
    "nome": "Kelen Ferreira",
    "instagram": "plena.40.mais",
    "linkPerfil": "https://www.instagram.com/plena.40.mais/",
    "nicho": "Dentista",
    "bio": "⚕️De dentista a estudante de medicina\\n👸🏻Mulher, filha, esposa,mãe\\n💅🏻Vida real, superação e autoestima\\n🙏🏼Fé e esperança sempre \\n🇧🇷BR✨ Parcerias pela DM",
    "postKeywords": "sorriso, alinhadores, odontologia, consulta, confiança",
    "abordagem": "Eisss, tudo certo? Dei uma olhada no seu perfil e achei interessante o trabalho de vocês. Atuo com consultoria de vendas e BPO comercial, apoiando clínicas a terem mais previsibilidade e crescimento sem depender só de indicação. Posso te chamar em uma pergunta bem objetiva?"
  },
  {
    "id": "lead_53",
    "nome": "Luciana Costa",
    "instagram": "lucianacosta2401",
    "linkPerfil": "https://www.instagram.com/lucianacosta2401/",
    "nicho": "Dentista",
    "bio": "Ortodontista 🦷😁🪥\\n💎 Transformando sorrisos com Aparelhos e Alinhadores.\\n📍Belo Horizonte\\n📞 Agende sua consulta e sorria com confiança! Clique aqui👇🏻👇🏻👇🏻",
    "postKeywords": "sorriso, alinhadores, odontologia, consulta, confiança",
    "abordagem": "Eisss, tudo certo? Dei uma olhada no seu perfil e achei interessante o trabalho de vocês. Atuo com consultoria de vendas e BPO comercial, apoiando clínicas a terem mais previsibilidade e crescimento sem depender só de indicação. Posso te chamar em uma pergunta bem objetiva?"
  },
  {
    "id": "lead_54",
    "nome": "Lívia Carvalho",
    "instagram": "livia_carvalhopereira",
    "linkPerfil": "https://www.instagram.com/livia_carvalhopereira/",
    "nicho": "Dentista",
    "bio": "mg | odontologia⚕️",
    "postKeywords": "sorriso, alinhadores, odontologia, consulta, confiança",
    "abordagem": "Eisss, tudo certo? Dei uma olhada no seu perfil e achei interessante o trabalho de vocês. Atuo com consultoria de vendas e BPO comercial, apoiando clínicas a terem mais previsibilidade e crescimento sem depender só de indicação. Posso te chamar em uma pergunta bem objetiva?"
  },
  {
    "id": "lead_55",
    "nome": "Priscila Brito",
    "instagram": "priscilafernandabr",
    "linkPerfil": "https://www.instagram.com/priscilafernandabr/",
    "nicho": "Dentista",
    "bio": "| Consultoria financeira estratégica para médicos e clínicas de saúde \\n| Acadêmica de Odontologia",
    "postKeywords": "sorriso, alinhadores, odontologia, consulta, confiança",
    "abordagem": "Eisss, tudo certo? Dei uma olhada no seu perfil e achei interessante o trabalho de vocês. Atuo com consultoria de vendas e BPO comercial, apoiando clínicas a terem mais previsibilidade e crescimento sem depender só de indicação. Posso te chamar em uma pergunta bem objetiva?"
  },
  {
    "id": "lead_56",
    "nome": "",
    "instagram": "nilicas",
    "linkPerfil": "https://www.instagram.com/nilicas/",
    "nicho": "Terapeuta e Fisioterapeuta",
    "bio": "Pitedgras Atendimento: consultório e on line🌱💜🌹🙏\\nBiomedicina, Cosmetologia, Fitoterapia, bem estar natural.\\nCompra/revenda de produto, aqui!",
    "postKeywords": "acolhimento, reabilitação, rotina, dor, qualidade de vida",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e gostei da forma como você apresenta seu trabalho. Eu ajudo profissionais e negócios da área da saúde a organizarem melhor vendas e operação comercial, porque muita gente boa tecnicamente acaba crescendo sem estrutura. Queria te fazer uma pergunta rápida, pode ser?"
  },
  {
    "id": "lead_57",
    "nome": "Carolina Almeida",
    "instagram": "carolsafono",
    "linkPerfil": "https://www.instagram.com/carolsafono/",
    "nicho": "Terapeuta e Fisioterapeuta",
    "bio": "❤️Fonoaudióloga \\n🎈Sócia/Proprietária da @nossacasinhabage\\n🎈ESDM AVANÇADO/Denver- Intervenção Precoce \\n🎈Terapeuta PROMPT Nível 1\\n🎈PODD🎈PECS\\n🎈ABA",
    "postKeywords": "acolhimento, reabilitação, rotina, dor, qualidade de vida, desenvolvimento",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e gostei da forma como você apresenta seu trabalho. Eu ajudo profissionais e negócios da área da saúde a organizarem melhor vendas e operação comercial, porque muita gente boa tecnicamente acaba crescendo sem estrutura. Queria te fazer uma pergunta rápida, pode ser?"
  },
  {
    "id": "lead_58",
    "nome": "Clínica Less",
    "instagram": "clinicaless",
    "linkPerfil": "https://www.instagram.com/clinicaless/",
    "nicho": "Terapeuta e Fisioterapeuta",
    "bio": "Nutrologia | Emagrecimento | Estética avançada | Longevidade saudável | Med. Ortomolecular | Fisioterapia da Mulher\\nAcesse o site. Mande um WhatsApp 👇",
    "postKeywords": "acolhimento, reabilitação, rotina, dor, qualidade de vida, constância, fisioterapia",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e gostei da forma como você apresenta seu trabalho. Eu ajudo profissionais e negócios da área da saúde a organizarem melhor vendas e operação comercial, porque muita gente boa tecnicamente acaba crescendo sem estrutura. Queria te fazer uma pergunta rápida, pode ser?"
  },
  {
    "id": "lead_59",
    "nome": "Dr. Samuel Costa | Emagrecimento Contagem - MG",
    "instagram": "drsamuel.costa",
    "linkPerfil": "https://www.instagram.com/drsamuel.costa/",
    "nicho": "Terapeuta e Fisioterapeuta",
    "bio": "CRMMG 98652\\nEmagrecimento:👇🏻\\n🩺Planos de cuidados individualizados\\n💉Terapias injetáveis Avançadas\\n👨🏻‍⚕️Cuidado integral à saúde\\nAgende a sua consulta👇🏻",
    "postKeywords": "acolhimento, reabilitação, rotina, dor, qualidade de vida, constância",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e gostei da forma como você apresenta seu trabalho. Eu ajudo profissionais e negócios da área da saúde a organizarem melhor vendas e operação comercial, porque muita gente boa tecnicamente acaba crescendo sem estrutura. Queria te fazer uma pergunta rápida, pode ser?"
  },
  {
    "id": "lead_60",
    "nome": "Edmara Bueno | Hernia de disco | Nervo ciátio",
    "instagram": "dra.edmarabuenocoluna",
    "linkPerfil": "https://www.instagram.com/dra.edmarabuenocoluna/",
    "nicho": "Terapeuta e Fisioterapeuta",
    "bio": "Especialista no tratamento da Coluna \\nTratamento fisioterapêutico sem cirurgia nem remédios.\\nResultados visíveis em até 5 semanas.\\nAgendamentos 👇🏻",
    "postKeywords": "acolhimento, reabilitação, rotina, dor, qualidade de vida, fisioterapia",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e gostei da forma como você apresenta seu trabalho. Eu ajudo profissionais e negócios da área da saúde a organizarem melhor vendas e operação comercial, porque muita gente boa tecnicamente acaba crescendo sem estrutura. Queria te fazer uma pergunta rápida, pode ser?"
  },
  {
    "id": "lead_61",
    "nome": "Elis Sudré",
    "instagram": "elissudre",
    "linkPerfil": "https://www.instagram.com/elissudre/",
    "nicho": "Terapeuta e Fisioterapeuta",
    "bio": "Psicanalista\\nMG ↔️ SP\\nUFJF - saúde mental/saúde coletiva; supervisão clínica e institucional",
    "postKeywords": "acolhimento, reabilitação, rotina, dor, qualidade de vida, saúde mental",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e gostei da forma como você apresenta seu trabalho. Eu ajudo profissionais e negócios da área da saúde a organizarem melhor vendas e operação comercial, porque muita gente boa tecnicamente acaba crescendo sem estrutura. Queria te fazer uma pergunta rápida, pode ser?"
  },
  {
    "id": "lead_62",
    "nome": "Fabrina Maia",
    "instagram": "fabrinamaia",
    "linkPerfil": "https://www.instagram.com/fabrinamaia/",
    "nicho": "Terapeuta e Fisioterapeuta",
    "bio": "Fisioterapeuta Dermato Funcional\\n#metodorenatafranca\\n(31)99641-3699",
    "postKeywords": "acolhimento, reabilitação, rotina, dor, qualidade de vida, fisioterapia",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e gostei da forma como você apresenta seu trabalho. Eu ajudo profissionais e negócios da área da saúde a organizarem melhor vendas e operação comercial, porque muita gente boa tecnicamente acaba crescendo sem estrutura. Queria te fazer uma pergunta rápida, pode ser?"
  },
  {
    "id": "lead_63",
    "nome": "Fisioterapia & Saúde Integral | BH",
    "instagram": "clinica_yana",
    "linkPerfil": "https://www.instagram.com/clinica_yana/",
    "nicho": "Terapeuta e Fisioterapeuta",
    "bio": "📍Reabilitação Funcional \\n🧘‍♀️Pilates\\n🍃Saúde Integral \\n✨ Cuidados com o Corpo, Mente e Alma            \\nFale conosco 👇🏻",
    "postKeywords": "acolhimento, reabilitação, rotina, dor, qualidade de vida, pilates",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e gostei da forma como você apresenta seu trabalho. Eu ajudo profissionais e negócios da área da saúde a organizarem melhor vendas e operação comercial, porque muita gente boa tecnicamente acaba crescendo sem estrutura. Queria te fazer uma pergunta rápida, pode ser?"
  },
  {
    "id": "lead_64",
    "nome": "Luciana Wazen",
    "instagram": "lucianalwazen",
    "linkPerfil": "https://www.instagram.com/lucianalwazen/",
    "nicho": "Terapeuta e Fisioterapeuta",
    "bio": "•Fisioterapeuta Pós Graduada em \\nUTI Neonatal e Pediátrica ; \\ne Dermatofuncional 👩🏼‍⚕️\\n•Psicologia 9/10 Ψ",
    "postKeywords": "acolhimento, reabilitação, rotina, dor, qualidade de vida, fisioterapia, saúde mental",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e gostei da forma como você apresenta seu trabalho. Eu ajudo profissionais e negócios da área da saúde a organizarem melhor vendas e operação comercial, porque muita gente boa tecnicamente acaba crescendo sem estrutura. Queria te fazer uma pergunta rápida, pode ser?"
  },
  {
    "id": "lead_65",
    "nome": "Nathália Rodrigues",
    "instagram": "enf_naty.rodrigues_",
    "linkPerfil": "https://www.instagram.com/enf_naty.rodrigues_/",
    "nicho": "Terapeuta e Fisioterapeuta",
    "bio": "🌸Furo humanizado BH e região\\n🌸Enfermeira\\n🌸Especialista em furo de orelhinha👂\\n🌸Método saudável e seguro\\n🌸Auriculoterapia\\n🌸atendimento domiciliar",
    "postKeywords": "acolhimento, reabilitação, rotina, dor, qualidade de vida",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e gostei da forma como você apresenta seu trabalho. Eu ajudo profissionais e negócios da área da saúde a organizarem melhor vendas e operação comercial, porque muita gente boa tecnicamente acaba crescendo sem estrutura. Queria te fazer uma pergunta rápida, pode ser?"
  },
  {
    "id": "lead_66",
    "nome": "Podóloga Márcia Santtos",
    "instagram": "podologamarciasanttos",
    "linkPerfil": "https://www.instagram.com/podologamarciasanttos/",
    "nicho": "Terapeuta e Fisioterapeuta",
    "bio": "👩🏼‍⚕️ Técnica em Podologia - SENAC 2008\\n👴🏻 Podogeriatria e Pés Diabéticos\\n☢ Graduada em Radiologia  Médica\\n📍 Santos - Gonzaga- SP",
    "postKeywords": "acolhimento, reabilitação, rotina, dor, qualidade de vida",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e gostei da forma como você apresenta seu trabalho. Eu ajudo profissionais e negócios da área da saúde a organizarem melhor vendas e operação comercial, porque muita gente boa tecnicamente acaba crescendo sem estrutura. Queria te fazer uma pergunta rápida, pode ser?"
  },
  {
    "id": "lead_67",
    "nome": "Renata Castro | Psicóloga",
    "instagram": "renatacastro.psicologa",
    "linkPerfil": "https://www.instagram.com/renatacastro.psicologa/",
    "nicho": "Terapeuta e Fisioterapeuta",
    "bio": "👩🏼‍💻 Psicóloga CRP 04/64863\\n🧠 Terapia Cognitivo-Comportamental\\n🔎 Prática Baseada em Evidências\\nAtendimentos 🌍👇🏼",
    "postKeywords": "acolhimento, reabilitação, rotina, dor, qualidade de vida, saúde mental",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e gostei da forma como você apresenta seu trabalho. Eu ajudo profissionais e negócios da área da saúde a organizarem melhor vendas e operação comercial, porque muita gente boa tecnicamente acaba crescendo sem estrutura. Queria te fazer uma pergunta rápida, pode ser?"
  },
  {
    "id": "lead_68",
    "nome": "Saúde| Emagrecimento |Estética médica",
    "instagram": "bodyevolutionclinic",
    "linkPerfil": "https://www.instagram.com/bodyevolutionclinic/",
    "nicho": "Terapeuta e Fisioterapeuta",
    "bio": "Clínica médica Body Evolution \\nHarm Facial | Terapia Endonutricional \\nMedicina estética| emagrecimento \\nAssis-SP\\n👇🏻",
    "postKeywords": "acolhimento, reabilitação, rotina, dor, qualidade de vida, constância, nutrição",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e gostei da forma como você apresenta seu trabalho. Eu ajudo profissionais e negócios da área da saúde a organizarem melhor vendas e operação comercial, porque muita gente boa tecnicamente acaba crescendo sem estrutura. Queria te fazer uma pergunta rápida, pode ser?"
  },
  {
    "id": "lead_69",
    "nome": "Studio Lívia Rodrigues | Saúde, Beleza & Bem-Estar",
    "instagram": "studio_liviarodrigues_",
    "linkPerfil": "https://www.instagram.com/studio_liviarodrigues_/",
    "nicho": "Terapeuta e Fisioterapeuta",
    "bio": "✨️Fisioterapeuta dermato/CREFITO 4-319650-F\\n🌿Pilates • Fisioterapia • Estética \\n💆‍♀️Procedimentos personalizados para cuidar de você\\n📍Pedra do Anta",
    "postKeywords": "acolhimento, reabilitação, rotina, dor, qualidade de vida, pilates, fisioterapia",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e gostei da forma como você apresenta seu trabalho. Eu ajudo profissionais e negócios da área da saúde a organizarem melhor vendas e operação comercial, porque muita gente boa tecnicamente acaba crescendo sem estrutura. Queria te fazer uma pergunta rápida, pode ser?"
  },
  {
    "id": "lead_70",
    "nome": "Tauanna Honorato T.O",
    "instagram": "tauannahonoratot.o",
    "linkPerfil": "https://www.instagram.com/tauannahonoratot.o/",
    "nicho": "Terapeuta e Fisioterapeuta",
    "bio": "Estudante de Terapia ocupacional \\n5° período \\nAcompanhe minha jornada na T.O",
    "postKeywords": "acolhimento, reabilitação, rotina, dor, qualidade de vida",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e gostei da forma como você apresenta seu trabalho. Eu ajudo profissionais e negócios da área da saúde a organizarem melhor vendas e operação comercial, porque muita gente boa tecnicamente acaba crescendo sem estrutura. Queria te fazer uma pergunta rápida, pode ser?"
  },
  {
    "id": "lead_71",
    "nome": "Bárbara Tessaro | Dermatologista Curitiba",
    "instagram": "barbaratessaro.dermato",
    "linkPerfil": "https://www.instagram.com/barbaratessaro.dermato/",
    "nicho": "Capilar",
    "bio": "• Membro SBD | CRM 39184 | RQE 33229\\n• Tricologia e estética \\n• Curitiba - PR",
    "postKeywords": "cabelo, fios, couro cabeludo, saúde capilar, autoestima, tricologia",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e curti bastante a forma como vocês comunicam o trabalho capilar. Eu atuo ajudando negócios desse tipo a organizarem melhor comercial e atendimento, porque esse nicho tem muito potencial de crescimento quando processo e gestão acompanham a demanda. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_72",
    "nome": "Dra. Jamille Castañon | Medicina Capilar",
    "instagram": "dra.jamillecastanon.capilar",
    "linkPerfil": "https://www.instagram.com/dra.jamillecastanon.capilar/",
    "nicho": "Capilar",
    "bio": "Médica| Medicina Capilar\\nSaúde dos fios e do couro cabeludo\\nAssoc. Sociedade Brasileira de Cirurgia Capilar @sbrccoficial📍Barbacena/MG\\nAgendamentos ⬇️",
    "postKeywords": "cabelo, fios, couro cabeludo, saúde capilar, autoestima, tratamento capilar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e curti bastante a forma como vocês comunicam o trabalho capilar. Eu atuo ajudando negócios desse tipo a organizarem melhor comercial e atendimento, porque esse nicho tem muito potencial de crescimento quando processo e gestão acompanham a demanda. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_73",
    "nome": "Dra. Viviane Jarek | Tricologia",
    "instagram": "dra.vivianejarek",
    "linkPerfil": "https://www.instagram.com/dra.vivianejarek/",
    "nicho": "Capilar",
    "bio": "❥Saúde da Mulher\\n❥Tratamento Capilar Integrativo e Regenerativo\\n❥Mestrado em Saúde - UFPR\\n📍Atendimentos em Curitiba e On-line",
    "postKeywords": "cabelo, fios, couro cabeludo, saúde capilar, autoestima, tratamento capilar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e curti bastante a forma como vocês comunicam o trabalho capilar. Eu atuo ajudando negócios desse tipo a organizarem melhor comercial e atendimento, porque esse nicho tem muito potencial de crescimento quando processo e gestão acompanham a demanda. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_74",
    "nome": "Mariana Melo | Dermatologia e Tricologia BH",
    "instagram": "dramarianagmelo",
    "linkPerfil": "https://www.instagram.com/dramarianagmelo/",
    "nicho": "Capilar",
    "bio": "Especialista em transformar sua autoestima ao cuidar da sua PELE e dos seus CABELOS✨\\nMÉDICA apaixonada por Dermatologia!\\nCRM-MG 93753\\nAgende no link👇🏼",
    "postKeywords": "cabelo, fios, couro cabeludo, saúde capilar, autoestima, dermatologia, pele saudável, queda capilar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e curti bastante a forma como vocês comunicam o trabalho capilar. Eu atuo ajudando negócios desse tipo a organizarem melhor comercial e atendimento, porque esse nicho tem muito potencial de crescimento quando processo e gestão acompanham a demanda. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_75",
    "nome": "Renata Pacheco Beauty House ®",
    "instagram": "renatapachecobeautyhouse",
    "linkPerfil": "https://www.instagram.com/renatapachecobeautyhouse/",
    "nicho": "Capilar",
    "bio": "Cabelo, estética e cuidados integrados\\nEspecialistas em alongamento capilar com saúde\\nBeleza vivida como experiência\\nAtendimentos de Segunda a Sábado",
    "postKeywords": "cabelo, fios, couro cabeludo, saúde capilar, autoestima, tratamento capilar, queda capilar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e curti bastante a forma como vocês comunicam o trabalho capilar. Eu atuo ajudando negócios desse tipo a organizarem melhor comercial e atendimento, porque esse nicho tem muito potencial de crescimento quando processo e gestão acompanham a demanda. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_76",
    "nome": "Achilles Altivo Advogados | Direito Médico e Odontológico",
    "instagram": "achillesaltivo.adv",
    "linkPerfil": "https://www.instagram.com/achillesaltivo.adv/",
    "nicho": "Parcerias",
    "bio": "⚖️Especialistas em Direito Médico, Odontológico e da Saúde.\\n📄Proteção para profissionais e clínicas\\n📍Atuação em todo Brasil. \\n⤵️Fale com nossa equipe!",
    "postKeywords": "autoridade, posicionamento, marketing, crescimento, resultado, odontologia",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei seu trabalho bem alinhado com o tipo de cliente que também atendo. Hoje eu atuo com consultoria de vendas e BPO comercial, muito focado em negócios da saúde e estética, e achei que faria sentido te chamar pra conectar e explorar possíveis sinergias. Posso te explicar rapidinho?"
  },
  {
    "id": "lead_77",
    "nome": "Alexandra Casoni",
    "instagram": "alexandracasoni",
    "linkPerfil": "https://www.instagram.com/alexandracasoni/",
    "nicho": "Parcerias",
    "bio": "Mãe, Empresária, Mentora & Shark🦈\\nLidero transformação de mulheres e negócios @clubamls @pulsarclubpharma @nutrimindclub .\\nEmbaixadora @audibr",
    "postKeywords": "autoridade, posicionamento, marketing, crescimento, resultado, nutrição",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei seu trabalho bem alinhado com o tipo de cliente que também atendo. Hoje eu atuo com consultoria de vendas e BPO comercial, muito focado em negócios da saúde e estética, e achei que faria sentido te chamar pra conectar e explorar possíveis sinergias. Posso te explicar rapidinho?"
  },
  {
    "id": "lead_78",
    "nome": "Ana Morais",
    "instagram": "anamquintao",
    "linkPerfil": "https://www.instagram.com/anamquintao/",
    "nicho": "Parcerias",
    "bio": "Mineira em Floripa🔺🏝️ \\nConsultora Empresarial \\nCarreira,comportamento,autocuidado, viagens e vida real\\nFé, força e sensibilidade coexistem aqui⚔️🙏🏼🌷♐️",
    "postKeywords": "autoridade, posicionamento, marketing, crescimento, resultado",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei seu trabalho bem alinhado com o tipo de cliente que também atendo. Hoje eu atuo com consultoria de vendas e BPO comercial, muito focado em negócios da saúde e estética, e achei que faria sentido te chamar pra conectar e explorar possíveis sinergias. Posso te explicar rapidinho?"
  },
  {
    "id": "lead_79",
    "nome": "BRV Soluções Médicas/Recurso de Glosas, Credenciamento",
    "instagram": "brv.solucoesmedicas",
    "linkPerfil": "https://www.instagram.com/brv.solucoesmedicas/",
    "nicho": "Parcerias",
    "bio": "📑 Credenciamento em planos de saúde\\n💰 Recurso de glosa\\n📊 Faturamento médico\\n🚀 Menos burocracia, mais resultados!\\nFale conosco e otimize sua gestão!",
    "postKeywords": "autoridade, posicionamento, marketing, crescimento, resultado, faturamento",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei seu trabalho bem alinhado com o tipo de cliente que também atendo. Hoje eu atuo com consultoria de vendas e BPO comercial, muito focado em negócios da saúde e estética, e achei que faria sentido te chamar pra conectar e explorar possíveis sinergias. Posso te explicar rapidinho?"
  },
  {
    "id": "lead_80",
    "nome": "Dra Leidiane Dias • Emagrecimento CRMMT 10027",
    "instagram": "draleidianedias",
    "linkPerfil": "https://www.instagram.com/draleidianedias/",
    "nicho": "Parcerias",
    "bio": "Médica Fundadora da @terusclinica \\nLíder do movimento Atitude&Plenitude | Mentora \\n🏆 +5000 vidas transformadas \\nSua mudança começa aqui ↓",
    "postKeywords": "autoridade, posicionamento, marketing, crescimento, resultado",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei seu trabalho bem alinhado com o tipo de cliente que também atendo. Hoje eu atuo com consultoria de vendas e BPO comercial, muito focado em negócios da saúde e estética, e achei que faria sentido te chamar pra conectar e explorar possíveis sinergias. Posso te explicar rapidinho?"
  },
  {
    "id": "lead_81",
    "nome": "Dra Selma Pardini | Harmonização Orofacial",
    "instagram": "draselmapardini",
    "linkPerfil": "https://www.instagram.com/draselmapardini/",
    "nicho": "Parcerias",
    "bio": "✒️Mentora de Médicos e Dentistas que desejam  vender mais no consultório e criar mentorias no digital.\\n+80 mil atendimentos",
    "postKeywords": "autoridade, posicionamento, marketing, crescimento, resultado",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei seu trabalho bem alinhado com o tipo de cliente que também atendo. Hoje eu atuo com consultoria de vendas e BPO comercial, muito focado em negócios da saúde e estética, e achei que faria sentido te chamar pra conectar e explorar possíveis sinergias. Posso te explicar rapidinho?"
  },
  {
    "id": "lead_82",
    "nome": "Dra. Lorena Leme | Advogada de Médicos e Dentistas",
    "instagram": "dralorenaleme.direitomedico",
    "linkPerfil": "https://www.instagram.com/dralorenaleme.direitomedico/",
    "nicho": "Parcerias",
    "bio": "▫️ Presidente da Comissão de Direito Médico OAB ITZ\\n▫️Esp.em Direito Médico, Odontológico, usuários de planos de saúde e SUS \\n▫️ @lorenaleme.advocacia",
    "postKeywords": "autoridade, posicionamento, marketing, crescimento, resultado, odontologia",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei seu trabalho bem alinhado com o tipo de cliente que também atendo. Hoje eu atuo com consultoria de vendas e BPO comercial, muito focado em negócios da saúde e estética, e achei que faria sentido te chamar pra conectar e explorar possíveis sinergias. Posso te explicar rapidinho?"
  },
  {
    "id": "lead_83",
    "nome": "GH Med Produção Audiovisual",
    "instagram": "gh.medproducoes",
    "linkPerfil": "https://www.instagram.com/gh.medproducoes/",
    "nicho": "Parcerias",
    "bio": "🚀Alta performance em audiovisual médico\\n⚡️Conteúdo entregue no evento, em tempo real\\n🎯 Autoridade e posicionamento\\n📍Congressos | Clínicas | Saúde",
    "postKeywords": "autoridade, posicionamento, marketing, crescimento, resultado, conteúdo",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei seu trabalho bem alinhado com o tipo de cliente que também atendo. Hoje eu atuo com consultoria de vendas e BPO comercial, muito focado em negócios da saúde e estética, e achei que faria sentido te chamar pra conectar e explorar possíveis sinergias. Posso te explicar rapidinho?"
  },
  {
    "id": "lead_84",
    "nome": "Gustavo Hensoli • Médicos High Ticket",
    "instagram": "estrategiaparamedicos",
    "linkPerfil": "https://www.instagram.com/estrategiaparamedicos/",
    "nicho": "Parcerias",
    "bio": "🦅 Transformo médicos em referências de sucesso\\n⚜️ Mentoria e gestão de marketing high ticket\\n🇨🇦 Marketing – British Columbia Institute of Technology",
    "postKeywords": "autoridade, posicionamento, marketing, crescimento, resultado, captação",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei seu trabalho bem alinhado com o tipo de cliente que também atendo. Hoje eu atuo com consultoria de vendas e BPO comercial, muito focado em negócios da saúde e estética, e achei que faria sentido te chamar pra conectar e explorar possíveis sinergias. Posso te explicar rapidinho?"
  },
  {
    "id": "lead_85",
    "nome": "JP Notini®️",
    "instagram": "jp.notini",
    "linkPerfil": "https://www.instagram.com/jp.notini/",
    "nicho": "Parcerias",
    "bio": "🏛️Conselheiro Estratégico, Referência em Negócios e Clínicas de Alto Padrão.\\n💎Intermediações, Geração de Valor, IA Aplicada, Exp. do Cliente & Mkt.",
    "postKeywords": "autoridade, posicionamento, marketing, crescimento, resultado",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei seu trabalho bem alinhado com o tipo de cliente que também atendo. Hoje eu atuo com consultoria de vendas e BPO comercial, muito focado em negócios da saúde e estética, e achei que faria sentido te chamar pra conectar e explorar possíveis sinergias. Posso te explicar rapidinho?"
  },
  {
    "id": "lead_86",
    "nome": "Jacqueline",
    "instagram": "jacquevichy",
    "linkPerfil": "https://www.instagram.com/jacquevichy/",
    "nicho": "Parcerias",
    "bio": "🧡| Vichy \\n🌋| @vichybrasil @lorealgroupe_br \\n💼| Consultora Médica SR",
    "postKeywords": "autoridade, posicionamento, marketing, crescimento, resultado",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei seu trabalho bem alinhado com o tipo de cliente que também atendo. Hoje eu atuo com consultoria de vendas e BPO comercial, muito focado em negócios da saúde e estética, e achei que faria sentido te chamar pra conectar e explorar possíveis sinergias. Posso te explicar rapidinho?"
  },
  {
    "id": "lead_87",
    "nome": "Marcela Muller | Medsystems by Classys",
    "instagram": "marcelamuller.med",
    "linkPerfil": "https://www.instagram.com/marcelamuller.med/",
    "nicho": "Parcerias",
    "bio": "💎Transforme sua clínica em uma operação lucrativa e tecnológica.\\n@classys.inc\\n@medsystems \\n@beautysystems.br \\n@quantasystemofficial \\n@canfieldsci",
    "postKeywords": "autoridade, posicionamento, marketing, crescimento, resultado",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei seu trabalho bem alinhado com o tipo de cliente que também atendo. Hoje eu atuo com consultoria de vendas e BPO comercial, muito focado em negócios da saúde e estética, e achei que faria sentido te chamar pra conectar e explorar possíveis sinergias. Posso te explicar rapidinho?"
  },
  {
    "id": "lead_88",
    "nome": "Mari Veiga / Mentora de médicas(os) e donas(os) de clínicas",
    "instagram": "mariveigamentora",
    "linkPerfil": "https://www.instagram.com/mariveigamentora/",
    "nicho": "Parcerias",
    "bio": "⚜️ Transformo clínicas médicas em negócios de alto faturamento e pacientes em embaixadores da sua marca!\\n+ 50 MM geridos\\nClique e conheça 👇🏻",
    "postKeywords": "autoridade, posicionamento, marketing, crescimento, resultado",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei seu trabalho bem alinhado com o tipo de cliente que também atendo. Hoje eu atuo com consultoria de vendas e BPO comercial, muito focado em negócios da saúde e estética, e achei que faria sentido te chamar pra conectar e explorar possíveis sinergias. Posso te explicar rapidinho?"
  },
  {
    "id": "lead_89",
    "nome": "Maurício",
    "instagram": "biomeds_mauricio",
    "linkPerfil": "https://www.instagram.com/biomeds_mauricio/",
    "nicho": "Parcerias",
    "bio": "Representante Bio Meds\\n@biomedsbrasil",
    "postKeywords": "autoridade, posicionamento, marketing, crescimento, resultado",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei seu trabalho bem alinhado com o tipo de cliente que também atendo. Hoje eu atuo com consultoria de vendas e BPO comercial, muito focado em negócios da saúde e estética, e achei que faria sentido te chamar pra conectar e explorar possíveis sinergias. Posso te explicar rapidinho?"
  },
  {
    "id": "lead_90",
    "nome": "Nando Oliveira | Estratégias Negócios Online 🇧🇷 🇺🇸",
    "instagram": "sounandooliveira",
    "linkPerfil": "https://www.instagram.com/sounandooliveira/",
    "nicho": "Parcerias",
    "bio": "💻 | Desde 2016 atuando na Saúde e Estética \\n📢 | +87mi gerados a empresários \\n🅿️ | MBA Tráfego Pago Subido PRO\\n🔎 | Aumente suas vendas",
    "postKeywords": "autoridade, posicionamento, marketing, crescimento, resultado",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei seu trabalho bem alinhado com o tipo de cliente que também atendo. Hoje eu atuo com consultoria de vendas e BPO comercial, muito focado em negócios da saúde e estética, e achei que faria sentido te chamar pra conectar e explorar possíveis sinergias. Posso te explicar rapidinho?"
  },
  {
    "id": "lead_91",
    "nome": "Regina Rebello | Ginecologista",
    "instagram": "drareginarebello",
    "linkPerfil": "https://www.instagram.com/drareginarebello/",
    "nicho": "Parcerias",
    "bio": "👩🏻‍⚕️Palestrante - Mentora\\n🚀Transformo a vida da mulher40+\\n🌸Menopausa-Hormônios- Emagrecimento-Estética Íntima-Laser\\nCRM 6741|RQE 3764|RQE 9961",
    "postKeywords": "autoridade, posicionamento, marketing, crescimento, resultado, constância, equilíbrio hormonal, menopausa",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei seu trabalho bem alinhado com o tipo de cliente que também atendo. Hoje eu atuo com consultoria de vendas e BPO comercial, muito focado em negócios da saúde e estética, e achei que faria sentido te chamar pra conectar e explorar possíveis sinergias. Posso te explicar rapidinho?"
  },
  {
    "id": "lead_92",
    "nome": "Thiago Nascimento | MedSystems",
    "instagram": "thiago.medsystems",
    "linkPerfil": "https://www.instagram.com/thiago.medsystems/",
    "nicho": "Parcerias",
    "bio": "KAM | Especialista em tecnologia para saúde\\n💡 Ajudo médicos a elevarem seus resultados\\n🤖 @MedSystems | Equipamentos de alta performance\\n📍MG | BH",
    "postKeywords": "autoridade, posicionamento, marketing, crescimento, resultado",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei seu trabalho bem alinhado com o tipo de cliente que também atendo. Hoje eu atuo com consultoria de vendas e BPO comercial, muito focado em negócios da saúde e estética, e achei que faria sentido te chamar pra conectar e explorar possíveis sinergias. Posso te explicar rapidinho?"
  },
  {
    "id": "lead_93",
    "nome": "𝙿𝚊𝚘𝚕𝚊 𝙻𝚊𝚞𝚊𝚛🌷",
    "instagram": "paolalauar",
    "linkPerfil": "https://www.instagram.com/paolalauar/",
    "nicho": "Parcerias",
    "bio": "👑Cristã Filha do Rei @igrejafacedoleao\\n🧬Farmacêutica Bioquímica\\n⚜️Consultora @mesoestetic.brasil \\n💄Styling DermoMakeUp|Arte em realçar beleza softglam",
    "postKeywords": "autoridade, posicionamento, marketing, crescimento, resultado",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei seu trabalho bem alinhado com o tipo de cliente que também atendo. Hoje eu atuo com consultoria de vendas e BPO comercial, muito focado em negócios da saúde e estética, e achei que faria sentido te chamar pra conectar e explorar possíveis sinergias. Posso te explicar rapidinho?"
  },
  {
    "id": "lead_94",
    "nome": "Ana Rosa Freitas",
    "instagram": "ana_rosagdf",
    "linkPerfil": "https://www.instagram.com/ana_rosagdf/",
    "nicho": "Outros",
    "bio": "Saúde feminina & maternidade\\nRotina saudável sem neura\\nVida real, saúde e leveza",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_95",
    "nome": "Ariana | Pró Alvará",
    "instagram": "proalvaraconsultoriasanitaria",
    "linkPerfil": "https://www.instagram.com/proalvaraconsultoriasanitaria/",
    "nicho": "Outros",
    "bio": "•Legalização de estabelecimento de saúde \\n•Especialista em Alvará, POP, PGRSS e CNES\\n•10 anos de experiência \\n•Fale comigo⤵️",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_96",
    "nome": "Avec Anesthésie - Anestesia Ambulatorial e Extra- Hospitalar",
    "instagram": "avec_anesthesie",
    "linkPerfil": "https://www.instagram.com/avec_anesthesie/",
    "nicho": "Outros",
    "bio": "Anestesia Móvel  BH / MG\\nConforto Aliado a Segurança\\nConceito Premium de Anestesia\\nRT: @dianamatoso_anest\\nCRMMG 44810/ RQE 38443",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_97",
    "nome": "Carla Augusto",
    "instagram": "carla.dermadream",
    "linkPerfil": "https://www.instagram.com/carla.dermadream/",
    "nicho": "Outros",
    "bio": "👩🏼‍💻| @dermadreambrasil \\nSaúde/Beleza\\nAesthefill💉@aesthefill_brasil_\\nBotulift 💉@meditox\\nYvoire💉@yvoire_official\\nTSK💉@tsklaboratory",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_98",
    "nome": "Clarissa Viveiros",
    "instagram": "draclarissaviveiros",
    "linkPerfil": "https://www.instagram.com/draclarissaviveiros/",
    "nicho": "Outros",
    "bio": "Biomédica Esteta | Desde 2017 💎 Pós em Estética Avançada | Criadora do método Clari-Slim Detox | Especialista em Harmonização Corporal Feminina",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_99",
    "nome": "Comunidade Girassol | Tempo com Vida",
    "instagram": "comunidade.girassol",
    "linkPerfil": "https://www.instagram.com/comunidade.girassol/",
    "nicho": "Outros",
    "bio": "🌻 Ecossistema de Desenvolvimento Contínuo para Mulheres\\n🧠 Tempo, Comportamento e Saúde Mental\\n⏰ Rotina possível para a vida real \\n⬇️ Quero saber mais",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_100",
    "nome": "Cátia Regina",
    "instagram": "_catiaaregina",
    "linkPerfil": "https://www.instagram.com/_catiaaregina/",
    "nicho": "Outros",
    "bio": "Farmacêutica Bioquímica\\nCo-Founder @unikkapharma @unikkapharma_oficial",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_101",
    "nome": "Deise Nogueira",
    "instagram": "dnogueirat",
    "linkPerfil": "https://www.instagram.com/dnogueirat/",
    "nicho": "Outros",
    "bio": "Dra Deise Nogueira|Clinica Medica|Geriatria\\nUnivaço UFMG",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_102",
    "nome": "Diana Matoso",
    "instagram": "dianamatoso_anest",
    "linkPerfil": "https://www.instagram.com/dianamatoso_anest/",
    "nicho": "Outros",
    "bio": "Anestesista💉,Samuzeira 🚑\\nCEO/Fundadora @avec_anesthesie\\nDra Diana Matoso\\nRQE 38443/CRMMG 44810",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_103",
    "nome": "Dr Daniel Gomes| Acompanhamento Personalizado",
    "instagram": "drdanielgomesaude",
    "linkPerfil": "https://www.instagram.com/drdanielgomesaude/",
    "nicho": "Outros",
    "bio": "🚀Sua melhor versão com saúde e autoestima!\\nMédico CRM-MA7767 | Palestrante\\n✝️ @criesaoluis 💍 @dra.karenmoraes \\nCEO @nucleoprolong 👇🏻Agende aqui",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_104",
    "nome": "Dr. Gabriel Almeida",
    "instagram": "drgabrielalmeida",
    "linkPerfil": "https://www.instagram.com/drgabrielalmeida/",
    "nicho": "Outros",
    "bio": "Médico, Escritor, Palestrante, Professor de Médicos e Empresário\\nCREMESP 180956 Cirurgião Geral RQE 121513\\n💍@manumagalhaes \\nNúcleo GA/Cursos/Livros⤵️",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_105",
    "nome": "Dra Adriana Flora",
    "instagram": "draadrianaflora",
    "linkPerfil": "https://www.instagram.com/draadrianaflora/",
    "nicho": "Outros",
    "bio": "Na medicina integrativa unimos tratamentos convencionais às práticas complementares. Homeopatia e Viscum album (RQE 134793).\\nAgende sua consulta ⬇️",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_106",
    "nome": "Dra Cristina James | CRMMG 46.273",
    "instagram": "dracristinajames",
    "linkPerfil": "https://www.instagram.com/dracristinajames/",
    "nicho": "Outros",
    "bio": "👧👧 Mãe da Ana e da Bele\\n👩‍❤️‍💋‍👨 Esposa do Derson \\n💉 Médica\\n🏥 Ubá @clinica_pravita\\n🏥 VRB @rodrigogomesdesouzaa \\nContato abaixo:",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_107",
    "nome": "Dra Livia Lyra | Varizes BH",
    "instagram": "livialyra",
    "linkPerfil": "https://www.instagram.com/livialyra/",
    "nicho": "Outros",
    "bio": "🔸 Cirurgiã vascular BH\\n🔸 Referência no tratamento avançado de varizes \\n🎯 Resultados duradouros \\n🔸 Fundadora @phleboacademy",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_108",
    "nome": "Dra Maria Silvia Burnier - Oculoplástica BH",
    "instagram": "mariasilviaburnier",
    "linkPerfil": "https://www.instagram.com/mariasilviaburnier/",
    "nicho": "Outros",
    "bio": "Oftalmologista - CRM-MG: 67.792 | RQE: 55.745\\nCirurgia das pálpebras e das vias lacrimais                \\nMembro titular SBCPO\\nBelo Horizonte",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_109",
    "nome": "Dra Sandra Miyoshi Lopes(PhD)",
    "instagram": "drasandramlopes",
    "linkPerfil": "https://www.instagram.com/drasandramlopes/",
    "nicho": "Outros",
    "bio": "✨Método S360:Emagreça e Envelheça com Ciência e Segurança \\n✨Doutorado USP/+60.000vidas transformadas \\n✨Mãe, esposa, médica, palestrante\\n👇🏻Agende",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_110",
    "nome": "Dra Sâmih Galil Cunha",
    "instagram": "drasamihgalil",
    "linkPerfil": "https://www.instagram.com/drasamihgalil/",
    "nicho": "Outros",
    "bio": "⭐Médica Ortopedista e Traumatologista\\n⭐ Especialista em Cirurgia de Joelho\\n⭐ Membro Titular da Soc. Brasileira de Ortopedia e Traumatologia - SBOT",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_111",
    "nome": "Dra. Adriana Moreira",
    "instagram": "adriana.almeidamoreira",
    "linkPerfil": "https://www.instagram.com/adriana.almeidamoreira/",
    "nicho": "Outros",
    "bio": "👩🏻‍⚕️Médica CRM-MG 70673 | RQE 52657 | RQE 69500\\n✈️ 🇧🇷🇺🇸🇨🇱🇺🇾🇦🇷🇵🇹🇮🇹🇻🇦🇭🇺🇦🇹🇨🇿🇫🇷🇬🇧🇪🇸🇬🇷🇭🇷\\n📍Telemedicina\\n⬇️Link para agendamentos de consultas:",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_112",
    "nome": "Dra. Morgana Maia",
    "instagram": "dramorganamaia",
    "linkPerfil": "https://www.instagram.com/dramorganamaia/",
    "nicho": "Outros",
    "bio": "Médica - BH/ MG\\n✨️Saúde e beleza\\n📍Alameda Oscar Niemeyer, 222, Vila da Serra.",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_113",
    "nome": "Dra. Mônica La Rocca | Clínica La Rocca",
    "instagram": "clinicalarocca",
    "linkPerfil": "https://www.instagram.com/clinicalarocca/",
    "nicho": "Outros",
    "bio": "Médica | CRM: 114811-SP   \\nRua Teixeira da Silva 54 cj 12/13- Paraíso SP",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_114",
    "nome": "Dra. Patricia Magier - Ginecologista",
    "instagram": "drapatriciamagier",
    "linkPerfil": "https://www.instagram.com/drapatriciamagier/",
    "nicho": "Outros",
    "bio": "Recupere sua vitalidade e redescubra a mulher poderosa que existe em você!\\nCRM - RJ 54925-6 | RQE 34538\\n📍 Rio de Janeiro - RJ\\nClique para agendar 👇",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_115",
    "nome": "Farmácia Nature Derme",
    "instagram": "farmacianaturederme",
    "linkPerfil": "https://www.instagram.com/farmacianaturederme/",
    "nicho": "Outros",
    "bio": "Farmácia de Manipulação\\nSuplementos, dermocosméticos e fórmulas personalizadas\\nLojas em BH, Betim e Contagem\\n📞 (31) 3214-9050 \\n⬇️ Acesse nossos canais",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_116",
    "nome": "Gisele Ribeiro",
    "instagram": "girodoestilo.tv",
    "linkPerfil": "https://www.instagram.com/girodoestilo.tv/",
    "nicho": "Outros",
    "bio": "🎤 Giro do Estilo: Entrevistas & Coberturas\\n💎 Moda, Saúde, Beleza \\n🎥 Sua marca em evidência\\n📺 Reportagens|Documentários @oficialrbtv \\n📍MG 📍SP",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_117",
    "nome": "Isabela Tavares",
    "instagram": "isabela._tavares",
    "linkPerfil": "https://www.instagram.com/isabela._tavares/",
    "nicho": "Outros",
    "bio": "Enfermeira Esteta | Estética e Saúde\\n✨ Resgatando sua autoestima através da estética regenerativa.\\n📍 Belo Horizonte | @clinica_dermacare",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_118",
    "nome": "Ju SAAVA",
    "instagram": "jusaava",
    "linkPerfil": "https://www.instagram.com/jusaava/",
    "nicho": "Outros",
    "bio": "Moda | Business | Maternidade | Home \\n•Co-Fundadora e Diretora Criativa da @saavabags\\n•Sócia @murusimoveis",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_119",
    "nome": "Kairo Bruno",
    "instagram": "kairobrunoo",
    "linkPerfil": "https://www.instagram.com/kairobrunoo/",
    "nicho": "Outros",
    "bio": "Vendas na Indústria Farmacêutica 💊\\nMBA em Finanças FGV.",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_120",
    "nome": "Karina Carvalho",
    "instagram": "kaj_carvalho",
    "linkPerfil": "https://www.instagram.com/kaj_carvalho/",
    "nicho": "Outros",
    "bio": "▪ Sobrevivi a Trombose Mesentérica 🙏\\n▪ Mamãe da Laís e do Davi @laisedavicb \\n▪ Esposa @mateus.orlandibuchaim \\n▪ Médica 👩‍⚕️ @drakarina.carvalho",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_121",
    "nome": "Leonardo Alves",
    "instagram": "leotomazalves",
    "linkPerfil": "https://www.instagram.com/leotomazalves/",
    "nicho": "Outros",
    "bio": "Gerente Comercial @farmacianaturederme\\nPai da Juju e Lalá\\n#escutesamba e brasilidades🎶\\nFaça o bem, queira o bem e questione o que o sistema impõe♥️",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_122",
    "nome": "Luan Borges",
    "instagram": "dr.luanborges",
    "linkPerfil": "https://www.instagram.com/dr.luanborges/",
    "nicho": "Outros",
    "bio": "🩺MÉDICO - CRM 32060 SC \\n💎 Sim, a transformação começa com uma decisão\\n🚻 Pós em Endocrinologia -  NÃO ESPECIALISTA\\n🏆Ex- obeso\\nBalneário Camboriú 🎡",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_123",
    "nome": "Ludmilla Carmo",
    "instagram": "ludmilladoctor",
    "linkPerfil": "https://www.instagram.com/ludmilladoctor/",
    "nicho": "Outros",
    "bio": "Médica",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_124",
    "nome": "Natalia Queiróz Bechara",
    "instagram": "nataliaqueirozspbechara",
    "linkPerfil": "https://www.instagram.com/nataliaqueirozspbechara/",
    "nicho": "Outros",
    "bio": "Administradora e empreendedora na  @clinicadrmarcelobechara  Medicina com propósito ❤️@drmarcelobechara",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_125",
    "nome": "Nicholas Nogueira Bastos",
    "instagram": "nicholanogbastos",
    "linkPerfil": "https://www.instagram.com/nicholanogbastos/",
    "nicho": "Outros",
    "bio": "Médico 🚑🩺\\nSAMU\\nESF de Pedra do Anta",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_126",
    "nome": "Paulo Vinícius De Araujo Castro",
    "instagram": "pavicastro_",
    "linkPerfil": "https://www.instagram.com/pavicastro_/",
    "nicho": "Outros",
    "bio": "'' Seja uma boa pessoa,  mas não perca seu tempo provando isso '' 👱🏼❤👧🏼 Pai do Bê e Laurinha casado com @jamillecastanon ❤️  ⚕️Biomédico",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_127",
    "nome": "Pediatra e Mãe | Dra. Valdiane Ribeiro",
    "instagram": "dra.valdianeribeiro",
    "linkPerfil": "https://www.instagram.com/dra.valdianeribeiro/",
    "nicho": "Outros",
    "bio": "CRM 59431 | RQE 40909\\n🩺 Pediatra especializada em Psiquiatria Infantil. \\n🍃 Suplementação Infantil.\\n📱 Agende a consulta pelo link ⬇️",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_128",
    "nome": "Poliana",
    "instagram": "polianaverbeno",
    "linkPerfil": "https://www.instagram.com/polianaverbeno/",
    "nicho": "Outros",
    "bio": "Farmacêutica Esteta",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  },
  {
    "id": "lead_129",
    "nome": "Thiago Lander",
    "instagram": "thiago.lander",
    "linkPerfil": "https://www.instagram.com/thiago.lander/",
    "nicho": "Outros",
    "bio": "🇧🇷 🇵🇹 🇪🇸 🇫🇷 Enfermeiro Intensiva / Gestor de Leitos / Gestor em Enfermagem",
    "postKeywords": "saúde, posicionamento, atendimento, rotina, bem-estar",
    "abordagem": "Buenasss, tudo bem? Vi seu perfil e achei interessante o seu posicionamento. Trabalho com consultoria de vendas e BPO comercial, ajudando negócios a estruturarem melhor processo, conversão e operação. Posso te fazer uma pergunta rápida?"
  }
];

export const initialLeads: Lead[] = RAW_LEADS.map(r => ({
  ...r,
  empresa: "",
  perfilFechado: false,
  bioOk: null,
  palavrasChave: r.postKeywords,
  aderenteIcp: null,
  motivoDescarte: null,
  status: "novo" as LeadStatus,
  responsavel: "Rejane",
  prioridade: "media" as Priority,
  resultado: "",
  observacoes: [],
  cadencia: createCadence(),
  ultimaInteracao: null,
  criadoEm: "2026-03-25",
}));
