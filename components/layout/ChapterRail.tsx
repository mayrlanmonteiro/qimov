"use client";

import { useRef } from "react";
import { useScrollProgress, useSectionTheme } from "@/hooks/useSectionTheme";
import { CHAPTERS } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Trilho editorial fixo: mostra o capítulo atual e permite saltar entre seções.
 * Compartilha o mesmo listener de scroll da navbar (zero loops duplicados).
 */
export function ChapterRail() {
  const { theme, activeChapter } = useSectionTheme();
  const progressRef = useRef<HTMLSpanElement>(null);

  useScrollProgress(progressRef);

  const isLight = theme === "light";

  return (
    <aside
      aria-label="Progresso editorial da página"
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block 2xl:right-7"
    >
      <div
        className={cn(
          "mb-3 hidden text-right text-[9px] font-semibold tracking-[0.04em] transition-colors duration-500 min-[1800px]:block",
          isLight ? "text-carbon/35" : "text-white/30",
        )}
      >
        Capítulo
      </div>

      <div className="relative flex flex-col items-end gap-3">
        <span
          className={cn(
            "absolute -right-2 top-0 h-full w-px transition-colors duration-500",
            isLight ? "bg-carbon/15" : "bg-white/12",
          )}
        />
        <span
          ref={progressRef}
          className="absolute -right-2 top-0 h-full w-px origin-top bg-brand"
          style={{ transform: "scaleY(0)" }}
        />
        <span
          aria-hidden="true"
          className="absolute -right-[7px] top-0 h-2.5 w-2.5 rounded-full border-2 border-brand bg-carbon"
          style={{ transform: "translateY(-20%)" }}
        />

        {CHAPTERS.map((chapter, index) => {
          const isActive = index === activeChapter;
          return (
            <a
              key={chapter.href}
              href={chapter.href}
              aria-label={`${chapter.index}. ${chapter.label}`}
              aria-current={isActive ? "location" : undefined}
              className="group relative flex items-center gap-3 py-0.5"
            >
              <span
                className={cn(
                  "pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full border px-2.5 py-1 text-[10px] font-medium tracking-[0.01em] opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.14)] backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 min-[1800px]:hidden",
                  isLight
                    ? "border-carbon/10 bg-cream/90 text-carbon"
                    : "border-white/10 bg-carbon/90 text-cream",
                )}
              >
                {chapter.index}. {chapter.label}
              </span>
              <span
                className={cn(
                  "hidden whitespace-nowrap text-[10px] font-medium tracking-[0.02em] transition-all duration-500 min-[1800px]:inline",
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-70",
                  isLight
                    ? isActive
                      ? "text-carbon"
                      : "text-carbon/60"
                    : isActive
                      ? "text-cream"
                      : "text-white/50",
                )}
              >
                {chapter.index}. {chapter.label}
              </span>
              <span
                className={cn(
                  "font-mono text-[9px] tracking-[0.06em] transition-colors duration-500 min-[1800px]:hidden",
                  isActive
                    ? "text-brand"
                    : isLight
                      ? "text-carbon/35"
                      : "text-white/30",
                )}
              >
                {chapter.index}
              </span>
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-all duration-500",
                  isActive
                    ? "scale-125 bg-brand shadow-[0_0_0_3px_rgba(242,101,34,0.14)]"
                    : isLight
                      ? "bg-carbon/25 group-hover:bg-carbon/50"
                      : "bg-white/25 group-hover:bg-white/60",
                )}
              />
            </a>
          );
        })}
      </div>
    </aside>
  );
}
