import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, HeartHandshake, Leaf, MapPin, ShieldCheck, Sparkles, Sprout, Star } from "lucide-react";
import hero from "@/assets/hero-oil.jpg";
import labelImage from "@/assets/label-1.jpeg";
import logo from "@/assets/logo.jpeg";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import {
  BRAND_ADDRESS,
  BRAND_INGREDIENTS,
  BRAND_NAME,
  BRAND_NET_WEIGHT,
  BRAND_PHONE,
  products,
  WHATSAPP_NUMBER,
} from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${BRAND_NAME} | Herbal Hair Oil` },
      {
        name: "description",
        content:
          "Shraddha Ayurvedic herbal hair oil with a traditional ingredient blend including Bhringraj, Brahmi and Amla.",
      },
      { property: "og:title", content: `${BRAND_NAME} | Herbal Hair Oil` },
      {
        property: "og:description",
        content: "Traditional Ayurvedic hair oil with a calm olive-inspired brand identity.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="relative overflow-hidden gradient-hero">
        <div className="container-narrow grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="animate-fade-up inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary">
              <Leaf className="h-3.5 w-3.5" /> Shraddha Ayurvedic Hair Oil
            </span>
            <h1 className="animate-fade-up delay-100 mt-5 text-balance text-4xl font-display leading-[1.05] sm:text-5xl lg:text-6xl">
              Herbal hair care with the
              <span className="text-primary"> natural look and feel</span> of your logo.
            </h1>
            <p className="animate-fade-up delay-200 mt-5 max-w-xl text-lg text-muted-foreground">
              Your new brand assets now drive the homepage. The website carries the olive green logo,
              the label-based product details, and a softer herbal color palette to match.
            </p>
            <div className="animate-fade-up delay-300 mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3.5 font-medium text-primary-foreground shadow-soft transition hover:opacity-90"
              >
                Shop Now
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I want to know more about Shraddha Ayurvedic Hair Oil.")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-primary px-6 py-3.5 font-medium text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                WhatsApp Enquiry
              </a>
            </div>
            <div className="animate-fade-up delay-300 mt-8 flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-[oklch(var(--gold))] text-[oklch(var(--gold))]" />
                <span><b>Traditional</b> herbal identity</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>Label-based product details</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[3rem] bg-primary/15 blur-3xl" aria-hidden />
            <div className="relative overflow-hidden rounded-[2rem] shadow-gold zoom-img animate-fade-up delay-200">
              <img
                src={hero}
                alt="Shraddha Ayurvedic hair oil with herbs"
                width={1600}
                height={1024}
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-border bg-card px-4 py-3 shadow-soft sm:block animate-fade-up delay-300">
              <p className="text-xs text-muted-foreground">Brand</p>
              <p className="font-display text-lg">{BRAND_NAME}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-card">
        <div className="container-narrow grid grid-cols-2 gap-6 py-6 text-sm md:grid-cols-4">
          {[
            { icon: Leaf, label: "Herbal Blend" },
            { icon: Sprout, label: "Ayurvedic Identity" },
            { icon: ShieldCheck, label: `${BRAND_NET_WEIGHT} Pack` },
            { icon: Award, label: "Logo-Matched Theme" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center justify-center gap-2 text-muted-foreground">
              <Icon className="h-4 w-4 text-primary" /> {label}
            </div>
          ))}
        </div>
      </section>

      <section className="container-narrow py-20" id="products">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm uppercase tracking-widest text-[oklch(var(--earth))]">Our Collection</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl">Three oils, one herbal direction.</h2>
          <p className="mt-3 text-muted-foreground">
            The existing product range stays in place, while the homepage branding now reflects your uploaded Shraddha Ayurvedic assets.
          </p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 120}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container-narrow">
          <Reveal className="max-w-2xl">
            <p className="text-sm uppercase tracking-widest text-[oklch(var(--gold))]">From the uploaded label</p>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl">Real brand details, now on the website.</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Sprout, title: "Ingredients", text: BRAND_INGREDIENTS.join(", ") },
              { icon: ShieldCheck, title: "Net Weight", text: BRAND_NET_WEIGHT },
              { icon: MapPin, title: "Address", text: BRAND_ADDRESS },
              { icon: HeartHandshake, title: "Phone", text: BRAND_PHONE },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-[oklch(var(--gold))] text-[oklch(var(--gold-foreground))]">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm opacity-80">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-narrow grid items-center gap-12 py-20 lg:grid-cols-2">
        <Reveal className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft">
          <img
            src={labelImage}
            alt="Shraddha Ayurvedic product label"
            width={1600}
            height={900}
            loading="lazy"
            className="h-auto w-full"
          />
        </Reveal>
        <Reveal delay={120}>
          <div className="mb-4 flex items-center gap-4">
            <img src={logo} alt={`${BRAND_NAME} logo`} className="h-16 w-16 rounded-full border border-border object-cover" />
            <div>
              <p className="text-sm uppercase tracking-widest text-[oklch(var(--earth))]">Brand Snapshot</p>
              <h2 className="font-display text-4xl sm:text-5xl">{BRAND_NAME}</h2>
            </div>
          </div>
          <p className="mt-3 text-muted-foreground">
            This section uses the uploaded label image as the source for the ingredients, pack size,
            address and phone number now shown on the site.
          </p>
          <ul className="mt-6 grid gap-3">
            {[
              "Logo image added as the website identity.",
              "Olive and ivory palette adjusted to match the logo.",
              "Homepage copy updated to reflect the uploaded brand assets.",
              "Contact details pulled from the label image and reused in shared layout.",
            ].map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>
    </>
  );
}
