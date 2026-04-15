import "server-only";

import { createSupabaseServerClient } from "@/lib/supabaseServer";
import type { CreateTransactionInput, TransactionRecord } from "@/lib/transactions/schema";
import { createTransactionSchema } from "@/lib/transactions/schema";

const TRANSACTIONS_TABLE = "transactions";

export { createTransactionSchema } from "@/lib/transactions/schema";

export async function getAuthenticatedUserId() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user.id;
}

export async function fetchTransactionsForUser(userId: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from(TRANSACTIONS_TABLE)
    .select("id, user_id, amount, type, category, description, date, created_at")
    .eq("user_id", userId)
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as TransactionRecord[];
}

export async function createTransactionForUser(userId: string, input: CreateTransactionInput) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from(TRANSACTIONS_TABLE)
    .insert({
      user_id: userId,
      amount: input.amount,
      type: input.type,
      category: input.category,
      description: input.description ?? null,
      date: input.date,
    })
    .select("id, user_id, amount, type, category, description, date, created_at")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as TransactionRecord;
}

export async function deleteTransactionForUser(userId: string, transactionId: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from(TRANSACTIONS_TABLE)
    .delete()
    .eq("id", transactionId)
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }
}
