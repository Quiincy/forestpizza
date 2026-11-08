import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding authentic Forest Pizza menu (23 pizzas, 5 chebureks, 4 snacks, and dedicated extras with delivery)...");

  // 1. Settings (matching the official menu board)
  const defaultSettings = [
    { key: "restaurant_name", value: "Forest Pizza", description: "Назва закладу" },
    { key: "restaurant_address", value: "м. Київ, Проспект Лісовий, 11", description: "Адреса точки видачі / самовивозу" },
    { key: "restaurant_phone", value: "+38 093 204 28 04", description: "Телефон для замовлень та доставки" },
    { key: "restaurant_email", value: "forestpizza.kyiv@gmail.com", description: "Контактний email" },
    { key: "working_hours", value: "Щодня з 10:00 до 22:00", description: "Графік роботи" },
    { key: "instagram_url", value: "https://www.instagram.com/forest._pizza/", description: "Посилання на Instagram (@forest._pizza)" },
    { key: "maps_url", value: "https://www.google.com/maps/place/Forest+Pizza/@50.4808836,30.6236834,17z", description: "Посилання на Google Maps" },
    { key: "delivery_fee_lisovyi", value: "70", description: "Вартість доставки по Лісовому масиву (грн)" },
    { key: "delivery_taxi_notice", value: "За межі Лісового масиву — за тарифом таксі", description: "Умови доставки за межі" },
    { key: "telegram_bot_token", value: "", description: "Токен Telegram-бота для сповіщень" },
    { key: "telegram_chat_id", value: "", description: "Chat ID адміністратора/групи для сповіщень" },
    { key: "reservation_notice", value: "Замовлення прийнято! Самовивіз за адресою: Проспект Лісовий, 11 або очікуйте на доставку кур'єром.", description: "Повідомлення клієнту після замовлення" },
    { key: "pickup_time_default", value: "15-20 хвилин", description: "Середній час приготування" },
    { key: "brand_color", value: "#ff5500", description: "Фірмовий помаранчевий колір" },
    { key: "admin_password", value: "forest2026", description: "Пароль до панелі керування" },
  ];

  for (const s of defaultSettings) {
    const preserveValueKeys = ["telegram_bot_token", "telegram_chat_id", "admin_password"];
    await prisma.restaurantSetting.upsert({
      where: { key: s.key },
      update: preserveValueKeys.includes(s.key)
        ? { description: s.description }
        : { value: s.value, description: s.description },
      create: s,
    });
  }

  // 2. Clear existing menu items & obsolete categories
  await prisma.menuItem.deleteMany({});
  await prisma.category.deleteMany({
    where: {
      slug: { notIn: ["pizza", "chebureki", "snacks", "extras"] },
    },
  });

  // 3. Categories matching the authentic menu (Pizza, Chebureki, Snacks)
  const categoriesData = [
    { name: "Піца (23 види)", slug: "pizza", order: 1 },
    { name: "Чебуреки", slug: "chebureki", order: 2 },
    { name: "Фритюр та закуски", slug: "snacks", order: 3 },
  ];

  const categoriesMap: Record<string, string> = {};
  for (const cat of categoriesData) {
    const c = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, order: cat.order },
      create: cat,
    });
    categoriesMap[cat.slug] = c.id;
  }

  // 4. All 23 Pizzas (exact order, ingredients, and 30/40cm prices from Board 1 & Board 2)
  const allPizzas = [
    // --- BOARD 1 (12 PIZZAS) ---
    {
      name: "Pizza Forest",
      description: "Соус томатний/соус часниковий, бекон, балик, печериці, цибуля червона, маслини, філе куряче",
      price30: 320,
      price40: 540,
      badge: "Фірмова 🌲",
      imageUrl: "/images/pizzas/pizza-forest.jpg",
      categoryId: categoriesMap["pizza"],
      order: 1,
    },
    {
      name: "Мюнхенська",
      description: "Соус барбекю, сир моцарелла, балик, мисливські ковбаски, огірки, кукурудза, томати",
      price30: 280,
      price40: 500,
      badge: "Баварська",
      imageUrl: "/images/pizzas/munich.jpg",
      categoryId: categoriesMap["pizza"],
      order: 2,
    },
    {
      name: "Д'ябло гостра",
      description: "Соус гострий, сир моцарелла, салямі, перець халапеньйо",
      price30: 250,
      price40: 420,
      badge: "Гостра 🌶️",
      imageUrl: "/images/pizzas/diablo.jpg",
      categoryId: categoriesMap["pizza"],
      order: 3,
    },
    {
      name: "Туна",
      description: "Соус вершковий, сир моцарелла, тунець, цибуля червона, маслини, томати, сир пармезан",
      price30: 300,
      price40: 520,
      badge: "З тунцем 🐟",
      imageUrl: "/images/pizzas/tuna.jpg",
      categoryId: categoriesMap["pizza"],
      order: 4,
    },
    {
      name: "Карбонара",
      description: "Соус вершковий, бекон, балик, цибуля червона, сир пармезан",
      price30: 300,
      price40: 520,
      badge: "Класика",
      imageUrl: "/images/pizzas/carbonara.jpg",
      categoryId: categoriesMap["pizza"],
      order: 5,
    },
    {
      name: "BBQ",
      description: "Соус барбекю, бекон, копчена курка, перець болгарський, кукурудза",
      price30: 300,
      price40: 500,
      badge: "Димна BBQ",
      imageUrl: "/images/pizzas/bbq.jpg",
      categoryId: categoriesMap["pizza"],
      order: 6,
    },
    {
      name: "Пепероні",
      description: "Соус томатний, сир моцарелла, пепероні",
      price30: 240,
      price40: 420,
      badge: "Хіт 🍕",
      imageUrl: "/images/pizzas/pepperoni.jpg",
      categoryId: categoriesMap["pizza"],
      order: 7,
    },
    {
      name: "4 М'яса",
      description: "Соус томатний, сир моцарелла, бекон, балик, копчена курка, мисливські ковбаски, томати",
      price30: 320,
      price40: 540,
      badge: "Ситна 🍖",
      imageUrl: "/images/pizzas/4-meats.jpg",
      categoryId: categoriesMap["pizza"],
      order: 8,
    },
    {
      name: "4 Сири",
      description: "Соус вершковий, сир моцарелла, сир чеддер, сир горгонзола, сир пармезан",
      price30: 320,
      price40: 540,
      badge: "Сирна 🧀",
      imageUrl: "/images/pizzas/4-cheeses.jpg",
      categoryId: categoriesMap["pizza"],
      order: 9,
    },
    {
      name: "Прошутто",
      description: "Соус томатний, сир моцарелла, сир горгонзола, прошутто, рукола, помідори черрі, сир пармезан",
      price30: 350,
      price40: 600,
      badge: "Преміум",
      imageUrl: "/images/pizzas/prosciutto.jpg",
      categoryId: categoriesMap["pizza"],
      order: 10,
    },
    {
      name: "Від Шефа",
      description: "Соус вершковий, сир моцарелла, сир чеддер, сир горгонзола, печериці, мисливські ковбаски, сир пармезан",
      price30: 320,
      price40: 540,
      badge: "Від Шефа 👨‍🍳",
      imageUrl: "/images/pizzas/chef.jpg",
      categoryId: categoriesMap["pizza"],
      order: 11,
    },
    {
      name: "Сезон",
      description: "Соус часниковий, сир моцарелла, печериці, цибуля червона, мариновані опеньки, куряче філе, сир пармезан",
      price30: 340,
      price40: 540,
      badge: "З опеньками 🍄",
      imageUrl: "/images/pizzas/season.jpg",
      categoryId: categoriesMap["pizza"],
      order: 12,
    },

    // --- BOARD 2 (11 PIZZAS) ---
    {
      name: "Цезар",
      description: "Соус вершковий, сир моцарелла, бекон, курка копчена, томати, салат айсберг, сир пармезан, фірмовий соус",
      price30: 300,
      price40: 520,
      badge: "Хіт",
      imageUrl: "/images/pizzas/caesar.jpg",
      categoryId: categoriesMap["pizza"],
      order: 13,
    },
    {
      name: "Горгонзола Груша",
      description: "Соус вершковий, сир моцарелла, сир горгонзола, прошуто, груша карамелізована, сир пармезан",
      price30: 350,
      price40: 560,
      badge: "Гурман 🍐",
      imageUrl: "/images/pizzas/gorgonzola-pear.jpg",
      categoryId: categoriesMap["pizza"],
      order: 14,
    },
    {
      name: "Гавайська",
      description: "Соус вершковий, сир моцарелла, куряче філе, кукурудза, ананас консервований",
      price30: 300,
      price40: 480,
      badge: "Ананасова 🍍",
      imageUrl: "/images/pizzas/hawaiian.jpg",
      categoryId: categoriesMap["pizza"],
      order: 15,
    },
    {
      name: "Лосось",
      description: "Соус вершковий, лосось с/с, рукола, черрі, сир Філадельфія",
      price30: 360,
      price40: 580,
      badge: "Філадельфія",
      imageUrl: "/images/pizzas/salmon.jpg",
      categoryId: categoriesMap["pizza"],
      order: 16,
    },
    {
      name: "Піца Бургер",
      description: "Соус бургер, сир моцарелла, бекон, балик, цибуля червона, огірки, томати, сир чеддер",
      price30: 320,
      price40: 540,
      badge: "Бургер соус 🍔",
      imageUrl: "/images/pizzas/burger.jpg",
      categoryId: categoriesMap["pizza"],
      order: 17,
    },
    {
      name: "Мексиканська",
      description: "Соус барбекю, сир моцарелла, балик, курка копчена, печериці, цибуля червона, томати, перець халапеньйо",
      price30: 300,
      price40: 500,
      badge: "Пікантна 🌶️",
      imageUrl: "/images/pizzas/mexican.jpg",
      categoryId: categoriesMap["pizza"],
      order: 18,
    },
    {
      name: "Чіназес",
      description: "Соус барбекю, соус часниковий, сир моцарелла, салямі, свіжі мариновані огірки, кукурудза, сир чеддер",
      price30: 320,
      price40: 540,
      badge: "Популярна 🔥",
      imageUrl: "/images/pizzas/chinazes.jpg",
      categoryId: categoriesMap["pizza"],
      order: 19,
    },
    {
      name: "Українська",
      description: "Часниковий соус, сир моцарела, гриби печериці, цибуля Марс, домашня ковбаска, сир пармезан, хрін",
      price30: 320,
      price40: 540,
      badge: "Домашня 🇺🇦",
      imageUrl: "/images/pizzas/ukrainian.jpg",
      categoryId: categoriesMap["pizza"],
      order: 20,
    },
    {
      name: "Ocean",
      description: "Соус вершковий, сир моцарелла, морський коктейль, лосось, маслини, рукола, помідори чері",
      price30: 380,
      price40: 650,
      badge: "Морепродукти 🦐",
      imageUrl: "/images/pizzas/ocean.jpg",
      categoryId: categoriesMap["pizza"],
      order: 21,
    },
    {
      name: "Італійська",
      description: "Соус вершковий, сир моцарелла, гриби печериці, прошуто котто, пармезан, цибуля зелена",
      price30: 350,
      price40: 560,
      badge: "Прошуто котто 🇮🇹",
      imageUrl: "/images/pizzas/italian.jpg",
      categoryId: categoriesMap["pizza"],
      order: 22,
    },
    {
      name: "Чорізо",
      description: "Соус вершковий, моцарелла, салат айсберг, чорізо, в'ялені томати, сир пармезан, соус бальзамічний",
      price30: 360,
      price40: 580,
      badge: "Новинка 🔥",
      imageUrl: "/images/pizzas/chorizo.jpg",
      categoryId: categoriesMap["pizza"],
      order: 23,
    },
  ];

  for (const p of allPizzas) {
    await prisma.menuItem.create({ data: p });
  }

  // 5. Chebureki (5 types from Board 2, 140 грн each)
  const chebureki = [
    {
      name: "Чебурек «Телятина, сир, томати»",
      description: "Соковитий золотистий чебурек із відбірною телятиною, тягучим сиром та стиглими томатами",
      priceSingle: 140,
      badge: "Хіт 🥟",
      imageUrl: "/images/pizzas/cheburek.jpg",
      categoryId: categoriesMap["chebureki"],
      order: 1,
    },
    {
      name: "Чебурек «Телятина»",
      description: "Класичний хрусткий чебурек зі свіжосмаженою соковитою начинкою з телятини та спецій",
      priceSingle: 140,
      badge: "Класика",
      imageUrl: "/images/pizzas/cheburek.jpg",
      categoryId: categoriesMap["chebureki"],
      order: 2,
    },
    {
      name: "Чебурек «Курка та сир»",
      description: "Ніжне куряче філе у поєднанні з розплавленим сиром у тонкому хрусткому тісті",
      priceSingle: 140,
      badge: "Ніжний",
      imageUrl: "/images/pizzas/cheburek.jpg",
      categoryId: categoriesMap["chebureki"],
      order: 3,
    },
    {
      name: "Чебурек «Баранина»",
      description: "Ароматний східний чебурек із соковитою бараниною, цибулею та пряними травами",
      priceSingle: 140,
      badge: "Традиційний",
      imageUrl: "/images/pizzas/cheburek.jpg",
      categoryId: categoriesMap["chebureki"],
      order: 4,
    },
    {
      name: "Чебурек «Сирний»",
      description: "Хрусткий золотистий чебурек, щедро начинений гарячим тягучим сиром",
      priceSingle: 140,
      badge: "Сирний 🧀",
      imageUrl: "/images/pizzas/cheburek.jpg",
      categoryId: categoriesMap["chebureki"],
      order: 5,
    },
  ];

  for (const ch of chebureki) {
    await prisma.menuItem.create({ data: ch });
  }

  // 6. Snacks / Deep-fried items (4 items from bottom of Board 1)
  const snacks = [
    {
      name: "Нагетси (6 шт)",
      description: "Соковиті курячі нагетси у хрусткій золотистій паніровці (6 шт)",
      priceSingle: 80,
      badge: "6 шт",
      imageUrl: "/images/pizzas/nuggets.jpg",
      categoryId: categoriesMap["snacks"],
      order: 1,
    },
    {
      name: "Картопля Фрі",
      description: "Гаряча золотиста хрустка картопля фрі з сіллю",
      priceSingle: 85,
      badge: "Хрустка 🍟",
      imageUrl: "/images/pizzas/fries.jpg",
      categoryId: categoriesMap["snacks"],
      order: 2,
    },
    {
      name: "Сирні палички (6 шт)",
      description: "Хрусткі сирні палички з тягучою моцарелою всередині (6 шт)",
      priceSingle: 160,
      badge: "6 шт 🧀",
      imageUrl: "/images/pizzas/cheese-sticks.jpg",
      categoryId: categoriesMap["snacks"],
      order: 3,
    },
    {
      name: "Цибулеві кільця (9 шт)",
      description: "Апетитні хрусткі цибулеві кільця у золотистому клярі (9 шт)",
      priceSingle: 85,
      badge: "9 шт",
      imageUrl: "/images/pizzas/onion-rings.jpg",
      categoryId: categoriesMap["snacks"],
      order: 4,
    },
  ];

  for (const sn of snacks) {
    await prisma.menuItem.create({ data: sn });
  }

  console.log("Database seeded successfully with 23 pizzas, 5 chebureks, and 4 snacks!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
