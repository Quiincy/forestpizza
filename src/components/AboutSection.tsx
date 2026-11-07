"use client";

import React from "react";
import { Sparkles, Flame, Clock, HeartHandshake, Store, Bike } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-12 sm:py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left side text */}
        <div className="lg:col-span-6 space-y-5 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-950/70 border border-orange-500/30 text-orange-400 text-xs font-black uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            <span>Про Forest Pizza • Тільки на винос</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Чому наша піца на винос найкраща на Лісовому масиві?
          </h2>

          <p className="text-neutral-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            <b>Forest Pizza</b> працює у форматі <b>Takeaway & Delivery (виключно на винос та доставку)</b>.
            Ми не розпорошуємо сили, а сфокусовані на якості: 22 рецепти піци на спеціальному тісті,
            що випікається при 400°C і приїжджає або видається вам гарячою та хрусткою.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1">
            <div className="bg-[#15181c] p-4 rounded-2xl border border-[#2b303a] space-y-2">
              <div className="w-9 h-9 rounded-xl bg-orange-950/70 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-black text-white text-sm sm:text-base">72h холодної ферментації</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Тісто дозріває в холоді до 3 діб — воно легке, не розмокає під час транспортування та має пишний бортик.
              </p>
            </div>

            <div className="bg-[#15181c] p-4 rounded-2xl border border-[#2b303a] space-y-2">
              <div className="w-9 h-9 rounded-xl bg-orange-950/70 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <Store className="w-5 h-5" />
              </div>
              <h4 className="font-black text-white text-sm sm:text-base">Самовивіз без черги</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Замовте на певний час або «на зараз». Ми сповістимо у Telegram, щойно піца готова до видачі на Лісовому просп., 11.
              </p>
            </div>

            <div className="bg-[#15181c] p-4 rounded-2xl border border-[#2b303a] space-y-2">
              <div className="w-9 h-9 rounded-xl bg-orange-950/70 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <Flame className="w-5 h-5" />
              </div>
              <h4 className="font-black text-white text-sm sm:text-base">Сирні & ковбасні бортики</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                До будь-якої піци 30 чи 40 см запікаємо гарячий сирний бортик з моцарелою або апетитний ковбасний бортик.
              </p>
            </div>

            <div className="bg-[#15181c] p-4 rounded-2xl border border-[#2b303a] space-y-2">
              <div className="w-9 h-9 rounded-xl bg-orange-950/70 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <Bike className="w-5 h-5" />
              </div>
              <h4 className="font-black text-white text-sm sm:text-base">Швидка доставка</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Кур&apos;єри швидко доставляють гарячу піцу у термосумках по всьому Лісовому масиву та прилеглих районах.
              </p>
            </div>
          </div>
        </div>

        {/* Right side visual showcase */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden border-2 border-[#2b303a] bg-[#15181c] p-3 shadow-2xl">
            <div className="grid grid-cols-2 gap-3">
              <img
                src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80"
                alt="Крафтова піца на винос"
                className="rounded-2xl h-44 sm:h-64 w-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=600&q=80"
                alt="Свіжі інгредієнти"
                className="rounded-2xl h-44 sm:h-64 w-full object-cover"
              />
              <div className="col-span-2 bg-[#0e1013] p-4 sm:p-5 rounded-2xl border border-[#242830] flex items-center justify-between">
                <div>
                  <p className="text-xs text-orange-400 font-bold">Формат роботи</p>
                  <p className="text-xs sm:text-base font-black text-white">
                    Тільки на винос та доставка • Самовивіз за 15-20 хв
                  </p>
                </div>
                <div className="bg-orange-500/20 text-orange-400 px-3 py-1.5 rounded-xl text-xs font-black border border-orange-500/30">
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
