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
    const { status, comment, guestsCount } = await req.json();

    const updated = await prisma.reservation.update({
      where: { id },
      data: {
        ...(status ? { status } : {}),
        ...(comment !== undefined ? { comment } : {}),
        ...(guestsCount ? { guestsCount: parseInt(guestsCount, 10) } : {}),
      },
    });

    return NextResponse.json({ success: true, reservation: updated });
  } catch (error) {
    console.error("Update reservation error:", error);
    return NextResponse.json({ error: "Не вдалося оновити бронювання" }, { status: 500 });
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
    await prisma.reservation.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Бронювання видалено" });
  } catch (error) {
    console.error("Delete reservation error:", error);
    return NextResponse.json({ error: "Не вдалося видалити бронювання" }, { status: 500 });
  }
}

