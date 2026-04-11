import { useMemo, useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { mockEvents } from '../data/mockEvents';
import EventCard from '../components/Home/EventCard';
import SkeletonCard from '../components/Common/SkeletonCard';
import { Search as SearchIcon, Filter, TrendingUp, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/Core/SEO';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [isLoading, setIsLoading] = useState(true);
  const searchNormalized = query.toLowerCase().trim();

  // Simulated loading to showcase the "Stand Out" Skeleton screens
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [query]);

  const results = useMemo(() => {
    if (!searchNormalized) return [];
    
    return mockEvents.filter(event => {
      const title = event.title?.toLowerCase() || '';
      const creator = event.creator?.toLowerCase() || '';
      const category = event.category?.toLowerCase() || '';
      
      return title.includes(searchNormalized) || 
             creator.includes(searchNormalized) || 
             category.includes(searchNormalized);
    }).sort((a, b) => (b.isLive ? 1 : 0) - (a.isLive ? 1 : 0));
  }, [searchNormalized]);

  const suggestions = useMemo(() => {
    return [...mockEvents]
      .filter(e => e.isLive)
      .sort((a, b) => (b.viewers || 0) - (a.viewers || 0))
      .slice(0, 8);
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
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5"
      >
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
           <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-bold text-neutral-400 hover:text-white hover:bg-white/10 transition-all">
              <Filter className="w-4 h-4" /> Filters
           </button>
        </div>
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
