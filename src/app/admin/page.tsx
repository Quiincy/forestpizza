"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Lock,
  LogOut,
  ShoppingBag,
  UtensilsCrossed,
  Settings,
  Send,
  CheckCircle2,
  AlertCircle,
  Phone,
  Trash2,
  Edit,
  Plus,
  Flame,
  RefreshCw,
  Search,
  Check,
  X,
  HelpCircle,
  Eye,
  Store,
  Clock,
  Download,
} from "lucide-react";

interface TakeawayOrderItem {
  id: string;
  customerName: string;
  phone: string;
  date: string;
  time: string;
  comment?: string | null;
  status: string;
  telegramSent: boolean;
  telegramError?: string | null;
  createdAt: string;
}

interface OrderItem {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  orderType: string;
  address?: string | null;
  pickupTime?: string | null;
  items: Array<{
    name: string;
    size?: string;
    crust?: string;
    price: number;
    quantity: number;
  }>;
  totalPrice: number;
  comment?: string | null;
  status: string;
  createdAt: string;
}

interface MenuItem {
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
  order: number;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  items?: MenuItem[];
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "takeaways" | "orders" | "menu" | "settings"
  >("dashboard");

  // Data states
  const [takeaways, setTakeaways] = useState<TakeawayOrderItem[]>([]);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Filters
  const [takeawayFilter, setTakeawayFilter] = useState<string>("ALL");
  const [takeawaySearch, setTakeawaySearch] = useState<string>("");

  // Edit / Add Menu Item Modal
  const [editingItem, setEditingItem] = useState<Partial<MenuItem> | null>(null);
  const [isNewItem, setIsNewItem] = useState(false);

  // Settings feedback
  const [settingsMessage, setSettingsMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [testingTelegram, setTestingTelegram] = useState(false);

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Auto-refresh interval (every 30 seconds)
  useEffect(() => {
    if (!isAuthenticated || !autoRefresh) return;
    const interval = setInterval(() => {
      fetchAllData(false);
    }, 30000);
    return () => clearInterval(interval);
  }, [isAuthenticated, autoRefresh]);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/check");
      const data = await res.json();
      setIsAuthenticated(Boolean(data.authenticated));
      if (data.authenticated) {
        fetchAllData();
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setLoginError(data.error || "Невірний пароль");
        return;
      }
      setIsAuthenticated(true);
      fetchAllData();
    } catch {
      setLoginError("Помилка підключення до сервера");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setIsAuthenticated(false);
  };

  const fetchAllData = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const [takeawayRes, ordRes, menuRes, setRes] = await Promise.all([
        fetch("/api/reservations"),
        fetch("/api/orders"),
        fetch("/api/menu"),
        fetch("/api/settings"),
      ]);

