"use client";

import React, { useState } from "react";
import { Clock, Send, CheckCircle2, AlertCircle, Phone, MessageSquare, ShoppingBag, Store, MapPin, Sparkles, Bike, Car } from "lucide-react";

interface TakeawaySectionProps {
  takeawayNotice?: string;
  restaurantPhone?: string;
}

export function TakeawaySection({
  takeawayNotice = "Замовлення прийнято! Ваша піца буде готова гарячою та запашною за адресою: Проспект Лісовий, 11 або відправлена кур'єром.",
  restaurantPhone = "+38 093 204 28 04",
}: TakeawaySectionProps) {
  const todayStr = new Date().toISOString().split("T")[0];

  const [deliveryType, setDeliveryType] = useState<"pickup" | "delivery_lisovyi" | "delivery_taxi">("delivery_lisovyi");
  const [address, setAddress] = useState<string>("");
  const [date, setDate] = useState<string>(todayStr);
  const [timeOption, setTimeOption] = useState<"asap" | "custom">("asap");
  const [customTime, setCustomTime] = useState<string>("19:00");
  const [customerName, setCustomerName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [successData, setSuccessData] = useState<{
    customerName: string;
    date: string;
    time: string;
    deliveryType: string;
    telegramSent: boolean;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const timeSlots = [
    "11:00", "12:00", "13:00", "14:00", "15:00", "16:00",
    "17:00", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"
  ];

  const selectedTimeText =
    timeOption === "asap"
      ? deliveryType === "pickup"
        ? "Якомога швидше (15-20 хв)"
        : "Якомога швидше (30-45 хв)"
      : customTime;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!customerName.trim() || !phone.trim()) {
      setErrorMessage("Будь ласка, заповніть обов'язкові поля: ваше ім'я та телефон.");
      return;
    }

    if (deliveryType !== "pickup" && !address.trim()) {
      setErrorMessage("Будь ласка, вкажіть адресу доставки (вулиця, будинок, під'їзд, кв.)");
      return;
    }

    setLoading(true);

    const deliveryNote =
      deliveryType === "delivery_lisovyi"
        ? `[ДОСТАВКА ПО ЛІСОВОМУ 70₴] Адреса: ${address.trim()}`
        : deliveryType === "delivery_taxi"
        ? `[ДОСТАВКА НА ТАКСІ] Адреса: ${address.trim()}`
        : `[САМОВИВІЗ] Точка видачі: Проспект Лісовий, 11`;

    const fullComment = [deliveryNote, comment.trim()].filter(Boolean).join(" | ");

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerName.trim(),
          phone: phone.trim(),
          date,
          time: selectedTimeText,
          comment: fullComment,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Не вдалося оформити замовлення.");
      }

      setSuccessData({
        ...data.reservation,
        deliveryType,
      });
      setCustomerName("");
      setPhone("");
      setAddress("");
      setComment("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Помилка при замовленні";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="takeaway" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-[#0d0f11] via-[#121417] to-[#0d0f11] border-t border-b border-[#242830]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-950/70 border border-orange-500/30 text-orange-400 text-xs font-black uppercase tracking-wider">
            <Bike className="w-3.5 h-3.5 text-orange-500" />
            <span>Доставка по Лісовому 70 ₴ & Самовивіз</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Швидке замовлення на час
          </h2>
          <p className="text-neutral-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            Оберіть <b>доставку кур&apos;єром по Лісовому масиву (70 грн)</b>, доставку на таксі або швидкий самовивіз без черги —
            заявка миттєво летить у Telegram на кухню піцерії!
          </p>
        </div>

        {/* Success Modal / Card */}
        {successData ? (
          <div className="bg-[#15181c] border-2 border-orange-500/50 rounded-3xl p-6 sm:p-10 text-center max-w-xl mx-auto shadow-2xl space-y-5 animate-fadeIn">
            <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto text-orange-400 border border-orange-500/40">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Замовлення прийнято!
              </h3>
              <p className="text-neutral-300 text-xs sm:text-sm">
                Дякуємо, <b>{successData.customerName}</b>! Повідомлення вже надіслано в Telegram піцайоло Forest Pizza.
              </p>
            </div>

            <div className="bg-[#0e1013] p-4 sm:p-5 rounded-2xl border border-[#2b303a] text-left text-xs sm:text-sm space-y-2">
              <div className="flex justify-between items-center text-neutral-300">
                <span>⏰ Бажаний час:</span>
                <span className="font-black text-orange-400">{successData.time}</span>
              </div>
              <div className="flex justify-between items-center text-neutral-300">
                <span>📦 Формат:</span>
                <span className="font-bold text-white">
                  {successData.deliveryType === "pickup"
                    ? "Самовивіз (Проспект Лісовий, 11)"
                    : successData.deliveryType === "delivery_lisovyi"
                    ? "Доставка по Лісовому масиву (+70 ₴)"
                    : "Доставка на таксі за межі Лісового"}
                </span>
              </div>
            </div>

            <p className="text-xs text-orange-300/80 leading-relaxed">
              {takeawayNotice}
            </p>

            <button
              onClick={() => setSuccessData(null)}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              Зробити ще одне замовлення
            </button>
          </div>
        ) : (
          /* Form Container */
          <div className="bg-[#15181c] border border-[#262b34] rounded-3xl p-5 sm:p-8 shadow-2xl relative">
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Step 1: Delivery Mode */}
              <div className="space-y-2.5">
                <label className="block text-xs sm:text-sm font-black text-white flex items-center gap-2">
                  <Store className="w-4 h-4 text-orange-500" />
                  <span>1. Оберіть спосіб отримання:</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setDeliveryType("delivery_lisovyi")}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      deliveryType === "delivery_lisovyi"
                        ? "bg-orange-950/40 border-orange-500 shadow-md shadow-orange-950/30"
                        : "bg-[#0e1013] border-[#2b303a] hover:bg-[#1a1e24]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Bike className={`w-4 h-4 ${deliveryType === "delivery_lisovyi" ? "text-orange-400" : "text-stone-400"}`} />
                      <span className="font-black text-white text-xs sm:text-sm">По Лісовому (70 ₴)</span>
                    </div>
                    <p className="text-[11px] text-orange-300 mt-1">Кур&apos;єр піцерії (30–45 хв)</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType("delivery_taxi")}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      deliveryType === "delivery_taxi"
                        ? "bg-orange-950/40 border-orange-500 shadow-md shadow-orange-950/30"
                        : "bg-[#0e1013] border-[#2b303a] hover:bg-[#1a1e24]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Car className={`w-4 h-4 ${deliveryType === "delivery_taxi" ? "text-amber-400" : "text-stone-400"}`} />
                      <span className="font-black text-white text-xs sm:text-sm">На таксі</span>
                    </div>
                    <p className="text-[11px] text-stone-400 mt-1">За межі Лісового за тарифом</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType("pickup")}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      deliveryType === "pickup"
                        ? "bg-orange-950/40 border-orange-500 shadow-md shadow-orange-950/30"
                        : "bg-[#0e1013] border-[#2b303a] hover:bg-[#1a1e24]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Store className={`w-4 h-4 ${deliveryType === "pickup" ? "text-emerald-400" : "text-stone-400"}`} />
                      <span className="font-black text-white text-xs sm:text-sm">Самовивіз (0 ₴)</span>
                    </div>
                    <p className="text-[11px] text-emerald-400 mt-1">Проспект Лісовий, 11 (15–20 хв)</p>
                  </button>
                </div>
              </div>

              {/* Step 2: Ready time selection */}
              <div className="space-y-3 pt-2 border-t border-[#242830]">
                <label className="block text-xs sm:text-sm font-black text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span>2. Коли приготувати замовлення?</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTimeOption("asap")}
                    className={`p-3 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      timeOption === "asap"
                        ? "bg-orange-950/40 border-orange-500 shadow-md shadow-orange-950/30"
                        : "bg-[#0e1013] border-[#2b303a] hover:bg-[#1a1e24]"
                    }`}
                  >
                    <div className={`p-2 rounded-xl ${timeOption === "asap" ? "bg-orange-500 text-white" : "bg-[#171a1f] text-orange-400"}`}>
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-black text-white text-sm">Якомога швидше</p>
                      <p className="text-xs text-orange-400 mt-0.5 font-bold">
                        {deliveryType === "pickup" ? "Готовність через 15–20 хв" : "Доставка через 30–45 хв"}
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTimeOption("custom")}
                    className={`p-3 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      timeOption === "custom"
                        ? "bg-orange-950/40 border-orange-500 shadow-md shadow-orange-950/30"
                        : "bg-[#0e1013] border-[#2b303a] hover:bg-[#1a1e24]"
                    }`}
                  >
                    <div className={`p-2 rounded-xl ${timeOption === "custom" ? "bg-orange-500 text-white" : "bg-[#171a1f] text-orange-400"}`}>
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-black text-white text-sm">На точний час</p>
                      <p className="text-xs text-neutral-400 mt-0.5">Оберіть зручний час сьогодні</p>
                    </div>
                  </button>
                </div>

                {/* Custom Time Slots if chosen */}
                {timeOption === "custom" && (
                  <div className="pt-2 animate-fadeIn space-y-2">
                    <p className="text-xs text-neutral-400">Оберіть час отримання:</p>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setCustomTime(slot)}
                          className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                            customTime === slot
                              ? "bg-orange-500 text-white shadow-md shadow-orange-900/50 scale-105"
                              : "bg-[#0e1013] text-neutral-300 border border-[#2b303a] hover:bg-[#1c1f24]"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Step 3: Contact info & Delivery Address */}
              <div className="space-y-3.5 pt-2 border-t border-[#242830]">
                <label className="block text-xs sm:text-sm font-black text-white flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange-500" />
                  <span>3. Контакти та адреса</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">
                      Ваше ім&apos;я *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Олександр"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#0e1013] border border-[#2b303a] rounded-xl px-4 py-2.5 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">
                      Номер телефону *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+380 (93) 204-28-04"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#0e1013] border border-[#2b303a] rounded-xl px-4 py-2.5 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                {deliveryType !== "pickup" && (
                  <div className="animate-fadeIn">
                    <label className="block text-xs text-orange-400 font-bold mb-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Адреса доставки (вулиця, будинок, під&apos;їзд, кв.) *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="напр., вул. Шолом-Алейхема, 15, під'їзд 1, кв. 12"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-[#0e1013] border border-[#2b303a] rounded-xl px-4 py-2.5 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs text-neutral-400 mb-1 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-orange-500" />
                    <span>Побажання до піци або замовлення (необов&apos;язково)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Напр., порізати на 8 частин, покласти серветки, додатковий соус..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-[#0e1013] border border-[#2b303a] rounded-xl px-4 py-2.5 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-neutral-400 text-center sm:text-left">
                  <p className="flex items-center gap-1.5 text-orange-300 font-bold">
                    <MapPin className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                    <span>Forest Pizza: <b>м. Київ, Проспект Лісовий, 11</b></span>
                  </p>
                  <p className="mt-0.5">🔔 Замовлення миттєво надходить у Telegram піцайоло.</p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-lg shadow-orange-950/60 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <span>Надсилаємо на кухню...</span>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>
                        {deliveryType === "pickup"
                          ? "Замовити самовивіз"
                          : "Замовити доставку"}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
