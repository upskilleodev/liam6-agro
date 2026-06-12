"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Sphere,
  useMapContext,
} from "react-simple-maps";
import Image from "next/image";
import { backgrounds } from "@/lib/images";
import {
  EXPORT_DESTINATIONS,
  EXPORT_ISO_CODES,
  GEO_NAME_TO_ISO,
  ORIGIN,
  REGION_COLORS,
  REGION_LABELS,
  type ExportDestination,
  type ExportRegion,
} from "@/data/exportDestinations";
import { SectionHeader } from "./ui/SectionHeader";
import { GlobeIcon, MapPinIcon } from "./icons";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const DEST_BY_ISO = new Map(EXPORT_DESTINATIONS.map((d) => [d.iso, d]));

function getCountryIso(name: string): string | undefined {
  return GEO_NAME_TO_ISO[name];
}

const geographyStyle = {
  default: { outline: "none" as const },
  hover: { outline: "none" as const },
  pressed: { outline: "none" as const },
};

const MapCountry = memo(function MapCountry({
  geography,
  activeIso,
  onActivate,
}: {
  geography: { rsmKey: string; properties?: { name?: string } };
  activeIso: string | null;
  onActivate: (iso: string) => void;
}) {
  const name = geography.properties?.name ?? "";
  const iso = getCountryIso(name);
  const isOrigin = iso === ORIGIN.iso;
  const isExport = iso && EXPORT_ISO_CODES.has(iso);
  const dest = iso ? DEST_BY_ISO.get(iso) : undefined;
  const isHighlighted = activeIso !== null && iso === activeIso;
  const regionColor = dest ? REGION_COLORS[dest.region] : undefined;

  const fill = isHighlighted
    ? isOrigin
      ? "#d4843e"
      : "#e8a564"
    : isOrigin
      ? "#d4843e"
      : isExport
        ? (regionColor ?? "#2d4f3e")
        : "#1a3c34";

  return (
    <Geography
      geography={geography}
      onMouseEnter={() => {
        if (iso && (isExport || isOrigin)) onActivate(iso);
      }}
      style={{
        ...geographyStyle,
        default: {
          ...geographyStyle.default,
          fill,
          fillOpacity: isHighlighted || isOrigin ? 1 : isExport ? 0.75 : 0.35,
          stroke: isHighlighted ? "#f9f7f2" : "#c9a962",
          strokeWidth: isHighlighted ? 0.8 : 0.35,
        },
        hover: {
          ...geographyStyle.hover,
          fill: isOrigin ? "#e8a564" : "#d4843e",
          fillOpacity: 0.95,
          stroke: "#f9f7f2",
          strokeWidth: 0.7,
        },
      }}
    />
  );
}, (prev, next) => {
  const name = next.geography.properties?.name ?? "";
  const iso = getCountryIso(name);
  if (!iso) return prev.geography.rsmKey === next.geography.rsmKey;

  const wasActive = prev.activeIso === iso;
  const isActive = next.activeIso === iso;
  return prev.geography.rsmKey === next.geography.rsmKey && wasActive === isActive;
});

function ExportArcs({ activeIso }: { activeIso: string | null }) {
  const { projection } = useMapContext();

  return (
    <g className="export-arcs" fill="none">
      {EXPORT_DESTINATIONS.map((dest) => {
        const start = projection(ORIGIN.coordinates);
        const end = projection(dest.coordinates);
        if (!start || !end) return null;

        const [x1, y1] = start;
        const [x2, y2] = end;
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.12;
        const isActive = activeIso === dest.iso || activeIso === ORIGIN.iso;
        const dimmed = activeIso && !isActive;

        return (
          <path
            key={dest.iso}
            d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
            stroke={REGION_COLORS[dest.region]}
            strokeWidth={isActive ? 1.8 : 1}
            strokeOpacity={dimmed ? 0.08 : isActive ? 0.7 : 0.28}
          />
        );
      })}
    </g>
  );
}

