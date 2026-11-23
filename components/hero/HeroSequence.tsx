"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  ArrowDown,
  ArrowUpRight,
  BatteryCharging,
  Cpu,
  Gauge,
  MonitorSmartphone,
  Timer,
  Zap,
} from "lucide-react";
import { QimovLogo, QimovMark } from "@/components/brand/QimovLogo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useScrollLock } from "@/components/providers/SmoothScrollProvider";
import { useImageSequenceScroll } from "@/components/hero/useImageSequenceScroll";
import { cn, smoothstep } from "@/lib/utils";

type Act = 0 | 1 | 2;

const HUD_LABELS = ["Intro", "Movimento", "Engenharia"];

function applyLayer(
  element: HTMLElement | null,
  opacity: number,
  translateY: number,
) {
  if (!element) return;

  const visible = opacity > 0.02;
  element.style.opacity = opacity.toFixed(3);
  element.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0)`;
  element.style.visibility = visible ? "visible" : "hidden";
  element.style.pointerEvents = opacity > 0.7 ? "auto" : "none";
}

export function HeroSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const actOneRef = useRef<HTMLDivElement>(null);
  const actTwoRef = useRef<HTMLDivElement>(null);
  const actThreeRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLSpanElement>(null);
  const frameLabelRef = useRef<HTMLSpanElement>(null);
  const actLabelRef = useRef<HTMLSpanElement>(null);
  const verticalProgressRef = useRef<HTMLSpanElement>(null);

  const [activeAct, setActiveAct] = useState<Act>(0);
  const activeActRef = useRef<Act>(0);
  const [loaderHidden, setLoaderHidden] = useState(false);

  const handleProgress = useCallback((progress: number) => {
    const actOneOpacity = 1 - smoothstep(0.25, 0.35, progress);
    const actTwoOpacity =
      smoothstep(0.32, 0.4, progress) *
      (1 - smoothstep(0.61, 0.7, progress));
    const actThreeOpacity = smoothstep(0.68, 0.77, progress);

    applyLayer(
      actOneRef.current,
      actOneOpacity,
      -26 * smoothstep(0.2, 0.35, progress),
    );
    applyLayer(
      actTwoRef.current,
      actTwoOpacity,
      34 * (1 - smoothstep(0.32, 0.41, progress)) -
        26 * smoothstep(0.61, 0.72, progress),
    );
    applyLayer(
      actThreeRef.current,
      actThreeOpacity,
      40 * (1 - smoothstep(0.68, 0.78, progress)),
    );

    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `scaleX(${progress})`;
    }
    if (verticalProgressRef.current) {
      verticalProgressRef.current.style.transform = `scaleY(${progress})`;
    }
    if (frameLabelRef.current) {
      const frame = Math.min(
        120,
        Math.max(1, Math.round(progress * 119) + 1),
      );
      frameLabelRef.current.textContent = `FRAME ${String(frame).padStart(3, "0")} / 120`;
    }
    if (actLabelRef.current) {
      const nextAct: Act = progress < 0.33 ? 0 : progress < 0.7 ? 1 : 2;
      actLabelRef.current.textContent = HUD_LABELS[nextAct];
    }

    const nextAct: Act = progress < 0.33 ? 0 : progress < 0.7 ? 1 : 2;
    if (nextAct !== activeActRef.current) {
      activeActRef.current = nextAct;
      setActiveAct(nextAct);
    }
  }, []);

  const { isReady, loadProgress, totalFrames } = useImageSequenceScroll({
    containerRef: sectionRef,
    canvasRef,
    onProgress: handleProgress,
  });

  useScrollLock(!isReady);

  useEffect(() => {
    if (!isReady) return;
    const timer = window.setTimeout(() => setLoaderHidden(true), 950);
    return () => window.clearTimeout(timer);
  }, [isReady]);

  const loaderOpacityClass = isReady ? "opacity-0" : "opacity-100";

  return (
    <>
      {!loaderHidden ? (
        <div
          role="status"
          aria-live="polite"
          aria-label="Carregando a experiência QIMOV"
          className={cn(
            "fixed inset-0 z-[100] flex flex-col overflow-hidden bg-carbon text-cream transition-opacity duration-700 ease-out",
            loaderOpacityClass,
            isReady && "pointer-events-none",
          )}
        >
          <div className="soft-grid pointer-events-none absolute inset-0 text-white opacity-[0.035]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[65vmin] w-[65vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/10">
            <span className="absolute inset-[12%] rounded-full border border-white/[0.045]" />
            <span className="absolute inset-[26%] rounded-full border border-brand/15" />
            <span className="absolute inset-[35%] rounded-full bg-brand/5 blur-3xl" />
          </div>

          <div className="relative flex items-center justify-between px-5 pt-7 sm:px-8 lg:px-10">
            <span className="text-label text-white/40">
              QIMOV / Digital Experience
            </span>
            <span className="text-label text-white/40">
              Teresina · PI
            </span>
          </div>

          <div className="relative flex flex-1 flex-col items-center justify-center px-6">
            <div className="flex flex-col items-center">
              <QimovMark className="h-14 w-14 animate-pulse-soft text-cream sm:h-16 sm:w-16" />
              <span className="mt-5 font-display text-[clamp(3rem,9vw,5.5rem)] font-bold leading-none tracking-[-0.04em]">
                QIMOV
              </span>
              <span className="mt-4 text-[12px] font-medium tracking-[0.02em] text-white/50">
                Energia em movimento
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[1600px] px-5 pb-7 sm:px-8 lg:px-10">
            <div className="mb-3 flex items-end justify-between gap-4">
              <span className="text-meta text-white/50">
                Pré-carregando sequência essencial
              </span>
              <span className="font-mono text-[12px] tabular-nums text-brand">
                {String(Math.round(loadProgress)).padStart(2, "0")}%
              </span>
            </div>
            <div
              className="relative h-px w-full overflow-hidden bg-white/15"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(loadProgress)}
            >
              <span
                className="absolute inset-y-0 left-0 bg-brand transition-[width] duration-300 ease-out"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-meta text-white/35">
                {Math.ceil(totalFrames * 0.25)} frames prioritários · restante em background
              </span>
              <span className="hidden text-meta text-white/35 sm:block">
                120 frames · canvas engine
              </span>
            </div>
          </div>
        </div>
      ) : null}

      <section
        ref={sectionRef}
        id="inicio"
        data-nav-theme="dark"
        aria-busy={!isReady}
        className="relative h-[430vh] bg-carbon sm:h-[450vh]"
      >
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 h-full w-full bg-carbon"
          />

          <div className="hero-vignette pointer-events-none absolute inset-0" />
          <div className="hero-scanlines pointer-events-none absolute inset-0 opacity-50" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[62%] bg-gradient-to-t from-carbon via-carbon/55 to-transparent lg:hidden" />

          {/* HUD editorial superior */}
          <div className="pointer-events-none absolute inset-x-0 top-[calc(var(--header-height)+18px)] z-20 flex justify-between px-5 sm:px-8 lg:px-10">
            <div className="hidden items-center gap-2.5 sm:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
              <span className="font-mono text-[10px] tracking-[0.04em] text-white/50">
                QIMOV · Mobilidade elétrica
              </span>
            </div>
            <div className="flex items-center gap-5 font-mono text-[10px] tracking-[0.04em] text-white/40">
              <span className="hidden md:inline">05°05′S / 42°48′W</span>
              <span ref={frameLabelRef}>FRAME 001 / 120</span>
            </div>
          </div>

          {/* Ato I */}
          <div
            ref={actOneRef}
            aria-hidden={activeAct !== 0}
            className="absolute inset-x-0 bottom-0 z-20 px-5 pb-[84px] sm:px-8 lg:px-10 lg:pb-[94px]"
            style={{ opacity: 1, visibility: "visible" }}
          >
            <div className="mx-auto w-full max-w-[1600px]">
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-brand/35 bg-brand/[0.08] px-3.5 py-2 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_12px_rgba(242,101,34,0.8)]" />
                <span className="text-[11px] font-semibold tracking-[0.01em] text-brand">
                  Pré-venda 2026
                </span>
                <span className="h-3 w-px bg-brand/25" />
                <span className="text-[11px] font-medium text-white/60">
                  Unidades limitadas
                </span>
              </div>

              <h1 className="max-w-[1100px]">
                <span className="block font-display text-[clamp(3rem,8.6vw,9rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-cream">
                  Vamos mover
                </span>
                <span className="mt-1 block font-display text-[clamp(3rem,8.6vw,9rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-cream">
                  o Futuro
                  <span className="text-brand">.</span>
                </span>
              </h1>

              <div className="mt-7 flex flex-col gap-6 border-t border-white/15 pt-5 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-[330px] text-[12px] leading-relaxed text-white/55 sm:text-[13px]">
                  Tecnologia piauiense de mobilidade elétrica.
                  <br />
                  <span className="text-white/90">Teresina, PI.</span>
                </p>

                <div className="flex items-center justify-between gap-8 sm:justify-end">
                  <div className="hidden items-center gap-4 md:flex">
                    <span className="text-meta text-white/40">
                      Deslize para revelar
                    </span>
                    <div className="scroll-line relative h-10 w-px overflow-hidden bg-white/15" />
                  </div>
                  <a
                    href="#destaques"
                    className="group flex items-center gap-3"
                    aria-label="Role para explorar a QIMOV"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors duration-500 group-hover:border-brand group-hover:bg-brand group-hover:text-carbon">
                      <ArrowDown size={14} />
                    </span>
                    <span className="text-[12px] font-medium text-white/55 transition-colors group-hover:text-white">
                      Role para explorar
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Ato II */}
          <div
            ref={actTwoRef}
            aria-hidden={activeAct !== 1}
            className="invisible absolute inset-x-0 bottom-0 z-20 px-5 pb-[84px] opacity-0 sm:px-8 lg:px-10 lg:pb-[94px]"
            style={
              {
                opacity: 0,
                visibility: "hidden",
              } satisfies CSSProperties
            }
          >
            <div className="mx-auto w-full max-w-[1600px]">
              <div className="mb-4 flex flex-col justify-between gap-4 sm:mb-7 sm:flex-row sm:items-end">
                <div>
                  <p className="mb-2 flex items-center gap-3 text-label text-white/50 sm:mb-3">
                    <span className="h-px w-6 bg-brand" />
                    Ato II · Energia em movimento
                  </p>
                  <h2 className="max-w-[740px] font-display text-[clamp(2rem,4.8vw,4.8rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-cream">
                    Silêncio que move a cidade.
                  </h2>
                </div>
                <p className="max-w-[280px] text-[12px] leading-relaxed text-white/55 sm:text-[13px]">
                  Engenharia elétrica de precisão, resposta imediata em cada
                  toque do acelerador.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                {[
                  {
                    icon: Gauge,
                    value: "65",
                    unit: "KM/H",
                    label: "Velocidade máxima",
                    detail: "Modo Sport",
                  },
                  {
                    icon: BatteryCharging,
                    value: "85",
                    unit: "KM",
                    label: "Autonomia real",
                    detail: "Ciclo urbano",
                  },
                  {
                    icon: Timer,
                    value: "3",
                    unit: "H",
                    label: "Recarga 220V",
                    detail: "Bateria removível",
                  },
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <article
                      key={stat.label}
                      className="glass-panel group relative overflow-hidden rounded-lg px-2.5 py-3 transition-colors duration-500 hover:border-brand/40 sm:px-6 sm:py-6"
                    >
                      <div className="flex items-start justify-between">
                        <Icon
                          size={14}
                          strokeWidth={1.4}
                          className="text-brand sm:h-[17px] sm:w-[17px]"
                        />
                        <span className="font-mono text-[10px] text-white/35">
                          0{index + 1}
                        </span>
                      </div>
                      <p className="mt-4 flex items-baseline gap-1.5 sm:mt-7 sm:gap-2">
                        <span className="font-display text-[clamp(1.55rem,5.2vw,3.6rem)] font-semibold leading-none tracking-[-0.03em] text-cream">
                          {stat.value}
                        </span>
                        <span className="font-mono text-[10px] text-brand sm:text-[11px]">
                          {stat.unit}
                        </span>
                      </p>
                      <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/10 pt-2.5 sm:mt-4 sm:gap-3 sm:pt-3">
                        <span className="text-[11px] leading-tight text-white/70 sm:text-[12px]">
                          {stat.label}
                        </span>
                        <span className="hidden text-meta text-white/35 sm:inline">
                          {stat.detail}
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Ato III */}
          <div
            ref={actThreeRef}
            aria-hidden={activeAct !== 2}
            className="invisible absolute inset-x-0 bottom-0 z-20 px-5 pb-[84px] opacity-0 sm:px-8 lg:px-10 lg:pb-[94px]"
            style={
              {
                opacity: 0,
                visibility: "hidden",
              } satisfies CSSProperties
            }
          >
            <div className="mx-auto grid w-full max-w-[1600px] gap-7 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="mb-4 flex items-center gap-3 text-label text-white/50">
                  <span className="h-px w-6 bg-brand" />
                  Ato III · Engenharia QIMOV
                </p>
                <h2 className="max-w-[780px] font-display text-[clamp(2.5rem,5.4vw,5.4rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-cream">
                  O futuro tem
                  <br />
                  <span className="text-brand">
                    assinatura.
                  </span>
                </h2>
                <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/15 pt-5">
                  {[
                    { icon: MonitorSmartphone, label: "Painel digital LCD" },
                    { icon: Cpu, label: "Motor brushless silencioso" },
                    { icon: Zap, label: "Bateria removível" },
                  ].map((feature) => {
                    const Icon = feature.icon;
                    return (
                      <span
                        key={feature.label}
                        className="flex items-center gap-2.5 text-[12px] text-white/60"
                      >
                        <Icon size={13} className="text-brand" />
                        {feature.label}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col items-start gap-5 lg:items-end">
                <p className="max-w-[340px] text-[13px] leading-relaxed text-white/55 lg:text-right">
                  Cada componente foi desenhado para transformar o caminho em
                  experiência. Conheça a linha completa e reserve a sua.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <MagneticButton href="#catalogo" variant="primary">
                    Explorar modelos
                  </MagneticButton>
                  <MagneticButton
                    href="#showroom"
                    variant="outline-light"
                    icon={<ArrowUpRight size={14} strokeWidth={1.8} />}
                  >
                    Agendar test ride
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>

          {/* Linha de progresso do capítulo */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30">
            <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-5 pb-4 sm:px-8 lg:px-10">
              <div className="relative h-px flex-1 overflow-hidden bg-white/15">
                <span
                  ref={progressBarRef}
                  className="absolute inset-0 origin-left bg-brand"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
              <div className="flex w-[185px] items-center justify-between font-mono text-[10px] tracking-[0.04em] text-white/45">
                <span ref={actLabelRef}>INTRO</span>
                <span>{String(activeAct + 1).padStart(2, "0")} / 03</span>
              </div>
            </div>
          </div>

          {/* Marcador lateral vertical */}
          <div className="pointer-events-none absolute bottom-[110px] right-5 z-10 hidden h-24 w-px bg-white/10 lg:block">
            <span
              ref={verticalProgressRef}
              className="absolute inset-x-0 top-0 h-full origin-top bg-brand"
              style={{ transform: "scaleY(0)" }}
            />
            <span className="absolute -left-[3px] top-0 h-[7px] w-[7px] rounded-full bg-brand" />
          </div>
        </div>
      </section>
    </>
  );
}
