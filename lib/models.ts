export type ProductColor = {
  name: string;
  shortName: string;
  hex: string;
};

export type ProductCategory =
  | "urbana"
  | "esportiva"
  | "sem-cnh"
  | "trabalho";

export type ScooterVariant = "street" | "sport" | "cargo";

export type ScooterModel = {
  id: string;
  edition: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  noLicense: boolean;
  tagline: string;
  description: string;
  price: number;
  compareAt?: number;
  badge?: string;
  variant: ScooterVariant;
  colors: ProductColor[];
  specs: {
    speed: number;
    autonomy: number;
    power: number;
    chargeHours: number;
    battery: string;
    batteryCapacity: string;
    motor: string;
    brakes: string;
    display: string;
    tires: string;
    suspension: string;
    weight: number;
    maxLoad: number;
    ipRating: string;
  };
  highlights: string[];
  valueScore: number;
};

export const QIMOV_COLORS: ProductColor[] = [
  { name: "Preto Fosco", shortName: "Preto", hex: "#1B1D21" },
  { name: "Prata Titânio", shortName: "Prata", hex: "#B9BEC1" },
  { name: "Laranja QIMOV", shortName: "Laranja", hex: "#F26522" },
  { name: "Azul Elétrico", shortName: "Azul", hex: "#2F63E9" },
];

export const CATEGORIES: { id: ProductCategory | "todos"; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "urbana", label: "Urbana" },
  { id: "esportiva", label: "Esportiva" },
  { id: "sem-cnh", label: "Sem CNH (Autopropelido)" },
  { id: "trabalho", label: "Trabalho / Delivery" },
];

