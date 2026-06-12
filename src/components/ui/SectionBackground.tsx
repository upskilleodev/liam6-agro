import Image from "next/image";

type SectionBackgroundProps = {
  src: string;
  alt?: string;
  overlay?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  /** Secondary layer behind main photo (e.g. botanical pattern) */
  accentSrc?: string;
  accentOpacity?: number;
  /** Decorative layer above overlay — stays visible on light sections */
  patternSrc?: string;
  patternOpacity?: number;
};

export function SectionBackground({
  src,
  alt = "",
  overlay = "from-cream/94 via-cream/88 to-cream/94",
  className = "",
  imageClassName = "object-cover",
  priority = false,
  accentSrc,
  accentOpacity = 0.35,
  patternSrc,
  patternOpacity = 0.22,
}: SectionBackgroundProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden={!alt}
    >
      {accentSrc && (
        <Image
          src={accentSrc}
          alt=""
          fill
          priority={priority}
          className="object-cover object-center"
          sizes="100vw"
          style={{ opacity: accentOpacity }}
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={`${imageClassName} ${accentSrc ? "mix-blend-soft-light opacity-80" : "scale-105"}`}
        sizes="100vw"
      />
      <div className={`absolute inset-0 bg-gradient-to-b ${overlay}`} />
      {patternSrc && (
        <Image
          src={patternSrc}
          alt=""
          fill
          className="object-cover object-center mix-blend-multiply"
          sizes="100vw"
          style={{ opacity: patternOpacity }}
        />
      )}
    </div>
  );
}
