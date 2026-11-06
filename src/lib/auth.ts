import { cookies } from "next/headers";
import { createHmac } from "crypto";
import { prisma } from "./prisma";

const SECRET = process.env.SESSION_SECRET || "forest-pizza-kyiv-secret-token-2026";
const COOKIE_NAME = "forest_admin_session";

export function createToken(payload: { role: string; timestamp: number }): string {
  const data = JSON.stringify(payload);
  const hmac = createHmac("sha256", SECRET).update(data).digest("hex");
  return Buffer.from(JSON.stringify({ data, sig: hmac })).toString("base64");
}

export function verifyToken(token: string): boolean {
  try {
    const raw = Buffer.from(token, "base64").toString("utf-8");
    const { data, sig } = JSON.parse(raw);
    const expectedSig = createHmac("sha256", SECRET).update(data).digest("hex");
    if (sig !== expectedSig) return false;

    const parsed = JSON.parse(data);
    // Token valid for 7 days
    if (Date.now() - parsed.timestamp > 7 * 24 * 60 * 60 * 1000) {
      return false;
    }
    return parsed.role === "admin";
  } catch {
    return false;
  }
}

export async function checkAdminAuth(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;
    return verifyToken(token);
  } catch {
    return false;
  }
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  try {
    const setting = await prisma.restaurantSetting.findUnique({
      where: { key: "admin_password" },
    });
    const currentPassword = setting?.value || process.env.ADMIN_PASSWORD || "forest2026";
    return password === currentPassword;
  } catch {
    return password === "forest2026";
  }
}

export { COOKIE_NAME };
