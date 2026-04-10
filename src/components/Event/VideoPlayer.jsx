import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Signal, Gauge, Radio, Sparkles, X, Captions, Zap, PlayCircle, Theater } from 'lucide-react';

const QUALITY_OPTIONS = ['Auto', '1080p', '720p', '480p', '360p'];
const SPEED_OPTIONS = ['0.5x', '0.75x', '1x', '1.25x', '1.5x', '2x'];
const LATENCY_OPTIONS = ['Low Latency', 'Balanced', 'Ultra Low'];

export default function VideoPlayer({ event }) {
  const videoId = 'jfKfPfyJRdk';
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [quality, setQuality] = useState('Auto');
  const [speed, setSpeed] = useState('1x');
  const [latency, setLatency] = useState('Balanced');
  const [captions, setCaptions] = useState(false);
  const [theater, setTheater] = useState(false);
  const [autoplay, setAutoplay] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full relative bg-black overflow-hidden border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] transition-all duration-500 ${
        theater
          ? 'rounded-none aspect-[21/9]'
          : 'rounded-2xl sm:rounded-3xl aspect-video'
      }`}
    >
      {/* LIVE badge + viewers */}
      {event.isLive && (
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <div className="bg-rose-500/90 text-white text-[10px] tracking-widest font-bold px-3 py-1.5 rounded flex items-center gap-2 shadow-[0_0_15px_rgba(244,63,94,0.4)] backdrop-blur-md">
            <div className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
            </div>
            LIVE
          </div>
          <div className="bg-black/40 backdrop-blur-xl text-white text-[11px] font-medium px-3 py-1.5 rounded flex items-center gap-1.5 border border-white/10">
            <span className="text-rose-400">●</span> {event.viewers.toLocaleString()}
          </div>
        </div>
      )}

      {/* ⚙ Settings button — bottom-right overlay */}
      <div className="absolute bottom-3 right-3 z-20">
        <button
          onClick={() => setSettingsOpen(v => !v)}
          className="flex items-center gap-1.5 bg-black/60 hover:bg-black/85 backdrop-blur-md text-white px-2.5 py-1.5 rounded-lg border border-white/15 shadow-lg transition-all text-xs font-medium"
          title="Settings"
        >
          <Settings className={`w-3.5 h-3.5 transition-transform duration-500 ${settingsOpen ? 'rotate-[90deg]' : ''}`} />
          <span className="hidden sm:block">Settings</span>
        </button>

        {/* Settings panel */}
        <AnimatePresence>
          {settingsOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-11 right-0 w-72 bg-[#0f0f12]/97 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 pt-3.5 pb-2.5 border-b border-white/8">
                <div className="flex items-center gap-2">
                  <Settings className="w-3.5 h-3.5 text-indigo-400" />
                  <p className="text-xs font-bold text-white tracking-wide">Stream Settings</p>
                </div>
                <button onClick={() => setSettingsOpen(false)} className="text-neutral-500 hover:text-white transition-colors p-0.5 rounded">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-4 space-y-4 max-h-80 overflow-y-auto scrollbar-hide">

                {/* Status pills */}
                <div className="flex gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] text-emerald-300">
                    <Signal className="h-3 w-3" /> Stable
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-2.5 py-0.5 text-[11px] text-indigo-300">
                    <Sparkles className="h-3 w-3" /> Trending
                  </span>
                </div>

                {/* Quality */}
                <div>
                  <p className="mb-2 text-[11px] text-neutral-400 flex items-center gap-1.5 font-medium">
                    <Radio className="h-3 w-3" /> Quality
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {QUALITY_OPTIONS.map(opt => (
                      <button key={opt} onClick={() => setQuality(opt)}
                        className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition-colors ${
                          quality === opt ? 'border-white/50 bg-white text-black' : 'border-white/15 bg-white/5 text-neutral-300 hover:bg-white/10'
                        }`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Playback Speed */}
                <div>
                  <p className="mb-2 text-[11px] text-neutral-400 flex items-center gap-1.5 font-medium">
                    <Zap className="h-3 w-3" /> Playback Speed
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {SPEED_OPTIONS.map(opt => (
                      <button key={opt} onClick={() => setSpeed(opt)}
                        className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition-colors ${
                          speed === opt ? 'border-white/50 bg-white text-black' : 'border-white/15 bg-white/5 text-neutral-300 hover:bg-white/10'
                        }`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Latency */}
                <div>
                  <p className="mb-2 text-[11px] text-neutral-400 flex items-center gap-1.5 font-medium">
                    <Gauge className="h-3 w-3" /> Latency Mode
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {LATENCY_OPTIONS.map(opt => (
                      <button key={opt} onClick={() => setLatency(opt)}
                        className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition-colors ${
                          latency === opt ? 'border-white/50 bg-white text-black' : 'border-white/15 bg-white/5 text-neutral-300 hover:bg-white/10'
                        }`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/8" />

                {/* Toggles */}
                {[
                  { label: 'Captions', icon: <Captions className="h-3 w-3" />, value: captions, toggle: () => setCaptions(v => !v) },
                  { label: 'Theater Mode', icon: <Theater className="h-3 w-3" />, value: theater, toggle: () => { setTheater(v => !v); setSettingsOpen(false); } },
                  { label: 'Autoplay Next', icon: <PlayCircle className="h-3 w-3" />, value: autoplay, toggle: () => setAutoplay(v => !v) },
                ].map(({ label, icon, value, toggle }) => (
                  <button key={label} onClick={toggle}
                    className="w-full flex items-center justify-between py-1 group">
                    <span className="flex items-center gap-2 text-[12px] text-neutral-300 group-hover:text-white transition-colors">
                      {icon} {label}
                    </span>
                    <div className={`w-8 h-4 rounded-full transition-colors duration-200 relative flex-shrink-0 ${value ? 'bg-indigo-500' : 'bg-white/15'}`}>
                      <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform duration-200 ${value ? 'translate-x-4' : 'translate-x-0.5'}`} />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
