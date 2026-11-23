"use client";

import { useId } from "react";
import { shadeColor } from "@/lib/utils";
import type { ScooterVariant } from "@/lib/models";
import { cn } from "@/lib/utils";

type ScooterIllustrationProps = {
  color: string;
  variant?: ScooterVariant;
  className?: string;
  showScene?: boolean;
};

export function ScooterIllustration({
  color,
  variant = "street",
  className,
  showScene = true,
}: ScooterIllustrationProps) {
  const rawId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const uid = `scooter-${rawId}`;
  const bodyLight = shadeColor(color, 46);
  const bodyBase = color;
  const bodyDark = shadeColor(color, -44);
  const bodyDeep = shadeColor(color, -78);
  const isSport = variant === "sport";
  const isCargo = variant === "cargo";

  return (
    <svg
      viewBox="0 0 1200 760"
      fill="none"
      role="presentation"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={`${uid}-body`} x1="300" y1="280" x2="960" y2="520">
          <stop offset="0" stopColor={bodyLight} />
          <stop offset="0.32" stopColor={bodyBase} />
          <stop offset="0.78" stopColor={bodyDark} />
          <stop offset="1" stopColor={bodyDeep} />
        </linearGradient>
        <linearGradient id={`${uid}-body-soft`} x1="700" y1="250" x2="970" y2="500">
          <stop offset="0" stopColor={bodyLight} />
          <stop offset="0.55" stopColor={bodyBase} />
          <stop offset="1" stopColor={bodyDark} />
        </linearGradient>
        <linearGradient id={`${uid}-seat`} x1="280" y1="280" x2="520" y2="360">
          <stop offset="0" stopColor="#31343A" />
          <stop offset="0.5" stopColor="#1A1D21" />
          <stop offset="1" stopColor="#0E1013" />
        </linearGradient>
        <linearGradient id={`${uid}-metal`} x1="700" y1="300" x2="930" y2="600">
          <stop offset="0" stopColor="#E1E4E6" />
          <stop offset="0.4" stopColor="#969DA4" />
          <stop offset="1" stopColor="#50565D" />
        </linearGradient>
        <linearGradient id={`${uid}-rim`} x1="200" y1="430" x2="1030" y2="660">
          <stop offset="0" stopColor="#AAB0B5" />
          <stop offset="0.35" stopColor="#5B6269" />
          <stop offset="0.7" stopColor="#D5D9DC" />
          <stop offset="1" stopColor="#737A81" />
        </linearGradient>
        <linearGradient id={`${uid}-glass`} x1="900" y1="140" x2="970" y2="280">
          <stop offset="0" stopColor="#F4F2EE" stopOpacity="0.28" />
          <stop offset="1" stopColor="#F4F2EE" stopOpacity="0.02" />
        </linearGradient>
        <radialGradient id={`${uid}-halo`} cx="50%" cy="45%" r="55%">
          <stop offset="0" stopColor={bodyBase} stopOpacity="0.2" />
          <stop offset="0.5" stopColor={bodyBase} stopOpacity="0.06" />
          <stop offset="1" stopColor={bodyBase} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-floor`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#000000" stopOpacity="0.55" />
          <stop offset="1" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <filter id={`${uid}-blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
        <filter id={`${uid}-glow`} x="-200%" y="-200%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
        <filter id={`${uid}-soft-shadow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      {showScene ? (
        <g>
          <rect width="1200" height="760" fill={`url(#${uid}-halo)`} />
          <circle
            cx="610"
            cy="378"
            r="312"
            stroke="#F4F2EE"
            strokeOpacity="0.055"
            strokeWidth="1"
          />
          <circle
            cx="610"
            cy="378"
            r="235"
            stroke={bodyLight}
            strokeOpacity="0.09"
            strokeWidth="1"
            strokeDasharray="2 10"
          />
          <path
            d="M80 654H1120"
            stroke="#F4F2EE"
            strokeOpacity="0.08"
          />
          <path
            d="M80 660H1120"
            stroke="#000000"
            strokeOpacity="0.3"
          />
          <ellipse
            cx="605"
            cy="671"
            rx="385"
            ry="34"
            fill={`url(#${uid}-floor)`}
            filter={`url(#${uid}-soft-shadow)`}
          />
          <g stroke="#F4F2EE" strokeOpacity="0.1">
            <path d="M1110 630V654" />
            <path d="M1097 630H1110" />
            <path d="M1097 654H1110" />
          </g>
        </g>
      ) : null}

      {/* Rodas */}
      <Wheel
        cx={342}
        cy={538}
        uid={uid}
        variant={variant}
        isFront={false}
        bodyBase={bodyBase}
      />
      <Wheel
        cx={892}
        cy={538}
        uid={uid}
        variant={variant}
        isFront
        bodyBase={bodyBase}
      />

      {/* Suspensão e garfo */}
      <path
        d="M911 357L888 528"
        stroke="#2B3037"
        strokeWidth="20"
        strokeLinecap="round"
      />
      <path
        d="M911 357L888 528"
        stroke={`url(#${uid}-metal)`}
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M887 543L865 620"
        stroke="#20242A"
        strokeWidth="14"
        strokeLinecap="round"
      />

      <g opacity="0.9">
        <path
          d="M511 425L479 494"
          stroke="#24282E"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <path
          d="M489 435C475 449 495 462 481 477C468 491 487 504 474 517"
          stroke="#F26522"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>

      {/* Fender dianteiro */}
      <path
        d="M749 520C777 452 824 422 892 422C961 422 1011 462 1044 526"
        stroke={`url(#${uid}-body-soft)`}
        strokeWidth="36"
        strokeLinecap="round"
      />
      <path
        d="M760 509C793 451 838 434 893 434C951 434 994 469 1024 517"
        stroke={bodyLight}
        strokeOpacity="0.36"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M775 533C803 485 839 462 889 461"
        stroke="#0D0F12"
        strokeOpacity="0.35"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Carenagem traseira */}
      <path
        d="M190 463C181 430 195 391 228 363L289 321C310 306 339 299 374 299H492C532 301 556 323 568 359L582 415C591 454 566 484 518 492L383 507C291 516 211 506 190 463Z"
        fill={`url(#${uid}-body)`}
        stroke="#F4F2EE"
        strokeOpacity="0.18"
        strokeWidth="1.5"
      />
      <path
        d="M207 473C233 500 290 513 382 506L522 492C560 486 581 463 581 430C532 467 414 488 286 470C250 465 225 456 207 473Z"
        fill={bodyDeep}
        fillOpacity="0.72"
      />
      <path
        d="M225 386C272 373 330 359 393 354L523 346"
        stroke={bodyLight}
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />
      <path
        d="M241 437C324 457 430 458 536 431"
        stroke="#F26522"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M238 441C322 461 427 462 533 435"
        stroke="#0D0F12"
        strokeOpacity="0.22"
        strokeWidth="1"
      />

      <g style={{ fontFamily: "var(--font-display), sans-serif" }}>
        <text
          x="324"
          y="409"
          fill="#F4F2EE"
          fillOpacity="0.9"
          fontSize="31"
          fontWeight="600"
          letterSpacing="-0.8"
        >
          QIMOV
        </text>
        <text
          x="326"
          y="426"
          fill="#F4F2EE"
          fillOpacity="0.32"
          fontSize="8"
          fontWeight="500"
          letterSpacing="0.8"
        >
          ELECTRIC MOBILITY
        </text>
      </g>

      <path
        d="M199 391C195 417 199 441 209 457L223 466C213 442 211 418 215 396Z"
        fill="#F26522"
        fillOpacity="0.9"
      />

      {/* Lanterna traseira */}
      <path
        d="M203 450C204 464 212 473 225 478"
        stroke="#FF5A2A"
        strokeWidth="6"
        strokeLinecap="round"
        filter={`url(#${uid}-glow)`}
        opacity="0.75"
      />

      {/* Assento */}
      <path
        d="M249 317C272 290 313 276 363 275H480C512 276 531 290 534 312C537 334 520 345 491 349L292 370C262 373 244 359 241 343C239 333 242 324 249 317Z"
        fill={`url(#${uid}-seat)`}
        stroke="#F4F2EE"
        strokeOpacity="0.13"
        strokeWidth="1.2"
      />
      <path
        d="M271 319C303 300 343 290 383 288L480 287"
        stroke="#F4F2EE"
        strokeOpacity="0.18"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M260 358C322 356 400 344 495 329"
        stroke="#F26522"
        strokeOpacity="0.55"
        strokeWidth="1"
      />
      <path
        d="M178 351C195 338 218 331 243 327"
        stroke={`url(#${uid}-metal)`}
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Plataforma / bateria */}
      <path
        d="M507 488L735 475L787 486C803 491 802 508 781 514L552 539C520 543 499 531 497 514C496 502 499 495 507 488Z"
        fill="#16191E"
        stroke="#F4F2EE"
        strokeOpacity="0.1"
      />
      <path
        d="M549 491L742 480L779 489C789 492 788 501 775 505L552 529C531 532 518 525 517 514C516 505 528 494 549 491Z"
        fill="#24282E"
      />
      <path
        d="M579 504L721 496"
        stroke="#F4F2EE"
        strokeOpacity="0.17"
        strokeWidth="2"
        strokeDasharray="20 6"
      />
      <path
        d="M622 512L753 501L764 508L758 517L631 528Z"
        fill="#0E1013"
        stroke={bodyBase}
        strokeOpacity="0.6"
        strokeWidth="1.3"
      />
      <g fill="#F26522" fillOpacity="0.8">
        <rect x="641" y="516" width="6" height="4" rx="1" />
        <rect x="657" y="515" width="6" height="4" rx="1" />
        <rect x="673" y="514" width="6" height="4" rx="1" />
        <rect x="689" y="513" width="6" height="4" rx="1" />
      </g>
      <path
        d="M505 535L472 586"
        stroke="#5B6269"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Escudo frontal */}
      <path
        d="M736 484C763 445 790 398 815 353L851 294C867 269 890 254 918 249H947C974 254 988 276 984 302C981 323 969 343 951 361L899 424L895 456C892 481 874 492 845 494L779 498C751 498 736 494 736 484Z"
        fill={`url(#${uid}-body-soft)`}
        stroke="#F4F2EE"
        strokeOpacity="0.18"
        strokeWidth="1.5"
      />
      <path
        d="M778 484L858 361C871 337 889 321 911 312C939 301 958 315 960 336C963 359 949 376 931 392L884 440L884 461C882 474 870 482 850 483Z"
        fill="#171A1F"
        fillOpacity="0.92"
      />
      <path
        d="M792 470L866 358C880 335 896 321 915 314"
        stroke="#F4F2EE"
        strokeOpacity="0.14"
        strokeWidth="1.2"
      />
      <path
        d="M820 482L888 397C911 369 934 347 955 335"
        stroke={bodyLight}
        strokeOpacity="0.24"
        strokeWidth="1.2"
      />

      {/* Farol */}
      <g>
        <path
          d="M921 281C942 279 958 291 959 309C960 327 946 340 925 340C911 340 901 331 898 317C895 301 904 288 921 281Z"
          fill="#F4F2EE"
        />
        <path
          d="M924 288C938 287 948 295 949 308C950 320 940 329 926 330C916 330 908 323 906 314C904 303 910 292 924 288Z"
          fill="#E8FBFF"
        />
        <ellipse
          cx="927"
          cy="309"
          rx="36"
          ry="43"
          fill="#B6F5FF"
          fillOpacity="0.18"
          filter={`url(#${uid}-glow)`}
        />
        <path
          d="M903 297C897 288 898 278 905 270"
          stroke="#F4F2EE"
          strokeOpacity="0.35"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* Coluna / guidão */}
      <path
        d="M940 268C940 242 942 219 947 198"
        stroke="#20242A"
        strokeWidth="19"
        strokeLinecap="round"
      />
      <path
        d="M946 199L1016 215"
        stroke="#1B1F24"
        strokeWidth="15"
        strokeLinecap="round"
      />
      <path
        d="M959 195L968 188"
        stroke="#E5E7EB"
        strokeWidth="2"
      />
      <path
        d="M1007 212L1027 217"
        stroke="#0D0F12"
        strokeWidth="17"
        strokeLinecap="round"
      />
      <path
        d="M1002 216L993 222"
        stroke={`url(#${uid}-metal)`}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Retrovisor */}
      <path
        d="M987 189L1010 143"
        stroke="#50565D"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <ellipse
        cx="1015"
        cy="133"
        rx="24"
        ry="13"
        transform="rotate(23 1015 133)"
        fill="#191C21"
        stroke="#858C93"
        strokeWidth="1.4"
      />
      <ellipse
        cx="1017"
        cy="131"
        rx="17"
        ry="8"
        transform="rotate(23 1017 131)"
        fill="#3D444B"
      />

      {/* Para-brisa */}
      <path
        d={isSport ? "M914 249L947 132C953 115 970 113 982 126L1022 187L979 254Z" : "M914 249L940 158C946 141 961 139 971 150L1001 196L975 253Z"}
        fill={isSport ? "rgba(13,15,18,0.72)" : `url(#${uid}-glass)`}
        stroke="#F4F2EE"
        strokeOpacity="0.18"
        strokeWidth="1.3"
      />

      {/* Detalhes esportivos / cargo */}
      {isSport ? (
        <g>
          <path
            d="M193 479C169 488 151 482 143 469C159 462 176 458 197 461Z"
            fill={bodyDeep}
            stroke="#F4F2EE"
            strokeOpacity="0.14"
          />
          <path
            d="M238 447C315 469 412 468 523 439"
            stroke="#F4F2EE"
            strokeOpacity="0.8"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M659 478L741 471"
            stroke="#F26522"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M877 456L900 423L923 450Z"
            fill={bodyDeep}
          />
        </g>
      ) : null}

      {isCargo ? (
        <g>
          <path
            d="M179 390L139 368"
            stroke="#7A8188"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M166 395L146 513"
            stroke="#5B6269"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M124 259C124 243 137 230 153 230H315C331 230 344 243 344 259V390C344 406 331 419 315 419H153C137 419 124 406 124 390V259Z"
            fill="#1A1E23"
            stroke="#F4F2EE"
            strokeOpacity="0.18"
            strokeWidth="1.5"
          />
          <path
            d="M124 254C124 240 135 229 149 229H319C333 229 344 240 344 254V287H124V254Z"
            fill={bodyBase}
          />
          <path
            d="M124 287H344"
            stroke="#0D0F12"
            strokeOpacity="0.35"
          />
          <path
            d="M165 291V418"
            stroke="#000000"
            strokeOpacity="0.3"
          />
          <path
            d="M303 291V418"
            stroke="#000000"
            strokeOpacity="0.3"
          />
          <rect
            x="138"
            y="302"
            width="192"
            height="76"
            rx="4"
            fill={`url(#${uid}-body)`}
            fillOpacity="0.22"
            stroke="#F4F2EE"
            strokeOpacity="0.1"
          />
          <g style={{ fontFamily: "var(--font-display), sans-serif" }}>
            <text
              x="158"
              y="341"
              fill="#F4F2EE"
              fillOpacity="0.8"
              fontSize="25"
              fontWeight="600"
              letterSpacing="-0.6"
            >
              QIMOV
            </text>
            <text
              x="159"
              y="360"
              fill="#F4F2EE"
              fillOpacity="0.35"
              fontSize="8"
              letterSpacing="0.8"
            >
              CARGO SYSTEM
            </text>
          </g>
          <path
            d="M138 402H330"
            stroke="#F26522"
            strokeWidth="4"
            strokeDasharray="18 7"
            strokeOpacity="0.75"
          />
          <circle cx="151" cy="412" r="3" fill="#F26522" />
          <circle cx="317" cy="412" r="3" fill="#F26522" />
          <path
            d="M136 365H331"
            stroke="#F4F2EE"
            strokeOpacity="0.08"
            strokeDasharray="3 5"
          />
        </g>
      ) : null}

      {/* Pequenos detalhes e reflexos */}
      <path
        d="M832 323C817 355 799 388 777 420"
        stroke="#F4F2EE"
        strokeOpacity="0.22"
        strokeWidth="1.2"
      />
      <path
        d="M895 424L900 423L901 456"
        stroke="#F26522"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="947" cy="248" r="3" fill="#F26522" />
      <circle cx="755" cy="480" r="2.5" fill="#F4F2EE" fillOpacity="0.4" />

      <g
        fontFamily="var(--font-jetbrains), monospace"
        fill="#F4F2EE"
        fillOpacity="0.24"
        fontSize="8"
        letterSpacing="0.6"
      >
        <text x="90" y="710">
          QIMOV / 2026
        </text>
        <text x="1010" y="710" textAnchor="end">
          {isSport ? "SPORT" : isCargo ? "CARGO" : "URBAN"} / EV
        </text>
        <text x="600" y="734" textAnchor="middle" opacity="0.5">
          ENERGIA EM MOVIMENTO — TERESINA, PI
        </text>
      </g>
    </svg>
  );
}

