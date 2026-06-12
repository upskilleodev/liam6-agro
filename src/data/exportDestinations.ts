export type ExportRegion = "Americas" | "Europe" | "Middle East" | "Asia-Pacific";

export type ExportDestination = {
  name: string;
  iso: string;
  coordinates: [number, number]; // [longitude, latitude]
  region: ExportRegion;
};

export const ORIGIN = {
  name: "Karnataka, India",
  shortName: "Karnataka",
  iso: "IN",
  coordinates: [75.5, 12.5] as [number, number],
};

export const EXPORT_DESTINATIONS: ExportDestination[] = [
  { name: "United States", iso: "US", coordinates: [-98.5, 39.5], region: "Americas" },
  { name: "Canada", iso: "CA", coordinates: [-106, 56], region: "Americas" },
  { name: "United Kingdom", iso: "GB", coordinates: [-2.5, 54], region: "Europe" },
  { name: "Germany", iso: "DE", coordinates: [10.5, 51], region: "Europe" },
  { name: "France", iso: "FR", coordinates: [2.5, 46.5], region: "Europe" },
  { name: "Netherlands", iso: "NL", coordinates: [5.5, 52.2], region: "Europe" },
  { name: "Belgium", iso: "BE", coordinates: [4.5, 50.5], region: "Europe" },
  { name: "Italy", iso: "IT", coordinates: [12.5, 42.5], region: "Europe" },
  { name: "Spain", iso: "ES", coordinates: [-3.5, 40], region: "Europe" },
  { name: "Sweden", iso: "SE", coordinates: [15, 62], region: "Europe" },
  { name: "Poland", iso: "PL", coordinates: [19, 52], region: "Europe" },
  { name: "UAE", iso: "AE", coordinates: [54, 24], region: "Middle East" },
  { name: "Saudi Arabia", iso: "SA", coordinates: [45, 24], region: "Middle East" },
  { name: "Qatar", iso: "QA", coordinates: [51, 25.5], region: "Middle East" },
  { name: "Kuwait", iso: "KW", coordinates: [47.5, 29.5], region: "Middle East" },
  { name: "Oman", iso: "OM", coordinates: [57, 21], region: "Middle East" },
  { name: "Japan", iso: "JP", coordinates: [138, 36], region: "Asia-Pacific" },
  { name: "South Korea", iso: "KR", coordinates: [127.5, 36], region: "Asia-Pacific" },
  { name: "Singapore", iso: "SG", coordinates: [103.8, 1.35], region: "Asia-Pacific" },
  { name: "Malaysia", iso: "MY", coordinates: [102, 4.5], region: "Asia-Pacific" },
  { name: "Australia", iso: "AU", coordinates: [133, -27], region: "Asia-Pacific" },
  { name: "New Zealand", iso: "NZ", coordinates: [174, -41], region: "Asia-Pacific" },
  { name: "Thailand", iso: "TH", coordinates: [101, 15], region: "Asia-Pacific" },
  { name: "Vietnam", iso: "VN", coordinates: [108, 16], region: "Asia-Pacific" },
  { name: "Indonesia", iso: "ID", coordinates: [113, -2], region: "Asia-Pacific" },
];

export const EXPORT_ISO_CODES = new Set(EXPORT_DESTINATIONS.map((d) => d.iso));

/** world-atlas country name → ISO (for map highlighting) */
export const GEO_NAME_TO_ISO: Record<string, string> = {
  India: "IN",
  "United States of America": "US",
  Canada: "CA",
  "United Kingdom": "GB",
  Germany: "DE",
  France: "FR",
  Netherlands: "NL",
  Belgium: "BE",
  Italy: "IT",
  Spain: "ES",
  Sweden: "SE",
  Poland: "PL",
  "United Arab Emirates": "AE",
  "Saudi Arabia": "SA",
  Qatar: "QA",
  Kuwait: "KW",
  Oman: "OM",
  Japan: "JP",
  "South Korea": "KR",
  Singapore: "SG",
  Malaysia: "MY",
  Australia: "AU",
  "New Zealand": "NZ",
  Thailand: "TH",
  Vietnam: "VN",
  Indonesia: "ID",
};

export const REGION_COLORS: Record<ExportRegion, string> = {
  Americas: "#d4843e",
  Europe: "#c9a962",
  "Middle East": "#e8a564",
  "Asia-Pacific": "#4a7c6f",
};

export const REGION_LABELS: ExportRegion[] = [
  "Americas",
  "Europe",
  "Middle East",
  "Asia-Pacific",
];
