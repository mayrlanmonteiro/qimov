"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  Loader2,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { MODELS } from "@/lib/models";
import { SITE, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const SHIFTS = [
  { id: "manha", label: "Manhã", time: "08h — 12h" },
  { id: "tarde", label: "Tarde", time: "12h — 18h" },
  { id: "noite", label: "Noite", time: "18h — 20h" },
] as const;

type Shift = (typeof SHIFTS)[number]["label"];

function onlyDigits(value: string) {
  return value.replace(/\D/g, "").slice(0, 11);
}

function formatPhone(value: string) {
  const digits = onlyDigits(value);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function Showroom() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [model, setModel] = useState("");
  const [shift, setShift] = useState<Shift>("Tarde");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(event.target.value));
    if (errors.phone) setErrors((current) => ({ ...current, phone: "" }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const nextErrors: Record<string, string> = {};
    if (name.trim().length < 2) {
      nextErrors.name = "Informe o seu nome completo.";
    }
    if (onlyDigits(phone).length < 10) {
      nextErrors.phone = "Informe um WhatsApp válido com DDD.";
    }
    if (!model) {
      nextErrors.model = "Selecione um modelo de interesse.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    timerRef.current = window.setTimeout(() => {
      setStatus("success");
    }, 850);
  };

  const firstName = name.trim().split(" ")[0] || "piloto";
  const selectedModelName = model || "Ainda não decidido";
  const message = [
    "Olá, QIMOV! Gostaria de agendar um test ride.",
    "",
    `Nome: ${name.trim()}`,
    `WhatsApp: ${phone}`,
    `Modelo de interesse: ${selectedModelName}`,
    `Melhor turno: ${shift}`,
    "",
    "Podem confirmar a disponibilidade?",
  ].join("\n");

  const resetForm = () => {
    setStatus("idle");
    setErrors({});
  };

  return (
    <section
      id="showroom"
      data-nav-theme="dark"
      className="relative overflow-hidden bg-graphite py-20 text-cream sm:py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="absolute -right-32 top-10 h-[520px] w-[520px] rounded-full bg-brand/[0.075] blur-[150px]" />
        <div className="absolute -left-32 bottom-0 h-[380px] w-[380px] rounded-full bg-[#235b70]/20 blur-[130px]" />
        <div className="blueprint-grid absolute inset-0 text-white opacity-[0.02]" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10">
        <Reveal>
          <div className="mb-10 flex items-center gap-3 text-label text-white/45">
            <span className="text-brand">06</span>
            <span className="h-px w-7 bg-white/20" />
            Showroom Teresina
            <span className="hidden h-px w-20 bg-white/10 sm:block" />
          </div>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16 xl:gap-24">
          <div>
            <Reveal>
              <h2 className="max-w-[700px] font-display text-[clamp(2.7rem,5.6vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
                Seu próximo
                <br />
                destino começa{" "}
                <span className="text-brand">
                  aqui.
                </span>
              </h2>
              <p className="mt-6 max-w-[440px] text-[13px] leading-[1.75] text-white/55">
                Venha sentir a experiência QIMOV de perto. Test ride
                acompanhado, atendimento personalizado e a linha completa para
                conhecer em Teresina.
              </p>
              <a
                href="#test-ride"
                className="group mt-6 inline-flex items-center gap-2 border-b border-brand/40 pb-1 text-[12px] font-semibold text-brand transition-colors hover:border-brand lg:hidden"
              >
                Agendar test ride
                <ArrowUpRight
                  size={12}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </Reveal>

            <Reveal delay={0.08} className="mt-10">
              <div className="grid gap-2.5 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                  <MapPin size={15} className="text-brand" />
                  <p className="mt-4 text-meta text-white/45">
                    Showroom
                  </p>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-white/80">
                    {SITE.address}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                  <Clock3 size={15} className="text-brand" />
                  <p className="mt-4 text-meta text-white/45">
                    Atendimento
                  </p>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-white/80">
                    {SITE.hours}
                  </p>
                </div>
              </div>

              <div className="mt-2.5 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3.5">
                <a
                  href={whatsappLink(
                    "Olá, QIMOV! Quero falar com a equipe do showroom em Teresina.",
                  )}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center gap-2 text-[12px] text-white/65 transition-colors hover:text-brand"
                >
                  <MessageCircle size={13} className="text-brand" />
                  WhatsApp QIMOV
                  <ArrowUpRight
                    size={12}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2 text-[12px] text-white/65 transition-colors hover:text-brand"
                >
                  <Phone size={12} className="text-brand" />
                  {SITE.email}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="mt-8">
              <TeresinaMap />
            </Reveal>
          </div>

          <Reveal delay={0.1} y={36}>
            <div
              id="test-ride"
              className="relative scroll-mt-28 overflow-hidden rounded-[1.75rem] bg-cream p-5 text-carbon sm:p-7 lg:p-8"
            >
              <div className="soft-grid pointer-events-none absolute inset-0 opacity-40" />
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent" />
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand/10 blur-3xl" />

              {status !== "success" ? (
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/10">
                        <CalendarDays size={14} className="text-brand-dark" />
                      </span>
                      <div>
                        <p className="text-meta text-carbon/50">
                          Agendamento
                        </p>
                        <p className="text-[11px] text-carbon/55">
                          Resposta rápida no WhatsApp
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full border border-carbon/10 px-2.5 py-1 text-[10px] font-semibold text-carbon/50">
                      Test ride
                    </span>
                  </div>

                  <h3 className="mt-7 font-display text-[clamp(1.7rem,3vw,2.3rem)] font-semibold leading-[1.02] tracking-[-0.025em]">
                    Experimente
                    <br />
                    <span className="text-brand-dark">
                      o futuro.
                    </span>
                  </h3>
                  <p className="mt-3 max-w-[310px] text-[12px] leading-relaxed text-carbon/55">
                    Escolha o modelo e o melhor horário. Nossa equipe confirma
                    tudo com você.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-7 space-y-4" noValidate>
                    <div>
                      <label
                        htmlFor="test-name"
                        className="mb-2 block text-[12px] font-medium text-carbon/60"
                      >
                        Seu nome
                      </label>
                      <input
                        id="test-name"
                        name="name"
                        autoComplete="name"
                        value={name}
                        onChange={(event) => {
                          setName(event.target.value);
                          if (errors.name) {
                            setErrors((current) => ({ ...current, name: "" }));
                          }
                        }}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "error-name" : undefined}
                        placeholder="Como podemos chamar você?"
                        className={cn(
                          "h-12 w-full rounded-xl border bg-white/55 px-4 text-[16px] text-carbon outline-none transition-all duration-300 placeholder:text-carbon/25 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/[0.08]",
                          errors.name ? "border-red-500/60" : "border-carbon/10",
                        )}
                      />
                      {errors.name ? (
                        <p
                          id="error-name"
                          className="mt-1.5 text-[11px] text-red-600"
                        >
                          {errors.name}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="test-phone"
                        className="mb-2 block text-[12px] font-medium text-carbon/60"
                      >
                        WhatsApp
                      </label>
                      <input
                        id="test-phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={
                          errors.phone ? "error-phone" : undefined
                        }
                        placeholder="(86) 99999-9999"
                        className={cn(
                          "h-12 w-full rounded-xl border bg-white/55 px-4 text-[16px] text-carbon outline-none transition-all duration-300 placeholder:text-carbon/25 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/[0.08]",
                          errors.phone
                            ? "border-red-500/60"
                            : "border-carbon/10",
                        )}
                      />
                      {errors.phone ? (
                        <p
                          id="error-phone"
                          className="mt-1.5 text-[11px] text-red-600"
                        >
                          {errors.phone}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="test-model"
                        className="mb-2 block text-[12px] font-medium text-carbon/60"
                      >
                        Modelo de interesse
                      </label>
                      <div className="relative">
                        <select
                          id="test-model"
                          name="model"
                          value={model}
                          onChange={(event) => {
                            setModel(event.target.value);
                            if (errors.model) {
                              setErrors((current) => ({
                                ...current,
                                model: "",
                              }));
                            }
                          }}
                          aria-invalid={Boolean(errors.model)}
                          aria-describedby={
                            errors.model ? "error-model" : undefined
                          }
                          className={cn(
                            "h-12 w-full appearance-none rounded-xl border bg-white/55 px-4 pr-10 text-[16px] text-carbon outline-none transition-all duration-300 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/[0.08]",
                            model ? "text-carbon" : "text-carbon/35",
                            errors.model
                              ? "border-red-500/60"
                              : "border-carbon/10",
                          )}
                        >
                          <option value="">Selecione seu QIMOV</option>
                          {MODELS.map((item) => (
                            <option key={item.id} value={`QIMOV ${item.name}`}>
                              QIMOV {item.name} · {item.categoryLabel}
                            </option>
                          ))}
                          <option value="Ainda não decidido">
                            Ainda não decidi
                          </option>
                        </select>
                        <CalendarDays
                          size={14}
                          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-carbon/30"
                        />
                      </div>
                      {errors.model ? (
                        <p
                          id="error-model"
                          className="mt-1.5 text-[11px] text-red-600"
                        >
                          {errors.model}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <span className="mb-2 block text-[12px] font-medium text-carbon/60">
                        Melhor turno
                      </span>
                      <div
                        role="radiogroup"
                        aria-label="Melhor turno para o test ride"
                        className="grid grid-cols-3 gap-2"
                      >
                        {SHIFTS.map((option) => {
                          const isActive = shift === option.label;
                          return (
                            <button
                              key={option.id}
                              type="button"
                              role="radio"
                              aria-checked={isActive}
                              onClick={() => setShift(option.label)}
                              className={cn(
                                "rounded-lg border px-2 py-2.5 text-center transition-colors duration-300",
                                isActive
                                  ? "border-carbon bg-carbon text-cream"
                                  : "border-carbon/10 bg-white/35 text-carbon/55 hover:border-carbon/30",
                              )}
                            >
                              <span className="block text-[12px] font-medium">
                                {option.label}
                              </span>
                              <span
                                className={cn(
                                  "mt-0.5 block text-[10px] tabular-nums",
                                  isActive
                                    ? "text-white/40"
                                    : "text-carbon/30",
                                )}
                              >
                                {option.time}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <MagneticButton
                      type="submit"
                      variant="dark"
                      className="mt-2 w-full justify-between py-4"
                      disabled={status === "sending"}
                      icon={
                        status === "sending" ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <ArrowUpRight size={14} />
                        )
                      }
                    >
                      {status === "sending"
                        ? "Preparando..."
                        : "Agendar meu test ride"}
                    </MagneticButton>

                    <p className="text-center text-[10px] leading-relaxed text-carbon/45">
                      Seus dados são usados apenas para o contato do test ride.
                    </p>
                  </form>
                </div>
              ) : (
                <div className="relative z-10 flex min-h-[560px] flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-meta text-carbon/50">
                      Solicitação preparada
                    </span>
                    <span className="text-[10px] font-semibold text-brand-dark">
                      QIMOV / Test ride
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
                    <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-brand/10">
                      <span className="absolute inset-0 animate-ping rounded-full bg-brand/10" />
                      <Check size={30} className="relative text-brand-dark" />
                    </span>
                    <p className="mt-7 text-meta text-carbon/50">
                      Tudo pronto
                    </p>
                    <h3 className="mt-3 font-display text-[2rem] font-semibold leading-[1.02] tracking-[-0.025em]">
                      Até breve,
                      <br />
                      <span className="text-brand-dark">
                        {firstName}.
                      </span>
                    </h3>
                    <p className="mt-4 max-w-[300px] text-[12px] leading-relaxed text-carbon/55">
                      Seu pedido de test ride foi preparado. Confirme com a
                      equipe QIMOV pelo WhatsApp para reservar o melhor horário.
                    </p>

                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                      <span className="rounded-full border border-carbon/10 px-3 py-1.5 text-[11px] font-medium text-carbon/60">
                        {selectedModelName}
                      </span>
                      <span className="rounded-full border border-carbon/10 px-3 py-1.5 text-[11px] font-medium text-carbon/60">
                        Turno {shift}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <MagneticButton
                      href={whatsappLink(message)}
                      external
                      variant="primary"
                      className="w-full justify-between py-4"
                    >
                      Confirmar no WhatsApp
                    </MagneticButton>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="w-full py-2 text-[12px] font-medium text-carbon/50 transition-colors hover:text-carbon"
                    >
                      Agendar outro test ride
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function TeresinaMap() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111419] p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-meta text-white/45">
          <Navigation size={11} className="text-brand" />
          Teresina · Piauí
        </div>
        <span className="font-mono text-[10px] tracking-[0.02em] text-white/35">
          Zone 05 / BR
        </span>
      </div>
      <svg
        viewBox="0 0 620 230"
        className="h-auto w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="river-line" x1="0" y1="0" x2="620" y2="230">
            <stop offset="0" stopColor="#2a6378" stopOpacity="0.25" />
            <stop offset="1" stopColor="#79c5d9" stopOpacity="0.5" />
          </linearGradient>
          <radialGradient id="showroom-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#F26522" stopOpacity="0.3" />
            <stop offset="1" stopColor="#F26522" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g stroke="#F4F2EE" strokeOpacity="0.06">
          {Array.from({ length: 9 }).map((_, index) => (
            <line
              key={`v-${index}`}
              x1={index * 78}
              y1="0"
              x2={index * 78}
              y2="230"
            />
          ))}
          {Array.from({ length: 4 }).map((_, index) => (
            <line
              key={`h-${index}`}
              x1="0"
              y1={index * 58}
              x2="620"
              y2={index * 58}
            />
          ))}
        </g>
        <path
          d="M500 -20C478 35 502 74 546 103C579 126 600 162 580 250"
          stroke="url(#river-line)"
          strokeWidth="24"
          fill="none"
        />
        <path
          d="M500 -20C478 35 502 74 546 103C579 126 600 162 580 250"
          stroke="#9ce9ff"
          strokeOpacity="0.15"
          strokeWidth="1"
          fill="none"
        />
        <g
          stroke="#F4F2EE"
          strokeOpacity="0.18"
          strokeWidth="1"
          fill="none"
        >
          <path d="M40 174C148 156 241 116 360 103C435 94 500 72 542 46" />
          <path d="M70 78L165 102C243 121 332 138 430 170" />
          <path d="M150 210C218 169 277 148 364 144C438 140 503 156 572 190" />
          <path d="M282 12C299 63 321 102 365 143C400 176 410 204 407 236" />
        </g>
        <g
          fontFamily="monospace"
          fill="#F4F2EE"
          fillOpacity="0.22"
          fontSize="7"
          letterSpacing="0.4"
        >
          <text x="68" y="64" transform="rotate(13 68 64)">
            AV. RAUL LOPES
          </text>
          <text x="340" y="28" transform="rotate(46 340 28)">
            RIO POTI
          </text>
          <text x="421" y="188" transform="rotate(-8 421 188)">
            CENTRO
          </text>
          <text x="184" y="152">
            ZONA LESTE
          </text>
        </g>
        <circle cx="340" cy="122" r="34" fill="url(#showroom-glow)" />
        <circle
          cx="340"
          cy="122"
          r="13"
          stroke="#F26522"
          strokeOpacity="0.45"
          fill="none"
        />
        <circle cx="340" cy="122" r="5" fill="#F26522" />
        <path
          d="M340 122L385 84"
          stroke="#F26522"
          strokeOpacity="0.5"
          strokeWidth="0.8"
        />
        <g>
          <rect
            x="389"
            y="65"
            width="88"
            height="26"
            rx="4"
            fill="#0D0F12"
            fillOpacity="0.8"
            stroke="#F26522"
            strokeOpacity="0.3"
          />
          <text
            x="399"
            y="77"
            fill="#F26522"
            fontFamily="monospace"
            fontSize="6.5"
            letterSpacing="0.4"
          >
            QIMOV
          </text>
          <text
            x="399"
            y="85"
            fill="#F4F2EE"
            fillOpacity="0.4"
            fontFamily="monospace"
            fontSize="5.5"
            letterSpacing="0.3"
          >
            SHOWROOM PI
          </text>
        </g>
      </svg>
      <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-2.5">
        <span className="text-meta text-white/35">
          Avenidas principais · 05°05′S
        </span>
        <span className="flex items-center gap-1.5 text-meta text-brand">
          <span className="h-1 w-1 animate-pulse rounded-full bg-brand" />
          Showroom ativo
        </span>
      </div>
    </div>
  );
}
