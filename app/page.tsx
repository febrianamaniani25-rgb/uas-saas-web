import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/95 p-10 shadow-soft">
        <h1 className="text-4xl font-semibold text-white">UAS SAAS</h1>
        <p className="mt-4 text-slate-300">
          Welcome to the application. Use Supabase auth to login, register, and manage your inventory.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link href="/login" className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">
            Login
          </Link>
          <Link href="/register" className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500">
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
