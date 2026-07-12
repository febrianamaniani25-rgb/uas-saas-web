# UAS SAAS

A simple Next.js App Router project with Tailwind CSS and Supabase auth.

## Setup

1. Copy the project folder to your local machine.
2. Create a Supabase project and add a table named `inventory` with columns:
   - `id` (uuid, primary key)
   - `name` (text)
   - `quantity` (integer)
   - `price` (numeric)
3. Copy `.env.local.example` to `.env.local` and add your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Install dependencies:

```
npm install
```

5. Run development server:

```
npm run dev
```

## Supabase setup

1. Create a Supabase project.
2. Create a table named `inventory` with columns:
   - `id` uuid primary key, default `gen_random_uuid()` or `uuid_generate_v4()`
   - `name` text
   - `quantity` integer
   - `price` numeric
3. In `Authentication -> Policies`, disable row level security for `inventory` or create policies that allow authenticated users to select/insert/update/delete rows.
4. Use the same credentials in `.env.local`.

## Deploy to Vercel

1. Push the project to GitHub.
2. In Vercel, create a new project and import this repository.
3. Add environment variables in Vercel settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy the app.

## Notes

- Login and register pages use Supabase Auth.
- Dashboard reads/writes the `inventory` table.
