import { z } from "zod";

export const transactionTypeSchema = z.enum(["income", "expense"]);

export const createTransactionSchema = z.object({
  amount: z
    .number({ invalid_type_error: "Amount is required" })
    .positive("Amount must be greater than zero"),
  type: transactionTypeSchema,
  category: z.string().trim().min(1, "Category is required"),
  description: z.string().trim().max(280).optional().nullable(),
  date: z
    .string()
    .optional()
    .transform((value) => value ?? new Date().toISOString().slice(0, 10))
    .refine((value) => !Number.isNaN(Date.parse(value)), "Invalid date"),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;

export type TransactionRecord = {
  id: string;
  user_id: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  description: string | null;
  date: string;
  created_at: string;
};
