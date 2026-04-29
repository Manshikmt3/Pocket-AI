import Link from "next/link";
import type { Metadata } from "next";
import { ContactForm } from "@/app/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Pocket AI",
  description: "Get in touch with the Pocket AI team.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between px-6 py-5 md:px-12">
        <Link href="/" className="text-lg font-semibold text-foreground">
          Pocket AI
        </Link>
        <div className="flex items-center gap-3 text-sm">
          <Link href="/about" className="text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link href="/premium" className="text-muted-foreground hover:text-foreground">
            Premium
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-widest text-muted-foreground">Contact us</p>
            <h1 className="text-4xl font-bold text-foreground md:text-5xl">
              Let’s keep your finances moving
            </h1>
            <p className="text-lg text-muted-foreground">
              Tell us what you need. We usually respond within one business day.
            </p>
            <div className="rounded-2xl border border-border/60 bg-card p-6 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Pocket AI HQ</p>
              <p className="mt-2">San Francisco, CA</p>
              <p className="mt-4">support@pocketai.app</p>
              <p className="mt-1">+1 (555) 215-1414</p>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <ContactForm />
          </div>
        </div>
      </main>
    </div>
  );
}
