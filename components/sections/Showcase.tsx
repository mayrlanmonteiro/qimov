"use client";

import {
  ArrowDownRight,
  BatteryCharging,
  CircleGauge,
  Disc3,
  MonitorSmartphone,
  VolumeX,
  Zap,
} from "lucide-react";
import { QimovMark } from "@/components/brand/QimovLogo";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Reveal } from "@/components/ui/Reveal";

export function Showcase() {
  return (
    <section id="destaques" className="relative bg-carbon">
      <div className="h-14 bg-carbon sm:h-20" />

      <div
        data-nav-theme="light"
        className="relative overflow-hidden rounded-[2.25rem] bg-cream text-carbon sm:rounded-[3.5rem]"
      >
        <div className="soft-grid pointer-events-none absolute inset-0 opacity-50" />
        <div className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-[#dfdacf]/60 blur-[110px]" />

        <div className="relative mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
          <Reveal>
            <div className="mb-10 flex items-center gap-3 text-label text-carbon/50">
              <span className="text-brand-dark">02</span>
              <span className="h-px w-7 bg-carbon/20" />
              Showcase QIMOV
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <h2 className="max-w-[860px] font-display text-[clamp(2.8rem,6.2vw,6.2rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
                Cada detalhe
                <br />
                <span className="text-brand-dark">importa.</span>
              </h2>
              <div className="max-w-[380px] lg:justify-self-end">
                <p className="text-[13px] leading-[1.75] text-carbon/60">
                  Não é apenas uma scooter elétrica. É um sistema completo de
                  mobilidade, desenhado para durar, economizar e transformar a
                  relação com a cidade.
                </p>
                <div className="mt-7 flex items-center gap-3">
                  <span className="text-meta text-carbon/45">
                    Conheça os 4 pilares
                  </span>
                  <ArrowDownRight size={14} className="text-brand-dark" />
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-3 sm:mt-16 lg:grid-cols-12">
            <Reveal y={36} className="lg:col-span-7 lg:row-span-2">
              <article className="group relative flex h-full min-h-[580px] flex-col overflow-hidden rounded-[1.5rem] bg-[#15181d] p-6 text-cream sm:p-8 lg:min-h-[700px] lg:p-10">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_55%,rgba(242,101,34,0.10),transparent_65%)]" />
                <div className="blueprint-grid pointer-events-none absolute inset-0 text-white opacity-[0.035]" />
                <QimovMark className="pointer-events-none absolute -bottom-16 -right-8 h-72 w-72 text-white/[0.035] transition-transform duration-1000 group-hover:rotate-12" />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="flex items-center gap-2.5 text-label text-white/45">
                    <BatteryCharging size={13} className="text-brand" />
                    01 / Energia
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.02em] text-white/35">
                    LiFePO₄ · removable
                  </span>
                </div>

                <div className="relative z-10 mt-8 max-w-[480px]">
                  <h3 className="font-display text-[clamp(2rem,4vw,3.8rem)] font-semibold leading-[1] tracking-[-0.03em]">
                    Bateria de lítio
                    <br />
                    <span className="text-brand">
                      removível.
                    </span>
                  </h3>
                  <p className="mt-4 max-w-[340px] text-[13px] leading-relaxed text-white/55">
                    Recarregue em qualquer tomada comum. Sem pontos especiais,
                    sem complicação — energia que acompanha o seu ritmo.
                  </p>
                </div>

                <div className="relative z-10 my-4 flex flex-1 items-center justify-center sm:my-2">
                  <BatteryVisual />
                </div>

                <div className="relative z-10 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
                  {[
                    { value: 120, suffix: "KM", label: "Autonomia máxima" },
                    { value: 3, suffix: "H", label: "Recarga 220V" },
                    { value: 2880, suffix: "WH", label: "Capacidade" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="text-[16px] font-semibold tabular-nums text-cream">
                        <AnimatedNumber
                          value={stat.value}
                          format={(value) =>
                            `${new Intl.NumberFormat("pt-BR").format(Math.round(value))}`
                          }
                        />
                        <span className="ml-1 text-[10px] font-medium text-brand">
                          {stat.suffix}
                        </span>
                      </p>
                      <p className="mt-1 text-[11px] leading-tight text-white/45">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>

            <Reveal y={36} delay={0.06} className="lg:col-span-5">
              <article className="group relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-[1.5rem] border border-carbon/10 bg-[#ebe7df] p-6 transition-colors duration-500 hover:bg-[#e8e3da] sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2.5 text-label text-carbon/50">
                    <VolumeX size={13} className="text-brand-dark" />
                    02 / Propulsão
                  </span>
                  <span className="font-mono text-[10px] text-carbon/40">
                    0 DB
                  </span>
                </div>

                <div className="mt-6 flex flex-1 flex-row items-end justify-between gap-4">
                  <div className="pb-1">
                    <h3 className="font-display text-[clamp(1.8rem,2.8vw,2.6rem)] font-semibold leading-[1] tracking-[-0.025em]">
                      Motor Hub
                      <br />
                      Brushless.
                    </h3>
                    <p className="mt-3 max-w-[210px] text-[12px] leading-relaxed text-carbon/55">
                      Zero ruído. Baixa manutenção. Resposta imediata em cada
                      toque.
                    </p>
                  </div>
                  <HubMotorVisual />
                </div>

                <div className="mt-6 flex items-center gap-4 border-t border-carbon/10 pt-4">
                  <span className="text-[12px] font-semibold tabular-nums text-carbon/60">
                    2.000 W
                  </span>
                  <span className="h-3 w-px bg-carbon/15" />
                  <span className="text-[12px] font-semibold tabular-nums text-carbon/60">
                    IPX5
                  </span>
                  <span className="ml-auto text-[12px] font-semibold text-brand-dark">
                    0 dB
                  </span>
                </div>
              </article>
            </Reveal>

            <div className="grid gap-3 sm:grid-cols-2 lg:col-span-5">
              <Reveal y={36} delay={0.1}>
                <article className="group relative flex h-full min-h-[330px] flex-col overflow-hidden rounded-[1.5rem] border border-carbon/10 bg-[#f8f6f2] p-6 transition-colors duration-500 hover:bg-white sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-label text-carbon/50">
                      <MonitorSmartphone size={12} className="text-brand-dark" />
                      03 / Interface
                    </span>
                    <span className="font-mono text-[10px] text-carbon/40">
                      SMART
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-[clamp(1.5rem,2.1vw,2rem)] font-semibold leading-[1.02] tracking-[-0.025em]">
                    Painel digital
                    <br />
                    Smart LCD.
                  </h3>

                  <div className="relative mt-5 flex-1">
                    <DisplayVisual />
                  </div>

                  <p className="mt-4 text-[12px] leading-relaxed text-carbon/55">
                    Telemetria, bateria e modos de pilotagem, sempre à vista.
                  </p>
                </article>
              </Reveal>

              <Reveal y={36} delay={0.16}>
                <article className="group relative flex h-full min-h-[330px] flex-col overflow-hidden rounded-[1.5rem] bg-[#171a1f] p-6 text-cream sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-label text-white/45">
                      <Disc3 size={12} className="text-brand" />
                      04 / Frenagem
                    </span>
                    <span className="font-mono text-[10px] text-white/35">
                      HYDRAULIC
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-[clamp(1.5rem,2.1vw,2rem)] font-semibold leading-[1.02] tracking-[-0.025em]">
                    Freios a disco
                    <br />
                    hidráulicos.
                  </h3>

                  <div className="relative mt-3 flex flex-1 items-center justify-center">
                    <BrakeVisual />
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-3">
                    <span className="text-[12px] text-white/50">
                      Controle absoluto em qualquer piso.
                    </span>
                    <CircleGauge size={13} className="text-brand" />
                  </div>
                </article>
              </Reveal>
            </div>
          </div>

          <Reveal className="mt-12" y={20}>
            <div className="flex flex-col gap-4 border-t border-carbon/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <Zap size={14} className="text-brand-dark" />
                <p className="text-meta text-carbon/50">
                  Engenharia QIMOV · Projetada para a cidade
                </p>
              </div>
              <p className="text-meta text-carbon/40">
                Teresina · Piauí · 2026
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="h-14 bg-carbon sm:h-20" />
    </section>
  );
}

function BatteryVisual() {
  return (
    <svg
      viewBox="0 0 520 300"
      className="h-auto w-full max-w-[490px]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="battery-shell" x1="200" y1="60" x2="330" y2="280">
          <stop offset="0" stopColor="#3b4148" />
          <stop offset="0.35" stopColor="#1d2228" />
          <stop offset="1" stopColor="#0e1013" />
        </linearGradient>
        <linearGradient id="battery-side" x1="220" y1="80" x2="310" y2="260">
          <stop offset="0" stopColor="#f4f2ee" stopOpacity="0.16" />
          <stop offset="1" stopColor="#f4f2ee" stopOpacity="0.02" />
        </linearGradient>
        <radialGradient id="battery-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#F26522" stopOpacity="0.3" />
          <stop offset="0.55" stopColor="#F26522" stopOpacity="0.08" />
          <stop offset="1" stopColor="#F26522" stopOpacity="0" />
        </radialGradient>
        <filter id="battery-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>

      <ellipse cx="260" cy="155" rx="205" ry="128" fill="url(#battery-glow)" />
      <ellipse
        cx="260"
        cy="156"
        rx="178"
        ry="112"
        stroke="#F4F2EE"
        strokeOpacity="0.08"
        strokeDasharray="2 8"
      />
      <ellipse
        cx="260"
        cy="156"
        rx="133"
        ry="82"
        stroke="#F26522"
        strokeOpacity="0.18"
      />

      <g className="animate-float">
        <path
          d="M252 46H300C307 46 313 52 313 59V74H239V59C239 52 245 46 252 46Z"
          fill="#272C32"
          stroke="#6C747B"
          strokeOpacity="0.5"
        />
        <rect
          x="195"
          y="63"
          width="166"
          height="211"
          rx="22"
          fill="url(#battery-shell)"
          stroke="#F4F2EE"
          strokeOpacity="0.22"
          strokeWidth="1.4"
        />
        <rect
          x="207"
          y="78"
          width="142"
          height="180"
          rx="15"
          fill="#111419"
          stroke="#F4F2EE"
          strokeOpacity="0.07"
        />
        <path
          d="M208 96C208 86 216 78 226 78H278C288 78 296 86 296 96V101H208V96Z"
          fill="url(#battery-side)"
        />
        <rect x="217" y="102" width="122" height="5" rx="2.5" fill="#F26522" />
        <rect
          x="222"
          y="121"
          width="112"
          height="86"
          rx="8"
          fill="#181C21"
          stroke="#F4F2EE"
          strokeOpacity="0.08"
        />
        <g style={{ fontFamily: "var(--font-display), sans-serif" }}>
          <text
            x="238"
            y="154"
            fill="#F4F2EE"
            fillOpacity="0.85"
            fontSize="20"
            fontWeight="600"
            letterSpacing="-0.8"
          >
            QIMOV
          </text>
          <text
            x="238"
            y="168"
            fill="#F4F2EE"
            fillOpacity="0.28"
            fontSize="7"
            letterSpacing="0.6"
          >
            POWER CELL / 60V
          </text>
        </g>
        <path
          d="M292 181L273 209H288L280 230L303 199H288L292 181Z"
          fill="#F26522"
        />
        <g fill="#F26522">
          <circle cx="225" cy="230" r="2.6" />
          <circle cx="234" cy="230" r="2.6" opacity="0.7" />
          <circle cx="243" cy="230" r="2.6" opacity="0.45" />
          <circle cx="252" cy="230" r="2.6" opacity="0.22" />
        </g>
        <rect
          x="282"
          y="226"
          width="54"
          height="16"
          rx="4"
          fill="#0D0F12"
          stroke="#F4F2EE"
          strokeOpacity="0.1"
        />
        <text
          x="292"
          y="237"
          fill="#F4F2EE"
          fillOpacity="0.35"
          fontSize="7.5"
          fontFamily="monospace"
          letterSpacing="0.4"
        >
          24 Ah
        </text>
        <path
          d="M195 230C182 230 168 238 168 254C168 266 178 274 189 274C202 274 211 264 211 253"
          stroke="#5B6269"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle cx="189" cy="253" r="11" fill="#1B1F24" stroke="#8B9299" />
        <circle cx="189" cy="253" r="3" fill="#F26522" />
        <path
          d="M165 271C153 278 144 288 144 298"
          stroke="#F26522"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="3 5"
        />
        <ellipse
          cx="223"
          cy="247"
          rx="58"
          ry="17"
          fill="#F26522"
          fillOpacity="0.15"
          filter="url(#battery-blur)"
        />
      </g>

      <g
        fontFamily="monospace"
        fill="#F4F2EE"
        fillOpacity="0.22"
        fontSize="7.5"
        letterSpacing="0.5"
      >
        <text x="62" y="84">
          REMOVABLE
        </text>
        <path d="M62 92H124" stroke="#F4F2EE" strokeOpacity="0.12" />
        <text x="394" y="212">
          LITHIUM
        </text>
        <text x="394" y="222">
          LiFePO4
        </text>
        <path d="M364 228H456" stroke="#F4F2EE" strokeOpacity="0.12" />
      </g>
    </svg>
  );
}

function HubMotorVisual() {
  return (
    <svg
      viewBox="0 0 180 180"
      className="h-[118px] w-[118px] shrink-0 transition-transform duration-1000 group-hover:rotate-45 sm:h-[140px] sm:w-[140px]"
      aria-hidden="true"
    >
      <circle cx="90" cy="90" r="76" fill="none" stroke="#0D0F12" strokeOpacity="0.12" />
      <circle
        cx="90"
        cy="90"
        r="65"
        fill="none"
        stroke="#0D0F12"
        strokeOpacity="0.2"
        strokeWidth="11"
        strokeDasharray="4 7"
      />
      {Array.from({ length: 8 }).map((_, index) => (
        <line
          key={index}
          x1="90"
          y1="43"
          x2="90"
          y2="63"
          stroke="#0D0F12"
          strokeOpacity="0.35"
          strokeWidth="4"
          strokeLinecap="round"
          transform={`rotate(${index * 45} 90 90)`}
        />
      ))}
      <circle cx="90" cy="90" r="32" fill="#171A1F" />
      <circle cx="90" cy="90" r="23" fill="#2C3137" stroke="#71787F" />
      <circle cx="90" cy="90" r="9" fill="#F26522" />
      <path
        d="M117 51C133 63 140 82 136 101"
        stroke="#F26522"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="3 5"
      />
      <circle cx="136" cy="103" r="3" fill="#F26522" />
    </svg>
  );
}

function DisplayVisual() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-carbon/10 bg-[#0f1215] p-3.5 shadow-[0_20px_40px_rgba(13,15,18,0.16)]">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[8px] tracking-[0.04em] text-white/45">
          QIMOV OS
        </span>
        <div className="flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-[#9ce9ff]" />
          <span className="font-mono text-[8px] text-white/45">
            LTE
          </span>
        </div>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-[30px] leading-none tracking-[-0.04em] text-[#e8faff]">
            45
          </span>
          <span className="font-mono text-[8px] text-white/45">KM/H</span>
        </div>
        <span className="rounded-full border border-[#9ce9ff]/30 px-2 py-0.5 font-mono text-[8px] tracking-[0.02em] text-[#9ce9ff]">
          Drive
        </span>
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        {Array.from({ length: 10 }).map((_, index) => (
          <span
            key={index}
            className="h-1 flex-1 rounded-full"
            style={{
              backgroundColor:
                index < 8 ? "#F26522" : "rgba(244,242,238,0.12)",
            }}
          />
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="font-mono text-[8px] text-white/35">78%</span>
        <span className="font-mono text-[8px] text-white/35">
          04:12 KM
        </span>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08),transparent_35%)]" />
    </div>
  );
}

function BrakeVisual() {
  return (
    <svg
      viewBox="0 0 220 220"
      className="h-[160px] w-[160px] transition-transform duration-1000 group-hover:rotate-[24deg]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="rotor-metal" x1="60" y1="40" x2="180" y2="190">
          <stop offset="0" stopColor="#aab0b6" />
          <stop offset="0.45" stopColor="#606870" />
          <stop offset="1" stopColor="#d7dbde" />
        </linearGradient>
        <radialGradient id="brake-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#F26522" stopOpacity="0.18" />
          <stop offset="1" stopColor="#F26522" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="110" cy="110" r="105" fill="url(#brake-glow)" />
      <circle
        cx="110"
        cy="110"
        r="82"
        fill="#1b1f24"
        stroke="url(#rotor-metal)"
        strokeWidth="11"
      />
      <circle
        cx="110"
        cy="110"
        r="67"
        fill="none"
        stroke="#F4F2EE"
        strokeOpacity="0.16"
        strokeWidth="1"
        strokeDasharray="2 5"
      />
      {Array.from({ length: 18 }).map((_, index) => (
        <circle
          key={index}
          cx="110"
          cy="38"
          r="2.2"
          fill="#0d0f12"
          stroke="#969da3"
          strokeWidth="0.5"
          transform={`rotate(${index * 20} 110 110)`}
        />
      ))}
      {Array.from({ length: 6 }).map((_, index) => (
        <line
          key={index}
          x1="110"
          y1="82"
          x2="110"
          y2="55"
          stroke="#8b9299"
          strokeOpacity="0.45"
          strokeWidth="2"
          strokeLinecap="round"
          transform={`rotate(${index * 60} 110 110)`}
        />
      ))}
      <circle
        cx="110"
        cy="110"
        r="26"
        fill="#2b3036"
        stroke="#8b9299"
        strokeOpacity="0.7"
        strokeWidth="2"
      />
      <circle cx="110" cy="110" r="8" fill="#F26522" />
      <path
        d="M182 67C194 80 200 94 202 109C204 124 201 139 193 152L176 136C182 124 185 115 182 104C179 93 172 83 164 77Z"
        fill="#F26522"
      />
      <path
        d="M178 80L195 64"
        stroke="#F26522"
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
