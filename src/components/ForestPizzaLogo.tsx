"use client";

import React from "react";

interface ForestPizzaLogoProps {
  className?: string;
  imgClassName?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

/**
 * High-resolution studio brand logo "FOREST 🍕 PIZZA TO GO"
 * matching the official Forest Pizza menu board.
 */
export function ForestPizzaLogo({ className = "", imgClassName = "", size = "md" }: ForestPizzaLogoProps) {
  const heightClass =
    size === "sm"
      ? "h-6 sm:h-7"
      : size === "lg"
      ? "h-9 sm:h-12"
      : size === "xl"
      ? "h-12 sm:h-16"
      : "h-6 sm:h-8 md:h-9";

  return (
    <div className={`inline-flex items-center select-none shrink-0 ${className}`}>
      <img
        src="/images/forest-pizza-logo.png"
        alt="Forest Pizza To Go"
        width={1262}
        height={210}
        className={`${heightClass} w-auto object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] ${imgClassName}`}
      />
    </div>
  );
}
