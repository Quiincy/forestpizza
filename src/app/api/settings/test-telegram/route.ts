import { NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/auth";
import { sendTelegramNotification } from "@/lib/telegram";

export async function POST(req: Request) {
  try {
    const isAuth = await checkAdminAuth();
    if (!isAuth) {
      return NextResponse.json({ error: "Немає доступу" }, { status: 401 });
    }

    const { botToken, chatId } = await req.json();

    const customConfig =
      botToken && chatId
        ? { botToken: botToken.trim(), chatId: chatId.trim() }
        : undefined;

    const testMessage =
`🌲 <b>Forest Pizza • Тестове сповіщення</b>
───────────────
✅ Вітаємо! Ваш Telegram-бот успішно підключено до сайту Forest Pizza.
🔔 Тепер сюди будуть миттєво надходити всі нові бронювання столиків та замовлення!
⏰ <i>Час тесту: ${new Date().toLocaleString("uk-UA", { timeZone: "Europe/Kyiv" })}</i>`;

    const result = await sendTelegramNotification(testMessage, customConfig);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Не вдалося надіслати повідомлення у Telegram",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Тестове повідомлення успішно надіслано у ваш Telegram!",
    });
  } catch (error: unknown) {
    console.error("Test telegram error:", error);
    const errMessage = error instanceof Error ? error.message : "Помилка сервера при перевірці Telegram";
    return NextResponse.json({ error: errMessage }, { status: 500 });
  }
}
