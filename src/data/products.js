/* ---------------------------------------------------------------------------
   Central product data for ANAHITA Fine Chocolates.
   Prices are integers in Iranian toman. Categories drive the shop filters.

   Imagery: most visuals below are a framing (object-position + zoom) of the two
   boutique photographs, so colour grade and lighting stay consistent. The bar
   boxes use the boutique's own product photograph instead. Each `image` object
   accepts any `src`, so real product photography can be dropped in without
   touching a single component — point `src` at the new file and set
   `focus`/`zoom` to 1.
   --------------------------------------------------------------------------- */

const INTERIOR = '/images/boutique-interior.jpg';
const EXTERIOR = '/images/boutique-exterior.jpg';
/* Product photography supplied by the boutique. */
const BAR_BOX = '/images/anahita-bar-box.jpg';

export const categories = [
  { id: 'all', label: 'همهی شکلاتها' },
  { id: 'pralines', label: 'پرالین' },
  { id: 'truffles', label: 'ترافل' },
  { id: 'dark', label: 'شکلات تلخ' },
  { id: 'milk', label: 'شکلات شیری' },
  { id: 'pistachio', label: 'پسته' },
  { id: 'hazelnut', label: 'فندق' },
  { id: 'bars', label: 'تختهشکلات' },
  { id: 'assortments', label: 'مجموعهها' },
];

/* Framings read against the two boutique photographs (10 % = one tenth of the
   frame, in object co-ordinates). The display case with the handmade chocolates
   occupies roughly 55–66 % vertically, the illuminated product shelves sit at
   about 30–46 %, and the storefront signage is the top of the exterior shot. */
const showcase = (x, y, zoom) => ({ src: INTERIOR, focus: `${x}% ${y}%`, zoom });

const counter = showcase(50, 60, 1.6);
const giftWall = { src: INTERIOR, focus: '84% 31%', zoom: 2.6 };
const craftMacro = showcase(40, 62, 5);

/* The Anahita bar box photographed by the boutique — used as-is, so focus and
   zoom stay neutral. */
const barBox = { src: BAR_BOX, focus: '50% 52%', zoom: 1 };

/** Each product gets a four-frame gallery: its own close-up, then the boutique
 *  context it is photographed in. */
const gallery = (primary) => [primary, counter, giftWall, craftMacro];

