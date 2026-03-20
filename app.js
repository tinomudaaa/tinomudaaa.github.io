/**
 * AU Marketplace — Shared App Data & Utilities
 * Mock data, localStorage helpers, revenue split logic
 */

// ============================================================
// LUCIDE SVG ICONS (inline, no library needed)
// ============================================================
const ICONS = {
  search: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  heart: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  star: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  x: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  plus: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`,
  user: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  shoppingBag: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  messageCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  dollarSign: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  trendingUp: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  layers: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  users: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  fileText: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  mapPin: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  menu: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  shield: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  // Category icons
  utensils: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>`,
  camera: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>`,
  palette: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
  monitor: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  bookOpen: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  scissors: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>`,
  music: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
  shirt: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></svg>`,
  browse: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  handshake: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/></svg>`,
  creditCard: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
  award: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  grid: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
};

// ============================================================
// MOCK SERVICE LISTINGS (8 across all categories)
// ============================================================
const LISTINGS = [
  {
    id: 1,
    category: 'Food',
    title: 'Home-Cooked Zimbabwean Meals — Sadza, Muriwo & Nyama',
    seller: 'Rutendo Moyo',
    sellerId: 'AU2021204',
    faculty: 'Social Sciences',
    year: 3,
    description: 'Enjoy authentic home-cooked Zimbabwean meals prepared fresh daily. Menu includes sadza ne muriwo, rice and chicken, and seasonal specials. Delivery available within campus. Order by 9AM for lunchtime delivery. All meals are hygienically prepared in a licensed kitchen space.',
    price: 3.50,
    currency: 'USD',
    rating: 4.9,
    reviews: 127,
    paymentMethod: 'EcoCash',
    image: 'img/food.jpg',
    bgColor: '#fef3c7',
    accent: '#d97706',
  },
  {
    id: 2,
    category: 'Photography',
    title: 'Professional Campus & Event Photography Sessions',
    seller: 'Tafadzwa Chivasa',
    sellerId: 'AU2020093',
    faculty: 'Communication & Media',
    year: 4,
    description: 'Capture your campus memories with professional quality photography. Services include graduation shoots, event coverage, profile portraits, and group photos. Editing included. Delivered within 48 hours via Google Drive. Canon EOS 90D with prime lenses.',
    price: 15.00,
    currency: 'USD',
    rating: 4.8,
    reviews: 64,
    paymentMethod: 'InnBucks',
    image: 'img/photography.jpg',
    bgColor: '#ede9fe',
    accent: '#7c3aed',
  },
  {
    id: 3,
    category: 'Design',
    title: 'Logo, Poster & Social Media Graphic Design',
    seller: 'Nyasha Zvikwete',
    sellerId: 'AU2022301',
    faculty: 'Business Administration',
    year: 2,
    description: 'Need a logo for your club, event poster, or social media graphics? I design clean, modern visuals using Adobe Illustrator and Photoshop. Turnaround: 24–48 hours. Unlimited revisions until satisfied. Files delivered in PNG, PDF, and editable AI format.',
    price: 8.00,
    currency: 'USD',
    rating: 4.7,
    reviews: 49,
    paymentMethod: 'EcoCash',
    image: 'img/design.jpg',
    bgColor: '#fce7f3',
    accent: '#db2777',
  },
  {
    id: 4,
    category: 'Tech',
    title: 'Laptop Repair, Software Setup & IT Support',
    seller: 'Chiedza Mapfumo',
    sellerId: 'AU2021156',
    faculty: 'Information Technology',
    year: 3,
    description: 'Fast, affordable tech help for students. Services include virus removal, OS reinstallation, software setup (MS Office, AutoCAD, SPSS, etc.), WiFi troubleshooting, and data recovery. On-campus sessions available. Most issues resolved within 2 hours.',
    price: 5.00,
    currency: 'USD',
    rating: 4.9,
    reviews: 88,
    paymentMethod: 'Cash',
    image: 'img/tech.jpg',
    bgColor: '#dbeafe',
    accent: '#1d4ed8',
  },
  {
    id: 5,
    category: 'Academic',
    title: 'Statistics, SPSS & Research Methodology Tutoring',
    seller: 'Blessing Matemera',
    sellerId: 'AU2020017',
    faculty: 'Sciences',
    year: 4,
    description: 'Struggling with Research Methods or Stats? I offer 1-on-1 tutoring sessions on campus covering descriptive statistics, SPSS analysis, hypothesis testing, regression, and dissertation data interpretation. Group sessions available at a discount. 95% pass rate among my students.',
    price: 6.00,
    currency: 'USD',
    rating: 5.0,
    reviews: 52,
    paymentMethod: 'EcoCash',
    image: 'img/academic.jpg',
    bgColor: '#dcfce7',
    accent: '#16a34a',
  },
  {
    id: 6,
    category: 'Beauty',
    title: 'Natural Hair Styling, Braiding & Makeup Services',
    seller: 'Farai Nharingo',
    sellerId: 'AU2023114',
    faculty: 'Theology',
    year: 1,
    description: 'Professional natural hair care and makeup services right on campus. Specialties: box braids, twists, loc maintenance, knotless styles, and glam makeup for events and graduations. Affordable rates for students. Appointment-based; book 2 days in advance for weekend slots.',
    price: 7.00,
    currency: 'USD',
    rating: 4.8,
    reviews: 73,
    paymentMethod: 'InnBucks',
    image: 'img/beauty.jpg',
    bgColor: '#fff1f2',
    accent: '#e11d48',
  },
  {
    id: 7,
    category: 'Entertainment',
    title: 'DJ Services & Sound System for Campus Events',
    seller: 'Takudzwa Rusike',
    sellerId: 'AU2021387',
    faculty: 'Social Sciences',
    year: 3,
    description: 'Hire AU\'s most popular student DJ for your event! Services include DJ sets, MC duties, and full sound system rental. Genres: Afrobeats, R&B, Zimdancehall, House, and Gospel. Available for fellowships, birthday parties, club nights, and graduations. Equipment setup included.',
    price: 20.00,
    currency: 'USD',
    rating: 4.7,
    reviews: 35,
    paymentMethod: 'EcoCash',
    image: 'img/entertainment.jpg',
    bgColor: '#f0fdf4',
    accent: '#15803d',
  },
  {
    id: 8,
    category: 'Fashion',
    title: 'Custom Tailoring, Alterations & Uniform Repairs',
    seller: 'Simbarashe Dube',
    sellerId: 'AU2022489',
    faculty: 'Theology',
    year: 2,
    description: 'Expert tailoring and clothing alterations at student-friendly prices. Services: hem adjustments, zip replacements, custom dress/shirt sewing, uniform seaming, and embroidery. Bring your fabric and get a bespoke outfit made. Quality guaranteed. Ready within 3–5 business days.',
    price: 4.50,
    currency: 'USD',
    rating: 4.6,
    reviews: 41,
    paymentMethod: 'Cash',
    image: 'img/fashion.jpg',
    bgColor: '#fff7ed',
    accent: '#c2410c',
  },
];

