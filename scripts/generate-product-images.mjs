/**
 * Generate new ginger product images only.
 * Usage: node scripts/generate-product-images.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "images");

const THEME =
  "Liam6Agro premium ginger export brand aesthetic: deep forest green #1a3c34, warm brown #5d3a26, golden #c9a962 accents, Karnataka organic agriculture, luxury commercial studio photography, photorealistic, no text no logos no watermarks";

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
if (!API_KEY) process.exit(1);

const NEW_PRODUCTS = [
  {
    name: "product-young-ginger",
    prompt: `Studio product photography: tender young baby ginger rhizomes with pale pink flesh on dark wood, soft natural light, delicate gourmet export product, photorealistic. ${THEME}`,
  },
  {
    name: "product-ginger-flakes",
    prompt: `Studio product photography: thin dehydrated ginger flakes in small pile on linen cloth and wooden board, golden brown texture, spice export catalog. ${THEME}`,
  },
  {
    name: "product-ginger-paste",
    prompt: `Studio product photography: smooth fresh ginger paste in glass jar with fresh ginger root beside it on dark slate, creamy beige paste visible, food export product. ${THEME}`,
  },
  {
    name: "product-pickled-ginger",
    prompt: `Studio product photography: thin pink pickled sushi ginger gari slices in clear glass bowl with brine, Japanese cuisine export product, clean bright lighting. ${THEME}`,
  },
  {
    name: "product-crystallized-ginger",
    prompt: `Studio product photography: golden crystallized candied ginger pieces on wooden plate, sugar-coated confectionery export product, warm appetizing light. ${THEME}`,
  },
  {
    name: "product-ginger-pickle",
    prompt: `Studio product photography: Indian ginger pickle in traditional glass jar with oil and spices visible, South Indian condiment export product, rich warm tones. ${THEME}`,
  },
  {
    name: "product-ginger-oleoresin",
    prompt: `Studio product photography: small dark glass vial of concentrated ginger oleoresin extract with fresh ginger root, industrial flavour export product, dramatic lighting. ${THEME}`,
  },
  {
    name: "product-ginger-extract",
    prompt: `Studio product photography: amber bottle of liquid ginger extract concentrate with dropper and fresh ginger, wellness and food industry export product. ${THEME}`,
  },
  {
    name: "product-ginger-tea",
    prompt: `Studio product photography: dried ginger tea cuts and slices in wooden scoop with steaming cup of ginger tea, herbal beverage export product, cozy warm lighting. ${THEME}`,
  },
];

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
      size: "1024x1024",
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
  const force = process.argv.includes("--force");

  const toGen = NEW_PRODUCTS.filter((p) => {
    if (force) return true;
    return !fs.existsSync(path.join(outDir, `${p.name}.png`));
  });

  console.log(`Generating ${toGen.length} product images...\n`);

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
