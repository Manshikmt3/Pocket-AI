<img width="1885" height="725" alt="project photo" src="https://github.com/user-attachments/assets/94816dd6-4270-45d6-b45e-99d8045c9dac" />
# 💰 Pocket AI — Smart Finance Management Platform

> A full-stack AI-powered personal finance platform. Track income and expenses, set budgets, visualize spending trends, and get AI-driven insights — all in a secure, real-time dashboard.

<p align="left">
  <img src="https://img.shields.io/badge/Next.js_15-000000?style=flat-square&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/Groq_AI-F55036?style=flat-square&logoColor=white" />
  <img src="https://img.shields.io/badge/shadcn%2Fui-8B5CF6?style=flat-square&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Cloudflare-F38020?style=flat-square&logo=cloudflare&logoColor=white" />
</p>

---

## ✨ Core Features

| | Feature | Description |
|---|---|---|
| 📊 | **Dashboard** | Real-time overview of balance, income vs expenses, and budget health |
| 💸 | **Transactions** | Log, categorize, and filter income and expense entries by date or type |
| 📋 | **Budget Manager** | Set monthly spending limits per category with live usage tracking |
| 📈 | **Reports** | Interactive charts (Recharts) for spending trends and category breakdowns |
| 🤖 | **AI Insights** | Groq-powered assistant for spending analysis, budget advice, and queries |
| 🔐 | **Auth & Guards** | Supabase Auth with middleware-protected routes and redirect handling |
| 👤 | **User Profile** | Manage account details and preferences on the profile page |
| 📬 | **Contact Form** | In-app feedback and support messages stored to Supabase |

---

## 🚀 Setup

### 1. Clone the repo

```bash
git clone https://github.com/your-username/pocket-ai.git
cd pocket-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GROQ_API_KEY=your_groq_api_key
```

### 4. Run the app

```bash
npm run dev
```


---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Run the production server |
| `npm run lint` | Run ESLint checks |
| `npm run format` | Auto-format with Prettier |

---

## 🛠️ Tech Stack

| Technology | Role |
|---|---|
| **Next.js 15** | Framework (App Router) |
| **Supabase** | Database + Auth |
| **Groq API** | AI Engine |
| **shadcn/ui** | UI Component Library |
| **Tailwind CSS v4** | Styling |
| **Recharts** | Charts & Visualizations |
| **TanStack Query v5** | Data Fetching & Caching |
| **React Hook Form** | Form Management |
| **Zod** | Schema Validation |
| **Cloudflare** | Deployment |
| **TypeScript** | Language |

---

## 🗄️ Supabase Tables

### `transactions`

```sql
id          uuid        primary key
user_id     uuid        references auth.users
amount      numeric
type        text        -- 'income' | 'expense'
category    text
description text
date        date
created_at  timestamptz
```

### `budgets`

```sql
id            uuid        primary key
user_id       uuid        references auth.users
category      text
limit_amount  numeric
month         date
created_at    timestamptz
```

### `contact_messages`

```sql
id          uuid        primary key
name        text
email       text
subject     text
message     text
source      text
created_at  timestamptz
```

---

## 📁 Project Structure

```
pocket-ai/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   ├── transactions/
│   │   ├── budget/
│   │   ├── reports/
│   │   └── profile/
│   ├── api/
│   │   ├── ai/
│   │   └── contact/
│   ├── globals.css
│   └── layout.tsx
├── components/
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks
├── lib/
│   ├── supabase.ts       # Supabase client setup
│   └── utils.ts          # Utility functions
├── middleware.ts          # Route protection
├── .env.local
└── README.md
```

---

## 🔐 Auth & Route Protection

Handled via `middleware.ts` using **Supabase SSR**:

- **Protected** → `/dashboard`, `/transactions`, `/budget`, `/reports`, `/profile`
  - Unauthenticated users redirect to `/auth/login`
  - Original path saved via `?redirectedFrom=`
- **Auth routes** → `/auth/*`
  - Already logged-in users redirect to `/dashboard`

---

## ☁️ Deployment

Configured for **Cloudflare Pages** via `wrangler.jsonc`:

```bash
npx wrangler deploy
```

