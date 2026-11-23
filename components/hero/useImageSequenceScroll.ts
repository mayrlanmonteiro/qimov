"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { clamp } from "@/lib/utils";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CONFIGURAÇÃO DA SEQUÊNCIA — altere somente este bloco ao trocar o material.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * O padrão atual corresponde à sequência de 120 frames WebP otimizados em
 * /public/hero-sequence. Para novos vídeos, exporte os frames com 4 dígitos,
 * ajuste TOTAL_FRAMES / extension e mantenha a proporção próxima de 16:9.
 */
export const HERO_SEQUENCE = {
  totalFrames: 120,
  directory: "/hero-sequence",
  prefix: "frame_",
  pad: 4,
  extension: "webp",
  firstBatchRatio: 0.25,
  maxConcurrent: 6,
  lerp: 0.1,
} as const;

const MAX_LOADER_WAIT = 12_000;
const MIN_LOADER_TIME = 1_050;

function frameSource(index: number) {
  const number = String(index + 1).padStart(HERO_SEQUENCE.pad, "0");
  return `${HERO_SEQUENCE.directory}/${HERO_SEQUENCE.prefix}${number}.${HERO_SEQUENCE.extension}`;
}

type UseImageSequenceScrollOptions = {
  containerRef: RefObject<HTMLElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  onProgress?: (progress: number) => void;
};

type UseImageSequenceScrollReturn = {
  isReady: boolean;
  loadProgress: number;
  totalFrames: number;
};

/**
 * Motor do scroll-scrubbing cinematográfico.
 *
 * Fluxo:
 * 1. Carrega 25% dos frames de forma prioritária, com progresso visível.
 * 2. Libera a hero e continua o restante em segundo plano.
 * 3. Converte o scroll do container em progresso 0→1 com interpolação lerp.
 * 4. Desenha o frame em canvas com cobertura responsiva e fallback procedural.
 */
