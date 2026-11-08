"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Phone, Store, Bike } from "lucide-react";
import { DeliveryZonesModal } from "./DeliveryZonesModal";

interface MobileBottomBarProps {
  restaurantPhone?: string;
}

export function MobileBottomBar({ restaurantPhone = "+38 093 204 28 04" }: MobileBottomBarProps) {
  const { totalCount, totalPrice, setIsCartOpen } = useCart();
  const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);

  const scrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#121418]/95 backdrop-blur-lg border-t border-[#292d34] px-3 py-2 pb-[calc(0.625rem+env(safe-area-inset-bottom,0px))] shadow-2xl">
        <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
          {/* Quick Phone Call */}
          <a
            href={`tel:${restaurantPhone.replace(/\s+/g, "")}`}
            className="flex flex-col items-center justify-center p-1.5 rounded-xl text-neutral-300 hover:text-orange-400 hover:bg-[#1c1f24] transition-colors shrink-0"
            aria-label="Зателефонувати в піцерію"
          >
            <Phone className="w-4 h-4 text-orange-400" />
            <span className="text-[10px] font-medium mt-0.5">Дзвінок</span>
          </a>

          {/* Quick Delivery Info */}
          <button
            onClick={() => setDeliveryModalOpen(true)}
            className="flex flex-col items-center justify-center p-1.5 rounded-xl text-neutral-300 hover:text-orange-400 hover:bg-[#1c1f24] transition-colors shrink-0"
          >
            <Bike className="w-4 h-4 text-orange-400" />
            <span className="text-[10px] font-medium mt-0.5">Доставка</span>
          </button>

          {/* Quick Menu Jump */}
          <button
            onClick={() => scrollTo("menu")}
            className="flex flex-col items-center justify-center p-1.5 rounded-xl text-neutral-300 hover:text-orange-400 hover:bg-[#1c1f24] transition-colors shrink-0"
          >
            <Store className="w-4 h-4 text-orange-400" />
            <span className="text-[10px] font-medium mt-0.5">Меню</span>
          </button>

          {/* Main Cart or Checkout CTA */}
          {totalCount > 0 ? (
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex-1 flex items-center justify-between bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs px-3.5 py-2.5 rounded-xl shadow-lg shadow-orange-950/50 transition-all animate-pulse"
            >
              <div className="flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-white" />
                <span>Кошик ({totalCount})</span>
              </div>
              <span className="font-black text-xs">{totalPrice} ₴ →</span>
            </button>
          ) : (
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs py-2.5 px-3 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Замовити</span>
            </button>
          )}
        </div>
      </div>

      <DeliveryZonesModal
        isOpen={deliveryModalOpen}
        onClose={() => setDeliveryModalOpen(false)}
        restaurantPhone={restaurantPhone}
      />
    </>
  );
}
