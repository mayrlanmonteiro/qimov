"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type AnimatedNumberProps = {
  value: number;
  format?: (value: number) => string;
  duration?: number;
  className?: string;
  startOnView?: boolean;
};

const defaultFormat = (value: number) =>
  new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }).format(value);

/**
 * Contador numérico que anima na primeira entrada em viewport e
 * interpola suavemente quando o valor muda (ex.: simulador).
 */
export function AnimatedNumber({
  value,
  format = defaultFormat,
  duration = 1200,
  className,
  startOnView = true,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const currentValue = useRef(0);
  const latestValue = useRef(value);
  const visible = useRef(false);
  const hasAnimated = useRef(false);
  const animationFrame = useRef<number | null>(null);
  const formatRef = useRef(format);

  formatRef.current = format;

  const animateToValue = useCallback(
    (to: number) => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        currentValue.current = to;
        if (ref.current) ref.current.textContent = formatRef.current(to);
        return;
      }

      const from = hasAnimated.current ? currentValue.current : 0;
      const startedAt = performance.now();
      hasAnimated.current = true;

      const tick = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const next = from + (to - from) * eased;

        currentValue.current = next;
        if (ref.current) ref.current.textContent = formatRef.current(next);

        if (progress < 1) {
          animationFrame.current = requestAnimationFrame(tick);
        } else {
          currentValue.current = to;
          if (ref.current) ref.current.textContent = formatRef.current(to);
        }
      };

      animationFrame.current = requestAnimationFrame(tick);
    },
    [duration],
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (!startOnView) {
      visible.current = true;
      animateToValue(latestValue.current);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        visible.current = true;
        observer.disconnect();
        animateToValue(latestValue.current);
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [animateToValue, startOnView]);

  useEffect(() => {
    latestValue.current = value;
    if (visible.current) animateToValue(value);
  }, [animateToValue, value]);

  return (
    <span
      ref={ref}
      className={cn("tabular-nums", className)}
      suppressHydrationWarning
    >
      {format(0)}
    </span>
  );
}
