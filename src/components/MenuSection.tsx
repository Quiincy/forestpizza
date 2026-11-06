"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Plus, Check, Search, Sparkles, Flame, Info } from "lucide-react";

export interface MenuItemData {
  id: string;
  name: string;
  description: string;
  price30?: number | null;
  price40?: number | null;
  priceSingle?: number | null;
  imageUrl?: string | null;
  categoryId: string;
  badge?: string | null;
  isAvailable: boolean;
}

export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  items: MenuItemData[];
}

interface MenuSectionProps {
  categories: CategoryData[];
}

export function MenuSection({ categories }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter items
  const allItems = categories.flatMap((c) =>
    c.items.map((item) => ({ ...item, categorySlug: c.slug, categoryName: c.name }))
  );

  const filteredItems = allItems.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.categorySlug === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="menu" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Свіже щодня</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Наше фірмове меню
        </h2>
        <p className="text-emerald-200/80 text-sm sm:text-base">
          10 авторських рецептів піци, пухкі сирні й ковбасні бортики, гарячі закуски та свіже крафтове пиво.
        </p>

        {/* Search bar */}
        <div className="relative max-w-md mx-auto pt-2">
          <Search className="w-4 h-4 text-emerald-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Пошук піци або інгредієнтів (напр. пепероні, прошуто)..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#0e221a] border border-[#1b5243] text-white placeholder-emerald-500/60 text-sm focus:outline-none focus:border-emerald-400 transition-colors"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-6 scrollbar-none">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
            activeCategory === "all"
              ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
              : "bg-[#0e221a] text-emerald-200 hover:bg-[#16382b] border border-[#1b5243]"
          }`}
        >
          Усе меню
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.slug)}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
              activeCategory === cat.slug
                ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                : "bg-[#0e221a] text-emerald-200 hover:bg-[#16382b] border border-[#1b5243]"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-[#0e221a]/50 rounded-2xl border border-[#1b5243] max-w-md mx-auto">
          <Info className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
          <p className="text-white font-bold text-lg">Нічого не знайдено</p>
          <p className="text-emerald-300 text-sm mt-1">
            Спробуйте змінити пошуковий запит або обрати іншу категорію.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}

function MenuItemCard({ item }: { item: MenuItemData & { categorySlug: string } }) {
  const { addItem } = useCart();
  const isPizza = item.categorySlug === "pizza" && item.price30 && item.price40;

  // State for pizzas
  const [selectedSize, setSelectedSize] = useState<"30 см" | "40 см">("30 см");
  const [selectedCrust, setSelectedCrust] = useState<string>("none");
  const [justAdded, setJustAdded] = useState(false);

  // Prices calculation
  const basePrice = isPizza
    ? selectedSize === "30 см"
      ? item.price30 || 240
      : item.price40 || 420
    : item.priceSingle || item.price30 || 100;

  const crustPrice =
    selectedCrust === "cheese"
      ? selectedSize === "30 см"
        ? 65
        : 95
      : selectedCrust === "sausage"
      ? selectedSize === "30 см"
        ? 65
        : 95
      : 0;

  const currentPrice = basePrice + crustPrice;

  const handleAddToCart = () => {
    let crustLabel: string | undefined;
    if (selectedCrust === "cheese") crustLabel = `Сирний бортик (+${crustPrice} грн)`;
    if (selectedCrust === "sausage") crustLabel = `Ковбасний бортик (+${crustPrice} грн)`;

    addItem({
      menuItemId: item.id,
      name: item.name,
      size: isPizza ? selectedSize : undefined,
      crust: crustLabel,
      price: currentPrice,
      quantity: 1,
      imageUrl: item.imageUrl,
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="bg-[#0e221a] rounded-2xl border border-[#183e30] hover:border-emerald-500/40 transition-all flex flex-col justify-between overflow-hidden group shadow-xl">
      <div>
        {/* Item Image */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#07130f]">
          <img
            src={
              item.imageUrl ||
              "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"
            }
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e221a] via-transparent to-transparent opacity-90" />

          {/* Badge */}
          {item.badge && (
            <div className="absolute top-3 left-3 bg-amber-500 text-black text-xs font-black px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1">
              {item.badge.includes("Гостре") ? (
                <Flame className="w-3.5 h-3.5 text-black" />
              ) : null}
              <span>{item.badge}</span>
            </div>
          )}

          {!item.isAvailable && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-xs">
              <span className="bg-red-900/90 text-red-200 text-xs font-bold px-3 py-1.5 rounded-lg border border-red-700">
                Тимчасово закінчилось
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xl font-extrabold text-white group-hover:text-amber-400 transition-colors">
              {item.name}
            </h3>
            <span className="text-lg font-black text-amber-400 whitespace-nowrap">
              {currentPrice} ₴
            </span>
          </div>

          <p className="text-xs sm:text-sm text-emerald-200/70 leading-relaxed min-h-[3rem]">
            {item.description}
          </p>

          {/* Pizza controls: Size & Crust */}
          {isPizza && (
            <div className="space-y-3 pt-2 border-t border-[#183e30]/80">
              {/* Size switch */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-medium">Розмір:</span>
                <div className="grid grid-cols-2 gap-1.5 bg-[#07130f] p-1 rounded-xl border border-[#1b5243]">
                  <button
                    type="button"
                    onClick={() => setSelectedSize("30 см")}
                    className={`px-3 py-1 rounded-lg font-bold text-xs transition-colors ${
                      selectedSize === "30 см"
                        ? "bg-emerald-600 text-white"
                        : "text-emerald-300 hover:text-white"
                    }`}
                  >
                    30 см ({item.price30} ₴)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedSize("40 см")}
                    className={`px-3 py-1 rounded-lg font-bold text-xs transition-colors ${
                      selectedSize === "40 см"
                        ? "bg-emerald-600 text-white"
                        : "text-emerald-300 hover:text-white"
                    }`}
                  >
                    40 см ({item.price40} ₴)
                  </button>
                </div>
              </div>

              {/* Crust selector */}
              <div className="space-y-1 text-xs">
                <span className="text-emerald-400 font-medium">Бортик на вибір:</span>
                <select
                  value={selectedCrust}
                  onChange={(e) => setSelectedCrust(e.target.value)}
                  className="w-full bg-[#07130f] border border-[#1b5243] rounded-lg px-2.5 py-1.5 text-emerald-200 text-xs focus:outline-none focus:border-emerald-400"
                >
                  <option value="none">Класичний бортик (без доплати)</option>
                  <option value="cheese">
                    🧀 Сирний бортик (+{selectedSize === "30 см" ? 65 : 95} ₴)
                  </option>
                  <option value="sausage">
                    🌭 Ковбасний бортик (+{selectedSize === "30 см" ? 65 : 95} ₴)
                  </option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Add button */}
      <div className="p-5 pt-0">
        <button
          type="button"
          disabled={!item.isAvailable}
          onClick={handleAddToCart}
          className={`w-full py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
            !item.isAvailable
              ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
              : justAdded
              ? "bg-green-600 text-white"
              : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/40 hover:shadow-emerald-700/30"
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4" />
              <span>Додано в кошик!</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>
                {isPizza ? `В кошик • ${currentPrice} ₴` : `В кошик • ${currentPrice} ₴`}
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