const productList = [
  {
    id: 'p-pralines',
    slug: 'handmade-chocolate-pralines',
    name: 'پرالین شکلات دستساز',
    category: 'pralines',
    price: 1850000,
    weight: '۲۲۰ گرم · جعبه ۱۲ عددی',
    boxSize: '۱۲ پرالین',
    short: 'دوازده پرالین با مغزهای گاناش متفاوت، پرداختشده با دست.',
    description:
      'جعبهی امضای ما: دوازده قطعه، هر یک قالبگیری و با دست پرداختشده، به ترتیبی چیده شده که از سبکترین گاناش خامهای شروع شود و به عمیقترین کاکائو برسد. پوسته بهقدری نازک است که تمیز میشکند و مغز آنقدر نرم که آرام آب میشود.',
    flavour: 'گاناش خامهای، مغز بو داده، پایانی طولانی از کاکائو.',
    ingredients: 'خمیر کاکائو، کرهی کاکائو، شکر، شیر خشک، خامه، کره، بادام، فندق، وانیل طبیعی.',
    allergens:
      'حاوی شیر، خامه، کره، بادام و فندق است. ممکن است آثار ناچیزی از پسته و کنجد داشته باشد.',
    storage: 'در دمای ۱۴ تا ۱۸ درجه و دور از نور مستقیم نگهداری شود. بهترین زمان مصرف تا سه هفته است.',
    image: showcase(30, 60, 4),
    featured: true,
  },
  {
    id: 'p-truffles',
    slug: 'artisan-chocolate-truffles',
    name: 'ترافل شکلات دستساز',
    category: 'truffles',
    price: 1480000,
    weight: '۱۸۰ گرم · جعبه ۹ عددی',
    boxSize: '۹ ترافل',
    short: 'ترافلهای دستپیچ با قلبی از گاناش و پوششی نرم از پودر کاکائو.',
    description:
      'یکییکی پیچیده و با پودر کاکائوی نرم پوشانده میشوند. گاناش فقط به اندازهای زده میشود که سبک بماند؛ بنابراین هر ترافل بیدرنگ باز میشود و آب میشود، نه اینکه سنگین در دهان بماند.',
    flavour: 'کاکائوی عمیق، خامهی گرم، رایحهای از وانیل.',
    ingredients: 'خمیر کاکائو، کرهی کاکائو، خامه، شکر، کره، پودر کاکائو، وانیل طبیعی.',
    allergens: 'حاوی شیر، خامه و کره است. در آشپزخانهای ساخته میشود که با مغزها و کنجد کار میکند.',
    storage: 'در دمای ۱۴ تا ۱۸ درجه خنک بماند و در دمای اتاق سرو شود. بهترین زمان مصرف تا دو هفته است.',
    image: showcase(62, 62, 4),
    featured: true,
  },
  {
    id: 'p-dark',
    slug: 'dark-chocolate-collection',
    name: 'مجموعه شکلات تلخ',
    category: 'dark',
    price: 2240000,
    weight: '۳۰۰ گرم · جعبه ۱۶ عددی',
    boxSize: '۱۶ قطعه',
    short: 'شانزده قطعهی تلخ، از ۶۰ درصد تا ۷۸ درصدِ تلخ و پرقدرت.',
    description:
      'جعبهای برای کسانی که شکلاتشان را تلخ دوست دارند. شانزده قطعه بهترتیب شدت کاکائو چیده شدهاند تا از طعمی گرد و میوهای کمکم به پایانی سخت و تقریباً شور برسید.',
    flavour: 'میوهی خشک، کاکائوی بو داده، پایانی خشک و ماندگار.',
    ingredients: 'خمیر کاکائو، کرهی کاکائو، شکر، خردهی کاکائو، وانیل طبیعی.',
    allergens: 'ممکن است آثار ناچیزی از شیر، مغزها و کنجد داشته باشد.',
    storage: 'در دمای ۱۴ تا ۱۸ درجه و دور از نور مستقیم نگهداری شود. بهترین زمان مصرف تا چهار هفته است.',
    image: showcase(44, 57, 3.4),
    featured: true,
  },
  {
    id: 'p-milk',
    slug: 'milk-chocolate-collection',
    name: 'مجموعه شکلات شیری',
    category: 'milk',
    price: 2120000,
    weight: '۳۰۰ گرم · جعبه ۱۶ عددی',
    boxSize: '۱۶ قطعه',
    short: 'شکلات شیری نرم و گرد با مغزهای کارامل و فندق.',
    description:
      'گردتر و ملایمتر از جعبهی تلخ ما: شانزده قطعه شکلات شیری با مغزهای کارامل، پرالین و خامه، با جلایی ملایم.',
    flavour: 'کارامل، شیر گرم، فندق بو داده.',
    ingredients: 'شکر، کرهی کاکائو، خمیر کاکائو، شیر کامل خشک، خامه، کره، فندق، وانیل طبیعی.',
    allergens: 'حاوی شیر، خامه، کره و فندق است. ممکن است آثار ناچیزی از پسته داشته باشد.',
    storage: 'در دمای ۱۴ تا ۱۸ درجه نگهداری شود. بهترین زمان مصرف تا سه هفته است.',
    image: showcase(74, 60, 3.6),
    featured: true,
  },
  {
    id: 'p-pistachio',
    slug: 'pistachio-pralines',
    name: 'پرالین پسته',
    category: 'pistachio',
    price: 2350000,
    weight: '۲۴۰ گرم · جعبه ۱۲ عددی',
    boxSize: '۱۲ پرالین',
    short: 'پرالین پسته زیر شکلات شیری، با یک پستهی کامل روی آن.',
    description:
      'پستهی آسیابشده که در پرالینی نرم کار شده، زیر شکلات شیری مینشیند و با یک پستهی کامل تزئین میشود. یکی از پرطرفدارترین قطعههای بوتیک.',
    flavour: 'پستهی سبز، شیرینی نرم کارامل، شکلات شیری.',
    ingredients: 'پسته، شکر، کرهی کاکائو، خمیر کاکائو، شیر کامل خشک، خامه، کره، وانیل طبیعی.',
    allergens:
      'حاوی پسته، شیر، خامه و کره است. ممکن است آثار ناچیزی از دیگر مغزها و کنجد داشته باشد.',
    storage: 'در دمای ۱۴ تا ۱۸ درجه و دور از نور مستقیم نگهداری شود. بهترین زمان مصرف تا سه هفته است.',
    image: showcase(52, 63, 4.6),
    featured: true,
  },
  {
    id: 'p-hazelnut',
    slug: 'hazelnut-chocolate',
    name: 'شکلات فندقی',
    category: 'hazelnut',
    price: 1980000,
    weight: '۲۴۰ گرم · جعبه ۱۲ عددی',
    boxSize: '۱۲ قطعه',
    short: 'پرالین فندق بو داده در شکلات تلخ و شیری.',
    description:
      'فندقهای برشته، ریز آسیاب و در پرالینی تلخ آمیخته، سپس با پوستهی شکلات شیری همراه میشود. اول فندق، بعد شکلات — و هرگز شیرینی آزاردهنده ندارد.',
    flavour: 'فندق بو داده، شکر کاراملی، کاکائو.',
    ingredients: 'فندق، خمیر کاکائو، کرهی کاکائو، شکر، شیر کامل خشک، خامه، وانیل طبیعی.',
    allergens:
      'حاوی فندق و شیر است. ممکن است آثار ناچیزی از پسته، بادام و کنجد داشته باشد.',
    storage: 'در دمای ۱۴ تا ۱۸ درجه نگهداری شود. بهترین زمان مصرف تا سه هفته است.',
    image: showcase(20, 61, 4.2),
    featured: true,
  },
  {
    id: 'p-bars',
    slug: 'signature-chocolate-bars',
    name: 'تختهشکلاتهای امضای آناهیتا',
    category: 'bars',
    price: 1260000,
    weight: '۲۴۰ گرم · مجموعهی ۳ عددی',
    boxSize: '۳ تخته',
    short: 'سه تختهی تمپرشده: تلخ، شیری و پسته.',
    description:
      'سه تخته، تمپر شده تا تمیز بشکند و بدرخشد: یک تختهی تلخ، یک تختهی شیری و یک تختهی پسته با مغزهای کامل — در کاغذ قهوهای تیره و فویل طلایی پیچیده میشود.',
    flavour: 'کاکائوی پاک، خامهی شیرین، پستهی بو داده.',
    ingredients: 'خمیر کاکائو، کرهی کاکائو، شکر، شیر کامل خشک، پسته، وانیل طبیعی.',
    allergens: 'حاوی شیر و پسته است. ممکن است آثار ناچیزی از دیگر مغزها و کنجد داشته باشد.',
    storage: 'در دمای ۱۴ تا ۱۸ درجه و دور از نور مستقیم نگهداری شود. بهترین زمان مصرف تا شش هفته است.',
    image: barBox,
    featured: true,
  },
  {
    id: 'p-assortment',
    slug: 'premium-chocolate-assortments',
    name: 'مجموعه شکلات ممتاز',
    category: 'assortments',
    price: 3480000,
    weight: '۴۸۰ گرم · جعبه ۲۴ عددی',
    boxSize: '۲۴ قطعه',
    short: 'پهنترین جعبهی ما — بیستوچهار قطعه از همهی خانوادهها.',
    description:
      'انتخاب کامل آناهیتا: بیستوچهار قطعه از هر خانوادهای که میسازیم، به ترتیب ویترین چیده شده تا جعبه در حالی که خالی میشود، قصهای تعریف کند.',
    flavour: 'گاناش خامهای، پسته، فندق، کاکائوی تلخ، کارامل.',
    ingredients:
      'خمیر کاکائو، کرهی کاکائو، شکر، شیر کامل خشک، خامه، کره، پسته، فندق، بادام، وانیل طبیعی.',
    allergens:
      'حاوی شیر، خامه، کره، پسته، فندق و بادام است. ممکن است آثار ناچیزی از کنجد داشته باشد.',
    storage: 'در دمای ۱۴ تا ۱۸ درجه و دور از نور مستقیم نگهداری شود. بهترین زمان مصرف تا چهار هفته است.',
    image: barBox,
    featured: true,
  },
  /* --- further catalogue, shown in the shop and in search ------------------ */
  {
    id: 'p-salted-caramel',
    slug: 'salted-caramel-truffles',
    name: 'ترافل کارامل نمکی',
    category: 'truffles',
    price: 1620000,
    weight: '۱۸۰ گرم · جعبه ۹ عددی',
    boxSize: '۹ ترافل',
    short: 'مغز کارامل نرم در شکلات تلخ، با نمک دریا.',
    description:
      'کاراملی که کمی تیرهتر از معمول پخته شده، نرم در پوستهی شکلات تلخ مینشیند و با چند دانه نمک دریا تمام میشود.',
    flavour: 'کارامل سوخته، نمک، کاکائوی تلخ.',
    ingredients: 'شکر، خامه، کره، خمیر کاکائو، کرهی کاکائو، نمک دریا، وانیل طبیعی.',
    allergens: 'حاوی شیر، خامه و کره است. ممکن است آثار ناچیزی از مغزها و کنجد داشته باشد.',
    storage: 'در دمای ۱۴ تا ۱۸ درجه خنک نگهداری شود. بهترین زمان مصرف تا دو هفته است.',
    image: showcase(38, 64, 4.8),
  },
  {
    id: 'p-rose-cardamom',
    slug: 'rose-and-cardamom-pralines',
    name: 'پرالین گل محمدی و هل',
    category: 'pralines',
    price: 1890000,
    weight: '۲۲۰ گرم · جعبه ۱۲ عددی',
    boxSize: '۱۲ پرالین',
    short: 'پرالینی معطر از گل محمدی و هل سبز.',
    description:
      'گلاب و هل سبزِ تازهآسیبشده در گاناشی روشن آمیخته و در پوستهی نازکی از شکلات تلخ بسته میشود. گلدار، گرم و آشکارا ایرانی.',
    flavour: 'گل محمدی، هل سبز، خامه.',
    ingredients: 'خمیر کاکائو، کرهی کاکائو، خامه، شکر، گلاب، هل، وانیل طبیعی.',
    allergens: 'حاوی شیر، خامه و کره است. ممکن است آثار ناچیزی از مغزها و کنجد داشته باشد.',
    storage: 'در دمای ۱۴ تا ۱۸ درجه نگهداری شود. بهترین زمان مصرف تا دو هفته است.',
    image: showcase(58, 57, 4.2),
  },
  {
    id: 'p-orange-cinnamon',
    slug: 'orange-and-cinnamon-dark',
    name: 'شکلات تلخ پرتقال و دارچین',
    category: 'dark',
    price: 1540000,
    weight: '۱۶۰ گرم · جعبه ۸ عددی',
    boxSize: '۸ قطعه',
    short: 'پوست پرتقال شیرینشده و دارچین در شکلات تلخ.',
    description:
      'شکلات تلخ با نوارهایی از پوست پرتقال شیرینشده و رایحهای گرم از دارچین — جعبهای زمستانی که تمام سال روی میز ما میماند.',
    flavour: 'پرتقال شیرینشده، دارچین، کاکائوی تلخ.',
    ingredients: 'خمیر کاکائو، کرهی کاکائو، شکر، پوست پرتقال، گلوکز، دارچین، وانیل طبیعی.',
    allergens: 'ممکن است آثار ناچیزی از شیر، مغزها و کنجد داشته باشد.',
    storage: 'در دمای ۱۴ تا ۱۸ درجه و دور از نور مستقیم نگهداری شود. بهترین زمان مصرف تا سه هفته است.',
    image: showcase(68, 63, 4.4),
  },
  {
    id: 'p-white-pistachio',
    slug: 'white-chocolate-pistachio',
    name: 'شکلات سفید و پسته',
    category: 'pistachio',
    price: 1760000,
    weight: '۲۰۰ گرم · جعبه ۱۰ عددی',
    boxSize: '۱۰ قطعه',
    short: 'شکلات عاجیرنگ با پسته و رایحهای از گل محمدی.',
    description:
      'شکلاتی روشن و عاجیرنگ با پستهی خرد و تنها اشارهای از گل محمدی — سبکترین قطعهای که میسازیم و اولین قطعهای که تمام میشود.',
    flavour: 'خامهی شیرین، پسته، گل محمدی.',
    ingredients: 'شکر، کرهی کاکائو، شیر کامل خشک، پسته، گلاب، وانیل طبیعی.',
    allergens: 'حاوی شیر و پسته است. ممکن است آثار ناچیزی از دیگر مغزها و کنجد داشته باشد.',
    storage: 'در دمای ۱۴ تا ۱۸ درجه خنک نگهداری شود. بهترین زمان مصرف تا دو هفته است.',
    image: showcase(46, 65, 4.8),
  },
];

