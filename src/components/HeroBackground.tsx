import Image from "next/image";
import { sections } from "@/lib/images";

/**
 * One hero photo + same crop/grade on all breakpoints.
 * (The old heroFarm layer made mobile look like a different scene.)
 */
export function HeroBackground() {
  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden bg-green-deep pointer-events-none"
      aria-hidden="true"
    >
      <Image
        src={sections.hero}
        alt=""
        fill
        priority
        className="hero-bg-photo object-cover scale-105"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-green-deep/92 via-green-forest/78 to-green-deep/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-green-deep/80 via-transparent to-green-deep/30" />
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 40%, transparent 0%, var(--green-deep) 100%)",
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-transparent to-brown-primary/35" />
    </div>
  );
}
