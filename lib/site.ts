export const SITE = {
  name: "QIMOV",
  tagline: "Energia em movimento.",
  city: "Teresina",
  state: "PI",
  address: "Teresina, Piauí — atendimento presencial com hora marcada",
  hours: "Segunda a sábado · 08h às 18h",
  instagram: "https://instagram.com/qimov",
  youtube: "https://youtube.com/@qimov",
  email: "contato@qimov.com.br",
  /**
   * Substitua pelo número oficial da QIMOV.
   * Formato internacional, somente dígitos: 5586XXXXXXXXX
   */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5586999999999",
} as const;

export const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Modelos", href: "#catalogo" },
  { label: "Engenharia", href: "#destaques" },
  { label: "Simulador", href: "#economia" },
  { label: "Contato", href: "#showroom" },
] as const;

export const CHAPTERS = [
  { index: "01", label: "Início", href: "#inicio" },
  { index: "02", label: "Destaques", href: "#destaques" },
  { index: "03", label: "Catálogo", href: "#catalogo" },
  { index: "04", label: "Comparador", href: "#comparador" },
  { index: "05", label: "Economia", href: "#economia" },
  { index: "06", label: "Showroom", href: "#showroom" },
] as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WA_MESSAGE =
  "Olá, QIMOV! Vi o site e quero saber mais sobre as scooters elétricas e a pré-venda 2026.";
