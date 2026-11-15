/* ==========================================================================
   Контент сайта. Чтобы добавить объект или новость — допишите элемент в массив.
   Карточки на главной, в каталоге и детальные страницы строятся отсюда.
   Позже этот файл легко заменить на запрос к API / CMS (JSON той же структуры).

   Источники фактов: korter.ge, geoln.com, madloba.info, yell.ge, city24.ge (ноябрь 2026).
   Перед публикацией сверьте цифры с компанией.
   ========================================================================== */

/* Текстовые поля — объекты { ru, en, ka }. Если перевода нет, показывается ru. */
window.VINCI = {
  company: {
    name: "Vinci Development",
    since: 2012,
    mapUrl: "https://www.google.com/maps?q=41.72569,44.713257",
    phones: ["+995 551 66 11 77", "+995 570 70 60 50"],
    email: "info@vinci.ge",
    facebook: "https://www.facebook.com/Vinci"
    /* адрес, часы работы и юр. название — в assets/js/i18n.js (ui.address, ui.hours, ft.legal) */
  },

  /* status: "active" — строится/в продаже, "done" — сдан. Первые 3 показываются на главной. */
  projects: [
    {
      id: "tsatskhvebi-11",
      title: { ru: "Дом на 8-м пер. Цацхвеби, 11", en: "Residence at 11, 8th Tsatskhvebi Lane", ka: "სახლი ცაცხვების მე-8 შესახვევში, 11" },
      district: { ru: "Сабуртало, Лиси", en: "Saburtalo, Lisi", ka: "საბურთალო, ლისი" },
      status: "active",
      statusLabel: { ru: "Сдан в 2026 · в продаже", en: "Completed 2026 · on sale", ka: "ჩაბარდა 2026 · იყიდება" },
      year: "2026",
      floors: 4,
      apartments: 7,
      area: { ru: "50–301 м²", en: "50–301 m²", ka: "50–301 მ²" },
      price: { ru: "от $1 700 / м²", en: "from $1,700 / m²", ka: "$1 700-დან / მ²" },
      summary: {
        ru: "Камерный клубный дом всего на 7 квартир: потолки 3,0–3,8 м, панорамные энергоэффективные окна, закрытый двор и собственная парковка.",
        en: "A boutique club house with only 7 apartments: 3.0–3.8 m ceilings, panoramic energy-efficient windows, a private courtyard and dedicated parking.",
        ka: "კამერული კლუბური სახლი მხოლოდ 7 ბინით: ჭერის სიმაღლე 3,0–3,8 მ, პანორამული ენერგოეფექტური ფანჯრები, დახურული ეზო და საკუთარი პარკინგი."
      },
      features: {
        ru: ["Монолитно-каркасная конструкция", "Высота потолков 3,0–3,8 м", "Панорамное энергоэффективное остекление", "Отделка «зелёный каркас»", "Наземный паркинг на 5 мест", "Видеонаблюдение и контроль доступа", "Центральное отопление, газ", "Рассрочка от застройщика, ипотека"],
        en: ["Monolithic reinforced-concrete frame", "Ceiling height 3.0–3.8 m", "Panoramic energy-efficient glazing", "“Green frame” finish", "Ground-level parking for 5 cars", "Video surveillance and access control", "Central heating, gas", "Developer installments, mortgage"],
        ka: ["მონოლითურ-კარკასული კონსტრუქცია", "ჭერის სიმაღლე 3,0–3,8 მ", "პანორამული ენერგოეფექტური მინაპაკეტები", "მოპირკეთება „მწვანე კარკასი“", "მიწისზედა პარკინგი 5 ადგილზე", "ვიდეოთვალთვალი და დაშვების კონტროლი", "ცენტრალური გათბობა, გაზი", "განვადება დეველოპერისგან, იპოთეკა"]
      },
      palette: ["#e9e4dc", "#c4622d"]
    },
    {
      id: "mindeli-residence",
      title: "Mindeli Residence",
      district: { ru: "Сабуртало, ул. Миндели / Дзоци, 3", en: "Saburtalo, Mindeli St / 3 Dzotsi St", ka: "საბურთალო, მინდელის ქ. / ძოწის ქ. 3" },
      status: "done",
      statusLabel: { ru: "Сдан", en: "Completed", ka: "ჩაბარებულია" },
      year: "2018",
      floors: 10,
      apartments: 40,
      area: "—",
      price: { ru: "Продано", en: "Sold out", ka: "გაყიდულია" },
      summary: {
        ru: "10-этажный жилой дом на 40 квартир с двухуровневым подземным паркингом, утеплённым фасадом и благоустроенным двором.",
        en: "A 10-storey residential building with 40 apartments, two-level underground parking, an insulated facade and a landscaped courtyard.",
        ka: "10-სართულიანი საცხოვრებელი სახლი 40 ბინით, ორდონიანი მიწისქვეშა პარკინგით, დათბუნებული ფასადითა და კეთილმოწყობილი ეზოთი."
      },
      features: {
        ru: ["Монолитный каркас повышенной сейсмостойкости", "Двухуровневый подземный паркинг", "Утеплённый фасад", "Открытые балконы, террасы на верхних этажах", "Детская площадка и зона отдыха", "Белый и чёрный каркас на выбор"],
        en: ["Monolithic frame with enhanced seismic resistance", "Two-level underground parking", "Insulated facade", "Open balconies, terraces on upper floors", "Playground and recreation area", "Black or white frame finish"],
        ka: ["მომატებული სეისმომედეგობის მონოლითური კარკასი", "ორდონიანი მიწისქვეშა პარკინგი", "დათბუნებული ფასადი", "ღია აივნები, ტერასები ზედა სართულებზე", "საბავშვო მოედანი და დასასვენებელი ზონა", "შავი ან თეთრი კარკასი არჩევით"]
      },
      palette: ["#f1eee8", "#c4622d"]
    },
    {
      id: "ioseliani-59",
      title: { ru: "Дом на ул. А. Иоселиани, 59", en: "Residence at 59 A. Ioseliani St", ka: "სახლი ა. იოსელიანის ქ. 59" },
      district: { ru: "Ваке", en: "Vake", ka: "ვაკე" },
      status: "done",
      statusLabel: { ru: "Сдан", en: "Completed", ka: "ჩაბარებულია" },
      year: "2021",
      floors: null,
      apartments: null,
      area: "—",
      price: { ru: "Продано", en: "Sold out", ka: "გაყიდულია" },
      summary: {
        ru: "Малоэтажный жилой дом в Ваке. Все квартиры реализованы.",
        en: "A low-rise residential building in Vake. All apartments have been sold.",
        ka: "დაბალსართულიანი საცხოვრებელი სახლი ვაკეში. ყველა ბინა გაყიდულია."
      },
      features: {
        ru: ["Жилой дом в районе Ваке", "Сдан в 2021 году", "Все квартиры проданы"],
        en: ["Residential building in Vake", "Completed in 2021", "All apartments sold"],
        ka: ["საცხოვრებელი სახლი ვაკეში", "ჩაბარდა 2021 წელს", "ყველა ბინა გაყიდულია"]
      },
      palette: ["#e6ebf1", "#223143"]
    },
    {
      id: "pkhakadze",
      title: { ru: "Дом на ул. Пхакадзе", en: "Residence on Pkhakadze St", ka: "სახლი ფხაკაძის ქუჩაზე" },
      district: { ru: "Тбилиси", en: "Tbilisi", ka: "თბილისი" },
      status: "done",
      statusLabel: { ru: "Реализован", en: "Completed", ka: "დასრულებული" },
      year: "2020",
      floors: 4,
      apartments: null,
      area: "—",
      price: "—",
      summary: {
        ru: "Четырёхэтажный жилой дом с завершённым фасадом.",
        en: "A four-storey residential building with a finished facade.",
        ka: "ოთხსართულიანი საცხოვრებელი სახლი დასრულებული ფასადით."
      },
      features: {
        ru: ["4 этажа", "Фасад завершён"],
        en: ["4 floors", "Facade completed"],
        ka: ["4 სართული", "ფასადი დასრულებულია"]
      },
      palette: ["#efe9df", "#8fb4dc"]
    }
  ],

  /* Новости / статьи. ВНИМАНИЕ: тексты ниже — шаблонные примеры,
     замените на реальные материалы компании перед запуском. */
  news: [
    {
      id: "tsatskhvebi-delivered",
      date: "2026-06-30",
      tag: { ru: "Новости", en: "News", ka: "სიახლეები" },
      title: {
        ru: "Дом на Цацхвеби, 11 сдан в эксплуатацию",
        en: "Residence at 11 Tsatskhvebi Lane put into operation",
        ka: "ცაცხვების 11-ში მდებარე სახლი ექსპლუატაციაში შევიდა"
      },
      excerpt: {
        ru: "Клубный дом на 7 квартир в Лиси введён в эксплуатацию. Остались свободные квартиры — доступны рассрочка и ипотека.",
        en: "The 7-apartment club house in Lisi has been put into operation. A few apartments are still available, with installments and mortgages.",
        ka: "ლისში მდებარე 7-ბინიანი კლუბური სახლი ექსპლუატაციაში შევიდა. ჯერ კიდევ არის თავისუფალი ბინები — ხელმისაწვდომია განვადება და იპოთეკა."
      },
      demo: true
    },
    {
      id: "green-frame",
      date: "2026-05-14",
      tag: { ru: "Статьи", en: "Articles", ka: "სტატიები" },
      title: {
        ru: "Чёрный, белый, зелёный каркас: что выбрать покупателю",
        en: "Black, white or green frame: what should a buyer choose?",
        ka: "შავი, თეთრი თუ მწვანე კარკასი: რა აირჩიოს მყიდველმა?"
      },
      excerpt: {
        ru: "Разбираем, чем отличаются варианты отделки в новостройках Тбилиси и сколько стоит довести квартиру до заселения.",
        en: "We explain the finishing levels in Tbilisi new builds and what it costs to make an apartment move-in ready.",
        ka: "განვიხილავთ, რით განსხვავდება მოპირკეთების დონეები თბილისის ახალაშენებლობებში და რა ღირს ბინის საცხოვრებლად მომზადება."
      },
      demo: true
    },
    {
      id: "seismic",
      date: "2026-03-02",
      tag: { ru: "Статьи", en: "Articles", ka: "სტატიები" },
      title: {
        ru: "Монолитный каркас и сейсмостойкость: как мы строим",
        en: "Monolithic frame and seismic resistance: how we build",
        ka: "მონოლითური კარკასი და სეისმომედეგობა: როგორ ვაშენებთ"
      },
      excerpt: {
        ru: "Почему монолитно-каркасная технология — стандарт для жилья в Тбилиси и что важно проверить в документации застройщика.",
        en: "Why monolithic frame construction is the standard for housing in Tbilisi and what to check in a developer's documents.",
        ka: "რატომ არის მონოლითურ-კარკასული ტექნოლოგია სტანდარტი თბილისის საცხოვრებლისთვის და რა უნდა შეამოწმოთ დეველოპერის დოკუმენტაციაში."
      },
      demo: true
    }
  ]
};