type WheelProps = {
  cx: number;
  cy: number;
  uid: string;
  variant: ScooterVariant;
  isFront: boolean;
  bodyBase: string;
};

function Wheel({ cx, cy, uid, variant, isFront, bodyBase }: WheelProps) {
  const spokeCount = variant === "sport" ? 7 : 6;
  const radius = 114;

  return (
    <g className="wheel-art">
      <circle cx={cx} cy={cy} r={radius} fill="#0A0C0E" />
      <circle
        cx={cx}
        cy={cy}
        r={radius - 4}
        stroke="#2C3137"
        strokeWidth="2"
        strokeDasharray="3 6"
      />
      <circle cx={cx} cy={cy} r={97} fill="#15181C" />
      <circle
        cx={cx}
        cy={cy}
        r={89}
        fill="none"
        stroke={`url(#${uid}-rim)`}
        strokeWidth="15"
      />
      <circle
        cx={cx}
        cy={cy}
        r={79}
        fill="none"
        stroke="#0D0F12"
        strokeWidth="2"
        opacity="0.6"
      />

      {Array.from({ length: spokeCount }).map((_, index) => {
        const angle = (360 / spokeCount) * index;
        const accent = variant === "sport" && index === 0;
        return (
          <g key={angle} transform={`rotate(${angle} ${cx} ${cy})`}>
            <line
              x1={cx}
              y1={cy - 20}
              x2={cx - 10}
              y2={cy - 76}
              stroke={accent ? bodyBase : "#6C737A"}
              strokeWidth={accent ? 10 : 8}
              strokeLinecap="round"
            />
            <line
              x1={cx + 7}
              y1={cy - 22}
              x2={cx + 14}
              y2={cy - 70}
              stroke="#C0C5C9"
              strokeOpacity="0.55"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        );
      })}

      <circle
        cx={cx}
        cy={cy}
        r={isFront ? 57 : 51}
        stroke="#80878E"
        strokeOpacity={isFront ? "0.9" : "0.42"}
        strokeWidth={isFront ? 8 : 4}
        strokeDasharray={isFront ? "5 4" : undefined}
      />
      <circle
        cx={cx}
        cy={cy}
        r={36}
        fill="#2C3137"
        stroke="#92999F"
        strokeWidth="2"
      />
      <circle
        cx={cx}
        cy={cy}
        r={17}
        fill="#0D0F12"
        stroke="#5A6168"
        strokeWidth="2"
      />
      <circle cx={cx} cy={cy} r={5} fill="#F26522" />

      <path
        d={`M ${cx - 85} ${cy - 48} A 97 97 0 0 1 ${cx - 15} ${cy - 96}`}
        stroke="#F4F2EE"
        strokeOpacity="0.22"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d={`M ${cx + 24} ${cy + 94} A 97 97 0 0 0 ${cx + 91} ${cy + 30}`}
        stroke="#F4F2EE"
        strokeOpacity="0.08"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {isFront ? (
        <g>
          <path
            d={`M ${cx + 24} ${cy - 45} A 52 52 0 0 1 ${cx + 52} ${cy - 3}`}
            stroke="#F26522"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <circle cx={cx + 54} cy={cy - 2} r={5} fill="#F26522" />
        </g>
      ) : null}
    </g>
  );
}
