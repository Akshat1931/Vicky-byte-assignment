import { useContext } from 'react';
import { motion } from 'framer-motion';
import { Users, Bell, TrendingUp, Grid, List, CheckCircle2 } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import SEO from '../components/Core/SEO';

const FOLLOWED_CREATORS = [
  { id: 1, name: 'ESL Network', subs: '1.2M', isLive: true, category: 'Gaming' },
  { id: 2, name: 'DJ Synth', subs: '840K', isLive: true, category: 'Music' },
  { id: 3, name: 'HoopsCentral', subs: '2.5M', isLive: false, category: 'Sports' },
  { id: 4, name: 'ChessTV', subs: '450K', isLive: true, category: 'Strategy' },
  { id: 5, name: 'PixelStudios', subs: '150K', isLive: false, category: 'Development' },
  { id: 6, name: 'Venture Capital TV', subs: '95K', isLive: false, category: 'Business' },
];

export default function Subscriptions() {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === 'light';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="app-container py-12 pb-24"
    >
      <SEO 
        title="Your Subscriptions" 
        description="Manage your followed creators, notification preferences, and subscription status on StreamSphere. Never miss a live moment."
      />
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
         <div>
            <h1 className={`text-4xl font-black tracking-tight ${isLight ? 'text-black' : 'text-white'}`}>Subscriptions</h1>
            <p className="text-neutral-500 font-bold mt-2">Manage your followed creators and notification preferences.</p>
         </div>
         
         <div className={`p-1 rounded-2xl border flex items-center ${isLight ? 'bg-slate-50 border-slate-100' : 'bg-white/5 border-white/5'}`}>
            <button className={`p-2.5 rounded-xl transition-all ${isLight ? 'bg-white text-indigo-600 shadow-sm' : 'bg-white/10 text-white shadow-lg'}`}>
               <Grid className="w-5 h-5" />
            </button>
            <button className="p-2.5 rounded-xl transition-all text-neutral-500 hover:text-indigo-400">
               <List className="w-5 h-5" />
            </button>
         </div>
      </header>

      <div className="flex items-center gap-8 border-b border-neutral-100 dark:border-white/5 px-2 mb-10">
         {['Following', 'Suggested', 'Categories'].map((tab, i) => (
            <button key={tab} className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${
               i === 0 
               ? (isLight ? 'text-indigo-600' : 'text-indigo-400') 
               : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}>
               {tab}
               {i === 0 && <motion.div layoutId="subTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />}
            </button>
         ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {FOLLOWED_CREATORS.map((creator) => (
            <div key={creator.id} className={`p-6 rounded-3xl border transition-all hover:scale-[1.02] relative group ${
               isLight ? 'bg-white border-slate-100 shadow-xl shadow-slate-200/50' : 'bg-[#0b0b0d] border-white/5 shadow-2xl shadow-black/50'
            }`}>
               <div className="flex items-center gap-5">
                  <div className="relative">
                     <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-black border border-white/10 overflow-hidden shadow-lg`}>
                        {creator.name.charAt(0)}
                     </div>
                     {creator.isLive && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 border-2 border-white dark:border-[#0b0b0d] rounded-full animate-pulse" />
                     )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                     <div className="flex items-center gap-2">
                        <h3 className={`text-base font-black truncate ${isLight ? 'text-black' : 'text-white'}`}>{creator.name}</h3>
                        <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                     </div>
                     <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mt-0.5">{creator.subs} subscribers</p>
                  </div>
               </div>

               <div className="mt-6 flex items-center justify-between border-t border-neutral-100 dark:border-white/5 pt-6">
                  <div className="flex items-center gap-2">
                     <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        isLight ? 'bg-slate-100 text-slate-500' : 'bg-white/5 text-neutral-400'
                     }`}>
                        {creator.category}
                     </span>
                     {creator.isLive && (
                        <span className="text-rose-500 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5">
                           <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                           Live Now
                        </span>
                     )}
                  </div>
                  
                  <button className={`p-2.5 rounded-xl transition-all ${
                     isLight ? 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100' : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                  }`}>
                     <Bell className="w-4 h-4" />
                  </button>
               </div>
            </div>
         ))}
      </div>

      <div className={`mt-16 p-10 rounded-3xl border text-center ${
         isLight ? 'bg-indigo-50 border-indigo-100 shadow-lg shadow-indigo-100/50' : 'bg-white/5 border-white/5'
      }`}>
         <div className="w-16 h-16 bg-white dark:bg-black/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <TrendingUp className="w-8 h-8 text-indigo-500" />
         </div>
         <h3 className={`text-xl font-black mb-3 ${isLight ? 'text-black' : 'text-white'}`}>Discover More Creators</h3>
         <p className="text-sm font-bold text-neutral-500 max-w-sm mx-auto mb-8">Join the conversation and connect with thousands of amazing creators in the streaming sphere.</p>
         <button className="px-10 py-3 rounded-xl bg-indigo-500 text-white text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all">
            Explore Browse
         </button>
      </div>
    </motion.div>
  );
}
