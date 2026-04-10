import { useState, useCallback, useContext, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, Signal, Gauge, Radio, Sparkles, X, 
  Captions, Zap, PlayCircle, Theater, Smile, 
  Flame, Laugh, Heart as HeartIcon, Star, Maximize 
} from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';

const QUALITY_OPTIONS = ['Auto', '1080p', '720p', '480p', '360p'];
const SPEED_OPTIONS = ['0.5x', '0.75x', '1x', '1.25x', '1.5x', '2x'];
const LATENCY_OPTIONS = ['Low Latency', 'Balanced', 'Ultra Low'];

const EMOTES = [
  { id: 'heart', icon: <HeartIcon className="w-5 h-5 text-rose-500 fill-rose-500" /> },
  { id: 'fire', icon: <Flame className="w-5 h-5 text-orange-500 fill-orange-500" /> },
  { id: 'laugh', icon: <Laugh className="w-5 h-5 text-yellow-500" /> },
  { id: 'star', icon: <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" /> },
];

export default function VideoPlayer({ event, isPiPActive }) {
  const videoId = 'jfKfPfyJRdk';
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [emoteMenuOpen, setEmoteMenuOpen] = useState(false);
  const [quality, setQuality] = useState('Auto');
  const [speed, setSpeed] = useState('1x');
  const [latency, setLatency] = useState('Balanced');
  const [captions, setCaptions] = useState(false);
  const [theater, setTheater] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [floatingEmotes, setFloatingEmotes] = useState([]);

  const handleEmote = useCallback((type) => {
    const newEmote = { id: Date.now(), type, x: Math.random() * 80 - 40 };
    setFloatingEmotes((prev) => [...prev, newEmote]);
    setTimeout(() => setFloatingEmotes((prev) => prev.filter((e) => e.id !== newEmote.id)), 2000);
  }, []);

  const containerRef = useRef(null);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Sticky Overlay classes for mobile PiP mode - snap to ABSOLUTE TOP (top-0)
  const pipClasses = isPiPActive 
    ? `fixed top-0 left-0 w-full z-[130] rounded-none shadow-[0_15px_30px_rgba(0,0,0,0.6)] border-b transition-all duration-300 ${isDark ? 'border-white/10' : 'border-slate-200'}` 
    : '';

  return (
    <motion.div
      ref={containerRef}
      layout
      transition={{ type: "spring", stiffness: 350, damping: 35 }}
      className={`w-full relative bg-black overflow-hidden border transition-all duration-500 ${pipClasses} ${
        theme === 'light' ? 'border-slate-200' : 'border-white/10'
      } ${theater && !isPiPActive ? 'rounded-none aspect-[21/9]' : 'rounded-2xl sm:rounded-3xl aspect-video'}`}
    >
      {/* ── LIVE badge ── */}
      {event.isLive && (
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <div className="bg-rose-500 text-[10px] font-bold px-2.5 py-1 rounded shadow-lg text-white flex items-center gap-1.5 outline-none">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> LIVE
          </div>
        </div>
      )}

      {/* ── Top-Right Utility Cluster ── */}
      <div className="absolute top-4 right-4 z-40 flex items-center gap-2">
        <div className={`flex items-center gap-2 transition-opacity duration-300 ${isPiPActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <button
            onClick={() => { setSettingsOpen(v => !v); setEmoteMenuOpen(false); }}
            className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center backdrop-blur-md rounded-full border transition-all outline-none ${
              settingsOpen ? 'text-indigo-500 border-indigo-400 scale-110 rotate-90' : 'text-white border-white/20 bg-black/40 hover:bg-black/60'
            }`}
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Fullscreen Button - Always Visible or Prominent in PiP */}
        <button
          onClick={toggleFullscreen}
          className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center backdrop-blur-md rounded-full border border-white/20 bg-black/40 hover:bg-black/60 text-white transition-all outline-none hover:scale-110 active:scale-95 ${
            isPiPActive ? 'ring-2 ring-indigo-500 shadow-lg shadow-indigo-500/20' : ''
          }`}
          title="Full Screen"
        >
          <Maximize className="w-5 h-5" />
        </button>
      </div>

      {/* ── Adaptive Settings Menu ── */}
      <AnimatePresence>
        {settingsOpen && !isPiPActive && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSettingsOpen(false)} className="absolute inset-0 bg-black/10 backdrop-blur-[1px] z-30" />
            
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className={`absolute bottom-2 right-2 sm:bottom-auto sm:top-16 sm:right-4 w-[260px] sm:w-[300px] backdrop-blur-3xl border rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[85%] ${
                isDark ? 'bg-[#0d0d0f]/95 border-white/10' : 'bg-white/95 border-slate-200'
              }`}
            >
              <div className={`flex items-center justify-between px-4 py-2.5 border-b ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-100 bg-slate-50'}`}>
                <span className={`text-[10px] font-black tracking-widest uppercase ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>Playback Settings</span>
                <button onClick={() => setSettingsOpen(false)} className={`${isDark ? 'text-neutral-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'} p-1`}><X className="w-4 h-4" /></button>
              </div>

              <div className="p-4 space-y-5 overflow-y-auto scrollbar-hide touch-pan-y">
                {[
                  { label: 'Quality', icon: <Radio className="w-3 h-3" />, options: QUALITY_OPTIONS, val: quality, set: setQuality },
                  { label: 'Playback Speed', icon: <Zap className="w-3 h-3" />, options: SPEED_OPTIONS, val: speed, set: setSpeed },
                  { label: 'Latency Mode', icon: <Gauge className="w-3 h-3" />, options: LATENCY_OPTIONS, val: latency, set: setLatency }
                ].map((group) => (
                  <div key={group.label} className="space-y-2">
                    <label className={`text-[9px] font-bold uppercase flex items-center gap-2 ${isDark ? 'text-neutral-500' : 'text-slate-400'}`}>{group.icon} {group.label}</label>
                    <div className="flex flex-wrap gap-1">
                      {group.options.map(opt => (
                        <button key={opt} onClick={() => group.set(opt)}
                          className={`px-2 py-1 text-[9px] font-bold rounded transition-all border whitespace-nowrap ${
                            group.val === opt 
                              ? 'bg-indigo-500 text-white border-indigo-500 shadow-md' 
                              : (isDark ? 'bg-white/5 text-neutral-400 border-white/5 hover:bg-white/10 hover:text-white' : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200')
                          }`}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <div className={`pt-3 border-t space-y-1 ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                  {[
                    { label: 'Captions', icon: <Captions className="w-4 h-4" />, val: captions, toggle: () => setCaptions(v => !v) },
                    { label: 'Theater Mode', icon: <Theater className="w-4 h-4" />, val: theater, toggle: () => setTheater(v => !v) },
                    { label: 'Autoplay Next', icon: <PlayCircle className="w-4 h-4" />, val: autoplay, toggle: () => setAutoplay(v => !v) },
                  ].map((item) => (
                    <button key={item.label} onClick={item.toggle} className="w-full flex items-center justify-between py-2 group outline-none">
                      <span className={`flex items-center gap-3 text-[12px] font-semibold transition-colors ${
                        isDark ? 'text-neutral-400 group-hover:text-white' : 'text-slate-500 group-hover:text-slate-900'
                      }`}>
                        <span className={item.val ? 'text-indigo-500' : ''}>{item.icon}</span> {item.label}
                      </span>
                      <div className={`w-9 h-5 rounded-full flex items-center px-0.75 transition-all duration-300 ${
                        item.val ? 'bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.4)]' : (isDark ? 'bg-white/10' : 'bg-slate-200')
                      }`}>
                        <motion.div animate={{ x: item.val ? 16 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} className="w-3.5 h-3.5 rounded-full bg-white shadow-lg" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Reactions ── */}
      <div className={`absolute bottom-4 right-4 z-40 flex items-center gap-2 transition-opacity duration-300 ${isPiPActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <AnimatePresence>
          {emoteMenuOpen && (
            <motion.div initial={{ opacity: 0, scale: 0.8, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.8, x: 20 }}
              className={`flex items-center gap-1 backdrop-blur-2xl border p-1 rounded-l-2xl mr-[-4px] ${
                isDark ? 'bg-black/40 border-white/15' : 'bg-white/60 border-slate-200 shadow-lg'
              }`}>
              {EMOTES.map((e) => (
                <button key={e.id} onClick={() => handleEmote(e.id)} className="p-1.5 hover:scale-125 transition-transform outline-none">{e.icon}</button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={() => { setEmoteMenuOpen(v => !v); setSettingsOpen(false); }}
          className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center backdrop-blur-md rounded-full border outline-none transition-all ${
            emoteMenuOpen 
              ? 'border-indigo-500 text-indigo-500 bg-indigo-500/10 rounded-l-none border-l-0' 
              : (isDark ? 'bg-black/40 border-white/15 text-white hover:bg-black/60' : 'bg-white/60 border-slate-200 text-slate-700 hover:bg-white shadow-md')
          }`}
        >
          <Smile className="w-5 h-5" />
        </button>
      </div>

      {/* ── Floating Emotes ── */}
      <div className="absolute bottom-20 right-10 pointer-events-none z-30">
        <AnimatePresence>
          {floatingEmotes.map((e) => (
            <motion.div key={e.id} initial={{ opacity: 1, y: 0, x: e.x }} animate={{ opacity: 0, y: -200, x: e.x + (Math.random() * 80 - 40), scale: 2 }} exit={{ opacity: 0 }} transition={{ duration: 1.8 }} className="absolute bottom-0">
              {EMOTES.find(res => res.id === e.type)?.icon}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0`} title="Stream" frameBorder="0" allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
    </motion.div>
  );
}
