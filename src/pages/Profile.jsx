import { useContext } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Link as LinkIcon, Calendar, Edit3, Settings, Grid, Heart, Bell, MessageSquare, ExternalLink, Activity, BarChart2 } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import SEO from '../components/Core/SEO';
import { mockUser } from '../data/mockUser';

export default function Profile() {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === 'light';

  const stats = mockUser.stats.slice(0, 5);
  const initials = mockUser.name.split(' ').map(n => n[0]).join('').toUpperCase();
  
  const SocialIcon = ({ platform }) => {
    switch (platform) {
      case 'Discord': return <MessageSquare className="w-4 h-4" />;
      default: return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen pb-20"
    >
      <SEO 
        title="Your Profile" 
        description="View and manage your StreamSphere profile. Check your latest activity, followers, and stream history in one premium dashboard."
      />
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
               <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-5xl font-black border border-white/10 overflow-hidden relative group">
                  {mockUser.avatar ? (
                    <img src={mockUser.avatar} alt={mockUser.name} className="w-full h-full object-cover" />
                  ) : (
                    <span>{initials}</span>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <Edit3 className="w-6 h-6 text-white" />
                  </div>
               </div>
            </div>
            
            <div className="flex-1 pb-2">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className={`text-3xl md:text-4xl font-black tracking-tight ${isLight ? 'text-black' : 'text-white'}`}>{mockUser.name}</h1>
                    <p className="text-indigo-500 font-bold tracking-tight">@{mockUser.username}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                      <button className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all shadow-lg flex items-center gap-2">
                         <Edit3 className="w-3 h-3" />
                         Edit Profile
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
                    {mockUser.bio}
                  </p>
                  
                  <div className="mt-6 space-y-4">
                     <div className="flex items-center gap-3 text-xs font-bold text-neutral-500">
                        <MapPin className="w-4 h-4" />
                        <span>{mockUser.location}</span>
                     </div>
                     {mockUser.socialLinks && mockUser.socialLinks.map(link => (
                        <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" 
                           className="flex items-center gap-3 text-xs font-bold text-indigo-500 hover:text-indigo-400 transition-colors">
                           <SocialIcon platform={link.platform} />
                           <span>{link.platform}</span>
                        </a>
                     ))}
                     <div className="flex items-center gap-3 text-xs font-bold text-neutral-500">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {mockUser.joinedDate}</span>
                     </div>
                  </div>
               </div>

                <div className={`p-6 rounded-3xl border shadow-xl ${isLight ? 'bg-white border-slate-100' : 'bg-[#0b0b0d] border-white/5'}`}>
                   <div className="flex items-center justify-between mb-6">
                      <h3 className={`text-sm font-black uppercase tracking-widest ${isLight ? 'text-slate-400' : 'text-neutral-500'}`}>Weekly Analytics</h3>
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 text-[10px] font-black tracking-tighter uppercase">
                         <Activity className="w-3 h-3" />
                         +14.2%
                      </div>
                   </div>

                   {/* Cinematic Area Chart with Axis Labels */}
                   <div className="relative h-32 mb-8 group pl-16 pr-2 mt-4">
                      {/* Y-Axis Labels */}
                      <div className="absolute left-10 inset-y-0 flex flex-col justify-between text-[8px] font-black text-neutral-600 uppercase tracking-tighter pr-2 border-r border-white/5 pointer-events-none">
                         <span>20K</span>
                         <span>10K</span>
                         <span>0</span>
                      </div>
                      
                      {/* X-Axis Name */}
                      <div className="absolute -left-4 top-1/2 -translate-y-1/2 -rotate-90 text-[7px] font-black text-neutral-500 uppercase tracking-[0.3em] pointer-events-none whitespace-nowrap opacity-60">
                         Engagement
                      </div>

                      <div className="relative w-full h-full">
                         <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 200 120">
                            <defs>
                               <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                               </linearGradient>
                            </defs>
                            <path 
                               d="M 0 105 Q 20 85 40 95 T 80 50 T 120 75 T 160 40 T 200 65 L 200 120 L 0 120 Z" 
                               fill="url(#chartGradient)"
                               className="transition-all duration-1000 group-hover:opacity-80"
                            />
                            <path 
                               d="M 0 105 Q 20 85 40 95 T 80 50 T 120 75 T 160 40 T 200 65" 
                               fill="none" 
                               stroke="#6366f1" 
                               strokeWidth="2.5" 
                               strokeLinecap="round"
                               className="transition-all duration-1000 group-hover:stroke-indigo-400"
                            />
                         </svg>
                      </div>

                      {/* X-Axis Labels */}
                      <div className="absolute -bottom-6 inset-x-0 flex justify-between text-[8px] font-black text-neutral-700 uppercase tracking-widest pl-16 pr-2">
                         <span>Mon</span>
                         <span>Wed</span>
                         <span>Fri</span>
                         <span>Sun</span>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
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

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                  {mockUser.recentStreams.map((stream) => (
                     <div key={stream.id} className={`aspect-video rounded-2xl border overflow-hidden relative group cursor-pointer ${isLight ? 'bg-slate-100 border-slate-200' : 'bg-white/5 border-white/5'}`}>
                        <img src={stream.thumbnail} alt={stream.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent group-hover:bg-black/40 transition-all duration-300" />
                        <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <p className="text-white font-bold text-sm truncate">{stream.title}</p>
                            <p className="text-white/60 text-[10px] mt-1 font-bold italic">{stream.views} views • {stream.date}</p>
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
