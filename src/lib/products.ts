import growth from "@/assets/product-growth.jpg";
import antifall from "@/assets/product-antifall.jpg";
import scalp from "@/assets/product-scalp.jpg";

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
  {
    slug: "herbal-anti-hair-fall-oil",
    name: "Herbal Anti-Hair Fall Oil",
    tagline: "Stop hair fall. Restore strength.",
    description:
      "A potent infusion of Bhringraj, Hibiscus and Methi that targets the root cause of hair fall while deeply conditioning each strand.",
    price: 549,
    image: antifall,
    benefits: [
      "Reduces hair fall in 4–6 weeks",
      "Repairs damaged follicles",
      "Calms scalp inflammation",
      "Prevents premature greying",
    ],
    ingredients: ["Bhringraj", "Hibiscus", "Methi (Fenugreek)", "Curry Leaves", "Sesame Oil"],
    howToUse: [
      "Warm a tablespoon of oil between your palms.",
      "Apply along the parting and massage into the scalp.",
      "Leave overnight or for a minimum of 2 hours.",
      "Rinse with a sulphate-free shampoo.",
    ],
    suitableFor: ["Hair fall prone scalps", "Oily & combination scalps", "Post-pregnancy hair loss"],
    reviews: [
      { name: "Sneha R.", rating: 5, text: "My pillow is finally clean. Hair fall reduced drastically." },
      { name: "Vikram P.", rating: 4, text: "Smells herbal and authentic — works as promised." },
      { name: "Meera L.", rating: 5, text: "Best anti hair fall oil I have used in years." },
    ],
  },
  {
    slug: "natural-scalp-care-oil",
    name: "Natural Scalp Care Oil",
    tagline: "Soothes itch. Clears flakes.",
    description:
      "A cooling blend of Neem, Tea Tree and Coconut that detoxifies the scalp, tackles dandruff and restores a healthy, balanced microbiome.",
    price: 459,
    image: scalp,
    benefits: [
      "Fights dandruff and flakes",
      "Soothes itchy, irritated scalp",
      "Balances scalp oil",
      "Refreshes with a cooling effect",
    ],
    ingredients: ["Neem", "Tea Tree", "Coconut Oil", "Camphor", "Aloe Vera Extract"],
    howToUse: [
      "Section the hair and apply oil directly to the scalp.",
      "Massage gently for 5 minutes.",
      "Leave for 45 minutes to 1 hour.",
      "Wash off with a mild shampoo. Use twice weekly.",
    ],
    suitableFor: ["Dandruff prone scalps", "Sensitive scalps", "Oily scalps"],
    reviews: [
      { name: "Divya N.", rating: 5, text: "Goodbye dandruff! Scalp feels fresh after every wash." },
      { name: "Arjun T.", rating: 4, text: "Cooling and refreshing. Itch is gone." },
      { name: "Kavya B.", rating: 5, text: "Gentle enough for my sensitive scalp." },
    ],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;
