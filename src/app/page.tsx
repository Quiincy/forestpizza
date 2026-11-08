import React from "react";
import { prisma } from "@/lib/prisma";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MenuSection } from "@/components/MenuSection";
import { TakeawaySection } from "@/components/TakeawaySection";
import { AboutSection } from "@/components/AboutSection";
import { LocationSection } from "@/components/LocationSection";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { MobileBottomBar } from "@/components/MobileBottomBar";
import { DEFAULT_SETTINGS, DEFAULT_CATEGORIES } from "@/lib/defaultData";

export const instant = false;

async function getRestaurantData() {
  try {
    const [settingsList, dbCategories] = await Promise.all([
      prisma.restaurantSetting.findMany().catch(() => []),
      prisma.category.findMany({
        orderBy: { order: "asc" },
        include: {
          items: {
            orderBy: { order: "asc" },
          },
        },
      }).catch(() => []),
    ]);

    const settings: Record<string, string> = { ...DEFAULT_SETTINGS };
    for (const s of settingsList) {
      if (s.value) settings[s.key] = s.value;
    }

    const categories = dbCategories && dbCategories.length > 0 ? dbCategories : DEFAULT_CATEGORIES;

    return {
      settings,
      categories,
    };
  } catch (error) {
    console.warn("Database not reachable, using built-in authentic Forest Pizza menu:", error);
    return {
      settings: DEFAULT_SETTINGS,
      categories: DEFAULT_CATEGORIES,
    };
  }
}

export default async function HomePage() {
  const { settings, categories } = await getRestaurantData();

  return (
    <CartProvider>
      <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#0c0e12] text-stone-100 flex flex-col selection:bg-orange-600 selection:text-white pt-14 sm:pt-18 pb-28 md:pb-0">
        {/* Navigation */}
        <Navbar
          restaurantPhone={settings.restaurant_phone}
          workingHours={settings.working_hours}
        />

        <main className="w-full max-w-full min-w-0 flex-1 flex flex-col">
          {/* Hero */}
          <Hero
            restaurantAddress={settings.restaurant_address}
            workingHours={settings.working_hours}
          />

          {/* Menu */}
          <MenuSection categories={categories} />

          {/* Takeaway Order Section */}
          <TakeawaySection
            takeawayNotice={settings.reservation_notice}
            restaurantPhone={settings.restaurant_phone}
          />

          {/* About */}
          <AboutSection />

          {/* Location & Map */}
          <LocationSection
            address={settings.restaurant_address}
            phone={settings.restaurant_phone}
            workingHours={settings.working_hours}
            instagramUrl={settings.instagram_url}
            mapsUrl={settings.maps_url}
          />
        </main>

        {/* Footer */}
        <Footer
          restaurantName={settings.restaurant_name}
          restaurantAddress={settings.restaurant_address}
          restaurantPhone={settings.restaurant_phone}
          workingHours={settings.working_hours}
          instagramUrl={settings.instagram_url}
        />

        {/* Cart Drawer */}
        <CartDrawer />

        {/* Sticky Mobile Bottom Bar */}
        <MobileBottomBar restaurantPhone={settings.restaurant_phone} />
      </div>
    </CartProvider>
  );
}
