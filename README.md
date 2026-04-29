# 💰  POCKET-AI -Smart Finance Management Platform #
 💰 A full-stack AI-powered personal finance platform. Track income and expenses, set budgets, visualize spending trends, and get AI-driven insights — all in a secure, real-time dashboard.

 # 🚀  core features #
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

📬Contact Form
In-app feedback and support messages stored to Supabase.

# setup #
1. Install dependencies npm install
   
2. Create .env.local NEXT_PUBLIC_SUPABASE_URL=your_supabase_url NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key GROQ_API_KEY=your_groq_api_key
   
3. Run dev server npm run dev

# npm scripts #
npm run dev - Start Next.js dev server

npm run build - Production build

npm run start - Run production server

npm run lint - Run ESLint + Prettier checks

npm run format - Auto-format all files with Prettier

# 🔧 tech stack #
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

