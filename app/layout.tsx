import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Navbar } from "@/components/layout/Navbar";
import { ChapterRail } from "@/components/layout/ChapterRail";
import { Footer } from "@/components/layout/Footer";

/*
 * Sistema tipográfico QIMOV
 *
 * Manrope é a voz principal: grotesca geométrica, moderna e legível em
 * telas pequenas. A hierarquia vem de peso, tamanho e cor — sem serifas
 * itálicas ou microtexto monoespaçado com tracking exagerado.
 * JetBrains Mono fica reservada a dados técnicos (números de ficha,
 * telemetria e leituras do HUD).
 */
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://qimov.com.br"),
  title: {
    default: "QIMOV — Energia em Movimento | Scooters Elétricas em Teresina",
    template: "%s | QIMOV",
  },
  description:
    "Scooters elétricas QIMOV em Teresina, PI. Tecnologia piauiense, autonomia real, bateria removível e pré-venda 2026. Explore os modelos e agende seu test ride.",
  keywords: [
    "QIMOV",
    "scooter elétrica Teresina",
    "moto elétrica Piauí",
    "scooter elétrica Piauí",
    "mobilidade elétrica",
    "bateria removível",
    "pré-venda 2026",
    "test ride Teresina",
  ],
  authors: [{ name: "QIMOV" }],
  creator: "QIMOV",
  publisher: "QIMOV",
  category: "mobilidade elétrica",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "QIMOV",
    title: "QIMOV — Energia em Movimento",
    description:
      "Scooters elétricas de alta performance em Teresina, PI. Conheça a coleção 2026, compare modelos e calcule sua economia.",
  },
  twitter: {
    card: "summary_large_image",
    title: "QIMOV — Energia em Movimento",
    description:
      "Mobilidade elétrica piauiense. Scooters, engenharia e pré-venda 2026.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0D0F12",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${manrope.variable} ${jetbrains.variable}`}
    >
      <body>
        <link
          rel="preload"
          as="image"
          href="/hero-sequence/frame_0001.webp"
          fetchPriority="high"
        />
        <noscript>
          <style>{`[data-reveal="pending"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <div className="noise-overlay" aria-hidden="true" />
        <SmoothScrollProvider>
          <Navbar />
          <ChapterRail />
          <main id="conteudo">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
