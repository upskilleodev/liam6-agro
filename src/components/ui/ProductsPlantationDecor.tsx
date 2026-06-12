/** Soft corner plantation line art — sits above section bg, below content */
export function ProductsPlantationDecor() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <svg
        className="absolute -left-8 bottom-[8%] w-[min(42vw,280px)] h-auto opacity-[0.07] text-green-deep"
        viewBox="0 0 200 240"
        fill="currentColor"
      >
        <path d="M30 220c18-42 12-78-8-108 10 26 6 56-4 86 16-22 36-32 62-28-26 6-48 22-64 42 22-12 42-12 62 4-24 4-44 16-58 34z" />
        <path d="M55 120c-4 18-2 34 6 48-6-8-8-20-4-32 6 4 12 6 22 2-8 2-14 8-18 16 6-4 12-4 18 2-8 2-14 6-18 12z" opacity="0.7" />
      </svg>
      <svg
        className="absolute -right-6 top-[12%] w-[min(38vw,260px)] h-auto opacity-[0.06] text-green-forest"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <path d="M160 30c-14 32-10 62 8 88-12-22-8-48 4-72-16 18-38 26-64 22 22-4 40-18 52-38-18 10-34 10-50-2 16 2 30 10 40 22z" />
      </svg>
      <svg
        className="absolute left-[18%] top-[6%] w-[min(28vw,180px)] h-auto opacity-[0.05] text-gold"
        viewBox="0 0 120 120"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M10 90 Q40 70 70 82 T110 88" />
        <path d="M20 105 Q55 88 90 98 T115 102" opacity="0.7" />
        <ellipse cx="60" cy="55" rx="22" ry="14" opacity="0.5" />
      </svg>
    </div>
  );
}
