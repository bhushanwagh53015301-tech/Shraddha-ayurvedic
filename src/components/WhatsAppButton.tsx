import { WHATSAPP_NUMBER } from "@/lib/products";

export default function WhatsAppButton({ message }: { message?: string }) {
  const href = `https://wa.me/${WHATSAPP_NUMBER}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full grid place-items-center shadow-gold text-white animate-fade-up"
      style={{ background: "#25D366" }}
    >
      <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white">
        <path d="M19.11 17.27c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.62.14-.18.27-.71.88-.87 1.07-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.62-1.5-.85-2.05-.22-.54-.45-.47-.62-.48l-.53-.01c-.18 0-.48.07-.73.34s-.96.94-.96 2.29.99 2.66 1.13 2.85c.14.18 1.95 2.97 4.72 4.16.66.29 1.18.46 1.58.59.66.21 1.27.18 1.74.11.53-.08 1.6-.65 1.83-1.28.23-.62.23-1.15.16-1.27-.07-.12-.25-.18-.52-.32zM16.01 4C9.39 4 4 9.39 4 16.01c0 2.12.56 4.18 1.62 6L4 28l6.16-1.6c1.74.95 3.7 1.46 5.85 1.46h.01c6.61 0 12-5.39 12-12.01S22.63 4 16.01 4z" />
      </svg>
    </a>
  );
}
