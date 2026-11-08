"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";

interface MobileBottomBarProps {
  restaurantPhone?: string;
}

export function MobileBottomBar({ restaurantPhone = "+38 093 204 28 04" }: MobileBottomBarProps) {
  const { totalCount, totalPrice, setIsCartOpen, isCartOpen } = useCart();

  // If cart is open or empty, don't show the floating checkout pill
  if (totalCount === 0 || isCartOpen) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-4 left-3 right-3 z-40 max-w-lg mx-auto pointer-events-none animate-fadeIn">
      <button
        type="button"
        onClick={() => setIsCartOpen(true)}
        className="pointer-events-auto w-full flex items-center justify-between bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black px-4 py-3.5 rounded-2xl shadow-2xl shadow-orange-950/90 border border-orange-400/40 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
        aria-label="Перейти до оформлення замовлення"
      >
        <div className="flex items-center gap-2.5">
          <div className="bg-black/35 min-w-[26px] h-6 px-1.5 rounded-lg flex items-center justify-center font-black text-xs text-white">
            {totalCount}
          </div>
          <span className="font-extrabold text-sm tracking-tight flex items-center gap-1.5">
            <ShoppingBag className="w-4 h-4 text-white" />
            <span>Кошик</span>
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="font-black text-base">{totalPrice} ₴</span>
          <span className="bg-black/30 hover:bg-black/40 px-3 py-1 rounded-xl text-xs font-black tracking-wide border border-white/20">
            Оформити →
          </span>
        </div>
      </button>
    </div>
  );
}