// ============================================================
// MOCK TRANSACTIONS (12 entries)
// ============================================================
const MOCK_TRANSACTIONS = [
  { id: 'TXN001', seller: 'Rutendo Moyo', service: 'Home-Cooked Meals', amount: 3.50, srcCut: 0.35, sellerShare: 3.15, method: 'EcoCash', ref: 'ECO2603A1', date: '2026-03-15', category: 'Food' },
  { id: 'TXN002', seller: 'Tafadzwa Chivasa', service: 'Photography Session', amount: 15.00, srcCut: 1.50, sellerShare: 13.50, method: 'InnBucks', ref: 'INN1503B2', date: '2026-03-14', category: 'Photography' },
  { id: 'TXN003', seller: 'Blessing Matemera', service: 'Statistics Tutoring', amount: 6.00, srcCut: 0.60, sellerShare: 5.40, method: 'EcoCash', ref: 'ECO1403C3', date: '2026-03-14', category: 'Academic' },
  { id: 'TXN004', seller: 'Nyasha Zvikwete', service: 'Logo Design', amount: 8.00, srcCut: 0.80, sellerShare: 7.20, method: 'EcoCash', ref: 'ECO1303D4', date: '2026-03-13', category: 'Design' },
  { id: 'TXN005', seller: 'Farai Nharingo', service: 'Box Braids', amount: 7.00, srcCut: 0.70, sellerShare: 6.30, method: 'InnBucks', ref: 'INN1203E5', date: '2026-03-12', category: 'Beauty' },
  { id: 'TXN006', seller: 'Chiedza Mapfumo', service: 'Laptop Repair', amount: 5.00, srcCut: 0.50, sellerShare: 4.50, method: 'Cash', ref: 'CSH1103F6', date: '2026-03-11', category: 'Tech' },
  { id: 'TXN007', seller: 'Rutendo Moyo', service: 'Home-Cooked Meals', amount: 7.00, srcCut: 0.70, sellerShare: 6.30, method: 'EcoCash', ref: 'ECO1003G7', date: '2026-03-10', category: 'Food' },
  { id: 'TXN008', seller: 'Takudzwa Rusike', service: 'DJ Set — Fellowship', amount: 20.00, srcCut: 2.00, sellerShare: 18.00, method: 'EcoCash', ref: 'ECO0903H8', date: '2026-03-09', category: 'Entertainment' },
  { id: 'TXN009', seller: 'Simbarashe Dube', service: 'Uniform Alteration', amount: 4.50, srcCut: 0.45, sellerShare: 4.05, method: 'Cash', ref: 'CSH0803I9', date: '2026-03-08', category: 'Fashion' },
  { id: 'TXN010', seller: 'Blessing Matemera', service: 'SPSS Data Analysis Help', amount: 6.00, srcCut: 0.60, sellerShare: 5.40, method: 'EcoCash', ref: 'ECO0703J0', date: '2026-03-07', category: 'Academic' },
  { id: 'TXN011', seller: 'Tafadzwa Chivasa', service: 'Graduation Portraits', amount: 15.00, srcCut: 1.50, sellerShare: 13.50, method: 'InnBucks', ref: 'INN0503K1', date: '2026-03-05', category: 'Photography' },
  { id: 'TXN012', seller: 'Nyasha Zvikwete', service: 'Event Poster Design', amount: 8.00, srcCut: 0.80, sellerShare: 7.20, method: 'EcoCash', ref: 'ECO0303L2', date: '2026-03-03', category: 'Design' },
];

