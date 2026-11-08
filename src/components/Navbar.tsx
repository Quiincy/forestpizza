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
      <header className="sticky top-0 z-40 bg-[#0c0e12]/95 backdrop-blur-xl border-b border-[#232832] shadow-lg shadow-black/30">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-3">
            {/* Authentic Brand Logo */}
            <Link
              href="/"
              className="flex flex-col justify-center group shrink-0 py-1"
              title="Forest Pizza — На головну"
            >
              <ForestPizzaLogo size="md" className="group-hover:scale-[1.02] transition-transform" />
              <p className="text-[10px] sm:text-[11px] font-bold text-stone-400 whitespace-nowrap flex items-center gap-1 mt-0.5 pl-0.5">
                <MapPin className="w-3 h-3 text-orange-500 shrink-0" />
                <span>Проспект Лісовий, 11</span>
                <span className="text-orange-400">• Самовивіз & Доставка</span>
              </p>
            </Link>

            {/* Desktop Navigation (lg+) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 bg-[#14171f] border border-[#242936] rounded-2xl p-1.5">
              <button
                onClick={() => scrollTo("menu")}
                className="px-3 xl:px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold text-stone-200 hover:text-white hover:bg-[#1e232f] transition-all whitespace-nowrap cursor-pointer"
              >
                🍕 Меню (23 піци)
              </button>
              <button
                onClick={() => setDeliveryModalOpen(true)}
                className="px-3 xl:px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold text-orange-400 hover:text-white hover:bg-orange-500/20 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <Bike className="w-4 h-4" />
                <span>Доставка (70 ₴)</span>
              </button>
              <button
                onClick={() => scrollTo("takeaway")}
                className="px-3 xl:px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold text-stone-200 hover:text-white hover:bg-[#1e232f] transition-all whitespace-nowrap cursor-pointer"
              >
                🛍️ Замовлення на час
              </button>
              <button
                onClick={() => scrollTo("about")}
                className="px-3 xl:px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold text-stone-200 hover:text-white hover:bg-[#1e232f] transition-all whitespace-nowrap cursor-pointer"
              >
                🔥 Про заклад
              </button>
              <button
                onClick={() => scrollTo("location")}
                className="px-3 xl:px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold text-stone-200 hover:text-white hover:bg-[#1e232f] transition-all whitespace-nowrap cursor-pointer"
              >
                📍 Контакти
              </button>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* Delivery info button (tablet/desktop) */}
              <button
                onClick={() => setDeliveryModalOpen(true)}
                className="hidden md:flex items-center gap-1.5 text-xs font-bold text-orange-300 hover:text-white bg-orange-950/40 hover:bg-orange-950/80 border border-orange-500/30 px-3 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer"
              >
                <Bike className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Доставка 70 ₴</span>
              </button>

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
                className="relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2.5 rounded-xl bg-[#151820] hover:bg-[#1d222d] text-white border border-[#282e3b] transition-all cursor-pointer whitespace-nowrap"
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

              {/* Primary Order CTA */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm px-3.5 sm:px-4 py-2.5 rounded-xl shadow-lg shadow-orange-950/50 transition-all hover:scale-[1.02] cursor-pointer whitespace-nowrap"
              >
                <Store className="w-4 h-4 text-white shrink-0" />
                <span>Замовити</span>
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
                <span className="font-bold text-orange-300">🛵 Самовивіз & Доставка кур&apos;єром</span>
                <span className="text-stone-300 font-semibold">{workingHours}</span>
              </div>

              <button
                onClick={() => scrollTo("menu")}
                className="text-left px-3.5 py-2.5 text-sm font-bold text-stone-200 hover:bg-[#181c24] hover:text-orange-400 rounded-xl transition-colors cursor-pointer"
              >
                🍕 Меню (23 піци, чебуреки, закуски, бортики)
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
                🔥 Про заклад та бортики
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
