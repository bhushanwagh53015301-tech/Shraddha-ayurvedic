import { createFileRoute } from "@tanstack/react-router";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { BRAND_NAME, products } from "@/lib/products";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: `Shop Ayurvedic Hair Oils | ${BRAND_NAME}` },
      {
        name: "description",
        content: "Browse the Ayurvedic hair oil collection and explore the updated Shraddha Ayurvedic branding.",
      },
      { property: "og:title", content: `Shop Ayurvedic Hair Oils | ${BRAND_NAME}` },
      { property: "og:description", content: "Three oils, crafted for different scalp and hair needs." },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <>
      <section className="gradient-hero py-16">
        <div className="container-narrow max-w-2xl text-center">
          <p className="text-sm uppercase tracking-widest text-[oklch(var(--earth))]">Shop the Collection</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">Our Ayurvedic Hair Oils</h1>
          <p className="mt-4 text-muted-foreground">
            Three focused formulations, now presented inside the updated Shraddha Ayurvedic visual identity.
          </p>
        </div>
      </section>

      <section className="container-narrow py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 120}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
