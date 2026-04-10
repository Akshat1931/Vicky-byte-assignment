import { useMemo, useState } from 'react';
import { mockEvents } from '../data/mockEvents';
import EventCard from '../components/Home/EventCard';
import { Heart, Play, Calendar, Activity, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const FOLLOWED_CREATORS = [
  { name: 'ESL Network', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop', isLive: true, category: 'Gaming' },
  { name: 'DJ Synth', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974&auto=format&fit=crop', isLive: true, category: 'Music' },
  { name: 'HoopsCentral', image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2069&auto=format&fit=crop', isLive: true, category: 'Sports' },
  { name: 'PixelStudios', image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop', isLive: true, category: 'Gaming' },
  { name: 'SpeedHunters', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop', isLive: false, category: 'Racing' },
  { name: 'CodeAcademy', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop', isLive: false, category: 'Technology' },
];

function CreatorCapsule({ creator, index }) {
  const [imgError, setImgError] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="flex flex-col items-center gap-3 shrink-0 group cursor-pointer"
    >
      <div className={`relative p-1 rounded-full transition-all duration-500 ${
        creator.isLive 
        ? 'ring-[3px] ring-indigo-500 ring-offset-4 ring-offset-[#030305] group-hover:ring-rose-500' 
        : 'opacity-50 grayscale hover:grayscale-0 hover:opacity-100'
      }`}>
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl relative bg-white/5">
          {!imgError ? (
            <img 
              src={creator.image} 
              alt={creator.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125" 
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center`}>
              <span className="text-xl font-black text-white/40">{creator.name[0]}</span>
            </div>
          )}
          {creator.isLive && (
             <div className="absolute inset-0 bg-indigo-500/10 group-hover:bg-rose-500/10 transition-colors" />
          )}
        </div>
        
        {creator.isLive && (
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-rose-500 text-[9px] font-black px-2 py-0.5 rounded-full text-white shadow-lg border border-white/20 z-10"
          >
            LIVE
          </motion.div>
        )}
      </div>
      <div className="text-center">
        <p className={`text-xs md:text-sm font-bold transition-colors ${creator.isLive ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-300'}`}>
          {creator.name}
        </p>
      </div>
    </motion.div>
  );
}

const FOLLOWED_NAMES = FOLLOWED_CREATORS.map(c => c.name);
const SORTED_CREATORS_STATIC = [...FOLLOWED_CREATORS].sort((a, b) => (b.isLive ? 1 : 0) - (a.isLive ? 1 : 0));

export default function Following() {
  const followedEvents = useMemo(() => {
    return mockEvents.filter(e => FOLLOWED_NAMES.includes(e.creator));
  }, []);

  const sortedCreators = SORTED_CREATORS_STATIC;
  
  const { liveNow, upcoming } = useMemo(() => ({
    liveNow: followedEvents.filter(e => e.isLive),
    upcoming: followedEvents.filter(e => !e.isLive)
  }), [followedEvents]);

  return (
    <div className="app-container py-8 md:py-12 space-y-12 md:space-y-16 relative">
      {/* Background Signature Glow */}
      <div className="absolute top-0 right-0 -z-10 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-indigo-500/5 blur-[150px] pointer-events-none rounded-full" />

      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-6 border-b border-white/5"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 w-fit">
             <Activity className="w-3.5 h-3.5 text-indigo-400" />
             <span className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em]">Activity Hub</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter flex items-center gap-4">
            Following
            <Heart className="w-8 h-8 md:w-10 md:h-10 text-rose-500 fill-rose-500" />
          </h1>
          <p className="max-w-xl text-neutral-400 font-medium leading-relaxed text-sm md:text-base">
            Your private sanctuary for everything you follow. Real-time updates from creators you trust.
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="glass-panel px-6 py-4 rounded-3xl flex flex-col items-center justify-center min-w-[120px] bg-white/[0.03] border-white/10 border">
             <span className="text-2xl font-black text-white">6</span>
             <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mt-1">Following</span>
          </div>
          <div className="glass-panel px-6 py-4 rounded-3xl flex flex-col items-center justify-center min-w-[120px] bg-indigo-500/5 border-indigo-500/10 border">
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
               <span className="text-2xl font-black text-white">4</span>
             </div>
             <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mt-1">Live Now</span>
          </div>
        </div>
      </motion.div>

      {/* Daily Pulse Bar */}
      <section className="space-y-6 md:space-y-8">
        <div className="flex items-center gap-4">
           <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500 animate-pulse" />
           <h3 className="text-sm font-black uppercase tracking-[0.3em] text-neutral-500">Daily Pulse</h3>
           <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        <div className="flex items-center gap-6 md:gap-10 overflow-x-auto pb-6 pt-2 scrollbar-hide -mx-2 px-2">
          {sortedCreators.map((creator, i) => (
            <CreatorCapsule key={creator.name} creator={creator} index={i} />
          ))}
        </div>
      </section>

      {/* Live Channels Grid */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                <Play className="w-5 h-5 text-rose-500 fill-current" />
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">Live Now</h2>
           </div>
        </div>
        
        {liveNow.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {liveNow.map((event, i) => (
              <motion.div
                key={`live-${event.id}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center glass-panel rounded-3xl border border-white/5">
            <p className="text-neutral-500 font-medium">No one you follow is live right now.</p>
          </div>
        )}
      </section>

      {/* Upcoming Grid */}
      <section className="space-y-8 pb-12">
        <div className="flex items-center gap-4">
           <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
             <Calendar className="w-5 h-5 text-indigo-400" />
           </div>
           <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">Upcoming streams</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {upcoming.map((event, i) => (
            <motion.div
              key={`upcoming-${event.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (i * 0.05) }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
