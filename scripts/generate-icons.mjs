/**
 * Generate professional Liam6Agro brand icons via OpenAI.
 * Usage: node scripts/generate-icons.mjs [--force]
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

const PROFESSIONAL =
  "STRICT: ultra-professional subtle corporate logo mark. Hairline monoline vector identity, whisper-light elegance, understated luxury agribusiness export brand. NOT cartoon NOT 3D NOT mascot NOT clip art NOT bold NOT chunky NOT wheat NOT grain. Like premium European fine-foods or spice trading house logos.";

const MARK =
  "Minimal abstract emblem: gentle ginger rhizome suggested with only 3 smooth curves and one small leaf, thin circular ring optional, balanced symmetry, works at 24px favicon. No fill blocks, no shading, no inner detail clutter.";

const ICON_SPECS = [
  {
    name: "logo",
    dest: ["public/icons/logo.png", "src/app/icon.png"],
    background: "transparent",
    prompt: `Liam6Agro export company logo symbol only. ${MARK} Muted forest green #1a3c34 and soft champagne gold #c9a962 hairline strokes. Fully transparent PNG alpha background, no backdrop no black no white fill behind icon. ${PROFESSIONAL}, no text no letters`,
  },
  {
    name: "logo-light",
    dest: ["public/icons/logo-light.png"],
    background: "transparent",
    prompt: `Website header logo icon on dark green navigation bar. ${MARK} Single color soft champagne gold #c9a962 hairline monoline only, delicate subtle strokes, transparent PNG alpha background absolutely no solid backdrop. ${PROFESSIONAL}, no text no letters`,
  },
  {
    name: "logo-dark",
    dest: ["public/icons/logo-dark.png"],
    background: "transparent",
    prompt: `Logo icon for cream website backgrounds. ${MARK} Single color deep forest green #1a3c34 hairline monoline, subtle refined strokes, transparent PNG alpha background. ${PROFESSIONAL}, no text no letters`,
  },
  {
    name: "apple-icon",
    dest: ["public/icons/apple-icon.png", "src/app/apple-icon.png"],
    background: "opaque",
    prompt: `Subtle premium app icon for ginger export corporation. Solid deep forest green #1a3c34 rounded square, centered tiny champagne gold #c9a962 hairline ginger emblem, minimal flat design, soft inner glow only. ${PROFESSIONAL}, no text no letters`,
  },
  {
    name: "og-image",
    dest: ["public/icons/og-image.png"],
    background: "opaque",
    size: "1536x1024",
    quality: "high",
    prompt: `Professional social media banner for Liam6Agro Exports. Photorealistic premium ginger roots on left, elegant dark green and gold corporate design on right with empty space for text overlay, international agricultural export company, sophisticated NOT cartoon, documentary commercial photography, no readable text no logo text`,
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
    quality: spec.quality || "high",
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

  let toGen = ICON_SPECS.filter((spec) => {
    if (FORCE) return true;
    return !fs.existsSync(path.join(root, spec.dest[0]));
  });
  if (ONLY_FILTER?.length) toGen = toGen.filter((s) => ONLY_FILTER.includes(s.name));

  if (toGen.length === 0) {
    console.log("Icons exist. Use --force to regenerate.");
    return;
  }

  console.log(`Generating ${toGen.length} professional brand icons...\n`);

  for (const spec of toGen) {
    try {
      await generate(spec);
      await new Promise((r) => setTimeout(r, 2000));
    } catch (e) {
      console.error(`✗ ${e.message}`);
    }
  }

  console.log("\nDone.");
}

main();