// ============================================================
// MOCK REGISTERED SELLERS
// ============================================================
const MOCK_SELLERS = LISTINGS.map((l, i) => ({
  id: l.sellerId,
  name: l.seller,
  faculty: l.faculty,
  year: l.year,
  category: l.category,
  serviceTitle: l.title,
  price: l.price,
  paymentMethod: l.paymentMethod,
  dateRegistered: `2026-0${Math.min(i + 1, 9)}-0${(i * 3 + 1) % 28 + 1}`.replace('0-0', '0-').replace(/-(\d)$/, '-0$1'),
  rating: l.rating,
  reviews: l.reviews,
}));

// ============================================================
// REVENUE LOGIC
// ============================================================
const REVENUE = {
  sellerPct: 0.90,
  srcPct: 0.10,
  getSellerShare: (amount) => parseFloat((amount * 0.90).toFixed(2)),
  getSRCCut: (amount) => parseFloat((amount * 0.10).toFixed(2)),
};

// ============================================================
// LOCALSTORAGE HELPERS
// ============================================================
const Store = {
  get(key, fallback = null) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  },
  // Favourites
  getFavourites() { return this.get('au_favourites', []); },
  toggleFavourite(id) {
    let favs = this.getFavourites();
    const idx = favs.indexOf(id);
    if (idx > -1) favs.splice(idx, 1);
    else favs.push(id);
    this.set('au_favourites', favs);
    return idx === -1; // true = now favourited
  },
  isFavourite(id) { return this.getFavourites().includes(id); },
  // Sellers (from registration form)
  getRegisteredSellers() { return this.get('au_registered_sellers', []); },
  addSeller(seller) {
    const sellers = this.getRegisteredSellers();
    sellers.unshift(seller);
    this.set('au_registered_sellers', sellers);
  },
  // Transactions
  getTransactions() { return this.get('au_transactions', MOCK_TRANSACTIONS); },
  addTransaction(txn) {
    const txns = this.getTransactions();
    txns.unshift(txn);
    this.set('au_transactions', txns);
  },
};

