# Pocket AI / Smart Finance
A full-stack AI-powered personal finance platform. Track income and expenses, set budgets, visualize spending trends, and get AI-driven insights — all in a secure, real-time dashboard.
Next.js 15
Supabase
Groq AI
shadcn/ui
Tailwind v4
TanStack Query
TypeScript
Cloudflare

# core features

📊 Dashboard
Real-time overview of balance, income vs expenses, and budget health.

💸 Transactions
Log, categorize, and filter income and expense entries by date or type.

📋 Budget Manager
Set monthly spending limits per category with live usage tracking.

📈 Reports
Interactive charts (Recharts) for spending trends and category breakdowns.

🤖 AI Insights
Groq-powered assistant for spending analysis, budget advice, and queries.

🔐 Auth & Guards
Supabase Auth with middleware-protected routes and redirect handling.

👤 User Profile
Manage account details and preferences on the profile page.

📬 Contact Form
In-app feedback and support messages stored to Supabase.
setup


## Setup

1. Install dependencies

```bash
npm install
```

2. Configure environment variables

Create a `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4o-mini
```

3. Run the app

```bash
npm run dev
```

##  npm Scripts

- `npm run dev` — start the development server
- `npm run build` — build for production
- `npm run start` — run the production server
- `npm run lint` — run linting

# tech stack
Next.js 15 - Framework

Supabase - DB + Auth

Groq API - AI Engine

shadcn/ui - UI Library

Recharts - Charts

TanStack Query - Data Fetching

React Hook Form - Forms

Cloudflare - Deployment

Zod - Validation

Tailwind v4 - Styling


## Required Supabase Tables

- `transactions` with columns: `id`, `user_id`, `amount`, `type`, `category`, `description`, `date`, `created_at`
- `budgets` with columns: `id`, `user_id`, `category`, `limit_amount`, `month`, `created_at`
- `contact_messages` with columns: `id`, `name`, `email`, `subject`, `message`, `source`, `created_at`
