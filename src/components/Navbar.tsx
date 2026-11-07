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
    <header className="sticky top-0 z-40 bg-[#0d0f11]/95 backdrop-blur-md border-b border-[#242830] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo with Orange Flame Emblem */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-orange-950/50 border border-orange-400/40 group-hover:scale-105 transition-transform">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl sm:text-2xl tracking-wider text-white">
                  FOREST
                </span>
                <span className="font-extrabold text-xl sm:text-2xl tracking-wider text-orange-500">
                  PIZZA
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-bold text-orange-400/90 uppercase tracking-widest flex items-center gap-1">
                <MapPin className="w-3 h-3 inline text-orange-500" /> Лісовий просп., 11 • Тільки на винос
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollTo("menu")}
              className="text-sm font-bold text-neutral-300 hover:text-orange-400 transition-colors cursor-pointer"
            >
              Меню піци (22 види)
            </button>
            <button
              onClick={() => scrollTo("takeaway")}
              className="text-sm font-bold text-neutral-300 hover:text-orange-400 transition-colors cursor-pointer"
            >
              Замовлення на винос
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="text-sm font-bold text-neutral-300 hover:text-orange-400 transition-colors cursor-pointer"
            >
              Про пекарню
            </button>
            <button
              onClick={() => scrollTo("location")}
              className="text-sm font-bold text-neutral-300 hover:text-orange-400 transition-colors cursor-pointer"
            >
              Точка самовивозу
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${restaurantPhone.replace(/\s+/g, "")}`}
              className="flex items-center gap-2 text-xs font-bold text-neutral-200 hover:text-orange-300 bg-[#171a1f] border border-[#2b303a] px-3.5 py-2 rounded-xl transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-orange-400" />
              <span>{restaurantPhone}</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-[#171a1f] hover:bg-[#22272f] text-white border border-[#2b303a] transition-all hover:scale-105 cursor-pointer"
              aria-label="Кошик замовлень"
            >
              <ShoppingBag className="w-5 h-5 text-orange-400" />
              {totalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow-md shadow-orange-950">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Order Takeaway Button */}
            <button
              onClick={() => scrollTo("takeaway")}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md shadow-orange-950/50 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Store className="w-4 h-4 text-white" />
              <span>Замовити на винос</span>
            </button>
          </div>

          {/* Mobile hamburger & cart */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-[#171a1f] text-white border border-[#2b303a]"
              aria-label="Відкрити кошик"
            >
              <ShoppingBag className="w-5 h-5 text-orange-400" />
              {totalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[#171a1f] text-neutral-200 border border-[#2b303a]"
              aria-label="Меню навігації"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#242830] flex flex-col gap-2.5 animate-fadeIn">
            <button
              onClick={() => scrollTo("menu")}
              className="text-left px-3.5 py-2.5 text-sm font-bold text-neutral-200 hover:bg-[#1a1e24] hover:text-orange-400 rounded-xl"
            >
              🍕 Меню (22 фірмові піци)
            </button>
            <button
              onClick={() => scrollTo("takeaway")}
              className="text-left px-3.5 py-2.5 text-sm font-bold text-neutral-200 hover:bg-[#1a1e24] hover:text-orange-400 rounded-xl"
            >
              🛍️ Замовлення на винос (самовивіз)
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="text-left px-3.5 py-2.5 text-sm font-bold text-neutral-200 hover:bg-[#1a1e24] hover:text-orange-400 rounded-xl"
            >
              🔥 Про нашу випічку та бортики
            </button>
            <button
              onClick={() => scrollTo("location")}
              className="text-left px-3.5 py-2.5 text-sm font-bold text-neutral-200 hover:bg-[#1a1e24] hover:text-orange-400 rounded-xl"
            >
              📍 Точка видачі на карті
            </button>
            <div className="pt-2 border-t border-[#242830] flex flex-col gap-2">
              <a
                href={`tel:${restaurantPhone.replace(/\s+/g, "")}`}
                className="flex items-center justify-center gap-2 text-sm font-bold text-orange-400 bg-[#171a1f] py-2.5 rounded-xl border border-[#2b303a]"
              >
                <Phone className="w-4 h-4 text-orange-500" />
                <span>{restaurantPhone}</span>
              </a>
              <button
                onClick={() => scrollTo("takeaway")}
                className="w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black py-2.5 rounded-xl shadow-md"
              >
                Замовити на винос онлайн
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
