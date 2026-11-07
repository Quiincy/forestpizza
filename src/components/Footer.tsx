"use client";

import React from "react";
import Link from "next/link";
import { TreePine, Lock, MapPin, Phone, Clock, Heart, Store } from "lucide-react";
import { InstagramIcon } from "./InstagramIcon";

interface FooterProps {
  restaurantName?: string;
  restaurantAddress?: string;
  restaurantPhone?: string;
  workingHours?: string;
  instagramUrl?: string;
}

export function Footer({
  restaurantName = "Forest Pizza",
  restaurantAddress = "м. Київ, Лісовий проспект, 11",
  restaurantPhone = "+380 (97) 845-12-34",
  workingHours = "Щодня з 10:00 до 22:00 (тільки на винос)",
  instagramUrl = "https://instagram.com/forestpizza.kyiv",
}: FooterProps) {
  const scrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050e0b] border-t border-[#183e30] pt-14 pb-8 text-emerald-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-[#183e30]/80">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-green-900 flex items-center justify-center text-amber-400 border border-emerald-500/30">
                <TreePine className="w-5 h-5 text-emerald-200" />
              </div>
              <span className="font-extrabold text-xl tracking-wider text-white">
                FOREST <span className="text-amber-400">PIZZA</span>
              </span>
            </div>
            <p className="text-xs text-emerald-300/70 leading-relaxed">
              Крафтова піца <b>тільки на винос та доставку</b> в серці Лісового масиву.
              Випікаємо при 400°C, соковиті сирні бортики та готовність за 15-20 хвилин.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 bg-[#0e221a] px-3 py-1.5 rounded-lg border border-[#1b5243]">
                <Clock className="w-3.5 h-3.5" />
                <span>{workingHours}</span>
              </span>
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
                  className="hover:text-amber-400 transition-colors"
                >
                  🍕 Меню піци (30 та 40 см)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("takeaway")}
                  className="hover:text-amber-400 transition-colors"
                >
                  🛍️ Замовлення на винос на час
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("about")}
                  className="hover:text-amber-400 transition-colors"
                >
                  🌲 Чому наша піца на винос особлива
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("location")}
                  className="hover:text-amber-400 transition-colors"
                >
                  📍 Точка видачі на Лісовому просп., 11
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contacts */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Точка самовивозу
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{restaurantAddress}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a
                  href={`tel:${restaurantPhone.replace(/\s+/g, "")}`}
                  className="hover:text-amber-400 font-bold"
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
                    className="hover:text-amber-400"
                  >
                    @forestpizza.kyiv
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
            <p className="text-xs text-emerald-300/70">
              Управління замовленнями на винос, меню та сповіщеннями в Telegram.
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 bg-[#0e221a] hover:bg-[#16382b] text-emerald-200 hover:text-white border border-[#1b5243] px-3.5 py-2 rounded-xl text-xs font-bold transition-all"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Панель керування (Адмінка)</span>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-400/60 gap-4">
          <p>© {new Date().getFullYear()} Forest Pizza (Київ, Лісовий проспект, 11). Тільки на винос та доставка.</p>
          <p className="flex items-center gap-1">
            Зроблено з <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" /> для поціновувачів справжньої піци
          </p>
        </div>
      </div>
    </footer>
  );
}
