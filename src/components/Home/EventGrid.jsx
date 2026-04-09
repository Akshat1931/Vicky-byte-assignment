import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { mockEvents, CATEGORIES } from '../../data/mockEvents';
import EventCard from './EventCard';
import { Search, ListFilter } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

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

export default function EventGrid({ useContainer = true }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sessionEvents] = useState(() => buildSessionEvents());

  // Simulate network request for premium feel
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredEvents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return sessionEvents.filter((event) => {
      const matchesCategory = activeCategory === 'All' || event.category === activeCategory;
      const matchesSearch =
        query.length === 0 ||
        event.title.toLowerCase().includes(query) ||
        event.creator.toLowerCase().includes(query) ||
        event.category.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        (event.previewMessage && event.previewMessage.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [sessionEvents, activeCategory, searchQuery]);

  return (
    <section
      id="events"
      className={`${useContainer ? 'app-container' : ''} section-space relative`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-indigo-500/8 to-transparent blur-2xl" />
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-300">Explore</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-white">Live & Upcoming Events</h2>
        </div>
        <p className="text-sm text-neutral-400 hidden sm:block">{filteredEvents.length} results</p>
      </div>
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-10">
        <div className="w-full md:w-[400px] relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search
              className={`h-5 w-5 transition-colors group-focus-within:text-indigo-500 ${
                isLight ? 'text-slate-400' : 'text-neutral-500'
              }`}
            />
          </div>
          <input
            type="text"
            placeholder="Search events..."
            className={`w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 font-light shadow-lg ${
              isLight
                ? 'bg-white text-slate-800 placeholder:text-slate-400 border border-slate-200'
                : 'bg-[#0a0a0f] border border-white/10 text-white glass-panel'
            }`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 scrollbar-hide py-1">
          <div className="flex items-center gap-2 mr-3 text-neutral-400">
            <ListFilter className="w-4 h-4" /> 
            <span className="text-sm font-medium uppercase tracking-widest opacity-80 border-r border-white/10 pr-4">Filters</span>
          </div>
          {CATEGORIES.map(category => (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                  : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/10'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
           {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
      
      {!isLoading && filteredEvents.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-32 glass-panel rounded-2xl border border-white/5 mt-8"
        >
          <p className="text-neutral-400 text-lg font-light">No events found matching your criteria.</p>
        </motion.div>
      )}
    </section>
  );
}
