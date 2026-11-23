"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";

type SmoothScrollContextValue = {
  lenis: Lenis | null;
  stop: () => void;
  start: () => void;
  reducedMotion: boolean;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  stop: () => undefined,
  start: () => undefined,
  reducedMotion: false,
});

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: fine)");
    setReducedMotion(motionQuery.matches);

    let instance: Lenis | null = null;
    let rafId = 0;

    /*
     * Em telas de toque o scroll nativo é mais fluido (e mais econômico)
     * do que qualquer camada de smooth scroll. O Lenis fica restrito a
     * ponteiros finos, onde o wheel ganha de verdade com a suavização.
     */
    if (pointerQuery.matches && !motionQuery.matches) {
      instance = new Lenis({
        lerp: 0.09,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.92,
        touchMultiplier: 1.4,
        anchors: false,
      });

      setLenis(instance);

      const loop = (time: number) => {
        instance?.raf(time);
        rafId = requestAnimationFrame(loop);
      };

      rafId = requestAnimationFrame(loop);
    }

    const onAnchorClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');

      if (!anchor || anchor.dataset.noLenis !== undefined) return;

      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;

      const destination = document.querySelector<HTMLElement>(hash);
      if (!destination) return;

      event.preventDefault();

      if (instance) {
        instance.scrollTo(destination, {
          offset: -72,
          duration: 1.2,
          easing: easeOutCubic,
        });
      } else {
        destination.scrollIntoView({
          behavior: motionQuery.matches ? "auto" : "smooth",
          block: "start",
        });
      }

      window.history.pushState(null, "", hash);
    };

    document.addEventListener("click", onAnchorClick);

    const onMotionChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      motionQuery.removeEventListener("change", onMotionChange);
      cancelAnimationFrame(rafId);
      instance?.destroy();
      setLenis(null);
    };
  }, []);

  const stop = useCallback(() => {
    lenis?.stop();
  }, [lenis]);

  const start = useCallback(() => {
    lenis?.start();
  }, [lenis]);

  const value = useMemo(
    () => ({ lenis, stop, start, reducedMotion }),
    [lenis, stop, start, reducedMotion],
  );

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

let lockCount = 0;
let savedOverflow = "";

export function useScrollLock(locked: boolean) {
  const { lenis } = useSmoothScroll();

  useEffect(() => {
    if (!locked) return;

    if (lockCount === 0) {
      savedOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }

    lockCount += 1;
    lenis?.stop();

    return () => {
      lockCount = Math.max(0, lockCount - 1);

      if (lockCount === 0) {
        document.body.style.overflow = savedOverflow;
        lenis?.start();
      }
    };
  }, [lenis, locked]);
}
