import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forest Pizza | Крафтова піца та доставка на Лісовому масиві в Києві",
  description:
    "Піцерія Forest Pizza у Києві (Лісовий проспект, 11). Самовивіз та швидка доставка по Лісовому масиву (70 грн) і на таксі. 23 автентичні піци 30 та 40 см, витримане тісто, сирні й ковбасні бортики, швидке замовлення зі сповіщенням у Telegram.",
  keywords: [
    "Forest Pizza",
    "піца Київ",
    "доставка піци Лісовий масив",
    "піца на винос Київ",
    "піца самовивіз Київ",
    "Лісовий проспект 11",
    "Лісовий масив",
    "піцерія Деснянський район",
  ],
  openGraph: {
    title: "Forest Pizza — Справжня піца з лісовим характером (Самовивіз & Доставка)",
    description: "м. Київ, Лісовий проспект, 11. Замовляйте гарячу піцу, чебуреки та закуски з доставкою по Лісовому масиву або самовивозом!",
    url: "https://forestpizza.vercel.app",
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
