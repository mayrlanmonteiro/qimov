import { cn } from "@/lib/utils";

export function QimovMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <circle
        cx="20"
        cy="20"
        r="13.5"
        stroke="currentColor"
        strokeWidth="2.7"
      />
      <path
        d="M17.7 12.5a8.3 8.3 0 1 0 7.2 13.6"
        stroke="currentColor"
        strokeWidth="2.7"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M29.2 29.2L38 38"
        stroke="#F26522"
        strokeWidth="4.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

type QimovLogoProps = {
  className?: string;
  markClassName?: string;
  showTagline?: boolean;
};

export function QimovLogo({
  className,
  markClassName,
  showTagline = false,
}: QimovLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <QimovMark className={cn("h-7 w-7", markClassName)} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.15rem] font-bold tracking-[-0.03em]">
          QIMOV
        </span>
        {showTagline ? (
          <span className="mt-1 text-[10px] font-medium tracking-[0.01em] opacity-60">
            Energia em movimento
          </span>
        ) : null}
      </span>
    </span>
  );
}
