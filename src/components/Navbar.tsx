"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Phone, Menu, X, Flame, MapPin, Store } from "lucide-react";

interface NavbarProps {
  restaurantPhone?: string;
  workingHours?: string;
}

export function Navbar({
  restaurantPhone = "+380 (97) 845-12-34",
  workingHours = "10:00 - 22:00",
}: NavbarProps) {
  const { totalCount, totalPrice, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0c0e12]/95 backdrop-blur-xl border-b border-[#232832] shadow-lg shadow-black/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-orange-950/60 border border-orange-400/40 group-hover:scale-105 transition-transform shrink-0">
              <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white/20" />
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="font-black text-lg sm:text-2xl tracking-wider text-white">
                  FOREST
                </span>
                <span className="font-black text-lg sm:text-2xl tracking-wider text-orange-500">
                  PIZZA
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-bold text-stone-400 whitespace-nowrap flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-orange-500 shrink-0" />
                <span>Лісовий просп., 11</span>
                <span className="hidden xs:inline text-orange-400">• На винос</span>
              </p>
            </div>
          </Link>

          {/* Desktop Navigation (lg+) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-[#14171f] border border-[#242936] rounded-2xl p-1.5">
            <button
              onClick={() => scrollTo("menu")}
              className="px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold text-stone-200 hover:text-white hover:bg-[#1e232f] transition-all whitespace-nowrap cursor-pointer"
            >
              🍕 Меню піци (22)
            </button>
            <button
              onClick={() => scrollTo("takeaway")}
              className="px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold text-stone-200 hover:text-white hover:bg-[#1e232f] transition-all whitespace-nowrap cursor-pointer"
            >
              🛍️ Замовити на час
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold text-stone-200 hover:text-white hover:bg-[#1e232f] transition-all whitespace-nowrap cursor-pointer"
            >
              🔥 Про піцерію
            </button>
            <button
              onClick={() => scrollTo("location")}
              className="px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold text-stone-200 hover:text-white hover:bg-[#1e232f] transition-all whitespace-nowrap cursor-pointer"
            >
              📍 Локація
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Phone Call Button */}
            <a
              href={`tel:${restaurantPhone.replace(/\s+/g, "")}`}
              className="hidden sm:flex items-center gap-2 text-xs font-bold text-stone-200 hover:text-orange-400 bg-[#151820] hover:bg-[#1d222d] border border-[#282e3b] px-3 py-2.5 rounded-xl transition-all whitespace-nowrap"
              title={`Зателефонувати: ${restaurantPhone}`}
            >
              <Phone className="w-4 h-4 text-orange-400 shrink-0" />
              <span className="hidden xl:inline">{restaurantPhone}</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#151820] hover:bg-[#1d222d] text-white border border-[#282e3b] transition-all cursor-pointer whitespace-nowrap"
              aria-label="Кошик замовлень"
            >
              <ShoppingBag className="w-5 h-5 text-orange-400 shrink-0" />
              {totalCount > 0 ? (
                <span className="text-xs font-black text-orange-400 hidden sm:inline">
                  {totalPrice} ₴
                </span>
              ) : null}
              {totalCount > 0 && (
                <span className="bg-orange-500 text-white font-black text-[11px] min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center shadow-md shadow-orange-950">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Primary Takeaway CTA (Desktop/Tablet) */}
            <button
              onClick={() => scrollTo("takeaway")}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-orange-950/50 transition-all hover:scale-[1.02] cursor-pointer whitespace-nowrap"
            >
              <Store className="w-4 h-4 text-white shrink-0" />
              <span>На винос</span>
            </button>

            {/* Mobile/Tablet Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-[#151820] text-stone-200 hover:text-white border border-[#282e3b]"
              aria-label="Меню навігації"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#232832] flex flex-col gap-2 animate-fadeIn">
            <div className="px-3 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-between text-xs">
              <span className="font-bold text-orange-300">🛍️ Працюємо тільки на винос</span>
              <span className="text-stone-300 font-semibold">{workingHours}</span>
            </div>

            <button
              onClick={() => scrollTo("menu")}
              className="text-left px-3.5 py-2.5 text-sm font-bold text-stone-200 hover:bg-[#181c24] hover:text-orange-400 rounded-xl transition-colors"
            >
              🍕 Меню піци (усі 22 види)
            </button>
            <button
              onClick={() => scrollTo("takeaway")}
              className="text-left px-3.5 py-2.5 text-sm font-bold text-stone-200 hover:bg-[#181c24] hover:text-orange-400 rounded-xl transition-colors"
            >
              ⏰ Замовити на винос на точний час
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="text-left px-3.5 py-2.5 text-sm font-bold text-stone-200 hover:bg-[#181c24] hover:text-orange-400 rounded-xl transition-colors"
            >
              🔥 Про нашу випічку та бортики
            </button>
            <button
              onClick={() => scrollTo("location")}
              className="text-left px-3.5 py-2.5 text-sm font-bold text-stone-200 hover:bg-[#181c24] hover:text-orange-400 rounded-xl transition-colors"
            >
              📍 Як нас знайти (Лісовий просп., 11)
            </button>

            <div className="pt-2 border-t border-[#232832] grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href={`tel:${restaurantPhone.replace(/\s+/g, "")}`}
                className="flex items-center justify-center gap-2 text-sm font-bold text-orange-400 bg-[#151820] py-2.5 rounded-xl border border-[#282e3b]"
              >
                <Phone className="w-4 h-4 text-orange-500" />
                <span>{restaurantPhone}</span>
              </a>
              <button
                onClick={() => scrollTo("takeaway")}
                className="w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black py-2.5 rounded-xl shadow-md text-sm"
              >
                Замовити на винос
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
