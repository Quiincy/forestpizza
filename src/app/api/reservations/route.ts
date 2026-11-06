import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminAuth } from "@/lib/auth";
import { formatReservationMessage, sendTelegramNotification } from "@/lib/telegram";

// Public creation of reservation
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, phone, date, time, guestsCount, comment } = body;

    if (!customerName || !phone || !date || !time) {
      return NextResponse.json(
        { error: "Будь ласка, заповніть усі обов'язкові поля (ім'я, телефон, дата, час)." },
        { status: 400 }
      );
    }

    const guests = parseInt(guestsCount, 10) || 2;

    // Create reservation in DB
    const reservation = await prisma.reservation.create({
      data: {
        customerName: customerName.trim(),
        phone: phone.trim(),
        date: date.trim(),
        time: time.trim(),
        guestsCount: guests,
        comment: comment ? comment.trim() : null,
        status: "NEW",
      },
    });

    // Send instant notification to Telegram
    let telegramSent = false;
    let telegramError: string | null = null;

    try {
      const msg = formatReservationMessage({
        customerName: reservation.customerName,
        phone: reservation.phone,
        date: reservation.date,
        time: reservation.time,
        guestsCount: reservation.guestsCount,
        comment: reservation.comment,
        id: reservation.id,
      });

      const tgResult = await sendTelegramNotification(msg);
      telegramSent = tgResult.success;
      if (!tgResult.success && tgResult.error) {
        telegramError = tgResult.error;
      }
    } catch (tgErr: unknown) {
      console.error("Telegram notification error:", tgErr);
      telegramError = tgErr instanceof Error ? tgErr.message : "Telegram network error";
    }

    // Update reservation with telegram delivery status
    await prisma.reservation.update({
      where: { id: reservation.id },
      data: {
        telegramSent,
        telegramError,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Бронювання успішно надіслано!",
      reservation: {
        id: reservation.id,
        customerName: reservation.customerName,
        date: reservation.date,
        time: reservation.time,
        guestsCount: reservation.guestsCount,
        telegramSent,
      },
    });
  } catch (error) {
    console.error("Reservation creation error:", error);
    return NextResponse.json(
      { error: "Не вдалося оформити бронювання. Спробуйте ще раз або зателефонуйте нам." },
      { status: 500 }
    );
  }
}

// Admin list of reservations
export async function GET(req: Request) {
  try {
    const isAuth = await checkAdminAuth();
    if (!isAuth) {
      return NextResponse.json({ error: "Немає доступу" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const whereClause = status && status !== "ALL" ? { status } : {};

    const reservations = await prisma.reservation.findMany({
      where: whereClause,
      orderBy: [{ date: "desc" }, { time: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ reservations });
  } catch (error) {
    console.error("Get reservations error:", error);
    return NextResponse.json({ error: "Помилка при отриманні списку бронювань" }, { status: 500 });
  }
}
