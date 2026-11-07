"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Phone, Store, ArrowUp } from "lucide-react";

interface MobileBottomBarProps {
  restaurantPhone?: string;
}

export function MobileBottomBar({ restaurantPhone = "+380 (97) 845-12-34" }: MobileBottomBarProps) {
  const { totalCount, totalPrice, setIsCartOpen } = useCart();

  const scrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#121418]/95 backdrop-blur-lg border-t border-[#292d34] px-4 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom,0px))] shadow-2xl">
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        {/* Quick Phone Call */}
        <a
          href={`tel:${restaurantPhone.replace(/\s+/g, "")}`}
          className="flex flex-col items-center justify-center p-2 rounded-xl text-neutral-300 hover:text-orange-400 hover:bg-[#1c1f24] transition-colors"
          aria-label="Зателефонувати в піцерію"
        >
          <Phone className="w-5 h-5 text-orange-400" />
          <span className="text-[10px] font-medium mt-0.5">Дзвінок</span>
        </a>

        {/* Quick Menu Jump */}
        <button
          onClick={() => scrollTo("menu")}
          className="flex flex-col items-center justify-center p-2 rounded-xl text-neutral-300 hover:text-orange-400 hover:bg-[#1c1f24] transition-colors"
        >
          <Store className="w-5 h-5 text-orange-400" />
          <span className="text-[10px] font-medium mt-0.5">Меню</span>
        </button>

        {/* Main Cart or Takeaway CTA */}
        {totalCount > 0 ? (
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex-1 flex items-center justify-between bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-orange-950/50 transition-all animate-pulse"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-white" />
              <span>Кошик ({totalCount})</span>
            </div>
            <span className="font-black text-sm">{totalPrice} ₴ →</span>
          </button>
        ) : (
          <button
            onClick={() => scrollTo("takeaway")}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs py-2.5 px-3 rounded-xl shadow-md transition-all"
          >
            <Store className="w-4 h-4" />
            <span>Замовити на винос</span>
          </button>
        )}
      </div>
    </div>
  );
}

