"use client";

import { useCallback, useEffect, useState } from "react";
import type { CreateTransactionInput, TransactionRecord } from "@/lib/transactions/schema";

export interface TransactionsState {
  data: TransactionRecord[];
  isLoading: boolean;
  isMutating: boolean;
  error: string | null;
}

export function useTransactions() {
  const [state, setState] = useState<TransactionsState>({
    data: [],
    isLoading: true,
    isMutating: false,
    error: null,
  });

  const fetchTransactions = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    const response = await fetch("/api/transactions", { cache: "no-store" });
    const payload = await response.json();

    if (!response.ok) {
      setState((prev) => ({
        ...prev,
        data: [],
        isLoading: false,
        error: payload?.error ?? "Failed to load transactions",
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      data: payload.data ?? [],
      isLoading: false,
      error: null,
    }));
  }, []);

  const addTransaction = useCallback(async (input: CreateTransactionInput) => {
    setState((prev) => ({ ...prev, isMutating: true, error: null }));
    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const payload = await response.json();

    if (!response.ok) {
      setState((prev) => ({
        ...prev,
        isMutating: false,
        error: payload?.error ?? "Failed to create transaction",
      }));
      return { success: false, error: payload?.error };
    }

    setState((prev) => ({
      ...prev,
      isMutating: false,
      data: [payload.data, ...prev.data],
    }));

    return { success: true };
  }, []);

  const deleteTransaction = useCallback(async (transactionId: string) => {
    setState((prev) => ({ ...prev, isMutating: true, error: null }));
    const response = await fetch(`/api/transactions?id=${transactionId}`, {
      method: "DELETE",
    });
    const payload = await response.json();

    if (!response.ok) {
      setState((prev) => ({
        ...prev,
        isMutating: false,
        error: payload?.error ?? "Failed to delete transaction",
      }));
      return { success: false, error: payload?.error };
    }

    setState((prev) => ({
      ...prev,
      isMutating: false,
      data: prev.data.filter((item) => item.id !== transactionId),
    }));

    return { success: true };
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return { ...state, refresh: fetchTransactions, addTransaction, deleteTransaction };
}
