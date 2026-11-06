import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminPassword, createToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json({ error: "Пароль обов'язковий" }, { status: 400 });
    }

    const isValid = await verifyAdminPassword(password);
    if (!isValid) {
      return NextResponse.json({ error: "Невірний пароль адміністратора" }, { status: 401 });
    }

    const token = createToken({ role: "admin", timestamp: Date.now() });

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return NextResponse.json({ success: true, message: "Авторизовано успішно" });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Помилка сервера при авторизації" }, { status: 500 });
  }
}
