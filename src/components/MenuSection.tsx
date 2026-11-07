"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Plus, Check, Search, Flame, Info, Pizza, X } from "lucide-react";

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

type PizzaSubfilter = "all" | "meat" | "seafood" | "cheese" | "spicy";

export function MenuSection({ categories }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [pizzaSubfilter, setPizzaSubfilter] = useState<PizzaSubfilter>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const allItems = categories.flatMap((c) =>
    c.items.map((item) => ({ ...item, categorySlug: c.slug, categoryName: c.name }))
  );

  const filteredItems = allItems.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.categorySlug === activeCategory;

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === "" ||
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q);

    if (activeCategory === "pizza" || activeCategory === "all") {
      if (item.categorySlug === "pizza" && pizzaSubfilter !== "all") {
        const desc = (item.name + " " + item.description + " " + (item.badge || "")).toLowerCase();
        if (pizzaSubfilter === "meat") {
          const isMeat =
            desc.includes("бекон") ||
            desc.includes("балик") ||
            desc.includes("пепероні") ||
            desc.includes("курка") ||
            desc.includes("куряч") ||
            desc.includes("салямі") ||
            desc.includes("ковбас");
          if (!isMeat) return false;
        } else if (pizzaSubfilter === "seafood") {
          const isSeafood =
            desc.includes("лосось") ||
            desc.includes("морськ") ||
            desc.includes("тунець") ||
            desc.includes("морепродукт");
          if (!isSeafood) return false;
        } else if (pizzaSubfilter === "cheese") {
          const isCheese =
            desc.includes("4 сири") ||
            desc.includes("горгонзол") ||
            desc.includes("прошут") ||
            desc.includes("італійськ") ||
            desc.includes("цезар");
          if (!isCheese) return false;
        } else if (pizzaSubfilter === "spicy") {
          const isSpicy =
            desc.includes("гостр") ||
            desc.includes("халапень") ||
            desc.includes("д'ябло") ||
            desc.includes("мексиканськ");
          if (!isSpicy) return false;
        }
      }
    }

    return matchesCategory && matchesSearch;
  });

  const pizzaCount = allItems.filter((i) => i.categorySlug === "pizza").length;

  return (
    <section id="menu" className="py-12 sm:py-16 lg:py-22 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-950/70 border border-orange-500/30 text-orange-400 text-xs font-black uppercase tracking-wider">
          <Flame className="w-3.5 h-3.5 text-orange-500" />
          <span>Оригінальне меню Forest Pizza</span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Меню піци на винос
        </h2>
        <p className="text-stone-300 text-xs sm:text-sm lg:text-base leading-relaxed">
          Усі 22 авторські піци у розмірах 30 см та 40 см, фірмові сирні й ковбасні бортики, соуси, закуски та напої.
        </p>

        {/* Search bar */}
        <div className="relative max-w-md mx-auto pt-2">
          <Search className="w-4 h-4 text-orange-400 absolute left-3.5 top-1/2 -translate-y-1/2 mt-1" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Пошук піци або інгредієнта (лосось, 4 сири, бекон)..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#14171f] border border-[#282e3b] text-white placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-orange-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 mt-1 text-stone-400 hover:text-white p-1"
              aria-label="Очистити пошук"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 sm:pb-4 scrollbar-none snap-x touch-pan-x justify-start sm:justify-center">
        <button
          onClick={() => {
            setActiveCategory("all");
            setPizzaSubfilter("all");
          }}
          className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-black text-xs sm:text-sm whitespace-nowrap transition-all snap-start cursor-pointer ${
            activeCategory === "all"
              ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-950/60"
              : "bg-[#14171f] text-stone-300 hover:bg-[#1e232f] border border-[#282e3b]"
          }`}
        >
          Усе меню
        </button>

        <button
          onClick={() => setActiveCategory("pizza")}
          className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-black text-xs sm:text-sm whitespace-nowrap transition-all snap-start cursor-pointer flex items-center gap-1.5 ${
            activeCategory === "pizza"
              ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-950/60"
              : "bg-[#14171f] text-stone-300 hover:bg-[#1e232f] border border-[#282e3b]"
          }`}
        >
          <span>🍕 Піца ({pizzaCount})</span>
        </button>

        {categories
          .filter((c) => c.slug !== "pizza")
          .map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-black text-xs sm:text-sm whitespace-nowrap transition-all snap-start cursor-pointer ${
                activeCategory === cat.slug
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-950/60"
                  : "bg-[#14171f] text-stone-300 hover:bg-[#1e232f] border border-[#282e3b]"
              }`}
            >
              {cat.name}
            </button>
          ))}
      </div>

      {/* Pizza Subcategories */}
      {(activeCategory === "all" || activeCategory === "pizza") && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-6 scrollbar-none snap-x justify-start sm:justify-center">
          <button
            onClick={() => setPizzaSubfilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
              pizzaSubfilter === "all"
                ? "bg-orange-500/20 text-orange-400 border border-orange-500/50"
                : "bg-[#101319] text-stone-400 border border-[#222733] hover:text-white"
            }`}
          >
            Усі 22 піци
          </button>
          <button
            onClick={() => setPizzaSubfilter("meat")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
              pizzaSubfilter === "meat"
                ? "bg-orange-500/20 text-orange-400 border border-orange-500/50"
                : "bg-[#101319] text-stone-400 border border-[#222733] hover:text-white"
            }`}
          >
            🍖 М&apos;ясні
          </button>
          <button
            onClick={() => setPizzaSubfilter("seafood")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
              pizzaSubfilter === "seafood"
                ? "bg-orange-500/20 text-orange-400 border border-orange-500/50"
                : "bg-[#101319] text-stone-400 border border-[#222733] hover:text-white"
            }`}
          >
            🦐 З морепродуктами
          </button>
          <button
            onClick={() => setPizzaSubfilter("cheese")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
              pizzaSubfilter === "cheese"
                ? "bg-orange-500/20 text-orange-400 border border-orange-500/50"
                : "bg-[#101319] text-stone-400 border border-[#222733] hover:text-white"
            }`}
          >
            🧀 Сирні та вишукані
          </button>
          <button
            onClick={() => setPizzaSubfilter("spicy")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
              pizzaSubfilter === "spicy"
                ? "bg-orange-500/20 text-orange-400 border border-orange-500/50"
                : "bg-[#101319] text-stone-400 border border-[#222733] hover:text-white"
            }`}
          >
            🔥 Гострі
          </button>
        </div>
      )}

      {/* Menu Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-[#13161c] rounded-2xl border border-[#242933] max-w-md mx-auto">
          <Info className="w-10 h-10 text-orange-400 mx-auto mb-3" />
          <p className="text-white font-black text-lg">Нічого не знайдено</p>
          <p className="text-stone-400 text-xs sm:text-sm mt-1">
            Спробуйте інший пошуковий запит або скиньте фільтри.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
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
  const hasTwoSizes = Boolean(item.price30 && item.price40);
  const isPizza = item.categorySlug === "pizza" && hasTwoSizes;

  const [selectedSize, setSelectedSize] = useState<"30 см" | "40 см">("30 см");
  const [selectedCrust, setSelectedCrust] = useState<"none" | "cheese" | "sausage">("none");
  const [justAdded, setJustAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const basePrice = hasTwoSizes
    ? selectedSize === "30 см"
      ? item.price30 || 240
      : item.price40 || 420
    : item.priceSingle || item.price30 || 100;

  const crustAddonPrice = selectedSize === "30 см" ? 65 : 95;
  const crustPrice = isPizza && selectedCrust !== "none" ? crustAddonPrice : 0;
  const currentPrice = basePrice + crustPrice;

  const handleAddToCart = () => {
    let crustLabel: string | undefined;
    if (isPizza && selectedCrust === "cheese") {
      crustLabel = `Сирний бортик (+${crustAddonPrice} грн)`;
    } else if (isPizza && selectedCrust === "sausage") {
      crustLabel = `Ковбасний бортик (+${crustAddonPrice} грн)`;
    }

    addItem({
      menuItemId: item.id,
      name: item.name,
      size: hasTwoSizes ? selectedSize : undefined,
      crust: crustLabel,
      price: currentPrice,
      quantity: 1,
      imageUrl: item.imageUrl,
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <div className="bg-[#13161c] rounded-2xl border border-[#242934] hover:border-orange-500/50 transition-all flex flex-col justify-between overflow-hidden group shadow-xl">
      <div>
        {/* Item Image (10:7 aspect ratio matches studio pizza renders without clipping) */}
        <div className="relative aspect-[10/7] w-full overflow-hidden bg-[#101217]">
          {!imgError && item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1e24] to-[#121417] text-orange-500">
              <Pizza className="w-12 h-12 mb-1 opacity-70" />
              <span className="text-[11px] font-bold text-stone-400">Forest Pizza</span>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#13161c] to-transparent pointer-events-none" />

          {/* Badge */}
          {item.badge && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[11px] font-black px-2.5 py-1 rounded-lg shadow-md">
              <span>{item.badge}</span>
            </div>
          )}

          {!item.isAvailable && (
            <div className="absolute inset-0 bg-black/75 flex items-center justify-center backdrop-blur-xs">
              <span className="bg-red-950 text-red-200 text-xs font-bold px-3 py-1.5 rounded-lg border border-red-800">
                Тимчасово відсутнє
              </span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-4 sm:p-5 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base sm:text-lg font-black text-white group-hover:text-orange-400 transition-colors leading-snug">
              {item.name}
            </h3>
            <span className="text-base sm:text-lg font-black text-orange-400 whitespace-nowrap shrink-0">
              {currentPrice} ₴
            </span>
          </div>

          <p className="text-xs text-stone-300 leading-relaxed min-h-[2.5rem]">
            {item.description}
          </p>

          {/* Size Switcher (for Pizzas and Crusts that have 30cm & 40cm) */}
          {hasTwoSizes && (
            <div className="space-y-2.5 pt-2 border-t border-[#222733]">
              <div className="grid grid-cols-2 gap-1.5 bg-[#0c0e12] p-1 rounded-xl border border-[#252a36]">
                <button
                  type="button"
                  onClick={() => setSelectedSize("30 см")}
                  className={`py-1.5 px-2 rounded-lg font-black text-xs transition-colors cursor-pointer text-center whitespace-nowrap ${
                    selectedSize === "30 см"
                      ? "bg-orange-500 text-white shadow-sm"
                      : "text-stone-400 hover:text-white"
                  }`}
                >
                  30 см • {item.price30} ₴
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSize("40 см")}
                  className={`py-1.5 px-2 rounded-lg font-black text-xs transition-colors cursor-pointer text-center whitespace-nowrap ${
                    selectedSize === "40 см"
                      ? "bg-orange-500 text-white shadow-sm"
                      : "text-stone-400 hover:text-white"
                  }`}
                >
                  40 см • {item.price40} ₴
                </button>
              </div>

              {/* Crust Selector (Only for Pizzas) */}
              {isPizza && (
                <div className="space-y-1">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Додати у бортик:
                  </span>
                  <div className="grid grid-cols-3 gap-1 bg-[#0c0e12] p-1 rounded-xl border border-[#252a36]">
                    <button
                      type="button"
                      onClick={() => setSelectedCrust("none")}
                      className={`py-1.5 px-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer truncate ${
                        selectedCrust === "none"
                          ? "bg-[#1f2430] text-white border border-[#343c4e]"
                          : "text-stone-400 hover:text-stone-200"
                      }`}
                    >
                      Класичний
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedCrust("cheese")}
                      className={`py-1.5 px-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer truncate ${
                        selectedCrust === "cheese"
                          ? "bg-orange-500/20 text-orange-300 border border-orange-500/50"
                          : "text-stone-400 hover:text-stone-200"
                      }`}
                      title={`Сирний бортик (+${crustAddonPrice} ₴)`}
                    >
                      🧀 Сир +{crustAddonPrice}₴
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedCrust("sausage")}
                      className={`py-1.5 px-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer truncate ${
                        selectedCrust === "sausage"
                          ? "bg-orange-500/20 text-orange-300 border border-orange-500/50"
                          : "text-stone-400 hover:text-stone-200"
                      }`}
                      title={`Ковбасний бортик (+${crustAddonPrice} ₴)`}
                    >
                      🌭 Ковб. +{crustAddonPrice}₴
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add to Cart Footer Button */}
      <div className="p-4 sm:p-5 pt-0">
        <button
          type="button"
          disabled={!item.isAvailable}
          onClick={handleAddToCart}
          className={`w-full py-2.5 sm:py-3 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
            !item.isAvailable
              ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
              : justAdded
              ? "bg-emerald-600 text-white scale-[1.01]"
              : "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md shadow-orange-950/50"
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4 shrink-0" />
              <span>Додано в кошик!</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 shrink-0" />
              <span>Додати в кошик • {currentPrice} ₴</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
