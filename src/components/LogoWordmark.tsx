"use client";

import { useState } from "react";
import Image from "next/image";
import { LogoMark } from "./icons";

const WORDMARK_SRC = "/icons/logo-header.png";

type LogoWordmarkProps = {
  className?: string;
};

/** Full horizontal lockup — emblem + Liam6Agro + EXPORTS label */
export function LogoWordmark({ className = "" }: LogoWordmarkProps) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div className={`flex items-center gap-2.5 sm:gap-3 min-w-0 ${className}`}>
        <LogoMark className="w-10 h-10 sm:w-11 sm:h-11 text-gold/85 shrink-0" />
        <div className="flex flex-col justify-center min-w-0">
          <span className="font-serif text-xl sm:text-2xl font-semibold text-white tracking-tight leading-none">
            Liam6Agro
          </span>
          <span className="mt-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-gold/90 leading-none">
            Exports
          </span>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={WORDMARK_SRC}
      alt="Liam6Agro Exports"
      width={260}
      height={64}
      priority
      className={`h-9 sm:h-10 lg:h-11 w-auto object-contain object-left mix-blend-lighten ${className}`}
      onError={() => setImgError(true)}
    />
  );
}
