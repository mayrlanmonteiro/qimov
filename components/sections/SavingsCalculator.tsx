"use client";

import { useMemo, useState, type CSSProperties } from "react";
import {
  ArrowUpRight,
  Fuel,
  Leaf,
  MapPin,
  Minus,
  Plus,
  Route,
  Zap,
} from "lucide-react";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { cn, formatBRL, formatNumber } from "@/lib/utils";

const ROUTES = [
  {
    id: "raul-lopes",
    label: "Av. Raul Lopes ↔ Centro",
    km: 12,
    description: "Trajeto urbano curto",
  },
  {
    id: "dirceu-leste",
    label: "Dirceu ↔ Zona Leste",
    km: 18,
    description: "Deslocamento diário",
  },
  {
    id: "norte-sul",
    label: "Zona Norte ↔ Zona Sul",
    km: 26,
    description: "Travessia da cidade",
  },
  {
    id: "delivery",
    label: "Uso Delivery Intensivo",
    km: 85,
    description: "Operação full-time",
  },
] as const;

const GAS_PRICE = 6.29;
const GAS_EFFICIENCY = 32;
const GAS_MAINTENANCE_PER_KM = 0.09;
const ENERGY_TARIFF = 0.92;
const EV_CONSUMPTION_KWH_PER_KM = 0.035;
const EV_MAINTENANCE_PER_KM = 0.012;
const CO2_KG_PER_LITER = 2.31;

const currency = (value: number) => formatBRL(value, 0);
const kgCO2 = (value: number) => `${formatNumber(value, 0)} kg`;

