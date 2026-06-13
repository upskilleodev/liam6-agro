import { products as productImages } from "@/lib/images";

export type ProductCategory =
  | "Fresh & Raw"
  | "Dried & Powder"
  | "Processed"
  | "Oils & Extracts"
  | "Beverages"
  | "Spice Blends";

export type GingerProduct = {
  id: string;
  name: string;
  category: ProductCategory;
  tag: string;
  description: string;
  image: string;
  alt: string;
  featured?: boolean;
};

/**
 * Ginger products grown on our farms, processed in our facilities, exported direct.
 */
export const GINGER_PRODUCTS: GingerProduct[] = [
  {
    id: "fresh-ginger",
    name: "Fresh Ginger",
    category: "Fresh & Raw",
    tag: "Flagship Export",
    description:
      "Export-grade whole rhizomes with high essential oil content, uniform sizing, and natural aroma — ideal for retail, food service, and processing industries.",
    image: productImages.freshGinger,
    alt: "Fresh export-grade ginger rhizomes",
    featured: true,
  },
  {
    id: "young-ginger",
    name: "Young Ginger",
    category: "Fresh & Raw",
    tag: "Tender Rhizome",
    description:
      "Tender baby ginger harvested early for delicate flavour and pale flesh — prized in gourmet, Japanese cuisine, and premium retail markets.",
    image: productImages.youngGinger,
    alt: "Young tender ginger rhizomes",
    featured: true,
  },
  {
    id: "ginger-powder",
    name: "Ginger Powder",
    category: "Dried & Powder",
    tag: "Fine Milled",
    description:
      "Sun-dried and finely milled to a vibrant golden powder with intense aroma — standard for food manufacturing, retail packs, and pharmaceutical formulations.",
    image: productImages.gingerPowder,
    alt: "Fine golden ginger powder",
    featured: true,
  },
  {
    id: "dried-ginger",
    name: "Dried Ginger Slices",
    category: "Dried & Powder",
    tag: "Dehydrated",
    description:
      "Uniformly sliced and dehydrated ginger retaining essential oils — used in tea, confectionery, Ayurvedic preparations, and soup bases.",
    image: productImages.driedGinger,
    alt: "Dried ginger slices for export",
    featured: true,
  },
  {
    id: "ginger-flakes",
    name: "Dehydrated Ginger Flakes",
    category: "Dried & Powder",
    tag: "Low Moisture",
    description:
      "Thin dehydrated flakes with controlled moisture content — perfect for instant foods, seasoning mixes, and bulk industrial buyers.",
    image: productImages.gingerFlakes,
    alt: "Dehydrated ginger flakes",
  },
  {
    id: "ginger-paste",
    name: "Ginger Paste",
    category: "Processed",
    tag: "Ready to Use",
    description:
      "Smooth, preservative-controlled ginger paste from fresh Karnataka rhizomes — a staple for curries, marinades, sauces, and ready-to-cook exports.",
    image: productImages.gingerPaste,
    alt: "Fresh ginger paste product",
    featured: true,
  },
  {
    id: "pickled-ginger",
    name: "Pickled Ginger",
    category: "Processed",
    tag: "Sushi Grade",
    description:
      "Thinly sliced pink pickled ginger (gari) in brine — export quality for sushi restaurants, Asian food distributors, and retail gourmet channels.",
    image: productImages.pickledGinger,
    alt: "Pickled sushi ginger slices",
  },
  {
    id: "crystallized-ginger",
    name: "Crystallized Ginger",
    category: "Processed",
    tag: "Confectionery",
    description:
      "Candied ginger pieces coated in light sugar syrup and dried — popular in confectionery, baking, health snacks, and premium gift assortments.",
    image: productImages.crystallizedGinger,
    alt: "Crystallized candied ginger",
  },
  {
    id: "ginger-pickle",
    name: "Indian Ginger Pickle",
    category: "Processed",
    tag: "Traditional",
    description:
      "Authentic South Indian style ginger pickle with spices and oil — bold flavour for ethnic food importers and specialty grocery chains.",
    image: productImages.gingerPickle,
    alt: "Indian ginger pickle in jar",
  },
  {
    id: "ginger-oil",
    name: "Ginger Essential Oil",
    category: "Oils & Extracts",
    tag: "Cold Pressed",
    description:
      "Steam-distilled essential oil with high gingerol content — supplied to fragrance, flavour, aromatherapy, and wellness product manufacturers.",
    image: productImages.gingerOil,
    alt: "Ginger essential oil bottle",
    featured: true,
  },
  {
    id: "ginger-oleoresin",
    name: "Ginger Oleoresin",
    category: "Oils & Extracts",
    tag: "High Potency",
    description:
      "Concentrated oleoresin extract capturing full ginger flavour profile — used in sauces, beverages, pharma, and natural remedy formulations.",
    image: productImages.gingerOleoresin,
    alt: "Ginger oleoresin extract",
  },
  {
    id: "ginger-extract",
    name: "Ginger Liquid Extract",
    category: "Oils & Extracts",
    tag: "Concentrate",
    description:
      "Alcohol or water-based ginger extract concentrate for functional foods, health drinks, and supplement manufacturers worldwide.",
    image: productImages.gingerExtract,
    alt: "Ginger liquid extract concentrate",
  },
  {
    id: "ginger-tea",
    name: "Ginger Tea",
    category: "Beverages",
    tag: "Herbal Export",
    description:
      "Dried ginger pieces and cut rhizomes for herbal tea blending — clean, aromatic, and packed for international tea brands and wellness retailers.",
    image: productImages.gingerTea,
    alt: "Dried ginger herbal tea",
    featured: true,
  },
  {
    id: "ginger-coffee",
    name: "Ginger Coffee",
    category: "Beverages",
    tag: "Artisan Blend",
    description:
      "Luxury blend of arabica coffee and Karnataka ginger — crafted for gourmet cafes, specialty roasters, and international beverage distributors.",
    image: productImages.gingerCoffee,
    alt: "Ginger coffee artisan blend",
    featured: true,
  },
  {
    id: "spice-blend",
    name: "Organic Spice Blends",
    category: "Spice Blends",
    tag: "Curated Mix",
    description:
      "Custom blends featuring Karnataka ginger with cardamom, turmeric, black pepper, and clove — tailored for global spice houses and food processors.",
    image: productImages.spiceBlend,
    alt: "Organic ginger spice blend collection",
  },
];

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Fresh & Raw",
  "Dried & Powder",
  "Processed",
  "Oils & Extracts",
  "Beverages",
  "Spice Blends",
];

export const CATEGORY_DESCRIPTIONS: Record<ProductCategory, string> = {
  "Fresh & Raw": "Whole rhizomes and tender young ginger for retail and processing",
  "Dried & Powder": "Dehydrated forms for manufacturing, tea, and long shelf-life export",
  "Processed": "Pastes, pickles, and confectionery-ready ginger products",
  "Oils & Extracts": "Essential oil, oleoresin, and liquid extracts for flavour & wellness",
  "Beverages": "Ginger tea cuts and artisan coffee blends",
  "Spice Blends": "Curated mixes for distributors and food industry buyers",
};
