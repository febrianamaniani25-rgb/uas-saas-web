'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/login');
        return;
      }
      setEmail(session.user.email ?? null);
      setLoading(false);
    }
    void loadUser();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/login');
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.14),_transparent_38%),linear-gradient(135deg,_#f8fafc,_#eef2ff)] px-6 text-slate-800">
        <p className="text-slate-600">Loading account...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.14),_transparent_38%),linear-gradient(135deg,_#f8fafc,_#eef2ff)] px-6 py-10 text-slate-800">
      <div className="mx-auto max-w-2xl rounded-[38px] border border-slate-200/80 bg-white/80 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-600">Account</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Your profile</h1>
        <div className="mt-6 space-y-3 rounded-[24px] border border-slate-200 bg-white/90 p-6 shadow-sm">
          <p className="text-sm text-slate-600">Email</p>
          <p className="text-lg font-semibold text-slate-900">{email}</p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={handleLogout} className="rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-600">
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}
