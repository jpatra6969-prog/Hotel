export interface SuiteItem {
  id: string;
  name: string;
  category: "villa" | "penthouse" | "residence" | "suite";
  tagline: string;
  pricePerNight: number;
  sqFt: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  coverImage: string;
  galleryImages: string[];
  description: string;
  keyAmenities: string[];
  includedServices: string[];
  featuredFrame: number;
}

export const PAYMENT_METHODS = [
  "Net Banking",
  "Cash",
  "Credit Card",
  "Debit Card",
  "UPI",
] as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export interface TourChapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  startFrame: number;
  endFrame: number;
  suiteId?: string;
  description: string;
  specs: string[];
}

export const TOUR_CHAPTERS: TourChapter[] = [
  {
    id: "arrival",
    number: "01",
    title: "The Grand Arrival",
    subtitle: "Architectural Statement & Water Sanctuary",
    startFrame: 1,
    endFrame: 150,
    suiteId: "grand-villa",
    description:
      "Cantilevered travertine stone, a glass-encased pivot doorway, and reflective infinity basins create a breathtaking arrival into timeless coastal modernism.",
    specs: ["Travertine & Glass Architecture", "Reflective Basin", "Private Motor Court", "Helipad Access"],
  },
  {
    id: "lounge",
    number: "02",
    title: "The Sunset Ocean Lounge",
    subtitle: "Double-Height Panoramic Living Pavilion",
    startFrame: 151,
    endFrame: 380,
    suiteId: "ocean-penthouse",
    description:
      "24-foot motorized glass facades blur the boundary between indoor luxury and Mediterranean sunsets. Italian B&B Italia furnishings and museum-grade modern canvases.",
    specs: ["24ft Panoramic Glass", "Custom Italian Furnishings", "B&O Acoustic Architecture", "Sunset Exposure"],
  },
  {
    id: "dining",
    number: "03",
    title: "The Executive Dining Suite",
    subtitle: "Private Sommelier & Culinary Salon",
    startFrame: 381,
    endFrame: 580,
    suiteId: "emerald-suite",
    description:
      "Emerald velvet seating around a solid burl-wood table illuminated by a bespoke bronze chandelier. Directly adjacent to the temperature-controlled 800-bottle cellar.",
    specs: ["Seating for 10 Guests", "800-Bottle Rare Wine Cellar", "Private Chef Service Pantry", "Garden Terrace View"],
  },
  {
    id: "bath",
    number: "04",
    title: "Calacatta Marble Spa Sanctuary",
    subtitle: "Hydrotherapy Master Bath & Steam Suite",
    startFrame: 581,
    endFrame: 740,
    suiteId: "calacatta-spa",
    description:
      "Seamless book-matched Calacatta Oro marble, freestanding volcanic limestone soaking tub, twin rainforest showers, and curated botanical body rituals.",
    specs: ["Book-matched Calacatta Marble", "Limestone Soaking Tub", "Twin Rainfall Showers", "Private Steam Room"],
  },
  {
    id: "pool",
    number: "05",
    title: "The Twilight Infinity Lagoon",
    subtitle: "Heated Waterfront Terrace & Torchlit Pool",
    startFrame: 741,
    endFrame: 865,
    suiteId: "grand-villa",
    description:
      "A heated 25-meter saltwater infinity pool seamlessly meeting the twilight horizon. Illuminated by live fire bowls, tiki torches, and private daybeds under swaying palms.",
    specs: ["25m Heated Saltwater Pool", "Live Flame Torches & Firepit", "Sunken Cocktail Lounge", "Direct Sea Access"],
  },
];

