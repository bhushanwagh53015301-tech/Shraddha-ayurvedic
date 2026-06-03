import growth from "@/assets/product-growth.jpg";

export const BRAND_NAME = "Shraddha Ayurvedic";
export const BRAND_TAGLINE = "Traditional Ayurvedic Hair Oil";
export const WHATSAPP_NUMBER = "919168848746";
export const BRAND_PHONE = "+91 91688 48746";
export const BRAND_ADDRESS = "1182, Sadashiv Peth, Sonal Apt, Pune 30";
export const BRAND_INGREDIENTS = ["Bhringraj", "Brahmi", "Amla", "Rita", "Shikekai", "Jasvdi"];
export const BRAND_NET_WEIGHT = "95 ML";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  image: string;
  benefits: string[];
  ingredients: string[];
  howToUse: string[];
  suitableFor: string[];
  reviews: { name: string; rating: number; text: string }[];
};

export const products: Product[] = [
  {
    slug: "ayurvedic-hair-growth-oil",
    name: "Ayurvedic Hair Growth Oil",
    tagline: "Stimulates roots. Strengthens strands.",
    description:
      "A nutrient-rich blend of Amla, Brahmi and cold-pressed coconut oil that nourishes the scalp and helps stimulate healthy hair growth from the root.",
    price: 499,
    image: growth,
    benefits: [
      "Promotes thicker, longer hair",
      "Strengthens follicles from root to tip",
      "Boosts scalp circulation",
      "Adds natural shine",
    ],
    ingredients: ["Amla", "Brahmi", "Bhringraj", "Cold-Pressed Coconut Oil", "Sesame Oil"],
    howToUse: [
      "Take a small amount in your palm.",
      "Massage gently into the scalp in circular motions for 5–10 minutes.",
      "Leave on for at least 1 hour, or overnight for deeper nourishment.",
      "Wash off with a mild herbal shampoo. Use 2–3 times a week.",
    ],
    suitableFor: ["All hair types", "Men & Women", "Thinning hair", "Dry scalp"],
    reviews: [
      { name: "Priya S.", rating: 5, text: "Visibly thicker hair in just 6 weeks. The aroma is divine." },
      { name: "Rahul M.", rating: 5, text: "Reduced my hair fall significantly. Highly recommend." },
      { name: "Ananya K.", rating: 4, text: "Great oil, leaves hair soft and shiny." },
    ],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;
