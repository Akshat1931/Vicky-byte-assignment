import { useMemo, useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import { mockEvents, CATEGORIES } from '../../data/mockEvents';
import EventCard from './EventCard';
import { Search, ListFilter, ChevronDown, Check, Info } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useStreaming } from '../../context/StreamingContext';

const SkeletonCard = () => (
  <div className="bg-[#0a0a0f] rounded-2xl overflow-hidden border border-white/5 h-full min-h-[320px]">
    <div className="aspect-video bg-white/5 animate-pulse" />
    <div className="p-5 flex flex-col gap-4">
      <div className="h-6 bg-white/5 rounded w-3/4 animate-pulse" />
      <div className="h-4 bg-white/5 rounded w-1/2 animate-pulse mt-2" />
      <div className="mt-8 flex justify-between border-t border-white/5 pt-4">
        <div className="h-4 bg-white/5 rounded w-1/3 animate-pulse" />
        <div className="h-4 w-4 bg-white/5 rounded animate-pulse" />
      </div>
    </div>
  </div>
);

const SORT_OPTIONS = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'viewers-high', label: 'Most Viewers' },
  { id: 'viewers-low', label: 'Fewest Viewers' },
  { id: 'likes', label: 'Most Liked' },
];

const INITIAL_ROW = 4;

function buildSessionEvents() {
  return mockEvents.map((event) => {
    if (!event.isLive) return event;
    const variance = 0.85 + Math.random() * 0.3;
    return {
      ...event,
      viewers: Math.max(120, Math.floor(event.viewers * variance)),
    };
  });
}

function NoResults({ query, recommendedEvents }) {
  return (
    <div className="space-y-12 py-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center p-12 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-3xl"
      >
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
          <Search className="w-8 h-8 text-neutral-500" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">No results for "{query}"</h3>
        <p className="text-neutral-500 max-w-sm">Try searching for something else, or check out these popular streams instead.</p>
      </motion.div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-bold text-white flex items-center gap-2">
            <Info className="w-5 h-5 text-indigo-400" />
            Try these instead
          </h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recommendedEvents.slice(0, 4).map(event => (
            <EventCard key={`rec-${event.id}`} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}

const EventGrid = memo(function EventGrid({ useContainer = true }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('recommended');
  const [sortOpen, setSortOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionEvents] = useState(() => buildSessionEvents());
  const sortRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false);
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const { hiddenIds } = useStreaming();

  const filteredEvents = useMemo(() => {
    return sessionEvents.filter((event) => {
      // Bulletproof ID matching - handles string/number mismatches
      const isHidden = hiddenIds.some(hid => String(hid) === String(event.id));
      if (isHidden) return false;

      const matchesCategory = activeCategory === 'All' || event.category === activeCategory;
      const matchesSearch = !query || 
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.creator.toLowerCase().includes(query.toLowerCase()) ||
        event.category.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // Apply Sorting
    switch (sortBy) {
      case 'viewers-high':
        result.sort((a, b) => b.viewers - a.viewers);
        break;
      case 'viewers-low':
        result.sort((a, b) => a.viewers - b.viewers);
        break;
      case 'likes':
        result.sort((a, b) => b.likes - a.likes);
        break;
      default:
        result.sort((a, b) => {
          if (a.isLive && !b.isLive) return -1;
          if (!a.isLive && b.isLive) return 1;
          return 0;
        });
        break;
    }

    return result;
  }, [sessionEvents, activeCategory, sortBy, query, hiddenIds]);

  const topRecommended = useMemo(() => {
    return [...sessionEvents]
      .sort((a, b) => b.viewers - a.viewers)
      .slice(0, 8);
  }, [sessionEvents]);

  const activeSortLabel = SORT_OPTIONS.find(o => o.id === sortBy)?.label;

  return (
    <section
      id="events"
      className={`${useContainer ? 'app-container section-space' : ''} relative`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-indigo-500/8 to-transparent blur-2xl" />
      
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-300">Explore</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
            {query ? `Search results for "${query}"` : 'Live & Upcoming Events'}
          </h2>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative" ref={sortRef}>
            <button 
              onClick={() => setSortOpen(!sortOpen)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border transition-all duration-300 group ${
                isLight 
                  ? 'bg-white border-slate-200 text-slate-700 hover:border-slate-300' 
                  : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <ListFilter className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-semibold">Sort: {activeSortLabel}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${sortOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {sortOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className={`absolute right-0 md:left-0 top-full mt-2 w-56 rounded-2xl border p-2 shadow-2xl z-[100] ${
                      isLight ? 'bg-white border-slate-200' : 'bg-[#0d0f14]/95 border-white/15 backdrop-blur-3xl'
                  }`}
                >
                  {SORT_OPTIONS.map(opt => (
                    <button 
                      key={opt.id}
                      onClick={() => { setSortBy(opt.id); setSortOpen(false); }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all ${
                          sortBy === opt.id 
                          ? 'bg-indigo-500 text-white font-bold' 
                          : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {opt.label}
                      {sortBy === opt.id && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <p className="text-sm text-neutral-500 font-medium hidden lg:block">{filteredEvents.length} results</p>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto w-full pb-8 scrollbar-hide py-1">
        {CATEGORIES.map(category => (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
              activeCategory === category 
                ? 'bg-white text-black border-white shadow-[0_10px_20px_rgba(255,255,255,0.1)]' 
                : 'bg-white/5 text-neutral-400 border-white/5 hover:border-white/20 hover:text-white'
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
           {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map(event => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <NoResults query={query} recommendedEvents={topRecommended} />
      )}
    </section>
  );
});

export default EventGrid;
