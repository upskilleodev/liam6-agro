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

/** Orthographic globe — Karnataka at the center of the view */
const ORTHOGRAPHIC_ROTATE: [number, number, number] = [
  -ORIGIN.coordinates[0],
  -ORIGIN.coordinates[1],
  0,
];

function getGlobeScale(size: number) {
  return Math.round(size * 0.76);
}

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
      onClick={() => {
        if (iso && (isExport || isOrigin)) onActivate(iso);
      }}
      style={{
        ...geographyStyle,
        default: {
          ...geographyStyle.default,
          fill,
          fillOpacity: isHighlighted || isOrigin ? 1 : isExport ? 0.8 : 0.4,
          stroke: isHighlighted ? "#f9f7f2" : "#e2c88a",
          strokeWidth: isHighlighted ? 0.8 : 0.4,
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
    <g className="export-arcs" fill="none" aria-hidden="true">
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
            strokeWidth={isActive ? 3 : 2.2}
            strokeOpacity={dimmed ? 0.18 : isActive ? 0.85 : 0.45}
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
          tabIndex={0}
          aria-label={ORIGIN.name}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onSelect(ORIGIN.iso);
          }}
        >
          <circle r={16} fill="#d4843e" opacity={0.25} className="animate-map-pulse" />
          <circle r={9} fill="#d4843e" stroke="#f9f7f2" strokeWidth={2} />
          <circle r={3.5} fill="#f9f7f2" />
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
              tabIndex={0}
              aria-label={dest.name}
              aria-pressed={isActive}
              opacity={dimmed ? 0.45 : 1}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onSelect(dest.iso);
              }}
            >
              {isActive && (
                <circle r={12} fill={color} opacity={0.3} className="animate-map-pulse" />
              )}
              <circle
                r={isActive ? 6 : 4.5}
                fill={color}
                stroke="#f9f7f2"
                strokeWidth={1.8}
              />
            </g>
          </Marker>
        );
      })}
    </>
  );
}

