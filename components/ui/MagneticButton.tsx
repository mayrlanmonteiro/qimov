"use client";

import {
  useRef,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "outline-light" | "outline-dark";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: (event: ReactMouseEvent<HTMLElement>) => void;
  type?: "button" | "submit";
  variant?: Variant;
  className?: string;
  icon?: ReactNode | null;
  external?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
};

const variants: Record<Variant, string> = {
  primary:
    "border border-brand bg-brand text-carbon hover:border-brand-dark hover:bg-brand-dark",
  dark: "border border-carbon bg-carbon text-cream hover:border-brand hover:bg-brand hover:text-carbon",
  "outline-light":
    "border border-white/25 bg-transparent text-cream hover:border-brand hover:text-brand",
  "outline-dark":
    "border border-carbon/25 bg-transparent text-carbon hover:border-carbon hover:bg-carbon hover:text-cream",
};

export function MagneticButton({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  className,
  icon,
  external = false,
  disabled = false,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLElement>,
  ) => {
    const element = ref.current;
    if (!element || event.pointerType === "touch") return;

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.09;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.18;
    element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const resetPosition = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0, 0, 0)";
  };

  const sharedProps = {
    onPointerMove: handlePointerMove,
    onPointerLeave: resetPosition,
    onClick,
    "aria-label": ariaLabel,
    className: cn(
      "group relative inline-flex min-h-11 items-center justify-center gap-3 overflow-hidden rounded-full px-6 py-3.5",
      "text-[13px] font-semibold tracking-[-0.01em] transition-[transform,background-color,border-color,color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
      "disabled:pointer-events-none disabled:opacity-40",
      variants[variant],
      className,
    ),
  };

  const content = (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-[110%] bg-white/12 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[110%]"
      />
      <span className="relative z-10 whitespace-nowrap">{children}</span>
      {icon !== null ? (
        <span className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          {icon ?? <ArrowUpRight size={14} strokeWidth={1.8} />}
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <a
        {...sharedProps}
        ref={ref as RefObject<HTMLAnchorElement | null>}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      {...sharedProps}
      ref={ref as RefObject<HTMLButtonElement | null>}
      type={type}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
