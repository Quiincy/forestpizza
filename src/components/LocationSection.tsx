"use client";

import React, { useState } from "react";
import { MapPin, Navigation, Phone, Clock, Bike, Car } from "lucide-react";
import { InstagramIcon } from "./InstagramIcon";
import { DeliveryZonesModal } from "./DeliveryZonesModal";

interface LocationSectionProps {
  address?: string;
  phone?: string;
  workingHours?: string;
  instagramUrl?: string;
  mapsUrl?: string;
}

export function LocationSection({
  address = "м. Київ, Проспект Лісовий, 11 (Деснянський район)",
  phone = "+38 093 204 28 04",
  workingHours = "Щодня з 10:00 до 22:00",
  instagramUrl = "https://www.instagram.com/forest_pizza",
  mapsUrl = "https://www.google.com/maps/place/Forest+Pizza/@50.4808836,30.6236834,17z/data=!4m7!3m6!1s0x40d4d10041a05fcb:0xd6959839f9881570!8m2!3d50.4808836!4d30.6236834!10e9!16s%2Fg%2F11wj6ttlky",
}: LocationSectionProps) {
  const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);

  return (
    <>
      <section id="location" className="w-full max-w-full min-w-0 overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-[#101317] to-[#0c0e12] border-t border-[#222730]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full min-w-0">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              <span>Локація та доставка</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Точка видачі та зона доставки
            </h2>
            <p className="text-stone-300 text-sm sm:text-base">
              Замовляйте швидку доставку кур&apos;єром по Лісовому масиву (70 ₴), на таксі або забирайте гарячу піцу на Лісовому проспекті, 11!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Contact Details Card */}
            <div className="lg:col-span-5 bg-[#13161c] border border-[#242933] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl space-y-6">
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#1c212b] border border-[#2e3544] flex items-center justify-center text-orange-400 flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider">Адреса закладу</h4>
                    <p className="text-base sm:text-lg font-extrabold text-white mt-1">
                      {address}
                    </p>
                    <p className="text-xs text-stone-400 mt-1">
                      Лісовий масив, Деснянський район, м. Київ
                    </p>
                  </div>
                </div>

                {/* Delivery details */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#1c212b] border border-[#2e3544] flex items-center justify-center text-orange-400 flex-shrink-0">
                    <Bike className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider">Умови доставки</h4>
                    <p className="text-base sm:text-lg font-extrabold text-white mt-1">
                      По Лісовому масиву — 70 грн
                    </p>
                    <p className="text-xs text-stone-400 mt-1">
                      За межі Лісового масиву — за тарифом таксі
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#1c212b] border border-[#2e3544] flex items-center justify-center text-orange-400 flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider">Графік роботи</h4>
                    <p className="text-base sm:text-lg font-extrabold text-white mt-1">
                      {workingHours}
                    </p>
                    <p className="text-xs text-stone-400 mt-1">
                      Щодня без вихідних • Доставка та самовивіз (TO GO)
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#1c212b] border border-[#2e3544] flex items-center justify-center text-orange-400 flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider">Телефон піцерії</h4>
                    <a
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="text-base sm:text-lg font-extrabold text-orange-400 hover:text-orange-300 mt-1 inline-block transition-colors"
                    >
                      {phone}
                    </a>
                    <p className="text-xs text-stone-400 mt-1">
                      Прийом замовлень, консультації та виклик кур&apos;єра
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct buttons */}
              <div className="pt-4 border-t border-[#242933] flex flex-col sm:flex-row gap-3">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-lg shadow-orange-950/40 transition-all text-center"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Маршрут в Google Maps</span>
                </a>

                {instagramUrl && (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#1a1e27] hover:bg-[#242a37] text-stone-200 border border-[#2e3544] font-bold text-sm py-3 px-4 rounded-xl transition-all"
                  >
                    <InstagramIcon className="w-4 h-4 text-pink-400" />
                    <span>Instagram</span>
                  </a>
                )}
              </div>
            </div>

            {/* Interactive Google Map Embed */}
            <div className="lg:col-span-7 bg-[#13161c] border border-[#242933] rounded-3xl overflow-hidden min-h-[380px] shadow-2xl relative">
              <iframe
                title="Forest Pizza Kyiv Location Map"
                src="https://maps.google.com/maps?q=50.4808836,30.6236834+(Forest+Pizza)&hl=uk&z=17&output=embed"
                className="w-full h-full min-h-[380px] border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Map overlay card */}
              <div className="absolute top-4 left-4 bg-[#12151c]/95 backdrop-blur-md p-3 rounded-xl border border-[#2e3544] text-xs space-y-1 shadow-xl pointer-events-none">
                <p className="font-extrabold text-white flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                  Forest Pizza
                </p>
                <p className="text-orange-300 font-medium">Проспект Лісовий, 11 (Самовивіз & Доставка)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Zones Modal */}
      <DeliveryZonesModal
        isOpen={deliveryModalOpen}
        onClose={() => setDeliveryModalOpen(false)}
        restaurantPhone={phone}
      />
    </>
  );
}
