/**
 * Renders public/branding/elaz-logo-lockup.html to PNG (transparent background).
 * Requires: network (Google Fonts), Playwright browser binaries.
 */
import { chromium } from "playwright";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const htmlPath = path.join(root, "public/branding/elaz-logo-lockup.html");
const outPath = path.join(root, "public/branding/elaz-group-logo.png");

const fileUrl = `file://${htmlPath}`;

const browser = await chromium.launch();
const context = await browser.newContext({
  deviceScaleFactor: 2,
  viewport: { width: 1400, height: 600 },
});
const page = await context.newPage();
await page.goto(fileUrl, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);

const box = await page.locator("#capture").boundingBox();
if (!box) {
  await browser.close();
  throw new Error("#capture bounding box not found");
}

const pad = 2;
await page.screenshot({
  path: outPath,
  clip: {
    x: box.x - pad,
    y: box.y - pad,
    width: box.width + pad * 2,
    height: box.height + pad * 2,
  },
  omitBackground: true,
});

await browser.close();

const stat = fs.statSync(outPath);
console.log(`Wrote ${path.relative(root, outPath)} (${stat.size} bytes)`);
