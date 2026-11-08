import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminAuth } from "@/lib/auth";
import { DEFAULT_CATEGORIES } from "@/lib/defaultData";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get("category");

    let categories = await prisma.category.findMany({
      orderBy: { order: "asc" },
      include: {
        items: {
          orderBy: { order: "asc" },
        },
      },
    }).catch(() => []);

    if (!categories || categories.length === 0) {
      categories = DEFAULT_CATEGORIES as any;
    }

    if (categorySlug && categorySlug !== "all") {
      const filtered = categories.filter((c) => c.slug === categorySlug);
      return NextResponse.json({ categories: filtered });
    }

    return NextResponse.json({ categories });
  } catch (error) {
    console.warn("Menu fetch DB fallback:", error);
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get("category");
    if (categorySlug && categorySlug !== "all") {
      const filtered = DEFAULT_CATEGORIES.filter((c) => c.slug === categorySlug);
      return NextResponse.json({ categories: filtered });
    }
    return NextResponse.json({ categories: DEFAULT_CATEGORIES });
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
