/**
 * Renders PNG email signatures from public/email-signatures/signatures.html
 * Run: node scripts/render-email-signatures.mjs
 * Requires: npx playwright install chromium (once)
 */
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const htmlPath = path.join(root, 'public', 'email-signatures', 'signatures.html');
const outDir = path.join(root, 'public', 'email-signatures', 'png');

if (!fs.existsSync(htmlPath)) {
  console.error('Missing:', htmlPath);
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

const fileUrl = `file://${htmlPath}`;

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 2 });

await page.goto(fileUrl, { waitUntil: 'networkidle' });

const ids = [
  { id: 'sig-hassan', file: 'signature-hassan-lajhad.png' },
  { id: 'sig-rachid', file: 'signature-rachid-azrou.png' },
  { id: 'sig-jawad', file: 'signature-jawad-el-khalki.png' },
];

for (const { id, file } of ids) {
  const loc = page.locator(`#${id}`);
  await loc.screenshot({ path: path.join(outDir, file), type: 'png' });
  console.log('Wrote', path.join(outDir, file));
}

await browser.close();
