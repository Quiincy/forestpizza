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
  Bike,
  Store,
  MapPin,
  Phone,
  User,
  Clock,
  AlertCircle,
} from "lucide-react";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    clearCart,
    totalPrice,
    totalCount,
  } = useCart();

  const [orderType, setOrderType] = useState<"TAKEAWAY" | "DELIVERY">("TAKEAWAY");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pickupTime, setPickupTime] = useState("Якомога швидше (~15-20 хв)");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<{
    orderNumber: string;
    totalPrice: number;
    pickupTime?: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!customerName.trim() || !phone.trim()) {
      setErrorMessage("Будь ласка, вкажіть ваше ім'я та телефон");
      return;
    }

    if (orderType === "DELIVERY" && !address.trim()) {
      setErrorMessage("Для доставки вкажіть вашу адресу (вулиця, будинок, під'їзд)");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerName.trim(),
          phone: phone.trim(),
          orderType,
          address: orderType === "DELIVERY" ? address.trim() : "Самовивіз: Лісовий просп., 11",
          pickupTime,
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

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#111317] border-l border-[#262a32] flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#242830] flex items-center justify-between bg-[#15181c]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-orange-950/60 rounded-xl border border-orange-500/30 text-orange-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-white text-base sm:text-lg">Кошик замовлення</h3>
                <p className="text-xs text-orange-400 font-bold">{totalCount} поз. • {totalPrice} ₴ • На винос</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-[#22272f] transition-colors cursor-pointer"
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
                <div className="bg-[#15181c] p-4 rounded-xl border border-[#2b303a] text-xs sm:text-sm text-neutral-200 text-left space-y-2">
                  <p>Номер замовлення: <b className="text-orange-400">{orderSuccess.orderNumber}</b></p>
                  <p>Сума до оплати: <b>{orderSuccess.totalPrice} ₴</b></p>
                  {orderSuccess.pickupTime && (
                    <p>Час готовності: <b className="text-amber-400">{orderSuccess.pickupTime}</b></p>
                  )}
                  <p className="text-xs text-orange-300 pt-2 border-t border-[#242830]">
                    📍 Точка видачі: <b>м. Київ, Лісовий проспект, 11</b>. Сповіщення надіслано в Telegram!
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
              <div className="text-center py-16 text-neutral-400 space-y-3">
                <ShoppingBag className="w-12 h-12 mx-auto text-neutral-600 opacity-60" />
                <p className="font-black text-white text-base">Кошик поки що порожній</p>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                  Оберіть улюблену піцу з меню, додайте соковитий сирний або ковбасний бортик та заберіть з собою!
                </p>
              </div>
            ) : (
              <>
                {/* Items list */}
                <div className="space-y-2.5">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#16191e] p-3 rounded-xl border border-[#262a32] flex items-center justify-between gap-3"
                    >
                      <div className="flex-1">
                        <h5 className="font-black text-white text-xs sm:text-sm">{item.name}</h5>
                        <p className="text-[11px] text-orange-400 font-bold">
                          {[item.size, item.crust].filter(Boolean).join(" • ")}
                        </p>
                        <p className="text-xs text-orange-400 font-black mt-0.5">
                          {item.price * item.quantity} ₴{" "}
                          <span className="text-[10px] text-neutral-400 font-normal">
                            ({item.price} ₴/шт)
                          </span>
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1 bg-[#0e1013] border border-[#2b303a] rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-neutral-300 hover:bg-[#22262e] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-black text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-neutral-300 hover:bg-[#22262e] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-400/70 hover:text-red-400 p-1 cursor-pointer"
                        title="Видалити"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Checkout form */}
                <form id="cart-form" onSubmit={handleCheckout} className="space-y-3.5 pt-3 border-t border-[#242830]">
                  <h4 className="text-xs sm:text-sm font-black text-white">Спосіб отримання:</h4>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setOrderType("TAKEAWAY")}
                      className={`py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                        orderType === "TAKEAWAY"
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-500 shadow-md shadow-orange-950/40"
                          : "bg-[#16191e] text-neutral-300 border-[#2b303a] hover:bg-[#20242b]"
                      }`}
                    >
                      <Store className="w-3.5 h-3.5" />
                      <span>Самовивіз</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType("DELIVERY")}
                      className={`py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                        orderType === "DELIVERY"
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-500 shadow-md shadow-orange-950/40"
                          : "bg-[#16191e] text-neutral-300 border-[#2b303a] hover:bg-[#20242b]"
                      }`}
                    >
                      <Bike className="w-3.5 h-3.5" />
                      <span>Доставка</span>
                    </button>
                  </div>

                  {orderType === "TAKEAWAY" && (
                    <div className="text-xs text-orange-300 bg-orange-950/30 p-2.5 rounded-xl border border-orange-500/30 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0" />
                      <span>Точка видачі: <b>м. Київ, Лісовий проспект, 11</b></span>
                    </div>
                  )}

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="space-y-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-300 mb-1">Ваше ім&apos;я *</label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Іван"
                          className="w-full bg-[#0e1013] border border-[#2b303a] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-neutral-300 mb-1">Номер телефону *</label>
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+380 (97) 000-00-00"
                          className="w-full bg-[#0e1013] border border-[#2b303a] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                        {orderType === "TAKEAWAY" ? "Час видачі на винос" : "Час доставки"}
                      </label>
                      <div className="relative">
                        <Clock className="w-3.5 h-3.5 text-orange-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <select
                          value={pickupTime}
                          onChange={(e) => setPickupTime(e.target.value)}
                          className="w-full bg-[#0e1013] border border-[#2b303a] rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                        >
                          <option value="Якомога швидше (~15-20 хв)">Якомога швидше (~15-20 хв)</option>
                          <option value="через 30 хвилин">через 30 хвилин</option>
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

                    {orderType === "DELIVERY" && (
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-300 mb-1">Адреса доставки *</label>
                        <div className="relative">
                          <MapPin className="w-3.5 h-3.5 text-orange-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="вул. Братиславська, 14, кв. 45"
                            className="w-full bg-[#0e1013] border border-[#2b303a] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] font-bold text-neutral-300 mb-1">Побажання</label>
                      <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Напр., порізати на 8 шматочків, додати соус"
                        className="w-full bg-[#0e1013] border border-[#2b303a] rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Footer */}
          {!orderSuccess && items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#242830] bg-[#15181c] space-y-3 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))]">
              <div className="flex items-center justify-between text-base">
                <span className="text-neutral-300 font-bold">Разом:</span>
                <span className="text-2xl font-black text-orange-400">{totalPrice} ₴</span>
              </div>

              <button
                type="submit"
                form="cart-form"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-950/60 transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span>Оформлюємо...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>
                      {orderType === "TAKEAWAY"
                        ? `Замовити на винос • ${totalPrice} ₴`
                        : `Замовити доставку • ${totalPrice} ₴`}
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