export function SavingsCalculator() {
  const [dailyKm, setDailyKm] = useState(18);

  const result = useMemo(() => {
    const monthlyKm = dailyKm * 30;
    const gasCostPerKm = GAS_PRICE / GAS_EFFICIENCY + GAS_MAINTENANCE_PER_KM;
    const electricCostPerKm =
      ENERGY_TARIFF * EV_CONSUMPTION_KWH_PER_KM + EV_MAINTENANCE_PER_KM;

    const monthlyGas = monthlyKm * gasCostPerKm;
    const monthlyElectric = monthlyKm * electricCostPerKm;
    const monthlySavings = Math.max(0, monthlyGas - monthlyElectric);
    const annualSavings = monthlySavings * 12;
    const litersPerMonth = monthlyKm / GAS_EFFICIENCY;
    const annualCo2 = litersPerMonth * 12 * CO2_KG_PER_LITER;

    return {
      monthlyGas,
      monthlyElectric,
      monthlySavings,
      annualSavings,
      annualCo2,
      monthlyKm,
      fiveYearSavings: annualSavings * 5,
    };
  }, [dailyKm]);

  const activeRoute = ROUTES.find((route) => route.km === dailyKm)?.id;
  const rangeProgress =
    ((dailyKm - 5) / (120 - 5)) * 100;

  return (
    <section
      id="economia"
      data-nav-theme="dark"
      className="relative overflow-hidden bg-carbon py-20 text-cream sm:py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-15%] top-0 h-[620px] w-[620px] rounded-full bg-brand/[0.065] blur-[160px]" />
        <div className="absolute right-[-12%] top-[35%] h-[500px] w-[500px] rounded-full bg-[#256a7d]/20 blur-[150px]" />
        <div className="blueprint-grid absolute inset-0 text-white opacity-[0.022]" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10">
        <Reveal>
          <div className="mb-10 flex items-center gap-3 text-label text-white/45">
            <span className="text-brand">05</span>
            <span className="h-px w-7 bg-white/20" />
            Economia real em Teresina
            <span className="hidden h-px w-20 bg-white/10 sm:block" />
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <h2 className="max-w-[900px] font-display text-[clamp(2.6rem,5.6vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
              Cada quilômetro
              <br />
              <span className="text-brand">
                rende mais.
              </span>
            </h2>
            <div className="max-w-[390px] lg:justify-self-end">
              <p className="text-[13px] leading-[1.75] text-white/55">
                Compare o custo de uma moto a combustão com uma scooter QIMOV.
                Ajuste a sua rotina e veja a economia mudar em tempo real.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-medium tabular-nums text-white/45">
                <span className="flex items-center gap-2">
                  <Fuel size={11} className="text-brand" />
                  Gasolina {formatBRL(GAS_PRICE, 2)}/L
                </span>
                <span className="flex items-center gap-2">
                  <Zap size={11} className="text-brand" />
                  Energia {formatBRL(ENERGY_TARIFF, 2)}/kWh
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:items-stretch">
          <Reveal
            delay={0.06}
            y={30}
            className="rounded-[1.75rem] border border-white/10 bg-white/[0.025] p-5 backdrop-blur-sm sm:p-7 lg:col-span-7 lg:p-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-meta text-white/45">
                  Calcule a sua rotina
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold tracking-[-0.02em]">
                  Por onde você se move?
                </h3>
              </div>
              <Route size={18} className="text-brand/80" />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {ROUTES.map((route) => {
                const isActive = activeRoute === route.id;
                return (
                  <button
                    key={route.id}
                    type="button"
                    onClick={() => setDailyKm(route.km)}
                    aria-pressed={isActive}
                    className={cn(
                      "group relative flex min-h-[106px] flex-col justify-between overflow-hidden rounded-xl border p-4 text-left transition-all duration-500",
                      isActive
                        ? "border-brand/60 bg-brand/[0.11]"
                        : "border-white/10 bg-white/[0.015] hover:border-white/25 hover:bg-white/[0.035]",
                    )}
                  >
                    <div
                      className={cn(
                        "absolute -right-4 -top-5 h-16 w-16 rounded-full blur-2xl transition-opacity duration-500",
                        isActive ? "bg-brand/20 opacity-100" : "opacity-0",
                      )}
                    />
                    <div className="flex items-center justify-between gap-3">
                      <MapPin
                        size={13}
                        className={
                          isActive ? "text-brand" : "text-white/25"
                        }
                      />
                      <span
                        className={cn(
                          "text-[11px] font-semibold tabular-nums",
                          isActive ? "text-brand" : "text-white/20",
                        )}
                      >
                        {route.km} km
                      </span>
                    </div>
                    <div>
                      <p className="text-[12px] leading-tight text-white/80">
                        {route.label}
                      </p>
                      <p className="mt-1 text-meta text-white/40">
                        {route.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 border-t border-white/10 pt-7">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-meta text-white/45">
                    Quilometragem diária
                  </p>
                  <p className="mt-2 flex items-baseline gap-2">
                    <span className="font-display text-[clamp(2.6rem,5.6vw,4.4rem)] font-semibold leading-none tracking-[-0.03em]">
                      {dailyKm}
                    </span>
                    <span className="text-[12px] font-semibold text-brand">
                      km / dia
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Diminuir quilometragem diária"
                    onClick={() =>
                      setDailyKm((value) => Math.max(5, value - 5))
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-brand hover:text-brand"
                  >
                    <Minus size={13} />
                  </button>
                  <button
                    type="button"
                    aria-label="Aumentar quilometragem diária"
                    onClick={() =>
                      setDailyKm((value) => Math.min(120, value + 5))
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-brand hover:text-brand"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <input
                  type="range"
                  min={5}
                  max={120}
                  step={1}
                  value={dailyKm}
                  aria-label="Quilometragem diária em quilômetros"
                  aria-valuetext={`${dailyKm} quilômetros por dia`}
                  onChange={(event) => setDailyKm(Number(event.target.value))}
                  className="q-range"
                  style={
                    {
                      "--range-progress": `${rangeProgress}%`,
                    } as CSSProperties
                  }
                />
                <div className="mt-1 flex items-center justify-between text-[10px] tabular-nums text-white/35">
                  <span>05 km</span>
                  <span>{formatNumber(result.monthlyKm)} km / mês</span>
                  <span>120 km</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12} y={30} className="lg:col-span-5">
            <div className="relative flex h-full min-h-[560px] flex-col overflow-hidden rounded-[1.75rem] bg-cream p-6 text-carbon sm:p-8">
              <div className="soft-grid pointer-events-none absolute inset-0 opacity-40" />
              <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-brand/15 blur-3xl" />
              <div className="relative z-10 flex items-center justify-between border-b border-carbon/10 pb-5">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand/12">
                    <Zap size={12} className="text-brand-dark" />
                  </span>
                  <div>
                    <p className="text-meta text-carbon/50">
                      Resultado estimado
                    </p>
                    <p className="mt-0.5 text-[11px] tabular-nums text-carbon/55">
                      {dailyKm} km/dia · {formatNumber(result.monthlyKm)} km/mês
                    </p>
                  </div>
                </div>
                <span className="rounded-full border border-brand/25 bg-brand/[0.08] px-2.5 py-1 text-[10px] font-semibold text-brand-dark">
                  Em tempo real
                </span>
              </div>

              <div className="relative z-10 mt-7">
                <p className="text-meta text-carbon/50">
                  Economia mensal
                </p>
                <p className="mt-2 font-display text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
                  <AnimatedNumber
                    value={result.monthlySavings}
                    format={currency}
                  />
                </p>
                <p className="mt-2 text-[12px] text-carbon/50">
                  versus uma moto a combustão no mesmo trajeto.
                </p>
              </div>

              <div className="relative z-10 mt-7 grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-carbon/10 bg-white/45 p-3.5">
                  <p className="text-meta text-carbon/45">
                    Em 12 meses
                  </p>
                  <p className="mt-2 text-[1.3rem] font-semibold tabular-nums tracking-[-0.02em]">
                    <AnimatedNumber
                      value={result.annualSavings}
                      format={currency}
                    />
                  </p>
                </div>
                <div className="rounded-xl border border-carbon/10 bg-white/45 p-3.5">
                  <p className="text-meta text-carbon/45">
                    CO₂ evitado / ano
                  </p>
                  <p className="mt-2 flex items-center gap-1.5 text-[1.3rem] font-semibold tabular-nums tracking-[-0.02em]">
                    <Leaf size={12} className="text-brand-dark" />
                    <AnimatedNumber
                      value={result.annualCo2}
                      format={kgCO2}
                    />
                  </p>
                </div>
              </div>

              <div className="relative z-10 mt-5 space-y-3 border-t border-carbon/10 pt-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-carbon/30" />
                    <span className="text-[12px] text-carbon/60">
                      Moto a combustão
                    </span>
                  </div>
                  <span className="text-[12px] font-medium tabular-nums text-carbon/60">
                    {formatBRL(result.monthlyGas, 2)}/mês
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                    <span className="text-[12px] text-carbon/60">
                      Scooter QIMOV
                    </span>
                  </div>
                  <span className="text-[12px] font-semibold tabular-nums text-brand-dark">
                    {formatBRL(result.monthlyElectric, 2)}/mês
                  </span>
                </div>
              </div>

              <div className="relative z-10 mt-auto pt-7">
                <MagneticButton
                  href="#showroom"
                  variant="dark"
                  className="w-full justify-between"
                  icon={<ArrowUpRight size={14} />}
                >
                  Agendar test ride
                </MagneticButton>
                <p className="mt-3 text-[10px] leading-relaxed text-carbon/45">
                  Referências: gasolina R$ 6,29/L, consumo de 32 km/L, tarifa
                  média de R$ 0,92/kWh no Piauí e manutenção estimada. Valores
                  ilustrativos; sua economia pode variar.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-8" y={16}>
          <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-meta text-white/45">
              Projeção em 5 anos
              <span className="ml-4 text-brand">
                {formatBRL(result.fiveYearSavings, 0)}
              </span>
            </p>
            <p className="text-meta text-white/35">
              Zero emissões locais · Energia 100% elétrica
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