function DestinationMarkers({
  activeIso,
  onSelect,
}: {
  activeIso: string | null;
  onSelect: (iso: string) => void;
}) {
  return (
    <>
      <Marker coordinates={ORIGIN.coordinates}>
        <g
          onClick={() => onSelect(ORIGIN.iso)}
          className="cursor-pointer"
          role="button"
          aria-label={ORIGIN.name}
        >
          <circle r={14} fill="#d4843e" opacity={0.2} className="animate-map-pulse" />
          <circle r={8} fill="#d4843e" stroke="#f9f7f2" strokeWidth={2} />
          <circle r={3} fill="#f9f7f2" />
        </g>
      </Marker>

      {EXPORT_DESTINATIONS.map((dest) => {
        const isActive = activeIso === dest.iso;
        const dimmed = activeIso && !isActive;
        const color = REGION_COLORS[dest.region];

        return (
          <Marker key={dest.iso} coordinates={dest.coordinates}>
            <g
              onClick={() => onSelect(dest.iso)}
              className="cursor-pointer"
              role="button"
              aria-label={dest.name}
              opacity={dimmed ? 0.35 : 1}
            >
              {isActive && (
                <circle r={10} fill={color} opacity={0.25} className="animate-map-pulse" />
              )}
              <circle
                r={isActive ? 5 : 3.5}
                fill={color}
                stroke="#f9f7f2"
                strokeWidth={1.5}
              />
            </g>
          </Marker>
        );
      })}
    </>
  );
}

function getMapScale(width: number) {
  if (width < 480) return 95;
  if (width < 640) return 110;
  if (width < 1024) return 130;
  return 155;
}

