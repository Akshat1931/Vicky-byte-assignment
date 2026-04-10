import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Bell, Eye, Moon, Globe, Trash2, Mail, Lock, Check, Radio, Gauge, Signal, Sparkles } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

export default function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isLight = theme === 'light';
  const [activeTab, setActiveTab] = useState('Account');

  const tabs = [
    { name: 'Account', icon: User },
    { name: 'Preferences', icon: Radio },
    { name: 'Security', icon: Shield },
    { name: 'Notifications', icon: Bell },
    { name: 'Privacy', icon: Eye },
  ];

  const [quality, setQuality] = useState('Auto');
  const [latency, setLatency] = useState('Balanced');

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="app-container py-12 pb-24"
    >
      <div className="mb-10">
         <h1 className={`text-3xl font-black tracking-tight ${isLight ? 'text-black' : 'text-white'}`}>Settings</h1>
         <p className="text-neutral-500 font-bold mt-2">Manage your account preferences and security settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
         {/* Sidebar Tabs */}
         <div className="space-y-2">
            {tabs.map(tab => (
               <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                     activeTab === tab.name 
                     ? (isLight ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-100' : 'bg-white text-black')
                     : (isLight ? 'text-slate-400 hover:bg-slate-50 hover:text-black' : 'text-neutral-500 hover:bg-white/5 hover:text-white')
                  }`}
               >
                  <tab.icon className="w-4 h-4" />
                  {tab.name}
               </button>
            ))}
         </div>

         {/* Settings Form */}
         <div className="lg:col-span-3 space-y-8">
            <div className={`p-8 rounded-3xl border shadow-xl ${
               isLight ? 'bg-white border-slate-100' : 'bg-[#0b0b0d] border-white/5'
            }`}>
               <h3 className={`text-sm font-black uppercase tracking-widest mb-8 ${isLight ? 'text-black' : 'text-white'}`}>{activeTab} Settings</h3>
               
               <div className="space-y-6 max-w-2xl">
                  {activeTab === 'Account' && (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                      {/* Theme Toggle Section */}
                      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-transparent dark:border-white/5">
                         <div className="flex items-center gap-4">
                            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
                               <Moon className="w-5 h-5" />
                            </div>
                            <div>
                               <p className={`text-sm font-bold ${isLight ? 'text-black' : 'text-white'}`}>Dark Mode</p>
                               <p className="text-[10px] text-neutral-500 font-bold">Adjust the visual appearance of the application.</p>
                            </div>
                         </div>
                         <button 
                            onClick={toggleTheme}
                            className={`w-12 h-6 rounded-full relative transition-colors ${!isLight ? 'bg-emerald-500' : 'bg-slate-300'}`}
                         >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${!isLight ? 'left-7' : 'left-1'}`} />
                         </button>
                      </div>
    
                      {/* Input Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                               <User className="w-3 h-3" /> Display Name
                            </label>
                            <input 
                               type="text" 
                               defaultValue="Vicky Bytes" 
                               className={`w-full px-4 py-3 rounded-xl border text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all ${
                                  isLight ? 'bg-slate-50 border-slate-200 text-black' : 'bg-white/5 border-white/5 text-white'
                               }`} 
                            />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                               <Mail className="w-3 h-3" /> Email Address
                            </label>
                            <input 
                               type="email" 
                               defaultValue="vicky@example.com" 
                               className={`w-full px-4 py-3 rounded-xl border text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all ${
                                  isLight ? 'bg-slate-50 border-slate-200 text-black' : 'bg-white/5 border-white/5 text-white'
                               }`} 
                            />
                         </div>
                      </div>
    
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Bio</label>
                         <textarea 
                            rows="4" 
                            defaultValue="Professional streamer and creative developer exploring the boundaries of virtual interaction." 
                            className={`w-full px-4 py-3 rounded-xl border text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all resize-none ${
                               isLight ? 'bg-slate-50 border-slate-200 text-black' : 'bg-white/5 border-white/5 text-white'
                            }`} 
                         />
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'Preferences' && (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-xs font-black uppercase tracking-widest ${isLight ? 'text-slate-900' : 'text-white'}`}>Stream Quality</h4>
                          <Signal className="w-4 h-4 text-indigo-500" />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {['Auto', '1080p', '720p', '480p'].map(opt => (
                            <button
                              key={opt}
                              onClick={() => setQuality(opt)}
                              className={`px-4 py-3 rounded-xl border text-xs font-black transition-all ${
                                quality === opt
                                ? (isLight ? 'bg-indigo-500 border-indigo-500 text-white' : 'bg-white border-white text-black')
                                : (isLight ? 'bg-white border-slate-200 text-slate-600 hover:border-indigo-500' : 'bg-white/5 border-white/5 text-neutral-400 hover:bg-white/10')
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-xs font-black uppercase tracking-widest ${isLight ? 'text-slate-900' : 'text-white'}`}>Latency Profile</h4>
                          <Gauge className="w-4 h-4 text-indigo-500" />
                        </div>
                        <div className="space-y-3">
                          {['Balanced', 'Low Latency', 'Ultra Low'].map(opt => (
                            <button
                              key={opt}
                              onClick={() => setLatency(opt)}
                              className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl border transition-all ${
                                latency === opt
                                ? (isLight ? 'bg-slate-50 border-indigo-500/50' : 'bg-indigo-500/5 border-indigo-500/20')
                                : (isLight ? 'bg-white border-slate-100' : 'bg-white/5 border-white/5')
                              }`}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-2 h-2 rounded-full ${latency === opt ? 'bg-indigo-500' : 'bg-neutral-300 opacity-30'}`} />
                                <span className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{opt}</span>
                              </div>
                              {latency === opt && <Check className="w-4 h-4 text-indigo-500" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab !== 'Account' && activeTab !== 'Preferences' && (
                    <div className="py-20 flex flex-col items-center justify-center text-center opacity-40">
                      <Lock className="w-8 h-8 mb-4" />
                      <p className="text-xs font-black uppercase tracking-widest">Advanced Settings Coming Soon</p>
                    </div>
                  )}

                  <div className="pt-6 border-t border-neutral-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                     <button className="flex items-center gap-2 text-rose-500 text-xs font-black uppercase tracking-widest hover:text-rose-600 transition-all">
                        <Trash2 className="w-4 h-4" />
                        Delete Account
                     </button>
                     <button className="px-8 py-3 rounded-xl bg-indigo-500 text-white text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-500/20 flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        Save Changes
                     </button>
                  </div>
               </div>
            </div>

            <div className={`p-8 rounded-3xl border shadow-xl ${
               isLight ? 'bg-rose-50 border-rose-100' : 'bg-rose-500/5 border-rose-500/10'
            }`}>
               <div className="flex items-center gap-4 text-rose-500 mb-4">
                  <Shield className="w-6 h-6" />
                  <h4 className="text-sm font-black uppercase tracking-widest">Two-Factor Authentication</h4>
               </div>
               <p className={`text-xs font-bold leading-relaxed mb-6 ${isLight ? 'text-rose-600' : 'text-neutral-400'}`}>
                  Protect your account with an extra layer of security. Once enabled, you'll need to provide a code from your phone to sign in.
               </p>
               <button className="px-6 py-2.5 rounded-xl bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-500/20">
                  Enable 2FA
               </button>
            </div>
         </div>
      </div>
    </motion.div>
  );
}
