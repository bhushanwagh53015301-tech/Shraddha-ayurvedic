import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import logo from "@/assets/logo.jpeg";
import {
  BRAND_ADDRESS,
  BRAND_NAME,
  BRAND_PHONE,
  BRAND_TAGLINE,
  products,
  WHATSAPP_NUMBER,
} from "@/lib/products";

export default function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="container-narrow grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <img
              src={logo}
              alt={`${BRAND_NAME} logo`}
              className="h-10 w-10 rounded-full border border-white/20 bg-white object-cover"
            />
            <span className="font-display text-xl">{BRAND_NAME}</span>
          </div>
          <p className="text-sm leading-relaxed opacity-80">
            {BRAND_TAGLINE} made with a herbal ingredient blend and a calm olive-toned identity.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-display text-lg">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li><Link to="/" className="hover:text-[oklch(var(--gold))]">Home</Link></li>
            <li><Link to="/about" className="hover:text-[oklch(var(--gold))]">About Us</Link></li>
            <li><Link to="/products" className="hover:text-[oklch(var(--gold))]">Products</Link></li>
            <li><Link to="/contact" className="hover:text-[oklch(var(--gold))]">Contact</Link></li>
            <li><Link to="/cart" className="hover:text-[oklch(var(--gold))]">Cart</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-display text-lg">Our Oils</h4>
          <ul className="space-y-2 text-sm opacity-90">
            {products.map((p) => (
              <li key={p.slug}>
                <Link to="/products/$slug" params={{ slug: p.slug }} className="hover:text-[oklch(var(--gold))]">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-display text-lg">Get in Touch</h4>
          <ul className="space-y-3 text-sm opacity-90">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              {BRAND_ADDRESS}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              {BRAND_PHONE}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Contact via phone or WhatsApp
            </li>
            <li>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block rounded-full bg-[oklch(var(--gold))] px-4 py-2 font-medium text-[oklch(var(--gold-foreground))] hover:opacity-90"
              >
                Chat on WhatsApp
              </a>
            </li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a href="#" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-[oklch(var(--gold))] hover:text-[oklch(var(--gold-foreground))]"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-[oklch(var(--gold))] hover:text-[oklch(var(--gold-foreground))]"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="YouTube" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-[oklch(var(--gold))] hover:text-[oklch(var(--gold-foreground))]"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-narrow flex flex-wrap items-center justify-between gap-2 py-5 text-xs opacity-70">
          <p>Copyright {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
          <p>Crafted with herbs, made with love.</p>
        </div>
      </div>
    </footer>
  );
}
