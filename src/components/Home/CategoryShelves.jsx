import { useState, useEffect, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockEvents } from '../../data/mockEvents';
import { useStreaming } from '../../context/StreamingContext';
import EventCard from './EventCard';

function useAdaptiveCount() {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      // xl: 1280px+ (PC) -> 1 row of 3 cards
      if (window.innerWidth >= 1280) {
        setCount(3);
      } 
      // md: 768px+ (Tablet) -> 2 rows of 2 cards (total 4)
      else if (window.innerWidth >= 768) {
        setCount(4);
      } 
      // Small screens -> 2 or 1 cards
      else {
        setCount(2);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return count;
}

function Shelf({ title, subtitle, events, initialCount }) {
  const [expanded, setExpanded] = useState(false);
  if (!events.length) return null;

  const visible = expanded ? events.slice(0, 12) : events.slice(0, initialCount);
  const hasMore = events.length > initialCount;

  return (
    <section className="mt-10 first:mt-0">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3 px-1">
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-white">{title}</h3>
          {subtitle && <p className="text-sm text-neutral-400 mt-1">{subtitle}</p>}
        </div>
      </div>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 transition-all duration-300">
        <AnimatePresence mode="popLayout">
          {visible.map((event) => (
            <motion.div
              key={`${title}-${event.id}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-8 py-3 text-sm font-bold text-indigo-400 hover:bg-indigo-500/20 hover:text-indigo-300 transition-all shadow-[0_0_20px_rgba(99,102,241,0.1)] active:scale-95"
          >
            {expanded ? 'Show less' : 'Show more'}
            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      )}
    </section>
  );
}

export default function CategoryShelves() {
  const adaptiveCount = useAdaptiveCount();
  const { hiddenIds } = useStreaming();

  const filteredEvents = useMemo(() => {
    return mockEvents.filter(event => !hiddenIds.some(hid => String(hid) === String(event.id)));
  }, [hiddenIds]);

  const livePicks = useMemo(() => {
    return [...filteredEvents]
      .filter((event) => event.isLive)
      .sort((a, b) => b.viewers - a.viewers);
  }, [filteredEvents]);

  const recommendedMix = useMemo(() => {
    return [...filteredEvents]
      .filter((event) => !event.isLive)
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 12);
  }, [filteredEvents]);

  const gaming = useMemo(() => filteredEvents.filter((event) => event.category === 'Gaming'), [filteredEvents]);
  const music = useMemo(() => filteredEvents.filter((event) => event.category === 'Music'), [filteredEvents]);
  const tech = useMemo(() => filteredEvents.filter((event) => event.category === 'Technology'), [filteredEvents]);

  return (
    <div className="pb-8">
      <Shelf
        title="Live channels we think you'll like"
        subtitle="Based on what's trending in your region"
        events={livePicks}
        initialCount={adaptiveCount}
      />
      <Shelf
        title="Recommended for you"
        subtitle="Upcoming streams and highlights picked for your interests"
        events={recommendedMix}
        initialCount={adaptiveCount}
      />
      <Shelf title="Gaming" subtitle="Esports, speedruns, and new releases" events={gaming} initialCount={adaptiveCount} />
      <Shelf title="Music" subtitle="Concerts, DJ sets, and sessions" events={music} initialCount={adaptiveCount} />
      <Shelf title="Technology" subtitle="Keynotes, dev builds, and product launches" events={tech} initialCount={adaptiveCount} />
    </div>
  );
}
