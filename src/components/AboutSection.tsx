"use client";

import React from "react";
import { Sparkles, Flame, Clock, Store } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-12 sm:py-16 lg:py-22 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left side text */}
        <div className="lg:col-span-6 space-y-5 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-950/70 border border-orange-500/30 text-orange-400 text-xs font-black uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            <span>Про Forest Pizza • Тільки на винос</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Чому наша піца на винос улюблена на Лісовому масиві?
          </h2>

          <p className="text-stone-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            <b>Forest Pizza</b> працює у форматі <b>Takeaway (виключно на винос)</b>.
            Ми сфокусовані на головному — смаку та швидкості: 22 авторські рецепти піци на ферментованому тісті,
            що випікається при 400°C і видається вам гарячою просто з печі.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1">
            <div className="bg-[#13161c] p-4 rounded-2xl border border-[#242934] space-y-2">
              <div className="w-9 h-9 rounded-xl bg-orange-950/70 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-black text-white text-sm sm:text-base">Готовність 15–20 хвилин</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Тісто холодної ферментації випікається за лічені хвилини, зберігаючи хрустку скоринку та соковиту начинку.
              </p>
            </div>

            <div className="bg-[#13161c] p-4 rounded-2xl border border-[#242934] space-y-2">
              <div className="w-9 h-9 rounded-xl bg-orange-950/70 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <Store className="w-5 h-5" />
              </div>
              <h4 className="font-black text-white text-sm sm:text-base">Самовивіз без черги</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Замовляйте онлайн на точний час або «на зараз» — замовлення миттєво надходить кухарю в Telegram на Лісовому просп., 11.
              </p>
            </div>

            <div className="bg-[#13161c] p-4 rounded-2xl border border-[#242934] space-y-2">
              <div className="w-9 h-9 rounded-xl bg-orange-950/70 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <Flame className="w-5 h-5" />
              </div>
              <h4 className="font-black text-white text-sm sm:text-base">Сирні & ковбасні бортики</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                До будь-якої піци 30 чи 40 см запікаємо фірмовий бортик із тягучою моцарелою або мисливськими ковбасками.
              </p>
            </div>

            <div className="bg-[#13161c] p-4 rounded-2xl border border-[#242934] space-y-2">
              <div className="w-9 h-9 rounded-xl bg-orange-950/70 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-black text-white text-sm sm:text-base">22 види піци в меню</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Від фірмової Pizza Forest, 4 М&apos;яса та Пепероні до делікатесних Лосось, Ocean і Горгонзола Груша.
              </p>
            </div>
          </div>
        </div>

        {/* Right side visual showcase using authentic Forest Pizza photos */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden border border-[#282e3b] bg-[#13161c] p-3 sm:p-4 shadow-2xl">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative rounded-2xl overflow-hidden bg-[#101217] aspect-[10/7]">
                <img
                  src="/images/pizzas/salmon.jpg"
                  alt="Піца Лосось Forest Pizza"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-[11px] font-bold text-white px-2.5 py-0.5 rounded-lg border border-white/10">
                  Лосось
                </span>
              </div>
              <div className="relative rounded-2xl overflow-hidden bg-[#101217] aspect-[10/7]">
                <img
                  src="/images/pizzas/diablo.jpg"
                  alt="Піца Д'ябло Forest Pizza"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-[11px] font-bold text-white px-2.5 py-0.5 rounded-lg border border-white/10">
                  Д&apos;ябло 🔥
                </span>
              </div>
              <div className="relative rounded-2xl overflow-hidden bg-[#101217] aspect-[10/7]">
                <img
                  src="/images/pizzas/ocean.jpg"
                  alt="Піца Ocean Forest Pizza"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-[11px] font-bold text-white px-2.5 py-0.5 rounded-lg border border-white/10">
                  Ocean 🦐
                </span>
              </div>
              <div className="relative rounded-2xl overflow-hidden bg-[#101217] aspect-[10/7]">
                <img
                  src="/images/pizzas/4-meats.jpg"
                  alt="Піца 4 М'яса Forest Pizza"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-[11px] font-bold text-white px-2.5 py-0.5 rounded-lg border border-white/10">
                  4 М&apos;яса
                </span>
              </div>

              <div className="col-span-2 bg-[#0c0e12] p-3.5 sm:p-4 rounded-2xl border border-[#242832] flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-[11px] text-orange-400 font-bold">Формат закладу</p>
                  <p className="text-xs sm:text-sm font-black text-white">
                    Тільки на винос (самовивіз) • Готовність 15–20 хв
                  </p>
                </div>
                <div className="bg-orange-500/20 text-orange-400 px-3 py-1.5 rounded-xl text-xs font-black border border-orange-500/30 whitespace-nowrap">
                  Лісовий просп., 11
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
