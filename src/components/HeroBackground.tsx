import Image from "next/image";
import { sections } from "@/lib/images";

/** Responsive hero photography — separate crops for mobile portrait vs desktop landscape. */
export function HeroBackground() {
  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden bg-green-deep pointer-events-none"
      aria-hidden="true"
    >
      <Image
        src={sections.heroMobile}
        alt=""
        fill
        priority
        className="object-cover object-center sm:hidden"
        sizes="100vw"
      />
      <Image
        src={sections.heroDesktop}
        alt=""
        fill
        priority
        className="object-cover object-[72%_38%] hidden sm:block"
        sizes="100vw"
      />

      {/* Left vignette — headline legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-green-deep/92 via-green-deep/55 to-transparent sm:from-green-deep/88 sm:via-green-deep/45 sm:to-transparent"
      />
      {/* Top — navbar contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-deep/50 via-transparent to-transparent" />
      {/* Bottom — certifications bar blend */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brown-primary/40 to-transparent" />

      {/* Subtle gold warmth */}
      <div
        className="absolute inset-0 opacity-[0.14] mix-blend-soft-light"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 75% 45%, rgba(201, 169, 98, 0.35) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
