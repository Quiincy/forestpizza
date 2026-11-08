"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Plus, Check, Search, Flame, Info, Pizza, X, ChevronDown } from "lucide-react";

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
            desc.includes("чорізо") ||
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
            desc.includes("чорізо") ||
            desc.includes("мексиканськ");
          if (!isSpicy) return false;
        }
      }
    }

    return matchesCategory && matchesSearch;
  });

  const pizzaCount = allItems.filter((i) => i.categorySlug === "pizza").length;

  return (
    <section id="menu" className="py-10 sm:py-16 lg:py-22 max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-950/70 border border-orange-500/30 text-orange-400 text-xs font-black uppercase tracking-wider">
          <Flame className="w-3.5 h-3.5 text-orange-500" />
          <span>Оригінальне меню Forest Pizza</span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Меню Forest Pizza To Go
        </h2>
        <p className="text-stone-300 text-xs sm:text-sm lg:text-base leading-relaxed">
          Усі {pizzaCount} авторські піци у розмірах 30 см та 40 см, фірмові чебуреки, хрусткий фритюр, сирні й ковбасні бортики та додатки.
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
            Усі {pizzaCount} піци
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

      {/* Menu Items Grid: 2 columns on mobile, 2 columns on md, 3 columns on lg */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-[#13161c] rounded-2xl border border-[#242933] max-w-md mx-auto">
          <Info className="w-10 h-10 text-orange-400 mx-auto mb-3" />
          <p className="text-white font-black text-lg">Нічого не знайдено</p>
          <p className="text-stone-400 text-xs sm:text-sm mt-1">
            Спробуйте інший пошуковий запит або скиньте фільтри.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-5 lg:gap-6">
          {filteredItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}

const PIZZA_ADDONS = [
  { id: "vegetables", name: "Овочі (30 г)", price: 30, icon: "🫑" },
  { id: "meat", name: "М'ясо (30 г)", price: 30, icon: "🥓" },
  { id: "cheese", name: "Сир (30 г)", price: 40, icon: "🧀" },
  { id: "meatballs", name: "М'ясні кульки (30 г)", price: 40, icon: "🥩" },
];

function MenuItemCard({ item }: { item: MenuItemData & { categorySlug: string } }) {
  const { addItem } = useCart();
  const hasTwoSizes = Boolean(item.price30 && item.price40);
  const isPizza = item.categorySlug === "pizza" && hasTwoSizes;

  const [selectedSize, setSelectedSize] = useState<"30 см" | "40 см">("30 см");
  const [selectedCrust, setSelectedCrust] = useState<"none" | "cheese" | "sausage">("none");
  const [selectedAddons, setSelectedAddons] = useState<Array<{ id: string; name: string; price: number; icon: string }>>([]);
  const [justAdded, setJustAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const basePrice = hasTwoSizes
    ? selectedSize === "30 см"
      ? item.price30 || 240
      : item.price40 || 420
    : item.priceSingle || item.price30 || 100;

  const crustAddonPrice = selectedSize === "30 см" ? 65 : 95;
  const crustPrice = isPizza && selectedCrust !== "none" ? crustAddonPrice : 0;
  const addonsPrice = isPizza ? selectedAddons.reduce((sum, a) => sum + a.price, 0) : 0;
  const currentPrice = basePrice + crustPrice + addonsPrice;

  const handleAddToCart = () => {
    let crustLabel: string | undefined;
    if (isPizza && selectedCrust === "cheese") {
      crustLabel = `Сирний бортик (+${crustAddonPrice} грн)`;
    } else if (isPizza && selectedCrust === "sausage") {
      crustLabel = `Ковбасний бортик (+${crustAddonPrice} грн)`;
    }

    const addonsList = isPizza && selectedAddons.length > 0
      ? selectedAddons.map((a) => `${a.name} (+${a.price} грн)`)
      : undefined;

    addItem({
      menuItemId: item.id,
      name: item.name,
      size: hasTwoSizes ? selectedSize : undefined,
      crust: crustLabel,
      addons: addonsList,
      price: currentPrice,
      quantity: 1,
      imageUrl: item.imageUrl,
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <div className="bg-[#13161c] rounded-xl sm:rounded-2xl border border-[#242934] hover:border-orange-500/50 transition-all flex flex-col justify-between overflow-hidden group shadow-xl">
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
              <Pizza className="w-8 h-8 sm:w-12 sm:h-12 mb-1 opacity-70" />
              <span className="text-[10px] sm:text-[11px] font-bold text-stone-400">Forest Pizza</span>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-8 sm:h-12 bg-gradient-to-t from-[#13161c] to-transparent pointer-events-none" />

          {/* Badge */}
          {item.badge && (
            <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[9px] sm:text-[11px] font-black px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg shadow-md">
              <span>{item.badge}</span>
            </div>
          )}

          {!item.isAvailable && (
            <div className="absolute inset-0 bg-black/75 flex items-center justify-center backdrop-blur-xs">
              <span className="bg-red-950 text-red-200 text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md border border-red-800">
                Тимчасово відсутнє
              </span>
            </div>
          )}
        </div>

        {/* Card Content: compact on mobile */}
        <div className="p-2 sm:p-4 space-y-2 sm:space-y-3">
          <div className="flex items-start justify-between gap-1 sm:gap-2">
            <h3 className="text-xs sm:text-base font-black text-white group-hover:text-orange-400 transition-colors leading-snug line-clamp-1" title={item.name}>
              {item.name}
            </h3>
            <span className="text-xs sm:text-base font-black text-orange-400 whitespace-nowrap shrink-0">
              {currentPrice} ₴
            </span>
          </div>

          <p className="text-[10px] sm:text-xs text-stone-300 leading-snug line-clamp-2 min-h-[1.75rem] sm:min-h-[2.5rem]">
            {item.description}
          </p>

          {/* Controls for Pizzas: Size, Crust dropdown, and Addon dropdown */}
          {hasTwoSizes && (
            <div className="space-y-2 pt-1.5 sm:pt-2 border-t border-[#222733]">
              {/* Size selector buttons */}
              <div className="grid grid-cols-2 gap-1 bg-[#0c0e12] p-0.5 sm:p-1 rounded-lg sm:rounded-xl border border-[#252a36]">
                <button
                  type="button"
                  onClick={() => setSelectedSize("30 см")}
                  className={`py-1 sm:py-1.5 px-0.5 sm:px-1 rounded-md sm:rounded-lg font-black text-[9px] sm:text-xs transition-colors cursor-pointer text-center truncate ${
                    selectedSize === "30 см"
                      ? "bg-orange-500 text-white shadow-sm"
                      : "text-stone-400 hover:text-white"
                  }`}
                >
                  30 см • {item.price30}₴
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSize("40 см")}
                  className={`py-1 sm:py-1.5 px-0.5 sm:px-1 rounded-md sm:rounded-lg font-black text-[9px] sm:text-xs transition-colors cursor-pointer text-center truncate ${
                    selectedSize === "40 см"
                      ? "bg-orange-500 text-white shadow-sm"
                      : "text-stone-400 hover:text-white"
                  }`}
                >
                  40 см • {item.price40}₴
                </button>
              </div>

              {/* Pizza Customization: Crust & Addons dropdowns */}
              {isPizza && (
                <div className="space-y-1.5 pt-0.5">
                  {/* Crust Dropdown */}
                  <div className="space-y-0.5">
                    <label className="block text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      Бортик до піци:
                    </label>
                    <div className="relative">
                      <select
                        value={selectedCrust}
                        onChange={(e) => setSelectedCrust(e.target.value as "none" | "cheese" | "sausage")}
                        className="w-full appearance-none bg-[#0c0e12] border border-[#272d3b] hover:border-orange-500/50 text-white rounded-lg pl-2 pr-6 py-1 text-[9px] sm:text-xs font-semibold focus:outline-none focus:border-orange-500 cursor-pointer transition-colors"
                      >
                        <option value="none">Класичний (без доплати)</option>
                        <option value="cheese">🧀 Сирний (+{crustAddonPrice} ₴)</option>
                        <option value="sausage">🌭 Ковбасний (+{crustAddonPrice} ₴)</option>
                      </select>
                      <ChevronDown className="w-3 h-3 text-stone-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Addons Dropdown */}
                  <div className="space-y-0.5">
                    <label className="block text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      Додати топінг (30 г):
                    </label>
                    <div className="relative">
                      <select
                        value=""
                        onChange={(e) => {
                          const addonId = e.target.value;
                          if (!addonId) return;
                          const found = PIZZA_ADDONS.find((a) => a.id === addonId);
                          if (found && !selectedAddons.some((a) => a.id === found.id)) {
                            setSelectedAddons((prev) => [...prev, found]);
                          }
                        }}
                        className="w-full appearance-none bg-[#0c0e12] border border-[#272d3b] hover:border-orange-500/50 text-stone-300 rounded-lg pl-2 pr-6 py-1 text-[9px] sm:text-xs font-semibold focus:outline-none focus:border-orange-500 cursor-pointer transition-colors"
                      >
                        <option value="">+ Обрати додаток...</option>
                        {PIZZA_ADDONS.map((a) => {
                          const isAdded = selectedAddons.some((s) => s.id === a.id);
                          return (
                            <option key={a.id} value={a.id} disabled={isAdded}>
                              {a.icon} {a.name} (+{a.price} ₴) {isAdded ? "✓ додано" : ""}
                            </option>
                          );
                        })}
                      </select>
                      <ChevronDown className="w-3 h-3 text-stone-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Active Addon Badges */}
                    {selectedAddons.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {selectedAddons.map((addon) => (
                          <span
                            key={addon.id}
                            className="inline-flex items-center gap-1 bg-orange-950/80 border border-orange-500/50 text-orange-200 text-[8px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                          >
                            <span>{addon.icon} +{addon.price}₴</span>
                            <button
                              type="button"
                              onClick={() => setSelectedAddons((prev) => prev.filter((a) => a.id !== addon.id))}
                              className="text-stone-400 hover:text-white cursor-pointer ml-0.5 p-0.5"
                              title="Видалити"
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add to Cart Footer Button */}
      <div className="p-2 sm:p-4 pt-0">
        <button
          type="button"
          disabled={!item.isAvailable}
          onClick={handleAddToCart}
          className={`w-full py-1.5 sm:py-2.5 px-1.5 sm:px-3 rounded-lg sm:rounded-xl font-black text-[11px] sm:text-xs flex items-center justify-center gap-1 sm:gap-1.5 transition-all cursor-pointer ${
            !item.isAvailable
              ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
              : justAdded
              ? "bg-emerald-600 text-white scale-[1.01]"
              : "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md shadow-orange-950/50"
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-3.5 h-3.5 shrink-0" />
              <span>Додано в кошик!</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate sm:hidden">+ {currentPrice} ₴</span>
              <span className="truncate hidden sm:inline">Додати в кошик • {currentPrice} ₴</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
