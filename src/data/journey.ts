import { sections } from "@/lib/images";

export type JourneyIconKey = "map" | "plant" | "shield" | "truck" | "globe";

export type JourneyStep = {
  id: string;
  step: string;
  title: string;
  location: string;
  description: string;
  detail: string;
  icon: JourneyIconKey;
  image: string;
};

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: "farm",
    step: "01",
    title: "Our Karnataka Farms",
    location: "Malnad & Coorg Highlands",
    description:
      "We grow ginger on our own farms and long-term partner plots across Malnad, Coorg, and Hassan — never bought through traders or auction markets.",
    detail:
      "Every export lot is traceable to the field. We control cultivation from seed to harvest, so quality and pricing stay in our hands — not a middleman's.",
    icon: "map",
    image: sections.journeyFarm,
  },
  {
    id: "harvest",
    step: "02",
    title: "Hand Harvest",
    location: "Peak Maturity Selection",
    description:
      "Our farm teams hand-select ginger at peak maturity for maximum essential oil, uniform sizing, and export-grade aroma.",
    detail:
      "Each rhizome is inspected for fibre, moisture, and aroma on-site before it leaves our fields — no third-party grading at this stage.",
    icon: "plant",
    image: sections.journeyHarvest,
  },
  {
    id: "washing",
    step: "03",
    title: "Washing & Cleaning",
    location: "Our Processing Unit",
    description:
      "Fresh ginger is washed in our own hygienic facility — soil removed while preserving natural skin and essential oils.",
    detail:
      "Temperature-controlled water and trained staff handle every batch in-house before grading begins.",
    icon: "shield",
    image: sections.journeyWashing,
  },
  {
    id: "grading",
    step: "04",
    title: "Grading & Sorting",
    location: "Our Export Facility",
    description:
      "In our facility, roots are sorted by size, weight, and grade to match each international buyer's specifications.",
    detail:
      "Rejected lots never mix with export batches. We own the process — importers deal directly with the team that graded their ginger.",
    icon: "shield",
    image: sections.journeyGrading,
  },
  {
    id: "export",
    step: "05",
    title: "Export Packaging",
    location: "Cold-Chain Ready",
    description:
      "We pack in ventilated crates and cold-storage units at our warehouse — prepared for long-distance international freight.",
    detail:
      "APEDA-registered documentation and phytosanitary certificates are prepared by our export team for each destination.",
    icon: "truck",
    image: sections.journeyExport,
  },
  {
    id: "shipping",
    step: "06",
    title: "Port & Logistics",
    location: "Mangalore & Chennai",
    description:
      "Our logistics team moves cargo from our facility to major ports — temperature-controlled, direct to vessel, no forwarding agents in the chain.",
    detail:
      "We coordinate freight, insurance, and port handling end-to-end so importers get one direct contact from farm to ship.",
    icon: "truck",
    image: sections.journeyShipping,
  },
  {
    id: "global",
    step: "07",
    title: "Sold & Shipped Worldwide",
    location: "28+ Countries",
    description:
      "We sell and export directly to importers across the Americas, Europe, Middle East, and Asia-Pacific — farm to world, under our own name.",
    detail:
      "Trusted by food processors, retailers, and wellness brands since 2013 — because they buy from the producer, not through layers of traders.",
    icon: "globe",
    image: sections.journeyGlobal,
  },
];
