"use client";

import { useState } from "react";
import Image from "next/image";
import { LogoMark } from "./icons";

type LogoProps = {
  className?: string;
  variant?: "light" | "dark" | "gold";
  /** Removes black PNG matte on dark green/brown backgrounds */
  onDark?: boolean;
};

const emblemSrc = {
  gold: "/icons/logo-emblem.png",
  light: "/icons/logo-emblem.png",
  dark: "/icons/logo-dark.png",
} as const;

export function Logo({
  className = "w-9 h-9",
  variant = "gold",
  onDark = false,
}: LogoProps) {
  const [imgError, setImgError] = useState(false);
  const src = emblemSrc[variant] ?? emblemSrc.gold;

  const colorClass =
    variant === "dark"
      ? "text-green-deep"
      : variant === "light"
        ? "text-gold/85"
        : "text-gold/85";

  if (imgError) {
    return <LogoMark className={`${colorClass} ${className}`} />;
  }

  return (
    <Image
      src={src}
      alt=""
      width={44}
      height={44}
      className={`object-contain ${onDark ? "mix-blend-lighten" : ""} ${className}`}
      aria-hidden
      onError={() => setImgError(true)}
    />
  );
}
