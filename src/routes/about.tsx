import { createFileRoute } from "@tanstack/react-router";
import { FlaskConical, HandHeart, Leaf, Sprout } from "lucide-react";
import ingredients from "@/assets/ingredients.jpg";
import logo from "@/assets/logo.jpeg";
import Reveal from "@/components/Reveal";
import { BRAND_INGREDIENTS, BRAND_NAME, BRAND_NET_WEIGHT } from "@/lib/products";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About Us | ${BRAND_NAME}` },
      {
        name: "description",
        content: `${BRAND_NAME} presents an Ayurvedic hair oil identity built from your uploaded logo and label information.`,
      },
      { property: "og:title", content: `About Us | ${BRAND_NAME}` },
      { property: "og:description", content: "Logo-led, herbal-themed Ayurvedic hair oil branding." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="gradient-hero py-20">
        <div className="container-narrow max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs uppercase tracking-wider text-primary">
            <Leaf className="h-3.5 w-3.5" /> Our Story
          </span>
          <h1 className="mt-5 text-balance font-display text-5xl md:text-6xl">
            {BRAND_NAME} now feels like the product label.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            The updated site centers the circular olive logo, the herbal ingredient list, and the calm ivory-green palette visible in your uploaded assets.
          </p>
        </div>
      </section>

      <section className="container-narrow grid items-center gap-12 py-20 lg:grid-cols-2">
        <Reveal className="overflow-hidden rounded-[2rem] shadow-soft zoom-img">
          <img src={ingredients} alt="Ayurvedic herbs used for hair oil" width={1600} height={900} loading="lazy" className="h-auto w-full" />
        </Reveal>
        <Reveal delay={120}>
          <div className="mb-5 flex items-center gap-4">
            <img src={logo} alt={`${BRAND_NAME} logo`} className="h-16 w-16 rounded-full border border-border object-cover" />
            <div>
              <p className="text-sm uppercase tracking-widest text-[oklch(var(--earth))]">Brand Direction</p>
              <h2 className="font-display text-4xl">{BRAND_NAME}</h2>
            </div>
          </div>
          <p className="text-muted-foreground">
            Rather than a generic Ayurvedic story, this page now reflects the actual uploaded identity: herbal ingredients, a 95 ML pack, and a softer brand tone anchored to the logo.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { icon: Sprout, title: "Ingredient Focus", text: BRAND_INGREDIENTS.join(", ") },
              { icon: FlaskConical, title: "Pack Detail", text: BRAND_NET_WEIGHT },
              { icon: HandHeart, title: "Brand Feel", text: "Olive, ivory and gentle herbal presentation." },
              { icon: Leaf, title: "Website Update", text: "Logo, content and contact details are now aligned." },
            ].map((card) => (
              <div key={card.title} className="rounded-2xl border border-border p-4">
                <card.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-2 font-display text-lg">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
