import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding all 22 pizzas and categories from Google Maps photos (Orange brand style)...");

  // 1. Settings
  const defaultSettings = [
    { key: "restaurant_name", value: "Forest Pizza", description: "Назва закладу" },
    { key: "restaurant_address", value: "м. Київ, Лісовий проспект, 11 (Лісовий масив)", description: "Адреса точки видачі / самовивозу" },
    { key: "restaurant_phone", value: "+380 (97) 845-12-34", description: "Телефон для замовлень на винос" },
    { key: "restaurant_email", value: "forestpizza.kyiv@gmail.com", description: "Контактний email" },
    { key: "working_hours", value: "Щодня з 10:00 до 22:00", description: "Графік роботи" },
    { key: "instagram_url", value: "https://www.instagram.com/forestpizza.kyiv", description: "Посилання на Instagram" },
    { key: "maps_url", value: "https://www.google.com/maps/place/Forest+Pizza/@50.4808836,30.6236834,17z", description: "Посилання на Google Maps" },
    { key: "telegram_bot_token", value: "", description: "Токен Telegram-бота для сповіщень" },
    { key: "telegram_chat_id", value: "", description: "Chat ID адміністратора/групи для сповіщень" },
    { key: "reservation_notice", value: "Замовлення на винос прийнято! Піца буде готова за 15-20 хвилин за адресою: Лісовий проспект, 11.", description: "Повідомлення клієнту після замовлення на винос" },
    { key: "pickup_time_default", value: "15-20 хвилин", description: "Середній час приготування" },
    { key: "brand_color", value: "#ff6600", description: "Фірмовий помаранчевий колір" },
    { key: "admin_password", value: "forest2026", description: "Пароль до панелі керування" }
  ];

  for (const s of defaultSettings) {
    await prisma.restaurantSetting.upsert({
      where: { key: s.key },
      update: { description: s.description },
      create: s,
    });
  }

  // 2. Categories
  const categoriesData = [
    { name: "Піца (22 види)", slug: "pizza", order: 1 },
    { name: "Бортики та соуси", slug: "extras", order: 2 },
    { name: "Закуски", slug: "snacks", order: 3 },
    { name: "Напої", slug: "drinks", order: 4 },
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

  // 3. Clear existing items and reseed full authentic Forest Pizza menu (all 22 pizzas from Google Maps)
  await prisma.menuItem.deleteMany({});

  const allPizzas = [
    // --- PHOTO 2 PIZZAS ---
    {
      name: "Pizza Forest",
      description: "Соус томатний / часниковий, бекон, балик, печериці, маслини, філе куряче, сир моцарела",
      price30: 320,
      price40: 540,
      badge: "Фірмова 🌲",
      imageUrl: "/images/pizzas/pizza-forest.jpg",
      categoryId: categoriesMap["pizza"],
      order: 1,
    },
    {
      name: "Пепероні",
      description: "Соус томатний, ніжна моцарела, пікантна ковбаска пепероні",
      price30: 240,
      price40: 420,
      badge: "Хіт 🍕",
      imageUrl: "/images/pizzas/pepperoni.jpg",
      categoryId: categoriesMap["pizza"],
      order: 2,
    },
    {
      name: "4 М'яса",
      description: "Соус томатний, сир моцарела, бекон, балик, куряче філе, мисливські ковбаски, томати",
      price30: 320,
      price40: 540,
      badge: "Ситна",
      imageUrl: "/images/pizzas/4-meats.jpg",
      categoryId: categoriesMap["pizza"],
      order: 3,
    },
    {
      name: "4 Сири",
      description: "Вершковий соус, сир моцарела, гауда, шляхетна горгонзола, пармезан",
      price30: 320,
      price40: 540,
      badge: "Сирна 🧀",
      imageUrl: "/images/pizzas/4-cheeses.jpg",
      categoryId: categoriesMap["pizza"],
      order: 4,
    },
    {
      name: "Прошутто",
      description: "Соус томатний, моцарела, пармезан, прошуто, свіжа рукола, помідори черрі",
      price30: 350,
      price40: 600,
      badge: "Преміум",
      imageUrl: "/images/pizzas/prosciutto.jpg",
      categoryId: categoriesMap["pizza"],
      order: 5,
    },
    {
      name: "Від Шефа",
      description: "Соус вершковий, сир моцарела, пепероні, сир пармезан, печериці, мариновані ковбаски",
      price30: 320,
      price40: 540,
      badge: "Шеф 👨‍🍳",
      imageUrl: "/images/pizzas/chef.jpg",
      categoryId: categoriesMap["pizza"],
      order: 6,
    },
    {
      name: "Мюнхенська",
      description: "Соус барбекю, моцарела, балик, мисливські ковбаски, мариновані огірочки, кукурудза, томати",
      price30: 280,
      price40: 500,
      badge: "Баварська",
      imageUrl: "/images/pizzas/munich.jpg",
      categoryId: categoriesMap["pizza"],
      order: 7,
    },
    {
      name: "Д'ябло",
      description: "Соус гострий, сир моцарела, салямі, пікантний перець халапеньйо",
      price30: 250,
      price40: 420,
      badge: "Гостра 🔥🌶️",
      imageUrl: "/images/pizzas/diablo.jpg",
      categoryId: categoriesMap["pizza"],
      order: 8,
    },
    {
      name: "Цезар",
      description: "Соус вершковий, сир моцарела, бекон, курка копчена, томати, салат айсберг, сир пармезан, соус цезар",
      price30: 300,
      price40: 520,
      badge: "Хіт",
      imageUrl: "/images/pizzas/caesar.jpg",
      categoryId: categoriesMap["pizza"],
      order: 9,
    },
    {
      name: "Ocean",
      description: "Соус вершковий, сир моцарела, морський коктейль, лосось, маслини, рукола, помідори чері",
      price30: 380,
      price40: 650,
      badge: "Морепродукти 🦐",
      imageUrl: "/images/pizzas/ocean.jpg",
      categoryId: categoriesMap["pizza"],
      order: 10,
    },
    {
      name: "Туна",
      description: "Соус вершковий, сир моцарела, тунець, цибуля червона, маслини, сир пармезан",
      price30: 300,
      price40: 520,
      badge: "З тунцем 🐟",
      imageUrl: "/images/pizzas/tuna.jpg",
      categoryId: categoriesMap["pizza"],
      order: 11,
    },
    {
      name: "Карбонара",
      description: "Соус вершковий, моцарела, бекон, балик, цибуля червона, сир пармезан",
      price30: 300,
      price40: 520,
      badge: "Класика",
      imageUrl: "/images/pizzas/carbonara.jpg",
      categoryId: categoriesMap["pizza"],
      order: 12,
    },
    {
      name: "BBQ",
      description: "Соус барбекю, бекон, копчена курка, перець болгарський солодкий, кукурудза",
      price30: 300,
      price40: 500,
      badge: "Димна BBQ",
      imageUrl: "/images/pizzas/bbq.jpg",
      categoryId: categoriesMap["pizza"],
      order: 13,
    },
    {
      name: "Горгонзола Груша",
      description: "Соус вершковий, сир моцарела, сир горгонзола, прошутто, карамелізована груша, сир пармезан",
      price30: 350,
      price40: 560,
      badge: "Гурман 🍐",
      imageUrl: "/images/pizzas/gorgonzola-pear.jpg",
      categoryId: categoriesMap["pizza"],
      order: 14,
    },
    {
      name: "Гавайська",
      description: "Соус вершковий, сир моцарела, куряче філе, кукурудза, соковиті ананаси",
      price30: 300,
      price40: 480,
      badge: "Ананасова",
      imageUrl: "/images/pizzas/hawaiian.jpg",
      categoryId: categoriesMap["pizza"],
      order: 15,
    },
    {
      name: "Лосось",
      description: "Соус вершковий, лосось с/с, свіжа рукола, черрі, ніжний сир Філадельфія",
      price30: 360,
      price40: 580,
      badge: "Філадельфія",
      imageUrl: "/images/pizzas/salmon.jpg",
      categoryId: categoriesMap["pizza"],
      order: 16,
    },
    {
      name: "Українська",
      description: "Часниковий соус, моцарела, гриби печериці, цибуля Марс, домашня ковбаска, пармезан, хрін",
      price30: 320,
      price40: 540,
      badge: "Козацька 🇺🇦",
      imageUrl: "/images/pizzas/ukrainian.jpg",
      categoryId: categoriesMap["pizza"],
      order: 17,
    },
    {
      name: "Сезон",
      description: "Соус часниковий, сир моцарела, печериці, червона цибуля, куряче філе, мікс салатів, пармезан",
      price30: 340,
      price40: 540,
      badge: "Сезонна",
      imageUrl: "/images/pizzas/season.jpg",
      categoryId: categoriesMap["pizza"],
      order: 18,
    },
    {
      name: "Піца Бургер",
      description: "Соус бургер, сир моцарела, бекон, балик, цибуля, мариновані огірки, томати, чеддер",
      price30: 320,
      price40: 540,
      badge: "Новинка",
      imageUrl: "/images/pizzas/burger.jpg",
      categoryId: categoriesMap["pizza"],
      order: 19,
    },
    {
      name: "Мексиканська",
      description: "Соус барбекю, моцарела, балик, курка копчена, пепероні, червона цибуля, томати, перець халапеньйо",
      price30: 300,
      price40: 500,
      badge: "Гостре 🔥",
      imageUrl: "/images/pizzas/mexican.jpg",
      categoryId: categoriesMap["pizza"],
      order: 20,
    },
    {
      name: "Італійська",
      description: "Соус вершковий, моцарела, гриби печериці, прошуто котто, сир пармезан",
      price30: 350,
      price40: 560,
      badge: "Класика",
      imageUrl: "/images/pizzas/italian.jpg",
      categoryId: categoriesMap["pizza"],
      order: 21,
    },
    {
      name: "Чіназес",
      description: "Соус барбекю, сир моцарела, курка, кукурудза, цибуля червона, сир чеддер",
      price30: 320,
      price40: 540,
      badge: "Популярна",
      imageUrl: "/images/pizzas/chinazes.jpg",
      categoryId: categoriesMap["pizza"],
      order: 22,
    },
  ];

  for (const p of allPizzas) {
    await prisma.menuItem.create({ data: p });
  }

  // --- EXTRAS (БОРТИКИ ТА СОУСИ) ---
  const extras = [
    {
      name: "Бортик Сирний",
      description: "Запечений пухкий бортик піци, щедро начинений розплавленим сиром моцарела",
      price30: 65,
      price40: 95,
      imageUrl: "/images/pizzas/crust-cheese.jpg",
      categoryId: categoriesMap["extras"],
      order: 1,
    },
    {
      name: "Бортик Ковбасний",
      description: "Ароматний бортик з міні-мисливськими ковбасками та сиром всередині тіста",
      price30: 65,
      price40: 95,
      imageUrl: "/images/pizzas/crust-sausage.jpg",
      categoryId: categoriesMap["extras"],
      order: 2,
    },
    {
      name: "Соус Томатний Фірмовий",
      description: "Класичний італійський соус з томатів Сан-Марцано, базиліку та часничку (50г)",
      priceSingle: 30,
      imageUrl: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=800&q=80",
      categoryId: categoriesMap["extras"],
      order: 3,
    },
    {
      name: "Соус Сирний Чеддер",
      description: "Густий кремовий соус на основі натурального сиру чеддер (50г)",
      priceSingle: 40,
      imageUrl: "https://images.unsplash.com/photo-1582169296194-e4d644c48063?auto=format&fit=crop&w=800&q=80",
      categoryId: categoriesMap["extras"],
      order: 4,
    },
    {
      name: "Соус Часниковий Ранч",
      description: "Ніжний вершково-часниковий соус з зеленню кропу (50г)",
      priceSingle: 30,
      imageUrl: "https://images.unsplash.com/photo-1528751086053-5d55b0a37e16?auto=format&fit=crop&w=800&q=80",
      categoryId: categoriesMap["extras"],
      order: 5,
    },
    {
      name: "Соус Барбекю (BBQ)",
      description: "Карамельно-димний пікантний соус BBQ (50г)",
      priceSingle: 30,
      imageUrl: "https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=800&q=80",
      categoryId: categoriesMap["extras"],
      order: 6,
    },
  ];

  for (const ex of extras) {
    await prisma.menuItem.create({ data: ex });
  }

  // --- SNACKS (ЗАКУСКИ) ---
  const snacks = [
    {
      name: "Картопля Фрі",
      description: "Золотиста хрустка картопля фрі з паприкою та морською сіллю (150г)",
      priceSingle: 95,
      badge: "Хрумка",
      imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
      categoryId: categoriesMap["snacks"],
      order: 1,
    },
    {
      name: "Сирні Палички Моцарела",
      description: "Палички з тягучим сиром у хрусткій паніровці з пряними травами (5 шт)",
      priceSingle: 145,
      badge: "Хіт",
      imageUrl: "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=800&q=80",
      categoryId: categoriesMap["snacks"],
      order: 2,
    },
    {
      name: "Курячі Крильця BBQ",
      description: "Запечені соковиті крильця у карамельному димному соусі барбекю (6 шт)",
      priceSingle: 175,
      imageUrl: "https://images.unsplash.com/photo-1527477378408-1eddb927f917?auto=format&fit=crop&w=800&q=80",
      categoryId: categoriesMap["snacks"],
      order: 3,
    },
    {
      name: "Курячі Нагетси",
      description: "Ніжне філе курки у золотистій хрусткій кукурудзяній паніровці (6 шт)",
      priceSingle: 130,
      imageUrl: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
      categoryId: categoriesMap["snacks"],
      order: 4,
    },
  ];

  for (const sn of snacks) {
    await prisma.menuItem.create({ data: sn });
  }

  // --- DRINKS (НАПОЇ) ---
  const drinks = [
    {
      name: "Крафтове Пиво Forest Light (0.5л)",
      description: "Світлий нефільтрований свіжий ель з нотками хвої та цитрусів від локальної броварні",
      priceSingle: 85,
      badge: "Крафт",
      imageUrl: "https://images.unsplash.com/photo-1608270146039-44485121b6d2?auto=format&fit=crop&w=800&q=80",
      categoryId: categoriesMap["drinks"],
      order: 1,
    },
    {
      name: "Крафтове Пиво Dark Forest (0.5л)",
      description: "Насичений оксамитовий темний портер з карамельно-шоколадним післясмаком",
      priceSingle: 85,
      imageUrl: "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?auto=format&fit=crop&w=800&q=80",
      categoryId: categoriesMap["drinks"],
      order: 2,
    },
    {
      name: "Домашній Обліпиховий Лимонад (0.4л)",
      description: "Освіжаючий авторський напій на основі ягід карпатської обліпихи, апельсину та м'яти",
      priceSingle: 65,
      badge: "Авторський 🍊",
      imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
      categoryId: categoriesMap["drinks"],
      order: 3,
    },
    {
      name: "Coca-Cola / Zero (0.5л)",
      description: "Охолоджена класична пляшка Coca-Cola",
      priceSingle: 45,
      imageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
      categoryId: categoriesMap["drinks"],
      order: 4,
    },
  ];

  for (const dr of drinks) {
    await prisma.menuItem.create({ data: dr });
  }

  console.log("Database seeded successfully with all 22 pizzas and subcategories!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
