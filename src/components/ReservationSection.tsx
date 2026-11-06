"use client";

import React, { useState } from "react";
import { Calendar, Users, Clock, Send, CheckCircle2, AlertCircle, Phone, MessageSquare, TreePine } from "lucide-react";

interface ReservationSectionProps {
  reservationNotice?: string;
  restaurantPhone?: string;
}

export function ReservationSection({
  reservationNotice = "Ми зв'яжемося з вами протягом 10 хвилин для підтвердження або надішлемо сповіщення.",
  restaurantPhone = "+380 (97) 845-12-34",
}: ReservationSectionProps) {
  // Form state
  const todayStr = new Date().toISOString().split("T")[0];
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const [date, setDate] = useState<string>(todayStr);
  const [time, setTime] = useState<string>("19:00");
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [customerName, setCustomerName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [successData, setSuccessData] = useState<{
    customerName: string;
    date: string;
    time: string;
    guestsCount: number;
    telegramSent: boolean;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const timeSlots = [
    "11:00", "12:00", "13:00", "14:00", "15:00", "16:00",
    "17:00", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!customerName.trim() || !phone.trim() || !date || !time) {
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
          time,
          guestsCount,
          comment: comment.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Не вдалося оформити бронювання.");
      }

      setSuccessData(data.reservation);
      // Reset form
      setCustomerName("");
      setPhone("");
      setComment("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Помилка при бронюванні";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="py-16 lg:py-24 bg-gradient-to-b from-[#07130f] to-[#091b14] border-t border-b border-[#183e30]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <TreePine className="w-3.5 h-3.5 text-emerald-400" />
            <span>Затишний відпочинок</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Бронювання столика
          </h2>
          <p className="text-emerald-200/80 text-sm sm:text-base">
            Зарезервуйте стіл заздалегідь для компанії, побачення чи сімейного свята.
            Заявка миттєво летить адміністратору в Telegram!
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
                Столик успішно заброньовано!
              </h3>
              <p className="text-emerald-300 text-sm">
                Дякуємо, <b>{successData.customerName}</b>! Повідомлення вже надіслано в Telegram адміністратору Forest Pizza.
              </p>
            </div>

            <div className="bg-[#07130f] p-5 rounded-2xl border border-[#1b5243] text-left text-xs sm:text-sm space-y-2.5">
              <div className="flex justify-between items-center text-emerald-300">
                <span>📅 Дата:</span>
                <span className="font-bold text-white">{successData.date}</span>
              </div>
              <div className="flex justify-between items-center text-emerald-300">
                <span>⏰ Час:</span>
                <span className="font-bold text-white">{successData.time}</span>
              </div>
              <div className="flex justify-between items-center text-emerald-300">
                <span>👥 Кількість гостей:</span>
                <span className="font-bold text-white">{successData.guestsCount} осіб</span>
              </div>
              <div className="flex justify-between items-center text-emerald-300">
                <span>📍 Локація:</span>
                <span className="font-bold text-amber-400">Лісовий проспект, 11</span>
              </div>
            </div>

            <p className="text-xs text-emerald-400/80 leading-relaxed">
              {reservationNotice}
            </p>

            <button
              onClick={() => setSuccessData(null)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all"
            >
              Забронювати ще один стіл
            </button>
          </div>
        ) : (
          /* Form Container */
          <div className="bg-[#0e221a] border border-[#183e30] rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Error Message */}
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Step 1: Date & Time */}
              <div className="space-y-4">
                <label className="block text-sm font-bold text-emerald-300 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>1. Оберіть дату та час</span>
                </label>

                {/* Quick Date Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDate(todayStr)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      date === todayStr
                        ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                        : "bg-[#07130f] text-emerald-200 border border-[#1b5243] hover:bg-[#122e22]"
                    }`}
                  >
                    Сьогодні ({todayStr.split("-").reverse().slice(0, 2).join(".")})
                  </button>
                  <button
                    type="button"
                    onClick={() => setDate(tomorrowStr)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      date === tomorrowStr
                        ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                        : "bg-[#07130f] text-emerald-200 border border-[#1b5243] hover:bg-[#122e22]"
                    }`}
                  >
                    Завтра ({tomorrowStr.split("-").reverse().slice(0, 2).join(".")})
                  </button>
                  <input
                    type="date"
                    min={todayStr}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-[#07130f] border border-[#1b5243] text-emerald-200 text-xs sm:text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                {/* Time Slots */}
                <div>
                  <p className="text-xs text-emerald-400 mb-2">Зручний час прибуття:</p>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTime(slot)}
                        className={`py-2 rounded-xl text-xs font-bold transition-all ${
                          time === slot
                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-700/30 scale-105"
                            : "bg-[#07130f] text-emerald-300 border border-[#183e30] hover:bg-[#132c21]"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 2: Guests Count */}
              <div className="space-y-3 pt-4 border-t border-[#183e30]">
                <label className="block text-sm font-bold text-emerald-300 flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>2. Скільки буде гостей?</span>
                </label>

                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-[#07130f] rounded-2xl border border-[#1b5243] p-1.5">
                    <button
                      type="button"
                      disabled={guestsCount <= 1}
                      onClick={() => setGuestsCount((c) => Math.max(1, c - 1))}
                      className="w-10 h-10 rounded-xl bg-[#0e221a] hover:bg-[#16382b] text-white font-bold flex items-center justify-center disabled:opacity-40"
                    >
                      -
                    </button>
                    <span className="w-16 text-center font-extrabold text-lg text-white">
                      {guestsCount}
                    </span>
                    <button
                      type="button"
                      disabled={guestsCount >= 20}
                      onClick={() => setGuestsCount((c) => Math.min(20, c + 1))}
                      className="w-10 h-10 rounded-xl bg-[#0e221a] hover:bg-[#16382b] text-white font-bold flex items-center justify-center disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-emerald-400/80">
                    {guestsCount <= 2
                      ? "Затишний стіл для двох"
                      : guestsCount <= 5
                      ? "Зручний столик для родини чи друзів"
                      : "Великий бенкетний або здвоєний стіл"}
                  </span>
                </div>
              </div>

              {/* Step 3: Contacts */}
              <div className="space-y-4 pt-4 border-t border-[#183e30]">
                <label className="block text-sm font-bold text-emerald-300 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>3. Ваші контакти для підтвердження</span>
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
                      className="w-full bg-[#07130f] border border-[#1b5243] rounded-xl px-4 py-2.5 text-white placeholder-emerald-600/50 text-sm focus:outline-none focus:border-emerald-400"
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
                      className="w-full bg-[#07130f] border border-[#1b5243] rounded-xl px-4 py-2.5 text-white placeholder-emerald-600/50 text-sm focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-emerald-400 mb-1 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                    <span>Побажання чи привід (необов&apos;язково)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Наприклад: стіл біля вікна, дитячий стільчик або день народження"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-[#07130f] border border-[#1b5243] rounded-xl px-4 py-2.5 text-white placeholder-emerald-600/50 text-sm focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              {/* Notice & Submit Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-emerald-400/80 text-center sm:text-left">
                  <p>🔔 Сповіщення миттєво летить в Telegram персоналу.</p>
                  <p>Або дзвоніть напряму: <a href={`tel:${restaurantPhone.replace(/\s+/g, "")}`} className="underline font-bold text-amber-400">{restaurantPhone}</a></p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-base px-8 py-3.5 rounded-xl shadow-lg shadow-amber-600/20 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <span>Надсилаємо в Telegram...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Підтвердити бронювання</span>
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

