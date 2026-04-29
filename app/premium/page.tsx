import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Premium — Pocket AI",
  description: "Unlock premium insights, automation, and concierge support.",
};

const tiers = [
  {
    name: "Starter",
    price: "$0",
    description: "For individuals who want the essentials.",
    features: ["Manual tracking", "Core dashboards", "Monthly exports"],
  },
  {
    name: "Premium",
    price: "$12",
    description: "Advanced insights and automation.",
    features: ["AI-powered coaching", "Smart notifications", "Unlimited budgets", "Weekly reports"],
    highlight: true,
  },
  {
    name: "Teams",
    price: "$29",
    description: "For finance leads managing multiple wallets.",
    features: ["Shared workspaces", "Role-based access", "Concierge onboarding"],
  },
];

export default function PremiumPage() {
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
          <Link href="/contact" className="text-muted-foreground hover:text-foreground">
            Contact
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12 md:py-20">
        <div className="text-center">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">Premium plans</p>
          <h1 className="mt-3 text-4xl font-bold text-foreground md:text-5xl">
            Upgrade to unlock smarter money moves
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Personalized insights, automation, and reporting for every stage of your journey.
          </p>
        </div>

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl border p-6 shadow-sm ${
                tier.highlight ? "border-primary/60 bg-primary/10" : "border-border/60 bg-card"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
                {tier.highlight ? (
                  <span className="rounded-full bg-primary/20 px-3 py-1 text-xs text-primary">
                    Most popular
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-3xl font-bold text-foreground">
                {tier.price}
                <span className="text-sm font-normal text-muted-foreground">/month</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {tier.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <Link href="/auth/signup" className="mt-6 block">
                <Button className="w-full" variant={tier.highlight ? "default" : "outline"}>
                  {tier.highlight ? "Start premium" : "Get started"}
                </Button>
              </Link>
            </div>
          ))}
        </section>

        <section className="mt-16 rounded-2xl border border-border/60 bg-card p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Questions about pricing?</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Our team can help you choose the right plan.
              </p>
            </div>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Talk to us
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