export function GlobalExportMap() {
  const [activeIso, setActiveIso] = useState<string | null>(null);
  const [regionFilter, setRegionFilter] = useState<ExportRegion | "all">("all");
  const [mapReady, setMapReady] = useState(false);
  const [mapScale, setMapScale] = useState(155);

  useEffect(() => {
    const update = () => setMapScale(getMapScale(window.innerWidth));
    update();
    setMapReady(true);
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  const clearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelScheduledClear = useCallback(() => {
    if (clearTimerRef.current) {
      clearTimeout(clearTimerRef.current);
      clearTimerRef.current = null;
    }
  }, []);

  const activateCountry = useCallback(
    (iso: string) => {
      cancelScheduledClear();
      setActiveIso(iso);
    },
    [cancelScheduledClear]
  );

  const scheduleClear = useCallback(() => {
    cancelScheduledClear();
    clearTimerRef.current = setTimeout(() => {
      setActiveIso(null);
      clearTimerRef.current = null;
    }, 80);
  }, [cancelScheduledClear]);

  useEffect(() => () => cancelScheduledClear(), [cancelScheduledClear]);

  const filteredDestinations = useMemo(
    () =>
      regionFilter === "all"
        ? EXPORT_DESTINATIONS
        : EXPORT_DESTINATIONS.filter((d) => d.region === regionFilter),
    [regionFilter]
  );

  const activeDestination: ExportDestination | null = useMemo(() => {
    if (!activeIso || activeIso === ORIGIN.iso) return null;
    return EXPORT_DESTINATIONS.find((d) => d.iso === activeIso) ?? null;
  }, [activeIso]);

  return (
    <section
      id="global-reach"
      className="relative py-14 sm:py-20 lg:py-32 overflow-hidden grain"
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={backgrounds.trust}
          alt=""
          fill
          className="object-cover scale-105"
          sizes="100vw"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-deep/95 via-green-forest/92 to-green-deep/98" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Global Ginger Export"
          title="Our Reach Across the World"
          description="From Karnataka's fertile farms, we export premium ginger to 28+ countries — traceable supply routes spanning the Americas, Europe, Middle East, and Asia-Pacific."
          align="center"
          light
        />

        <div className="mt-8 sm:mt-10 flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center sm:flex-wrap sm:overflow-visible -mx-1 px-1">
          <button
            type="button"
            onClick={() => setRegionFilter("all")}
            className={`px-3.5 sm:px-4 py-2 text-[10px] sm:text-xs font-semibold tracking-wide uppercase rounded-full border transition-all shrink-0 ${
              regionFilter === "all"
                ? "bg-orange-accent text-white border-orange-accent"
                : "bg-white/8 text-white/70 border-white/15 hover:border-gold/40"
            }`}
          >
            All Regions
          </button>
          {REGION_LABELS.map((region) => (
            <button
              key={region}
              type="button"
              onClick={() => setRegionFilter(region)}
              className={`px-3.5 sm:px-4 py-2 text-[10px] sm:text-xs font-semibold tracking-wide uppercase rounded-full border transition-all shrink-0 ${
                regionFilter === region
                  ? "bg-white/15 text-white border-gold/50"
                  : "bg-white/8 text-white/70 border-white/15 hover:border-gold/40"
              }`}
              style={
                regionFilter === region
                  ? { borderColor: REGION_COLORS[region], color: REGION_COLORS[region] }
                  : undefined
              }
            >
              {region}
            </button>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Map */}
          <div
            className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-white/10 bg-green-deep/40 backdrop-blur-sm shadow-2xl shadow-black/30 min-h-[220px]"
            onMouseEnter={cancelScheduledClear}
            onMouseLeave={scheduleClear}
          >
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full bg-green-deep/80 border border-gold/30 text-gold text-[10px] sm:text-xs font-semibold tracking-wider uppercase backdrop-blur-sm max-w-[calc(100%-1rem)]">
              <MapPinIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span className="truncate">Origin: Karnataka</span>
            </div>

            {mapReady ? (
              <ComposableMap
                projection="geoEqualEarth"
                projectionConfig={{ scale: mapScale, center: [20, 5] }}
                width={800}
                height={480}
                className="w-full h-auto touch-pan-y"
              >
                <Sphere fill="#142e28" stroke="#2d4f3e" strokeWidth={0.5} />
                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <MapCountry
                        key={geo.rsmKey}
                        geography={geo}
                        activeIso={activeIso}
                        onActivate={activateCountry}
                      />
                    ))
                  }
                </Geographies>

                <ExportArcs activeIso={activeIso} />
                <DestinationMarkers activeIso={activeIso} onSelect={activateCountry} />
              </ComposableMap>
            ) : (
              <div
                className="w-full aspect-[5/3] bg-[#142e28]"
                aria-hidden="true"
              />
            )}

            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 hidden sm:flex flex-wrap gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-green-deep/70 backdrop-blur-sm border border-white/10">
              {REGION_LABELS.map((region) => (
                <div key={region} className="flex items-center gap-1.5 text-[9px] sm:text-[10px] text-white/70">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: REGION_COLORS[region] }}
                  />
                  {region}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="p-6 rounded-2xl bg-white/8 border border-white/12 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-accent/20 flex items-center justify-center text-gold">
                  <GlobeIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-serif text-2xl text-white font-semibold">28+</p>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-white/50 font-semibold">
                    Export Countries
                  </p>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Premium ginger, ginger coffee, and spices — cold-chain shipped from Mangalore &
                Chennai ports to importers worldwide.
              </p>
            </div>

            <div className="relative min-h-[148px]">
              <div
                className={`p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-opacity duration-150 ${
                  activeDestination
                    ? "opacity-0 pointer-events-none absolute inset-0"
                    : "opacity-100"
                }`}
              >
                <p className="text-white/50 text-sm">
                  Hover or tap a country on the map to explore our export destinations. Orange
                  marker shows our origin in Karnataka, India.
                </p>
              </div>
              <div
                className={`p-6 rounded-2xl bg-orange-accent/15 border border-orange-accent/30 backdrop-blur-md transition-opacity duration-150 ${
                  activeDestination
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none absolute inset-0"
                }`}
              >
                {activeDestination && (
                  <>
                    <p className="text-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
                      {activeDestination.region}
                    </p>
                    <h3 className="font-serif text-2xl text-white font-semibold mb-2">
                      {activeDestination.name}
                    </h3>
                    <p className="text-white/65 text-sm leading-relaxed">
                      Active export market for Liam6Agro premium ginger products — fresh rhizomes,
                      powder, dried slices, and spice blends.
                    </p>
                  </>
                )}
              </div>
            </div>

            <div
              className="p-4 sm:p-5 rounded-2xl bg-white/6 border border-white/10 backdrop-blur-md max-h-[240px] sm:max-h-[280px] overflow-y-auto"
              onMouseEnter={cancelScheduledClear}
              onMouseLeave={scheduleClear}
            >
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold mb-3">
                {regionFilter === "all" ? "All Markets" : regionFilter}
              </p>
              <ul className="space-y-2">
                {filteredDestinations.map((dest) => (
                  <li key={dest.iso}>
                    <button
                      type="button"
                      onMouseEnter={() => activateCountry(dest.iso)}
                      onFocus={() => activateCountry(dest.iso)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm ${
                        activeIso === dest.iso
                          ? "bg-white/12 text-white"
                          : "text-white/60 hover:bg-white/6 hover:text-white/90"
                      }`}
                    >
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: REGION_COLORS[dest.region] }}
                      />
                      {dest.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
