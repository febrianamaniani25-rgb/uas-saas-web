'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.14),_transparent_38%),linear-gradient(135deg,_#f8fafc,_#eef2ff)] px-6 py-10 text-slate-800">
      <div className="mx-auto max-w-3xl rounded-[38px] border border-slate-200/80 bg-white/80 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-600">About this app</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Gamified Learning Quest</h1>
        <p className="mt-4 text-slate-600">
          Aplikasi ini adalah proyek UAS mata kuliah Pemrograman Web. Tema antarmuka terinspirasi dari Duolingo:
          dark mode yang elegan, XP, streak, koin, misi harian, dan reward agar belajar terasa seperti permainan.
        </p>
        <p className="mt-4 text-slate-600">
          Data pengguna dan autentikasi menggunakan Supabase, sedangkan antarmuka dibangun dengan Next.js dan Tailwind CSS.
          Aplikasi ini siap di-deploy ke Vercel.
        </p>
        <Link href="/" className="mt-8 inline-block rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500">
          Kembali ke beranda
        </Link>
      </div>
    </main>
  );
}
