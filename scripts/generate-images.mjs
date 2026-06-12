/**
 * Generates Liam6Agro themed imagery via OpenAI GPT Image API.
 * Usage:
 *   node scripts/generate-images.mjs          # skip existing
 *   node scripts/generate-images.mjs --force  # regenerate all
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "images");

const MODELS = ["gpt-image-1", "gpt-image-1-mini", "gpt-image-2", "dall-e-2"];
const FORCE = process.argv.includes("--force");

const THEME =
  "Liam6Agro premium ginger export brand aesthetic: deep forest green #1a3c34, warm brown #5d3a26, golden #c9a962 accents, Karnataka organic agriculture, luxury commercial photography, photorealistic, no text no logos no watermarks";

function loadEnv() {
  const envPath = path.join(root, ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnv();

const API_KEY = process.env.OPEN_AI_KEY || process.env.OPENAI_API_KEY;
if (!API_KEY) {
  console.error("Missing OPEN_AI_KEY or OPENAI_API_KEY in .env");
  process.exit(1);
}

const IMAGE_SPECS = [
  // —— Hero & CTA ——
  {
    name: "hero",
    category: "hero",
    size: "1536x1024",
    quality: "high",
    prompt: `Cinematic wide shot of abundant fresh organic ginger rhizomes with soil traces on dark rustic wooden table, dramatic moody lighting with deep green and golden highlights, shallow depth of field, misty atmosphere, premium export agriculture hero banner. ${THEME}`,
  },
  {
    name: "bg-cta",
    category: "background",
    size: "1536x1024",
    quality: "high",
    prompt: `Soft blurred macro of fresh ginger root texture, warm brown and forest green tones, dreamy bokeh, suitable as website section background with overlay, low contrast center. ${THEME}`,
  },

  // —— Product catalog (studio realism) ——
  {
    name: "product-fresh-ginger",
    category: "product",
    size: "1024x1024",
    quality: "high",
    prompt: `Studio product photography: premium export-grade fresh ginger roots with natural moisture on dark slate surface, side lighting with green and gold rim light, single hero product shot for ecommerce catalog. ${THEME}`,
  },
  {
    name: "product-ginger-powder",
    category: "product",
    size: "1024x1024",
    quality: "high",
    prompt: `Studio product photography: fine golden ginger powder in elegant wooden bowl with small fresh ginger piece, spice mound texture visible, warm brown background, export spice catalog shot. ${THEME}`,
  },
  {
    name: "product-ginger-coffee",
    category: "product",
    size: "1024x1024",
    quality: "high",
    prompt: `Studio product photography: artisan ginger coffee — ceramic cup with steam, roasted arabica beans and sliced fresh ginger on wooden board, gourmet luxury beverage product shot. ${THEME}`,
  },
  {
    name: "product-dried-ginger",
    category: "product",
    size: "1024x1024",
    quality: "high",
    prompt: `Studio product photography: uniform dried ginger slices neatly arranged on natural linen and wood, dehydrated golden-brown pieces, export spice product catalog, warm studio light. ${THEME}`,
  },
  {
    name: "product-ginger-oil",
    category: "product",
    size: "1024x1024",
    quality: "high",
    prompt: `Studio product photography: amber glass bottle of ginger essential oil with dropper, fresh ginger root and green leaves beside it, wellness export product, soft golden backlight. ${THEME}`,
  },
  {
    name: "product-spice-blend",
    category: "product",
    size: "1024x1024",
    quality: "high",
    prompt: `Studio product photography: curated organic spice blend — small wooden bowls with ginger powder turmeric cardamom and pepper, premium Indian spice export collection, top-down and angled view. ${THEME}`,
  },

  // —— Section backgrounds (soft, overlay-friendly) ——
  {
    name: "bg-products",
    category: "background",
    size: "1536x1024",
    quality: "medium",
    prompt: `Abstract soft background for website section: cream #f9f7f2 base with very subtle scattered dried ginger pieces and spice dust, extremely soft focus, minimal detail, gentle warm tones, no sharp objects. ${THEME}`,
  },
  {
    name: "bg-journey",
    category: "background",
    size: "1536x1024",
    quality: "medium",
    prompt: `Soft blurred panoramic background: lush green Karnataka highland farms and rolling hills at dawn, heavy gaussian blur desaturated, suitable under white overlay for website section, dreamy agricultural landscape. ${THEME}`,
  },
  {
    name: "bg-trust",
    category: "background",
    size: "1536x1024",
    quality: "medium",
    prompt: `Abstract website section background: deep forest green with subtle stylized world map lines in faint gold, painterly soft texture, low contrast, elegant global export theme. ${THEME}`,
  },
  {
    name: "bg-about",
    category: "background",
    size: "1536x1024",
    quality: "medium",
    prompt: `Soft blurred background: rich red Karnataka soil with young green ginger plants, golden hour, heavy blur for website section overlay, warm earthy documentary feel. ${THEME}`,
  },
  {
    name: "bg-certifications",
    category: "background",
    size: "1536x1024",
    quality: "medium",
    prompt: `Abstract horizontal band background: warm brown #5d3a26 with subtle golden certification seal motifs very faint, soft texture, low detail, premium export trust bar aesthetic. ${THEME}`,
  },

  // —— Journey & story section photos ——
  {
    name: "karnataka-farm",
    category: "section",
    size: "1536x1024",
    quality: "high",
    prompt: `Wide documentary photo of ginger cultivation in Karnataka India highlands, monsoon green terraces, tropical spice farms, photorealistic landscape. ${THEME}`,
  },
  {
    name: "indian-farmer",
    category: "section",
    size: "1024x1024",
    quality: "high",
    prompt: `Respectful portrait of Indian farmer in Karnataka agricultural field with green crops, golden hour, dignified documentary photography. ${THEME}`,
  },
  {
    name: "harvest-hands",
    category: "section",
    size: "1024x1024",
    quality: "high",
    prompt: `Close-up documentary: hands harvesting fresh ginger from red soil, dirt on fingers, authentic farm harvest moment. ${THEME}`,
  },
  {
    name: "processing",
    category: "section",
    size: "1024x1024",
    quality: "medium",
    prompt: `Export facility: workers washing and grading fresh ginger on stainless steel tables, hygienic food processing, bright clean industrial agriculture. ${THEME}`,
  },
  {
    name: "lab-quality",
    category: "section",
    size: "1024x1024",
    quality: "medium",
    prompt: `Food safety lab: scientist testing ginger spice sample with modern instruments, clean white laboratory, quality certification scene. ${THEME}`,
  },
  {
    name: "shipping",
    category: "section",
    size: "1536x1024",
    quality: "medium",
    prompt: `International port at sunset with cargo containers and cranes, agricultural export logistics, warm golden light, photorealistic. ${THEME}`,
  },
  {
    name: "world-trade",
    category: "section",
    size: "1536x1024",
    quality: "medium",
    prompt: `Executive desk with premium ginger roots, subtle global trade ambiance, warm office lighting, international business export concept. ${THEME}`,
  },
  {
    name: "ginger-closeup",
    category: "section",
    size: "1024x1024",
    quality: "high",
    prompt: `Extreme macro of fresh ginger skin fibers and texture, dramatic green and gold cinematic lighting, abstract food beauty. ${THEME}`,
  },
];

let activeModel = null;

async function pickModel() {
  if (activeModel) return activeModel;

  for (const model of MODELS) {
    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        prompt: "Single fresh ginger root, photorealistic product shot",
        n: 1,
        size: "1024x1024",
        quality: model.startsWith("dall-e") ? undefined : "low",
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.data?.[0]?.b64_json || data.data?.[0]?.url) {
        activeModel = model;
        console.log(`Using model: ${model}\n`);
        return model;
      }
    }
  }

  throw new Error("No image generation model available on this API key");
}

async function saveImageData(spec, dataItem) {
  const filePath = path.join(outDir, `${spec.name}.png`);

  if (dataItem.b64_json) {
    fs.writeFileSync(filePath, Buffer.from(dataItem.b64_json, "base64"));
  } else if (dataItem.url) {
    const imgRes = await fetch(dataItem.url);
    if (!imgRes.ok) throw new Error(`${spec.name}: failed to download`);
    fs.writeFileSync(filePath, Buffer.from(await imgRes.arrayBuffer()));
  } else {
    throw new Error(`${spec.name}: no image data`);
  }

  console.log(`✓ ${spec.name}.png [${spec.category}] (${spec.size}, ${spec.quality})`);
}

async function generateImage(spec, model) {
  const body = {
    model,
    prompt: spec.prompt,
    n: 1,
    size: spec.size,
  };

  if (!model.startsWith("dall-e")) {
    body.quality = spec.quality;
  }

  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`${spec.name}: ${res.status} ${err}`);
  }

  const data = await res.json();
  await saveImageData(spec, data.data[0]);
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  const onlyArg = process.argv.find((a) => a.startsWith("--only="));
  const onlyNames = onlyArg ? onlyArg.replace("--only=", "").split(",") : null;

  let specs = IMAGE_SPECS;
  if (onlyNames) {
    specs = specs.filter((s) => onlyNames.includes(s.name));
  }

  if (!FORCE) {
    const existing = fs.readdirSync(outDir).filter((f) => f.endsWith(".png"));
    specs = specs.filter((s) => !existing.includes(`${s.name}.png`));
  }

  if (specs.length === 0) {
    console.log("Nothing to generate. Use --force to regenerate.");
    return;
  }

  await pickModel();

  const byCat = specs.reduce((acc, s) => {
    acc[s.category] = (acc[s.category] || 0) + 1;
    return acc;
  }, {});
  console.log(`Generating ${specs.length} images:`, byCat, "\n");

  for (const spec of specs) {
    try {
      await generateImage(spec, activeModel);
      await new Promise((r) => setTimeout(r, 2000));
    } catch (e) {
      console.error(`✗ ${e.message}`);
    }
  }

  const final = fs.readdirSync(outDir).filter((f) => f.endsWith(".png"));
  console.log(`\nDone. ${final.length} images in public/images/`);
}

main();
