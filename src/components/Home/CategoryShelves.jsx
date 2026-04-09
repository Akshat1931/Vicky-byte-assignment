import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { mockEvents } from '../../data/mockEvents';

const INITIAL_ROW = 4;

function StreamCard({ event }) {
  return (
    <Link
      to={`/event/${event.id}`}
      className="group overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] hover:border-indigo-400/35 transition-colors"
    >
      <div className="relative aspect-video">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        {event.isLive && (
          <>
            <span className="absolute left-2 top-2 rounded bg-rose-500/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
              LIVE
            </span>
            <span className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-0.5 text-[11px] font-medium text-white">
              {event.viewers.toLocaleString()} viewers
            </span>
          </>
        )}
      </div>
      <div className="p-3">
        <p className="line-clamp-2 text-sm font-medium text-white">{event.title}</p>
        <p className="mt-1 text-xs text-neutral-400">
          {event.creator}
          <span className="text-neutral-500"> · {event.category}</span>
        </p>
      </div>
    </Link>
  );
}

function Shelf({ title, subtitle, events, initialCount = INITIAL_ROW }) {
  const [expanded, setExpanded] = useState(false);
  if (!events.length) return null;

  const visible = expanded ? events : events.slice(0, initialCount);
  const hasMore = events.length > initialCount;

  return (
    <section className="mt-10 first:mt-0">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-white">{title}</h3>
          {subtitle && <p className="text-sm text-neutral-400 mt-1">{subtitle}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {visible.map((event) => (
          <StreamCard key={`${title}-${event.id}`} event={event} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-5 py-2 text-sm font-medium text-indigo-200 hover:bg-indigo-500/20 transition-colors"
          >
            {expanded ? 'Show less' : 'Show more'}
            <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      )}
    </section>
  );
}

export default function CategoryShelves() {
  const livePicks = [...mockEvents]
    .filter((event) => event.isLive)
    .sort((a, b) => b.viewers - a.viewers);

  const recommendedMix = [...mockEvents]
    .filter((event) => !event.isLive)
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 12);

  const gaming = mockEvents.filter((event) => event.category === 'Gaming');
  const music = mockEvents.filter((event) => event.category === 'Music');
  const tech = mockEvents.filter((event) => event.category === 'Technology');

  return (
    <div className="pb-8">
      <Shelf
        title="Live channels we think you'll like"
        subtitle="Based on what's trending in your region"
        events={livePicks}
      />
      <Shelf
        title="Recommended for you"
        subtitle="Upcoming streams and highlights picked for your interests"
        events={recommendedMix}
      />
      <Shelf title="Gaming" subtitle="Esports, speedruns, and new releases" events={gaming} />
      <Shelf title="Music" subtitle="Concerts, DJ sets, and sessions" events={music} />
      <Shelf title="Technology" subtitle="Keynotes, dev builds, and product launches" events={tech} />
    </div>
  );
}