export function GlobalExportMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [activeIso, setActiveIso] = useState<string | null>(null);
  const [regionFilter, setRegionFilter] = useState<ExportRegion | "all">("all");
  const [mapReady, setMapReady] = useState(false);
  const [mapDimensions, setMapDimensions] = useState({ width: 360, height: 360 });
  const [isMobile, setIsMobile] = useState(false);
  const [marketsExpanded, setMarketsExpanded] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 640);
    update();
    setMapReady(true);
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const el = mapContainerRef.current;
    if (!el || !mapReady) return;

    const updateSize = () => {
      const width = el.clientWidth;
      const height = el.clientHeight;
      if (width > 0 && height > 0) {
        setMapDimensions({ width, height });
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(el);
    return () => observer.disconnect();
  }, [mapReady]);

  useEffect(() => {
    setMarketsExpanded(false);
  }, [regionFilter]);

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

  const MOBILE_MARKETS_PREVIEW = 6;
  const visibleMarkets =
    isMobile && !marketsExpanded
      ? filteredDestinations.slice(0, MOBILE_MARKETS_PREVIEW)
      : filteredDestinations;
  const hiddenMarketsCount = filteredDestinations.length - MOBILE_MARKETS_PREVIEW;
  const globeScale = getGlobeScale(Math.min(mapDimensions.width, mapDimensions.height));

  return (
    <section
      id="global-reach"
      aria-labelledby="global-reach-heading"
      className="relative py-14 sm:py-20 lg:py-32 pb-24 sm:pb-20 lg:pb-32 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <Image
          src={backgrounds.trust}
          alt=""
          fill
          className="object-cover scale-105 opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-green-deep/94" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Global Ginger Export"
          title="Our Reach Across the World"
          titleId="global-reach-heading"
          description="From Karnataka's fertile farms, we export premium ginger to 28+ countries — traceable supply routes spanning the Americas, Europe, Middle East, and Asia-Pacific."
          align="center"
          light
        />

        <div
          className="mt-6 sm:mt-10 flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1 sm:flex-wrap sm:justify-center sm:overflow-visible"
          role="group"
          aria-label="Filter export regions"
        >
          <button
            type="button"
            onClick={() => setRegionFilter("all")}
            aria-pressed={regionFilter === "all"}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold tracking-wide uppercase rounded-full border transition-all shrink-0 touch-manipulation ${
              regionFilter === "all"
                ? "bg-orange-accent text-white border-orange-accent shadow-md"
                : "bg-white/18 text-white border-white/35 hover:bg-white/25"
            }`}
          >
            All Regions
          </button>
          {REGION_LABELS.map((region) => (
            <button
              key={region}
              type="button"
              onClick={() => setRegionFilter(region)}
              aria-pressed={regionFilter === region}
              className={`px-4 py-2.5 text-xs sm:text-sm font-semibold tracking-wide uppercase rounded-full border transition-all shrink-0 touch-manipulation ${
                regionFilter === region
                  ? "bg-white text-green-deep border-white shadow-md"
                  : "bg-white/18 text-white border-white/35 hover:bg-white/25"
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        <div className="mt-6 sm:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-10 items-start">
          {/* Map first on mobile */}
          <div
            className="lg:col-span-8 lg:col-start-1 order-1 relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/30 bg-[#142e28] shadow-2xl shadow-black/30"
            onMouseEnter={cancelScheduledClear}
            onMouseLeave={scheduleClear}
          >
            <div
              ref={mapContainerRef}
              className="relative w-full aspect-square sm:aspect-[16/10] bg-[#142e28]"
            >
              <div
                className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-lg bg-green-deep/95 border border-gold/55 text-gold-light text-sm sm:text-base font-bold tracking-wide uppercase shadow-lg max-w-[calc(100%-1.5rem)]"
              >
                <MapPinIcon className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>Origin: Karnataka</span>
              </div>

              {mapReady && (
                <ComposableMap
                  projection="geoOrthographic"
                  projectionConfig={{
                    rotate: ORTHOGRAPHIC_ROTATE,
                    scale: globeScale,
                  }}
                  width={mapDimensions.width}
                  height={mapDimensions.height}
                  className="w-full h-full block touch-pan-y"
                  aria-label="World map showing Liam6Agro export destinations"
                >
                  <Sphere fill="#142e28" stroke="#6d9078" strokeWidth={0.9} />
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
              )}
            </div>

            <div
              className="px-4 py-3.5 sm:py-3 bg-green-deep border-t border-white/25 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-5 sm:gap-y-2"
              aria-label="Region legend"
            >
              {REGION_LABELS.map((region) => (
                <div
                  key={region}
                  className="flex items-center gap-2.5 text-sm sm:text-base text-white font-semibold"
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full shrink-0 ring-2 ring-white/35"
                    style={{ backgroundColor: REGION_COLORS[region] }}
                  />
                  {region}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar below map on mobile */}
          <div className="lg:col-span-4 lg:col-start-9 order-2 flex flex-col gap-4 sm:gap-5">
            <div className="p-5 sm:p-6 rounded-2xl bg-white/14 border border-white/25 shadow-lg shadow-black/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-orange-accent/30 flex items-center justify-center text-gold-light shrink-0">
                  <GlobeIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-serif text-3xl text-white font-semibold leading-none">28+</p>
                  <p className="text-xs tracking-[0.12em] uppercase text-white/85 font-semibold mt-1">
                    Export Countries
                  </p>
                </div>
              </div>
              <p className="text-white/90 text-[15px] sm:text-base leading-relaxed">
                Premium ginger, ginger coffee, and spices — cold-chain shipped from Mangalore &
                Chennai ports to importers worldwide.
              </p>
            </div>

            <div
              className="p-5 sm:p-6 rounded-2xl border shadow-lg shadow-black/15 min-h-[120px]"
              aria-live="polite"
              aria-atomic="true"
            >
              {activeDestination ? (
                <div className="bg-orange-accent/20 border border-orange-accent/40 rounded-2xl p-5 sm:p-6 -m-5 sm:-m-6">
                  <p className="text-gold-light text-xs font-bold tracking-[0.15em] uppercase mb-2">
                    {activeDestination.region}
                  </p>
                  <h3 className="font-serif text-2xl text-white font-semibold mb-2">
                    {activeDestination.name}
                  </h3>
                  <p className="text-white/90 text-[15px] leading-relaxed">
                    Active export market for Liam6Agro premium ginger — fresh rhizomes, powder,
                    dried slices, and spice blends.
                  </p>
                </div>
              ) : (
                <div className="bg-white/12 border border-white/20 rounded-2xl p-5 sm:p-6 -m-5 sm:-m-6">
                  <p className="text-white/90 text-[15px] sm:text-base leading-relaxed">
                    Tap a country on the map or pick from the list below to explore our export
                    destinations. The orange marker shows our origin in Karnataka, India.
                  </p>
                </div>
              )}
            </div>

            <div
              className="p-4 sm:p-5 rounded-2xl bg-white/12 border border-white/22 max-h-[220px] sm:max-h-[280px] overflow-y-auto"
              onMouseEnter={cancelScheduledClear}
              onMouseLeave={scheduleClear}
            >
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-gold-light mb-3">
                {regionFilter === "all" ? "All Markets" : regionFilter}
              </p>
              <ul className="space-y-1">
                {visibleMarkets.map((dest) => (
                  <li key={dest.iso}>
                    <button
                      type="button"
                      onClick={() => activateCountry(dest.iso)}
                      onMouseEnter={() => activateCountry(dest.iso)}
                      onFocus={() => activateCountry(dest.iso)}
                      aria-pressed={activeIso === dest.iso}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left text-base touch-manipulation ${
                        activeIso === dest.iso
                          ? "bg-white/20 text-white font-medium"
                          : "text-white/90 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full shrink-0 ring-1 ring-white/40"
                        style={{ backgroundColor: REGION_COLORS[dest.region] }}
                      />
                      {dest.name}
                    </button>
                  </li>
                ))}
              </ul>
              {isMobile && !marketsExpanded && hiddenMarketsCount > 0 && (
                <button
                  type="button"
                  onClick={() => setMarketsExpanded(true)}
                  className="mt-3 w-full py-3 text-sm font-semibold text-gold-light border border-white/25 rounded-lg touch-manipulation"
                >
                  Show {hiddenMarketsCount} more countries
                </button>
              )}
              {isMobile && marketsExpanded && filteredDestinations.length > MOBILE_MARKETS_PREVIEW && (
                <button
                  type="button"
                  onClick={() => setMarketsExpanded(false)}
                  className="mt-3 w-full py-2 text-sm font-semibold text-white/70 touch-manipulation"
                >
                  Show less
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