// ============================================================
// UTILITY FUNCTIONS
// ============================================================
function formatUSD(amount) {
  return `$${parseFloat(amount).toFixed(2)}`;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  let html = '<div class="stars">';
  for (let i = 0; i < full; i++) html += `<svg class="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
  if (half) html += `<svg class="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><linearGradient id="hg"><stop offset="50%" stop-color="#f59e0b"/><stop offset="50%" stop-color="#e5e7eb"/></linearGradient></defs><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="url(#hg)"/></svg>`;
  for (let i = 0; i < empty; i++) html += `<svg class="star star-empty" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
  html += '</div>';
  return html;
}

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function showToast(message, type = 'success') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast toast-' + type;
    document.body.appendChild(toast);
  }
  toast.className = 'toast toast-' + type;
  toast.innerHTML = `<span class="toast-icon">${ICONS.check}</span><span>${message}</span>`;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3500);
}

function getCategoryIcon(category) {
  const map = {
    'Food': ICONS.utensils,
    'Photography': ICONS.camera,
    'Design': ICONS.palette,
    'Tech': ICONS.monitor,
    'Academic': ICONS.bookOpen,
    'Beauty': ICONS.scissors,
    'Entertainment': ICONS.music,
    'Fashion': ICONS.shirt,
    'All': ICONS.grid,
  };
  return map[category] || ICONS.grid;
}

// Generate a deterministic placeholder image using SVG data URI
function getPlaceholderImage(category, listing) {
  const colors = {
    'Food': { bg: '#fef3c7', fg: '#d97706', icon: '🍽️' },
    'Photography': { bg: '#ede9fe', fg: '#7c3aed', icon: '📸' },
    'Design': { bg: '#fce7f3', fg: '#db2777', icon: '🎨' },
    'Tech': { bg: '#dbeafe', fg: '#1d4ed8', icon: '💻' },
    'Academic': { bg: '#dcfce7', fg: '#16a34a', icon: '📚' },
    'Beauty': { bg: '#fff1f2', fg: '#e11d48', icon: '✂️' },
    'Entertainment': { bg: '#f0fdf4', fg: '#15803d', icon: '🎵' },
    'Fashion': { bg: '#fff7ed', fg: '#c2410c', icon: '👕' },
  };
  return null; // Will use CSS background instead
}

// Expose to global scope
window.LISTINGS = LISTINGS;
window.MOCK_TRANSACTIONS = MOCK_TRANSACTIONS;
window.MOCK_SELLERS = MOCK_SELLERS;
window.REVENUE = REVENUE;
window.Store = Store;
window.ICONS = ICONS;
window.formatUSD = formatUSD;
window.formatDate = formatDate;
window.renderStars = renderStars;
window.getInitials = getInitials;
window.showToast = showToast;
window.getCategoryIcon = getCategoryIcon;