export const MODELS: ScooterModel[] = [
  {
    id: "city-lite",
    edition: "01",
    name: "City Lite",
    category: "sem-cnh",
    categoryLabel: "Autopropelido",
    noLicense: true,
    tagline: "Comece leve. Chegue longe.",
    description:
      "A porta de entrada para a mobilidade QIMOV. Compacta, silenciosa e fácil de conduzir, a City Lite foi desenhada para o ritmo de Teresina — sem CNH, sem combustível, sem complicação.",
    price: 7290,
    badge: "Dispensa CNH",
    variant: "street",
    colors: QIMOV_COLORS,
    specs: {
      speed: 32,
      autonomy: 45,
      power: 500,
      chargeHours: 4,
      battery: "Lítio removível 48V",
      batteryCapacity: "20 Ah · 960 Wh",
      motor: "Hub brushless 500W",
      brakes: "Disco dianteiro + E-ABS",
      display: "LCD Smart",
      tires: "10\" tubeless",
      suspension: "Forqueta telescópica",
      weight: 28,
      maxLoad: 120,
      ipRating: "IPX4",
    },
    highlights: [
      "Bateria removível para recarregar em qualquer tomada",
      "Modo ECO para ampliar a autonomia no dia a dia",
      "Chassi em alumínio leve e dobrável para transporte",
    ],
    valueScore: 9.4,
  },
  {
    id: "urban-one",
    edition: "02",
    name: "Urban One",
    category: "urbana",
    categoryLabel: "Urbana",
    noLicense: false,
    tagline: "A cidade é o seu território.",
    description:
      "O equilíbrio exato entre presença, conforto e tecnologia. A Urban One transforma deslocamentos cotidianos em uma experiência fluida, com posição de pilotagem estável e acabamento premium.",
    price: 9990,
    compareAt: 10990,
    badge: "Mais vendida",
    variant: "street",
    colors: QIMOV_COLORS,
    specs: {
      speed: 45,
      autonomy: 65,
      power: 1000,
      chargeHours: 3.5,
      battery: "Lítio removível 60V",
      batteryCapacity: "24 Ah · 1.440 Wh",
      motor: "Hub brushless 1.000W",
      brakes: "Discos hidráulicos dianteiro e traseiro",
      display: "LCD colorido 4,3\"",
      tires: "10\" reforçados",
      suspension: "Duplo amortecedor traseiro",
      weight: 43,
      maxLoad: 150,
      ipRating: "IPX5",
    },
    highlights: [
      "Painel digital com navegação, bateria e modos de pilotagem",
      "Iluminação full LED com luz de circulação diurna",
      "Conexão com app para diagnóstico e bloqueio remoto",
    ],
    valueScore: 9.1,
  },
  {
    id: "neo",
    edition: "03",
    name: "Neo",
    category: "urbana",
    categoryLabel: "Urbana",
    noLicense: false,
    tagline: "O futuro, todos os dias.",
    description:
      "Minimalista por fora, inteligente por dentro. A Neo entrega a essência da engenharia QIMOV em uma scooter ágil, confortável e pronta para acompanhar o seu ritmo.",
    price: 8990,
    badge: "Novo",
    variant: "street",
    colors: QIMOV_COLORS,
    specs: {
      speed: 40,
      autonomy: 60,
      power: 800,
      chargeHours: 4,
      battery: "Lítio removível 60V",
      batteryCapacity: "20 Ah · 1.200 Wh",
      motor: "Hub brushless 800W",
      brakes: "Discos dianteiro e traseiro",
      display: "LCD Smart",
      tires: "10\" tubeless",
      suspension: "Forqueta telescópica",
      weight: 39,
      maxLoad: 140,
      ipRating: "IPX4",
    },
    highlights: [
      "Design monocoque com cabos integrados",
      "Três modos de condução: ECO, DRIVE e SPORT",
      "Farol adaptativo com alcance de 35 metros",
    ],
    valueScore: 9.2,
  },
  {
    id: "sport-s",
    edition: "04",
    name: "Sport S",
    category: "esportiva",
    categoryLabel: "Esportiva",
    noLicense: false,
    tagline: "Silêncio não significa calma.",
    description:
      "Aceleração instantânea, suspensão esportiva e uma presença que não passa despercebida. A Sport S é a expressão mais dinâmica da mobilidade elétrica QIMOV.",
    price: 15490,
    badge: "Performance",
    variant: "sport",
    colors: QIMOV_COLORS,
    specs: {
      speed: 65,
      autonomy: 85,
      power: 2000,
      chargeHours: 3,
      battery: "Lítio removível 72V",
      batteryCapacity: "27 Ah · 1.944 Wh",
      motor: "Hub brushless 2.000W",
      brakes: "Discos hidráulicos com ABS",
      display: "TFT colorido 5\"",
      tires: "11\" esportivos",
      suspension: "Forqueta invertida + monoamortecedor",
      weight: 56,
      maxLoad: 160,
      ipRating: "IPX5",
    },
    highlights: [
      "Aceleração de 0 a 45 km/h em 4,2 segundos",
      "Suspensão invertida com ajuste de pré-carga",
      "Telemetria completa e modos de condução no app",
    ],
    valueScore: 8.7,
  },
  {
    id: "cargo-pro",
    edition: "05",
    name: "Cargo Pro",
    category: "trabalho",
    categoryLabel: "Trabalho / Delivery",
    noLicense: false,
    tagline: "Mais entregas. Menos custo.",
    description:
      "Engenharia feita para trabalhar. A Cargo Pro combina autonomia estendida, capacidade de carga e um bagageiro modular para transformar cada quilômetro em resultado.",
    price: 12990,
    badge: "Delivery",
    variant: "cargo",
    colors: QIMOV_COLORS,
    specs: {
      speed: 45,
      autonomy: 110,
      power: 1200,
      chargeHours: 5,
      battery: "Lítio removível 60V",
      batteryCapacity: "40 Ah · 2.400 Wh (dupla)",
      motor: "Hub brushless 1.200W",
      brakes: "Discos hidráulicos reforçados",
      display: "LCD Smart com telemetria",
      tires: "10\" reforçados para carga",
      suspension: "Duplo amortecedor de carga",
      weight: 62,
      maxLoad: 180,
      ipRating: "IPX5",
    },
    highlights: [
      "Bagageiro traseiro modular para até 45 kg",
      "Suporte duplo de baterias com gestão inteligente",
      "Modo Carga com regeneração em descidas",
    ],
    valueScore: 8.9,
  },
  {
    id: "titan-x",
    edition: "06",
    name: "Titan X",
    category: "esportiva",
    categoryLabel: "Esportiva",
    noLicense: false,
    tagline: "O estado mais puro da engenharia.",
    description:
      "O topo da linha QIMOV. A Titan X reúne todos os avanços da marca em uma máquina de presença escultural, performance superior e autonomia para atravessar a cidade sem escalas.",
    price: 21990,
    badge: "Flagship",
    variant: "sport",
    colors: QIMOV_COLORS,
    specs: {
      speed: 80,
      autonomy: 120,
      power: 3000,
      chargeHours: 3.5,
      battery: "Lítio removível 72V",
      batteryCapacity: "40 Ah · 2.880 Wh",
      motor: "Hub brushless 3.000W",
      brakes: "Discos hidráulicos com ABS e EBS",
      display: "TFT 7\" com conectividade total",
      tires: "12\" performance",
      suspension: "Forqueta invertida Öhlins-style",
      weight: 74,
      maxLoad: 170,
      ipRating: "IPX6",
    },
    highlights: [
      "Modo LAUNCH com controle de tração",
      "Navegação turn-by-turn no painel TFT",
      "Carregamento rápido de 0 a 80% em 2h15",
    ],
    valueScore: 8.2,
  },
];

export const getModelById = (id: string) =>
  MODELS.find((model) => model.id === id);

export function buildModelWhatsAppMessage(
  model: ScooterModel,
  colorName: string,
) {
  return [
    "Olá, QIMOV! Quero reservar uma scooter da pré-venda 2026.",
    "",
    `Modelo: QIMOV ${model.name}`,
    `Cor: ${colorName}`,
    `Preço à vista: ${model.price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
    })}`,
    "",
    "Podemos falar sobre disponibilidade e test ride?",
  ].join("\n");
}
