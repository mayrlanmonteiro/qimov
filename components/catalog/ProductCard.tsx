"use client";

import { useState, type ReactNode } from "react";
import { ArrowUpRight, BatteryCharging, Check, Gauge, Zap } from "lucide-react";
import { ScooterIllustration } from "@/components/scooter/ScooterIllustration";
import type { ProductColor, ScooterModel } from "@/lib/models";
import { cn, formatBRL } from "@/lib/utils";

type ProductCardProps = {
  model: ScooterModel;
  index: number;
  onOpen: (model: ScooterModel, color: ProductColor) => void;
};

export function ProductCard({ model, index, onOpen }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(model.colors[0]);

  return (
    <article
      className="group/card relative flex h-full flex-col overflow-hidden rounded-[22px] border border-white/[0.09] bg-[#14171b] transition-[transform,border-color,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_35px_90px_rgba(0,0,0,0.32)]"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="relative aspect-[1.25/1] w-full overflow-hidden border-b border-white/[0.07]">
        <div
          className="absolute inset-0 transition-[background] duration-700"
          style={{
            background: `radial-gradient(100% 110% at 50% 35%, ${selectedColor.hex}26 0%, rgba(20,23,27,0.6) 44%, #101215 78%)`,
          }}
        />
        <div className="blueprint-grid absolute inset-0 text-white opacity-[0.035]" />

        <div className="absolute left-5 top-5 z-10 flex items-center gap-3">
          <span className="text-meta text-white/50">
            {model.categoryLabel}
          </span>
          <span className="h-px w-6 bg-white/20" />
          <span className="font-mono text-[10px] tracking-[0.02em] text-white/35">
            {model.edition}
          </span>
        </div>

        <div className="absolute right-5 top-5 z-10 flex flex-col items-end gap-1.5">
          {model.badge ? (
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.01em]",
                model.noLicense || model.badge === "Mais vendida"
                  ? "bg-brand text-carbon"
                  : "border border-white/15 bg-carbon/30 text-white/65 backdrop-blur-md",
              )}
            >
              {model.badge}
            </span>
          ) : null}
          {!model.noLicense ? (
            <span className="text-meta text-white/35">
              CNH categoria A
            </span>
          ) : null}
        </div>

        <div className="absolute inset-x-0 bottom-0 top-6 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.025]">
          <ScooterIllustration
            color={selectedColor.hex}
            variant={model.variant}
            showScene={false}
          />
        </div>

        <div className="pointer-events-none absolute inset-x-5 bottom-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: selectedColor.hex }}
            />
            <span className="text-meta text-white/45">
              {selectedColor.name}
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-[0.02em] text-white/30">
            QIMOV / 2026
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-[clamp(1.5rem,2.6vw,1.9rem)] font-semibold leading-none tracking-[-0.025em] text-cream">
              {model.name}
            </h3>
            <p className="mt-2 text-[12px] text-white/50">{model.tagline}</p>
          </div>
          <button
            type="button"
            onClick={() => onOpen(model, selectedColor)}
            aria-label={`Ver detalhes do QIMOV ${model.name}`}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-500 hover:border-brand hover:bg-brand hover:text-carbon"
          >
            <ArrowUpRight size={15} strokeWidth={1.7} />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2 border-y border-white/[0.08] py-4">
          <SpecMini
            icon={<Gauge size={12} />}
            value={model.specs.speed}
            unit="km/h"
            label="Velocidade"
          />
          <SpecMini
            icon={<BatteryCharging size={12} />}
            value={model.specs.autonomy}
            unit="km"
            label="Autonomia"
          />
          <SpecMini
            icon={<Zap size={12} />}
            value={model.specs.power}
            unit="W"
            label="Potência"
          />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="mr-1 text-meta text-white/40">
              Cor
            </span>
            {model.colors.map((color) => {
              const isSelected = selectedColor.name === color.name;
              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Selecionar cor ${color.name}`}
                  aria-pressed={isSelected}
                  className={cn(
                    "relative flex h-6 w-6 items-center justify-center rounded-full border transition-transform duration-300 hover:scale-110",
                    isSelected
                      ? "border-brand/70"
                      : "border-transparent hover:border-white/25",
                  )}
                >
                  <span
                    className="h-3.5 w-3.5 rounded-full border border-white/20"
                    style={{ backgroundColor: color.hex }}
                  />
                  {isSelected ? (
                    <Check
                      size={8}
                      strokeWidth={3}
                      className="absolute text-white mix-blend-difference"
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
          {model.noLicense ? (
            <span className="rounded-full border border-brand/25 bg-brand/[0.08] px-2 py-1 text-[10px] font-semibold text-brand">
              Sem CNH
            </span>
          ) : null}
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <div>
            {model.compareAt ? (
              <p className="mb-1 text-[11px] tabular-nums text-white/35 line-through">
                {formatBRL(model.compareAt)}
              </p>
            ) : null}
            <p className="text-[1.4rem] font-semibold tabular-nums tracking-[-0.02em] text-cream">
              {formatBRL(model.price)}
              <span className="ml-1.5 text-[11px] font-normal text-white/40">
                à vista
              </span>
            </p>
            <p className="mt-1 text-[11px] tabular-nums text-white/45">
              ou 12x de {formatBRL(model.price / 12, 2)} sem juros
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpen(model, selectedColor)}
            className="group/cta flex min-h-9 shrink-0 items-center gap-2 border-b border-white/20 pb-1 text-[12px] font-semibold tracking-[-0.01em] text-white/75 transition-colors duration-300 hover:border-brand hover:text-brand"
          >
            Ver detalhes
            <ArrowUpRight
              size={12}
              className="transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
            />
          </button>
        </div>
      </div>
    </article>
  );
}

function SpecMini({
  icon,
  value,
  unit,
  label,
}: {
  icon: ReactNode;
  value: number;
  unit: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="flex items-center gap-1.5 text-meta text-white/40">
        <span className="text-brand/80">{icon}</span>
        {label}
      </span>
      <span className="text-[14px] font-semibold tabular-nums tracking-[-0.01em] text-white/85">
        {value}
        <span className="ml-1 text-[10px] font-normal text-white/40">{unit}</span>
      </span>
    </div>
  );
}