export const HOTEL_SUITES: SuiteItem[] = [
  {
    id: "grand-villa",
    name: "The Grand Sunset Villa (Full Estate)",
    category: "villa",
    tagline: "Exclusive Complete Estate Buyout for the Discerning Traveler",
    pricePerNight: 4800,
    sqFt: 8400,
    bedrooms: 5,
    bathrooms: 6.5,
    maxGuests: 10,
    coverImage: "/frames/frame_0850.jpg",
    galleryImages: [
      "/frames/frame_0850.jpg",
      "/frames/frame_0001.jpg",
      "/frames/frame_0200.jpg",
      "/frames/frame_0450.jpg",
      "/frames/frame_0650.jpg",
    ],
    description:
      "The pinnacle of private luxury. Total ownership of the entire 8,400 sq.ft villa estate, featuring five master suites, private heated infinity lagoon, landscaped Mediterranean gardens, private helipad landing privileges, and a dedicated team of five including butler and executive chef.",
    keyAmenities: [
      "Exclusive Complete Estate Access",
      "24/7 Dedicated English Butler",
      "Private In-Villa Executive Chef",
      "Chauffeur-Driven Mercedes Maybach",
      "25m Heated Infinity Pool",
      "Private Helipad Privileges",
    ],
    includedServices: [
      "Dom Pérignon Champagne & Beluga Caviar welcome gift",
      "Daily gourmet breakfast prepared in-suite",
      "Complimentary high-speed Riva yacht airport transfer",
      "Daily 60-min in-villa spa treatment per guest",
      "Full private bar restocked daily with premium spirits",
    ],
    featuredFrame: 850,
  },
  {
    id: "ocean-penthouse",
    name: "The Panoramic Ocean Penthouse",
    category: "penthouse",
    tagline: "Floor-to-Ceiling Glass Framing Golden Hour Sunsets",
    pricePerNight: 2200,
    sqFt: 2800,
    bedrooms: 2,
    bathrooms: 2.5,
    maxGuests: 4,
    coverImage: "/frames/frame_0200.jpg",
    galleryImages: [
      "/frames/frame_0200.jpg",
      "/frames/frame_0001.jpg",
      "/frames/frame_0850.jpg",
    ],
    description:
      "Perched on the upper tier of the villa with wrap-around cantilevered glass terraces. Features a vast living salon with Italian leather sectionals, private cocktail bar, two ocean-facing king master suites, and direct sunset vistas over the azure waters.",
    keyAmenities: [
      "Wrap-around Sunset Terrace",
      "Private Plunge Jacuzzi Spa",
      "Sub-Zero Wine Cellar & Bar",
      "Dedicated Floor Butler",
      "Bang & Olufsen Spatial Audio",
      "Walk-in Dressing Salon",
    ],
    includedServices: [
      "Welcome bottle of Krug Grande Cuvée",
      "Artisanal breakfast served on the terrace",
      "Priority dining reservations at L'Orizzonte",
      "Complimentary sea bob and water sport gear",
    ],
    featuredFrame: 200,
  },
  {
    id: "calacatta-spa",
    name: "The Calacatta Marble Spa Residence",
    category: "residence",
    tagline: "A Serene Wellness Haven Clad in Pure Italian Marble",
    pricePerNight: 1750,
    sqFt: 1850,
    bedrooms: 1,
    bathrooms: 2,
    maxGuests: 2,
    coverImage: "/frames/frame_0650.jpg",
    galleryImages: [
      "/frames/frame_0650.jpg",
      "/frames/frame_0200.jpg",
      "/frames/frame_0850.jpg",
    ],
    description:
      "Designed specifically for restorative tranquility. Features a book-matched Calacatta marble hydrotherapy suite with volcanic limestone soaking tub, private eucalyptus aromatherapy steam shower, meditation balcony, and an ultra-plush Hästens king mattress.",
    keyAmenities: [
      "Calacatta Marble Spa Suite",
      "Volcanic Limestone Soaking Tub",
      "Private Aromatherapy Steam Room",
      "Hästens Master King Bed",
      "In-Suite Couple Treatment Beds",
      "Dyson Supersonic Care Suite",
    ],
    includedServices: [
      "Nightly herbal sleep and recovery elixir",
      "Bespoke Diptyque bath & fragrance menu",
      "One complimentary couples massage session",
      "Vitality breakfast bar with cold-pressed juices",
    ],
    featuredFrame: 650,
  },
  {
    id: "emerald-suite",
    name: "The Emerald Dining & Living Suite",
    category: "suite",
    tagline: "Refined Entertaining and Private Culinary Excellence",
    pricePerNight: 1450,
    sqFt: 1600,
    bedrooms: 1,
    bathrooms: 1.5,
    maxGuests: 3,
    coverImage: "/frames/frame_0450.jpg",
    galleryImages: [
      "/frames/frame_0450.jpg",
      "/frames/frame_0001.jpg",
      "/frames/frame_0200.jpg",
    ],
    description:
      "The choice for epicurean connoisseurs. Features an executive dining room with custom emerald velvet seating for up to 10 guests, sommelier wine wall with vintage reserves, private butler pantry, and an intimate sunlit bedroom retreat.",
    keyAmenities: [
      "Private 10-Guest Dining Salon",
      "Sommelier Temperature-Controlled Wall",
      "Direct Garden Courtyard Access",
      "Burl-Wood Executive Desk",
      "Dedicated In-Suite Chef Option",
      "Custom Bronze Chandelier",
    ],
    includedServices: [
      "Sommelier tasting of three rare vintage wines",
      "Afternoon tea & handmade pastries",
      "Personalized pillow and linen selection",
      "High-speed private Wi-Fi 7 connection",
    ],
    featuredFrame: 450,
  },
];

