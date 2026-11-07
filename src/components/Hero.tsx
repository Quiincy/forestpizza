"use client";

import React, { useState } from "react";
import { Flame, Sparkles, Clock, ArrowRight, MapPin, Bike, Store, ShieldCheck } from "lucide-react";
import { DeliveryZonesModal } from "./DeliveryZonesModal";

interface HeroProps {
  restaurantAddress?: string;
  workingHours?: string;
}

export function Hero({
  restaurantAddress = "м. Київ, Лісовий проспект, 11",
  workingHours = "Щодня з 10:00 до 22:00 (на винос)",
}: HeroProps) {
  const [zonesOpen, setZonesOpen] = useState(false);

  const scrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24 border-b border-[#242830]">
      {/* Background orange glowing effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-orange-600/15 via-amber-500/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -top-24 right-10 w-72 h-72 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-950/60 border border-orange-500/30 text-orange-300 text-xs sm:text-sm font-bold tracking-wide">
              <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              <span>Тільки на винос (Takeaway) та доставка • Лісовий масив, Київ</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Справжня піца{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-orange-400">
                на винос
              </span>{" "}
              з лісовим характером
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-neutral-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              22 авторські рецепти піци на хрусткому витриманому 72-годинному тісті, 100% натуральна моцарела,
              соковиті сирні й ковбасні бортики. <b>Забирайте за 15–20 хвилин</b> або замовляйте швидку доставку до дверей!
            </p>

            {/* Quick Feature Badges */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-1 text-xs font-bold text-neutral-200">
              <div className="flex items-center gap-1.5 bg-[#171a1f] px-3 py-2 rounded-xl border border-[#2b303a]">
                <Store className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>Самовивіз 15-20 хв</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#171a1f] px-3 py-2 rounded-xl border border-[#2b303a]">
                <Flame className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>Печемо при 400°C</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#171a1f] px-3 py-2 rounded-xl border border-[#2b303a]">
                <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Сирні & ковбасні бортики</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#171a1f] px-3 py-2 rounded-xl border border-[#2b303a]">
                <Clock className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>{workingHours}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => scrollTo("menu")}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-black text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-lg shadow-orange-950/60 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>Переглянути всі 22 піци</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollTo("takeaway")}
                className="flex items-center justify-center gap-2 bg-[#171a1f] hover:bg-[#22272f] text-neutral-200 hover:text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl border border-[#2b303a] hover:border-orange-500/50 transition-all cursor-pointer"
              >
                <Store className="w-4 h-4 text-orange-400" />
                <span>Замовити на винос на час</span>
              </button>
            </div>

            {/* Address Pill & Delivery Info */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs text-neutral-400 pt-2">
              <span className="flex items-center gap-1 text-orange-300">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>{restaurantAddress}</span>
              </span>
              <span className="text-neutral-600">•</span>
              <button
                type="button"
                onClick={() => setZonesOpen(true)}
                className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 font-bold underline transition-colors cursor-pointer"
              >
                <Bike className="w-3.5 h-3.5" />
                <span>Зони доставки та самовивозу</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden border-2 border-orange-500/30 bg-gradient-to-b from-[#1c1f24] to-[#121417] p-3 shadow-2xl shadow-orange-950/40">
                <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80"
                    alt="Forest Pizza Київ піца на винос"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f11] via-transparent to-transparent opacity-90" />

                  {/* Floating Badges on Image */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-[#121417]/95 backdrop-blur-md p-3 sm:p-3.5 rounded-xl border border-[#2b303a] flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-orange-400 font-bold">Фірмова піца</p>
                      <p className="text-sm font-black text-white">Pizza Forest (30/40 см)</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-neutral-400">від</span>
                      <p className="text-base font-black text-orange-400">320 ₴</p>
                    </div>
                  </div>

                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-orange-500 text-white font-black text-xs px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" />
                    <span>22 піци в меню</span>
                  </div>
                </div>

                {/* Micro info strip */}
                <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                  <div className="bg-[#121417] p-2.5 rounded-xl border border-[#242830]">
                    <p className="text-[10px] sm:text-[11px] text-neutral-400">Готовність</p>
                    <p className="text-xs sm:text-sm font-black text-white">15-20 хв</p>
                  </div>
                  <div className="bg-[#121417] p-2.5 rounded-xl border border-[#242830]">
                    <p className="text-[10px] sm:text-[11px] text-neutral-400">Формат</p>
                    <p className="text-xs sm:text-sm font-black text-orange-400">Takeaway</p>
                  </div>
                  <div className="bg-[#121417] p-2.5 rounded-xl border border-[#242830]">
                    <p className="text-[10px] sm:text-[11px] text-neutral-400">Сповіщення</p>
                    <p className="text-xs sm:text-sm font-black text-white">Telegram</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeliveryZonesModal isOpen={zonesOpen} onClose={() => setZonesOpen(false)} />
    </section>
  );
}
