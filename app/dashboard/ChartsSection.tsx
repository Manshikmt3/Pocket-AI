"use client";

import dynamic from "next/dynamic";
import type { MonthlyChartPoint } from "@/components/charts/BarChart";
import type { CategoryChartPoint } from "@/components/charts/PieChart";

const BarChart = dynamic(() => import("@/components/charts/BarChart").then((mod) => mod.BarChart), {
  ssr: false,
  loading: () => <div className="h-72 animate-pulse rounded-xl bg-muted" />,
});

const PieChart = dynamic(() => import("@/components/charts/PieChart").then((mod) => mod.PieChart), {
  ssr: false,
  loading: () => <div className="h-72 animate-pulse rounded-xl bg-muted" />,
});

export function ChartsSection({
  monthlyData,
  categoryData,
}: {
  monthlyData: MonthlyChartPoint[];
  categoryData: CategoryChartPoint[];
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="glass-card rounded-xl p-6">
        <h2 className="text-lg font-semibold text-foreground">Monthly expenses</h2>
        <p className="mt-1 text-sm text-muted-foreground">Track your spending trends.</p>
        <div className="mt-4">
          <BarChart data={monthlyData} />
        </div>
      </div>
      <div className="glass-card rounded-xl p-6">
        <h2 className="text-lg font-semibold text-foreground">Expenses by category</h2>
        <p className="mt-1 text-sm text-muted-foreground">See where your money goes.</p>
        <div className="mt-4">
          <PieChart data={categoryData} />
        </div>
      </div>
    </div>
  );
}
