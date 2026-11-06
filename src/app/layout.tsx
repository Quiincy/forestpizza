import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forest Pizza | Крафтова піца на Лісовому масиві в Києві",
  description:
    "Піцерія Forest Pizza у Києві за адресою Лісовий проспект, 11. Справжнє витримане тісто, 10 авторських піц, сирні та ковбасні бортики, швидке бронювання столиків онлайн з підтвердженням у Telegram.",
  keywords: [
    "Forest Pizza",
    "піца Київ",
    "Лісовий проспект 11",
    "Лісовий масив",
    "піцерія Деснянський район",
    "доставка піци Київ",
    "бронювання столика піцерія",
  ],
  openGraph: {
    title: "Forest Pizza — Справжня піца з лісовим характером",
    description: "м. Київ, Лісовий проспект, 11. Бронюйте столики онлайн та замовляйте доставку!",
    url: "https://forestpizza.kyiv.ua",
    siteName: "Forest Pizza",
    locale: "uk_UA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className="h-full bg-[#07130f]">
      <body className="min-h-full flex flex-col bg-[#07130f] text-emerald-100 antialiased">
        {children}
      </body>
    </html>
  );
}
