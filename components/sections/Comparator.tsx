"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BatteryCharging,
  BadgePercent,
  ChevronDown,
  Gauge,
  ShieldCheck,
  Timer,
  Wallet,
  Zap,
} from "lucide-react";
import { ScooterIllustration } from "@/components/scooter/ScooterIllustration";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { MODELS, type ScooterModel } from "@/lib/models";
import { whatsappLink } from "@/lib/site";
import { cn, formatBRL, formatNumber } from "@/lib/utils";

type ComparisonRow = {
  label: string;
  icon: React.ReactNode;
  getValue: (model: ScooterModel) => string | number | boolean;
  format: (model: ScooterModel) => string;
  winner: (a: ScooterModel, b: ScooterModel) => "a" | "b" | "tie";
};

const rows: ComparisonRow[] = [
  {
    label: "Velocidade máxima",
    icon: <Gauge size={13} />,
    getValue: (model) => model.specs.speed,
    format: (model) => `${model.specs.speed} km/h`,
    winner: (a, b) =>
      a.specs.speed === b.specs.speed
        ? "tie"
        : a.specs.speed > b.specs.speed
          ? "a"
          : "b",
  },
  {
    label: "Autonomia real",
    icon: <BatteryCharging size={13} />,
    getValue: (model) => model.specs.autonomy,
    format: (model) => `${model.specs.autonomy} km`,
    winner: (a, b) =>
      a.specs.autonomy === b.specs.autonomy
        ? "tie"
        : a.specs.autonomy > b.specs.autonomy
          ? "a"
          : "b",
  },
  {
    label: "Potência do motor",
    icon: <Zap size={13} />,
    getValue: (model) => model.specs.power,
    format: (model) => `${formatNumber(model.specs.power)} W`,
    winner: (a, b) =>
      a.specs.power === b.specs.power
        ? "tie"
        : a.specs.power > b.specs.power
          ? "a"
          : "b",
  },
  {
    label: "Tempo de recarga",
    icon: <Timer size={13} />,
    getValue: (model) => model.specs.chargeHours,
    format: (model) => `${formatNumber(model.specs.chargeHours, 1)} h`,
    winner: (a, b) =>
      a.specs.chargeHours === b.specs.chargeHours
        ? "tie"
        : a.specs.chargeHours < b.specs.chargeHours
          ? "a"
          : "b",
  },
  {
    label: "Dispensa CNH",
    icon: <ShieldCheck size={13} />,
    getValue: (model) => model.noLicense,
    format: (model) => (model.noLicense ? "Sim" : "Não"),
    winner: (a, b) =>
      a.noLicense === b.noLicense ? "tie" : a.noLicense ? "a" : "b",
  },
  {
    label: "Investimento",
    icon: <Wallet size={13} />,
    getValue: (model) => model.price,
    format: (model) => formatBRL(model.price),
    winner: (a, b) =>
      a.price === b.price ? "tie" : a.price < b.price ? "a" : "b",
  },
  {
    label: "Custo-benefício",
    icon: <BadgePercent size={13} />,
    getValue: (model) => model.valueScore,
    format: (model) => `${formatNumber(model.valueScore, 1)} / 10`,
    winner: (a, b) =>
      a.valueScore === b.valueScore
        ? "tie"
        : a.valueScore > b.valueScore
          ? "a"
          : "b",
  },
];

