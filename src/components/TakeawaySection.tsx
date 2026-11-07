"use client";

import React, { useState } from "react";
import { Clock, Send, CheckCircle2, AlertCircle, Phone, MessageSquare, ShoppingBag, Store, MapPin, Sparkles } from "lucide-react";

interface TakeawaySectionProps {
  takeawayNotice?: string;
  restaurantPhone?: string;
}

export function TakeawaySection({
  takeawayNotice = "Замовлення на винос прийнято! Піца буде готова за 15-20 хвилин (або на обраний час) за адресою: Лісовий проспект, 11.",
  restaurantPhone = "+380 (97) 845-12-34",
}: TakeawaySectionProps) {
  const todayStr = new Date().toISOString().split("T")[0];

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
    telegramSent: boolean;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const timeSlots = [
    "11:00", "12:00", "13:00", "14:00", "15:00", "16:00",
    "17:00", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"
  ];

  const selectedTimeText =
    timeOption === "asap" ? "Якомога швидше (~15-20 хв)" : customTime;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!customerName.trim() || !phone.trim()) {
      setErrorMessage("Будь ласка, заповніть обов'язкові поля: ваше ім'я та телефон.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerName.trim(),
          phone: phone.trim(),
          date,
          time: selectedTimeText,
          comment: comment.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Не вдалося оформити замовлення на винос.");
      }

      setSuccessData(data.reservation);
      setCustomerName("");
      setPhone("");
      setComment("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Помилка при замовленні";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="takeaway" className="py-16 lg:py-24 bg-gradient-to-b from-[#07130f] to-[#091b14] border-t border-b border-[#183e30]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Store className="w-3.5 h-3.5 text-amber-400" />
            <span>Формат: Тільки на винос (Takeaway)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Замовлення з собою на час
          </h2>
          <p className="text-emerald-200/80 text-sm sm:text-base leading-relaxed">
            У нас заклад працює <b>виключно на винос та самовивіз</b>. Оформіть попереднє замовлення —
            заявка миттєво летить піцайоло в Telegram, і гаряча піца чекатиме вас у призначений час без жодних черг!
          </p>
        </div>

        {/* Success Modal / Card */}
        {successData ? (
          <div className="bg-[#0e221a] border-2 border-emerald-500/50 rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto shadow-2xl space-y-6 animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400 border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Замовлення на винос прийнято!
              </h3>
              <p className="text-emerald-300 text-sm">
                Дякуємо, <b>{successData.customerName}</b>! Піцайоло у Forest Pizza вже отримав сповіщення в Telegram.
              </p>
            </div>

            <div className="bg-[#07130f] p-5 rounded-2xl border border-[#1b5243] text-left text-xs sm:text-sm space-y-2.5">
              <div className="flex justify-between items-center text-emerald-300">
                <span>⏰ Час видачі:</span>
                <span className="font-bold text-amber-400">{successData.time}</span>
              </div>
              <div className="flex justify-between items-center text-emerald-300">
                <span>📍 Точка видачі:</span>
                <span className="font-bold text-white">Лісовий проспект, 11 (м. Київ)</span>
              </div>
              <div className="flex justify-between items-center text-emerald-300">
                <span>📦 Формат:</span>
                <span className="font-bold text-emerald-400">Самовивіз на винос (Takeaway)</span>
              </div>
            </div>

            <p className="text-xs text-emerald-400/80 leading-relaxed">
              {takeawayNotice}
            </p>

            <button
              onClick={() => setSuccessData(null)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all"
            >
              Зробити ще одне замовлення
            </button>
          </div>
        ) : (
          /* Form Container */
          <div className="bg-[#0e221a] border border-[#183e30] rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            <form onSubmit={handleSubmit} className="space-y-7">
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Step 1: Ready time selection */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-emerald-300 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>1. Коли приготувати піцу на винос?</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTimeOption("asap")}
                    className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                      timeOption === "asap"
                        ? "bg-emerald-950/60 border-amber-400 shadow-md shadow-amber-400/10"
                        : "bg-[#07130f] border-[#1b5243] hover:bg-[#122e22]"
                    }`}
                  >
                    <div className={`p-2 rounded-xl ${timeOption === "asap" ? "bg-amber-500 text-black" : "bg-[#0e221a] text-emerald-400"}`}>
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-extrabold text-white text-sm">Якомога швидше</p>
                      <p className="text-xs text-emerald-400/80 mt-0.5">Готовність через 15–20 хвилин</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTimeOption("custom")}
                    className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                      timeOption === "custom"
                        ? "bg-emerald-950/60 border-amber-400 shadow-md shadow-amber-400/10"
                        : "bg-[#07130f] border-[#1b5243] hover:bg-[#122e22]"
                    }`}
                  >
                    <div className={`p-2 rounded-xl ${timeOption === "custom" ? "bg-amber-500 text-black" : "bg-[#0e221a] text-emerald-400"}`}>
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-extrabold text-white text-sm">На точний час</p>
                      <p className="text-xs text-emerald-400/80 mt-0.5">Оберіть зручний час сьогодні</p>
                    </div>
                  </button>
                </div>

                {/* Custom Time Slots if chosen */}
                {timeOption === "custom" && (
                  <div className="pt-2 animate-fadeIn space-y-2">
                    <p className="text-xs text-emerald-400">Оберіть час самовивозу:</p>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setCustomTime(slot)}
                          className={`py-2 rounded-xl text-xs font-bold transition-all ${
                            customTime === slot
                              ? "bg-emerald-600 text-white shadow-md shadow-emerald-700/30 scale-105"
                              : "bg-[#07130f] text-emerald-300 border border-[#183e30] hover:bg-[#132c21]"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Step 2: Contact info */}
              <div className="space-y-4 pt-3 border-t border-[#183e30]">
                <label className="block text-sm font-bold text-emerald-300 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>2. Ваші контакти для видачі</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-emerald-400 mb-1">
                      Ваше ім&apos;я *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Олександр"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#07130f] border border-[#1b5243] rounded-xl px-4 py-2.5 text-white placeholder-emerald-600/50 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-emerald-400 mb-1">
                      Номер телефону *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+380 (97) 123-45-67"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#07130f] border border-[#1b5243] rounded-xl px-4 py-2.5 text-white placeholder-emerald-600/50 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-emerald-400 mb-1 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                    <span>Побажання до піци або самовивозу (необов&apos;язково)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Наприклад: порізати на 8 шматочків, додати серветки, заберу з авто біля входу"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-[#07130f] border border-[#1b5243] rounded-xl px-4 py-2.5 text-white placeholder-emerald-600/50 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Notice & Submit */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-emerald-400/80 text-center sm:text-left">
                  <p className="flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>Видача за адресою: <b>м. Київ, Лісовий проспект, 11</b></span>
                  </p>
                  <p className="mt-0.5">🔔 Замовлення миттєво летить у Telegram на кухню піцерії.</p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-base px-8 py-3.5 rounded-xl shadow-lg shadow-amber-600/20 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <span>Надсилаємо на кухню...</span>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Замовити на винос</span>
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

