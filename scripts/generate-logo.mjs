/**
 * Generate Liam6Agro brand logo lockups via OpenAI gpt-image-1.
 * Usage: node scripts/generate-logo.mjs [--force] [--only=wordmark-dark,emblem]
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const FORCE = process.argv.includes("--force");
const ONLY_FILTER = process.argv
  .find((a) => a.startsWith("--only="))
  ?.slice(7)
  ?.split(",")
  .filter(Boolean);

const BRAND =
  "Liam6Agro Exports — premium Karnataka ginger and agro export company established 2013. Sophisticated European fine-foods trading house aesthetic. Refined NOT cartoon NOT 3D NOT mascot NOT clip art.";

const COLORS =
  "Deep forest green #142e28 background where needed. Champagne gold #c9a962 and soft gold #e2c88a accents. White #f9f7f2 for primary wordmark text.";

const EMBLEM =
  "Circular emblem: thin hairline gold ring, inside a minimal elegant ginger rhizome with small sprout leaves — 3–4 smooth curves only, balanced symmetry, luxury monoline vector mark.";

const LOGO_SPECS = [
  {
    name: "wordmark-dark",
    dest: ["public/icons/logo-wordmark-dark.png"],
    background: "opaque",
    size: "1536x1024",
    prompt: `Professional horizontal corporate logo lockup. ${EMBLEM} On the right: "Liam6Agro" in elegant high-contrast white serif typography with refined thick-thin strokes. Below: "EXPORTS" in wide letter-spaced uppercase sans-serif champagne gold. Solid deep forest green #142e28 background filling entire image. ${COLORS} ${BRAND} Exact readable text Liam6Agro and EXPORTS`,
  },
  {
    name: "wordmark-header",
    dest: ["public/icons/logo-header.png"],
    background: "transparent",
    size: "1536x1024",
    prompt: `Horizontal website header logo on TRANSPARENT PNG alpha background only. ${EMBLEM} Left emblem in champagne gold #c9a962 hairlines. Right: "Liam6Agro" in white elegant serif, below "EXPORTS" in champagne gold wide-tracked uppercase sans-serif. Absolutely NO background fill NO green rectangle NO black behind logo — fully transparent alpha. ${BRAND} Exact text Liam6Agro and EXPORTS`,
  },
  {
    name: "emblem",
    dest: ["public/icons/logo-emblem.png", "public/icons/logo.png", "src/app/icon.png"],
    background: "transparent",
    prompt: `Logo symbol only, no text. ${EMBLEM} Champagne gold #c9a962 hairline strokes on fully transparent PNG alpha background. ${BRAND} No letters no words no backdrop`,
  },
  {
    name: "emblem-dark",
    dest: ["public/icons/logo-dark.png"],
    background: "transparent",
    prompt: `Logo symbol only for cream backgrounds. ${EMBLEM} Deep forest green #142e28 hairline strokes, transparent PNG alpha background. ${BRAND} No text no letters`,
  },
  {
    name: "apple-icon",
    dest: ["public/icons/apple-icon.png", "src/app/apple-icon.png"],
    background: "opaque",
    prompt: `Premium iOS app icon. Solid deep forest green #142e28 rounded square. Centered small champagne gold #c9a962 circular emblem with minimal ginger sprout inside, subtle flat design. ${BRAND} No text no letters`,
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
  console.error("Missing OPEN_AI_KEY in .env");
  process.exit(1);
}

async function generate(spec) {
  const body = {
    model: "gpt-image-1",
    prompt: spec.prompt,
    n: 1,
    size: spec.size || "1024x1024",
    quality: "high",
    background: spec.background || "transparent",
  };

  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`${spec.name}: ${await res.text()}`);

  const data = await res.json();
  const b64 = data.data?.[0]?.b64_json;
  if (!b64) throw new Error(`${spec.name}: no image data`);

  const buffer = Buffer.from(b64, "base64");

  for (const dest of spec.dest) {
    const filePath = path.join(root, dest);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, buffer);
    console.log(`  → ${dest}`);
  }

  console.log(`✓ ${spec.name}`);
}

async function main() {
  fs.mkdirSync(path.join(root, "public/icons"), { recursive: true });

  let toGen = LOGO_SPECS.filter((spec) => {
    if (FORCE) return true;
    return !fs.existsSync(path.join(root, spec.dest[0]));
  });
  if (ONLY_FILTER?.length) toGen = toGen.filter((s) => ONLY_FILTER.includes(s.name));

  if (toGen.length === 0) {
    console.log("Logos exist. Use --force to regenerate.");
    return;
  }

  console.log(`Generating ${toGen.length} logo assets...\n`);

  for (const spec of toGen) {
    try {
      await generate(spec);
      await new Promise((r) => setTimeout(r, 2500));
    } catch (e) {
      console.error(`✗ ${e.message}`);
    }
  }

  console.log("\nDone.");
}

main();