export interface AddOnItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: "culinary" | "wellness" | "transport" | "excursion";
  description: string;
}

export const BOOKING_ADD_ONS: AddOnItem[] = [
  {
    id: "riva-yacht",
    name: "Private Riva DolceVita Yacht Charter",
    price: 1450,
    unit: "per day",
    category: "excursion",
    description: "Full day private navigation around hidden coastal grottoes with captain, champagne, and chef-curated picnic.",
  },
  {
    id: "michelin-chef",
    name: "In-Villa Michelin 7-Course Degustation",
    price: 380,
    unit: "per guest",
    category: "culinary",
    description: "Prepared table-side by Executive Chef Sanjeev Oberoi, paired with grand cru reserve wines.",
  },
  {
    id: "heli-transfer",
    name: "Helicopter Direct Hub Transfer",
    price: 450,
    unit: "one way",
    category: "transport",
    description: "15-minute scenic flight directly to the villa's private helipad from Naples (NAP) or Rome (FCO).",
  },
  {
    id: "couples-spa",
    name: "Moonlight Thalasso & Amber Massage",
    price: 420,
    unit: "for two",
    category: "wellness",
    description: "90-minute restorative ritual under the stars with pure Mediterranean essential oils and warm volcanic stones.",
  },
  {
    id: "caviar-welcome",
    name: "Royal Osetra Caviar & Vintage Krug Greeting",
    price: 290,
    unit: "on arrival",
    category: "culinary",
    description: "Chilled vintage Krug Grande Cuvée paired with 50g Imperial Osetra caviar and gold-leaf blinis upon check-in.",
  },
];

export const HOTEL_AMENITIES = [
  {
    title: "Culinary Gastronomy",
    subtitle: "3 Michelin Star Restaurant 'L'Orizzonte'",
    description:
      "Led by Chef Sanjeev Oberoi, our dining pavilion showcases seafood caught hours before sunset, heirloom vegetables grown in our volcanic soil terraces, and a cellar of over 1,800 historic vintages.",
    tags: ["Tasting Menu", "Sommelier Cellar", "Sunset Terrace", "In-Villa Private Chef"],
    image: "/frames/frame_0450.jpg",
  },
  {
    title: "Holistic Wellness Sanctuary",
    subtitle: "Thalassotherapy & Ancient Mediterranean Baths",
    description:
      "Heated sea-water vitality pools, private hammam steam suites, and personalized treatments curated using local wild lavender, bergamot, and thermal volcanic muds.",
    tags: ["Thalasso Pools", "Hammam Suite", "Couples Pavilion", "Personal Yoga Master"],
    image: "/frames/frame_0650.jpg",
  },
  {
    title: "Private Sea Access & Yacht Club",
    subtitle: "Custom 50ft Riva Yachts & Beach Cabanas",
    description:
      "Step directly from the villa's lower cliffside stairs onto our private teak dock. Board the villa's private Riva yacht for seamless exploration of secret coastal coves and azure lagoons.",
    tags: ["Private Teak Dock", "Riva Fleet", "SeaBobs & Fliteboards", "Dedicated Beach Attendant"],
    image: "/frames/frame_0850.jpg",
  },
  {
    title: "VIP Aviation & Chauffeur Services",
    subtitle: "On-Site Certified Helipad & Maybach Fleet",
    description:
      "Arrive directly on the property via our private ICAO-certified helipad. For ground excursions, our fleet of chauffeur-driven Mercedes-Maybach S-Class vehicles is on standby 24 hours a day.",
    tags: ["ICAO Helipad", "Mercedes-Maybach Fleet", "Luggage Valet", "Customs Clearance Assistance"],
    image: "/frames/frame_0001.jpg",
  },
];

