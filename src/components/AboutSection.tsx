"use client";

import React from "react";
import { Sparkles, Flame, Clock, HeartHandshake, TreePine, Store, Bike } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left side text */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <TreePine className="w-3.5 h-3.5 text-amber-400" />
            <span>Про Forest Pizza • Тільки на винос</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Чому наша піца на винос найкраща на Лісовому масиві?
          </h2>

          <p className="text-emerald-200/80 text-sm sm:text-base leading-relaxed">
            <b>Forest Pizza</b> працює у форматі <b>Takeaway & Delivery (виключно на винос та доставку)</b>.
            Ми не витрачаємо ресурси на зайвий пафос зали, а зосереджуємося на головному — досконалій якості кожної піци,
            що випікається при 400°C і потрапляє до вас гарячою, ароматною та з хрустким бортиком.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-[#0e221a] p-4 rounded-2xl border border-[#183e30] space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-amber-400">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-white text-base">72 години дозрівання</h4>
              <p className="text-xs text-emerald-300/70 leading-relaxed">
                Завдяки холодній ферментації тісто тримає форму, не розмокає під час доставки та залишається ніжним і хрустким.
              </p>
            </div>

            <div className="bg-[#0e221a] p-4 rounded-2xl border border-[#183e30] space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-amber-400">
                <Store className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-white text-base">Самовивіз без черги</h4>
              <p className="text-xs text-emerald-300/70 leading-relaxed">
                Замовте на певний час або «на зараз». Ми сповістимо у Telegram, щойно піца готова до видачі на Лісовому просп., 11.
              </p>
            </div>

            <div className="bg-[#0e221a] p-4 rounded-2xl border border-[#183e30] space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-amber-400">
                <Flame className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-white text-base">Сирні та ковбасні бортики</h4>
              <p className="text-xs text-emerald-300/70 leading-relaxed">
                До будь-якої піци 30 чи 40 см додаємо гарячий сирний бортик з моцарелою або апетитний ковбасний бортик.
              </p>
            </div>

            <div className="bg-[#0e221a] p-4 rounded-2xl border border-[#183e30] space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-amber-400">
                <Bike className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-white text-base">Швидка доставка</h4>
              <p className="text-xs text-emerald-300/70 leading-relaxed">
                Кур&apos;єри швидко доставляють гарячу піцу у термосумках по всьому Лісовому масиву та прилеглих районах.
              </p>
            </div>
          </div>
        </div>

        {/* Right side visual showcase */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden border-2 border-[#183e30] bg-[#0e221a] p-3 shadow-2xl">
            <div className="grid grid-cols-2 gap-3">
              <img
                src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80"
                alt="Крафтова піца на винос"
                className="rounded-2xl h-52 sm:h-64 w-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=600&q=80"
                alt="Свіжі інгредієнти"
                className="rounded-2xl h-52 sm:h-64 w-full object-cover"
              />
              <div className="col-span-2 bg-[#07130f] p-5 rounded-2xl border border-[#1b5243] flex items-center justify-between">
                <div>
                  <p className="text-xs text-emerald-400">Формат роботи</p>
                  <p className="text-sm sm:text-base font-bold text-white">
                    Тільки на винос та доставка • Самовивіз за 15-20 хв
                  </p>
                </div>
                <div className="bg-amber-500/20 text-amber-400 px-3 py-1.5 rounded-xl text-xs font-black border border-amber-500/30">
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
