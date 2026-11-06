import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminAuth } from "@/lib/auth";

const PUBLIC_KEYS = [
  "restaurant_name",
  "restaurant_address",
  "restaurant_phone",
  "restaurant_email",
  "working_hours",
  "instagram_url",
  "maps_url",
  "reservation_notice",
  "min_guests",
  "max_guests",
];

export async function GET() {
  try {
    const isAuth = await checkAdminAuth();
    const settings = await prisma.restaurantSetting.findMany();

    const result: Record<string, string> = {};
    for (const s of settings) {
      if (isAuth || PUBLIC_KEYS.includes(s.key)) {
        result[s.key] = s.value;
      }
    }

    return NextResponse.json({
      settings: result,
      isAdmin: isAuth,
    });
  } catch (error) {
    console.error("Settings fetch error:", error);
    return NextResponse.json({ error: "Не вдалося отримати налаштування" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const isAuth = await checkAdminAuth();
    if (!isAuth) {
      return NextResponse.json({ error: "Немає доступу. Будь ласка, авторизуйтесь." }, { status: 401 });
    }

    const body = await req.json();
    const updates = body.settings as Record<string, string>;

    if (!updates || typeof updates !== "object") {
      return NextResponse.json({ error: "Некоректний формат даних" }, { status: 400 });
    }

    for (const [key, value] of Object.entries(updates)) {
      if (typeof value === "string") {
        await prisma.restaurantSetting.upsert({
          where: { key },
          update: { value: value.trim() },
          create: { key, value: value.trim() },
        });
      }
    }

    return NextResponse.json({ success: true, message: "Налаштування успішно збережено!" });
  } catch (error) {
    console.error("Settings update error:", error);
    return NextResponse.json({ error: "Помилка при збереженні налаштувань" }, { status: 500 });
  }
}
