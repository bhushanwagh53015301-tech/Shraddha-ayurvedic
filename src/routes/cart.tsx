import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useCart } from "@/lib/cart-context";
import { BRAND_NAME, formatPrice, WHATSAPP_NUMBER } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: `Cart and Checkout | ${BRAND_NAME}` },
      { name: "description", content: "Review your order and continue checkout with direct WhatsApp support." },
      { property: "og:title", content: `Your Cart | ${BRAND_NAME}` },
      { property: "og:url", content: "/cart" },
    ],
    links: [{ rel: "canonical", href: "/cart" }],
  }),
  component: CartPage,
});

const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  phone: z.string().trim().regex(/^[+0-9 \-()]{7,20}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(200),
  address: z.string().trim().min(5, "Address is required").max(300),
  city: z.string().trim().min(2, "City is required").max(60),
  pincode: z.string().trim().regex(/^[0-9]{4,8}$/, "Enter a valid pincode"),
});

function CartPage() {
  const { detailed, setQty, remove, subtotal, count, clear } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", city: "", pincode: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placed, setPlaced] = useState<null | { id: string }>(null);

  const shipping = subtotal > 0 && subtotal < 599 ? 49 : 0;
  const total = subtotal + shipping;

  const orderLines = detailed
    .map((d) => `- ${d.product.name} x ${d.qty} = ${formatPrice(d.lineTotal)}`)
    .join("%0A");

  const waOrderMsg =
    `Hi! I would like to place an order:%0A${orderLines}%0A%0ASubtotal: ${formatPrice(subtotal)}%0AShipping: ${formatPrice(shipping)}%0ATotal: ${formatPrice(total)}` +
    (form.name ? `%0A%0AName: ${form.name}` : "") +
    (form.phone ? `%0APhone: ${form.phone}` : "") +
    (form.address ? `%0AAddress: ${form.address}, ${form.city} - ${form.pincode}` : "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = checkoutSchema.safeParse(form);

    if (!result.success) {
      const nextErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        nextErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(nextErrors);
      toast.error("Please fix the highlighted fields");
      return;
    }

    if (count === 0) return;

    setErrors({});
    const id = "SHA" + Math.floor(100000 + Math.random() * 900000);
    setPlaced({ id });
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (placed) {
    return (
      <section className="container-narrow max-w-xl py-24 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="mt-5 font-display text-4xl">Order placed!</h1>
        <p className="mt-3 text-muted-foreground">
          Thank you for choosing {BRAND_NAME}. Your order <b>#{placed.id}</b> has been received.
          We will confirm it with you on WhatsApp shortly.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/products" className="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90">Continue Shopping</Link>
          <Link to="/" className="rounded-full border border-primary px-6 py-3 font-medium text-primary transition hover:bg-primary hover:text-primary-foreground">Back to Home</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container-narrow py-12">
      <h1 className="font-display text-4xl md:text-5xl">Your Cart</h1>
      <p className="mt-2 text-muted-foreground">
        {count > 0 ? `${count} item${count > 1 ? "s" : ""} in your bag` : "Your bag is empty"}
      </p>

      {count === 0 ? (
        <div className="mt-12 rounded-3xl border border-dashed border-border p-16 text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">Looks empty. Discover our oils.</p>
          <Link to="/products" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90">Shop Products</Link>
        </div>
      ) : (
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_400px]">
          <div className="space-y-4">
            {detailed.map((item) => (
              <div key={item.slug} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[oklch(var(--cream))]">
                  <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <Link to="/products/$slug" params={{ slug: item.slug }} className="font-display text-lg hover:text-primary">{item.product.name}</Link>
                  <p className="text-sm text-muted-foreground">{formatPrice(item.product.price)}</p>
                  <div className="mt-2 inline-flex items-center rounded-full border border-border">
                    <button onClick={() => setQty(item.slug, item.qty - 1)} className="grid h-8 w-8 place-items-center rounded-l-full hover:bg-muted"><Minus className="h-3.5 w-3.5" /></button>
                    <span className="w-8 text-center text-sm">{item.qty}</span>
                    <button onClick={() => setQty(item.slug, item.qty + 1)} className="grid h-8 w-8 place-items-center rounded-r-full hover:bg-muted"><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatPrice(item.lineTotal)}</p>
                  <button onClick={() => remove(item.slug)} className="mt-2 inline-flex items-center gap-1 text-xs text-destructive hover:underline">
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              </div>
            ))}

            <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-4 font-display text-2xl">Delivery Details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name" name="name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} error={errors.name} />
                <Field label="Phone Number" name="phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} error={errors.phone} />
                <Field label="Email" name="email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} error={errors.email} className="sm:col-span-2" />
                <Field label="Address" name="address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} error={errors.address} className="sm:col-span-2" />
                <Field label="City" name="city" value={form.city} onChange={(v) => setForm({ ...form, city: v })} error={errors.city} />
                <Field label="Pincode" name="pincode" value={form.pincode} onChange={(v) => setForm({ ...form, pincode: v })} error={errors.pincode} />
              </div>

              <div className="mt-6 rounded-xl bg-[oklch(var(--cream))] p-4 text-sm">
                <p className="mb-2 font-medium">Order Summary</p>
                <ul className="space-y-1 text-muted-foreground">
                  {detailed.map((d) => (
                    <li key={d.slug} className="flex justify-between"><span>{d.product.name} x {d.qty}</span><span>{formatPrice(d.lineTotal)}</span></li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button type="submit" className="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground shadow-soft transition hover:opacity-90">Place Order</button>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waOrderMsg}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full px-6 py-3 font-medium text-white"
                  style={{ background: "#25D366" }}
                >
                  Order on WhatsApp
                </a>
              </div>
            </form>
          </div>

          <aside className="rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
            <h2 className="font-display text-2xl">Summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd></div>
              <div className="flex justify-between border-t border-border pt-3 text-base font-medium"><dt>Total</dt><dd className="font-display text-xl text-primary">{formatPrice(total)}</dd></div>
            </dl>
            <p className="mt-4 text-xs text-muted-foreground">Free shipping on orders over Rs 599. Cash on Delivery available across India.</p>
          </aside>
        </div>
      )}
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  className = "",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-sm font-medium">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
