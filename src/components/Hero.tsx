"use client";

import React, { useState } from "react";
import { TreePine, Flame, Sparkles, Clock, ArrowRight, MapPin, Bike, Store } from "lucide-react";
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
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-[#183e30]">
      {/* Background glowing effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-600/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -top-24 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-medium tracking-wide">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Піца тільки на винос (Takeaway) та доставка • Лісовий масив, Київ</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Справжня піца{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-300 to-emerald-400">
                на винос
              </span>{" "}
              з лісовим характером
            </h1>

            <p className="text-base sm:text-lg text-emerald-100/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Гаряча крафтова піца 30 та 40 см прямо з печі! Хрустке витримане тісто, 100% моцарела,
              соковиті сирні й ковбасні бортики. <b>Забирайте з собою за 15–20 хвилин</b> або замовляйте швидку доставку до дверей.
            </p>

            {/* Quick Feature Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2 text-xs font-semibold text-emerald-200">
              <div className="flex items-center gap-1.5 bg-[#0e221a] px-3 py-1.5 rounded-lg border border-[#1b5243]">
                <Store className="w-3.5 h-3.5 text-amber-400" />
                <span>Самовивіз за 15-20 хв</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#0e221a] px-3 py-1.5 rounded-lg border border-[#1b5243]">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Печемо при 400°C</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#0e221a] px-3 py-1.5 rounded-lg border border-[#1b5243]">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Сирні та ковбасні бортики</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#0e221a] px-3 py-1.5 rounded-lg border border-[#1b5243]">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{workingHours}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => scrollTo("menu")}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-base px-7 py-3.5 rounded-xl shadow-lg shadow-amber-600/20 transition-all hover:scale-[1.02]"
              >
                <span>Переглянути меню</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollTo("takeaway")}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0e221a] hover:bg-[#16382b] text-emerald-100 font-bold text-base px-6 py-3.5 rounded-xl border border-[#1b5243] hover:border-emerald-500/50 transition-all"
              >
                <Store className="w-4 h-4 text-emerald-400" />
                <span>Замовити на час</span>
              </button>
            </div>

            {/* Address Pill & Delivery Info */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs text-emerald-400/90 pt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>{restaurantAddress}</span>
              </span>
              <span className="text-emerald-700">•</span>
              <button
                type="button"
                onClick={() => setZonesOpen(true)}
                className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold underline transition-colors cursor-pointer"
              >
                <Bike className="w-3.5 h-3.5" />
                <span>Зони доставки та самовивозу</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Feature Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/30 bg-gradient-to-b from-[#102d22] to-[#081510] p-3 shadow-2xl shadow-emerald-950/60">
                <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80"
                    alt="Forest Pizza Київ на винос"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07130f] via-transparent to-transparent opacity-80" />

                  {/* Floating Badges on Image */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#07130f]/90 backdrop-blur-md p-3.5 rounded-xl border border-[#1b5243] flex items-center justify-between">
                    <div>
                      <p className="text-xs text-emerald-400 font-medium">Тільки на винос</p>
                      <p className="text-sm font-bold text-white">Фірмова піца «4 М&apos;яса»</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-emerald-300">від</span>
                      <p className="text-base font-extrabold text-amber-400">320 ₴</p>
                    </div>
                  </div>

                  <div className="absolute top-4 left-4 bg-amber-500/95 text-black font-extrabold text-xs px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1">
                    <TreePine className="w-3.5 h-3.5 text-black" />
                    <span>Takeaway Craft Pizza</span>
                  </div>
                </div>

                {/* Micro info strip */}
                <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                  <div className="bg-[#0a1b14] p-2.5 rounded-xl border border-[#183e30]">
                    <p className="text-[11px] text-emerald-400">Видача</p>
                    <p className="text-sm font-bold text-white">15-20 хв</p>
                  </div>
                  <div className="bg-[#0a1b14] p-2.5 rounded-xl border border-[#183e30]">
                    <p className="text-[11px] text-emerald-400">Формат</p>
                    <p className="text-sm font-bold text-white">На винос</p>
                  </div>
                  <div className="bg-[#0a1b14] p-2.5 rounded-xl border border-[#183e30]">
                    <p className="text-[11px] text-emerald-400">Сповіщення</p>
                    <p className="text-sm font-bold text-white">Telegram</p>
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
