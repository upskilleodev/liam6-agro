import { sections } from "@/lib/images";

/** One hero photo, identical crop on every device via CSS background. */
export function HeroBackground() {
  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden bg-green-deep pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 hero-bg-layer"
        style={{ backgroundImage: `url(${sections.hero})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-green-deep/88 via-green-forest/72 to-green-deep/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-green-deep/75 via-transparent to-green-deep/25" />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 40%, transparent 0%, var(--green-deep) 100%)",
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-transparent to-brown-primary/35" />
    </div>
  );
}
