/**
 * Hyper-realistic journey / farming process photos for Liam6Agro.
 * Usage: node scripts/generate-journey-images.mjs [--force]
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "images");
const FORCE = process.argv.includes("--force");

const REALISM =
  "Ultra photorealistic documentary photography, 8k, natural lighting, authentic Karnataka India agriculture, no text no logos no watermarks, cinematic realism like National Geographic";

const JOURNEY_IMAGES = [
  {
    name: "journey-farm",
    size: "1536x1024",
    prompt: `Wide shot of ginger cultivation in Karnataka India highlands, rows of green ginger plants in fertile red laterite soil, monsoon clouds, Malnad landscape, farmer village in distance, ${REALISM}`,
  },
  {
    name: "journey-harvest",
    size: "1536x1024",
    prompt: `Close-up documentary photo of Indian farmer hands harvesting fresh ginger rhizomes from red soil, dirt on fingers, freshly pulled ginger roots with roots and soil, golden hour, ${REALISM}`,
  },
  {
    name: "journey-washing",
    size: "1536x1024",
    prompt: `Workers washing piles of fresh ginger roots in clean water at agricultural processing unit Karnataka, stainless wash tanks, steam and water droplets, hygienic export facility, ${REALISM}`,
  },
  {
    name: "journey-grading",
    size: "1536x1024",
    prompt: `Workers sorting and grading fresh ginger roots on long stainless steel tables, uniform sizing for export, bright clean food processing factory India, ${REALISM}`,
  },
  {
    name: "journey-lab",
    size: "1536x1024",
    prompt: `Food scientist in white lab coat testing ginger spice sample in modern laboratory, microscope and quality equipment, ginger specimen on bench, FSSAI quality control, ${REALISM}`,
  },
  {
    name: "journey-export",
    size: "1536x1024",
    prompt: `Export workers packing fresh ginger in ventilated crates at warehouse, cold storage facility, APEDA export labels on boxes without readable text, logistics dock, ${REALISM}`,
  },
  {
    name: "journey-shipping",
    size: "1536x1024",
    prompt: `Cargo ship and shipping containers at Indian port at sunset, refrigerated containers for agricultural export, cranes loading freight, Mangalore port atmosphere, ${REALISM}`,
  },
  {
    name: "journey-global",
    size: "1536x1024",
    prompt: `Premium fresh ginger roots on international trade desk with blurred world map and shipping documents in background, global export business, warm executive lighting, ${REALISM}`,
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
  console.error("Missing OPEN_AI_KEY");
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
    ? JOURNEY_IMAGES
    : JOURNEY_IMAGES.filter((s) => !fs.existsSync(path.join(outDir, `${s.name}.png`)));

  if (!specs.length) {
    console.log("Journey images exist. Use --force to regenerate.");
    return;
  }

  console.log(`Generating ${specs.length} hyper-realistic journey photos...\n`);
  for (const spec of specs) {
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
