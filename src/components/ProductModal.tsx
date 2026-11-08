"use client";

import React, { useState, useEffect } from "react";
import { X, Plus, Minus, Check, Flame, Sparkles } from "lucide-react";
import { MenuItemData } from "./MenuSection";

export interface ConfiguredCartItem {
  menuItemId: string;
  name: string;
  size?: string;
  crust?: string;
  addons?: string[];
  price: number;
  quantity: number;
  imageUrl?: string | null;
}

interface ProductModalProps {
  item: (MenuItemData & { categorySlug: string }) | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (configured: ConfiguredCartItem) => void;
}

export const PIZZA_ADDONS = [
  { id: "vegetables", name: "Овочі (30 г)", price: 30, icon: "🫑", desc: "Свіжий болгарський перець, томати, цибуля" },
  { id: "meat", name: "М'ясо (30 г)", price: 30, icon: "🥓", desc: "Бекон, мисливські ковбаски або балик" },
  { id: "cheese", name: "Сир (30 г)", price: 40, icon: "🧀", desc: "Тягуча моцарела або ніжний чеддер" },
  { id: "meatballs", name: "М'ясні кульки (30 г)", price: 40, icon: "🥩", desc: "Соковиті підрум'янені м'ясні кульки" },
];

export function ProductModal({ item, isOpen, onClose, onAddToCart }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState<"30 см" | "40 см">("30 см");
  const [selectedCrust, setSelectedCrust] = useState<"none" | "cheese" | "sausage">("none");
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [justAdded, setJustAdded] = useState(false);

  // Reset choices whenever a new item is selected
  useEffect(() => {
    if (item) {
      setSelectedSize("30 см");
      setSelectedCrust("none");
      setSelectedAddonIds([]);
      setQuantity(1);
      setJustAdded(false);
    }
  }, [item]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const hasTwoSizes = Boolean(item.price30 && item.price40);
  const isPizza = item.categorySlug === "pizza" && hasTwoSizes;

  // Pricing calculations
  const basePrice = hasTwoSizes
    ? selectedSize === "30 см"
      ? item.price30 || 240
      : item.price40 || 420
    : item.priceSingle || item.price30 || 100;

  const crustAddonPrice = selectedSize === "30 см" ? 65 : 95;
  const crustPrice = isPizza && selectedCrust !== "none" ? crustAddonPrice : 0;

  const addonsPrice = isPizza
    ? selectedAddonIds.reduce((sum, id) => {
        const found = PIZZA_ADDONS.find((a) => a.id === id);
        return sum + (found ? found.price : 0);
      }, 0)
    : 0;

  const singleItemPrice = basePrice + crustPrice + addonsPrice;
  const totalPrice = singleItemPrice * quantity;

  const toggleAddon = (id: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAdd = () => {
    let crustLabel: string | undefined;
    if (isPizza && selectedCrust === "cheese") {
      crustLabel = `Сирний бортик (+${crustAddonPrice} грн)`;
    } else if (isPizza && selectedCrust === "sausage") {
      crustLabel = `Ковбасний бортик (+${crustAddonPrice} грн)`;
    }

    const addonsList = isPizza && selectedAddonIds.length > 0
      ? selectedAddonIds.map((id) => {
          const addon = PIZZA_ADDONS.find((a) => a.id === id);
          return addon ? `${addon.name} (+${addon.price} грн)` : "";
        }).filter(Boolean)
      : undefined;

    onAddToCart({
      menuItemId: item.id,
      name: item.name,
      size: hasTwoSizes ? selectedSize : undefined,
      crust: crustLabel,
      addons: addonsList,
      price: singleItemPrice,
      quantity,
      imageUrl: item.imageUrl,
    });

    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-lg bg-[#12151c] border border-[#262c38] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-slideUp">
        {/* Header Bar with close */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-3.5 sm:p-4 border-b border-[#222733] bg-[#12151c]/95 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-orange-500 font-black text-sm">
              {isPizza ? "🍕 Налаштування піци" : "🍽️ Деталі страви"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#1b202a] text-stone-300 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Закрити"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-4 sm:px-6 py-4 space-y-5">
          {/* Pizza Image & Title */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 shrink-0 rounded-2xl overflow-hidden bg-[#0c0e12] border border-[#252a36] shadow-xl">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">🍕</div>
              )}
              {item.badge && (
                <span className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow">
                  {item.badge}
                </span>
              )}
            </div>

            <div className="space-y-1.5 min-w-0">
              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {item.name}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {item.description}
              </p>
              <div className="pt-1">
                <span className="text-lg font-black text-orange-400">
                  {singleItemPrice} ₴
                </span>
                {quantity > 1 && (
                  <span className="text-xs text-stone-400 ml-2">
                    (по {singleItemPrice} ₴/шт)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 1. Size Selector (for Pizzas) */}
          {hasTwoSizes && (
            <div className="space-y-2 pt-2 border-t border-[#222733]">
              <label className="block text-xs font-black uppercase tracking-wider text-orange-400">
                1. Оберіть розмір:
              </label>
              <div className="grid grid-cols-2 gap-2 bg-[#0c0e12] p-1.5 rounded-2xl border border-[#232834]">
                <button
                  type="button"
                  onClick={() => setSelectedSize("30 см")}
                  className={`py-2.5 px-3 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
                    selectedSize === "30 см"
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-950/60"
                      : "text-stone-300 hover:text-white hover:bg-[#161a22]"
                  }`}
                >
                  <span className="font-extrabold">30 см</span>
                  <span className="text-[11px] opacity-90">{item.price30} ₴</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSize("40 см")}
                  className={`py-2.5 px-3 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
                    selectedSize === "40 см"
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-950/60"
                      : "text-stone-300 hover:text-white hover:bg-[#161a22]"
                  }`}
                >
                  <span className="font-extrabold">40 см (Велика)</span>
                  <span className="text-[11px] opacity-90">{item.price40} ₴</span>
                </button>
              </div>
            </div>
          )}

          {/* 2. Crust Selector (Бортики) */}
          {isPizza && (
            <div className="space-y-2 pt-2 border-t border-[#222733]">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-black uppercase tracking-wider text-orange-400">
                  2. Бортики до піци:
                </label>
                <span className="text-[11px] text-stone-400">
                  {selectedSize === "30 см" ? "+65 ₴" : "+95 ₴"}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {/* Classic */}
                <button
                  type="button"
                  onClick={() => setSelectedCrust("none")}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    selectedCrust === "none"
                      ? "bg-orange-500/15 border-orange-500 text-white shadow-md shadow-orange-950/30"
                      : "bg-[#0d1016] border-[#222734] text-stone-300 hover:border-stone-600"
                  }`}
                >
                  <span className="font-bold text-xs sm:text-sm text-white">Класичний</span>
                  <span className="text-[10px] text-stone-400 mt-1">Без доплати</span>
                </button>

                {/* Cheese */}
                <button
                  type="button"
                  onClick={() => setSelectedCrust("cheese")}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    selectedCrust === "cheese"
                      ? "bg-orange-500/15 border-orange-500 text-white shadow-md shadow-orange-950/30"
                      : "bg-[#0d1016] border-[#222734] text-stone-300 hover:border-stone-600"
                  }`}
                >
                  <span className="font-bold text-xs sm:text-sm text-white flex items-center gap-1">
                    <span>🧀</span> Сирний
                  </span>
                  <span className="text-[10px] text-orange-400 font-semibold mt-1">
                    +{crustAddonPrice} ₴
                  </span>
                </button>

                {/* Sausage */}
                <button
                  type="button"
                  onClick={() => setSelectedCrust("sausage")}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    selectedCrust === "sausage"
                      ? "bg-orange-500/15 border-orange-500 text-white shadow-md shadow-orange-950/30"
                      : "bg-[#0d1016] border-[#222734] text-stone-300 hover:border-stone-600"
                  }`}
                >
                  <span className="font-bold text-xs sm:text-sm text-white flex items-center gap-1">
                    <span>🌭</span> Ковбасний
                  </span>
                  <span className="text-[10px] text-orange-400 font-semibold mt-1">
                    +{crustAddonPrice} ₴
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* 3. Addons Selector (Додатки - NOT топінги!) */}
          {isPizza && (
            <div className="space-y-2 pt-2 border-t border-[#222733]">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-black uppercase tracking-wider text-orange-400">
                  3. Додатки (30 г):
                </label>
                <span className="text-[11px] text-stone-400">Можна обрати декілька</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {PIZZA_ADDONS.map((addon) => {
                  const isChecked = selectedAddonIds.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? "bg-orange-500/15 border-orange-500 text-white shadow-md shadow-orange-950/40"
                          : "bg-[#0d1016] border-[#222734] text-stone-300 hover:border-stone-600 hover:bg-[#12161f]"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-lg shrink-0">{addon.icon}</span>
                        <div className="min-w-0">
                          <p className="font-bold text-xs sm:text-sm text-white truncate">
                            {addon.name}
                          </p>
                          <p className="text-[10px] text-orange-400 font-bold">
                            +{addon.price} ₴
                          </p>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border ${
                          isChecked
                            ? "bg-orange-500 border-orange-500 text-white"
                            : "border-stone-600 bg-transparent"
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center justify-between pt-2 border-t border-[#222733]">
            <span className="text-xs sm:text-sm font-bold text-stone-300">Кількість:</span>
            <div className="flex items-center gap-3 bg-[#0c0e12] border border-[#272d3b] rounded-xl p-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-lg bg-[#181d27] text-stone-200 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
                disabled={quantity <= 1}
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-black text-sm text-white w-6 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-lg bg-[#181d27] text-stone-200 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer with Add CTA */}
        <div className="sticky bottom-0 z-20 p-3.5 sm:p-4 border-t border-[#222733] bg-[#12151c]/98 backdrop-blur-md">
          <button
            type="button"
            onClick={handleAdd}
            className={`w-full py-3.5 sm:py-4 px-4 rounded-2xl font-black text-sm sm:text-base flex items-center justify-between transition-all cursor-pointer shadow-xl ${
              justAdded
                ? "bg-emerald-600 text-white shadow-emerald-950/60 scale-[1.01]"
                : "bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-950/60 hover:scale-[1.01]"
            }`}
          >
            {justAdded ? (
              <span className="w-full flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                <span>Додано в кошик!</span>
              </span>
            ) : (
              <>
                <span className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  <span>Додати в кошик</span>
                </span>
                <span className="text-base sm:text-lg font-black bg-black/30 px-3 py-1 rounded-xl">
                  {totalPrice} ₴
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

