"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Plus, Check, Search, Flame, Info, Pizza, X, ChevronDown } from "lucide-react";
import { ProductModal, ConfiguredCartItem } from "./ProductModal";

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
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [pizzaSubfilter, setPizzaSubfilter] = useState<PizzaSubfilter>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [modalItem, setModalItem] = useState<(MenuItemData & { categorySlug: string }) | null>(null);

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
    <section id="menu" className="py-10 sm:py-16 lg:py-22 max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 w-full max-w-full min-w-0 overflow-hidden">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3 w-full min-w-0">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-950/70 border border-orange-500/30 text-orange-400 text-xs font-black uppercase tracking-wider max-w-full">
          <Flame className="w-3.5 h-3.5 text-orange-500 shrink-0" />
          <span className="truncate">Оригінальне меню Forest Pizza</span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight break-words">
          Меню Forest Pizza To Go
        </h2>
        <p className="text-stone-300 text-xs sm:text-sm lg:text-base leading-relaxed">
          Усі {pizzaCount} авторські піци у розмірах 30 см та 40 см, фірмові чебуреки, хрусткий фритюр, сирні й ковбасні бортики та додатки.
        </p>

        {/* Search bar */}
        <div className="relative w-full max-w-md mx-auto pt-2 min-w-0">
          <Search className="w-4 h-4 text-orange-400 absolute left-3.5 top-1/2 -translate-y-1/2 mt-1" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Пошук піци або інгредієнта..."
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
      <div className="w-full max-w-full min-w-0 flex items-center gap-2 overflow-x-auto pb-3 sm:pb-4 scrollbar-none snap-x touch-pan-x justify-start sm:justify-center">
        <button
          onClick={() => {
            setActiveCategory("all");
            setPizzaSubfilter("all");
          }}
          className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-black text-xs sm:text-sm whitespace-nowrap transition-all snap-start cursor-pointer shrink-0 ${
            activeCategory === "all"
              ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-950/60"
              : "bg-[#14171f] text-stone-300 hover:bg-[#1e232f] border border-[#282e3b]"
          }`}
        >
          Усе меню
        </button>

        <button
          onClick={() => setActiveCategory("pizza")}
          className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-black text-xs sm:text-sm whitespace-nowrap transition-all snap-start cursor-pointer flex items-center gap-1.5 shrink-0 ${
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
              className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-black text-xs sm:text-sm whitespace-nowrap transition-all snap-start cursor-pointer shrink-0 ${
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
        <div className="w-full max-w-full min-w-0 flex items-center gap-1.5 overflow-x-auto pb-5 scrollbar-none snap-x justify-start sm:justify-center">
          <button
            onClick={() => setPizzaSubfilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
              pizzaSubfilter === "all"
                ? "bg-orange-500/20 text-orange-400 border border-orange-500/50"
                : "bg-[#101319] text-stone-400 border border-[#222733] hover:text-white"
            }`}
          >
            Усі {pizzaCount} піци
          </button>
          <button
            onClick={() => setPizzaSubfilter("meat")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
              pizzaSubfilter === "meat"
                ? "bg-orange-500/20 text-orange-400 border border-orange-500/50"
                : "bg-[#101319] text-stone-400 border border-[#222733] hover:text-white"
            }`}
          >
            🍖 М&apos;ясні
          </button>
          <button
            onClick={() => setPizzaSubfilter("seafood")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
              pizzaSubfilter === "seafood"
                ? "bg-orange-500/20 text-orange-400 border border-orange-500/50"
                : "bg-[#101319] text-stone-400 border border-[#222733] hover:text-white"
            }`}
          >
            🦐 З морепродуктами
          </button>
          <button
            onClick={() => setPizzaSubfilter("cheese")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
              pizzaSubfilter === "cheese"
                ? "bg-orange-500/20 text-orange-400 border border-orange-500/50"
                : "bg-[#101319] text-stone-400 border border-[#222733] hover:text-white"
            }`}
          >
            🧀 Сирні та вишукані
          </button>
          <button
            onClick={() => setPizzaSubfilter("spicy")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
              pizzaSubfilter === "spicy"
                ? "bg-orange-500/20 text-orange-400 border border-orange-500/50"
                : "bg-[#101319] text-stone-400 border border-[#222733] hover:text-white"
            }`}
          >
            🔥 Гострі
          </button>
        </div>
      )}

      {/* Menu Items Grid: strictly 2 columns on mobile, 2 columns on md, 3 columns on lg */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-[#13161c] rounded-2xl border border-[#242933] max-w-md mx-auto">
          <Info className="w-10 h-10 text-orange-400 mx-auto mb-3" />
          <p className="text-white font-black text-lg">Нічого не знайдено</p>
          <p className="text-stone-400 text-xs sm:text-sm mt-1">
            Спробуйте інший пошуковий запит або скиньте фільтри.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 lg:gap-6 w-full min-w-0 overflow-hidden">
          {filteredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onSelect={(selected) => setModalItem(selected)}
            />
          ))}
        </div>
      )}

      {/* Product Detail Modal (for selecting sizes, бортики, and додатки) */}
      <ProductModal
        item={modalItem}
        isOpen={Boolean(modalItem)}
        onClose={() => setModalItem(null)}
        onAddToCart={(configured: ConfiguredCartItem) => {
          addItem(configured);
        }}
      />
    </section>
  );
}

