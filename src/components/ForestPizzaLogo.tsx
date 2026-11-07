"use client";

import React from "react";

interface ForestPizzaLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

/**
 * High-resolution studio brand logo "FOREST 🍕 PIZZA TO GO"
 * matching the official Forest Pizza menu board.
 */
export function ForestPizzaLogo({ className = "", size = "md" }: ForestPizzaLogoProps) {
  const heightClass =
    size === "sm"
      ? "h-7 sm:h-8"
      : size === "lg"
      ? "h-11 sm:h-14 md:h-16"
      : size === "xl"
      ? "h-14 sm:h-20 md:h-24"
      : "h-8 sm:h-10 md:h-11";

  return (
    <div className={`inline-flex items-center select-none shrink-0 ${className}`}>
      <img
        src="/images/forest-pizza-logo.png"
        alt="Forest Pizza To Go"
        width={1262}
        height={210}
        className={`${heightClass} w-auto object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.55)]`}
      />
    </div>
  );
}
