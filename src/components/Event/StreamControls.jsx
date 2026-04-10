import { useMemo, useState } from 'react';
import { Signal, Gauge, Radio, Sparkles } from 'lucide-react';

const QUALITY_OPTIONS = ['Auto', '1080p', '720p', '480p'];
const LATENCY_OPTIONS = ['Balanced', 'Low Latency', 'Ultra Low'];

export default function StreamControls({ event }) {
  const trend = useMemo(() => {
    const delta = Math.max(0.4, Math.min(4.2, (event.viewers % 37) / 10));
    return `+${delta.toFixed(1)}%`;
  }, [event.viewers]);

  return (
    <section className="mt-4 rounded-2xl border border-white/10 glass-panel p-4 md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-indigo-300">Live Status</p>
          <h2 className="mt-1 text-sm md:text-base font-semibold text-white">Transmission Data</h2>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-neutral-300">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1">
            <Signal className="h-3.5 w-3.5 text-emerald-300" />
            Stable
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-2.5 py-1">
            <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
            Trend {trend}
          </span>
        </div>
      </div>
    </section>
  );
}
