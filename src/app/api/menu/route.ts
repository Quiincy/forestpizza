import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminAuth } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get("category");

    const categories = await prisma.category.findMany({
      orderBy: { order: "asc" },
      include: {
        items: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (categorySlug && categorySlug !== "all") {
      const filtered = categories.filter((c) => c.slug === categorySlug);
      return NextResponse.json({ categories: filtered });
    }

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Menu fetch error:", error);
    return NextResponse.json({ error: "Не вдалося отримати меню" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const isAuth = await checkAdminAuth();
    if (!isAuth) {
      return NextResponse.json({ error: "Немає доступу" }, { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      description,
      price30,
      price40,
      priceSingle,
      imageUrl,
      categoryId,
      badge,
      isAvailable,
      order,
    } = body;

    if (!name || !description || !categoryId) {
      return NextResponse.json(
        { error: "Назва, опис та категорія є обов'язковими" },
        { status: 400 }
      );
    }

    const item = await prisma.menuItem.create({
      data: {
        name: name.trim(),
        description: description.trim(),
        price30: price30 ? parseFloat(price30) : null,
        price40: price40 ? parseFloat(price40) : null,
        priceSingle: priceSingle ? parseFloat(priceSingle) : null,
        imageUrl: imageUrl ? imageUrl.trim() : null,
        categoryId,
        badge: badge ? badge.trim() : null,
        isAvailable: isAvailable !== false,
        order: parseInt(order, 10) || 0,
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error("Menu item creation error:", error);
    return NextResponse.json({ error: "Помилка при створенні позиції меню" }, { status: 500 });
  }
}
