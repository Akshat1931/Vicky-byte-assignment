import { useContext } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, PlayCircle, Clock, Zap, BarChart3, ArrowUpRight, ArrowDownRight, Video, MessageSquare, Calendar } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

export default function Dashboard() {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === 'light';

  const stats = [
    { label: 'Live Viewers', value: '12.4K', change: '+12%', trend: 'up', icon: <Users className="w-5 h-5 text-indigo-500" /> },
    { label: 'Followers', value: '842.1K', change: '+2.4K', trend: 'up', icon: <TrendingUp className="w-5 h-5 text-indigo-500" /> },
    { label: 'Revenue', value: '$4,290', change: '-5%', trend: 'down', icon: <DollarSign className="w-5 h-5 text-indigo-500" /> },
  ];

  return (
    <div className="flex-1 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2">Creator Hub</p>
          <h1 className={`text-4xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Dashboard
          </h1>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat) => (
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
             <div className={`p-6 rounded-3xl border ${isLight ? 'bg-white border-slate-200' : 'bg-[#0d0f14] border-white/5'}`}>
                <div className="flex items-center justify-between mb-6">
                   <h3 className={`text-lg font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>Stream Performance</h3>
                   <BarChart3 className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="h-48 flex items-end gap-2 px-2 pb-4">
                   {[40, 70, 45, 90, 65, 80, 50, 60, 85, 95, 75, 55].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        className="flex-1 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-sm opacity-80"
                      />
                   ))}
                </div>
             </div>

             <div className={`p-6 rounded-3xl border ${isLight ? 'bg-white border-slate-200' : 'bg-[#0d0f14] border-white/5'}`}>
                <h3 className={`text-lg font-black mb-6 ${isLight ? 'text-slate-900' : 'text-white'}`}>Recent Activities</h3>
                <div className="space-y-4">
                   {[
                     { user: 'Sarah King', action: 'subscribed to your channel', time: '2m ago', icon: <MessageSquare className="w-4 h-4 text-indigo-400" /> },
                     { user: 'StreamBot', action: 'moderated spam in chat', time: '15m ago', icon: <Zap className="w-4 h-4 text-amber-400" /> },
                     { user: 'Global Network', action: 'hosted your stream (2.4K viewers)', time: '1h ago', icon: <PlayCircle className="w-4 h-4 text-rose-400" /> },
                   ].map((item, i) => (
                      <div key={i} className={`flex items-start gap-4 p-4 rounded-2xl transition-colors ${isLight ? 'hover:bg-slate-50' : 'hover:bg-white/5'}`}>
                         <div className={`p-2 rounded-xl scale-95 ${isLight ? 'bg-slate-100' : 'bg-white/5'}`}>{item.icon}</div>
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
