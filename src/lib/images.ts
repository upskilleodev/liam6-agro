/**
 * Liam6Agro themed imagery — AI-generated in /public/images/
 */
const local = (name: string) => `/images/${name}.png`;

export const products = {
  freshGinger: local("product-fresh-ginger"),
  youngGinger: local("product-young-ginger"),
  gingerPowder: local("product-ginger-powder"),
  gingerCoffee: local("product-ginger-coffee"),
  driedGinger: local("product-dried-ginger"),
  gingerFlakes: local("product-ginger-flakes"),
  gingerPaste: local("product-ginger-paste"),
  pickledGinger: local("product-pickled-ginger"),
  crystallizedGinger: local("product-crystallized-ginger"),
  gingerPickle: local("product-ginger-pickle"),
  gingerOil: local("product-ginger-oil"),
  gingerOleoresin: local("product-ginger-oleoresin"),
  gingerExtract: local("product-ginger-extract"),
  gingerTea: local("product-ginger-tea"),
  spiceBlend: local("product-spice-blend"),
} as const;

export const backgrounds = {
  products: local("bg-products"),
  journey: local("bg-journey"),
  trust: local("bg-trust"),
  about: local("bg-about"),
  cta: local("bg-cta"),
  certifications: local("bg-certifications"),
  farmingPattern: local("bg-farming-pattern"),
  journeyPattern: local("bg-journey-pattern"),
  productsPattern: local("bg-products-pattern"),
} as const;

/** Hyper-realistic journey / process photography */
export const sections = {
  hero: local("hero-desktop"),
  heroDesktop: local("hero-desktop"),
  heroMobile: local("hero-mobile"),
  journeyFarm: local("journey-farm"),
  journeyHarvest: local("journey-harvest"),
  journeyWashing: local("journey-washing"),
  journeyGrading: local("journey-grading"),
  journeyExport: local("journey-export"),
  journeyShipping: local("journey-shipping"),
  journeyGlobal: local("journey-global"),
  indianFarmer: local("indian-farmer"),
  gingerCloseUp: local("ginger-closeup"),
} as const;

export const images = {
  hero: sections.hero,
  freshGinger: products.freshGinger,
  gingerCloseUp: sections.gingerCloseUp,
  gingerMacro: products.freshGinger,
  gingerBasket: products.freshGinger,
  driedGinger: products.driedGinger,
  gingerPowder: products.gingerPowder,
  gingerPlant: sections.journeyFarm,
  karnatakaFarm: sections.journeyFarm,
  indianFarmer: sections.indianFarmer,
  harvestHands: sections.journeyHarvest,
  spiceMarket: products.spiceBlend,
  gingerCoffee: products.gingerCoffee,
  coffeeGinger: products.gingerCoffee,
  processing: sections.journeyGrading,
  shipping: sections.journeyShipping,
  portLogistics: sections.journeyShipping,
  spiceBlend: products.spiceBlend,
  essentialOil: products.gingerOil,
  worldTrade: sections.journeyGlobal,
  bgProducts: backgrounds.products,
  bgJourney: backgrounds.journey,
  bgTrust: backgrounds.trust,
  bgAbout: backgrounds.about,
  bgCta: backgrounds.cta,
  bgCertifications: backgrounds.certifications,
  bgFarmingPattern: backgrounds.farmingPattern,
  bgJourneyPattern: backgrounds.journeyPattern,
  bgProductsPattern: backgrounds.productsPattern,
} as const;
