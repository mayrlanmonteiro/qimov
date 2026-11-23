export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

export function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

export function smoothstep(edge0: number, edge1: number, value: number) {
  const x = clamp((value - edge0) / (edge1 - edge0));
  return x * x * (3 - 2 * x);
}

const brlFormatters = new Map<number, Intl.NumberFormat>();
const numberFormatters = new Map<number, Intl.NumberFormat>();

export function formatBRL(value: number, fractionDigits = 0) {
  let formatter = brlFormatters.get(fractionDigits);

  if (!formatter) {
    formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });
    brlFormatters.set(fractionDigits, formatter);
  }

  return formatter.format(value);
}

export function formatNumber(value: number, fractionDigits = 0) {
  let formatter = numberFormatters.get(fractionDigits);

  if (!formatter) {
    formatter = new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });
    numberFormatters.set(fractionDigits, formatter);
  }

  return formatter.format(value);
}

/**
 * Valor de uma parcela pela Tabela Price.
 * Uma taxa de 0 representa parcelamento sem juros.
 */
export function calculateInstallment(
  total: number,
  months: number,
  monthlyRate = 0,
) {
  if (monthlyRate === 0) {
    return { installment: total / months, total, months, rate: 0 };
  }

  const factor = (1 + monthlyRate) ** months;
  const installment = (total * monthlyRate * factor) / (factor - 1);

  return {
    installment,
    total: installment * months,
    months,
    rate: monthlyRate,
  };
}

const shadeCache = new Map<string, string>();

/** Escurece uma cor hexadecimal preservando a saturação. */
export function shadeColor(hex: string, amount: number) {
  const cacheKey = `${hex}|${amount}`;
  const cached = shadeCache.get(cacheKey);
  if (cached) return cached;

  const value = hex.replace("#", "");
  const num = parseInt(
    value.length === 3
      ? value
          .split("")
          .map((char) => char + char)
          .join("")
      : value,
    16,
  );

  const r = clamp(((num >> 16) & 255) + amount, 0, 255);
  const g = clamp(((num >> 8) & 255) + amount, 0, 255);
  const b = clamp((num & 255) + amount, 0, 255);

  const shaded = `#${[r, g, b]
    .map((channel) => Math.round(channel).toString(16).padStart(2, "0"))
    .join("")}`;

  shadeCache.set(cacheKey, shaded);
  return shaded;
}

/** Movimento reduzido é respeitado em todas as animações dirigidas por JS. */
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Dispositivos sem hover primário (celulares e tablets) não precisam de Lenis. */
export function hasFinePointer() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches
  );
}
