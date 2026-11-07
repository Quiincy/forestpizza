"use client";

import React from "react";
import { X, Bike, MapPin, Clock, CheckCircle2 } from "lucide-react";

interface DeliveryZonesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeliveryZonesModal({ isOpen, onClose }: DeliveryZonesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#15181c] border border-[#2b303a] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 relative animate-fadeIn">
        <div className="flex items-center justify-between border-b border-[#2b303a] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-orange-950/60 rounded-xl border border-orange-500/30 text-orange-400">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-white text-lg">Зони доставки та самовивозу</h3>
              <p className="text-xs text-orange-400">Forest Pizza • м. Київ, Лісовий просп., 11</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#22272f] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3.5 text-xs sm:text-sm">
          {/* Pickup Highlight */}
          <div className="bg-orange-950/30 p-4 rounded-2xl border border-orange-500/40 flex items-start gap-3">
            <MapPin className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-black text-white">Самовивіз на винос (Takeaway):</p>
              <p className="text-orange-200/90 text-xs mt-0.5 leading-relaxed">
                Забирайте гарячу піцу прямо з печі за адресою <b>м. Київ, Лісовий проспект, 11</b> за 15-20 хвилин після замовлення онлайн або по телефону!
              </p>
            </div>
          </div>

          {/* Zone 1: Green Zone (Lisovyi) */}
          <div className="bg-[#0e1013] p-4 rounded-2xl border border-[#2b303a] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-white text-sm flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                Зелена зона (Лісовий масив)
              </span>
              <span className="text-orange-400 font-black">30–40 хв</span>
            </div>
            <p className="text-neutral-300 text-xs leading-relaxed">
              Лісовий проспект, вул. Братиславська, вул. Кубанської України, вул. Мілютенка, вул. Ореста Левицького, вул. Кіото, метро «Лісова» та «Чернігівська».
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span><b>Безкоштовна доставка</b> від 350 ₴ (або 40 ₴ при меншій сумі)</span>
            </div>
          </div>

          {/* Zone 2: Yellow Zone */}
          <div className="bg-[#0e1013] p-4 rounded-2xl border border-[#2b303a] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-white text-sm flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                Жовта зона (Троєщина, Воскресенка)
              </span>
              <span className="text-orange-400 font-black">45–60 хв</span>
            </div>
            <p className="text-neutral-300 text-xs leading-relaxed">
              Сусідні мікрорайони Деснянського та Дніпровського районів у радіусі до 7 км.
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-[11px] text-amber-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span><b>Безкоштовна доставка</b> від 500 ₴ (або 60 ₴)</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black py-3 rounded-xl transition-all text-sm"
        >
          Зрозуміло
        </button>
      </div>
    </div>
  );
}