export function Comparator() {
  const [modelAId, setModelAId] = useState(MODELS[1].id);
  const [modelBId, setModelBId] = useState(MODELS[3].id);

  const modelA = useMemo(
    () => MODELS.find((model) => model.id === modelAId) ?? MODELS[0],
    [modelAId],
  );
  const modelB = useMemo(
    () => MODELS.find((model) => model.id === modelBId) ?? MODELS[1],
    [modelBId],
  );

  const compareUrl = whatsappLink(
    `Olá, QIMOV! Estou comparando a ${modelA.name} com a ${modelB.name}. Pode me ajudar a escolher a melhor opção?`,
  );

  const chooseA = (model: ScooterModel) => setModelAId(model.id);

  return (
    <section id="comparador" className="relative bg-carbon">
      <div className="h-12 bg-carbon sm:h-16" />

      <div
        data-nav-theme="light"
        className="relative overflow-hidden rounded-[2.25rem] bg-cream text-carbon sm:rounded-[3.5rem]"
      >
        <div className="soft-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute -left-48 top-1/4 h-[430px] w-[430px] rounded-full bg-brand/[0.07] blur-[130px]" />

        <div className="relative mx-auto max-w-[1500px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
          <Reveal>
            <div className="mb-10 flex items-center gap-3 text-label text-carbon/50">
              <span className="text-brand-dark">04</span>
              <span className="h-px w-7 bg-carbon/20" />
              Comparador inteligente
              <span className="hidden h-px w-20 bg-carbon/10 sm:block" />
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <h2 className="max-w-[800px] font-display text-[clamp(2.6rem,5.6vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
                Coloque
                <br />
                <span className="text-brand-dark">
                  lado a lado.
                </span>
              </h2>
              <div className="max-w-[370px] lg:justify-self-end">
                <p className="text-[13px] leading-[1.75] text-carbon/60">
                  Dois modelos QIMOV, todos os números na mesa. O comparador
                  destaca automaticamente o melhor em cada critério — sem
                  letras miúdas.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="mt-12">
            <div className="grid gap-3 sm:grid-cols-2">
              <ModelSelector
                label="Modelo A"
                value={modelA}
                onChange={chooseA}
                disabledId={modelB.id}
                featured={false}
              />
              <ModelSelector
                label="Modelo B"
                value={modelB}
                onChange={(model) => setModelBId(model.id)}
                disabledId={modelA.id}
                featured
              />
            </div>
          </Reveal>

          <Reveal delay={0.12} className="mt-3">
            <div className="overflow-hidden rounded-[1.4rem] border border-carbon/10 bg-white/55 shadow-[0_30px_80px_rgba(13,15,18,0.06)] backdrop-blur-sm">
              <div className="grid grid-cols-[1.12fr_1fr_1fr] border-b border-carbon/10 bg-[#ebe7df]/65">
                <div className="flex items-end px-4 pb-4 pt-6 sm:px-6">
                  <span className="text-meta text-carbon/45">
                    Atributo
                  </span>
                </div>
                {[modelA, modelB].map((model) => (
                  <div
                    key={`header-${model.id}`}
                    className="border-l border-carbon/[0.07] px-3 pb-4 pt-5 sm:px-5"
                  >
                    <span className="text-meta text-carbon/45">
                      {model.categoryLabel}
                    </span>
                    <p className="mt-1 font-display text-[clamp(0.95rem,2.2vw,1.35rem)] font-semibold leading-tight tracking-[-0.02em]">
                      {model.name}
                    </p>
                  </div>
                ))}
              </div>

              {rows.map((row, index) => {
                const winner = row.winner(modelA, modelB);
                return (
                  <div
                    key={row.label}
                    className={cn(
                      "group/row grid grid-cols-[1.12fr_1fr_1fr] transition-colors duration-300 hover:bg-white/50",
                      index !== rows.length - 1 && "border-b border-carbon/[0.08]",
                    )}
                  >
                    <div className="flex items-center gap-2 px-4 py-4 sm:gap-2.5 sm:px-6 sm:py-5">
                      <span className="hidden text-brand-dark/70 sm:block">
                        {row.icon}
                      </span>
                      <span className="text-[11px] leading-tight text-carbon/60 sm:text-[12px]">
                        {row.label}
                      </span>
                    </div>

                    {[modelA, modelB].map((model, modelIndex) => {
                      const isWinner =
                        (winner === "a" && modelIndex === 0) ||
                        (winner === "b" && modelIndex === 1);
                      return (
                        <div
                          key={`${row.label}-${model.id}`}
                          className={cn(
                            "relative flex flex-wrap items-center gap-x-1.5 gap-y-1 border-l border-carbon/[0.07] px-3 py-4 sm:px-5 sm:py-5",
                            isWinner && "bg-brand/[0.055]",
                          )}
                        >
                          <span
                            className={cn(
                              "text-[12px] font-medium tabular-nums sm:text-[13px]",
                              isWinner
                                ? "font-medium text-carbon"
                                : "text-carbon/55",
                            )}
                          >
                            {row.format(model)}
                          </span>
                          {isWinner ? (
                            <span className="flex items-center gap-1 rounded-full bg-brand px-1.5 py-0.5 text-[9px] font-semibold text-carbon sm:px-2 sm:text-[10px]">
                              <span className="h-1 w-1 rounded-full bg-carbon" />
                              Vence
                            </span>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal
            delay={0.06}
            className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="max-w-[480px]">
              <p className="text-meta text-carbon/45">
                Critérios de avaliação
              </p>
              <p className="mt-2 text-[12px] leading-relaxed text-carbon/55">
                O custo-benefício combina autonomia, potência, tecnologia e
                preço. O selo laranja indica o melhor desempenho no atributo,
                não uma recomendação absoluta.
              </p>
            </div>
            <MagneticButton
              href={compareUrl}
              external
              variant="dark"
              icon={<ArrowUpRight size={14} />}
            >
              Tirar dúvidas no WhatsApp
            </MagneticButton>
          </Reveal>
        </div>
      </div>

      <div className="h-12 bg-carbon sm:h-16" />
    </section>
  );
}

function ModelSelector({
  label,
  value,
  onChange,
  disabledId,
  featured,
}: {
  label: string;
  value: ScooterModel;
  onChange: (model: ScooterModel) => void;
  disabledId: string;
  featured: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.4rem] border p-4 sm:p-5",
        featured
          ? "border-carbon/15 bg-carbon text-cream"
          : "border-carbon/10 bg-white/50 text-carbon",
      )}
    >
      <div
        className={cn(
          "absolute inset-y-0 right-0 w-[52%] opacity-60",
          featured
            ? "bg-[radial-gradient(80%_80%_at_60%_50%,rgba(242,101,34,0.15),transparent_70%)]"
            : "bg-[radial-gradient(80%_80%_at_60%_50%,rgba(242,101,34,0.08),transparent_70%)]",
        )}
      />
      <div className="relative z-10 flex items-center justify-between">
        <span
          className={cn(
            "text-label",
            featured ? "text-white/35" : "text-carbon/35",
          )}
        >
          {label}
        </span>
        <span
          className={cn(
            "rounded-full px-2 py-1 text-[10px] font-semibold",
            featured
              ? "bg-brand text-carbon"
              : "border border-carbon/10 text-carbon/35",
          )}
        >
          {value.badge ?? value.categoryLabel}
        </span>
      </div>

      <div className="relative z-10 mt-2 flex items-center gap-2">
        <div className="h-[76px] w-[118px] shrink-0 sm:h-[92px] sm:w-[145px]">
          <ScooterIllustration
            color={value.colors[0].hex}
            variant={value.variant}
            showScene={false}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="relative">
            <select
              aria-label={`Selecionar ${label.toLocaleLowerCase("pt-BR")}`}
              value={value.id}
              onChange={(event) => {
                const next = MODELS.find(
                  (model) => model.id === event.target.value,
                );
                if (next) onChange(next);
              }}
              className={cn(
                "w-full appearance-none border-b bg-transparent pb-2 pr-8 font-display text-[clamp(1.15rem,2.4vw,1.6rem)] font-semibold tracking-[-0.02em] outline-none transition-colors",
                featured
                  ? "border-white/15 text-cream hover:border-brand/60"
                  : "border-carbon/15 text-carbon hover:border-brand/60",
              )}
            >
              {MODELS.map((model) => (
                <option
                  key={model.id}
                  value={model.id}
                  disabled={model.id === disabledId}
                  className="bg-cream text-carbon"
                >
                  QIMOV {model.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className={cn(
                "pointer-events-none absolute right-1 top-2",
                featured ? "text-white/40" : "text-carbon/35",
              )}
            />
          </div>
          <div
            className={cn(
              "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium tabular-nums",
              featured ? "text-white/35" : "text-carbon/35",
            )}
          >
            <span>{value.specs.autonomy} km</span>
            <span
              className={cn(
                "h-2 w-px",
                featured ? "bg-white/15" : "bg-carbon/15",
              )}
            />
            <span>{value.specs.speed} km/h</span>
            <span
              className={cn(
                "h-2 w-px",
                featured ? "bg-white/15" : "bg-carbon/15",
              )}
            />
            <span>{formatBRL(value.price)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
