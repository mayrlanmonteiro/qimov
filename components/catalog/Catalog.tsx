"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/catalog/ProductCard";
import { ProductDrawer } from "@/components/catalog/ProductDrawer";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  CATEGORIES,
  MODELS,
  type ProductCategory,
  type ProductColor,
  type ScooterModel,
} from "@/lib/models";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

type SelectedProduct = {
  model: ScooterModel;
  color: ProductColor;
};

export function Catalog() {
  const [category, setCategory] = useState<ProductCategory | "todos">("todos");
  const [selectedProduct, setSelectedProduct] =
    useState<SelectedProduct | null>(null);

  const filteredModels = useMemo(
    () =>
      category === "todos"
        ? MODELS
        : MODELS.filter((model) => model.category === category),
    [category],
  );

  return (
    <>
      <section
        id="catalogo"
        data-nav-theme="dark"
        className="relative overflow-hidden bg-carbon py-20 text-cream sm:py-24 lg:py-32"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-10%] top-0 h-[520px] w-[520px] rounded-full bg-brand/[0.055] blur-[150px]" />
          <div className="absolute left-[-12%] top-[45%] h-[420px] w-[420px] rounded-full bg-[#245568]/20 blur-[130px]" />
          <div className="blueprint-grid absolute inset-0 text-white opacity-[0.025]" />
        </div>

        <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10">
          <Reveal>
            <div className="mb-10 flex items-center gap-3 text-label text-white/45">
              <span className="text-brand">03</span>
              <span className="h-px w-7 bg-white/20" />
              Coleção 2026
              <span className="hidden h-px w-20 bg-white/10 sm:block" />
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
              <h2 className="max-w-[880px] font-display text-[clamp(2.6rem,5.6vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
                Escolha o seu
                <br />
                próximo{" "}
                <span className="text-brand">
                  movimento.
                </span>
              </h2>
              <div className="max-w-[390px] lg:justify-self-end">
                <p className="text-[13px] leading-[1.75] text-white/55">
                  Seis máquinas. Uma mesma obsessão por engenharia, design e
                  liberdade urbana. Selecione a sua e descubra uma nova forma de
                  atravessar Teresina.
                </p>
                <div className="mt-7 flex items-center gap-5">
                  <div>
                    <p className="text-meta text-white/40">
                      Linha
                    </p>
                    <p className="mt-1 text-[13px] font-semibold tabular-nums text-white/75">
                      06 modelos
                    </p>
                  </div>
                  <span className="h-7 w-px bg-white/15" />
                  <div>
                    <p className="text-meta text-white/40">
                      Entrega
                    </p>
                    <p className="mt-1 text-[13px] font-semibold tabular-nums text-white/75">
                      Teresina · 2026
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-col gap-5 border-y border-white/10 py-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <SlidersHorizontal
                  size={13}
                  className="text-white/30"
                  aria-hidden="true"
                />
                <span className="text-meta text-white/40">
                  Filtrar
                </span>
              </div>

              <div
                className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 lg:justify-end"
                role="group"
                aria-label="Filtrar scooters por categoria"
              >
                {CATEGORIES.map((item) => {
                  const isActive = category === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setCategory(item.id)}
                      className={cn(
                        "shrink-0 rounded-full border px-4 py-2.5 text-[12px] font-medium tracking-[-0.01em] transition-all duration-400",
                        isActive
                          ? "border-brand bg-brand text-carbon"
                          : "border-white/12 text-white/45 hover:border-white/30 hover:text-white",
                      )}
                    >
                      {item.label}
                      {item.id === "todos" ? (
                        <span
                          className={cn(
                            "ml-2 text-[11px] tabular-nums",
                            isActive ? "text-carbon/55" : "text-white/25",
                          )}
                        >
                          {MODELS.length}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <div className="mt-8 flex items-center justify-between pb-5">
            <p className="text-meta text-white/40">
              {String(filteredModels.length).padStart(2, "0")}{" "}
              {filteredModels.length === 1 ? "modelo" : "modelos"} em exibição
            </p>
            <p className="hidden text-meta text-white/30 sm:block">
              Selecione uma cor para personalizar
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredModels.map((model, index) => (
              <Reveal
                key={model.id}
                delay={Math.min(index * 0.06, 0.24)}
                y={34}
                className="h-full"
              >
                <ProductCard
                  model={model}
                  index={index}
                  onOpen={(selectedModel, color) =>
                    setSelectedProduct({ model: selectedModel, color })
                  }
                />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10" y={22}>
            <div className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-start gap-4">
                <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full border border-brand/25 bg-brand/[0.08] text-brand">
                  <span className="text-lg leading-none">?</span>
                </span>
                <div>
                  <p className="text-sm text-cream/85">
                    Ainda em dúvida sobre o modelo ideal?
                  </p>
                  <p className="mt-1 text-[12px] leading-relaxed text-white/45">
                    A equipe QIMOV ajuda você a encontrar a scooter certa para o
                    seu trajeto.
                  </p>
                </div>
              </div>
              <MagneticButton
                href={whatsappLink(
                  "Olá, QIMOV! Quero ajuda para escolher o modelo ideal para mim.",
                )}
                external
                variant="outline-light"
                className="shrink-0"
                icon={<ArrowUpRight size={14} />}
              >
                Falar com especialista
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {selectedProduct ? (
        <ProductDrawer
          model={selectedProduct.model}
          initialColor={selectedProduct.color}
          onClose={() => setSelectedProduct(null)}
        />
      ) : null}
    </>
  );
}
