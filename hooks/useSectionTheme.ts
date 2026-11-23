"use client";

import {
  useEffect,
  useSyncExternalStore,
  type RefObject,
} from "react";
import { CHAPTERS } from "@/lib/site";

export type SectionTheme = "dark" | "light";

type ScrollSnapshot = {
  theme: SectionTheme;
  scrolled: boolean;
  activeChapter: number;
};

type ProgressListener = (progress: number) => void;
type SnapshotListener = () => void;

const INITIAL_SNAPSHOT: ScrollSnapshot = {
  theme: "dark",
  scrolled: false,
  activeChapter: 0,
};

let snapshot = INITIAL_SNAPSHOT;
let progress = 0;
let frame: number | null = null;
let running = false;

const snapshotListeners = new Set<SnapshotListener>();
const progressListeners = new Set<ProgressListener>();

let sections: HTMLElement[] = [];
let chapters: Array<HTMLElement | null> = [];
let teardown: (() => void) | null = null;

function schedule() {
  if (frame !== null) return;
  frame = requestAnimationFrame(update);
}

function update() {
  frame = null;

  const scrollY = window.scrollY;
  const viewport = window.innerHeight;
  const chapterProbe = viewport * 0.38;
  const navProbe = 100;

  let theme: SectionTheme = "dark";

  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    if (rect.top > navProbe) break;
    theme = section.dataset.navTheme === "light" ? "light" : "dark";
  }

  let activeChapter = 0;

  for (let index = 0; index < chapters.length; index += 1) {
    const chapter = chapters[index];
    if (chapter && chapter.getBoundingClientRect().top <= chapterProbe) {
      activeChapter = index;
    }
  }

  const scrollable = document.documentElement.scrollHeight - viewport;
  const nextProgress =
    scrollable > 0 ? Math.min(Math.max(scrollY / scrollable, 0), 1) : 0;

  progress = nextProgress;
  for (const listener of progressListeners) listener(nextProgress);

  const scrolled = scrollY > 24;

  if (
    theme !== snapshot.theme ||
    scrolled !== snapshot.scrolled ||
    activeChapter !== snapshot.activeChapter
  ) {
    snapshot = { theme, scrolled, activeChapter };
    for (const listener of snapshotListeners) listener();
  }
}

function start() {
  if (running || typeof window === "undefined") return;
  running = true;

  sections = Array.from(
    document.querySelectorAll<HTMLElement>("[data-nav-theme]"),
  );
  chapters = CHAPTERS.map((chapter) =>
    document.getElementById(chapter.href.replace("#", "")),
  );

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  window.addEventListener("orientationchange", schedule);

  let resizeObserver: ResizeObserver | null = null;

  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(document.body);
  }

  document.fonts?.ready.then(schedule).catch(() => undefined);
  schedule();

  teardown = () => {
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    window.removeEventListener("orientationchange", schedule);
    resizeObserver?.disconnect();
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
  };
}

function stop() {
  if (!running) return;
  running = false;
  teardown?.();
  teardown = null;
  sections = [];
  chapters = [];
}

function subscribeSnapshot(listener: SnapshotListener) {
  snapshotListeners.add(listener);
  start();

  return () => {
    snapshotListeners.delete(listener);
    if (snapshotListeners.size === 0 && progressListeners.size === 0) stop();
  };
}

function subscribeProgress(listener: ProgressListener) {
  progressListeners.add(listener);
  start();
  listener(progress);

  return () => {
    progressListeners.delete(listener);
    if (snapshotListeners.size === 0 && progressListeners.size === 0) stop();
  };
}

/**
 * Estado de navegação compartilhado por Navbar e ChapterRail.
 *
 * Um único listener de scroll abastece todos os componentes — antes cada
 * instância abria seu próprio loop de requestAnimationFrame e lia o layout
 * repetidamente.
 */
export function useSectionTheme(): ScrollSnapshot {
  return useSyncExternalStore(
    subscribeSnapshot,
    () => snapshot,
    () => INITIAL_SNAPSHOT,
  );
}

/** Atualiza uma barra de progresso diretamente no DOM, sem re-renderizar. */
export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    return subscribeProgress((value) => {
      element.style.transform = `scaleY(${value})`;
    });
  }, [ref]);
}