/* Every product carries a four-frame gallery: its own close-up, then the boutique
   context it is photographed in. */
export const products = productList.map((product) => ({
  ...product,
  gallery: gallery(product.image),
}));

export const giftBoxes = [
  {
    id: 'g-signature',
    slug: 'signature-gift-box',
    name: 'جعبه هدیه امضای آناهیتا',
    price: 2850000,
    pieces: '۱۶ عدد',
    short: 'جعبهی سخت قهوهای، نشان طلایی، روبان ساتن.',
    description:
      'جعبهی هدیهی خانهی ما، از مقوای قهوهای تیره، با نشان آناهیتا به رنگ طلایی شامپاینی و روبان ساتن تیره. شانزده قطعه در سینی عاجیرنگ.',
    image: { src: EXTERIOR, focus: '25% 62%', zoom: 3 },
  },
  {
    id: 'g-grand',
    slug: 'grand-chocolate-collection',
    name: 'مجموعه بزرگ شکلات',
    price: 5900000,
    pieces: '۳۲ عدد',
    short: 'بزرگترین جعبهی ارائهی ما، در دو طبقه.',
    description:
      'جعبهی بزرگ: سیودو قطعه در دو سینی عاجیرنگ، با کارت فویل طلایی و روبانی که با دست گره میخورد. همان جعبهای که برای جشنها بیشتر از همه میسازیم.',
    image: { src: INTERIOR, focus: '84% 31%', zoom: 2.6 },
  },
  {
    id: 'g-praline',
    slug: 'artisan-praline-box',
    name: 'جعبه پرالین دستساز',
    price: 3240000,
    pieces: '۲۰ پرالین',
    short: 'بیست پرالین دستساز، چیدهشده در ردیف.',
    description:
      'بیست پرالین، هر یک با دست پرداختشده و در یک سینی عاجیرنگ چیده شده، تا وقتی در جعبه باز میشود تزئینها دیده شوند.',
    image: showcase(52, 62, 4.2),
  },
  {
    id: 'g-celebration',
    slug: 'celebration-collection',
    name: 'مجموعه جشن',
    price: 4150000,
    pieces: '۲۴ عدد + شمع',
    short: 'شکلات، شمع و کارت پیام.',
    description:
      'برای تولد و سالگرد ساخته شده: بیستوچهار قطعه، دو شمع باریک و یک کارت پیام طلایی با نوشتهی شما.',
    image: { src: EXTERIOR, focus: '78% 68%', zoom: 3 },
  },
  {
    id: 'g-personal',
    slug: 'personalised-chocolate-gifts',
    name: 'هدیهی شکلات شخصیسازیشده',
    price: 3600000,
    pieces: 'انتخاب شما',
    short: 'جعبه، شکلات، روبان و پیام را خودتان انتخاب کنید.',
    description:
      'هدیه را خودتان بسازید: اندازهی جعبه، ترکیب شکلات، روبان و پیامی که با دست نوشته میشود — همه پیش از تحویل در بوتیک بستهبندی و گره میخورد.',
    image: { src: INTERIOR, focus: '76% 60%', zoom: 3.6 },
    studio: true,
  },
];

