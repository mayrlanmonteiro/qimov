"use client";

import { useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";
import { ArrowUpRight, Instagram, Menu, X } from "lucide-react";
import { QimovLogo, QimovMark } from "@/components/brand/QimovLogo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  useScrollLock,
  useSmoothScroll,
} from "@/components/providers/SmoothScrollProvider";
import { useSectionTheme } from "@/hooks/useSectionTheme";
import { CHAPTERS, NAV_LINKS, SITE, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { theme, scrolled } = useSectionTheme();
  const { lenis } = useSmoothScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const isLight = theme === "light" && !menuOpen;

  useScrollLock(menuOpen);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen]);

  const navigateFromMenu = (href: string) => {
    setMenuOpen(false);
    window.setTimeout(() => {
      if (lenis) {
        lenis.scrollTo(href, {
          offset: -64,
          duration: 1.25,
          easing: (t: number) => 1 - Math.pow(1 - t, 3),
        });
      } else {
        document
          .querySelector<HTMLElement>(href)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleLogoClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (!menuOpen) return;
    event.preventDefault();
    navigateFromMenu("#inicio");
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[70] h-[var(--header-height)] transition-[background-color,border-color,color] duration-500",
          "backdrop-blur-md",
          scrolled || menuOpen
            ? isLight
              ? "border-b border-carbon/[0.08] bg-cream/80"
              : "border-b border-white/[0.08] bg-carbon/65"
            : "border-b border-transparent bg-transparent",
          isLight ? "text-carbon" : "text-cream",
        )}
      >
        <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-5 sm:px-7 lg:px-10">
          <a
            href="#inicio"
            aria-label="QIMOV — voltar ao início"
            className="group relative z-10 flex items-center transition-opacity duration-300 hover:opacity-70"
            onClick={handleLogoClick}
          >
            <QimovLogo markClassName="h-[26px] w-[26px] transition-transform duration-700 ease-out group-hover:rotate-[-12deg]" />
          </a>

          <nav
            aria-label="Navegação principal"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 lg:flex xl:gap-8"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative py-2 text-[13px] font-medium tracking-[-0.01em]"
              >
                <span className="absolute -left-3 top-1/2 h-1 w-1 -translate-y-1/2 scale-0 rounded-full bg-brand transition-transform duration-300 group-hover:scale-100" />
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="relative z-10 flex items-center gap-2.5">
            <MagneticButton
              href="#test-ride"
              variant={isLight ? "dark" : "primary"}
              className="hidden min-h-10 px-5 py-2.5 text-[12px] sm:inline-flex"
              icon={<ArrowUpRight size={13} strokeWidth={1.9} />}
            >
              Test Ride
            </MagneticButton>

            <button
              type="button"
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden",
                isLight
                  ? "border-carbon/20 hover:border-carbon hover:bg-carbon hover:text-cream"
                  : "border-white/20 hover:border-brand hover:bg-brand hover:text-carbon",
              )}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-[65] flex h-[100svh] flex-col overflow-y-auto bg-carbon text-cream lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          data-lenis-prevent
        >
          <div className="soft-grid absolute inset-0 text-white opacity-[0.035]" />
          <div className="absolute -right-20 top-24 h-80 w-80 rounded-full bg-brand/10 blur-[100px]" />
          <QimovMark className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 text-white/[0.04]" />

          <div className="relative flex flex-1 flex-col px-5 pb-10 pt-[calc(var(--header-height)+38px)] sm:px-8">
            <p className="mb-8 flex items-center gap-3 text-label text-white/45">
              <span className="h-px w-6 bg-brand" />
              Navegue pela experiência
            </p>

            <nav className="flex flex-col" aria-label="Navegação mobile">
              {CHAPTERS.map((chapter, index) => (
                <button
                  key={chapter.href}
                  type="button"
                  onClick={() => navigateFromMenu(chapter.href)}
                  className="fade-up group flex items-center justify-between border-b border-white/10 py-4 text-left"
                  style={{ animationDelay: `${index * 55}ms` }}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="text-[12px] font-semibold text-brand">
                      {chapter.index}
                    </span>
                    <span className="font-display text-[clamp(1.9rem,7vw,3.2rem)] font-semibold leading-none tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-2">
                      {chapter.label}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={20}
                    strokeWidth={1.3}
                    className="text-white/30 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand"
                  />
                </button>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-5 pt-10 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-label text-white/40">
                  Showroom Teresina
                </p>
                <p className="mt-2 text-sm text-white/65">{SITE.address}</p>
                <p className="mt-1 text-xs text-white/40">{SITE.hours}</p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="QIMOV no Instagram"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-brand hover:text-brand"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href={whatsappLink("Olá, QIMOV! Quero conhecer os modelos.")}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-[12px] font-semibold tracking-[-0.01em] text-carbon transition-colors hover:bg-brand-dark"
                >
                  WhatsApp
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
