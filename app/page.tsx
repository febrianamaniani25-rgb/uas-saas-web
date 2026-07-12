import Link from 'next/link';

const features = [
  '🔥 Daily streak challenges',
  '🎯 Quick skill quests',
  '🏅 Progress-based rewards',
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.25),_transparent_45%),linear-gradient(135deg,_#020617,_#0f172a)] px-6 py-10 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <section className="overflow-hidden rounded-[32px] border border-emerald-500/20 bg-slate-900/85 p-8 shadow-2xl shadow-emerald-950/40 backdrop-blur">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-400">Learn. Grow. Repeat.</p>
              <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
                Turn every study session into a fun quest.
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-slate-300">
                This experience brings a lively, game-like feel to your dashboard, combining short missions, streak motivation, and bright rewards into one playful flow.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/login" className="rounded-full bg-emerald-500 px-6 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">
                  Start learning
                </Link>
                <Link href="/register" className="rounded-full border border-slate-700 px-6 py-3 text-center text-sm font-semibold text-slate-100 transition hover:border-emerald-400 hover:text-emerald-300">
                  Create account
                </Link>
              </div>
            </div>
            <div className="rounded-[28px] border border-emerald-500/20 bg-slate-950/80 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Today’s streak</p>
                  <p className="mt-2 text-4xl font-semibold text-white">7 days</p>
                </div>
                <div className="rounded-2xl bg-emerald-500/15 px-4 py-3 text-2xl text-emerald-300">⚡</div>
              </div>
              <div className="mt-6 space-y-3">
                {features.map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-sm text-slate-300">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {[
            ['Quick missions', 'Short daily tasks with clear goals and bright rewards.'],
            ['Smart progress', 'Track your growth with a polished dashboard that feels alive.'],
            ['Crafted experience', 'A friendly interface inspired by modern edtech and playful design.'],
          ].map(([title, desc], index) => (
            <div key={title} className="rounded-[24px] border border-slate-800 bg-slate-900/75 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-emerald-400/40">
              <div className="text-2xl text-emerald-400">{['🧩', '📈', '✨'][index]}</div>
              <h2 className="mt-3 text-lg font-semibold text-white">{title}</h2>
              <p className="mt-2 text-sm text-slate-400">{desc}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
