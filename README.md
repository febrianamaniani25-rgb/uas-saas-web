# UAS SAAS

A simple Next.js App Router project with Tailwind CSS and Supabase auth.

## Setup

1. Copy the project folder to your local machine.
2. Create a Supabase project and add a table named `inventory` with columns:
   - `id` (uuid, primary key)
   - `name` (text)
   - `quantity` (integer)
   - `price` (numeric)
3. Add environment variables in `.env.local`:

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

## Notes

- Login and register pages use Supabase Auth.
- Dashboard reads/writes the `inventory` table.
