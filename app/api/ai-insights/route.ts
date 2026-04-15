import { NextResponse } from "next/server";
import { fetchTransactionsForUser, getAuthenticatedUserId } from "@/lib/transactions";
import { calculateTotals, groupExpensesByCategory, groupExpensesByMonth } from "@/lib/analytics";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export async function GET() {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL;

  if (!apiKey || !model) {
    return NextResponse.json({ error: "AI provider is not configured" }, { status: 500 });
  }

  try {
    const transactions = await fetchTransactionsForUser(userId);
    const totals = calculateTotals(transactions);
    const categoryTotals = groupExpensesByCategory(transactions);
    const monthlyTotals = groupExpensesByMonth(transactions, 6);

    const prompt = `You are a finance analyst. Use the JSON data below to provide AI insights.
Return ONLY valid JSON with keys: spending_breakdown, overspending_warnings, budget_suggestions, savings_tips, monthly_trends.
Each key should map to an array of concise bullet strings.
Avoid generic advice; be specific to the numbers.

DATA:
${JSON.stringify({ totals, categoryTotals, monthlyTotals })}`;

    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.3,
        messages: [
          { role: "system", content: "You are a helpful, data-driven finance assistant." },
          { role: "user", content: prompt },
        ],
      }),
    });

    const payload = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: payload?.error?.message ?? "AI request failed" },
        { status: response.status },
      );
    }

    const content = payload?.choices?.[0]?.message?.content ?? "";
    let parsed = null;
    try {
      parsed = JSON.parse(content);
    } catch {
      parsed = null;
    }

    return NextResponse.json({ data: parsed ?? { raw: content } });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate insights" },
      { status: 500 },
    );
  }
}
