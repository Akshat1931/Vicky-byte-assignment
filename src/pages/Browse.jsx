import { useMemo, useState, useEffect } from 'react';
import { CATEGORIES, mockEvents } from '../data/mockEvents';
import EventCard from '../components/Home/EventCard';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/Core/SEO';
import { useSearchParams } from 'react-router-dom';
import { 
  Compass, 
  Gamepad2, 
  Music as MusicIcon, 
  Cpu, 
  Trophy, 
  Film, 
  LayoutGrid,
  TrendingUp,
  Users
} from 'lucide-react';

const CATEGORY_META = {
  'All': { icon: LayoutGrid, color: 'from-neutral-500 to-neutral-700', label: 'Everything' },
  'Gaming': { icon: Gamepad2, color: 'from-indigo-500 to-violet-700', label: 'Gaming' },
  'Music': { icon: MusicIcon, color: 'from-rose-500 to-pink-700', label: 'Music' },
  'Technology': { icon: Cpu, color: 'from-cyan-500 to-blue-700', label: 'Tech' },
  'Sports': { icon: Trophy, color: 'from-orange-500 to-amber-700', label: 'Sports' },
  'Entertainment': { icon: Film, color: 'from-emerald-500 to-teal-700', label: 'Entertainment' },
};

// Fallback for icons since Entertainment was Filter in the map but should be Film
function getIcon(name) {
  if (name === 'Entertainment') return Film;
  return CATEGORY_META[name]?.icon || Compass;
}

function CategoryTile({ name, count, isSelected, onClick }) {
  const Icon = getIcon(name);
  const meta = CATEGORY_META[name] || CATEGORY_META['All'];
  
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative h-32 md:h-44 rounded-3xl overflow-hidden p-6 text-left transition-all duration-500 group ${
        isSelected ? 'ring-4 ring-indigo-500/50' : 'hover:ring-2 hover:ring-white/10'
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${meta.color} opacity-40 group-hover:opacity-70 transition-opacity`} />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      
      <div className="relative h-full flex flex-col justify-between z-10">
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-6`}>
           <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>
        
        <div>
           <h4 className="text-lg md:text-xl font-black text-white tracking-tight">{name}</h4>
           <div className="flex items-center gap-1.5 mt-1">
              <Users className="w-3 h-3 text-neutral-400" />
              <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">{count} Live</span>
           </div>
        </div>
      </div>
    </motion.button>
  );
}

export default function Browse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || 'All');

  // Sync state when URL changes
  useEffect(() => {
    if (urlCategory && CATEGORIES.includes(urlCategory)) {
      setSelectedCategory(urlCategory);
    } else if (!urlCategory) {
      setSelectedCategory('All');
    }
  }, [urlCategory]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('category');
      setSearchParams(newParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const liveCounts = useMemo(() => {
    const counts = {};
    CATEGORIES.forEach(cat => {
      counts[cat] = mockEvents.filter(e => (cat === 'All' || e.category === cat) && e.isLive).length;
    });
    return counts;
  }, []);

  const filteredEvents = useMemo(() => {
    let result = (selectedCategory === 'All') 
      ? mockEvents 
      : mockEvents.filter((event) => event.category === selectedCategory);
    
    // Prioritize Live
    return [...result].sort((a, b) => (b.isLive ? 1 : 0) - (a.isLive ? 1 : 0));
  }, [selectedCategory]);

  return (
    <div className="app-container py-8 md:py-12 space-y-12 relative overflow-hidden">
      <SEO 
        title={`${selectedCategory === 'All' ? 'Browse High-Fidelity Streams' : `Live ${selectedCategory} Streams`}`} 
        description={`Explore the best live ${selectedCategory.toLowerCase()} content on StreamSphere. High-end visuals, interactive chat, and trending creators.`}
      />
      {/* Dynamic Background Glow based on category */}
      <AnimatePresence mode="wait">
         <motion.div 
            key={selectedCategory}
            initial={{ opacity: 0 }} animate={{ opacity: 0.1 }} exit={{ opacity: 0 }}
            className={`absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-indigo-500 blur-[150px] pointer-events-none rounded-full`} 
         />
      </AnimatePresence>

      {/* Hero Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 w-fit">
             <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
             <span className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em]">Live Discovery</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
          Browse Categories
        </h1>
        <p className="max-w-xl text-neutral-400 font-medium leading-relaxed text-sm md:text-base">
          Dive into specific genres and find your next favorite creator across the entire StreamSphere network.
        </p>
      </motion.div>

      {/* Interactive Category Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6">
        {CATEGORIES.map((cat) => (
          <CategoryTile 
            key={cat} 
            name={cat} 
            count={liveCounts[cat]} 
            isSelected={selectedCategory === cat}
            onClick={() => handleCategorySelect(cat)}
          />
        ))}
      </section>

      {/* Discovery Feed */}
      <section className="space-y-8 pt-8 border-t border-white/5">
        <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-3">
               <div className="w-1 h-6 bg-indigo-500 rounded-full" />
               {selectedCategory === 'All' ? 'Everything Happening Now' : `Trending in ${selectedCategory}`}
            </h2>
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-[0.3em]">{filteredEvents.length} results</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredEvents.map((event, i) => (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              key={`${selectedCategory}-${event.id}`}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* End of content call-to-action */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-20 text-center p-12 rounded-[40px] border border-white/5 bg-white/[0.02] backdrop-blur-3xl"
      >
           <h3 className="text-2xl font-black text-white">Can't find what you're looking for?</h3>
           <p className="mt-2 text-neutral-500 font-medium text-sm">Be the first to create content in this space.</p>
           <button className="mt-8 px-10 py-4 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white font-black text-sm transition-all shadow-2xl shadow-indigo-500/30 active:scale-95">
              Start Streaming
           </button>
      </motion.div>
    </div>
  );
}
