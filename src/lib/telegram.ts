import { prisma } from "./prisma";

export interface TelegramConfig {
  botToken: string;
  chatId: string;
}

/**
 * Retrieves Telegram credentials from the database or environment variables
 */
export async function getTelegramConfig(): Promise<TelegramConfig> {
  try {
    const settings = await prisma.restaurantSetting.findMany({
      where: {
        key: {
          in: ["telegram_bot_token", "telegram_chat_id"],
        },
      },
    });

    const tokenSetting = settings.find((s) => s.key === "telegram_bot_token")?.value;
    const chatSetting = settings.find((s) => s.key === "telegram_chat_id")?.value;

    return {
      botToken: (tokenSetting || process.env.TELEGRAM_BOT_TOKEN || "").trim(),
      chatId: (chatSetting || process.env.TELEGRAM_CHAT_ID || "").trim(),
    };
  } catch (err) {
    console.error("Failed to load telegram settings from DB:", err);
    return {
      botToken: (process.env.TELEGRAM_BOT_TOKEN || "").trim(),
      chatId: (process.env.TELEGRAM_CHAT_ID || "").trim(),
    };
  }
}

/**
 * Sends a notification to Telegram bot API
 */
export async function sendTelegramNotification(htmlMessage: string, customConfig?: TelegramConfig) {
  const config = customConfig || (await getTelegramConfig());

  if (!config.botToken || !config.chatId) {
    console.warn("Telegram bot token or chat ID is not configured.");
    return {
      success: false,
      error: "Telegram bot token або Chat ID не налаштовані в адмінці.",
    };
  }

  const url = `https://api.telegram.org/bot${config.botToken}/sendMessage`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: config.chatId,
        text: htmlMessage,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.ok) {
      console.error("Telegram API error response:", data);
      return {
        success: false,
        error: data.description || "Помилка відповіді Telegram API",
      };
    }

    return {
      success: true,
      messageId: data.result?.message_id,
    };
  } catch (error: unknown) {
    console.error("Failed to send telegram notification:", error);
    const errMessage = error instanceof Error ? error.message : "Мережева помилка при надсиланні в Telegram";
    return {
      success: false,
      error: errMessage,
    };
  }
}

/**
 * Formats a takeaway pre-order message for Telegram
 */
export function formatReservationMessage(data: {
  customerName: string;
  phone: string;
  date: string;
  time: string;
  comment?: string | null;
  id?: string;
}) {
  const commentLine = data.comment && data.comment.trim()
    ? `\n💬 <b>Коментар / побажання:</b> <i>${escapeHtml(data.comment.trim())}</i>`
    : "";

  return (
`🛍️ <b>НОВЕ ЗАМОВЛЕННЯ НА ВИНОС (САМОВИВІЗ)!</b>
───────────────
👤 <b>Клієнт:</b> <b>${escapeHtml(data.customerName)}</b>
📞 <b>Телефон:</b> <a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a>
📅 <b>Дата:</b> <b>${escapeHtml(data.date)}</b>
⏰ <b>Час готовності:</b> <b>${escapeHtml(data.time)}</b>${commentLine}
───────────────
📍 <b>Точка видачі:</b> Forest Pizza (Лісовий просп., 11)
ℹ️ <i>Формат: Тільки на винос / Самовивіз</i>`
  );
}

/**
 * Formats an order message for Telegram
 */
export function formatOrderMessage(order: {
  orderNumber: string;
  customerName: string;
  phone: string;
  orderType: string;
  address?: string | null;
  pickupTime?: string | null;
  totalPrice: number;
  comment?: string | null;
  items: Array<{
    name: string;
    size?: string;
    crust?: string;
    price: number;
    quantity: number;
  }>;
}) {
  const typeText = "🏃 <b>Самовивіз (на винос)</b>";

  const timeLine = order.pickupTime
    ? `\n⏰ <b>Час готовності:</b> <b>${escapeHtml(order.pickupTime)}</b>`
    : "";

  const addressLine = `\n📍 <b>Точка видачі:</b> Лісовий проспект, 11`;

  const commentLine = order.comment
    ? `\n💬 <b>Коментар:</b> <i>${escapeHtml(order.comment)}</i>`
    : "";

  const itemsList = order.items
    .map((item, idx) => {
      const details = [item.size, item.crust].filter(Boolean).join(", ");
      const detailStr = details ? ` (${details})` : "";
      return `${idx + 1}. <b>${escapeHtml(item.name)}</b>${detailStr} — ${item.quantity} шт × ${item.price} грн = <b>${item.quantity * item.price} грн</b>`;
    })
    .join("\n");

  return (
`🍕 <b>ЗАМОВЛЕННЯ #${escapeHtml(order.orderNumber)} (НА ВИНОС)!</b>
───────────────
👤 <b>Клієнт:</b> ${escapeHtml(order.customerName)}
📞 <b>Телефон:</b> <a href="tel:${escapeHtml(order.phone)}">${escapeHtml(order.phone)}</a>
${typeText}${timeLine}${addressLine}${commentLine}

📋 <b>Склад замовлення:</b>
${itemsList}

💰 <b>РАЗОМ ДО ОПЛАТИ:</b> <b>${order.totalPrice} грн</b>
───────────────
📍 Forest Pizza • Лісовий проспект, 11`
  );
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
