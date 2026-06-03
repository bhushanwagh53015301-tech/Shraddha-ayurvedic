import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import Reveal from "@/components/Reveal";
import {
  BRAND_ADDRESS,
  BRAND_NAME,
  BRAND_PHONE,
  products,
  WHATSAPP_NUMBER,
} from "@/lib/products";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact Us | ${BRAND_NAME}` },
      {
        name: "description",
        content: `Reach ${BRAND_NAME} for product enquiries and customer support using the details shown on the uploaded label.`,
      },
      { property: "og:title", content: `Contact ${BRAND_NAME}` },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  phone: z.string().trim().regex(/^[+0-9 \-()]{7,20}$/, "Enter a valid phone"),
  email: z.string().trim().email("Enter a valid email").max(200),
  interest: z.string().min(1, "Select a product"),
  message: z.string().trim().min(5, "Tell us a little more").max(1000),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", interest: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const result = schema.safeParse(form);

    if (!result.success) {
      const nextErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        nextErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setForm({ name: "", phone: "", email: "", interest: "", message: "" });
    toast.success("Thanks! Your message is ready. You can also reach us directly on WhatsApp.");
  }

  return (
    <>
      <section className="gradient-hero py-16">
        <div className="container-narrow max-w-2xl text-center">
          <p className="text-sm uppercase tracking-widest text-[oklch(var(--earth))]">Get in touch</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">Connect with {BRAND_NAME}.</h1>
          <p className="mt-4 text-muted-foreground">
            The contact details below are aligned with the information visible on your uploaded label image.
          </p>
        </div>
      </section>

      <section className="container-narrow grid gap-10 py-16 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-7">
            <h2 className="mb-5 font-display text-2xl">Send a Message</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} error={errors.name} />
              <Field label="Phone Number" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} error={errors.phone} />
              <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} error={errors.email} className="sm:col-span-2" />
              <div className="sm:col-span-2">
                <label className="text-sm font-medium">Product Interest</label>
                <select
                  value={form.interest}
                  onChange={(e) => setForm({ ...form, interest: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <option value="">Select a product</option>
                  {products.map((p) => <option key={p.slug} value={p.name}>{p.name}</option>)}
                  <option value="Shraddha Ayurvedic Hair Oil">Shraddha Ayurvedic Hair Oil</option>
                  <option value="Bulk Order">Bulk Order</option>
                </select>
                {errors.interest && <p className="mt-1 text-xs text-destructive">{errors.interest}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium">Message</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground shadow-soft hover:opacity-90">
                <Send className="h-4 w-4" /> Send Message
              </button>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 font-medium text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Phone className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </form>
        </Reveal>

        <Reveal delay={150} className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-2xl">Reach Us</h3>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-5 w-5 text-primary" /><span>{BRAND_ADDRESS}</span></li>
              <li className="flex items-center gap-3"><Phone className="h-5 w-5 text-primary" /> {BRAND_PHONE}</li>
              <li className="flex items-center gap-3"><Mail className="h-5 w-5 text-primary" /> WhatsApp and phone support available</li>
              <li className="flex items-start gap-3"><Clock className="mt-0.5 h-5 w-5 text-primary" /><span>Mon - Sat | 9:00 am - 7:00 pm</span></li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-2xl">Contact Note</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              I reused the location and phone number from the uploaded label image. If you want, we can replace the generic support note with an email address later.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
