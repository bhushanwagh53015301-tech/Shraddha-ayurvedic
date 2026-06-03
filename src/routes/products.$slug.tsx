import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Award, Check, Leaf, Minus, Plus, ShoppingBag, Star, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Reveal from "@/components/Reveal";
import { useCart } from "@/lib/cart-context";
import { BRAND_NAME, formatPrice, getProduct, products, WHATSAPP_NUMBER, type Product } from "@/lib/products";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ params, loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Product"} | ${BRAND_NAME}` },
      { name: "description", content: loaderData?.description ?? "Premium Ayurvedic hair oil." },
      { property: "og:title", content: loaderData?.name ?? `${BRAND_NAME} Product` },
      { property: "og:description", content: loaderData?.tagline ?? "" },
      { property: "og:image", content: loaderData?.image ?? "" },
      { property: "og:type", content: "product" },
      { property: "og:url", content: `/products/${params.slug}` },
    ],
    links: [{ rel: "canonical", href: `/products/${params.slug}` }],
    scripts: loaderData
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: loaderData.name,
              description: loaderData.description,
              image: loaderData.image,
              brand: { "@type": "Brand", name: BRAND_NAME },
              offers: {
                "@type": "Offer",
                priceCurrency: "INR",
                price: loaderData.price,
                availability: "https://schema.org/InStock",
              },
            }),
          },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="container-narrow py-24 text-center">
      <h1 className="font-display text-4xl">Product not found</h1>
      <Link to="/products" className="mt-4 inline-block text-primary underline">Browse all products</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="container-narrow py-24 text-center">
      <p className="text-destructive">{error.message}</p>
    </div>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const product = Route.useLoaderData() as Product;
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  const navigate = useNavigate();

  const related = products.filter((p) => p.slug !== product.slug);
  const waMsg = `Hi! I would like to order:%0A- ${product.name}%0A- Quantity: ${qty}%0A- Total: ${formatPrice(product.price * qty)}`;

  return (
    <>
      <section className="container-narrow pb-16 pt-10">
        <div className="mb-6 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link> . <Link to="/products" className="hover:text-primary">Products</Link> . <span>{product.name}</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem] bg-[oklch(var(--cream))] shadow-soft zoom-img">
              <img src={product.image} alt={product.name} width={1024} height={1024} className="h-auto w-full" />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {[product.image, product.image, product.image].map((src, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-xl border border-border bg-[oklch(var(--cream))] zoom-img">
                  <img src={src} alt={`${product.name} view ${i + 1}`} loading="lazy" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs uppercase tracking-wider text-primary">
              <Leaf className="h-3.5 w-3.5" /> 100% Ayurvedic
            </span>
            <h1 className="mt-3 font-display text-4xl md:text-5xl">{product.name}</h1>
            <p className="mt-2 text-muted-foreground">{product.tagline}</p>

            <div className="mt-4 flex items-center gap-2">
              <div className="flex gap-1 text-[oklch(var(--gold))]">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews.length} reviews)</span>
            </div>

            <p className="mt-6 leading-relaxed text-foreground/90">{product.description}</p>

            <div className="mt-6 flex items-end gap-3">
              <span className="font-display text-4xl text-primary">{formatPrice(product.price)}</span>
              <span className="mb-1 text-muted-foreground line-through">{formatPrice(Math.round(product.price * 1.25))}</span>
              <span className="mb-1.5 rounded-full bg-[oklch(var(--gold))] px-2 py-0.5 text-xs text-[oklch(var(--gold-foreground))]">20% OFF</span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center rounded-full border border-border">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-10 w-10 place-items-center rounded-l-full hover:bg-muted"><Minus className="h-4 w-4" /></button>
                <span className="w-10 text-center font-medium">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="grid h-10 w-10 place-items-center rounded-r-full hover:bg-muted"><Plus className="h-4 w-4" /></button>
              </div>
              <button
                onClick={() => {
                  add(product.slug, qty);
                  toast.success(`${product.name} added to cart`);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground shadow-soft transition hover:opacity-90"
              >
                <ShoppingBag className="h-4 w-4" /> Add to Cart
              </button>
              <button
                onClick={() => {
                  add(product.slug, qty);
                  navigate({ to: "/cart" });
                }}
                className="inline-flex items-center gap-2 rounded-full bg-[oklch(var(--gold))] px-6 py-3 font-medium text-[oklch(var(--gold-foreground))] transition hover:opacity-90"
              >
                Buy Now
              </button>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              Order via WhatsApp
            </a>

            <div className="mt-8 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> Free shipping</div>
              <div className="flex items-center gap-2"><Award className="h-4 w-4 text-primary" /> Herbal care</div>
              <div className="flex items-center gap-2"><Leaf className="h-4 w-4 text-primary" /> Ayurvedic blend</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-narrow grid gap-6 pb-16 lg:grid-cols-2">
        <Section title="Benefits">
          <ul className="grid gap-2">
            {product.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2"><Check className="mt-1 h-4 w-4 text-primary" /> {benefit}</li>
            ))}
          </ul>
        </Section>
        <Section title="Ingredients">
          <div className="flex flex-wrap gap-2">
            {product.ingredients.map((ingredient) => (
              <span key={ingredient} className="rounded-full border border-border bg-[oklch(var(--cream))] px-3 py-1 text-sm">{ingredient}</span>
            ))}
          </div>
        </Section>
        <Section title="How to Use">
          <ol className="grid list-decimal gap-2 pl-5">
            {product.howToUse.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </Section>
        <Section title="Suitable For">
          <ul className="grid gap-2">
            {product.suitableFor.map((item) => (
              <li key={item} className="flex items-start gap-2"><Check className="mt-1 h-4 w-4 text-primary" /> {item}</li>
            ))}
          </ul>
        </Section>
      </section>

      <section className="container-narrow pb-20">
        <h2 className="mb-6 font-display text-3xl">Customer Reviews</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {product.reviews.map((review) => (
            <div key={review.name} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex gap-1 text-[oklch(var(--gold))]">
                {Array.from({ length: review.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-3">"{review.text}"</p>
              <p className="mt-4 text-sm text-muted-foreground">- {review.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-narrow pb-24">
        <h2 className="mb-6 font-display text-3xl">You may also love</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {related.map((relatedProduct) => (
            <Link
              key={relatedProduct.slug}
              to="/products/$slug"
              params={{ slug: relatedProduct.slug }}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 hover-lift"
            >
              <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-[oklch(var(--cream))] zoom-img">
                <img src={relatedProduct.image} alt={relatedProduct.name} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div>
                <h3 className="font-display text-xl group-hover:text-primary">{relatedProduct.name}</h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">{relatedProduct.tagline}</p>
                <p className="mt-1 font-medium text-primary">{formatPrice(relatedProduct.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="mb-3 font-display text-2xl">{title}</h3>
      <div className="text-foreground/90">{children}</div>
    </div>
  );
}
