import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminAuth } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await checkAdminAuth();
    if (!isAuth) {
      return NextResponse.json({ error: "Немає доступу" }, { status: 401 });
    }

    const { id } = await params;
    const { status } = await req.json();

    const updated = await prisma.order.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    console.error("Update order error:", error);
    return NextResponse.json({ error: "Не вдалося оновити статус замовлення" }, { status: 500 });
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
    await prisma.order.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Замовлення видалено" });
  } catch (error) {
    console.error("Delete order error:", error);
    return NextResponse.json({ error: "Не вдалося видалити замовлення" }, { status: 500 });
  }
}

