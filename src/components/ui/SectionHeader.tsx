type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div className={centered ? "text-center max-w-3xl mx-auto" : "max-w-2xl"}>
      <div
        className={`flex items-center gap-3 mb-4 ${centered ? "justify-center" : ""}`}
      >
        <span className="h-px w-8 bg-orange-accent" aria-hidden="true" />
        <p
          className={`text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] sm:tracking-[0.25em] uppercase ${
            light ? "text-gold" : "text-orange-accent"
          }`}
        >
          {eyebrow}
        </p>
        <span className="h-px w-8 bg-orange-accent" aria-hidden="true" />
      </div>
      <h2
        className={`font-serif text-[clamp(1.65rem,5vw,3.25rem)] leading-[1.12] font-semibold tracking-tight ${
          light ? "text-white" : "text-brown-primary"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed ${
            light ? "text-white/75" : "text-brown-primary/65"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
