"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, MapPin, Phone, Clock, Heart, Bike, Store } from "lucide-react";
import { InstagramIcon } from "./InstagramIcon";
import { ForestPizzaLogo } from "./ForestPizzaLogo";
import { DeliveryZonesModal } from "./DeliveryZonesModal";

interface FooterProps {
  restaurantName?: string;
  restaurantAddress?: string;
  restaurantPhone?: string;
  workingHours?: string;
  instagramUrl?: string;
}

export function Footer({
  restaurantAddress = "м. Київ, Проспект Лісовий, 11",
  restaurantPhone = "+38 093 204 28 04",
  workingHours = "Щодня з 10:00 до 22:00",
  instagramUrl = "https://www.instagram.com/forest._pizza/",
}: FooterProps) {
  const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);

  const scrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <footer className="w-full max-w-full min-w-0 overflow-hidden bg-[#090b0e] border-t border-[#1e232b] pt-14 pb-10 text-stone-300">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full min-w-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-[#1e232b]">
            {/* Col 1: Brand */}
            <div className="space-y-4">
              <ForestPizzaLogo size="md" />
              <p className="text-xs text-stone-400 leading-relaxed">
                Крафтова піца <b>з доставкою по Лісовому масиву (70 грн)</b> та самовивозом на Лісовому проспекті, 11.
                23 авторські рецепти піци, соковиті чебуреки, фритюр, сирні та ковбасні бортики.
              </p>
              <div className="pt-1 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-orange-400 bg-[#14171e] px-3 py-1.5 rounded-lg border border-[#242933]">
                  <Clock className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                  <span>{workingHours}</span>
                </span>
                <button
                  onClick={() => setDeliveryModalOpen(true)}
                  className="inline-flex items-center gap-1 text-xs text-amber-300 bg-amber-500/10 px-2.5 py-1.5 rounded-lg border border-amber-500/20 hover:bg-amber-500/20 cursor-pointer transition-colors"
                >
                  <Bike className="w-3.5 h-3.5" />
                  <span>Доставка: 70 ₴</span>
                </button>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div className="space-y-3">
              <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
                Навігація
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => scrollTo("menu")}
                    className="hover:text-orange-400 transition-colors cursor-pointer"
                  >
                    🍕 Меню піци (23 види, 30 та 40 см)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("menu")}
                    className="hover:text-orange-400 transition-colors cursor-pointer"
                  >
                    🥟 Чебуреки та фритюр (нагетси, фрі, сирні палички)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setDeliveryModalOpen(true)}
                    className="hover:text-orange-400 transition-colors cursor-pointer flex items-center gap-1 text-orange-400 font-semibold"
                  >
                    <Bike className="w-3 h-3" />
                    <span>Умови доставки (Лісовий 70 ₴ / таксі)</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("location")}
                    className="hover:text-orange-400 transition-colors cursor-pointer"
                  >
                    📍 Точка видачі (Проспект Лісовий, 11)
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Contacts */}
            <div className="space-y-3">
              <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
                Контакти та доставка
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>{restaurantAddress}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <a
                    href={`tel:${restaurantPhone.replace(/\s+/g, "")}`}
                    className="hover:text-orange-400 font-bold"
                  >
                    {restaurantPhone}
                  </a>
                </li>
                {instagramUrl && (
                  <li className="flex items-center gap-2">
                    <InstagramIcon className="w-4 h-4 text-pink-400 flex-shrink-0" />
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-orange-400 font-semibold"
                    >
                      @forest._pizza
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {/* Col 4: Admin access */}
            <div className="space-y-3">
              <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
                Для персоналу
              </h4>
              <p className="text-xs text-stone-400">
                Управління замовленнями, доставкою, меню та сповіщеннями в Telegram.
              </p>
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 bg-[#14171e] hover:bg-[#1e232d] text-stone-200 hover:text-white border border-[#272d3a] px-3.5 py-2 rounded-xl text-xs font-bold transition-all"
              >
                <Lock className="w-3.5 h-3.5 text-orange-400" />
                <span>Панель керування (Адмінка)</span>
              </Link>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
            <p>© {new Date().getFullYear()} Forest Pizza (Київ, Проспект Лісовий, 11). Доставка по Лісовому масиву та самовивіз.</p>
            <p className="flex items-center gap-1">
              Зроблено з <Heart className="w-3 h-3 text-orange-500 fill-orange-500 inline" /> для поціновувачів справжньої піци
            </p>
          </div>
        </div>
      </footer>

      {/* Delivery Zones Modal */}
      <DeliveryZonesModal
        isOpen={deliveryModalOpen}
        onClose={() => setDeliveryModalOpen(false)}
        restaurantPhone={restaurantPhone}
      />
    </>
  );
}
