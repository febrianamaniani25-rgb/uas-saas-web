'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Item = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export default function DashboardPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    setLoading(true);
    const { data, error } = await supabase.from('inventory').select('*');
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setItems(data ?? []);
  }

  async function handleCreate() {
    setError(null);
    const parsedQuantity = Number(quantity);
    const parsedPrice = Number(price);

    if (!name || Number.isNaN(parsedQuantity) || Number.isNaN(parsedPrice)) {
      setError('Please enter valid name, quantity, and price.');
      return;
    }

    const { error } = await supabase.from('inventory').insert([{ name, quantity: parsedQuantity, price: parsedPrice }]);
    if (error) {
      setError(error.message);
      return;
    }

    setName('');
    setQuantity('');
    setPrice('');
    fetchItems();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/95 p-10 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Inventory Dashboard</h1>
            <p className="mt-2 text-slate-400">Manage your products using Supabase CRUD.</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6">
            <h2 className="text-xl font-semibold">Add New Item</h2>
            <div className="mt-6 space-y-4">
              <label className="block text-sm text-slate-300">
                Name
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/80 p-3 text-slate-100 outline-none focus:border-emerald-500"
                />
              </label>
              <label className="block text-sm text-slate-300">
                Quantity
                <input
                  value={quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                  type="number"
                  className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/80 p-3 text-slate-100 outline-none focus:border-emerald-500"
                />
              </label>
              <label className="block text-sm text-slate-300">
                Price
                <input
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  type="number"
                  step="0.01"
                  className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/80 p-3 text-slate-100 outline-none focus:border-emerald-500"
                />
              </label>
              {error ? <p className="text-sm text-rose-400">{error}</p> : null}
              <button onClick={handleCreate} className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">
                Save item
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6">
            <h2 className="text-xl font-semibold">Inventory list</h2>
            <div className="mt-6 space-y-3">
              {loading ? (
                <p className="text-slate-400">Loading...</p>
              ) : items.length === 0 ? (
                <p className="text-slate-400">No items yet.</p>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="rounded-3xl border border-slate-800 bg-slate-900/95 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-semibold text-white">{item.name}</p>
                          <p className="text-sm text-slate-400">Qty: {item.quantity} · Rp {item.price.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
