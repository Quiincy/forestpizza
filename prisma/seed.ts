import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Forest Pizza database (Takeaway format)...");

  // 1. Settings
  const defaultSettings = [
    { key: "restaurant_name", value: "Forest Pizza", description: "Назва закладу" },
    { key: "restaurant_address", value: "м. Київ, Лісовий проспект, 11 (Лісовий масив)", description: "Адреса точки видачі / самовивозу" },
    { key: "restaurant_phone", value: "+380 (97) 845-12-34", description: "Телефон для замовлень на винос" },
    { key: "restaurant_email", value: "forestpizza.kyiv@gmail.com", description: "Контактний email" },
    { key: "working_hours", value: "Щодня з 10:00 до 22:00 (тільки на винос та доставка)", description: "Графік роботи" },
    { key: "instagram_url", value: "https://www.instagram.com/forestpizza.kyiv", description: "Посилання на Instagram" },
    { key: "maps_url", value: "https://www.google.com/maps/place/Forest+Pizza/@50.4808836,30.6236834,17z", description: "Посилання на Google Maps" },
    { key: "telegram_bot_token", value: "", description: "Токен Telegram-бота для сповіщень" },
    { key: "telegram_chat_id", value: "", description: "Chat ID адміністратора/групи для сповіщень" },
    { key: "reservation_notice", value: "Замовлення на винос прийнято! Піца буде гарячою та чекатиме вас за 15-20 хв за адресою: Лісовий проспект, 11.", description: "Повідомлення клієнту після замовлення на винос" },
    { key: "pickup_time_default", value: "15-20 хвилин", description: "Середній час приготування" },
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
    { name: "Піца", slug: "pizza", order: 1 },
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

  // 3. Clear existing items and reseed authentic Forest Pizza menu
  await prisma.menuItem.deleteMany({});

  const menuItems = [
    // PIZZAS (from official Forest Pizza menu board photo)
    {
      name: "Пепероні",
      description: "Соус томатний, ніжна моцарела, пікантна ковбаска пепероні",
      price30: 240,
      price40: 420,
      badge: "Хіт",
      imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80",
      categoryId: categoriesMap["pizza"],
      order: 1,
    },
    {
      name: "Прошутто",
      description: "Соус томатний, сир моцарела, витриманий пармезан, вишукане прошуто, свіжа свіжа руккола, соковиті помідори черрі",
      price30: 350,
      price40: 600,
      badge: "Преміум",
      imageUrl: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=800&q=80",
      categoryId: categoriesMap["pizza"],
      order: 2,
    },
    {
      name: "4 М'яса",
      description: "Соус томатний, сир моцарела, ароматний бекон, балик, куряче філе, мисливські ковбаски, свіжі стиглі томати",
      price30: 320,
      price40: 540,
      badge: "Ситна",
      imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      categoryId: categoriesMap["pizza"],
      order: 3,
    },
    {
      name: "Від Шефа",
      description: "Ніжний вершковий соус, сир моцарела, пікантна пепероні, пармезан, свіжі печериці, мариновані ковбаски",
      price30: 320,
      price40: 540,
      badge: "Шеф",
      imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
      categoryId: categoriesMap["pizza"],
      order: 4,
    },
    {
      name: "4 Сири",
      description: "Оксамитовий вершковий соус, сир моцарела, класична гауда, благородна горгонзола з блакитною пліснявою, пікантний пармезан",
      price30: 320,
      price40: 540,
      badge: "Хіт",
      imageUrl: "https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=800&q=80",
      categoryId: categoriesMap["pizza"],
      order: 5,
    },
    {
      name: "Сезон",
      description: "Ароматний часниковий соус, сир моцарела, свіжі печериці, соковита червона цибуля, ніжне куряче філе, хрусткий мікс салатів, пармезан",
      price30: 340,
      price40: 540,
      badge: "Сезонне",
      imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
      categoryId: categoriesMap["pizza"],
      order: 6,
    },
    {
      name: "Піца Бургер",
      description: "Фірмовий соус бургер, сир моцарела, хрусткий бекон, балик, червона цибуля, мариновані корнішони, томати, розплавлений сир чеддер",
      price30: 320,
      price40: 540,
      badge: "Новинка",
      imageUrl: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=800&q=80",
      categoryId: categoriesMap["pizza"],
      order: 7,
    },
    {
      name: "Мексиканська",
      description: "Соус барбекю, моцарела, балик, копчена курочка, пепероні, червона цибуля, томати, пікантний гострий перець",
      price30: 300,
      price40: 500,
      badge: "Гостре 🔥",
      imageUrl: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80",
      categoryId: categoriesMap["pizza"],
      order: 8,
    },
    {
      name: "Італійська",
      description: "Соус вершковий, моцарела, відбірні гриби печериці, ніжне прошуто котто, сир пармезан",
      price30: 350,
      price40: 560,
      badge: "Класика",
      imageUrl: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80",
      categoryId: categoriesMap["pizza"],
      order: 9,
    },
    {
      name: "Чіназес",
      description: "Соус барбекю, сир моцарела, ніжне соковите куряче філе, солодка кукурудза, червона цибуля, насичений сир чеддер",
      price30: 320,
      price40: 540,
      badge: "Топ",
      imageUrl: "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?auto=format&fit=crop&w=800&q=80",
      categoryId: categoriesMap["pizza"],
      order: 10,
    },

    // EXTRAS (Бортики та соуси)
    {
      name: "Бортик Сирний",
      description: "Запечений пухкий бортик піци, щедро начинений гарячим сиром моцарела",
      price30: 65,
      price40: 95,
      imageUrl: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80",
      categoryId: categoriesMap["extras"],
      order: 1,
    },
    {
      name: "Бортик Ковбасний",
      description: "Ароматний бортик з міні-мисливськими ковбасками та сиром всередині тіста",
      price30: 65,
      price40: 95,
      imageUrl: "https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=800&q=80",
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
      priceSingle: 35,
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

    // SNACKS (Закуски)
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

    // DRINKS (Напої)
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
      badge: "Авторський",
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

  for (const item of menuItems) {
    await prisma.menuItem.create({
      data: item,
    });
  }

  // 4. Sample takeaway pre-orders
  await prisma.reservation.deleteMany({});
  await prisma.reservation.createMany({
    data: [
      {
        customerName: "Максим Коваленко",
        phone: "+380 98 765 43 21",
        date: new Date().toISOString().split("T")[0],
        time: "19:00",
        comment: "Заберу сам з машини біля входу, піцу порізати на 8 шматочків",
        status: "NEW",
        telegramSent: false,
      },
      {
        customerName: "Олена Петренко",
        phone: "+380 50 123 99 88",
        date: new Date().toISOString().split("T")[0],
        time: "Якомога швидше (15-20 хв)",
        comment: "Самовивіз на винос",
        status: "CONFIRMED",
        telegramSent: true,
      },
    ],
  });

  console.log("Database seeded successfully for takeaway!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
