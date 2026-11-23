"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  ArrowUpRight,
  BatteryCharging,
  Check,
  Gauge,
  MonitorSmartphone,
  ShieldCheck,
  Timer,
  Weight,
  X,
  Zap,
} from "lucide-react";
import { ScooterIllustration } from "@/components/scooter/ScooterIllustration";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useScrollLock } from "@/components/providers/SmoothScrollProvider";
import {
  buildModelWhatsAppMessage,
  type ProductColor,
  type ScooterModel,
} from "@/lib/models";
import { whatsappLink } from "@/lib/site";
import { calculateInstallment, cn, formatBRL } from "@/lib/utils";

type ProductDrawerProps = {
  model: ScooterModel;
  initialColor: ProductColor;
  onClose: () => void;
};

const PLANS = [
  { months: 12, label: "12x", rate: 0, note: "sem juros" },
  { months: 18, label: "18x", rate: 0.0129, note: "1,29% a.m." },
  { months: 24, label: "24x", rate: 0.0149, note: "1,49% a.m." },
];

export function ProductDrawer({
  model,
  initialColor,
  onClose,
}: ProductDrawerProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [months, setMonths] = useState(12);
  const panelRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closingRef = useRef(false);
  const triggerRef = useRef<Element | null>(null);

  useScrollLock(true);

  useEffect(() => {
    setMounted(true);
    triggerRef.current = document.activeElement;
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = window.setTimeout(() => closeButtonRef.current?.focus(), 120);
    return () => window.clearTimeout(timer);
  }, [mounted]);

  const requestClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setVisible(false);
    window.setTimeout(() => {
      onClose();
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus({ preventScroll: true });
      }
    }, 360);
  }, [onClose]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        requestClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [requestClose]);

  const selectedPlan =
    PLANS.find((plan) => plan.months === months) ?? PLANS[0];
  const simulation = calculateInstallment(
    model.price,
    selectedPlan.months,
    selectedPlan.rate,
  );
  const whatsappHref = whatsappLink(
    buildModelWhatsAppMessage(model, selectedColor.name),
  );

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[120]">
      <button
        type="button"
        aria-label="Fechar detalhes do modelo"
        tabIndex={-1}
        onClick={requestClose}
        className={cn(
          "absolute inset-0 h-full w-full cursor-default bg-carbon/75 backdrop-blur-md transition-opacity duration-500",
          visible ? "opacity-100" : "opacity-0",
        )}
      />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-drawer-title"
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-[720px] flex-col overflow-hidden bg-cream text-carbon shadow-[-40px_0_100px_rgba(0,0,0,0.4)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          visible ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="z-30 flex h-14 shrink-0 items-center justify-between border-b border-carbon/[0.08] bg-cream/90 px-5 backdrop-blur-xl sm:px-7">
          <div className="flex items-center gap-3">
            <span className="text-meta text-carbon/50">
              Ficha do modelo
            </span>
            <span className="h-3 w-px bg-carbon/15" />
            <span className="text-meta text-carbon/50">
              {model.edition} / 06
            </span>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={requestClose}
            aria-label="Fechar painel de detalhes"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-carbon/15 transition-colors duration-300 hover:border-carbon hover:bg-carbon hover:text-cream"
          >
            <X size={15} />
          </button>
        </div>

        <div
          className="flex-1 overflow-y-auto overscroll-contain"
          data-lenis-prevent
        >
        <div className="relative min-h-[255px] overflow-hidden bg-carbon sm:min-h-[320px]">
          <div
            className="absolute inset-0 transition-[background] duration-700"
            style={{
              background: `radial-gradient(85% 100% at 50% 42%, ${selectedColor.hex}3d 0%, rgba(22,25,30,0.72) 48%, #0d0f12 100%)`,
            }}
          />
          <div className="blueprint-grid absolute inset-0 text-white opacity-[0.04]" />
          <div className="absolute left-5 top-5 flex items-center gap-2 sm:left-7">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            <span className="text-meta text-white/50">
              QIMOV / Electric Series
            </span>
          </div>
          <div className="absolute right-5 top-5 flex items-center gap-2 sm:right-7">
            {model.noLicense ? (
              <span className="rounded-full bg-brand px-2.5 py-1 text-[10px] font-semibold text-carbon">
                Dispensa CNH
              </span>
            ) : (
              <span className="rounded-full border border-white/20 px-2.5 py-1 text-[10px] font-semibold text-white/60">
                CNH A
              </span>
            )}
          </div>
          <div className="absolute inset-x-3 bottom-2 top-4">
            <ScooterIllustration
              color={selectedColor.hex}
              variant={model.variant}
            />
          </div>
        </div>

        <div className="relative bg-cream px-5 pb-12 pt-7 sm:px-7 sm:pt-9">
          <div className="mb-5 flex items-center gap-3 text-meta text-carbon/50">
            <span>{model.categoryLabel}</span>
            <span className="h-px w-5 bg-carbon/20" />
            <span>Pré-venda 2026</span>
          </div>

          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2
                id="product-drawer-title"
                className="font-display text-[clamp(2.3rem,5.4vw,3.6rem)] font-semibold leading-[1] tracking-[-0.03em]"
              >
                QIMOV {model.name}
              </h2>
              <p className="mt-3 text-[15px] font-medium text-carbon/60">
                {model.tagline}
              </p>
            </div>
            <span className="rounded-full border border-carbon/15 px-3 py-1.5 text-[11px] font-medium text-carbon/55">
              0{model.edition} / Coleção 2026
            </span>
          </div>

          <p className="mt-6 max-w-[56ch] text-[14px] leading-[1.75] text-carbon/65">
            {model.description}
          </p>

          <div className="mt-8 border-y border-carbon/10 py-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-meta text-carbon/50">
                  Preço à vista
                </p>
                <p className="mt-1 text-[2.4rem] font-semibold tabular-nums leading-none tracking-[-0.02em]">
                  {formatBRL(model.price)}
                </p>
                {model.compareAt ? (
                  <p className="mt-1.5 text-[11px] tabular-nums text-carbon/45">
                    De {formatBRL(model.compareAt)} · economia de{" "}
                    {formatBRL(model.compareAt - model.price)}
                  </p>
                ) : null}
              </div>
              <div className="rounded-full bg-brand/10 px-3 py-1.5 text-[11px] font-semibold tabular-nums text-brand-dark">
                ou 12x de {formatBRL(model.price / 12, 2)}
              </div>
            </div>
          </div>

          <section aria-labelledby="color-label" className="mt-7">
            <div className="flex items-center justify-between">
              <h3
                id="color-label"
                className="text-label text-carbon/55"
              >
                Escolha sua cor
              </h3>
              <span className="text-[12px] font-medium text-carbon/60">
                {selectedColor.name}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {model.colors.map((color) => {
                const isSelected = color.name === selectedColor.name;
                return (
                  <button
                    key={color.name}
                    type="button"
                    aria-label={`Selecionar ${color.name}`}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-3.5 text-[12px] font-medium transition-all duration-300",
                      isSelected
                        ? "border-carbon bg-carbon text-cream"
                        : "border-carbon/15 text-carbon/55 hover:border-carbon/40",
                    )}
                  >
                    <span
                      className="h-6 w-6 rounded-full border border-black/15"
                      style={{ backgroundColor: color.hex }}
                    />
                    {color.shortName}
                    {isSelected ? <Check size={11} /> : null}
                  </button>
                );
              })}
            </div>
          </section>

          <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              {
                icon: Gauge,
                value: `${model.specs.speed}`,
                unit: "km/h",
                label: "Velocidade",
              },
              {
                icon: BatteryCharging,
                value: `${model.specs.autonomy}`,
                unit: "km",
                label: "Autonomia",
              },
              {
                icon: Zap,
                value: `${model.specs.power}`,
                unit: "W",
                label: "Potência",
              },
              {
                icon: Timer,
                value: `${model.specs.chargeHours}`,
                unit: "h",
                label: "Recarga",
              },
            ].map((spec) => {
              const Icon = spec.icon;
              return (
                <div
                  key={spec.label}
                  className="rounded-xl border border-carbon/10 bg-white/35 p-3.5"
                >
                  <Icon size={14} strokeWidth={1.5} className="text-brand" />
                  <p className="mt-3 text-[17px] font-semibold tabular-nums tracking-[-0.01em]">
                    {spec.value}
                    <span className="ml-1 text-[11px] font-normal text-carbon/45">
                      {spec.unit}
                    </span>
                  </p>
                  <p className="mt-0.5 text-[11px] text-carbon/50">
                    {spec.label}
                  </p>
                </div>
              );
            })}
          </div>

          <section className="mt-8 rounded-2xl bg-carbon p-5 text-cream sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-meta text-white/45">
                  Simule seu parcelamento
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold tracking-[-0.02em]">
                  Escolha o seu ritmo
                </h3>
              </div>
              <span className="text-meta text-white/40">
                Tabela Price
              </span>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {PLANS.map((plan) => (
                <button
                  key={plan.months}
                  type="button"
                  onClick={() => setMonths(plan.months)}
                  aria-pressed={months === plan.months}
                  className={cn(
                    "rounded-lg border px-2.5 py-2.5 text-left transition-colors duration-300",
                    months === plan.months
                      ? "border-brand bg-brand text-carbon"
                      : "border-white/15 hover:border-white/35",
                  )}
                >
                  <span className="block text-[14px] font-semibold tabular-nums">
                    {plan.label}
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 block text-[10px]",
                      months === plan.months
                        ? "text-carbon/60"
                        : "text-white/30",
                    )}
                  >
                    {plan.note}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-5 flex items-end justify-between gap-4 border-t border-white/10 pt-4">
              <div>
                <p className="text-meta text-white/45">
                  {simulation.months}x de
                </p>
                <p className="mt-1 text-[1.9rem] font-semibold tabular-nums leading-none tracking-[-0.02em] text-cream">
                  {formatBRL(simulation.installment, 2)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-meta text-white/40">
                  Total estimado
                </p>
                <p className="mt-1 text-[12px] font-medium tabular-nums text-white/65">
                  {formatBRL(simulation.total, 2)}
                </p>
              </div>
            </div>
            <p className="mt-3 text-[10px] leading-relaxed text-white/40">
              Simulação ilustrativa sujeita à análise de crédito. Taxas e
              condições podem variar.
            </p>
          </section>

          <section className="mt-8">
            <h3 className="text-label text-carbon/55">
              Destaques da engenharia
            </h3>
            <div className="mt-4 space-y-3">
              {model.highlights.map((highlight, index) => (
                <div
                  key={highlight}
                  className="flex items-start gap-3 border-b border-carbon/[0.08] pb-3"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10">
                    <Check size={10} className="text-brand-dark" />
                  </span>
                  <p className="text-[12px] leading-relaxed text-carbon/65">
                    {highlight}
                  </p>
                  <span className="ml-auto font-mono text-[10px] text-carbon/35">
                    0{index + 1}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h3 className="text-label text-carbon/55">
              Ficha técnica completa
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
              <SpecRow icon={<BatteryCharging size={13} />} label="Bateria" value={model.specs.battery} />
              <SpecRow icon={<Zap size={13} />} label="Capacidade" value={model.specs.batteryCapacity} />
              <SpecRow icon={<Gauge size={13} />} label="Motor" value={model.specs.motor} />
              <SpecRow icon={<ShieldCheck size={13} />} label="Freios" value={model.specs.brakes} />
              <SpecRow icon={<MonitorSmartphone size={13} />} label="Painel" value={model.specs.display} />
              <SpecRow icon={<Timer size={13} />} label="Recarga" value={`${model.specs.chargeHours} horas em 220V`} />
              <SpecRow icon={<Weight size={13} />} label="Peso" value={`${model.specs.weight} kg`} />
              <SpecRow icon={<ShieldCheck size={13} />} label="Carga máxima" value={`${model.specs.maxLoad} kg`} />
              <SpecRow icon={<Gauge size={13} />} label="Pneus" value={model.specs.tires} />
              <SpecRow icon={<Zap size={13} />} label="Suspensão" value={model.specs.suspension} />
              <SpecRow icon={<ShieldCheck size={13} />} label="Proteção" value={model.specs.ipRating} />
              <SpecRow icon={<ShieldCheck size={13} />} label="Garantia" value="24 meses motor e bateria" />
            </div>
          </section>

          <div className="mt-8 flex items-start gap-3 rounded-xl border border-brand/20 bg-brand/[0.06] p-4">
            <ShieldCheck size={16} className="mt-0.5 shrink-0 text-brand" />
            <p className="text-[12px] leading-relaxed text-carbon/60">
              Reserva de pré-venda com prioridade de entrega e test ride
              acompanhado no showroom QIMOV em Teresina. Consulte condições e
              disponibilidade pelo WhatsApp.
            </p>
          </div>
        </div>
        </div>

        <div className="z-30 shrink-0 border-t border-carbon/10 bg-cream/95 px-5 py-3.5 backdrop-blur-xl sm:px-7">
          <div className="flex items-center gap-4">
            <div className="hidden min-w-0 sm:block">
              <p className="truncate text-meta text-carbon/50">
                QIMOV {model.name} · {selectedColor.shortName}
              </p>
              <p className="mt-1 font-display text-lg font-semibold tabular-nums tracking-[-0.02em]">
                {formatBRL(model.price)}
              </p>
            </div>
            <MagneticButton
              href={whatsappHref}
              external
              variant="primary"
              className="flex-1 py-4 sm:flex-none sm:px-7"
            >
              Reservar no WhatsApp
            </MagneticButton>
            <span className="hidden text-right text-[11px] leading-relaxed text-carbon/50 lg:block">
              Resposta em
              <br />
              até 15 min
            </span>
          </div>
        </div>
      </aside>
    </div>,
    document.body,
  );
}

function SpecRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 border-b border-carbon/[0.08] py-3">
      <span className="mt-0.5 text-brand-dark">{icon}</span>
      <div>
        <p className="text-meta text-carbon/50">
          {label}
        </p>
        <p className="mt-0.5 text-[12px] leading-relaxed text-carbon/70">
          {value}
        </p>
      </div>
    </div>
  );
}
