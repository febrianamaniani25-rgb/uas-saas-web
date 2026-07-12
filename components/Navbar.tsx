'use client'
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    checkUser();
  }, []);

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 px-6 py-3 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-slate-900">
          QuestApp
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/about" className="text-sm font-semibold text-slate-700 transition hover:text-emerald-600">
            About
          </Link>
          {user ? (
            <>
              <Link href="/account" className="text-sm font-semibold text-slate-700 transition hover:text-emerald-600">
                Account
              </Link>
              <button onClick={() => supabase.auth.signOut().then(() => window.location.reload())} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}