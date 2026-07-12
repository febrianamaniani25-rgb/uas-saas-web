'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

type Item = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export default function DashboardPage() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [rewardOpen, setRewardOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'high-progress' | 'low-score'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    async function initializeDashboard() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setAuthChecking(false);
        router.replace('/login');
        return;
      }

      await fetchItems();
      setAuthChecking(false);
    }

    void initializeDashboard();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      if (!session) {
        router.replace('/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  async function fetchItems() {
    setLoading(true);
    const { data, error } = await supabase.from('inventory').select('*');
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setItems((data as Item[]) ?? []);
  }

  function resetForm() {
    setName('');
    setQuantity('');
    setPrice('');
    setEditingId(null);
    setError(null);
    setSuccessMessage(null);
  }

  async function handleSubmit() {
    if (loading) {
      return;
    }

    setError(null);
    setSuccessMessage(null);
    const parsedQuantity = Number(quantity);
    const parsedPrice = Number(price);

    if (!name.trim()) {
      setError('Mission name cannot be empty.');
      return;
    }

    if (quantity.trim() === '' || Number.isNaN(parsedQuantity) || parsedQuantity < 0) {
      setError('Progress must be a non-negative number.');
      return;
    }

    if (price.trim() === '' || Number.isNaN(parsedPrice) || parsedPrice < 0) {
      setError('Score must be a non-negative number.');
      return;
    }

    setLoading(true);

    if (editingId) {
      const { error } = await supabase
        .from('inventory')
        .update({ name: name.trim(), quantity: parsedQuantity, price: parsedPrice })
        .eq('id', editingId);

      setLoading(false);
      if (error) {
        setError(error.message);
        return;
      }

      setSuccessMessage('Item updated successfully.');
    } else {
      const { error } = await supabase.from('inventory').insert([{ name: name.trim(), quantity: parsedQuantity, price: parsedPrice }]);
      setLoading(false);

      if (error) {
        setError(error.message);
        return;
      }

      setSuccessMessage('Item added successfully.');
    }

    resetForm();
    await fetchItems();
  }

  function handleEdit(item: Item) {
    setEditingId(item.id);
    setName(item.name);
    setQuantity(String(item.quantity));
    setPrice(String(item.price));
    setError(null);
    setSuccessMessage(null);
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm('Delete this item?');
    if (!confirmed) {
      return;
    }

    setLoading(true);
    const { error } = await supabase.from('inventory').delete().eq('id', id);
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccessMessage('Item deleted successfully.');

    if (editingId === id) {
      resetForm();
    }

    await fetchItems();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/login');
  }

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return items.filter((item: Item) => {
      const matchesQuery =
        item.name.toLowerCase().includes(query) ||
        String(item.quantity).includes(query) ||
        String(item.price).includes(query);

      if (!matchesQuery) {
        return false;
      }

      if (filter === 'high-progress') {
        return item.quantity >= 70;
      }

      if (filter === 'low-score') {
        return item.price < 50;
      }

      return true;
    });
  }, [items, searchQuery, filter]);

  const pageCount = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));

  useEffect(() => {
    if (currentPage > pageCount) {
      setCurrentPage(pageCount);
    }
  }, [currentPage, pageCount]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filter, itemsPerPage]);

  const visibleItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  if (authChecking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-10 text-slate-100">
        <p className="text-slate-400">Checking session...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.14),_transparent_38%),linear-gradient(135deg,_#f8fafc,_#eef2ff)] px-6 py-10 text-slate-800">
      <div className="mx-auto max-w-6xl rounded-[38px] border border-slate-200/80 bg-white/80 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-600">Learning dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Your daily mission board</h1>
            <p className="mt-2 text-slate-600">A calm, focused space to manage your progress with clarity and purpose.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 text-sm font-bold text-white">
                A
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Alex</p>
                <p className="text-xs text-slate-500">Level 4 · Explorer</p>
              </div>
            </div>
            <button onClick={handleLogout} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700">
              Logout
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="animate-[fadeIn_0.25s_ease-out] rounded-[24px] border border-slate-200 bg-white/90 p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-md">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-emerald-600">Weekly progress</p>
                <p className="mt-1 text-sm text-slate-600">You are 68% through your learning target this week.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-sm font-semibold text-emerald-700 ring-4 ring-emerald-100">
                  68%
                </div>
                <div className="h-3 w-44 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-[fadeIn_0.25s_ease-out] rounded-[24px] border border-slate-200 bg-white/90 p-5 shadow-sm transition hover:border-violet-200 hover:shadow-md">
            <p className="text-sm font-semibold text-emerald-600">Achievements</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-emerald-50 px-3 py-2 text-sm text-emerald-700">🏆 First streak</span>
              <span className="rounded-full bg-violet-50 px-3 py-2 text-sm text-violet-700">⚡ Quick learner</span>
              <span className="rounded-full bg-cyan-50 px-3 py-2 text-sm text-cyan-700">🎯 Focus mode</span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-4">
          <div className="rounded-[22px] border border-emerald-200 bg-emerald-50 p-4 shadow-sm">
            <p className="text-sm text-emerald-700">XP</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">1,240</p>
          </div>
          <div className="rounded-[22px] border border-cyan-200 bg-cyan-50 p-4 shadow-sm">
            <p className="text-sm text-cyan-700">Streak</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">7 days</p>
          </div>
          <div className="rounded-[22px] border border-violet-200 bg-violet-50 p-4 shadow-sm">
            <p className="text-sm text-violet-700">Coins</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">320</p>
          </div>
          <div className="rounded-[22px] border border-amber-200 bg-amber-50 p-4 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-sm text-amber-700">Reward</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">1 ready</p>
              </div>
              <button
                onClick={() => setRewardOpen(true)}
                className="rounded-full border border-amber-200 bg-amber-100 px-3 py-2 text-xs font-semibold text-amber-700 transition hover:bg-amber-200"
              >
                Claim
              </button>
            </div>
          </div>
        </div>

        {rewardOpen ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-[30px] border border-amber-200 bg-white p-6 shadow-[0_25px_80px_rgba(2,6,23,0.25)]">
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
                <div className="absolute left-[10%] top-[15%] h-2 w-2 animate-bounce rounded-full bg-amber-300"></div>
                <div className="absolute right-[20%] top-[20%] h-2 w-2 animate-bounce rounded-full bg-emerald-300" style={{ animationDelay: '0.15s' }}></div>
                <div className="absolute left-[20%] top-[65%] h-2 w-2 animate-bounce rounded-full bg-cyan-300" style={{ animationDelay: '0.3s' }}></div>
                <div className="absolute right-[10%] top-[60%] h-2 w-2 animate-bounce rounded-full bg-violet-300" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">Reward unlocked</p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900">Daily bonus earned!</h3>
                </div>
                <button onClick={() => setRewardOpen(false)} className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100">
                  ✕
                </button>
              </div>
              <div className="mt-5 rounded-[22px] border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
                You received 50 coins and a bonus streak boost for your consistency today.
              </div>
              <button onClick={() => setRewardOpen(false)} className="mt-6 w-full rounded-full bg-amber-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-amber-600">
                Claim reward
              </button>
            </div>
          </div>
        ) : null}

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:border-emerald-200 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{editingId ? 'Edit mission' : 'Add a new mission'}</h2>
                <p className="mt-1 text-sm text-slate-600">Create a task and track your progress like a real quest.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">🌟 3 quests</div>
                <div className="rounded-2xl bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-700">🏅 2 badges</div>
                <div className="rounded-2xl bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700">⚡ Level up ready</div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <label className="block text-sm text-slate-700">
                Mission name
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white p-3 text-slate-800 outline-none focus:border-emerald-500"
                />
              </label>
              <label className="block text-sm text-slate-700">
                Progress
                <input
                  value={quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                  type="number"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white p-3 text-slate-800 outline-none focus:border-emerald-500"
                />
              </label>
              <label className="block text-sm text-slate-700">
                Score
                <input
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  type="number"
                  step="0.01"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white p-3 text-slate-800 outline-none focus:border-emerald-500"
                />
              </label>
              {error ? (
                <div className="animate-[fadeIn_0.2s_ease-out] rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  <div className="flex items-center gap-2">
                    <span className="text-base">⚠️</span>
                    <span>{error}</span>
                  </div>
                </div>
              ) : null}
              {successMessage ? (
                <div className="animate-[fadeIn_0.2s_ease-out] rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  <div className="flex items-center gap-2">
                    <span className="text-base">✅</span>
                    <span>{successMessage}</span>
                  </div>
                </div>
              ) : null}
              <div className="flex flex-wrap gap-3">
                <button
                onClick={handleSubmit}
                disabled={loading}
                className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                  {editingId ? 'Update mission' : 'Save mission'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-full border border-emerald-200 bg-emerald-50 px-6 py-3 text-sm font-semibold text-emerald-700 transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-100"
                >
                  Reset form
                </button>
                {editingId ? (
                  <button onClick={resetForm} className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-100">
                    Cancel
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          <div className="animate-[fadeIn_0.3s_ease-out] rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:border-cyan-200 hover:shadow-md">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Mission list</h2>
                <p className="mt-1 text-sm text-slate-600">Your active learning tasks and progress points.</p>
              </div>
              <div className="rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-700">{filteredItems.length} missions</div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-[1.5fr_1fr]">
              <label className="block text-sm text-slate-700">
                Search missions
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search by name, progress, score"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white p-3 text-slate-800 outline-none focus:border-emerald-500"
                />
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-sm text-slate-700">
                  Filter
                  <select
                    value={filter}
                    onChange={(event) => setFilter(event.target.value as 'all' | 'high-progress' | 'low-score')}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white p-3 text-slate-800 outline-none focus:border-emerald-500"
                  >
                    <option value="all">All missions</option>
                    <option value="high-progress">High progress (70+)</option>
                    <option value="low-score">Low score (below 50)</option>
                  </select>
                </label>
                <label className="block text-sm text-slate-700">
                  Per page
                  <select
                    value={itemsPerPage}
                    onChange={(event) => setItemsPerPage(Number(event.target.value))}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white p-3 text-slate-800 outline-none focus:border-emerald-500"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {loading ? (
                <p className="text-slate-600">Loading your missions...</p>
              ) : filteredItems.length === 0 ? (
                <p className="text-slate-600">No missions match the current search or filter.</p>
              ) : (
                <>
                  <div className="space-y-3">
                    {visibleItems.map((item) => (
                      <div key={item.id} className="rounded-[24px] border border-slate-200 bg-gradient-to-r from-white to-slate-50 p-4 shadow-sm transition hover:border-emerald-200 hover:shadow-md">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-slate-900">{item.name}</p>
                              <div className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                                Live
                              </div>
                              <div className="rounded-full bg-cyan-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-700">
                                New
                              </div>
                            </div>
                            <p className="mt-1 text-sm text-slate-600">Progress: {item.quantity} · Score: {item.price.toLocaleString()}</p>
                            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                              <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" style={{ width: `${Math.min(100, Number(item.quantity) || 0)}%` }}></div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => handleEdit(item)} className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-100">
                              Edit
                            </button>
                            <button onClick={() => void handleDelete(item.id)} className="rounded-full bg-rose-500 px-3 py-2 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-rose-600">
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-slate-600">
                      Showing {visibleItems.length} of {filteredItems.length} missions
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((current) => Math.max(1, current - 1))}
                        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <span className="text-sm text-slate-600">Page {currentPage} / {pageCount}</span>
                      <button
                        disabled={currentPage === pageCount}
                        onClick={() => setCurrentPage((current) => Math.min(pageCount, current + 1))}
                        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
