import { NextResponse } from "next/server";
import { getAuthenticatedUserId } from "@/lib/transactions";
import {
  deleteBudgetForUser,
  fetchBudgetsForUser,
  upsertBudgetSchema,
  upsertBudgetForUser,
} from "@/lib/budgets";

export async function GET(request: Request) {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const month = searchParams.get("month") ?? undefined;

  try {
    const data = await fetchBudgetsForUser(userId, month);
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch budgets" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = upsertBudgetSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const budget = await upsertBudgetForUser(userId, parsed.data);
    return NextResponse.json({ data: budget }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save budget" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const budgetId = searchParams.get("id");

  if (!budgetId) {
    return NextResponse.json({ error: "Budget id is required" }, { status: 400 });
  }

  try {
    await deleteBudgetForUser(userId, budgetId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete budget" },
      { status: 500 },
    );
  }
}
