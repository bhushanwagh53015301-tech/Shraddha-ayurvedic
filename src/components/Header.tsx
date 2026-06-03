import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import logo from "@/assets/logo.jpeg";
import { BRAND_NAME } from "@/lib/products";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/#benefits", label: "Benefits" },
  { to: "/contact", label: "Contact" },
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/85 border-b border-border/60">
      <div className="container-narrow flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src={logo}
            alt={`${BRAND_NAME} logo`}
            className="h-10 w-10 rounded-full border border-border bg-card object-cover shadow-soft transition-transform group-hover:scale-105"
          />
          <span className="font-display text-lg tracking-tight sm:text-xl">
            {BRAND_NAME}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {links.map((l) =>
            l.to.startsWith("/#") ? (
              <a key={l.to} href={l.to} className="hover:text-primary transition-colors">
                {l.label}
              </a>
            ) : (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-primary" }}
                className="hover:text-primary transition-colors"
              >
                {l.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            className="relative inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-muted transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1 rounded-full bg-[oklch(var(--gold))] text-[oklch(var(--gold-foreground))] text-[11px] font-bold grid place-items-center">
                {count}
              </span>
            )}
          </Link>
          <button
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-muted"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background">
          <div className="container-narrow py-3 flex flex-col gap-1">
            {links.map((l) =>
              l.to.startsWith("/#") ? (
                <a
                  key={l.to}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className="px-2 py-3 rounded-md hover:bg-muted"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="px-2 py-3 rounded-md hover:bg-muted"
                >
                  {l.label}
                </Link>
              ),
            )}
          </div>
        </div>
      )}
    </header>
  );
}