export const GUEST_REVIEWS = [
  {
    id: "1",
    author: "Aishwarya & Devendra Singhania",
    location: "Mumbai, India",
    rating: 5,
    title: "An Architectural Masterpiece Beyond Words",
    content:
      "We have stayed at top resorts worldwide, but this villa exists in its own realm. The seamless transition between the living pavilion and the sunset infinity pool is sheer poetry. The private butler, Raghav, anticipated every request before we even voiced it.",
    stayType: "Grand Sunset Villa • 7 Nights",
    verified: true,
  },
  {
    id: "2",
    author: "Vikram & Ananya Malhotra",
    location: "New Delhi, India",
    rating: 5,
    title: "The Most Magical Anniversary of Our Lives",
    content:
      "Booking the Calacatta Spa Residence was transcendent. Having the executive chef prepare a private 7-course meal by the torchlit infinity pool as the pink twilight settled over the water will remain forever etched in our memories.",
    stayType: "Calacatta Spa Residence • 5 Nights",
    verified: true,
  },
  {
    id: "3",
    author: "Rajesh & Sunita Oberoi",
    location: "Bengaluru, India",
    rating: 5,
    title: "Supreme Privacy, Unmatched Excellence",
    content:
      "The helicopter transfer directly onto the property's private pad meant zero transit friction. Total peace, pristine architecture, and a wine cellar that would rival any Michelin three-star establishment in Paris or Rome.",
    stayType: "Full Estate Buyout • 10 Nights",
    verified: true,
  },
];

export const FAQS = [
  {
    question: "What is included with our stay at The Grand Villa?",
    answer:
      "All bookings include daily gourmet artisanal breakfast, 24/7 dedicated butler service, access to the heated infinity lagoon and wellness facilities, high-speed Wi-Fi 7 throughout the estate, luxury Hermès bath amenities, and arrival champagne.",
  },
  {
    question: "Can we arrange a complete buyout of the entire estate?",
    answer:
      "Yes. The Grand Sunset Villa (Full Estate) gives exclusive, unimpeded access to all five master suites, private helipad, all pools, living pavilions, dining salons, and grounds for up to 10 overnight guests and up to 50 cocktail reception attendees.",
  },
  {
    question: "How do helicopter and yacht transfers work?",
    answer:
      "Our concierge arranges private twin-engine helicopter transfers landing on our ICAO-certified on-site pad from Naples (15 min) or Rome (45 min). Private Riva yacht transfers can also meet you directly at the marina.",
  },
  {
    question: "What is the cancellation and modification policy?",
    answer:
      "We provide complimentary cancellation up to 14 days prior to your arrival date for individual suites, and 30 days for complete estate buyouts. Flexible date rescheduling is available year-round.",
  },
  {
    question: "Can special dietary requirements and custom menus be arranged?",
    answer:
      "Absolutely. Our Executive Chef and culinary team consult with you prior to arrival to tailor menus to your exact dietary preferences, allergies, and favorite cuisines, featuring organic local ingredients.",
  },
];
