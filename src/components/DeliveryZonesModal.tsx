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
      <div className="bg-[#0e221a] border border-[#183e30] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative animate-fadeIn">
        <div className="flex items-center justify-between border-b border-[#183e30] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-950 rounded-xl border border-emerald-500/30 text-amber-400">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-lg">Зони доставки та умови</h3>
              <p className="text-xs text-emerald-400">Forest Pizza • м. Київ</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-[#183e30]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          {/* Zone 1: Green Zone (Lisovyi) */}
          <div className="bg-[#07130f] p-4 rounded-2xl border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-emerald-300 text-sm flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                Зелена зона (Лісовий масив)
              </span>
              <span className="text-amber-400 font-bold">30–40 хв</span>
            </div>
            <p className="text-emerald-100/80 text-xs leading-relaxed">
              Лісовий проспект, вул. Братиславська, вул. Кубанської України, вул. Мілютенка, вул. Ореста Левицького, вул. Кіото, метро «Лісова» та «Чернігівська».
            </p>
            <div className="pt-1 flex items-center gap-2 text-[11px] text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span><b>Безкоштовна доставка</b> від 350 ₴ (або 40 ₴ при меншому замовленні)</span>
            </div>
          </div>

          {/* Zone 2: Yellow Zone */}
          <div className="bg-[#07130f] p-4 rounded-2xl border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-amber-300 text-sm flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                Жовта зона (Троєщина, Воскресенка)
              </span>
              <span className="text-amber-400 font-bold">45–60 хв</span>
            </div>
            <p className="text-emerald-100/80 text-xs leading-relaxed">
              Деснянський та Дніпровський райони в радіусі до 7 км від піцерії.
            </p>
            <div className="pt-1 flex items-center gap-2 text-[11px] text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span><b>Безкоштовна доставка</b> від 500 ₴ (або 60 ₴)</span>
            </div>
          </div>

          {/* Pickup bonus */}
          <div className="bg-emerald-950/40 p-4 rounded-2xl border border-emerald-500/40 flex items-center gap-3">
            <MapPin className="w-6 h-6 text-amber-400 flex-shrink-0" />
            <div className="text-xs">
              <p className="font-extrabold text-white">Самовивіз із закладу:</p>
              <p className="text-emerald-300">
                Забирайте гарячу піцу за адресою <b>Лісовий проспект, 11</b> без черги за 15-20 хвилин після дзвінка чи онлайн-замовлення!
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-colors text-sm"
        >
          Зрозуміло
        </button>
      </div>
    </div>
  );
}

