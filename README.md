# UAS SAAS: Inventory Management System

Aplikasi berbasis web untuk manajemen inventaris yang terintegrasi dengan Supabase. Proyek ini dibangun sebagai bagian dari tugas akhir mata kuliah Pemrograman Web.

## 🚀 Live Demo
Akses aplikasi yang sudah dideploy di Vercel:
[https://uas-saas-web-hdr4.vercel.app/](https://uas-saas-web-hdr4.vercel.app/)

<<<<<<< HEAD
1. Copy the project folder to your local machine.
2. Create a Supabase project and add a table named `inventory` with columns:
   - `id` (uuid, primary key)
   - `name` (text)
   - `quantity` (integer)
   - `price` (numeric)
3. Copy `.env.local.example` to `.env.local` and add your Supabase credentials:
=======
## 🛠️ Tech Stack
- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Database & Auth**: Supabase
- **Deployment**: Vercel
>>>>>>> 5a05764162ebb55bf86a4fcc74fe90ffa391e070

## ✨ Fitur Utama
- **Autentikasi Pengguna**: Sistem login dan registrasi aman.
- **CRUD Inventory**: Pengguna dapat menambah, melihat, dan mengelola item inventaris secara real-time.
- **Responsive UI**: Desain antarmuka yang nyaman di berbagai perangkat.

<<<<<<< HEAD
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
=======
## 📝 Catatan Pengerjaan
Proyek ini dikembangkan dengan fokus pada kemudahan penggunaan (*user-friendly*) dan efisiensi sistem database.
>>>>>>> 5a05764162ebb55bf86a4fcc74fe90ffa391e070
