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
  "qimov-qa-2",
);
fs.mkdirSync(OUT, { recursive: true });

const executablePath =
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browser = await chromium.launch({
  executablePath,
  headless: true,
  args: ["--force-color-profile=srgb", "--hide-scrollbars"],
});
const errors = [];

async function newPage(width, height) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(String(error)));
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page
    .waitForSelector('[aria-label="Carregando a experiência QIMOV"]', {
      state: "detached",
      timeout: 30000,
    })
    .catch(() => {});
  await page.waitForTimeout(1000);
  return page;
}

async function shot(page, name) {
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(OUT, `${name}.png`) });
  console.log(`saved ${name}`);
}

async function scrollTo(page, y) {
  await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
  await page.waitForTimeout(1000);
}

async function sectionTop(page, id) {
  return page.evaluate(
    (sectionId) =>
      (document.getElementById(sectionId)?.getBoundingClientRect().top ?? 0) +
      window.scrollY,
    id,
  );
}

// ─── Desktop ────────────────────────────────────────────────────────────────
const desktop = await newPage(1440, 900);
await shot(desktop, "desktop-hero");

const showcaseTop = await sectionTop(desktop, "destaques");
await scrollTo(desktop, showcaseTop + 120);
await shot(desktop, "desktop-showcase-rail");

const catalogTop = await sectionTop(desktop, "catalogo");
await scrollTo(desktop, catalogTop + 60);
await desktop.getByRole("button", { name: /Sem CNH/i }).click();
await desktop.waitForTimeout(700);
const filteredCount = await desktop.locator("#catalogo article").count();
await shot(desktop, "desktop-catalog-filtered");
await desktop.getByRole("button", { name: /^Todos/ }).click();
await desktop.waitForTimeout(600);

await scrollTo(desktop, catalogTop + 700);
await desktop.getByRole("button", { name: /Ver detalhes do QIMOV/i }).first().click();
await desktop.waitForTimeout(900);
await shot(desktop, "desktop-drawer-open");
await desktop.getByRole("button", { name: /Selecionar Laranja/i }).click();
await desktop.waitForTimeout(400);
const drawerWa = await desktop
  .getByRole("link", { name: /Reservar no WhatsApp/i })
  .first()
  .getAttribute("href");
await desktop.locator('[role="dialog"] [data-lenis-prevent]').evaluate((el) => {
  el.scrollTop = el.scrollHeight;
});
await shot(desktop, "desktop-drawer-bottom");
await desktop.keyboard.press("Escape");
await desktop.waitForTimeout(700);

// Comparator interaction
const comparatorTop = await sectionTop(desktop, "comparador");
await scrollTo(desktop, comparatorTop + 300);
const selects = desktop.locator('select[aria-label^="Selecionar modelo"]');
await selects.first().selectOption("titan-x");
await desktop.waitForTimeout(600);
await shot(desktop, "desktop-comparator-titan");

// Savings interaction
const economyTop = await sectionTop(desktop, "economia");
await scrollTo(desktop, economyTop + 260);
await desktop.getByRole("button", { name: /Zona Norte/i }).click();
await desktop.waitForTimeout(500);
const savingsText = await desktop
  .locator("#economia")
  .getByText(/Economia mensal/i)
  .locator("..")
  .innerText()
  .catch(() => "");
await shot(desktop, "desktop-savings-route");

// Showroom form flow
const showroomTop = await sectionTop(desktop, "showroom");
await scrollTo(desktop, showroomTop + 140);
await desktop.locator("#test-name").fill("Mayrlan Carlos");
await desktop.locator("#test-phone").fill("86999998888");
await desktop.locator("#test-model").selectOption("QIMOV Urban One");
await desktop.getByRole("radio", { name: /Manhã/i }).click();
await desktop.getByRole("button", { name: /Agendar meu test ride/i }).click();
await desktop.waitForTimeout(1200);
await shot(desktop, "desktop-form-success");
const successWa = await desktop
  .getByRole("link", { name: /Confirmar no WhatsApp/i })
  .getAttribute("href");
await desktop.getByRole("button", { name: /Agendar outro test ride/i }).click();
await desktop.waitForTimeout(500);

console.log(
  JSON.stringify(
    {
      filteredCount,
      drawerWa: drawerWa?.slice(0, 120),
      successWa: successWa?.slice(0, 220),
      savingsText,
    },
    null,
    2,
  ),
);

// ─── Mobile ────────────────────────────────────────────────────────────────
const mobile = await newPage(390, 844);
const mobileHeroHeight = await mobile.evaluate(
  () => document.getElementById("inicio")?.getBoundingClientRect().height ?? 0,
);
for (const ratio of [0.35, 0.55, 0.8]) {
  await scrollTo(mobile, mobileHeroHeight * ratio);
  await shot(mobile, `mobile-hero-${Math.round(ratio * 100)}`);
}

await scrollTo(mobile, 0);
await mobile.getByRole("button", { name: /Abrir menu/i }).click();
await shot(mobile, "mobile-menu");
await mobile.getByRole("button", { name: /Fechar menu/i }).click();
await mobile.waitForTimeout(700);

const mobileCatalogTop = await sectionTop(mobile, "catalogo");
await scrollTo(mobile, mobileCatalogTop + 430);
await shot(mobile, "mobile-catalog-card");
await mobile.getByRole("button", { name: /Ver detalhes do QIMOV/i }).first().click();
await mobile.waitForTimeout(900);
await shot(mobile, "mobile-drawer");
await mobile.locator('[role="dialog"] [data-lenis-prevent]').evaluate((el) => {
  el.scrollTop = el.scrollHeight;
});
await shot(mobile, "mobile-drawer-bottom");
await mobile.keyboard.press("Escape");
await mobile.waitForTimeout(700);

const mobileShowroomTop = await sectionTop(mobile, "showroom");
await scrollTo(mobile, mobileShowroomTop + 700);
await shot(mobile, "mobile-showroom-cta");
await mobile
  .locator("#showroom")
  .getByRole("link", { name: /Agendar test ride/i })
  .first()
  .click();
await mobile.waitForTimeout(1300);
await shot(mobile, "mobile-form");

// ─── Small mobile nav ─────────────────────────────────────────────────────
const small = await newPage(320, 700);
await shot(small, "mobile-320-hero");

console.log("CONSOLE ERRORS:", JSON.stringify(errors, null, 2));
console.log("OUT", OUT);
await browser.close();