      if (takeawayRes.ok) {
        const d = await takeawayRes.json();
        setTakeaways(d.reservations || []);
      }
      if (ordRes.ok) {
        const d = await ordRes.json();
        setOrders(d.orders || []);
      }
      if (menuRes.ok) {
        const d = await menuRes.json();
        setCategories(d.categories || []);
      }
      if (setRes.ok) {
        const d = await setRes.json();
        setSettings(d.settings || {});
      }
    } catch (e) {
      console.error("Failed to load admin data", e);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  // Takeaway Status Update
  const updateTakeawayStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setTakeaways((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status } : r))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Delete Takeaway Order
  const deleteTakeaway = async (id: string) => {
    if (!confirm("Видалити це замовлення на винос?")) return;
    try {
      const res = await fetch(`/api/reservations/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTakeaways((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Order Status Update
  const updateOrderStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === id ? { ...o, status } : o))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Delete Order
  const deleteOrder = async (id: string) => {
    if (!confirm("Видалити замовлення?")) return;
    try {
      const res = await fetch(`/api/orders/${id}`, { method: "DELETE" });
      if (res.ok) {
        setOrders((prev) => prev.filter((o) => o.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsMessage(null);

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Помилка при збереженні");
      }
      setSettingsMessage({
        type: "success",
        text: "Налаштування успішно збережено в базі даних!",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Помилка";
      setSettingsMessage({ type: "error", text: msg });
    }
  };

  // Test Telegram Connection
  const handleTestTelegram = async () => {
    setTestingTelegram(true);
    setSettingsMessage(null);

    try {
      const res = await fetch("/api/settings/test-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          botToken: settings.telegram_bot_token,
          chatId: settings.telegram_chat_id,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Помилка надсилання в Telegram");
      }

      setSettingsMessage({
        type: "success",
        text: "🚀 Повідомлення успішно доставлено в Telegram! Перевірте ваш чат.",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Помилка Telegram API";
      setSettingsMessage({
        type: "error",
        text: `Помилка Telegram: ${msg}`,
      });
    } finally {
      setTestingTelegram(false);
    }
  };

  // Save or Update Menu Item
  const handleSaveMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.name || !editingItem.categoryId) return;

    try {
      if (isNewItem) {
        const res = await fetch("/api/menu", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingItem),
        });
        if (res.ok) {
          setEditingItem(null);
          fetchAllData();
        }
      } else {
        const res = await fetch(`/api/menu/${editingItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingItem),
        });
        if (res.ok) {
          setEditingItem(null);
          fetchAllData();
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Delete Menu Item
  const handleDeleteMenuItem = async (id: string) => {
    if (!confirm("Видалити цю позицію з меню?")) return;
    try {
      const res = await fetch(`/api/menu/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Export to CSV
  const exportTakeawaysToCSV = () => {
    const headers = ["ID", "Дата", "Час видачі", "Клієнт", "Телефон", "Побажання", "Статус", "Створено"];
    const rows = takeaways.map((r) => [
      r.id,
      r.date,
      `"${r.time}"`,
      `"${r.customerName}"`,
      `"${r.phone}"`,
      `"${(r.comment || "").replace(/"/g, '""')}"`,
      r.status,
      r.createdAt,
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `forest_pizza_takeaway_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Loading screen during auth check
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#0c0e12] flex items-center justify-center text-stone-300">
        <RefreshCw className="w-8 h-8 animate-spin text-orange-400" />
      </div>
    );
  }

  // Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0c0e12] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#13161c] border border-[#222733] rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-[#0c0e12] border border-[#2d3444] flex items-center justify-center text-orange-400 mx-auto">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-white">Панель керування</h1>
            <p className="text-xs text-stone-400">
              Forest Pizza • Тільки на винос (самовивіз) • Лісовий просп., 11
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Пароль адміністратора
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Введіть пароль..."
                className="w-full bg-[#0c0e12] border border-[#2d3444] rounded-xl px-4 py-3 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-orange-500"
              />
              <p className="text-[11px] text-stone-500/70 mt-1.5">
                За замовчуванням пароль: <code className="text-orange-400 font-mono">forest2026</code>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-sm transition-all shadow-md shadow-amber-500/20"
            >
              Увійти в систему
            </button>
          </form>

          <div className="text-center pt-2">
            <Link
              href="/"
              className="text-xs text-stone-400 hover:text-white underline transition-colors"
            >
              ← Повернутися на сайт
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate quick stats
  const todayStr = new Date().toISOString().split("T")[0];
  const todayTakeaways = takeaways.filter((r) => r.date === todayStr);
  const pendingTakeaways = takeaways.filter((r) => r.status === "NEW");
  const isTelegramConfigured =
    Boolean(settings.telegram_bot_token?.trim()) &&
    Boolean(settings.telegram_chat_id?.trim());

  const allMenuItems = categories.flatMap((c) =>
    (c.items || []).map((item) => ({ ...item, categoryName: c.name }))
  );

  return (
    <div className="min-h-screen bg-[#0c0e12] text-stone-100 flex flex-col">
      {/* Top Bar */}
      <header className="bg-[#13161c] border-b border-[#222733] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-orange-400 border border-emerald-500/30">
              <Flame className="w-5 h-5 fill-white text-white" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white">
                FOREST <span className="text-orange-400">ADMIN</span>
              </span>
              <span className="text-[10px] text-stone-400 ml-2 bg-[#0c0e12] px-2 py-0.5 rounded border border-[#222733]">
                Тільки на винос • Лісовий просп., 11
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchAllData(true)}
              className="p-1.5 rounded-lg text-stone-300 hover:text-white bg-[#0c0e12] border border-[#2d3444]"
              title="Оновити дані"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            </button>

            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 text-xs text-stone-300 hover:text-white bg-[#0c0e12] px-3 py-1.5 rounded-lg border border-[#2d3444]"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Переглянути сайт</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-red-300 hover:text-red-100 bg-red-950/40 hover:bg-red-950/80 px-3 py-1.5 rounded-lg border border-red-800 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Вийти</span>
            </button>
          </div>
        </div>
      </header>

      {/* Admin Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex flex-col md:flex-row gap-6">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-[#13161c] border border-[#222733] rounded-2xl p-3 space-y-1 sticky top-24">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === "dashboard"
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold shadow-md shadow-orange-950/40"
                  : "text-stone-300 hover:bg-[#1e232e]"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <RefreshCw className="w-4 h-4" />
                <span>Огляд</span>
              </span>
              {pendingTakeaways.length > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                  {pendingTakeaways.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("takeaways")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === "takeaways"
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold shadow-md shadow-orange-950/40"
                  : "text-stone-300 hover:bg-[#1e232e]"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Store className="w-4 h-4" />
                <span>Замовлення на винос</span>
              </span>
              <span className="text-xs opacity-70">{takeaways.length}</span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === "orders"
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold shadow-md shadow-orange-950/40"
                  : "text-stone-300 hover:bg-[#1e232e]"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4" />
                <span>Онлайн-кошик</span>
              </span>
              <span className="text-xs opacity-70">{orders.length}</span>
            </button>

            <button
              onClick={() => setActiveTab("menu")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === "menu"
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold shadow-md shadow-orange-950/40"
                  : "text-stone-300 hover:bg-[#1e232e]"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <UtensilsCrossed className="w-4 h-4" />
                <span>Меню закладу</span>
              </span>
              <span className="text-xs opacity-70">{allMenuItems.length}</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === "settings"
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold shadow-md shadow-orange-950/40"
                  : "text-stone-300 hover:bg-[#1e232e]"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Settings className="w-4 h-4" />
                <span>Налаштування</span>
              </span>
              {!isTelegramConfigured && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              )}
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 space-y-6">
          {/* TAB 1: DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white">Огляд піцерії на винос</h2>
                  <p className="text-xs text-stone-400">Формат: тільки самовивіз (на винос)</p>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#13161c] p-4 rounded-2xl border border-[#222733]">
                  <p className="text-xs text-stone-400">Самовивіз сьогодні</p>
                  <p className="text-3xl font-black text-white mt-1">
                    {todayTakeaways.length}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Замовлень на винос
                  </p>
                </div>

                <div className="bg-[#13161c] p-4 rounded-2xl border border-[#222733]">
                  <p className="text-xs text-orange-400">Очікують видачі</p>
                  <p className="text-3xl font-black text-orange-400 mt-1">
                    {pendingTakeaways.length}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-1">Нових замовлень</p>
                </div>

                <div className="bg-[#13161c] p-4 rounded-2xl border border-[#222733]">
                  <p className="text-xs text-stone-400">Замовлень з кошика</p>
                  <p className="text-3xl font-black text-white mt-1">{orders.length}</p>
                  <p className="text-[11px] text-stone-500 mt-1">Оформлено онлайн</p>
                </div>

                <div className="bg-[#13161c] p-4 rounded-2xl border border-[#222733]">
                  <p className="text-xs text-stone-400">Telegram сповіщення</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        isTelegramConfigured ? "bg-emerald-400 animate-pulse" : "bg-red-400"
                      }`}
                    />
                    <p className="text-sm font-bold text-white">
                      {isTelegramConfigured ? "Активно" : "Не налаштовано"}
                    </p>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    {isTelegramConfigured ? "Бот на кухні підключено" : "Вкажіть токен у налаштуваннях"}
                  </p>
                </div>
              </div>

              {/* Fresh incoming takeaway orders */}
              <div className="bg-[#13161c] border border-[#222733] rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-white text-lg">
                    Останні замовлення на винос (самовивіз)
                  </h3>
                  <button
                    onClick={() => setActiveTab("takeaways")}
                    className="text-xs font-bold text-orange-400 hover:underline"
                  >
                    Переглянути всі ({takeaways.length}) →
                  </button>
                </div>

                {takeaways.slice(0, 5).map((r) => (
                  <div
                    key={r.id}
                    className="bg-[#0c0e12] p-4 rounded-xl border border-[#2d3444] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-base">
                          {r.customerName}
                        </span>
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            r.status === "NEW"
                              ? "bg-amber-500/20 text-orange-300 border border-amber-500/40"
                              : r.status === "CONFIRMED"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                              : r.status === "COMPLETED"
                              ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                              : "bg-neutral-800 text-neutral-300"
                          }`}
                        >
                          {r.status === "NEW"
                            ? "НОВЕ"
                            : r.status === "CONFIRMED"
                            ? "ПРИЙНЯТО В РОБОТУ"
                            : r.status === "COMPLETED"
                            ? "ВИДАНО КЛІЄНТУ"
                            : r.status}
                        </span>
                      </div>
                      <p className="text-xs text-stone-300 mt-1 flex flex-wrap items-center gap-2">
                        <span className="font-bold text-orange-400">⏰ Час видачі: {r.time}</span>
                        <span>•</span>
                        <span>📅 {r.date}</span>
                        <span>•</span>
                        <a
                          href={`tel:${r.phone}`}
                          className="text-stone-300 font-bold hover:underline flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3 text-orange-400" />
                          <span>{r.phone}</span>
                        </a>
                      </p>
                      {r.comment && (
                        <p className="text-xs text-stone-400/80 italic mt-1 bg-[#13161c] px-2 py-1 rounded border border-[#222733]">
                          Побажання: «{r.comment}»
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {r.status !== "CONFIRMED" && (
                        <button
                          onClick={() => updateTakeawayStatus(r.id, "CONFIRMED")}
                          className="bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg"
                        >
                          В роботу (піч)
                        </button>
                      )}
                      {r.status !== "COMPLETED" && (
                        <button
                          onClick={() => updateTakeawayStatus(r.id, "COMPLETED")}
                          className="bg-[#13161c] hover:bg-[#1e232e] text-stone-300 border border-[#2d3444] text-xs font-bold px-3 py-1.5 rounded-lg"
                        >
                          Видано
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: TAKEAWAYS (RESERVATIONS TABLE) */}
          {activeTab === "takeaways" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-white">Замовлення на винос (самовивіз)</h2>
                  <p className="text-xs text-stone-400">Видача замовлень клієнтам на Лісовому просп., 11</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={exportTakeawaysToCSV}
                    className="flex items-center gap-1.5 bg-[#13161c] hover:bg-[#1e232e] text-stone-300 border border-[#2d3444] text-xs font-bold px-3 py-2 rounded-xl"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Експорт CSV</span>
                  </button>

                  {/* Filter tabs */}
                  <div className="flex items-center gap-1 bg-[#13161c] p-1 rounded-xl border border-[#222733] overflow-x-auto">
                    {["ALL", "NEW", "CONFIRMED", "COMPLETED", "CANCELLED"].map(
                      (st) => (
                        <button
                          key={st}
                          onClick={() => setTakeawayFilter(st)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                            takeawayFilter === st
                              ? "bg-orange-500 text-white"
                              : "text-stone-300 hover:text-white"
                          }`}
                        >
                          {st === "ALL"
                            ? "Всі"
                            : st === "NEW"
                            ? "Нові"
                            : st === "CONFIRMED"
                            ? "В роботі"
                            : st === "COMPLETED"
                            ? "Видані"
                            : "Скасовані"}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Search bar */}
              <div className="relative max-w-md">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Пошук за ім'ям або телефоном клієнта..."
                  value={takeawaySearch}
                  onChange={(e) => setTakeawaySearch(e.target.value)}
                  className="w-full bg-[#13161c] border border-[#222733] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Takeaway orders list */}
              <div className="space-y-3">
                {takeaways
                  .filter((r) => {
                    const matchesStatus =
                      takeawayFilter === "ALL" || r.status === takeawayFilter;
                    const matchesQuery =
                      takeawaySearch === "" ||
                      r.customerName
                        .toLowerCase()
                        .includes(takeawaySearch.toLowerCase()) ||
                      r.phone.includes(takeawaySearch);
                    return matchesStatus && matchesQuery;
                  })
                  .map((r) => (
                    <div
                      key={r.id}
                      className="bg-[#13161c] border border-[#222733] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-3">
                          <h4 className="font-extrabold text-white text-base">
                            {r.customerName}
                          </h4>
                          <span
                            className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                              r.status === "NEW"
                                ? "bg-amber-500/20 text-orange-300 border border-amber-500/40"
                                : r.status === "CONFIRMED"
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                                : r.status === "COMPLETED"
                                ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                                : "bg-red-500/20 text-red-300 border border-red-500/40"
                            }`}
                          >
                            {r.status === "NEW"
                              ? "Нове"
                              : r.status === "CONFIRMED"
                              ? "Прийнято в роботу"
                              : r.status === "COMPLETED"
                              ? "Видано клієнту"
                              : "Скасовано"}
                          </span>

                          {/* Telegram delivery badge */}
                          {r.telegramSent ? (
                            <span
                              className="text-[10px] text-stone-400 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded flex items-center gap-1"
                              title="Успішно надіслано в Telegram"
                            >
                              <Check className="w-3 h-3" /> TG доставлено
                            </span>
                          ) : (
                            <span
                              className="text-[10px] text-orange-400 bg-amber-950/70 border border-amber-500/30 px-2 py-0.5 rounded"
                              title={r.telegramError || "Не доставлено в Telegram"}
                            >
                              TG не відправлено
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-stone-300 flex flex-wrap items-center gap-3">
                          <span className="font-bold text-orange-400">⏰ Час видачі: {r.time}</span>
                          <span>📅 {r.date}</span>
                          <a
                            href={`tel:${r.phone}`}
                            className="text-stone-300 hover:text-white font-bold flex items-center gap-1 bg-[#0c0e12] px-2 py-0.5 rounded border border-[#2d3444]"
                          >
                            <Phone className="w-3 h-3 text-orange-400" />
                            <span>{r.phone}</span>
                          </a>
                        </div>

                        {r.comment && (
                          <p className="text-xs text-stone-400/90 italic bg-[#0c0e12]/60 p-2 rounded-lg border border-[#222733]">
                            Побажання: «{r.comment}»
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <select
                          value={r.status}
                          onChange={(e) =>
                            updateTakeawayStatus(r.id, e.target.value)
                          }
                          className="bg-[#0c0e12] border border-[#2d3444] rounded-xl px-3 py-1.5 text-xs text-stone-300 focus:outline-none focus:border-orange-500"
                        >
                          <option value="NEW">Нове</option>
                          <option value="CONFIRMED">Прийнято в роботу</option>
                          <option value="COMPLETED">Видано клієнту</option>
                          <option value="CANCELLED">Скасовано</option>
                        </select>

                        <button
                          onClick={() => deleteTakeaway(r.id)}
                          className="p-2 text-red-400 hover:text-red-300 bg-[#0c0e12] hover:bg-red-950/40 rounded-xl border border-red-900/50 transition-colors"
                          title="Видалити"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white">Замовлення піци з онлайн-кошика</h2>
                <p className="text-xs text-stone-400">Детальний список обраних піц з бортиками та додатками</p>
              </div>

              {orders.length === 0 ? (
                <div className="bg-[#13161c] p-12 text-center rounded-2xl border border-[#222733]">
                  <ShoppingBag className="w-10 h-10 text-stone-500 mx-auto mb-2 opacity-50" />
                  <p className="font-bold text-white">Ще немає замовлень</p>
                  <p className="text-xs text-stone-400">
                    Замовлення з онлайн-кошика з&apos;являтимуться тут та надходитимуть у Telegram.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((o) => (
                    <div
                      key={o.id}
                      className="bg-[#13161c] border border-[#222733] rounded-2xl p-5 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#222733] pb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-black text-orange-400 text-lg">
                            #{o.orderNumber}
                          </span>
                          <span className="font-bold text-white">{o.customerName}</span>
                          <a
                            href={`tel:${o.phone}`}
                            className="text-xs text-stone-300 font-bold bg-[#0c0e12] px-2 py-1 rounded border border-[#2d3444]"
                          >
                            {o.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={o.status}
                            onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                            className="bg-[#0c0e12] border border-[#2d3444] rounded-lg px-2.5 py-1 text-xs text-stone-300"
                          >
                            <option value="NEW">Нове</option>
                            <option value="PREPARING">Готується в печі</option>
                            <option value="READY">Готово до видачі</option>
                            <option value="COMPLETED">Видано</option>
                            <option value="CANCELLED">Скасовано</option>
                          </select>
                          <button
                            onClick={() => deleteOrder(o.id)}
                            className="p-1.5 text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <p className="text-stone-400 font-semibold mb-1">Склад:</p>
                          <ul className="space-y-1">
                            {o.items.map((it, i) => (
                              <li key={i} className="text-white">
                                • <b>{it.name}</b> {it.size && `(${it.size})`} {it.crust && `[${it.crust}]`} — {it.quantity} шт × {it.price} ₴
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-stone-400 font-semibold mb-1">Отримання:</p>
                          <p className="text-white">
                            🏃 Самовивіз на винос
                          </p>
                          {o.pickupTime && (
                            <p className="text-orange-400 mt-1">⏰ Час видачі: {o.pickupTime}</p>
                          )}
                          {o.address && (
                            <p className="text-stone-300 mt-1">Адреса / точка: {o.address}</p>
                          )}
                          {o.comment && (
                            <p className="text-stone-400/80 italic mt-1">
                              Коментар: «{o.comment}»
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#222733] flex justify-between items-center text-sm">
                        <span className="text-stone-400 font-medium">Разом:</span>
                        <span className="text-lg font-black text-orange-400">
                          {o.totalPrice} ₴
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: MENU MANAGEMENT */}
          {activeTab === "menu" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white">Меню закладу</h2>
                  <p className="text-xs text-stone-400">
                    Управління цінами 30/40 см, наявністю та складом страв
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingItem({
                      name: "",
                      description: "",
                      price30: 300,
                      price40: 500,
                      priceSingle: null,
                      categoryId: categories[0]?.id || "",
                      badge: "",
                      isAvailable: true,
                    });
                    setIsNewItem(true);
                  }}
                  className="flex items-center gap-1.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Додати страву</span>
                </button>
              </div>

              {/* Menu Categories Sections */}
              <div className="space-y-6">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="bg-[#13161c] border border-[#222733] rounded-2xl p-5 space-y-4"
                  >
                    <h3 className="font-extrabold text-white text-lg border-b border-[#222733] pb-2 flex items-center justify-between">
                      <span>{cat.name}</span>
                      <span className="text-xs text-stone-400 font-normal">
                        {(cat.items || []).length} позицій
                      </span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(cat.items || []).map((item) => (
                        <div
                          key={item.id}
                          className="bg-[#0c0e12] rounded-xl border border-[#2d3444] p-4 flex gap-4 items-start justify-between"
                        >
                          <div className="flex gap-3">
                            {item.imageUrl && (
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                              />
                            )}
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-white text-sm">
                                  {item.name}
                                </h4>
                                {item.badge && (
                                  <span className="text-[10px] font-black bg-orange-500 text-white px-1.5 py-0.5 rounded">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-stone-300/70 mt-1 line-clamp-2">
                                {item.description}
                              </p>
                              <div className="mt-2 text-xs font-bold text-orange-400">
                                {item.price30 && item.price40
                                  ? `30 см: ${item.price30} ₴ | 40 см: ${item.price40} ₴`
                                  : `${item.priceSingle || item.price30} ₴`}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => {
                                setEditingItem(item);
                                setIsNewItem(false);
                              }}
                              className="p-1.5 text-stone-300 hover:text-white bg-[#13161c] rounded-lg border border-[#2d3444]"
                              title="Редагувати"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteMenuItem(item.id)}
                              className="p-1.5 text-red-400 hover:text-red-300 bg-[#13161c] rounded-lg border border-[#2d3444]"
                              title="Видалити"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SETTINGS */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white">
                  Налаштування піцерії
                </h2>
                <p className="text-xs text-stone-400">
                  Telegram-сповіщення, точка видачі на Лісовому, час приготування, пароль
                </p>
              </div>

              {settingsMessage && (
                <div
                  className={`p-4 rounded-xl border text-xs sm:text-sm flex items-center gap-3 ${
                    settingsMessage.type === "success"
                      ? "bg-emerald-950/80 border-emerald-500/50 text-stone-300"
                      : "bg-red-950/80 border-red-800 text-red-200"
                  }`}
                >
                  {settingsMessage.type === "success" ? (
                    <CheckCircle2 className="w-5 h-5 text-stone-400 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  )}
                  <span>{settingsMessage.text}</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-8">
                {/* 1. Telegram Settings */}
                <div className="bg-[#13161c] border border-[#222733] rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2 border-b border-[#222733] pb-3">
                    <Send className="w-5 h-5 text-orange-400" />
                    <div>
                      <h3 className="font-extrabold text-white text-base">
                        Сповіщення в Telegram на кухню
                      </h3>
                      <p className="text-xs text-stone-400">
                        Миттєве надсилання кожного замовлення на винос піцайоло у месенджер
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#0c0e12] p-4 rounded-xl border border-[#2d3444] text-xs text-stone-300 space-y-2">
                    <p className="font-bold text-orange-400 flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4" />
                      <span>Як підключити Telegram-бота за 2 хвилини:</span>
                    </p>
                    <ol className="list-decimal list-inside space-y-1 text-stone-300/90">
                      <li>Відкрийте Telegram та знайдіть <b>@BotFather</b>. Надішліть команду <code>/newbot</code>.</li>
                      <li>Скопіюйте згенерований <b>HTTP API Token</b> і вставте в поле нижче.</li>
                      <li>Знайдіть свого створеного бота в Telegram і натисніть кнопку <b>Start</b>.</li>
                      <li>Дізнайтеся ваш Chat ID через <b>@userinfobot</b> (для особистого чату) або додайте бота у робочу групу персоналу та перевірте ID через <b>@myidbot</b>.</li>
                    </ol>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1">
                        Telegram Bot Token
                      </label>
                      <input
                        type="text"
                        value={settings.telegram_bot_token || ""}
                        onChange={(e) =>
                          setSettings({ ...settings, telegram_bot_token: e.target.value })
                        }
                        placeholder="7123456789:AAHq..."
                        className="w-full bg-[#0c0e12] border border-[#2d3444] rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-600 font-mono focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1">
                        Telegram Chat ID
                      </label>
                      <input
                        type="text"
                        value={settings.telegram_chat_id || ""}
                        onChange={(e) =>
                          setSettings({ ...settings, telegram_chat_id: e.target.value })
                        }
                        placeholder="Наприклад: 123456789 або -100123456789"
                        className="w-full bg-[#0c0e12] border border-[#2d3444] rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-600 font-mono focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="button"
                      disabled={testingTelegram}
                      onClick={handleTestTelegram}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0c0e12] hover:bg-[#132c21] text-orange-400 border border-amber-500/40 font-bold text-xs py-2.5 px-4 rounded-xl transition-all disabled:opacity-50"
                    >
                      {testingTelegram ? (
                        <span>Надсилаємо тест...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>🚀 Перевірити та надіслати тест в Telegram</span>
                        </>
                      )}
                    </button>
                    <span className="text-[11px] text-stone-500">
                      Тестове повідомлення миттєво підтвердить роботу сповіщень.
                    </span>
                  </div>
                </div>

                {/* 2. Restaurant & Takeaway Point Info */}
                <div className="bg-[#13161c] border border-[#222733] rounded-2xl p-6 space-y-4">
                  <h3 className="font-extrabold text-white text-base border-b border-[#222733] pb-3">
                    Точка самовивозу та контакти
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1">
                        Назва піцерії
                      </label>
                      <input
                        type="text"
                        value={settings.restaurant_name || ""}
                        onChange={(e) =>
                          setSettings({ ...settings, restaurant_name: e.target.value })
                        }
                        className="w-full bg-[#0c0e12] border border-[#2d3444] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1">
                        Адреса точки видачі (самовивозу)
                      </label>
                      <input
                        type="text"
                        value={settings.restaurant_address || ""}
                        onChange={(e) =>
                          setSettings({ ...settings, restaurant_address: e.target.value })
                        }
                        className="w-full bg-[#0c0e12] border border-[#2d3444] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1">
                        Контактний телефон для замовлень
                      </label>
                      <input
                        type="text"
                        value={settings.restaurant_phone || ""}
                        onChange={(e) =>
                          setSettings({ ...settings, restaurant_phone: e.target.value })
                        }
                        className="w-full bg-[#0c0e12] border border-[#2d3444] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1">
                        Графік роботи
                      </label>
                      <input
                        type="text"
                        value={settings.working_hours || ""}
                        onChange={(e) =>
                          setSettings({ ...settings, working_hours: e.target.value })
                        }
                        className="w-full bg-[#0c0e12] border border-[#2d3444] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1">
                        Середній час приготування
                      </label>
                      <input
                        type="text"
                        value={settings.pickup_time_default || "15-20 хвилин"}
                        onChange={(e) =>
                          setSettings({ ...settings, pickup_time_default: e.target.value })
                        }
                        className="w-full bg-[#0c0e12] border border-[#2d3444] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1">
                        Повідомлення клієнту після замовлення
                      </label>
                      <input
                        type="text"
                        value={settings.reservation_notice || ""}
                        onChange={(e) =>
                          setSettings({ ...settings, reservation_notice: e.target.value })
                        }
                        className="w-full bg-[#0c0e12] border border-[#2d3444] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Admin Security */}
                <div className="bg-[#13161c] border border-[#222733] rounded-2xl p-6 space-y-4">
                  <h3 className="font-extrabold text-white text-base border-b border-[#222733] pb-3">
                    Безпека входу
                  </h3>

                  <div className="max-w-md">
                    <label className="block text-xs font-bold text-stone-300 mb-1">
                      Пароль до адмін-панелі
                    </label>
                    <input
                      type="text"
                      value={settings.admin_password || ""}
                      onChange={(e) =>
                        setSettings({ ...settings, admin_password: e.target.value })
                      }
                      className="w-full bg-[#0c0e12] border border-[#2d3444] rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-orange-500"
                    />
                    <p className="text-[11px] text-stone-500 mt-1">
                      Збережіть форму, щоб оновити пароль адміністратора.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-sm py-3 px-8 rounded-xl shadow-lg transition-all"
                  >
                    Зберегти всі налаштування
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* Edit / Add Menu Item Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#13161c] border border-[#222733] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#222733] pb-3">
              <h3 className="font-extrabold text-white text-lg">
                {isNewItem ? "Додати нову страву" : `Редагувати: ${editingItem.name}`}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-stone-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMenuItem} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-300 font-bold mb-1">Назва *</label>
                <input
                  type="text"
                  required
                  value={editingItem.name || ""}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, name: e.target.value })
                  }
                  className="w-full bg-[#0c0e12] border border-[#2d3444] rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-bold mb-1">
                  Склад / Опис *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.description || ""}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, description: e.target.value })
                  }
                  className="w-full bg-[#0c0e12] border border-[#2d3444] rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-bold mb-1">Категорія *</label>
                <select
                  value={editingItem.categoryId || ""}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, categoryId: e.target.value })
                  }
                  className="w-full bg-[#0c0e12] border border-[#2d3444] rounded-xl p-2.5 text-white"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-bold mb-1">
                    Ціна 30 см (грн)
                  </label>
                  <input
                    type="number"
                    value={editingItem.price30 ?? ""}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        price30: e.target.value ? parseFloat(e.target.value) : null,
                      })
                    }
                    className="w-full bg-[#0c0e12] border border-[#2d3444] rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-bold mb-1">
                    Ціна 40 см (грн)
                  </label>
                  <input
                    type="number"
                    value={editingItem.price40 ?? ""}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        price40: e.target.value ? parseFloat(e.target.value) : null,
                      })
                    }
                    className="w-full bg-[#0c0e12] border border-[#2d3444] rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-bold mb-1">
                    Або єдина ціна (напої/соуси)
                  </label>
                  <input
                    type="number"
                    value={editingItem.priceSingle ?? ""}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        priceSingle: e.target.value ? parseFloat(e.target.value) : null,
                      })
                    }
                    className="w-full bg-[#0c0e12] border border-[#2d3444] rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-bold mb-1">
                    Бейдж (Хіт, Гостре, Шеф)
                  </label>
                  <input
                    type="text"
                    value={editingItem.badge || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, badge: e.target.value })
                    }
                    className="w-full bg-[#0c0e12] border border-[#2d3444] rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-300 font-bold mb-1">
                  URL зображення
                </label>
                <input
                  type="text"
                  value={editingItem.imageUrl || ""}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, imageUrl: e.target.value })
                  }
                  className="w-full bg-[#0c0e12] border border-[#2d3444] rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isAvailable"
                  checked={editingItem.isAvailable !== false}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, isAvailable: e.target.checked })
                  }
                  className="w-4 h-4 text-stone-500 rounded"
                />
                <label htmlFor="isAvailable" className="text-white font-bold">
                  В наявності для замовлення
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl bg-[#0c0e12] text-stone-300"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold"
                >
                  Зберегти
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
