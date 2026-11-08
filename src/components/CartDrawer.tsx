"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Send,
  CheckCircle2,
  Store,
  MapPin,
  Phone,
  User,
  Clock,
  AlertCircle,
  Bike,
  Car,
} from "lucide-react";

type OrderType = "PICKUP" | "DELIVERY_LISOVYI" | "DELIVERY_TAXI";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    clearCart,
    totalPrice: itemsTotal,
    totalCount,
  } = useCart();

  const [orderType, setOrderType] = useState<OrderType>("DELIVERY_LISOVYI");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [aptDetails, setAptDetails] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("Якомога швидше (30-45 хв)");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<{
    orderNumber: string;
    totalPrice: number;
    pickupTime?: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const deliveryFee = orderType === "DELIVERY_LISOVYI" ? 70 : 0;
  const finalTotal = itemsTotal + deliveryFee;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!customerName.trim() || !phone.trim()) {
      setErrorMessage("Будь ласка, вкажіть ваше ім'я та телефон");
      return;
    }

    if (orderType !== "PICKUP" && !streetAddress.trim()) {
      setErrorMessage("Будь ласка, вкажіть вулицю та номер будинку для доставки");
      return;
    }

    setLoading(true);

    const fullAddress =
      orderType === "PICKUP"
        ? "Самовивіз: Проспект Лісовий, 11"
        : `${streetAddress.trim()}${aptDetails.trim() ? `, ${aptDetails.trim()}` : ""}`;

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerName.trim(),
          phone: phone.trim(),
          orderType,
          address: fullAddress,
          pickupTime: deliveryTime,
          comment: comment.trim(),
          items,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Не вдалося оформити замовлення");
      }

      setOrderSuccess(data.order);
      clearCart();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Помилка при оформленні замовлення";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 left-0 sm:left-auto max-w-full flex pl-0 sm:pl-10">
        <div className="w-full sm:w-screen sm:max-w-md bg-[#111318] sm:border-l border-[#262a34] flex flex-col justify-between shadow-2xl h-full">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#242832] flex items-center justify-between bg-[#151820]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-orange-950/60 rounded-xl border border-orange-500/30 text-orange-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-white text-base sm:text-lg">Кошик замовлення</h3>
                <p className="text-xs text-orange-400 font-bold">
                  {totalCount} поз. • {finalTotal} ₴ {orderType === "DELIVERY_LISOVYI" && "(з доставкою 70 ₴)"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-[#222732] transition-colors cursor-pointer"
              aria-label="Закрити кошик"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
            {orderSuccess ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center mx-auto border border-orange-500/40">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-white">Замовлення прийнято!</h4>
                <div className="bg-[#151820] p-4 rounded-xl border border-[#2b303c] text-xs sm:text-sm text-stone-200 text-left space-y-2">
                  <p>
                    Номер замовлення: <b className="text-orange-400">{orderSuccess.orderNumber}</b>
                  </p>
                  <p>
                    Сума до оплати: <b>{orderSuccess.totalPrice} ₴</b>
                  </p>
                  {orderSuccess.pickupTime && (
                    <p>
                      Час готовності / доставки: <b className="text-amber-400">{orderSuccess.pickupTime}</b>
                    </p>
                  )}
                  <p className="text-xs text-orange-300 pt-2 border-t border-[#242832]">
                    {orderType === "PICKUP" ? (
                      <span>📍 Точка видачі: <b>м. Київ, Проспект Лісовий, 11</b>. Замовлення вже на кухні в Telegram!</span>
                    ) : (
                      <span>🛵 Кур&apos;єр вирушить з замовленням гарячим просто з печі! Замовлення надіслано в Telegram піцерії.</span>
                    )}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setOrderSuccess(null);
                    setIsCartOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black py-3 rounded-xl cursor-pointer"
                >
                  Зрозуміло, дякую!
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-16 text-stone-400 space-y-3">
                <ShoppingBag className="w-12 h-12 mx-auto text-stone-600 opacity-60" />
                <p className="font-black text-white text-base">Кошик поки що порожній</p>
                <p className="text-xs text-stone-400 max-w-xs mx-auto">
                  Оберіть улюблену піцу з меню, додайте соковитий сирний або ковбасний бортик, соуси та оформіть доставку чи самовивіз!
                </p>
              </div>
            ) : (
              <>
                {/* Items list */}
                <div className="space-y-2.5">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#161922] p-3 rounded-xl border border-[#262b38] flex items-center justify-between gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <h5 className="font-black text-white text-xs sm:text-sm truncate">
                          {item.name}
                        </h5>
                        <p className="text-[11px] text-orange-400 font-bold truncate">
                          {[item.size, item.crust].filter(Boolean).join(" • ")}
                        </p>
                        {item.addons && item.addons.length > 0 && (
                          <p className="text-[10px] text-amber-300 font-medium truncate">
                            + {item.addons.join(", ")}
                          </p>
                        )}
                        <p className="text-xs text-orange-400 font-black mt-0.5">
                          {item.price * item.quantity} ₴{" "}
                          <span className="text-[10px] text-stone-400 font-normal">
                            ({item.price} ₴/шт)
                          </span>
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1 bg-[#0c0e12] border border-[#2b303c] rounded-lg p-1 shrink-0">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-stone-300 hover:bg-[#222632] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-black text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-stone-300 hover:bg-[#222632] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-400/70 hover:text-red-400 p-1 cursor-pointer shrink-0"
                        title="Видалити"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Checkout form with Delivery Options */}
                <form id="cart-form" onSubmit={handleCheckout} className="space-y-4 pt-3 border-t border-[#242832]">
                  {/* Delivery Mode Selector */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-black text-white uppercase tracking-wider">
                      Спосіб отримання:
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 bg-[#0c0e12] p-1 rounded-2xl border border-[#262a34]">
                      <button
                        type="button"
                        onClick={() => setOrderType("DELIVERY_LISOVYI")}
                        className={`py-2 px-1 rounded-xl text-[11px] font-black transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                          orderType === "DELIVERY_LISOVYI"
                            ? "bg-orange-500 text-white shadow-md shadow-orange-950/50"
                            : "text-stone-400 hover:text-white"
                        }`}
                      >
                        <Bike className="w-4 h-4" />
                        <span>Лісовий (70₴)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setOrderType("DELIVERY_TAXI")}
                        className={`py-2 px-1 rounded-xl text-[11px] font-black transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                          orderType === "DELIVERY_TAXI"
                            ? "bg-orange-500 text-white shadow-md shadow-orange-950/50"
                            : "text-stone-400 hover:text-white"
                        }`}
                      >
                        <Car className="w-4 h-4" />
                        <span>На таксі</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setOrderType("PICKUP")}
                        className={`py-2 px-1 rounded-xl text-[11px] font-black transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                          orderType === "PICKUP"
                            ? "bg-orange-500 text-white shadow-md shadow-orange-950/50"
                            : "text-stone-400 hover:text-white"
                        }`}
                      >
                        <Store className="w-4 h-4" />
                        <span>Самовивіз</span>
                      </button>
                    </div>

                    <p className="text-[11px] text-stone-400 px-1">
                      {orderType === "DELIVERY_LISOVYI" && (
                        <span className="text-orange-400 font-semibold">
                          🛵 Доставка по Лісовому масиву: фіксовано 70 ₴ • 30–45 хв
                        </span>
                      )}
                      {orderType === "DELIVERY_TAXI" && (
                        <span className="text-amber-300 font-semibold">
                          🚖 За межі Лісового масиву — відправляємо на таксі за тарифом перевізника
                        </span>
                      )}
                      {orderType === "PICKUP" && (
                        <span className="text-emerald-400 font-semibold">
                          🛍️ Самовивіз: Проспект Лісовий, 11 • Безкоштовно (15–20 хв)
                        </span>
                      )}
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="space-y-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-300 mb-1">
                        Ваше ім&apos;я *
                      </label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Олександр"
                          className="w-full bg-[#0c0e12] border border-[#2b303c] rounded-xl pl-9 pr-3 py-2 text-base sm:text-xs text-white placeholder-stone-500 focus:outline-none focus:border-orange-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-300 mb-1">
                        Номер телефону *
                      </label>
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+380 (93) 204-28-04"
                          className="w-full bg-[#0c0e12] border border-[#2b303c] rounded-xl pl-9 pr-3 py-2 text-base sm:text-xs text-white placeholder-stone-500 focus:outline-none focus:border-orange-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Address Inputs when Delivery is chosen */}
                    {orderType !== "PICKUP" && (
                      <div className="space-y-2 bg-[#0c0e12] p-3 rounded-xl border border-[#262b36] animate-fadeIn">
                        <div>
                          <label className="block text-[11px] font-bold text-orange-400 mb-1 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>Вулиця та номер будинку *</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={streetAddress}
                            onChange={(e) => setStreetAddress(e.target.value)}
                            placeholder="напр., вул. Братиславська, 14-А"
                            className="w-full bg-[#141720] border border-[#2e3444] rounded-lg px-3 py-1.5 text-base sm:text-xs text-white placeholder-stone-500 focus:outline-none focus:border-orange-500 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-stone-400 mb-1">
                            Під&apos;їзд, поверх, квартира / код (необов&apos;язково)
                          </label>
                          <input
                            type="text"
                            value={aptDetails}
                            onChange={(e) => setAptDetails(e.target.value)}
                            placeholder="Під'їзд 2, поверх 5, кв. 42"
                            className="w-full bg-[#141720] border border-[#2e3444] rounded-lg px-3 py-1.5 text-base sm:text-xs text-white placeholder-stone-500 focus:outline-none focus:border-orange-500 transition-colors"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] font-bold text-stone-300 mb-1">
                        Час отримання:
                      </label>
                      <div className="relative">
                        <Clock className="w-3.5 h-3.5 text-orange-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <select
                          value={deliveryTime}
                          onChange={(e) => setDeliveryTime(e.target.value)}
                          className="w-full bg-[#0c0e12] border border-[#2b303c] rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                        >
                          <option value="Якомога швидше (30-45 хв)">🔥 Якомога швидше (~30-45 хв)</option>
                          <option value="через 45 хвилин">через 45 хвилин</option>
                          <option value="через 1 годину">через 1 годину</option>
                          <option value="на 18:00">на 18:00</option>
                          <option value="на 18:30">на 18:30</option>
                          <option value="на 19:00">на 19:00</option>
                          <option value="на 19:30">на 19:30</option>
                          <option value="на 20:00">на 20:00</option>
                          <option value="на 20:30">на 20:30</option>
                          <option value="на 21:00">на 21:00</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-300 mb-1">
                        Коментар до замовлення
                      </label>
                      <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Напр., гострий соус окремо, без цибулі..."
                        className="w-full bg-[#0c0e12] border border-[#2b303c] rounded-xl px-3 py-2 text-base sm:text-xs text-white placeholder-stone-500 focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Footer */}
          {!orderSuccess && items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#242832] bg-[#151820] space-y-3 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))]">
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between text-stone-400">
                  <span>Страви ({totalCount} шт):</span>
                  <span>{itemsTotal} ₴</span>
                </div>
                {orderType === "DELIVERY_LISOVYI" && (
                  <div className="flex items-center justify-between text-orange-400">
                    <span>Доставка по Лісовому масиву:</span>
                    <span>+70 ₴</span>
                  </div>
                )}
                {orderType === "DELIVERY_TAXI" && (
                  <div className="flex items-center justify-between text-amber-300 text-[11px]">
                    <span>Доставка на таксі:</span>
                    <span>за тарифом таксі</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-base pt-1 border-t border-[#262a34]">
                  <span className="text-white font-black">Разом до сплати:</span>
                  <span className="text-2xl font-black text-orange-400">{finalTotal} ₴</span>
                </div>
              </div>

              <button
                type="submit"
                form="cart-form"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-950/60 transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span>Оформлюємо замовлення...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>
                      {orderType === "PICKUP"
                        ? `Замовити самовивіз • ${finalTotal} ₴`
                        : `Замовити доставку • ${finalTotal} ₴`}
                    </span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
