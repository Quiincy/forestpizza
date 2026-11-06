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
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<{
    orderNumber: string;
    totalPrice: number;
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

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#081712] border-l border-[#183e30] flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-[#183e30] flex items-center justify-between bg-[#0e221a]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-emerald-950 rounded-xl border border-emerald-500/30 text-amber-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-lg">Кошик замовлення</h3>
                <p className="text-xs text-emerald-400">{totalCount} позицій на {totalPrice} ₴</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-emerald-300 hover:text-white hover:bg-[#183e30] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {orderSuccess ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-black text-white">Замовлення прийнято!</h4>
                <div className="bg-[#0e221a] p-4 rounded-xl border border-[#1b5243] text-sm text-emerald-200">
                  <p>Номер замовлення: <b className="text-amber-400">{orderSuccess.orderNumber}</b></p>
                  <p>Сума: <b>{orderSuccess.totalPrice} ₴</b></p>
                  <p className="text-xs text-emerald-400 mt-2">
                    Всі деталі надіслано в наш Telegram. Ми вже починаємо розігрівати піч!
                  </p>
                </div>
                <button
                  onClick={() => {
                    setOrderSuccess(null);
                    setIsCartOpen(false);
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl"
                >
                  Чудово, дякую!
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-16 text-emerald-400 space-y-3">
                <ShoppingBag className="w-12 h-12 mx-auto text-emerald-600 opacity-60" />
                <p className="font-bold text-white text-base">Ваш кошик поки що порожній</p>
                <p className="text-xs text-emerald-300/70 max-w-xs mx-auto">
                  Оберіть улюблену піцу з меню, додайте соковитий бортик чи соус і повертайтесь сюди!
                </p>
              </div>
            ) : (
              <>
                {/* Items list */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#0e221a] p-3.5 rounded-xl border border-[#183e30] flex items-center justify-between gap-3"
                    >
                      <div className="flex-1">
                        <h5 className="font-bold text-white text-sm">{item.name}</h5>
                        <p className="text-xs text-emerald-400 font-medium">
                          {[item.size, item.crust].filter(Boolean).join(" • ")}
                        </p>
                        <p className="text-xs text-amber-400 font-extrabold mt-1">
                          {item.price * item.quantity} ₴{" "}
                          <span className="text-[11px] text-emerald-500 font-normal">
                            ({item.price} ₴/шт)
                          </span>
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1.5 bg-[#07130f] border border-[#1b5243] rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-emerald-200 hover:bg-[#183e30]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-emerald-200 hover:bg-[#183e30]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-400/70 hover:text-red-400 p-1"
                        title="Видалити"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Checkout form */}
                <form id="cart-form" onSubmit={handleCheckout} className="space-y-4 pt-4 border-t border-[#183e30]">
                  <h4 className="text-sm font-bold text-emerald-300">Спосіб отримання:</h4>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setOrderType("TAKEAWAY")}
                      className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                        orderType === "TAKEAWAY"
                          ? "bg-emerald-600 text-white border-emerald-500 shadow"
                          : "bg-[#0e221a] text-emerald-300 border-[#1b5243] hover:bg-[#143427]"
                      }`}
                    >
                      <Store className="w-4 h-4" />
                      <span>Самовивіз</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType("DELIVERY")}
                      className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                        orderType === "DELIVERY"
                          ? "bg-emerald-600 text-white border-emerald-500 shadow"
                          : "bg-[#0e221a] text-emerald-300 border-[#1b5243] hover:bg-[#143427]"
                      }`}
                    >
                      <Bike className="w-4 h-4" />
                      <span>Доставка</span>
                    </button>
                  </div>

                  {orderType === "TAKEAWAY" && (
                    <p className="text-xs text-amber-400/90 bg-[#0e221a] p-2.5 rounded-lg border border-[#1b5243] flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>Забрати за адресою: <b>м. Київ, Лісовий проспект, 11</b></span>
                    </p>
                  )}

                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="space-y-2.5">
                    <div>
                      <label className="block text-[11px] text-emerald-400 mb-1">Ваше ім&apos;я *</label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 text-emerald-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Іван"
                          className="w-full bg-[#07130f] border border-[#1b5243] rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-emerald-600/50 focus:outline-none focus:border-emerald-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-emerald-400 mb-1">Номер телефону *</label>
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 text-emerald-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+380 (97) 000-00-00"
                          className="w-full bg-[#07130f] border border-[#1b5243] rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-emerald-600/50 focus:outline-none focus:border-emerald-400"
                        />
                      </div>
                    </div>

                    {orderType === "DELIVERY" && (
                      <div>
                        <label className="block text-[11px] text-emerald-400 mb-1">Адреса доставки *</label>
                        <div className="relative">
                          <MapPin className="w-3.5 h-3.5 text-emerald-500 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="вул. Братиславська, 14, кв. 45"
                            className="w-full bg-[#07130f] border border-[#1b5243] rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-emerald-600/50 focus:outline-none focus:border-emerald-400"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] text-emerald-400 mb-1">Коментар до замовлення</label>
                      <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Напр., не дзвонити у двері, дитина спить"
                        className="w-full bg-[#07130f] border border-[#1b5243] rounded-lg px-3 py-2 text-xs text-white placeholder-emerald-600/50 focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Footer */}
          {!orderSuccess && items.length > 0 && (
            <div className="p-5 border-t border-[#183e30] bg-[#0e221a] space-y-3">
              <div className="flex items-center justify-between text-base">
                <span className="text-emerald-300 font-medium">Разом до сплати:</span>
                <span className="text-2xl font-black text-amber-400">{totalPrice} ₴</span>
              </div>

              <button
                type="submit"
                form="cart-form"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <span>Оформлюємо...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Підтвердити замовлення • {totalPrice} ₴</span>
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
