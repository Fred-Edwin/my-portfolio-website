/**
 * make-og.mjs — generate the Open Graph / social share card (1200×630).
 *
 * Built from the site's own design tokens: warm bone paper, Fraunces serif,
 * the hand-drawn ink-blue circle around "joy" (same path as InkStroke.astro),
 * scarce ink-blue accent. Fonts are embedded so the PNG renders true Fraunces
 * regardless of the host's installed fonts.
 *
 * Run:  node scripts/make-og.mjs
 * Out:  public/og-image.png  (+ public/og-image.svg source)
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// --- tokens (kept in sync with src/styles/tokens.css) ---------------------
const PAPER = "#f6f2e9";
const INK = "#1a1814";
const INK_BLUE = "#243f63";
const GREY = "#8a8276";
const HAIRLINE = "rgba(36,63,99,0.38)";

// --- embed the self-hosted fonts as base64 so text is true-to-brand -------
const b64 = (p) => readFileSync(resolve(root, p)).toString("base64");
const fraunces = b64("node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2");
const interTight = b64("node_modules/@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2");

// --- the hand-drawn circle (from src/components/InkStroke.astro) ----------
const CIRCLE = "M148 30 C96 18 38 24 20 47 C4 67 22 92 70 100 C128 110 196 100 205 70 C212 47 178 31 120 28 C92 27 66 31 50 40";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <style>
      @font-face {
        font-family: 'Fraunces'; font-style: normal; font-weight: 350;
        src: url(data:font/woff2;base64,${fraunces}) format('woff2');
      }
      @font-face {
        font-family: 'Inter Tight'; font-style: normal; font-weight: 500;
        src: url(data:font/woff2;base64,${interTight}) format('woff2');
      }
      .serif { font-family: 'Fraunces', Georgia, serif; font-weight: 350; letter-spacing: -0.5px; }
      .sans  { font-family: 'Inter Tight', Arial, sans-serif; }
    </style>
  </defs>

  <!-- bone paper -->
  <rect width="1200" height="630" fill="${PAPER}"/>

  <!-- name, top-left small caps -->
  <text x="84" y="104" class="sans" font-size="23" font-weight="500"
        letter-spacing="3.5" fill="${GREY}">EDWINFRED KAMAU</text>

  <!-- headline -->
  <g class="serif" font-size="62" fill="${INK}">
    <text x="82" y="262">Enterprise software &amp; AI agents</text>
    <text x="82" y="338">that give you back the</text>
    <text x="82" y="414"><tspan fill="${INK_BLUE}">joy</tspan> of running your business.</text>
  </g>

  <!-- the hand-drawn ink circle around "joy" (start of line 3, x≈82) -->
  <g transform="translate(58,360) scale(0.515,0.52) rotate(-2,112,64)">
    <path d="${CIRCLE}" fill="none" stroke="${INK_BLUE}" stroke-width="7"
          stroke-linecap="round" stroke-linejoin="round"/>
  </g>

  <!-- footer hairline + url -->
  <line x1="84" y1="556" x2="1116" y2="556" stroke="${HAIRLINE}" stroke-width="1"/>
  <text x="84" y="592" class="sans" font-size="24" font-weight="500" fill="${INK}">edwinfred.com</text>
  <text x="1116" y="592" class="sans" font-size="22" fill="${GREY}" text-anchor="end">Software &amp; AI · Nairobi</text>
</svg>`;

mkdirSync(resolve(root, "public"), { recursive: true });
writeFileSync(resolve(root, "public/og-image.svg"), svg);

await sharp(Buffer.from(svg)).png().toFile(resolve(root, "public/og-image.png"));
console.log("✓ wrote public/og-image.png and public/og-image.svg");
