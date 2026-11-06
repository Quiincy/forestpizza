import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminAuth } from "@/lib/auth";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await checkAdminAuth();
    if (!isAuth) {
      return NextResponse.json({ error: "Немає доступу" }, { status: 401 });
    }

    const { id } = await params;
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

    const updated = await prisma.menuItem.update({
      where: { id },
      data: {
        ...(name ? { name: name.trim() } : {}),
        ...(description ? { description: description.trim() } : {}),
        price30: price30 !== undefined ? (price30 ? parseFloat(price30) : null) : undefined,
        price40: price40 !== undefined ? (price40 ? parseFloat(price40) : null) : undefined,
        priceSingle: priceSingle !== undefined ? (priceSingle ? parseFloat(priceSingle) : null) : undefined,
        ...(imageUrl !== undefined ? { imageUrl: imageUrl ? imageUrl.trim() : null } : {}),
        ...(categoryId ? { categoryId } : {}),
        ...(badge !== undefined ? { badge: badge ? badge.trim() : null } : {}),
        ...(isAvailable !== undefined ? { isAvailable: Boolean(isAvailable) } : {}),
        ...(order !== undefined ? { order: parseInt(order, 10) } : {}),
      },
    });

    return NextResponse.json({ success: true, item: updated });
  } catch (error) {
    console.error("Update menu item error:", error);
    return NextResponse.json({ error: "Не вдалося оновити страву" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await checkAdminAuth();
    if (!isAuth) {
      return NextResponse.json({ error: "Немає доступу" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.menuItem.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Страву видалено" });
  } catch (error) {
    console.error("Delete menu item error:", error);
    return NextResponse.json({ error: "Не вдалося видалити страву" }, { status: 500 });
  }
}
