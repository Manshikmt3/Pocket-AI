import "server-only";

import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

const BUDGETS_TABLE = "budgets";

export const upsertBudgetSchema = z.object({
  category: z.string().trim().min(1, "Category is required"),
  limit_amount: z
    .number({ invalid_type_error: "Limit amount is required" })
    .positive("Limit amount must be greater than zero"),
  month: z.string().regex(/^\d{4}-\d{2}$/, "Month must be in YYYY-MM format"),
});

export type BudgetRecord = {
  id: string;
  user_id: string;
  category: string;
  limit_amount: number;
  month: string;
  created_at: string;
};

export async function fetchBudgetsForUser(userId: string, month?: string) {
  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from(BUDGETS_TABLE)
    .select("id, user_id, category, limit_amount, month, created_at")
    .eq("user_id", userId)
    .order("month", { ascending: false })
    .order("category", { ascending: true });

  if (month) {
    const dateValue = month.length === 7 ? `${month}-01` : month;
    query = query.eq("month", dateValue);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  const budgets = (data ?? []) as BudgetRecord[];
  return budgets.map((b) => ({
    ...b,
    month: b.month.slice(0, 7), // Ensure YYYY-MM format
  }));
}

export async function upsertBudgetForUser(
  userId: string,
  input: z.infer<typeof upsertBudgetSchema>,
) {
  const supabase = await createSupabaseServerClient();
  const monthDate = `${input.month}-01`;

  // First, check if a budget for this category and month already exists
  const { data: existing, error: fetchError } = await supabase
    .from(BUDGETS_TABLE)
    .select("id")
    .eq("user_id", userId)
    .eq("category", input.category)
    .eq("month", monthDate)
    .maybeSingle();

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  let result;

  if (existing) {
    // Update existing budget
    const { data, error } = await supabase
      .from(BUDGETS_TABLE)
      .update({ limit_amount: input.limit_amount })
      .eq("id", existing.id)
      .select("id, user_id, category, limit_amount, month, created_at")
      .single();

    if (error) throw new Error(error.message);
    result = data;
  } else {
    // Insert new budget
    const { data, error } = await supabase
      .from(BUDGETS_TABLE)
      .insert({
        user_id: userId,
        category: input.category,
        limit_amount: input.limit_amount,
        month: monthDate,
      })
      .select("id, user_id, category, limit_amount, month, created_at")
      .single();

    if (error) throw new Error(error.message);
    result = data;
  }

  const budget = result as BudgetRecord;
  return {
    ...budget,
    month: budget.month.slice(0, 7), // Ensure YYYY-MM format
  };
}

export async function deleteBudgetForUser(userId: string, budgetId: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from(BUDGETS_TABLE)
    .delete()
    .eq("id", budgetId)
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }
}