function MenuItemCard({
  item,
  onSelect,
}: {
  item: MenuItemData & { categorySlug: string };
  onSelect: (item: MenuItemData & { categorySlug: string }) => void;
}) {
  const [imgError, setImgError] = useState(false);
  const hasTwoSizes = Boolean(item.price30 && item.price40);
  const displayPrice = hasTwoSizes ? `від ${item.price30} ₴` : `${item.priceSingle || item.price30} ₴`;

  return (
    <div
      onClick={() => onSelect(item)}
      className="min-w-0 w-full bg-[#13161c] rounded-xl sm:rounded-2xl border border-[#242934] hover:border-orange-500/60 transition-all flex flex-col justify-between overflow-hidden group shadow-xl cursor-pointer hover:shadow-orange-950/20 active:scale-[0.99]"
      title={`Переглянути та обрати ${item.name}`}
    >
      <div className="min-w-0 w-full">
        {/* Item Image */}
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
            <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[9px] sm:text-[11px] font-black px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg shadow-md max-w-[85%] truncate">
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

        {/* Card Content */}
        <div className="p-2 sm:p-4 space-y-1 sm:space-y-2 min-w-0 w-full">
          <div className="flex items-start justify-between gap-1 min-w-0">
            <h3 className="text-xs sm:text-base font-black text-white group-hover:text-orange-400 transition-colors leading-snug truncate" title={item.name}>
              {item.name}
            </h3>
            <span className="text-xs sm:text-base font-black text-orange-400 whitespace-nowrap shrink-0">
              {displayPrice}
            </span>
          </div>

          <p className="text-[10px] sm:text-xs text-stone-300 leading-snug line-clamp-2 min-h-[1.75rem] sm:min-h-[2.5rem]">
            {item.description}
          </p>
        </div>
      </div>

      {/* Action Footer Button */}
      <div className="p-2 sm:p-4 pt-0 min-w-0 w-full">
        <button
          type="button"
          disabled={!item.isAvailable}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(item);
          }}
          className={`w-full py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl font-black text-[11px] sm:text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer min-w-0 ${
            !item.isAvailable
              ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
              : "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md shadow-orange-950/50 group-hover:scale-[1.02]"
          }`}
        >
          <Plus className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">
            {hasTwoSizes ? "Обрати" : "Додати"} • {displayPrice}
          </span>
        </button>
      </div>
    </div>
  );
}
