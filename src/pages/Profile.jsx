import { useContext } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Link as LinkIcon, Calendar, Edit3, Settings, Grid, Heart, Bell } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

export default function Profile() {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === 'light';

  const stats = [
    { label: 'Followers', value: '12.4K' },
    { label: 'Following', value: '842' },
    { label: 'Total Views', value: '1.2M' },
    { label: 'Streams', value: '156' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen pb-20"
    >
      {/* ── Header / Cover ── */}
      <div className="relative h-48 md:h-72 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500">
         <div className="absolute inset-0 bg-black/20" />
         <div className="app-container h-full relative">
            <button className="absolute bottom-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all">
               <Edit3 className="w-4 h-4" />
               Edit Cover
            </button>
         </div>
      </div>

      {/* ── Profile Info ── */}
      <div className="app-container -mt-16 relative z-10">
         <div className="flex flex-col md:flex-row items-end gap-6 mb-8">
            <div className={`w-32 h-32 md:w-40 md:h-40 rounded-3xl p-1 shadow-2xl ${isLight ? 'bg-white' : 'bg-[#0b0b0d]'}`}>
               <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-5xl font-black border border-white/10 overflow-hidden">
                  V
               </div>
            </div>
            
            <div className="flex-1 pb-2">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className={`text-3xl md:text-4xl font-black tracking-tight ${isLight ? 'text-black' : 'text-white'}`}>Vicky Bytes</h1>
                    <p className="text-indigo-500 font-bold tracking-tight">@vickybytes_pro</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                     <button className="px-6 py-2.5 rounded-xl bg-indigo-500 text-white text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/20">
                        Follow
                     </button>
                     <button className={`p-2.5 rounded-xl border transition-all ${isLight ? 'bg-white border-slate-200 text-slate-600 hover:text-black hover:border-slate-300' : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:bg-white/10'}`}>
                        <Bell className="w-5 h-5" />
                     </button>
                     <button className={`p-2.5 rounded-xl border transition-all ${isLight ? 'bg-white border-slate-200 text-slate-600 hover:text-black hover:border-slate-300' : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:bg-white/10'}`}>
                        <Settings className="w-5 h-5" />
                     </button>
                  </div>
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar */}
            <div className="space-y-6">
               <div className={`p-6 rounded-3xl border shadow-xl ${isLight ? 'bg-white border-slate-100' : 'bg-[#0b0b0d] border-white/5'}`}>
                  <h3 className={`text-sm font-black uppercase tracking-widest mb-4 ${isLight ? 'text-slate-400' : 'text-neutral-500'}`}>About</h3>
                  <p className={`text-sm leading-relaxed font-bold ${isLight ? 'text-slate-700' : 'text-neutral-400'}`}>
                    Professional streamer and creative developer exploring the boundaries of virtual interaction. Join me for daily tech deep-dives and gaming sessions!
                  </p>
                  
                  <div className="mt-6 space-y-4">
                     <div className="flex items-center gap-3 text-xs font-bold text-neutral-500">
                        <MapPin className="w-4 h-4" />
                        <span>San Francisco, CA</span>
                     </div>
                     <div className="flex items-center gap-3 text-xs font-bold text-indigo-500">
                        <LinkIcon className="w-4 h-4" />
                        <a href="#" className="hover:underline">vickybytes.dev</a>
                     </div>
                     <div className="flex items-center gap-3 text-xs font-bold text-neutral-500">
                        <Calendar className="w-4 h-4" />
                        <span>Joined March 2024</span>
                     </div>
                  </div>
               </div>

               <div className={`p-6 rounded-3xl border shadow-xl ${isLight ? 'bg-white border-slate-100' : 'bg-[#0b0b0d] border-white/5'}`}>
                  <h3 className={`text-sm font-black uppercase tracking-widest mb-6 ${isLight ? 'text-slate-400' : 'text-neutral-500'}`}>Statistics</h3>
                  <div className="grid grid-cols-2 gap-6">
                     {stats.map(s => (
                        <div key={s.label}>
                           <p className={`text-xl font-black ${isLight ? 'text-black' : 'text-white'}`}>{s.value}</p>
                           <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mt-1">{s.label}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
               <div className="flex items-center gap-8 border-b border-neutral-100 dark:border-white/5 px-2">
                  {['Recent Streams', 'Clips', 'Collections'].map((tab, i) => (
                     <button key={tab} className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${
                        i === 0 
                        ? (isLight ? 'text-indigo-600' : 'text-indigo-400') 
                        : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                     }`}>
                        {tab}
                        {i === 0 && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />}
                     </button>
                  ))}
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(idx => (
                     <div key={idx} className={`aspect-video rounded-2xl border overflow-hidden relative group cursor-pointer ${isLight ? 'bg-slate-100 border-slate-200' : 'bg-white/5 border-white/5'}`}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent group-hover:bg-black/40 transition-all duration-300" />
                        <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <p className="text-white font-bold text-sm truncate">Weekly Tech Wrap-up #{idx}</p>
                            <p className="text-white/60 text-[10px] mt-1 font-bold italic">2.4K views • 2 days ago</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </motion.div>
  );
}
