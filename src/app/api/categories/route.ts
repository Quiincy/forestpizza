import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminAuth } from "@/lib/auth";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Get categories error:", error);
    return NextResponse.json({ error: "Не вдалося отримати категорії" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const isAuth = await checkAdminAuth();
    if (!isAuth) {
      return NextResponse.json({ error: "Немає доступу" }, { status: 401 });
    }

    const { name, slug, order } = await req.json();
    if (!name || !slug) {
      return NextResponse.json({ error: "Назва та slug обов'язкові" }, { status: 400 });
    }

    const cat = await prisma.category.create({
      data: {
        name: name.trim(),
        slug: slug.trim().toLowerCase(),
        order: parseInt(order, 10) || 0,
      },
    });

    return NextResponse.json({ success: true, category: cat });
  } catch (error) {
    console.error("Create category error:", error);
    return NextResponse.json({ error: "Помилка при створенні категорії" }, { status: 500 });
  }
}
