"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Calendar, Phone, Menu, X, TreePine, MapPin } from "lucide-react";

interface NavbarProps {
  restaurantPhone?: string;
  workingHours?: string;
}

export function Navbar({ restaurantPhone = "+380 (97) 845-12-34", workingHours = "10:00 - 22:00" }: NavbarProps) {
  const { totalCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#07130f]/90 backdrop-blur-md border-b border-[#183e30] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-900 flex items-center justify-center text-amber-400 shadow-lg shadow-emerald-950/40 border border-emerald-500/30 group-hover:scale-105 transition-transform">
              <TreePine className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl sm:text-2xl tracking-wider text-white">
                  FOREST
                </span>
                <span className="font-extrabold text-xl sm:text-2xl tracking-wider text-amber-400">
                  PIZZA
                </span>
              </div>
              <p className="text-[11px] font-medium text-emerald-400/80 uppercase tracking-widest flex items-center gap-1">
                <MapPin className="w-3 h-3 inline text-amber-400" /> Лісовий просп., 11
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollTo("menu")}
              className="text-sm font-semibold text-emerald-100/90 hover:text-amber-400 transition-colors"
            >
              Меню
            </button>
            <button
              onClick={() => scrollTo("booking")}
              className="text-sm font-semibold text-emerald-100/90 hover:text-amber-400 transition-colors"
            >
              Бронювання
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="text-sm font-semibold text-emerald-100/90 hover:text-amber-400 transition-colors"
            >
              Про заклад
            </button>
            <button
              onClick={() => scrollTo("location")}
              className="text-sm font-semibold text-emerald-100/90 hover:text-amber-400 transition-colors"
            >
              Контакти та карта
            </button>
          </nav>

          {/* Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={`tel:${restaurantPhone.replace(/\s+/g, "")}`}
              className="flex items-center gap-2 text-xs font-semibold text-emerald-300 hover:text-emerald-100 bg-[#0e221a] border border-[#1b5243] px-3.5 py-2 rounded-xl transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{restaurantPhone}</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-[#0e221a] hover:bg-[#153428] text-white border border-[#1b5243] transition-all hover:scale-105"
              aria-label="Кошик замовлень"
            >
              <ShoppingBag className="w-5 h-5 text-emerald-300" />
              {totalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-black font-extrabold text-[11px] w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Reservation button */}
            <button
              onClick={() => scrollTo("booking")}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-md shadow-emerald-900/50 transition-all hover:shadow-emerald-700/40"
            >
              <Calendar className="w-4 h-4 text-emerald-100" />
              <span>Забронювати стіл</span>
            </button>
          </div>

          {/* Mobile hamburger & cart */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-[#0e221a] text-white border border-[#1b5243]"
            >
              <ShoppingBag className="w-5 h-5 text-emerald-300" />
              {totalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-black font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[#0e221a] text-emerald-200 border border-[#1b5243]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#183e30] flex flex-col gap-3 animate-fadeIn">
            <button
              onClick={() => scrollTo("menu")}
              className="text-left px-3 py-2 text-base font-semibold text-emerald-100 hover:bg-[#0e221a] rounded-lg"
            >
              🍕 Меню страв
            </button>
            <button
              onClick={() => scrollTo("booking")}
              className="text-left px-3 py-2 text-base font-semibold text-emerald-100 hover:bg-[#0e221a] rounded-lg"
            >
              📅 Бронювання столика
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="text-left px-3 py-2 text-base font-semibold text-emerald-100 hover:bg-[#0e221a] rounded-lg"
            >
              🌲 Про заклад
            </button>
            <button
              onClick={() => scrollTo("location")}
              className="text-left px-3 py-2 text-base font-semibold text-emerald-100 hover:bg-[#0e221a] rounded-lg"
            >
              📍 Контакти та карта
            </button>
            <div className="pt-2 border-t border-[#183e30] flex flex-col gap-2">
              <a
                href={`tel:${restaurantPhone.replace(/\s+/g, "")}`}
                className="flex items-center justify-center gap-2 text-sm font-semibold text-emerald-300 bg-[#0e221a] py-2.5 rounded-lg border border-[#1b5243]"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{restaurantPhone}</span>
              </a>
              <button
                onClick={() => scrollTo("booking")}
                className="w-full text-center bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-lg shadow"
              >
                Забронювати стіл онлайн
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

