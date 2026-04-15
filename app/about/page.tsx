import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About — Wallet AI",
  description: "Learn how Wallet AI helps you build better money habits.",
};

const values = [
  {
    title: "Clarity",
    description: "Bring every transaction into a clean, actionable dashboard.",
  },
  {
    title: "Confidence",
    description: "Turn AI-driven insights into smarter everyday decisions.",
  },
  {
    title: "Control",
    description: "Set budgets, track progress, and stay accountable.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between px-6 py-5 md:px-12">
        <Link href="/" className="text-lg font-semibold text-foreground">
          Wallet AI
        </Link>
        <div className="flex items-center gap-3 text-sm">
          <Link href="/premium" className="text-muted-foreground hover:text-foreground">
            Premium
          </Link>
          <Link href="/contact" className="text-muted-foreground hover:text-foreground">
            Contact
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12 md:py-20">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">About us</p>
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">
            Empowering smarter financial decisions
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Wallet AI is a finance companion built for modern creators, founders, and households. We
            combine secure financial data with AI guidance so you always know where your money is
            headed.
          </p>
        </div>

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">What makes Wallet AI unique</h2>
            <p className="text-muted-foreground">
              We believe finance tools should feel like a co-pilot, not a spreadsheet. Wallet AI
              blends budgeting, automation, and AI insights so you can take action faster.
            </p>
            <p className="text-muted-foreground">
              Our platform is built with bank-grade security, row-level permissions, and realtime
              dashboards to keep you fully in control.
            </p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card p-6">
            <p className="text-sm text-muted-foreground">Trusted by early teams</p>
            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Active users</span>
                <span className="text-foreground">12,400+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Budgets tracked</span>
                <span className="text-foreground">48,000+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Avg. savings uplift</span>
                <span className="text-foreground">18%</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-2xl border border-border/60 bg-card p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Ready to get started?</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Create an account and start tracking your finances in minutes.
              </p>
            </div>
            <Link href="/auth/signup">
              <Button size="lg">Start free</Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
