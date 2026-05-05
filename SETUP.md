# Portfolio Admin Setup Guide

## 1. Create a Supabase project

1. Go to https://supabase.com and create a free project
2. Once created, go to **Project Settings → API**
3. Copy your **Project URL** and **anon public** key

## 2. Run the database schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Paste the entire contents of `supabase-schema.sql`
3. Click **Run** — this creates all tables, RLS policies, and triggers

## 3. Configure environment variables

### For local development
Copy `.env.local.example` to `.env.local` and fill in the values:
```bash
cp .env.local.example .env.local
```

### For Vercel deployment
In your Vercel project dashboard → **Settings → Environment Variables**, add:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key |
| `ADMIN_PASSWORD` | Your chosen admin password |
| `ADMIN_JWT_SECRET` | A random 64-char hex string |

## 4. Seed the database from your config

1. Deploy the app (or run `npm run dev`)
2. Log into the admin panel at `/admin/login`
3. On the Dashboard page, click **"Seed from config"**
4. This copies all data from `config/personal.ts` into Supabase

## 5. Access the admin panel

- URL: `https://your-domain.vercel.app/admin`
- Login with the `ADMIN_PASSWORD` you set

## Managing your portfolio

From the admin panel you can:
- **Profile** — edit all personal details, contact info, bio copy
- **Experience** — add/edit/delete job entries
- **Projects** — add/edit/delete portfolio projects
- **Skills** — manage skill groups and individual skills with proficiency levels

Changes are reflected on the public site immediately (no redeploy needed).

## Fallback behavior

If Supabase is unavailable or env vars are not set, the site automatically falls back to the static data in `config/personal.ts`. The site is never broken.
