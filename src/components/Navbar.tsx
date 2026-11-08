"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Phone, Menu, X, MapPin, Store, Bike } from "lucide-react";
import { ForestPizzaLogo } from "./ForestPizzaLogo";
import { DeliveryZonesModal } from "./DeliveryZonesModal";

interface NavbarProps {
  restaurantPhone?: string;
  workingHours?: string;
}

export function Navbar({
  restaurantPhone = "+38 093 204 28 04",
  workingHours = "10:00 - 22:00",
}: NavbarProps) {
  const { totalCount, totalPrice, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0c0e12] border-b border-[#232832] shadow-xl shadow-black/60">
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-18 gap-2">
            {/* Authentic Brand Logo - Strictly Single Instance */}
            <Link
              href="/"
              className="flex flex-col justify-center group shrink-0"
              title="Forest Pizza — На головну"
            >
              <ForestPizzaLogo size="md" className="group-hover:scale-[1.02] transition-transform" />
              <p className="text-[9px] sm:text-[11px] font-bold text-stone-400 whitespace-nowrap flex items-center gap-1 mt-0.5">
                <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-orange-500 shrink-0" />
                <span>Лісовий просп., 11</span>
                <span className="hidden sm:inline text-orange-400">• Самовивіз & Доставка</span>
              </p>
            </Link>

            {/* Desktop Navigation (lg+) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-[#14171f] border border-[#242936] rounded-2xl p-1.5">
              <button
                onClick={() => scrollTo("menu")}
                className="px-3 xl:px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold text-stone-200 hover:text-white hover:bg-[#1e232f] transition-all whitespace-nowrap cursor-pointer"
              >
                Меню
              </button>
              <button
                onClick={() => setDeliveryModalOpen(true)}
                className="px-3 xl:px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold text-orange-400 hover:text-white hover:bg-orange-500/20 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <Bike className="w-4 h-4" />
                <span>Доставка 70 ₴</span>
              </button>
              <button
                onClick={() => scrollTo("takeaway")}
                className="px-3 xl:px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold text-stone-200 hover:text-white hover:bg-[#1e232f] transition-all whitespace-nowrap cursor-pointer"
              >
                Замовлення на час
              </button>
              <button
                onClick={() => scrollTo("about")}
                className="px-3 xl:px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold text-stone-200 hover:text-white hover:bg-[#1e232f] transition-all whitespace-nowrap cursor-pointer"
              >
                Про заклад
              </button>
              <button
                onClick={() => scrollTo("location")}
                className="px-3 xl:px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold text-stone-200 hover:text-white hover:bg-[#1e232f] transition-all whitespace-nowrap cursor-pointer"
              >
                Контакти
              </button>
            </nav>

            {/* Right Actions: Phone + Primary Cart/Order Button */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              {/* Phone Call (md+) */}
              <a
                href={`tel:${restaurantPhone.replace(/\s+/g, "")}`}
                className="hidden md:flex items-center gap-1.5 text-xs font-bold text-stone-300 hover:text-orange-400 bg-[#151820] hover:bg-[#1d222d] border border-[#282e3b] px-3 py-2 rounded-xl transition-all whitespace-nowrap"
                title={`Зателефонувати: ${restaurantPhone}`}
              >
                <Phone className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>{restaurantPhone}</span>
              </a>

              {/* Primary Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-lg shadow-orange-950/50 transition-all hover:scale-[1.02] cursor-pointer whitespace-nowrap"
                aria-label="Кошик замовлень"
              >
                <ShoppingBag className="w-4 h-4 text-white shrink-0" />
                <span className="hidden sm:inline">Кошик</span>
                {totalCount > 0 ? (
                  <span className="bg-black/40 text-white text-[10px] sm:text-[11px] font-black px-1.5 py-0.5 rounded-md">
                    {totalCount} • {totalPrice} ₴
                  </span>
                ) : (
                  <span className="sm:hidden text-[11px]">Кошик</span>
                )}
              </button>

              {/* Mobile/Tablet Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-[#151820] text-stone-200 hover:text-white border border-[#282e3b] cursor-pointer"
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
                <span className="font-bold text-orange-300">🛵 Самовивіз & Доставка кур&apos;єром</span>
                <span className="text-stone-300 font-semibold">{workingHours}</span>
              </div>

              <button
                onClick={() => scrollTo("menu")}
                className="text-left px-3.5 py-2.5 text-sm font-bold text-stone-200 hover:bg-[#181c24] hover:text-orange-400 rounded-xl transition-colors cursor-pointer"
              >
                🍕 Меню (23 піци, чебуреки, закуски)
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDeliveryModalOpen(true);
                }}
                className="text-left px-3.5 py-2.5 text-sm font-bold text-orange-400 hover:bg-orange-500/10 rounded-xl transition-colors cursor-pointer flex items-center gap-2"
              >
                <Bike className="w-4 h-4" />
                <span>Умови доставки (Лісовий 70 ₴ / таксі)</span>
              </button>
              <button
                onClick={() => scrollTo("takeaway")}
                className="text-left px-3.5 py-2.5 text-sm font-bold text-stone-200 hover:bg-[#181c24] hover:text-orange-400 rounded-xl transition-colors cursor-pointer"
              >
                ⏰ Швидке замовлення на час
              </button>
              <button
                onClick={() => scrollTo("about")}
                className="text-left px-3.5 py-2.5 text-sm font-bold text-stone-200 hover:bg-[#181c24] hover:text-orange-400 rounded-xl transition-colors cursor-pointer"
              >
                🔥 Про заклад
              </button>
              <button
                onClick={() => scrollTo("location")}
                className="text-left px-3.5 py-2.5 text-sm font-bold text-stone-200 hover:bg-[#181c24] hover:text-orange-400 rounded-xl transition-colors cursor-pointer"
              >
                📍 Контакти (Проспект Лісовий, 11)
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
                  onClick={() => setIsCartOpen(true)}
                  className="w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black py-2.5 rounded-xl shadow-md text-sm cursor-pointer"
                >
                  Перейти до кошика
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Delivery Zones Modal */}
      <DeliveryZonesModal
        isOpen={deliveryModalOpen}
        onClose={() => setDeliveryModalOpen(false)}
        restaurantPhone={restaurantPhone}
      />
    </>
  );
}
