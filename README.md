# Pocket AI — Next.js App Router

Production-ready migration of the Pocket AI finance app to Next.js (App Router) with Tailwind CSS, shadcn/ui, and Supabase.

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

## Scripts

- `npm run dev` — start the development server
- `npm run build` — build for production
- `npm run start` — run the production server
- `npm run lint` — run linting

## Required Supabase Tables

- `transactions` with columns: `id`, `user_id`, `amount`, `type`, `category`, `description`, `date`, `created_at`
- `budgets` with columns: `id`, `user_id`, `category`, `limit_amount`, `month`, `created_at`
- `contact_messages` with columns: `id`, `name`, `email`, `subject`, `message`, `source`, `created_at`