/* --------------------------------------------------------------------------
   Генератор иллюстраций-заглушек фасадов (SVG), пока нет фотографий объектов.
   Чтобы поставить реальное фото — добавьте в объект поле image: "assets/img/xxx.jpg".
   -------------------------------------------------------------------------- */
window.VINCI.buildingSVG = function (floors, palette, seed) {
  const [wall, accent] = palette || ["#ece7df", "#c4622d"];
  const W = 400, H = 300;
  const f = Math.max(2, Math.min(floors || 5, 12));
  const fh = Math.min(22, 210 / f);
  const bw = 130 + Math.min(f, 6) * 8;
  const bx = (W - bw) / 2 + ((seed || 0) % 3 - 1) * 30;
  const by = 262 - f * fh;
  let win = "";
  const cols = 5;
  const cw = bw / cols;
  for (let r = 0; r < f; r++) {
    for (let c = 0; c < cols; c++) {
      const x = bx + c * cw + cw * 0.18;
      const y = by + r * fh + fh * 0.2;
      win += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${(cw * 0.64).toFixed(1)}" height="${(fh * 0.55).toFixed(1)}" rx="1.5" fill="#2b3b4f" opacity="${(0.55 + ((r * 7 + c * 3 + (seed || 0)) % 5) * 0.08).toFixed(2)}"/>`;
    }
    win += `<rect x="${bx - 4}" y="${(by + (r + 1) * fh - 2).toFixed(1)}" width="${bw + 8}" height="2.5" fill="#cfd6de"/>`;
  }
  const accentX = bx + bw - cw * 1.6;
  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs><linearGradient id="sky${seed}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe0f2"/><stop offset="1" stop-color="#f3f6fa"/></linearGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#sky${seed})"/>
    <path d="M0 225 Q80 195 160 215 T320 205 T400 215 V300 H0Z" fill="#dbe4ec"/>
    <rect x="${bx}" y="${by}" width="${bw}" height="${f * fh}" fill="${wall}"/>
    <rect x="${accentX}" y="${by}" width="${cw * 1.6}" height="${f * fh}" fill="${accent}" opacity=".9"/>
    ${win}
    <rect x="${bx - 6}" y="${by - 6}" width="${bw + 12}" height="6" fill="#17212d"/>
    <rect x="0" y="262" width="${W}" height="38" fill="#c9d1d9"/>
    <circle cx="${bx - 30}" cy="245" r="16" fill="#8fae7a"/><rect x="${bx - 31.5}" y="250" width="3" height="14" fill="#6b5a48"/>
    <circle cx="${bx + bw + 32}" cy="240" r="20" fill="#7fa06b"/><rect x="${bx + bw + 30.5}" y="248" width="3" height="16" fill="#6b5a48"/>
  </svg>`;
};

/* Иллюстрация-заглушка для новостей */
window.VINCI.newsSVG = function (i) {
  const tones = [["#17212d", "#c4622d"], ["#223143", "#8fb4dc"], ["#c4622d", "#f4f1ec"]][i % 3];
  return `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="320" height="180" fill="${tones[0]}"/>
    <g stroke="${tones[1]}" stroke-width="2" fill="none" opacity=".75">
      <path d="M40 150 V70 L100 40 L160 70 V150"/><path d="M160 150 V95 H230 V150"/><path d="M230 150 V60 H280 V150"/>
      <path d="M20 150 H300"/>
    </g>
    <g fill="${tones[1]}" opacity=".35">
      <rect x="65" y="85" width="14" height="14"/><rect x="95" y="85" width="14" height="14"/><rect x="125" y="85" width="14" height="14"/>
      <rect x="65" y="112" width="14" height="14"/><rect x="125" y="112" width="14" height="14"/>
      <rect x="245" y="75" width="20" height="10"/><rect x="245" y="95" width="20" height="10"/><rect x="245" y="115" width="20" height="10"/>
    </g>
  </svg>`;
};
