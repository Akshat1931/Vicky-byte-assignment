import { useContext } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, PlayCircle, Clock, Zap, BarChart3, ArrowUpRight, ArrowDownRight, Video, MessageSquare, Calendar, Activity } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import SEO from '../components/Core/SEO';
import { mockUser } from '../data/mockUser';

export default function Dashboard() {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === 'light';

  // Map user stats for the dashboard display
  const dashboardStats = [
    { label: 'Live Viewers', value: mockUser.stats[0].value, change: mockUser.stats[0].change, trend: mockUser.stats[0].trend, icon: <Users className="w-5 h-5 text-indigo-500" /> },
    { label: 'Followers', value: mockUser.stats[1].value, change: mockUser.stats[1].change, trend: mockUser.stats[1].trend, icon: <TrendingUp className="w-5 h-5 text-indigo-500" /> },
    { label: 'Revenue', value: mockUser.stats[3].value, change: mockUser.stats[3].change, trend: mockUser.stats[3].trend, icon: <DollarSign className="w-5 h-5 text-indigo-500" /> },
  ];

  return (
    <div className="flex-1 p-6 md:p-8">
      <SEO 
        title="Creator Dashboard" 
        description="Monitor your stream performance, engage with your audience, and manage your content on the StreamSphere Creator Dashboard."
      />
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2">Creator Hub</p>
          <h1 className={`text-4xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Dashboard
          </h1>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {dashboardStats.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -4 }}
              className={`p-6 rounded-3xl border transition-all duration-300 ${
                isLight 
                ? 'bg-white border-slate-200 shadow-sm' 
                : 'bg-[#0d0f14] border-white/5 shadow-2xl shadow-black/40'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-2xl ${isLight ? 'bg-indigo-50' : 'bg-indigo-500/10'}`}>
                  {stat.icon}
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black ${
                  stat.trend === 'up' 
                  ? 'bg-emerald-500/10 text-emerald-500' 
                  : 'bg-rose-500/10 text-rose-500'
                }`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <p className={`text-sm font-bold mb-1 ${isLight ? 'text-slate-400' : 'text-neutral-500'}`}>{stat.label}</p>
              <h3 className={`text-3xl font-black tabular-nums ${isLight ? 'text-slate-900' : 'text-white'}`}>{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* Main Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stream Manager Preview */}
          <div className="lg:col-span-2 space-y-6">
             <div className={`p-6 rounded-3xl border ${isLight ? 'bg-white border-slate-200' : 'bg-[#0d0f14] border-white/5 shadow-2xl shadow-black/20'}`}>
                <div className="flex items-center justify-between mb-8">
                   <div>
                      <h3 className={`text-lg font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>Stream Performance</h3>
                      <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mt-1">Real-time Engagement Matrix</p>
                   </div>
                   <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-400 text-[10px] font-black tracking-widest uppercase border border-indigo-500/20">
                      <Activity className="w-3.5 h-3.5" />
                      Live Analytics
                   </div>
                </div>

                <div className="relative h-48 mb-10 group pl-16 pr-4 mt-6">
                   {/* Y-Axis Labels */}
                   <div className="absolute left-10 inset-y-0 flex flex-col justify-between text-[10px] font-black text-neutral-600 uppercase tracking-widest pr-2 border-r border-white/5 pointer-events-none">
                      <span>40K</span>
                      <span>20K</span>
                      <span>0</span>
                   </div>
                   
                   {/* Y-Axis Name */}
                   <div className="absolute -left-4 top-1/2 -translate-y-1/2 -rotate-90 text-[8px] font-black text-neutral-500 uppercase tracking-[0.4em] pointer-events-none whitespace-nowrap opacity-40">
                      Engagement
                   </div>

                   <div className="relative w-full h-full">
                      <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 200 140">
                         <defs>
                            <linearGradient id="dashGradient" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                               <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                            </linearGradient>
                         </defs>
                         <path 
                            d="M 0 125 Q 20 105 40 115 T 80 60 T 120 85 T 160 50 T 200 80 L 200 140 L 0 140 Z" 
                            fill="url(#dashGradient)"
                            className="transition-all duration-1000 group-hover:opacity-80"
                         />
                         <path 
                            d="M 0 125 Q 20 105 40 115 T 80 60 T 120 85 T 160 50 T 200 80" 
                            fill="none" 
                            stroke="#6366f1" 
                            strokeWidth="3.5" 
                            strokeLinecap="round"
                            className="transition-all duration-1000 group-hover:stroke-indigo-400 drop-shadow-lg"
                         />
                      </svg>
                   </div>

                   {/* X-Axis Labels */}
                   <div className="absolute -bottom-8 inset-x-0 flex justify-between text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em] pl-16 pr-4">
                      <span>MON</span>
                      <span>WED</span>
                      <span>FRI</span>
                      <span>SUN</span>
                   </div>
                </div>
             </div>

             <div className={`p-6 rounded-3xl border ${isLight ? 'bg-white border-slate-200' : 'bg-[#0d0f14] border-white/5'}`}>
                <h3 className={`text-lg font-black mb-6 ${isLight ? 'text-slate-900' : 'text-white'}`}>Recent Activities</h3>
                <div className="space-y-4">
                   {mockUser.activities.map((item) => (
                      <div key={item.id} className={`flex items-start gap-4 p-4 rounded-2xl transition-colors ${isLight ? 'hover:bg-slate-50' : 'hover:bg-white/5'}`}>
                         <div className={`p-2 rounded-xl scale-95 ${isLight ? 'bg-slate-100' : 'bg-white/5'}`}>
                            {item.type === 'subscription' && <MessageSquare className="w-4 h-4 text-indigo-400" />}
                            {item.type === 'mod' && <Zap className="w-4 h-4 text-amber-400" />}
                            {item.type === 'host' && <PlayCircle className="w-4 h-4 text-rose-400" />}
                         </div>
                         <div className="flex-1">
                            <p className="text-sm">
                               <span className={`font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.user}</span>{' '}
                               <span className={isLight ? 'text-slate-500' : 'text-neutral-500'}>{item.action}</span>
                            </p>
                            <p className="text-xs text-indigo-500 font-bold mt-1 inline-flex items-center gap-1">
                               <Clock className="w-3 h-3" /> {item.time}
                            </p>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
             <div className={`p-6 rounded-3xl border ${isLight ? 'bg-white border-slate-200' : 'bg-[#0d0f14] border-white/5'}`}>
                <h3 className={`text-lg font-black mb-6 ${isLight ? 'text-slate-900' : 'text-white'}`}>Stream Controls</h3>
                <div className="grid grid-cols-1 gap-3">
                   <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-indigo-600 text-white font-black hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20">
                      <span>Go Live Now</span>
                      <Video className="w-5 h-5" />
                   </button>
                   <button className={`w-full flex items-center justify-between p-4 rounded-2xl border font-black transition-colors ${
                     isLight ? 'bg-white border-slate-200 text-slate-900 hover:bg-slate-50' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                   }`}>
                      <span>Schedule Stream</span>
                      <Calendar className="w-5 h-5" />
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
