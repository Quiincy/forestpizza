"use client";

import React from "react";
import { X, Bike, Car, Store, Clock, MapPin, CheckCircle2, Phone } from "lucide-react";

interface DeliveryZonesModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantPhone?: string;
}

export function DeliveryZonesModal({
  isOpen,
  onClose,
  restaurantPhone = "+38 093 204 28 04",
}: DeliveryZonesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#12151c] border border-[#2b303c] rounded-3xl p-5 sm:p-7 shadow-2xl text-stone-100 space-y-5 animate-fadeIn max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#242832]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-orange-500/20 rounded-xl text-orange-400 border border-orange-500/30">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Доставка Forest Pizza</h3>
              <p className="text-xs text-orange-400 font-semibold">Умови та тарифи доставки</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-white hover:bg-[#1f232d] transition-colors cursor-pointer"
            aria-label="Закрити"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Delivery Options */}
        <div className="space-y-3">
          {/* Option 1: Lisovyi Masyv */}
          <div className="p-4 rounded-2xl bg-[#171a23] border border-orange-500/40 relative overflow-hidden">
            <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-black px-2.5 py-1 rounded-lg">
              70 ₴
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-400 shrink-0 mt-0.5">
                <Bike className="w-5 h-5" />
              </div>
              <div className="pr-12">
                <h4 className="font-black text-white text-sm sm:text-base">
                  Доставка по Лісовому масиву
                </h4>
                <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                  Швидка доставка гарячої піци у термосумках кур&apos;єром нашого закладу прямо до дверей вашого будинку.
                </p>
                <div className="flex items-center gap-2 text-[11px] text-orange-300 font-bold mt-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>30–45 хвилин • Фіксовано 70 грн</span>
                </div>
              </div>
            </div>
          </div>

          {/* Option 2: Taxi Tariff outside */}
          <div className="p-4 rounded-2xl bg-[#171a23] border border-[#2b303c] relative overflow-hidden">
            <div className="absolute top-3 right-3 bg-[#242834] text-amber-300 text-xs font-bold px-2.5 py-1 rounded-lg border border-[#3b4152]">
              За тарифом таксі
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                <Car className="w-5 h-5" />
              </div>
              <div className="pr-14">
                <h4 className="font-black text-white text-sm sm:text-base">
                  За межі Лісового масиву
                </h4>
                <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                  Відправляємо замовлення кур&apos;єрською доставкою на таксі (Uklon / Bolt Express) по Деснянському району та м. Київ.
                </p>
                <div className="flex items-center gap-2 text-[11px] text-stone-400 font-medium mt-2">
                  <span>Оплата вартості поїздки кур&apos;єру таксі за тарифом додатку</span>
                </div>
              </div>
            </div>
          </div>

          {/* Option 3: Pickup TO GO */}
          <div className="p-4 rounded-2xl bg-[#171a23] border border-[#2b303c] relative overflow-hidden">
            <div className="absolute top-3 right-3 bg-emerald-500/20 text-emerald-400 text-xs font-black px-2.5 py-1 rounded-lg border border-emerald-500/30">
              Безкоштовно
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                <Store className="w-5 h-5" />
              </div>
              <div className="pr-20">
                <h4 className="font-black text-white text-sm sm:text-base">
                  Самовивіз (TO GO)
                </h4>
                <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                  Замовляйте онлайн і забирайте гарячу піцу особисто без черги просто з печі.
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-orange-400 font-bold mt-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>м. Київ, Проспект Лісовий, 11 (15–20 хв)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Glovo Partnership Pill */}
        <div className="p-3.5 rounded-2xl bg-[#151921] border border-[#282d3b] flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-lg">🟡</span>
            <div>
              <p className="font-black text-white">Співпрацюємо з Glovo</p>
              <p className="text-[11px] text-stone-400">Шукайте «Forest Pizza» у додатку Glovo</p>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
            Glovo
          </span>
        </div>

        {/* Call CTA */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href={`tel:${restaurantPhone.replace(/\s+/g, "")}`}
            className="w-full sm:w-auto flex items-center justify-center gap-2 text-xs font-bold text-orange-400 hover:text-white bg-[#1a1d26] py-2.5 px-4 rounded-xl border border-[#2e3444] transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Зателефонувати: {restaurantPhone}</span>
          </a>

          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm py-2.5 px-6 rounded-xl transition-all cursor-pointer"
          >
            Зрозуміло
          </button>
        </div>
      </div>
    </div>
  );
}

