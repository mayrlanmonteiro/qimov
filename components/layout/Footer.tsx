import {
  ArrowUp,
  ArrowUpRight,
  Instagram,
  MessageCircle,
  Youtube,
} from "lucide-react";
import { QimovLogo } from "@/components/brand/QimovLogo";
import { MODELS } from "@/lib/models";
import {
  CHAPTERS,
  SITE,
  whatsappLink,
} from "@/lib/site";

export function Footer() {
  return (
    <footer
      data-nav-theme="dark"
      className="relative overflow-hidden border-t border-white/10 bg-carbon text-cream"
    >
      <div className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-brand/[0.05] blur-[140px]" />
      <div className="relative mx-auto max-w-[1600px] px-5 pb-7 pt-16 sm:px-8 sm:pt-20 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.65fr_0.65fr_0.9fr]">
          <div>
            <a
              href="#inicio"
              aria-label="QIMOV — voltar ao início"
              className="inline-flex transition-opacity hover:opacity-70"
            >
              <QimovLogo showTagline />
            </a>
            <p className="mt-6 max-w-[310px] text-[1.35rem] font-medium leading-[1.25] tracking-[-0.02em] text-cream/85">
              Mobilidade elétrica feita para o ritmo de Teresina.
            </p>
            <p className="mt-4 max-w-[300px] text-[12px] leading-relaxed text-white/45">
              Scooters elétricas, tecnologia e uma nova forma de sentir a
              cidade. Energia em movimento.
            </p>

            <div className="mt-6 flex items-center gap-2">
              <SocialLink
                href={SITE.instagram}
                label="Instagram da QIMOV"
                icon={<Instagram size={14} />}
              />
              <SocialLink
                href={SITE.youtube}
                label="YouTube da QIMOV"
                icon={<Youtube size={15} />}
              />
              <SocialLink
                href={whatsappLink(
                  "Olá, QIMOV! Quero saber mais sobre as scooters elétricas.",
                )}
                label="WhatsApp da QIMOV"
                icon={<MessageCircle size={15} />}
              />
            </div>
          </div>

          <FooterColumn title="Navegue">
            {CHAPTERS.map((chapter) => (
              <FooterLink key={chapter.href} href={chapter.href}>
                {chapter.index}. {chapter.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Linha 2026">
            {MODELS.map((model) => (
              <FooterLink key={model.id} href="#catalogo">
                {model.name}
              </FooterLink>
            ))}
          </FooterColumn>

          <div>
            <p className="text-label text-white/40">
              Showroom
            </p>
            <div className="mt-5 space-y-4">
              <div>
                <p className="text-[12px] leading-relaxed text-white/65">
                  {SITE.address}
                </p>
                <p className="mt-1 text-[11px] text-white/40">
                  {SITE.hours}
                </p>
              </div>
              <a
                href={`mailto:${SITE.email}`}
                className="block text-[12px] text-white/55 transition-colors hover:text-brand"
              >
                {SITE.email}
              </a>
              <a
                href={whatsappLink(
                  "Olá, QIMOV! Quero falar com o showroom de Teresina.",
                )}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 border-b border-brand/40 pb-1 text-[12px] font-medium tracking-[-0.01em] text-brand transition-colors hover:border-brand"
              >
                Falar no WhatsApp
                <ArrowUpRight size={11} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-white/35">
            © 2026 QIMOV Energia em Movimento · Teresina, Piauí
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-white/35">
            <span>Pré-venda 2026</span>
            <span className="h-2 w-px bg-white/10" />
            <span>Imagens ilustrativas</span>
            <span className="h-2 w-px bg-white/10" />
            <a
              href="#inicio"
              className="group flex items-center gap-2 text-white/35 transition-colors hover:text-brand"
            >
              Voltar ao topo
              <ArrowUp
                size={10}
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>

        <div className="relative mt-8 select-none overflow-hidden border-t border-white/5 pt-8">
          <div className="flex items-end justify-between gap-4">
            <span className="font-display text-[clamp(5rem,19vw,19rem)] font-bold leading-[0.7] tracking-[-0.05em] text-white/[0.05]">
              QIMOV
            </span>
            <span className="mb-1 hidden font-mono text-[10px] leading-relaxed tracking-[0.02em] text-white/30 sm:block">
              05°05′S / 42°48′W
              <br />
              Energia em movimento
            </span>
          </div>
          <span className="pointer-events-none absolute bottom-[4%] left-[min(66vw,12rem)] h-2 w-2 rounded-full bg-brand sm:h-3 sm:w-3" />
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-label text-white/40">
        {title}
      </p>
      <nav aria-label={title} className="mt-5 flex flex-col gap-3">
        {children}
      </nav>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="group flex w-fit items-center gap-2 text-[12px] text-white/55 transition-colors duration-300 hover:text-brand"
    >
      <span className="h-px w-0 bg-brand transition-all duration-300 group-hover:w-3" />
      {children}
    </a>
  );
}

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-white/45 transition-all duration-300 hover:border-brand hover:bg-brand hover:text-carbon"
    >
      {icon}
    </a>
  );
}
