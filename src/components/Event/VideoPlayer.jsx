import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Signal, Gauge, Radio, Sparkles, X, Captions, Zap, PlayCircle, Theater, Smile, Flame, Laugh, Heart as HeartIcon, Star } from 'lucide-react';

const QUALITY_OPTIONS = ['Auto', '1080p', '720p', '480p', '360p'];
const SPEED_OPTIONS = ['0.5x', '0.75x', '1x', '1.25x', '1.5x', '2x'];
const LATENCY_OPTIONS = ['Low Latency', 'Balanced', 'Ultra Low'];

const EMOTES = [
  { id: 'heart', icon: <HeartIcon className="w-4 h-4 sm:w-5 h-5 text-rose-500 fill-rose-500" />, label: 'Love' },
  { id: 'fire', icon: <Flame className="w-4 h-4 sm:w-5 h-5 text-orange-500 fill-orange-500" />, label: 'Fire' },
  { id: 'laugh', icon: <Laugh className="w-4 h-4 sm:w-5 h-5 text-yellow-500" />, label: 'Haha' },
  { id: 'star', icon: <Star className="w-4 h-4 sm:w-5 h-5 text-yellow-400 fill-yellow-400" />, label: 'Epic' },
];

export default function VideoPlayer({ event }) {
  const videoId = 'jfKfPfyJRdk';
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
    const newEmote = { 
      id: Date.now(), 
      type, 
      x: Math.random() * 60 - 30, // Random horizontal spread
      scale: 0.8 + Math.random() * 0.4 
    };
    
    setFloatingEmotes((prev) => [...prev, newEmote]);

    setTimeout(() => {
      setFloatingEmotes((prev) => prev.filter((e) => e.id !== newEmote.id));
    }, 2000);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`w-full relative bg-black overflow-hidden border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] transition-all duration-500 group ${
        theater
          ? 'rounded-none aspect-[21/9]'
          : 'rounded-2xl sm:rounded-3xl aspect-video'
      }`}
    >
      {/* ── Overlay Layer: LIVE badge + viewers ── */}
      {event.isLive && (
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          <div className="bg-rose-500/90 text-[10px] tracking-widest font-bold px-3 py-1.5 rounded flex items-center gap-2 shadow-lg backdrop-blur-md text-white">
            <div className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
            </div>
            LIVE
          </div>
          <div className="bg-black/60 backdrop-blur-xl text-white text-[11px] font-medium px-3 py-1.5 rounded flex items-center gap-1.5 border border-white/10">
            <span className="text-rose-400">●</span> {event.viewers.toLocaleString()}
          </div>
        </div>
      )}

      {/* ── Floating Emotes layer ── */}
      <div className="absolute bottom-16 right-8 sm:right-12 pointer-events-none z-[40]">
        <AnimatePresence>
          {floatingEmotes.map((emote) => (
            <motion.div
              key={emote.id}
              initial={{ opacity: 1, y: 0, x: emote.x, scale: 0.5, rotate: 0 }}
              animate={{ 
                opacity: 0, 
                y: -200 - Math.random() * 80, 
                x: emote.x + (Math.random() * 100 - 50), 
                scale: emote.scale * 1.8,
                rotate: Math.random() * 60 - 30
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute bottom-0"
            >
              {EMOTES.find(e => e.id === emote.type)?.icon}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── Botom-Right Overlay Controls ── */}
      <div className="absolute bottom-4 right-4 z-50 flex items-center gap-2">
        
        {/* React Button & Menu */}
        <div className="relative isolate">
          <button
            onClick={() => {
              setEmoteMenuOpen(v => !v);
              setSettingsOpen(false);
            }}
            className={`flex items-center gap-1.5 bg-black/60 hover:bg-black/85 backdrop-blur-md text-white px-2.5 py-2 rounded-lg border border-white/15 shadow-lg transition-all text-xs font-medium ${emoteMenuOpen ? 'border-indigo-400/50 bg-indigo-500/10 text-indigo-300' : ''}`}
          >
            <Smile className="w-4 h-4" />
            <span className="hidden sm:block">React</span>
          </button>

          <AnimatePresence>
            {emoteMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: 10, x: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10, x: -20 }}
                className="absolute bottom-12 right-0 flex items-center gap-1.5 bg-[#0d0f14]/90 backdrop-blur-2xl border border-white/15 p-1.5 rounded-2xl shadow-2xl z-[60]"
              >
                {EMOTES.map((emote) => (
                  <motion.button
                    key={emote.id}
                    whileHover={{ scale: 1.3, y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEmote(emote.id)}
                    className="p-2 hover:bg-white/10 rounded-xl transition-colors group relative"
                  >
                    {emote.icon}
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">
                      {emote.label}
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Settings Button & Menu */}
        <div className="relative isolate">
          <button
            onClick={() => {
              setSettingsOpen(v => !v);
              setEmoteMenuOpen(false);
            }}
            className={`flex items-center gap-1.5 bg-black/60 hover:bg-black/85 backdrop-blur-md text-white px-2.5 py-2 rounded-lg border border-white/15 shadow-lg transition-all text-xs font-medium ${settingsOpen ? 'border-indigo-400/50 rotate-0' : ''}`}
            title="Settings"
          >
            <Settings className={`w-4 h-4 transition-transform duration-500 ${settingsOpen ? 'rotate-90' : ''}`} />
            <span className="hidden sm:block">Settings</span>
          </button>

          <AnimatePresence>
            {settingsOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-12 right-0 w-[280px] sm:w-80 bg-[#0f0f12]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 bg-white/5">
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-indigo-400" />
                    <p className="text-xs font-bold text-white tracking-wide uppercase">Playback Settings</p>
                  </div>
                  <button onClick={() => setSettingsOpen(false)} className="text-neutral-500 hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 space-y-5 max-h-[70vh] overflow-y-auto scrollbar-hide">
                  {/* Status */}
                  <div className="flex gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-400 uppercase tracking-tighter">
                      <Signal className="h-3 w-3" /> Live & Stable
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-2.5 py-1 text-[10px] font-bold text-indigo-400 uppercase tracking-tighter">
                      <Sparkles className="h-3 w-3" /> Enhanced
                    </span>
                  </div>

                  {/* Options groups */}
                  {[
                    { label: 'Quality', icon: <Radio className="h-3.5 w-3.5" />, options: QUALITY_OPTIONS, current: quality, set: setQuality },
                    { label: 'Playback Speed', icon: <Zap className="h-3.5 w-3.5" />, options: SPEED_OPTIONS, current: speed, set: setSpeed },
                    { label: 'Latency Mode', icon: <Gauge className="h-3.5 w-3.5" />, options: LATENCY_OPTIONS, current: latency, set: setLatency },
                  ].map((group) => (
                    <div key={group.label}>
                      <p className="mb-2.5 text-[11px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-1.5">
                        {group.icon} {group.label}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {group.options.map(opt => (
                          <button key={opt} onClick={() => group.set(opt)}
                            className={`rounded-lg border px-2.5 py-1 text-[11px] font-semibold transition-all ${
                              group.current === opt 
                                ? 'border-white/50 bg-white text-black scale-105 shadow-lg shadow-white/10' 
                                : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                            }`}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="pt-2 border-t border-white/8 space-y-3">
                    {[
                      { label: 'Captions', icon: <Captions className="h-4 h-4" />, value: captions, toggle: () => setCaptions(v => !v) },
                      { label: 'Theater Mode', icon: <Theater className="h-4 h-4" />, value: theater, toggle: () => { setTheater(v => !v); setSettingsOpen(false); } },
                      { label: 'Autoplay Next', icon: <PlayCircle className="h-4 h-4" />, value: autoplay, toggle: () => setAutoplay(v => !v) },
                    ].map(({ label, icon, value, toggle }) => (
                      <button key={label} onClick={toggle}
                        className="w-full flex items-center justify-between group py-0.5">
                        <span className="flex items-center gap-3 text-xs font-semibold text-neutral-300 group-hover:text-white transition-colors">
                          <span className="text-neutral-500 group-hover:text-indigo-400 transition-colors">{icon}</span> {label}
                        </span>
                        <div className={`w-8 h-4.5 rounded-full transition-all duration-300 relative flex-shrink-0 ${value ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.4)]' : 'bg-white/10'}`}>
                          <span className={`absolute top-0.75 w-3 h-3 rounded-full bg-white shadow-md transition-all duration-300 ${value ? 'left-[1.125rem]' : 'left-0.75'}`} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1`}
        title="Live Stream"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </motion.div>
  );
}
