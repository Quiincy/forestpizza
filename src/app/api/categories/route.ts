import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminAuth } from "@/lib/auth";
import { DEFAULT_CATEGORIES } from "@/lib/defaultData";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { order: "asc" },
    });
    if (categories && categories.length > 0) {
      return NextResponse.json({ categories });
    }
    return NextResponse.json({
      categories: DEFAULT_CATEGORIES.map((c) => ({ id: c.id, name: c.name, slug: c.slug, order: c.order })),
    });
  } catch (error) {
    console.warn("Get categories DB fallback:", error);
    return NextResponse.json({
      categories: DEFAULT_CATEGORIES.map((c) => ({ id: c.id, name: c.name, slug: c.slug, order: c.order })),
    });
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
