import type { Metadata } from "next";
import { getAuthenticatedUserId } from "@/lib/transactions";
import { BudgetClient } from "@/app/budget/BudgetClient";

export const metadata: Metadata = {
  title: "Budgets — Pocket AI",
  description: "Plan monthly spending limits by category.",
};

export default async function BudgetPage() {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-muted-foreground">
        Please sign in to manage budgets.
      </div>
    );
  }

  return <BudgetClient />;
}
