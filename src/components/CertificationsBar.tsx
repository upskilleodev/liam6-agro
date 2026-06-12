import Image from "next/image";
import { backgrounds } from "@/lib/images";
import { GlobeIcon } from "./icons";

const highlights = [
  "Liam6 Agro Exports",
  "Karnataka Ginger Worldwide",
  "Premium Organic Exports",
  "Established 2013",
  "28+ Countries Served",
  "Farm to Global Tables",
  "Direct Farm Sourcing",
  "Export-Grade Quality",
];

export function CertificationsBar() {
  const items = [...highlights, ...highlights];

  return (
    <section
      id="highlights"
      className="relative shrink-0 overflow-hidden border-y border-brown-warm/30 z-10"
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={backgrounds.certifications}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-brown-primary/88" />
      </div>

      <div className="relative py-3 sm:py-4 overflow-hidden">
        <div className="flex w-max animate-marquee">
          {items.map((label, i) => (
            <div
              key={`${label}-${i}`}
              className="flex items-center gap-2.5 px-8 text-white/90 shrink-0"
            >
              <GlobeIcon className="text-gold shrink-0 w-4 h-4" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.14em] uppercase">
                {label}
              </span>
              <span className="text-gold/40 mx-2">·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
