"use client";

import { useEffect, useState } from "react";

type InsightsPayload = {
  spending_breakdown?: string[];
  overspending_warnings?: string[];
  budget_suggestions?: string[];
  savings_tips?: string[];
  monthly_trends?: string[];
  raw?: string;
};

export function InsightsCard() {
  const [data, setData] = useState<InsightsPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const load = async () => {
      setLoading(true);
      const response = await fetch("/api/ai-insights", { cache: "no-store" });
      const payload = await response.json();

      if (!isActive) return;

      if (!response.ok) {
        setError(payload?.error ?? "Failed to load insights");
        setLoading(false);
        return;
      }

      setData(payload.data ?? null);
      setLoading(false);
    };

    load();
    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div className="glass-card rounded-xl p-6">
      <h2 className="text-lg font-semibold text-foreground">AI Insights</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Personalized analysis based on your recent transactions.
      </p>

      {loading && <div className="mt-6 text-sm text-muted-foreground">Generating insights...</div>}

      {error && (
        <div className="mt-6 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {!loading && !error && data && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {data.raw && (
            <div className="sm:col-span-2 rounded-lg border border-border/60 bg-background/60 p-4 text-sm text-foreground">
              {data.raw}
            </div>
          )}
          {renderList("Spending breakdown", data.spending_breakdown)}
          {renderList("Overspending warnings", data.overspending_warnings)}
          {renderList("Budget suggestions", data.budget_suggestions)}
          {renderList("Savings tips", data.savings_tips)}
          {renderList("Monthly trends", data.monthly_trends)}
        </div>
      )}
    </div>
  );
}

function renderList(title: string, items?: string[]) {
  if (!items || items.length === 0) return null;
  return (
    <div className="rounded-lg border border-border/60 bg-background/60 p-4">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li key={`${title}-${index}`}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
