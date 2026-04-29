import type { Metadata } from "next";
import { fetchBudgetsForUser } from "@/lib/budgets";
import {
  buildMonthlySummary,
  calculateTotals,
  filterTransactionsByMonth,
  groupExpensesByCategoryForMonth,
} from "@/lib/analytics";
import { fetchTransactionsForUser, getAuthenticatedUserId } from "@/lib/transactions";
import { ReportsClient, type ReportNotification } from "@/app/reports/ReportsClient";

export const metadata: Metadata = {
  title: "Reports — Pocket AI",
  description: "Monthly spending trends and smart finance notifications.",
};

export default async function ReportsPage() {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-muted-foreground">
        Please sign in to view reports.
      </div>
    );
  }

  const currentMonth = new Date().toISOString().slice(0, 7);
  const transactions = await fetchTransactionsForUser(userId);
  const currentMonthTransactions = filterTransactionsByMonth(transactions, currentMonth);
  const totals = calculateTotals(currentMonthTransactions);
  const monthlySummary = buildMonthlySummary(transactions, 4);
  const categoryData = groupExpensesByCategoryForMonth(transactions, currentMonth).sort(
    (a, b) => b.total - a.total,
  );
  const budgets = await fetchBudgetsForUser(userId, currentMonth).catch(() => []);

  const notifications: ReportNotification[] = [];
  const budgetMap = new Map(categoryData.map((item) => [item.category, item.total]));

  budgets.forEach((budget) => {
    const spent = budgetMap.get(budget.category) ?? 0;
    if (spent > budget.limit_amount) {
      notifications.push({
        title: `${budget.category} budget exceeded`,
        description: `Spent $${spent.toFixed(2)} of your $${budget.limit_amount.toFixed(
          2,
        )} limit this month.`,
        tone: "warning",
      });
    } else if (spent / budget.limit_amount >= 0.85) {
      notifications.push({
        title: `${budget.category} nearing limit`,
        description: `You've used ${Math.round(
          (spent / budget.limit_amount) * 100,
        )}% of your budget.`,
        tone: "info",
      });
    }
  });

  if (totals.income > 0 && totals.expense > totals.income) {
    notifications.push({
      title: "Spending above income",
      description: "This month’s expenses are higher than your income. Consider adjusting budgets.",
      tone: "warning",
    });
  }

  if (totals.income > 0) {
    const savingsRate = (totals.income - totals.expense) / totals.income;
    if (savingsRate >= 0.2) {
      notifications.push({
        title: "Healthy savings rate",
        description: "You’re saving over 20% of your income this month.",
        tone: "success",
      });
    } else if (savingsRate < 0.1) {
      notifications.push({
        title: "Savings rate low",
        description: "Try to increase savings to at least 10% of income.",
        tone: "warning",
      });
    }
  }

  const trimmedNotifications = notifications.slice(0, 5);

  return (
    <ReportsClient
      transactions={currentMonthTransactions}
      notifications={trimmedNotifications}
      monthlySummary={monthlySummary}
      categoryData={categoryData}
      totals={totals}
    />
  );
}