export function useImageSequenceScroll({
  containerRef,
  canvasRef,
  onProgress,
}: UseImageSequenceScrollOptions): UseImageSequenceScrollReturn {
  const [isReady, setIsReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const onProgressRef = useRef(onProgress);

  onProgressRef.current = onProgress;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    let cancelled = false;
    let released = false;
    let firstBatchDone = false;
    let rafId: number | null = null;
    let frameIndex = -1;
    let currentProgress = 0;
    let targetProgress = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let kickRender: (() => void) | null = null;

    const startedAt = performance.now();
    const loadedImages: Array<HTMLImageElement | null> = Array.from(
      { length: HERO_SEQUENCE.totalFrames },
      () => null,
    );
    const inFlight = new Set<HTMLImageElement>();
    let totalLoaded = 0;

    const firstBatchCount = Math.ceil(
      HERO_SEQUENCE.totalFrames * HERO_SEQUENCE.firstBatchRatio,
    );
    let firstBatchLoaded = 0;
    let releaseTimer: number | undefined;
    let waitTimer: number | undefined;

    const loadFrame = (index: number) =>
      new Promise<boolean>((resolve) => {
        if (cancelled) {
          resolve(false);
          return;
        }

        const image = new Image();
        image.decoding = "async";
        inFlight.add(image);

        const settle = (success: boolean) => {
          inFlight.delete(image);

          if (success && !cancelled) {
            loadedImages[index] = image;
            totalLoaded += 1;
            // Antes da liberação, atualiza o canvas assim que o primeiro frame
            // fica pronto (substitui o fallback sem exigir interação).
            if (!released) kickRender?.();
          }

          resolve(success);
        };

        image.onload = () => settle(true);
        image.onerror = () => settle(false);
        image.src = frameSource(index);
      });

    /** Pool de concorrência controlada para não saturar a rede mobile. */
    const loadPool = async (indices: number[], onEach?: () => void) => {
      let cursor = 0;

      const worker = async () => {
        while (!cancelled) {
          const index = indices[cursor];
          cursor += 1;

          if (index === undefined) return;

          await loadFrame(index);
          if (cancelled) return;
          onEach?.();
        }
      };

      await Promise.all(
        Array.from(
          { length: Math.min(HERO_SEQUENCE.maxConcurrent, indices.length) },
          () => worker(),
        ),
      );
    };

    const releaseExperience = () => {
      if (released || cancelled) return;
      released = true;
      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, MIN_LOADER_TIME - elapsed);

      releaseTimer = window.setTimeout(() => {
        if (!cancelled) setIsReady(true);
      }, remaining);
    };

    const firstIndices = Array.from(
      { length: firstBatchCount },
      (_, index) => index,
    );
    const remainingIndices = Array.from(
      { length: HERO_SEQUENCE.totalFrames - firstBatchCount },
      (_, index) => index + firstBatchCount,
    );

    const start = async () => {
      await loadPool(firstIndices, () => {
        firstBatchLoaded += 1;
        setLoadProgress(
          Math.round((firstBatchLoaded / firstBatchCount) * 100),
        );
      });

      if (cancelled || firstBatchDone) return;
      firstBatchDone = true;
      setLoadProgress(100);
      releaseExperience();

      // Carrega o restante sem bloquear a experiência.
      void loadPool(remainingIndices);
    };

    waitTimer = window.setTimeout(() => {
      if (cancelled || firstBatchDone) return;
      firstBatchDone = true;
      setLoadProgress(100);
      releaseExperience();
      void loadPool(remainingIndices);
    }, MAX_LOADER_WAIT);

    void start();

    /* ───────────────────────── Canvas / scroll engine ───────────────────── */

    const drawProceduralFallback = (progress: number) => {
      const ctx = context;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const background = ctx.createLinearGradient(0, 0, width, height);
      background.addColorStop(0, "#0a0c0f");
      background.addColorStop(0.55, "#101d28");
      background.addColorStop(1, "#0d0f12");
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.46;
      const minSide = Math.min(width, height);

      const halo = ctx.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        minSide * 0.68,
      );
      halo.addColorStop(0, "rgba(35, 178, 220, 0.2)");
      halo.addColorStop(0.45, "rgba(24, 96, 128, 0.08)");
      halo.addColorStop(1, "rgba(13, 15, 18, 0)");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.globalCompositeOperation = "screen";

      const rotation = progress * Math.PI * 1.7 - Math.PI / 2;
      const rings = [
        {
          radius: minSide * 0.245,
          width: 1.1,
          alpha: 0.7,
          color: "#9ce9ff",
        },
        {
          radius: minSide * 0.31,
          width: 0.7,
          alpha: 0.24,
          color: "#73bdd4",
        },
        {
          radius: minSide * 0.39,
          width: 0.5,
          alpha: 0.14,
          color: "#f26522",
        },
      ];

      rings.forEach((ring, index) => {
        ctx.beginPath();
        ctx.strokeStyle = ring.color;
        ctx.globalAlpha = ring.alpha;
        ctx.lineWidth = ring.width;
        ctx.arc(
          0,
          0,
          ring.radius,
          rotation + index * 0.6,
          rotation + Math.PI * (1.12 + index * 0.15),
        );
        ctx.stroke();
      });

      ctx.globalAlpha = 1;
      for (let index = 0; index < 34; index += 1) {
        const angle =
          index * 2.399 + progress * (1.4 + (index % 5) * 0.12);
        const radius =
          minSide * (0.18 + (((index * 37) % 100) / 100) * 0.27);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * 0.72;
        const radiusDot = 0.5 + (index % 4) * 0.36;

        ctx.beginPath();
        ctx.fillStyle =
          index % 7 === 0
            ? "rgba(242,101,34,0.85)"
            : "rgba(166,231,250,0.6)";
        ctx.arc(x, y, radiusDot, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
    };

    const findRenderableFrame = (index: number) => {
      const direct = loadedImages[index];
      if (direct?.complete && direct.naturalWidth > 0) return direct;

      // Durante o carregamento progressivo, usa o frame carregado mais próximo.
      for (
        let distance = 1;
        distance < HERO_SEQUENCE.totalFrames;
        distance += 1
      ) {
        const previous = loadedImages[index - distance];
        if (previous?.complete && previous.naturalWidth > 0) return previous;

        const next = loadedImages[index + distance];
        if (next?.complete && next.naturalWidth > 0) return next;
      }

      return null;
    };

    const drawFrame = (progress: number) => {
      const ctx = context;
      const index = Math.round(
        progress * (HERO_SEQUENCE.totalFrames - 1),
      );
      const image = findRenderableFrame(index);

      frameIndex = index;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = "#0d0f12";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!image) {
        drawProceduralFallback(progress);
        return;
      }

      const portrait = height > width * 0.92;
      const scale = portrait
        ? Math.min(
            width / image.naturalWidth,
            height / image.naturalHeight,
          ) * 1.06
        : Math.max(
            width / image.naturalWidth,
            height / image.naturalHeight,
          ) * 1.025;

      if (portrait) {
        // Em telas verticais, preenche as bordas com o próprio frame desfocado
        // para preservar a composição central do logotipo.
        ctx.save();
        ctx.globalAlpha = 0.42;
        const coverScale = Math.max(
          width / image.naturalWidth,
          height / image.naturalHeight,
        );
        ctx.filter = "blur(24px)";
        ctx.drawImage(
          image,
          (width - image.naturalWidth * coverScale) / 2,
          (height - image.naturalHeight * coverScale) / 2,
          image.naturalWidth * coverScale,
          image.naturalHeight * coverScale,
        );
        ctx.filter = "none";
        ctx.restore();
        ctx.fillStyle = "rgba(13, 15, 18, 0.3)";
        ctx.fillRect(0, 0, width, height);
      }

      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      const drawX = (width - drawWidth) / 2;
      const drawY = (height - drawHeight) / 2;

      ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);

      if (portrait) {
        // Dissolve as bordas superior e inferior do frame no fundo escuro,
        // evitando uma emenda dura entre a imagem e o letterbox.
        const fadeTop = drawY - 12;
        const fadeBottom = drawY + drawHeight + 12;
        const fade = ctx.createLinearGradient(0, fadeTop, 0, fadeBottom);
        fade.addColorStop(0, "rgba(13, 15, 18, 0.94)");
        fade.addColorStop(0.12, "rgba(13, 15, 18, 0.12)");
        fade.addColorStop(0.88, "rgba(13, 15, 18, 0.12)");
        fade.addColorStop(1, "rgba(13, 15, 18, 0.94)");
        ctx.fillStyle = fade;
        ctx.fillRect(0, fadeTop, width, fadeBottom - fadeTop);
      }
    };

    const tick = () => {
      rafId = null;
      const distance = targetProgress - currentProgress;

      if (Math.abs(distance) < 0.00006) {
        currentProgress = targetProgress;
      } else {
        currentProgress += distance * HERO_SEQUENCE.lerp;
      }

      const nextFrameIndex = Math.round(
        currentProgress * (HERO_SEQUENCE.totalFrames - 1),
      );
      const settled = Math.abs(targetProgress - currentProgress) <= 0.00006;

      if (nextFrameIndex !== frameIndex || settled) {
        onProgressRef.current?.(currentProgress);
        drawFrame(currentProgress);
      }

      if (!settled) {
        rafId = requestAnimationFrame(tick);
      } else {
        currentProgress = targetProgress;
        onProgressRef.current?.(currentProgress);
      }
    };

    const requestTick = () => {
      if (rafId === null) rafId = requestAnimationFrame(tick);
    };

    kickRender = () => {
      if (released) return;
      frameIndex = -1;
      requestTick();
    };

    const updateTarget = () => {
      const rect = container.getBoundingClientRect();
      const scrollable = container.offsetHeight - window.innerHeight;
      targetProgress =
        scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0;
      requestTick();
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      frameIndex = -1;
      drawFrame(currentProgress);
      onProgressRef.current?.(currentProgress);
    };

    // Primeiro desenho imediato com fallback ou frame em cache.
    resize();
    updateTarget();

    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", resize);
    window.addEventListener("orientationchange", resize);
    document.addEventListener("visibilitychange", updateTarget);

    return () => {
      cancelled = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.clearTimeout(waitTimer);
      window.clearTimeout(releaseTimer);
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", resize);
      window.removeEventListener("orientationchange", resize);
      document.removeEventListener("visibilitychange", updateTarget);

      inFlight.forEach((image) => {
        image.onload = null;
        image.onerror = null;
        image.src = "";
      });
      inFlight.clear();
      loadedImages.fill(null);
      totalLoaded = 0;
    };
  }, [canvasRef, containerRef]);

  return {
    isReady,
    loadProgress,
    totalFrames: HERO_SEQUENCE.totalFrames,
  };
}
