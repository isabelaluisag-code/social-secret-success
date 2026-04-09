// Social Selling Data - Generic Template
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

// No more hardcoded leads - starts empty
export const initialLeads: Lead[] = [];

// Helper to create a lead from spreadsheet row data
export function createLeadFromImport(row: {
  nome?: string;
  fullName?: string;
  username?: string;
  instagram?: string;
  bio?: string;
  nicho?: string;
  empresa?: string;
  followers?: string;
  email?: string;
  phone?: string;
  city?: string;
  category?: string;
}, index: number): Lead {
  const nome = row.nome || row.fullName || row.username || `Lead ${index + 1}`;
  const instagram = (row.instagram || row.username || "").replace("@", "");
  return {
    id: `lead_${Date.now()}_${index}`,
    nome,
    instagram,
    linkPerfil: instagram ? `https://www.instagram.com/${instagram}/` : "",
    empresa: row.empresa || "",
    nicho: row.nicho || row.category || "Geral",
    bio: row.bio || "",
    postKeywords: "",
    abordagem: "",
    perfilFechado: false,
    bioOk: null,
    palavrasChave: "",
    aderenteIcp: null,
    motivoDescarte: null,
    status: "novo",
    responsavel: "",
    prioridade: "media",
    resultado: "",
    observacoes: [],
    cadencia: createCadence(),
    ultimaInteracao: null,
    criadoEm: new Date().toISOString().split("T")[0],
  };
}
