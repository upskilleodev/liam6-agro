/**
 * Premium hero backgrounds for Liam6Agro — desktop landscape + mobile portrait.
 * Usage: node scripts/generate-hero-images.mjs [--force]
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "images");
const FORCE = process.argv.includes("--force");

const THEME =
  "Liam6Agro luxury agro export brand: deep forest green #1a3c34, warm brown #5d3a26, golden #c9a962 accents, Karnataka organic ginger agriculture, ultra photorealistic commercial photography, cinematic, no text no logos no watermarks";

const HERO_SPECS = [
  {
    name: "hero-desktop",
    size: "1536x1024",
    prompt: `Cinematic wide landscape hero banner for premium ginger export company. Karnataka ginger plantation at golden hour — lush green rows receding into misty Malnad hills, warm sun rays through monsoon clouds. Foreground: artfully arranged fresh organic ginger rhizomes on dark wet soil with subtle soil traces. Composition leaves darker, softer negative space on the LEFT third for website headline overlay; visual interest and golden light concentrated on the RIGHT and center-right. Moody luxury editorial lighting, shallow depth of field, rich forest greens and amber highlights. ${THEME}`,
  },
  {
    name: "hero-mobile",
    size: "1024x1536",
    prompt: `Vertical portrait hero photograph for mobile website banner. Low-angle close-up of premium fresh ginger roots emerging from rich red laterite soil, dew droplets, golden morning backlight. Background: soft bokeh of green ginger plantation and misty Karnataka hills. Darker gradient-friendly tones at TOP for navigation overlay and bottom for text. Elegant, minimal, luxury food export aesthetic — intimate and atmospheric. ${THEME}`,
  },
];

function loadEnv() {
  const envPath = path.join(root, ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    process.env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
}

loadEnv();

const API_KEY = process.env.OPEN_AI_KEY || process.env.OPENAI_API_KEY;
if (!API_KEY) {
  console.error("Missing OPEN_AI_KEY or OPENAI_API_KEY in .env");
  process.exit(1);
}

async function generate(spec) {
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt: spec.prompt,
      n: 1,
      size: spec.size,
      quality: "high",
    }),
  });

  if (!res.ok) throw new Error(`${spec.name}: ${await res.text()}`);

  const data = await res.json();
  const b64 = data.data?.[0]?.b64_json;
  if (!b64) throw new Error(`${spec.name}: no data`);

  fs.writeFileSync(path.join(outDir, `${spec.name}.png`), Buffer.from(b64, "base64"));
  console.log(`✓ ${spec.name}.png`);
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const specs = FORCE
    ? HERO_SPECS
    : HERO_SPECS.filter((s) => !fs.existsSync(path.join(outDir, `${s.name}.png`)));

  if (!specs.length) {
    console.log("Hero images exist. Use --force to regenerate.");
    return;
  }

  console.log(`Generating ${specs.length} hero background(s)...\n`);
  for (const spec of specs) {
    try {
      await generate(spec);
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  }
  console.log("\nDone.");
}

main();
