/**
 * Hyper-realistic farming background graphics for section overlays.
 * Usage: node scripts/generate-farming-backgrounds.mjs [--force]
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "images");
const FORCE = process.argv.includes("--force");
const ONLY_FILTER = process.argv
  .find((a) => a.startsWith("--only="))
  ?.slice(7)
  ?.split(",")
  .filter(Boolean);

const THEME =
  "Liam6Agro Karnataka ginger export brand, deep forest green and golden tones, photorealistic documentary agriculture";

const BG_SPECS = [
  {
    name: "bg-journey",
    size: "1536x1024",
    prompt: `Ultra photorealistic soft-focus website background for premium export company. Wide Karnataka ginger plantation at bright morning: washed cream sky, pale golden sunlight, airy luminous atmosphere, soft green ginger leaves, hints of red laterite soil. Very light and bright overall exposure, dreamy gentle bokeh, edges fade to soft cream white for UI overlay. Elegant luxury agribusiness mood, warm gold and sage green tones, NOT dark NOT moody NOT night. Documentary agriculture photography, 8k, ${THEME}, NOT cartoon, no text no logos no people`,
  },
  {
    name: "bg-journey-pattern",
    size: "1536x1024",
    prompt: `Delicate decorative website background graphic: soft watercolor-style ginger plant leaves and organic farm curves on warm cream #f9f7f2 paper texture. Very light sage green and muted gold botanical illustration blended with subtle photorealistic ginger leaf silhouettes. Minimal elegant pattern for luxury food export brand, extremely light and airy, low contrast, suitable as subtle section accent under cream overlay. NOT cartoon NOT bold NOT dark, no text no logos`,
  },
  {
    name: "bg-about",
    size: "1536x1024",
    prompt: `Ultra photorealistic background of Karnataka ginger plantation field, young green ginger plants in rich red soil, golden hour sunlight, soft bokeh on horizon, warm earthy farming atmosphere, website section backdrop, ${THEME}, no text`,
  },
  {
    name: "bg-products",
    size: "1536x1024",
    prompt: `Ultra photorealistic soft-focus website background for premium ginger export products section. Wide Karnataka plantation at soft morning light: rows of young ginger plants, pale cream sky, luminous airy exposure, sage green leaves, warm gold highlights, edges fade to cream white for UI overlay. Very light bright dreamy bokeh, elegant agribusiness mood, NOT dark NOT moody, documentary agriculture, ${THEME}, no text no logos`,
  },
  {
    name: "bg-products-pattern",
    size: "1536x1024",
    prompt: `Delicate decorative website background graphic for products catalog section: soft watercolor ginger plantation rows, organic leaf silhouettes, gentle terrace curves on warm cream #f9f7f2 paper. Muted sage green and champagne gold botanical line art, extremely light low contrast, subtle repeating farm pattern suitable under cream overlay. Luxury spice export brand aesthetic, NOT cartoon NOT bold NOT dark, no text no logos no products`,
  },
  {
    name: "bg-hero-farm",
    size: "1536x1024",
    prompt: `Ultra photorealistic cinematic wide shot of Karnataka spice farms at sunrise, ginger and turmeric fields on rolling hills, monsoon greenery, volumetric light rays through mist, epic agricultural landscape for website hero layer, ${THEME}, no text no logos`,
  },
  {
    name: "bg-farming-pattern",
    size: "1536x1024",
    prompt: `Artistic photorealistic top-down view of ginger farm terraces Karnataka, geometric crop rows, deep green plants and brown soil, subtle aerial farming graphic suitable as decorative website background, soft vignette edges, ${THEME}, no text`,
  },
  {
    name: "indian-farmer",
    size: "1024x1024",
    prompt: `Ultra photorealistic portrait of Indian farmer in Karnataka ginger field, dignified expression, green crops behind, golden hour, documentary National Geographic style, respectful authentic agriculture photography, ${THEME}, no text`,
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
  const imageB64 = data.data?.[0]?.b64_json;
  if (!imageB64) throw new Error(`${spec.name}: no data`);

  fs.writeFileSync(path.join(outDir, `${spec.name}.png`), Buffer.from(imageB64, "base64"));
  console.log(`✓ ${spec.name}.png`);
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  let specs = FORCE
    ? BG_SPECS
    : BG_SPECS.filter((s) => !fs.existsSync(path.join(outDir, `${s.name}.png`)));
  if (ONLY_FILTER?.length) specs = specs.filter((s) => ONLY_FILTER.includes(s.name));

  if (!specs.length) {
    console.log("Farming backgrounds exist. Use --force to regenerate.");
    return;
  }

  console.log(`Generating ${specs.length} farming background graphics...\n`);
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
