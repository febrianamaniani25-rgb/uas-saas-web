# UAS SAAS: Gamified Learning Quest App

Aplikasi web pembelajaran bergaya game yang terinspirasi dari Duolingo, dengan fitur streak, XP, koin, misi harian, dan reward. Proyek ini dibangun sebagai bagian dari tugas akhir mata kuliah Pemrograman Web dan dideploy menggunakan Vercel dengan database Supabase.

## 🚀 Live Demo
Akses aplikasi yang sudah dideploy di Vercel:
[https://uas-saas-web-hdr4.vercel.app/](https://uas-saas-web-hdr4.vercel.app/)

## 🛠️ Tech Stack
- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Database & Auth**: Supabase
- **Deployment**: Vercel

## ✨ Fitur Utama
- **Autentikasi Pengguna**: Login dan registrasi aman via Supabase Auth.
- **Dashboard Gamifikasi**: Melihat XP, streak, koin, dan achievement.
- **Misi Harian**: Tambah, edit, hapus, dan filter misi pembelajaran.
- **Progress Tracking**: Progress bar, pencarian, dan pagination.
- **Reward System**: Sistem klaim reward harian.
- **Responsive UI**: Tampilan nyaman di desktop maupun mobile.

## 📦 Setup Lokal

1. Clone repository ini.
2. Salin `.env.local.example` menjadi `.env.local`, lalu isi dengan kredensial Supabase:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
3. Install dependensi:
   ```
   npm install
   ```
4. Jalankan development server:
   ```
   npm run dev
   ```

## 🗄️ Setup Supabase

1. Buat proyek Supabase baru.
2. Buat tabel `inventory` dengan kolom:
   - `id` (uuid, primary key, default `gen_random_uuid()`)
   - `name` (text)
   - `quantity` (integer) — digunakan sebagai progress misi
   - `price` (numeric) — digunakan sebagai skor/XP
3. Nonaktifkan Row Level Security (RLS) untuk tabel `inventory`, atau buat policy yang mengizinkan pengguna terautentikasi membaca/menulis data.
4. Masukkan credential Supabase ke dalam environment variables.

## 🚢 Deploy ke Vercel

1. Push proyek ke GitHub.
2. Buat proyek baru di Vercel dan import repository ini.
3. Tambahkan environment variables di Vercel Settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy aplikasi.

## 📝 Catatan Pengerjaan
Proyek ini dikembangkan dengan fokus pada pengalaman pengguna yang menyenangkan (*user-friendly*) dan sistem gamifikasi yang memotivasi belajar. Tampilan dan alur aplikasi terinspirasi dari Duolingo web/app.
