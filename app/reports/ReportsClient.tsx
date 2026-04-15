"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MonthlySummary, CategoryPoint, Totals } from "@/lib/analytics";
import type { TransactionRecord } from "@/lib/transactions/schema";

export type ReportNotification = {
  title: string;
  description: string;
  tone: "info" | "warning" | "success";
};

export function ReportsClient({
  transactions,
  notifications,
  monthlySummary,
  categoryData,
  totals,
}: {
  transactions: TransactionRecord[];
  notifications: ReportNotification[];
  monthlySummary: MonthlySummary[];
  categoryData: CategoryPoint[];
  totals: Totals;
}) {
  const handleExport = () => {
    if (transactions.length === 0) return;

    const header = ["date", "description", "category", "type", "amount"].join(",");
    const rows = transactions
      .map((item) =>
        [item.date, item.description ?? "", item.category, item.type, item.amount.toFixed(2)]
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(","),
      )
      .join("\n");

    const csv = `${header}\n${rows}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `report-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Review monthly trends, spending signals, and export reports.
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-2" onClick={handleExport}>
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total income</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold text-success">
            {formatCurrency(totals.income)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total expenses</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold text-destructive">
            {formatCurrency(totals.expense)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Net balance</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold text-foreground">
            {formatCurrency(totals.balance)}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {monthlySummary.map((summary) => (
                <div
                  key={summary.monthLabel}
                  className="flex items-center justify-between rounded-lg border border-border/60 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">{summary.monthLabel}</p>
                    <p className="text-xs text-muted-foreground">Income vs expenses</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="text-success">{formatCurrency(summary.income)}</p>
                    <p className="text-destructive">{formatCurrency(summary.expense)}</p>
                    <p className="text-foreground">Net {formatCurrency(summary.balance)}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {categoryData.length === 0 ? (
                <p className="text-sm text-muted-foreground">No spending data yet.</p>
              ) : (
                categoryData.slice(0, 6).map((category) => (
                  <div key={category.category} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{category.category}</span>
                    <span className="text-sm font-medium text-muted-foreground">
                      {formatCurrency(category.total)}
                    </span>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Smart notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notifications.length === 0 ? (
              <p className="text-sm text-muted-foreground">All clear. No alerts right now.</p>
            ) : (
              notifications.map((note) => (
                <div
                  key={note.title}
                  className={`rounded-lg border px-4 py-3 text-sm ${
                    note.tone === "warning"
                      ? "border-warning/40 bg-warning/10 text-warning"
                      : note.tone === "success"
                        ? "border-success/40 bg-success/10 text-success"
                        : "border-border/60 bg-muted/40 text-muted-foreground"
                  }`}
                >
                  <p className="font-semibold text-foreground">{note.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{note.description}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
