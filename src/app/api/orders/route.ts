import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminAuth } from "@/lib/auth";
import { formatOrderMessage, sendTelegramNotification } from "@/lib/telegram";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, phone, orderType, address, pickupTime, items, comment } = body;

    if (!customerName || !phone || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Будь ласка, вкажіть контактні дані та хоча б одну страву у кошику" },
        { status: 400 }
      );
    }

    const calculatedTotal = items.reduce((sum: number, it: { price: number; quantity: number }) => {
      return sum + (it.price || 0) * (it.quantity || 1);
    }, 0);

    const orderNumber = `FP-${Math.floor(1000 + Math.random() * 9000)}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName: customerName.trim(),
        phone: phone.trim(),
        orderType: orderType || "TAKEAWAY",
        address: orderType === "DELIVERY" && address ? address.trim() : "Самовивіз: Лісовий просп., 11",
        pickupTime: pickupTime ? pickupTime.trim() : "Якомога швидше (15-20 хв)",
        itemsJson: JSON.stringify(items),
        totalPrice: calculatedTotal,
        comment: comment ? comment.trim() : null,
        status: "NEW",
      },
    });

    // Send Telegram alert
    let telegramSent = false;
    try {
      const msg = formatOrderMessage({
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        phone: order.phone,
        orderType: order.orderType,
        address: order.address,
        pickupTime: order.pickupTime,
        totalPrice: order.totalPrice,
        comment: order.comment,
        items,
      });

      const tgRes = await sendTelegramNotification(msg);
      telegramSent = tgRes.success;
    } catch (tgErr) {
      console.error("Order Telegram notification error:", tgErr);
    }

    if (telegramSent) {
      await prisma.order.update({
        where: { id: order.id },
        data: { telegramSent: true },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Замовлення на винос успішно прийнято!",
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        totalPrice: order.totalPrice,
        pickupTime: order.pickupTime,
        status: order.status,
      },
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Не вдалося оформити замовлення" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const isAuth = await checkAdminAuth();
    if (!isAuth) {
      return NextResponse.json({ error: "Немає доступу" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    });

    const parsedOrders = orders.map((o) => {
      let parsedItems = [];
      try {
        parsedItems = JSON.parse(o.itemsJson);
      } catch {
        parsedItems = [];
      }
      return {
        ...o,
        items: parsedItems,
      };
    });

    return NextResponse.json({ orders: parsedOrders });
  } catch (error) {
    console.error("Get orders error:", error);
    return NextResponse.json({ error: "Не вдалося завантажити замовлення" }, { status: 500 });
  }
}
