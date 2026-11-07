import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forest Pizza | Крафтова піца на винос на Лісовому масиві в Києві",
  description:
    "Піцерія Forest Pizza у Києві (Лісовий проспект, 11). Працюємо виключно на винос (самовивіз). 22 автентичні піци 30 та 40 см, витримане тісто, сирні й ковбасні бортики, швидке замовлення з собою за 15-20 хвилин зі сповіщенням у Telegram.",
  keywords: [
    "Forest Pizza",
    "піца на винос Київ",
    "піца самовивіз Київ",
    "Лісовий проспект 11",
    "Лісовий масив",
    "піцерія Деснянський район",
  ],
  openGraph: {
    title: "Forest Pizza — Справжня піца на винос з лісовим характером",
    description: "м. Київ, Лісовий проспект, 11. Замовляйте гарячу піцу на винос за 15-20 хвилин!",
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
    <html lang="uk" className="h-full bg-[#0c0e12]">
      <body className="min-h-full flex flex-col bg-[#0c0e12] text-stone-100 antialiased selection:bg-orange-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
