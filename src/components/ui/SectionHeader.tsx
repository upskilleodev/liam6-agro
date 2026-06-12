type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  titleId?: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  titleId,
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
        id={titleId}
        className={`font-serif text-[clamp(1.65rem,5vw,3.25rem)] leading-[1.12] font-semibold tracking-tight ${
          light ? "text-white" : "text-brown-primary"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-[15px] sm:text-lg leading-relaxed ${
            light ? "text-white/90" : "text-brown-primary/65"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
