import { Eye } from 'lucide-react';
import { mockEvents } from '../../data/mockEvents';

export default function LiveChannelsRail() {
  const liveEvents = mockEvents.filter((event) => event.isLive);

  if (liveEvents.length === 0) return null;

  return (
    <aside className="hidden xl:block sticky top-24 self-start">
      <div className="w-[240px] rounded-2xl border border-white/10 glass-panel p-3 shadow-xl">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.14em] text-neutral-400">Live Channels</p>
          <span className="text-[11px] text-rose-300 font-semibold">{liveEvents.length} ON</span>
        </div>

        <div className="space-y-1.5">
          {liveEvents.map((event) => (
            <div key={event.id} className="rounded-lg px-2 py-2 hover:bg-white/5 transition-colors">
              <p className="text-sm font-medium text-white truncate">{event.creator}</p>
              <p className="text-xs text-neutral-400 truncate">{event.title}</p>
              <div className="mt-1 flex items-center gap-1.5 text-[11px] text-rose-300">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse" />
                <Eye className="h-3 w-3" />
                {event.viewers.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
