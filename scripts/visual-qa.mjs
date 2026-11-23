import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

const OUT = path.join(
  "C:",
  "Users",
  "Mayrlan Carlos",
  "AppData",
  "Local",
  "Temp",
  "opencode",
  "qimov-qa",
);
fs.mkdirSync(OUT, { recursive: true });

const executablePath =
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const browser = await chromium.launch({
  executablePath,
  headless: true,
  args: ["--force-color-profile=srgb", "--hide-scrollbars"],
});

const consoleErrors = [];

async function newPage(width, height) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(String(error)));
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page
    .waitForSelector('[aria-label="Carregando a experiência QIMOV"]', {
      state: "detached",
      timeout: 30000,
    })
    .catch(() => {});
  await page.waitForTimeout(1200);
  return page;
}

async function shot(page, name) {
  await page.waitForTimeout(900);
  await page.screenshot({ path: path.join(OUT, `${name}.png`) });
  console.log(`saved ${name}.png`);
}

async function scrollTo(page, y) {
  await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
  await page.waitForTimeout(1200);
}

const desktop = await newPage(1440, 900);
await shot(desktop, "desktop-hero-00");

const metrics = await desktop.evaluate(() => {
  const hero = document.querySelector("#inicio");
  const ids = [
    "inicio",
    "destaques",
    "catalogo",
    "comparador",
    "economia",
    "showroom",
  ];
  return {
    heroHeight: hero?.getBoundingClientRect().height ?? 0,
    sections: Object.fromEntries(
      ids.map((id) => [
        id,
        (document.getElementById(id)?.getBoundingClientRect().top ?? 0) +
          window.scrollY,
      ]),
    ),
    docHeight: document.documentElement.scrollHeight,
  };
});
console.log(JSON.stringify(metrics, null, 2));

for (const ratio of [0.3, 0.5, 0.72, 0.9]) {
  await scrollTo(desktop, metrics.heroHeight * ratio);
  await shot(desktop, `desktop-hero-${String(ratio * 100).padStart(2, "0")}`);
}

for (const id of ["destaques", "catalogo", "comparador", "economia", "showroom"]) {
  await scrollTo(desktop, metrics.sections[id] - 20);
  await shot(desktop, `desktop-${id}`);
}

await scrollTo(desktop, metrics.docHeight - 900);
await shot(desktop, "desktop-footer");

// Open product drawer
await scrollTo(desktop, metrics.sections.catalogo + 700);
const detailButtons = desktop.locator('button:has-text("Ver detalhes")');
if ((await detailButtons.count()) > 0) {
  await detailButtons.first().click();
  await desktop.waitForTimeout(900);
  await shot(desktop, "desktop-drawer");
  await desktop.keyboard.press("Escape");
  await desktop.waitForTimeout(600);
}

// Mobile pass
const mobile = await newPage(390, 844);
await shot(mobile, "mobile-hero-00");
const mobileMetrics = await mobile.evaluate(() => {
  const hero = document.querySelector("#inicio");
  const ids = [
    "inicio",
    "destaques",
    "catalogo",
    "comparador",
    "economia",
    "showroom",
  ];
  return {
    heroHeight: hero?.getBoundingClientRect().height ?? 0,
    sections: Object.fromEntries(
      ids.map((id) => [
        id,
        (document.getElementById(id)?.getBoundingClientRect().top ?? 0) +
          window.scrollY,
      ]),
    ),
    docHeight: document.documentElement.scrollHeight,
  };
});
for (const ratio of [0.35, 0.55, 0.8]) {
  await scrollTo(mobile, mobileMetrics.heroHeight * ratio);
  await shot(mobile, `mobile-hero-${String(ratio * 100).padStart(2, "0")}`);
}
for (const id of ["destaques", "catalogo", "comparador", "economia", "showroom"]) {
  await scrollTo(mobile, mobileMetrics.sections[id] - 10);
  await shot(mobile, `mobile-${id}`);
}

console.log("CONSOLE ERRORS:", JSON.stringify(consoleErrors, null, 2));
console.log("OUT", OUT);
await browser.close();
