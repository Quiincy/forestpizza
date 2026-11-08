"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 320px
      if (window.scrollY > 320) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Повернутися до верху"
      className={`fixed right-3.5 sm:right-6 bottom-20 sm:bottom-6 z-40 p-3 sm:p-3.5 rounded-2xl bg-[#141720]/90 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 text-orange-400 hover:text-white border border-orange-500/40 hover:border-orange-400 shadow-2xl shadow-black/90 backdrop-blur-md transition-all duration-300 group cursor-pointer active:scale-90 ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
    </button>
  );
}
