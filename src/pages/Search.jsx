import { useMemo, useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { mockEvents, CATEGORIES } from '../data/mockEvents';
import EventCard from '../components/Home/EventCard';
import SkeletonCard from '../components/Common/SkeletonCard';
import { Search as SearchIcon, Filter, TrendingUp, AlertCircle, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/Core/SEO';
import { useTheme } from '../context/ThemeContext';

export default function Search() {
  const { theme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // Advanced Filter States
  const [isLiveOnly, setIsLiveOnly] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('relevance'); // relevance, viewers, newest

  const searchNormalized = query.toLowerCase().trim();

  // Simulated loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [query, isLiveOnly, activeCategory, sortBy]);

  const results = useMemo(() => {
    let baseResults = [...mockEvents];
    
    // 1. Search Filtering
    if (searchNormalized) {
      baseResults = baseResults.filter(event => {
        const title = event.title?.toLowerCase() || '';
        const creator = event.creator?.toLowerCase() || '';
        const category = event.category?.toLowerCase() || '';
        return title.includes(searchNormalized) || creator.includes(searchNormalized) || category.includes(searchNormalized);
      });
    }

    // 2. Advanced Filtering
    if (isLiveOnly) {
      baseResults = baseResults.filter(e => e.isLive);
    }
    if (activeCategory !== 'All') {
      baseResults = baseResults.filter(e => e.category === activeCategory);
    }

    // 3. Sorting
    return baseResults.sort((a, b) => {
      if (sortBy === 'viewers') return (b.viewers || 0) - (a.viewers || 0);
      if (sortBy === 'newest') {
         // Fake date comparison since we use relative strings
         return b.isLive ? 1 : -1;
      }
      // Relevance (Default: Live first, then by title match quality)
      const liveDiff = (b.isLive ? 1 : 0) - (a.isLive ? 1 : 0);
      if (liveDiff !== 0) return liveDiff;
      return (b.viewers || 0) - (a.viewers || 0);
    });
  }, [searchNormalized, isLiveOnly, activeCategory, sortBy]);

  const suggestions = useMemo(() => {
    return [...mockEvents].filter(e => e.isLive).sort((a, b) => (b.viewers || 0) - (a.viewers || 0)).slice(0, 8);
  }, []);

  return (
    <div className="app-container py-8 md:py-12 space-y-12 min-h-screen">
      <SEO 
        title={query ? `Results for "${query}"` : 'Search Streams'} 
        description={`Find the best live streams and creators for "${query}" on StreamSphere. High-end discovery for gaming, tech, and more.`}
      />
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-6 pb-6 border-b border-white/5"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 w-fit">
               <SearchIcon className="w-3.5 h-3.5 text-indigo-400" />
               <span className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em]">Discovery Engine</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Results for <span className="text-indigo-400">"{query || 'Everything'}"</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
             <button 
               onClick={() => setShowFilters(!showFilters)}
               className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all font-bold text-sm ${
                 showFilters 
                   ? 'bg-indigo-500 text-white border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.4)]' 
                   : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:bg-white/10'
               }`}
             >
                <Filter className="w-4 h-4" /> {showFilters ? 'Hide Filters' : 'Show Filters'}
             </button>
             
             <div className={`p-1 rounded-xl border border-white/10 flex items-center gap-1 ${theme === 'light' ? 'bg-slate-50' : 'bg-black/20'}`}>
                {['relevance', 'viewers', 'newest'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSortBy(s)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                      sortBy === s 
                        ? 'bg-indigo-500 text-white' 
                        : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    {s === 'viewers' ? 'Trending' : s}
                  </button>
                ))}
             </div>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setIsLiveOnly(!isLiveOnly)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-xs font-bold ${
                    isLiveOnly 
                      ? 'bg-rose-500/10 border-rose-500 text-rose-500' 
                      : 'bg-white/5 border-white/10 text-neutral-500'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${isLiveOnly ? 'bg-rose-500 animate-pulse' : 'bg-neutral-600'}`} />
                  Live Only
                </button>
                
                <div className="w-[1px] h-6 bg-white/10 mx-2 hidden sm:block" />
                
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border ${
                        activeCategory === cat 
                          ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400' 
                          : 'bg-transparent border-white/5 text-neutral-600 hover:border-white/20 hover:text-neutral-400'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Results / Empty State */}
      <div className="space-y-16">
        {isLoading ? (
          <section className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {[...Array(8)].map((_, i) => (
                <SkeletonCard key={`skeleton-${i}`} />
              ))}
            </div>
          </section>
        ) : results.length > 0 ? (
          <section className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {results.map((event, i) => (
                <motion.div
                  key={`res-${event.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </div>
          </section>
        ) : (
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12"
          >
            {/* Empty State Banner */}
            <div className="py-20 flex flex-col items-center text-center glass-panel rounded-[40px] border border-white/5 bg-white/[0.02] relative overflow-hidden">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-rose-500/10 blur-[100px] pointer-events-none" />
               <div className="p-5 rounded-3xl bg-rose-500/10 border border-rose-500/20 mb-6">
                  <AlertCircle className="w-10 h-10 text-rose-500" />
               </div>
               <h2 className="text-3xl font-black text-white tracking-tight">Nothing matched your search</h2>
               <p className="mt-3 text-neutral-400 max-w-md font-medium leading-relaxed">
                  We couldn't find any direct matches for <span className="text-white">"{query}"</span>. Try checking your spelling or exploring one of the trending categories.
               </p>
               <Link to="/browse" className="mt-8 px-8 py-3 rounded-full bg-white text-black font-black text-sm hover:scale-105 transition-transform shadow-2xl">
                  Explore Categories
               </Link>
            </div>

            {/* Recommendations fallback - YouTube Style */}
            <div className="space-y-8">
               <div className="flex items-center gap-4">
                  <TrendingUp className="w-6 h-6 text-indigo-400" />
                  <h2 className="text-2xl font-black text-white tracking-tight">Suggested for you</h2>
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                  {suggestions.map((event, i) => (
                    <motion.div
                      key={`suggest-${event.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <EventCard event={event} />
                    </motion.div>
                  ))}
               </div>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