export const collections = [
  {
    id: 'c-signature',
    slug: 'signature-collection',
    title: 'مجموعه امضای آناهیتا',
    copy: 'قطعههایی که با آنها شناخته میشویم: پرالین، ترافل و جعبههایی که در آنها میرسند.',
    image: showcase(50, 62, 2.6),
    items: ['p-pralines', 'p-truffles', 'p-pistachio', 'p-assortment'],
  },
  {
    id: 'c-dark',
    slug: 'dark-and-intense',
    title: 'تلخ و پرقدرت',
    copy: 'برای کسانی که شکلات را تلخ، خشک و با پایانی ماندگار دوست دارند.',
    image: showcase(34, 62, 4.2),
    items: ['p-dark', 'p-orange-cinnamon', 'p-salted-caramel', 'p-bars'],
  },
  {
    id: 'c-gifting',
    slug: 'the-gifting-collection',
    title: 'مجموعهی هدیه',
    copy: 'بستهبندیشده، روبانخورده و آماده — هدیههایی که در بوتیک بیشتر از همه بستهبندی میکنیم.',
    image: { src: EXTERIOR, focus: '26% 62%', zoom: 3 },
    items: ['g-signature', 'g-grand', 'g-celebration', 'g-personal'],
    gift: true,
  },
  {
    id: 'c-pistachio',
    slug: 'pistachio-and-nut',
    title: 'پسته و مغزها',
    copy: 'پسته، فندق و بادام، در پرالینهایی نرم و خوشطعم.',
    image: showcase(70, 61, 4),
    items: ['p-pistachio', 'p-hazelnut', 'p-white-pistachio', 'p-pralines'],
  },
];

/* Bestsellers are a hand-picked, editable list — not a claim about sales data. */
export const bestsellerIds = [
  'p-pistachio',
  'p-truffles',
  'p-pralines',
  'p-hazelnut',
  'p-dark',
  'p-assortment',
];

export const findProduct = (slug) => products.find((p) => p.slug === slug);
export const findGiftBox = (slug) => giftBoxes.find((g) => g.slug === slug);
export const findCollection = (slug) => collections.find((c) => c.slug === slug);
