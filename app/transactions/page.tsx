import type { Metadata } from "next";
import { TransactionsClient } from "@/app/transactions/TransactionsClient";

export const metadata: Metadata = {
  title: "Transactions — Pocket AI",
  description: "View and manage your transactions.",
};

export default function TransactionsPage() {
  return <TransactionsClient />;
}
