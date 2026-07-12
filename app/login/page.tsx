'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data.user) {
      router.push('/dashboard');
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-800 bg-slate-900/95 p-10 shadow-soft">
        <h1 className="text-3xl font-semibold">Login</h1>
        <form onSubmit={handleLogin} className="mt-8 flex flex-col gap-5">
          <label className="space-y-2 text-sm text-slate-300">
            <span>Email</span>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 p-3 text-slate-100 outline-none focus:border-emerald-500"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            <span>Password</span>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="••••••••"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 p-3 text-slate-100 outline-none focus:border-emerald-500"
            />
          </label>
          {error ? <p className="text-sm text-rose-400">{error}</p> : null}
          <button disabled={loading} className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="rounded-full border border-slate-700 bg-slate-950/80 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-emerald-400 hover:text-emerald-300"
          >
            Try demo
          </button>
          <p className="text-sm text-slate-400">
            Belum punya akun?{' '}
            <Link href="/register" className="font-semibold text-emerald-400 hover:text-emerald-300">
              Daftar sekarang
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
