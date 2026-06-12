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
    title: "Karnataka Farms",
    location: "Malnad & Coorg Highlands",
    description:
      "Ginger is cultivated in fertile red laterite soils of Karnataka — where monsoon rains and tropical climate produce the world's most aromatic rhizomes.",
    detail:
      "Our partner farms across Hassan, Coorg, and Chikmagalur follow sustainable practices with direct traceability from plot to export batch.",
    icon: "map",
    image: sections.journeyFarm,
  },
  {
    id: "harvest",
    step: "02",
    title: "Hand Harvest",
    location: "Peak Maturity Selection",
    description:
      "Skilled farmers hand-select ginger at optimal maturity — maximizing essential oil content and uniform export-grade sizing.",
    detail:
      "Each rhizome is inspected for aroma, fiber structure, and moisture before leaving the field.",
    icon: "plant",
    image: sections.journeyHarvest,
  },
  {
    id: "washing",
    step: "03",
    title: "Washing & Cleaning",
    location: "Primary Processing",
    description:
      "Fresh ginger is washed in hygienic tanks to remove soil while preserving the natural skin and essential oils.",
    detail:
      "Temperature-controlled water and gentle handling prevent bruising before grading begins.",
    icon: "shield",
    image: sections.journeyWashing,
  },
  {
    id: "grading",
    step: "04",
    title: "Grading & Sorting",
    location: "Export-Grade Facility",
    description:
      "Roots are sorted by size, weight, and quality grade to meet specifications for each international market.",
    detail:
      "Rejected batches never mix with export lots — full batch integrity for importers and processors.",
    icon: "shield",
    image: sections.journeyGrading,
  },
  {
    id: "export",
    step: "05",
    title: "Export Packaging",
    location: "Cold-Chain Ready",
    description:
      "Ginger is packed in ventilated crates and cold-storage units — prepared for long-distance international freight.",
    detail:
      "APEDA-registered documentation and phytosanitary certificates prepared for each destination country.",
    icon: "truck",
    image: sections.journeyExport,
  },
  {
    id: "shipping",
    step: "06",
    title: "Port & Logistics",
    location: "Mangalore & Chennai",
    description:
      "Temperature-controlled logistics from our facility to major ports — preserving freshness until arrival.",
    detail:
      "We coordinate freight, insurance, and port handling for seamless importer experience.",
    icon: "truck",
    image: sections.journeyShipping,
  },
  {
    id: "global",
    step: "07",
    title: "Global Markets",
    location: "28+ Countries",
    description:
      "From the USA and Europe to the Middle East and Asia-Pacific — Karnataka ginger reaches the world's finest tables.",
    detail:
      "Trusted by importers, food processors, retailers, and wellness brands worldwide since 2013.",
    icon: "globe",
    image: sections.journeyGlobal,
  },
];
