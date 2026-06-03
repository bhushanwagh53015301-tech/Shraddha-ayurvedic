import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { formatPrice, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";

export default function ProductCard({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const { add } = useCart();

  return (
    <article className="group rounded-3xl bg-card border border-border/60 overflow-hidden hover-lift">
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="block aspect-square zoom-img bg-[oklch(var(--cream))]"
      >
        <img
          src={product.image}
          alt={`${product.name} – Ayurvedic herbal hair oil`}
          loading="lazy"
          width={800}
          height={800}
          className="w-full h-full object-cover"
        />
      </Link>
      <div className="p-5">
        <h3 className="font-display text-xl leading-tight">
          <Link to="/products/$slug" params={{ slug: product.slug }} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.tagline}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-display text-primary">{formatPrice(product.price)}</span>
          <div className="inline-flex items-center rounded-full border border-border">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-8 h-8 grid place-items-center hover:bg-muted rounded-l-full"
              aria-label="Decrease quantity"
            ><Minus className="w-3.5 h-3.5" /></button>
            <span className="w-7 text-center text-sm">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="w-8 h-8 grid place-items-center hover:bg-muted rounded-r-full"
              aria-label="Increase quantity"
            ><Plus className="w-3.5 h-3.5" /></button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button
            onClick={() => {
              add(product.slug, qty);
              toast.success(`${product.name} added to cart`);
            }}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
          >
            <ShoppingBag className="w-4 h-4" /> Add to Cart
          </button>
          <Link
            to="/products/$slug"
            params={{ slug: product.slug }}
            className="inline-flex items-center justify-center px-3 py-2.5 rounded-full border border-primary text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
