import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { mockEvents } from '../../data/mockEvents';

export default function SuggestedEvents({ currentEventId }) {
  const suggested = mockEvents
    .filter((event) => event.id !== currentEventId)
    .slice(0, 6);

  return (
    <section className="mt-7">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg md:text-xl font-semibold text-white">Suggested for You</h3>
        <p className="text-xs text-neutral-400 uppercase tracking-[0.14em]">Up Next</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {suggested.map((event) => (
          <Link
            key={event.id}
            to={`/event/${event.id}`}
            className="group rounded-xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-indigo-400/40 transition-colors"
          >
            <div className="relative aspect-video">
              <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" decoding="async" />
              {event.isLive && (
                <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded bg-rose-500/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  Live
                </span>
              )}
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-white line-clamp-2">{event.title}</p>
              <p className="mt-1 text-xs text-neutral-400">{event.creator}</p>
              <p className="mt-2 inline-flex items-center gap-1 text-xs text-rose-300">
                <Eye className="h-3.5 w-3.5" />
                {event.isLive ? `${event.viewers.toLocaleString()} watching` : event.schedule}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
