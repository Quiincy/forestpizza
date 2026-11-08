"use client";

import React, { useState } from "react";
import { Flame, Sparkles, Clock, ArrowRight, MapPin, Store, Bike, ChevronRight } from "lucide-react";
import { DeliveryZonesModal } from "./DeliveryZonesModal";

interface HeroProps {
  restaurantAddress?: string;
  workingHours?: string;
  restaurantPhone?: string;
}

export function Hero({
  restaurantAddress = "м. Київ, Проспект Лісовий, 11",
  workingHours = "Щодня з 10:00 до 22:00",
  restaurantPhone = "+38 093 204 28 04",
}: HeroProps) {
  const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);

  const scrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-12 sm:pb-18 lg:pt-14 lg:pb-22 border-b border-[#232832]">
        {/* Background orange glowing effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-orange-600/15 via-amber-500/10 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -top-24 right-10 w-72 h-72 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Text & CTAs */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left">
              <div className="flex flex-col items-center lg:items-start">
                <button
                  type="button"
                  onClick={() => setDeliveryModalOpen(true)}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-orange-950/70 border border-orange-500/30 text-orange-300 text-xs sm:text-sm font-bold hover:bg-orange-950 hover:border-orange-500/60 transition-all cursor-pointer shadow-md shadow-orange-950/40"
                >
                  <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse shrink-0" />
                  <span>🛵 Доставка по Лісовому: 70 ₴ • Самовивіз • Glovo</span>
                  <ChevronRight className="w-3.5 h-3.5 text-orange-400" />
                </button>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black text-white tracking-tight leading-[1.12]">
                Гаряча крафтова піца{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-orange-400">
                  з доставкою
                </span>{" "}
                та на винос
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-stone-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                23 автентичні піци за оригінальним рецептом (30 см та 40 см), соковиті чебуреки, фритюр,
                сирні й ковбасні бортики. <b>Доставка по Лісовому масиву всього за 70 ₴ або швидкий самовивіз за 15–20 хвилин!</b>
              </p>

              {/* Quick Feature Badges */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5 pt-1 text-xs font-bold text-stone-200">
                <button
                  type="button"
                  onClick={() => setDeliveryModalOpen(true)}
                  className="flex items-center justify-center sm:justify-start gap-1.5 bg-[#151820] hover:bg-[#1f2430] px-3 py-2 rounded-xl border border-[#282e3b] text-orange-300 transition-colors cursor-pointer"
                >
                  <Bike className="w-4 h-4 text-orange-400 shrink-0" />
                  <span className="truncate">Доставка 70 ₴ (30-45 хв)</span>
                </button>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 bg-[#151820] px-3 py-2 rounded-xl border border-[#282e3b]">
                  <Store className="w-4 h-4 text-orange-500 shrink-0" />
                  <span className="truncate">Самовивіз 15-20 хв</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 bg-[#151820] px-3 py-2 rounded-xl border border-[#282e3b]">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate">Сирні & ковбасні бортики</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 bg-[#151820] px-3 py-2 rounded-xl border border-[#282e3b]">
                  <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                  <span className="truncate">{workingHours}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => scrollTo("menu")}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-black text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-lg shadow-orange-950/60 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <span>Обрати піцу з меню (23 види)</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                <button
                  onClick={() => scrollTo("takeaway")}
                  className="flex items-center justify-center gap-2 bg-[#151820] hover:bg-[#1f2430] text-stone-200 hover:text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl border border-[#282e3b] hover:border-orange-500/50 transition-all cursor-pointer"
                >
                  <Bike className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>Швидке замовлення</span>
                </button>
              </div>

              {/* Address Pill */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs text-stone-400 pt-1">
                <a
                  href="#location"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("location");
                  }}
                  className="inline-flex items-center gap-1.5 text-orange-300 hover:text-orange-200 font-semibold transition-colors"
                >
                  <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>Точка видачі: {restaurantAddress}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Visual Showcase with Authentic Pizza Forest */}
            <div className="lg:col-span-5 relative mt-2 lg:mt-0">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden border-2 border-orange-500/30 bg-gradient-to-b from-[#1a1d24] to-[#111318] p-3 shadow-2xl shadow-orange-950/40">
                  <div className="relative h-64 sm:h-76 lg:h-84 rounded-2xl overflow-hidden bg-[#111318] group">
                    <img
                      src="/images/pizzas/pizza-forest.jpg"
                      alt="Pizza Forest фірмова піца"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12] via-transparent to-transparent opacity-85 pointer-events-none" />

                    {/* Floating Badges on Image */}
                    <div className="absolute bottom-3 left-3 right-3 bg-[#12151c]/95 backdrop-blur-md p-3 rounded-xl border border-[#2b303a] flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[11px] text-orange-400 font-bold truncate">Фірмовий рецепт 🌲</p>
                        <p className="text-sm font-black text-white truncate">Pizza Forest (30 / 40 см)</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[10px] text-stone-400 block leading-none">30 см / 40 см</span>
                        <p className="text-sm sm:text-base font-black text-orange-400">320 / 540 ₴</p>
                      </div>
                    </div>

                    <div className="absolute top-3 left-3 bg-orange-500 text-white font-black text-xs px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 fill-white" />
                      <span>23 піци в меню</span>
                    </div>
                  </div>

                  {/* Micro info strip */}
                  <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                    <div className="bg-[#12151c] p-2.5 rounded-xl border border-[#232832]">
                      <p className="text-[10px] sm:text-[11px] text-stone-400">Доставка</p>
                      <p className="text-xs sm:text-sm font-black text-orange-400">70 ₴ • Лісовий</p>
                    </div>
                    <div className="bg-[#12151c] p-2.5 rounded-xl border border-[#232832]">
                      <p className="text-[10px] sm:text-[11px] text-stone-400">Самовивіз</p>
                      <p className="text-xs sm:text-sm font-black text-white">15–20 хв</p>
                    </div>
                    <div className="bg-[#12151c] p-2.5 rounded-xl border border-[#232832]">
                      <p className="text-[10px] sm:text-[11px] text-stone-400">Партнер</p>
                      <p className="text-xs sm:text-sm font-black text-amber-400">Glovo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Zones Modal */}
      <DeliveryZonesModal
        isOpen={deliveryModalOpen}
        onClose={() => setDeliveryModalOpen(false)}
        restaurantPhone={restaurantPhone}
      />
    </>
  );
}
