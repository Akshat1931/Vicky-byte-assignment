import { useState, useCallback, useContext, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
   Settings, Signal, Gauge, Radio, Sparkles, X, 
   Captions, Zap, PlayCircle, Theater, Smile, 
   Flame, Laugh, Heart as HeartIcon, Star, Maximize,
   Play, Pause, Volume2, VolumeX, FastForward
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

export default function VideoPlayer({ event, isPiPActive, theaterMode, setTheaterMode }) {
   const { theme } = useContext(ThemeContext);
   const isDark = theme === 'dark';
   const videoRef = useRef(null);

   // Elite Media State
   const [isPlaying, setIsPlaying] = useState(true);
   const [volume, setVolume] = useState(() => Number(localStorage.getItem('ss-volume')) || 0.8);
   const [isMuted, setIsMuted] = useState(false);
   const [progress, setProgress] = useState(0);
   const [duration, setDuration] = useState(0);
   const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);

   // HUD Overlay State
   const [hud, setHud] = useState({ type: null, value: null, visible: false });

   const [settingsOpen, setSettingsOpen] = useState(false);
   const [emoteMenuOpen, setEmoteMenuOpen] = useState(false);
   const [quality, setQuality] = useState('Auto');
   const [speed, setSpeed] = useState('1x');
   const [latency, setLatency] = useState('Balanced');
   const [captions, setCaptions] = useState(false);
   const [autoplay, setAutoplay] = useState(true);
   const [floatingEmotes, setFloatingEmotes] = useState([]);
   const [playPauseHUD, setPlayPauseHUD] = useState({ visible: false, type: 'play' });
   const [isVolumeDragging, setIsVolumeDragging] = useState(false);
   const [showMobileVolume, setShowMobileVolume] = useState(false);

   const triggerHUD = (type, value) => {
      setHud({ type, value, visible: true });
   };

   // Handle HUD visibility logic
   useEffect(() => {
      if (hud.visible && !isVolumeDragging && !showMobileVolume) {
         const timer = setTimeout(() => {
            setHud(prev => ({ ...prev, visible: false }));
         }, 800);
         return () => clearTimeout(timer);
      }
   }, [hud.visible, isVolumeDragging]);

   useEffect(() => {
      // Reset state and attempt autoplay logic when source changes
      if (videoRef.current) {
         setIsAutoplayBlocked(false);
         videoRef.current.volume = volume;
         
         const playPromise = videoRef.current.play();
         if (playPromise !== undefined) {
            playPromise.catch(error => {
               console.log("Autoplay blocked - showing overlay", error);
               setIsAutoplayBlocked(true);
               setIsPlaying(false);
            });
         }
      }
   }, [event.videoUrl]);

   const handleManualPlay = () => {
      if (videoRef.current) {
         videoRef.current.muted = false; // Restore old unmute approach
         videoRef.current.play();
         setIsPlaying(true);
         setIsAutoplayBlocked(false);
      }
   };

   const togglePlay = (e) => {
      if (e && e.stopPropagation) e.stopPropagation();
      if (videoRef.current) {
         if (isPlaying) {
            videoRef.current.pause();
            setPlayPauseHUD({ visible: true, type: 'pause' });
         } else {
            videoRef.current.play();
            setPlayPauseHUD({ visible: true, type: 'play' });
         }
         setIsPlaying(!isPlaying);
         setTimeout(() => setPlayPauseHUD(prev => ({ ...prev, visible: false })), 600);
      }
   };

   const handleSeek = (val) => {
      if (!videoRef.current || !duration) return;
      const time = (parseFloat(val) / 100) * duration;
      videoRef.current.currentTime = time;
      setProgress(val);
   };

   const handleVolume = (newVol) => {
      const v = parseFloat(newVol);
      setVolume(v);
      setIsMuted(v === 0);
      if (videoRef.current) videoRef.current.volume = v;
      localStorage.setItem('ss-volume', v);
      triggerHUD('volume', Math.round(v * 100) + '%');
   };

   const handleSpeed = (s) => {
      setSpeed(s);
      const rate = parseFloat(s.replace('x', ''));
      if (videoRef.current) videoRef.current.playbackRate = rate;
      triggerHUD('speed', s);
   };

   const handleQuality = (q) => {
      setQuality(q);
      triggerHUD('quality', q);
   };

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
         onClick={(e) => {
            const isControl = e.target.closest('button') || e.target.closest('input');
            if (isControl) return;

            if (isAutoplayBlocked) {
               handleManualPlay();
            } else {
               togglePlay();
            }
         }}
         className={`w-full relative bg-black overflow-hidden border transition-all duration-500 cursor-pointer group/player ${pipClasses} ${
            theme === 'light' ? 'border-slate-200' : 'border-white/10'
         } ${theaterMode && !isPiPActive ? 'rounded-none aspect-video max-h-[80vh]' : 'rounded-2xl sm:rounded-3xl aspect-video'}`}
      >
         {/* ── Tap-to-Play Ripple HUD ── */}
         <AnimatePresence mode="wait">
            {playPauseHUD.visible && (
               <motion.div
                  key={`playpause-${playPauseHUD.type}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.5 }}
                  className="absolute inset-0 flex items-center justify-center z-[55] pointer-events-none"
               >
                  <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30 shadow-2xl">
                     {playPauseHUD.type === 'play' ? <Play className="w-6 h-6 sm:w-10 sm:h-10 text-white fill-current translate-x-1" /> : <Pause className="w-6 h-6 sm:w-10 sm:h-10 text-white fill-current" />}
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

         {/* ── LIVE badge ── */}
         {event.isLive && (
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
               <div className="bg-rose-500 text-[10px] font-bold px-2.5 py-1 rounded shadow-lg text-white flex items-center gap-1.5 outline-none">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> LIVE
               </div>
            </div>
         )}

         {/* ── Floating Emotes ── */}
         <div className="absolute bottom-6 right-10 pointer-events-none z-[60]">
            <AnimatePresence>
               {floatingEmotes.map((e) => (
                  <motion.div key={e.id} initial={{ opacity: 1, y: 0, x: e.x }} animate={{ opacity: 0, y: -200, x: e.x + (Math.random() * 80 - 40), scale: 2 }} exit={{ opacity: 0 }} transition={{ duration: 1.8 }} className="absolute bottom-0">
                     {EMOTES.find(res => res.id === e.type)?.icon}
                  </motion.div>
               ))}
            </AnimatePresence>
         </div>

         {/* ── Top-Right Utility Cluster (RESTORED) ── */}
         <div className="absolute top-4 right-4 z-40 flex items-center gap-2">
            <div className={`flex items-center gap-2 transition-opacity duration-300 ${isPiPActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
               <button
                  onClick={(e) => { e.stopPropagation(); setSettingsOpen(v => !v); setEmoteMenuOpen(false); }}
                  className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center backdrop-blur-md rounded-full border transition-all outline-none ${
                     settingsOpen ? 'text-indigo-500 border-indigo-400 scale-110 rotate-90' : 'text-white border-white/20 bg-black/40 hover:bg-black/60'
                  }`}
                  title="Settings"
               >
                  <Settings className="w-5 h-5" />
               </button>
            </div>
            <button
               onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
               className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center backdrop-blur-md rounded-full border border-white/20 bg-black/40 hover:bg-black/60 text-white transition-all outline-none hover:scale-110 active:scale-95`}
               title="Full Screen"
            >
               <Maximize className="w-5 h-5" />
            </button>
         </div>

         {/* ── Emoji Button (RESTORED Bubble but at bottom-16) ── */}
         <div className={`absolute bottom-6 sm:bottom-4 right-4 z-50 flex items-center gap-2 transition-opacity duration-300 ${isPiPActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <AnimatePresence>
               {emoteMenuOpen && (
                  <motion.div initial={{ opacity: 0, scale: 0.8, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.8, x: 20 }}
                     className={`flex items-center gap-1 backdrop-blur-2xl border p-1 rounded-l-2xl mr-[-4px] ${
                        isDark ? 'bg-black/40 border-white/15' : 'bg-white/60 border-slate-200 shadow-lg'
                     }`}>
                     {EMOTES.map((e) => (
                        <button key={e.id} onClick={(ev) => { ev.stopPropagation(); handleEmote(e.id); }} className="p-1.5 hover:scale-125 transition-transform outline-none">{e.icon}</button>
                     ))}
                  </motion.div>
               )}
            </AnimatePresence>
            <button onClick={(e) => { e.stopPropagation(); setEmoteMenuOpen(v => !v); setSettingsOpen(false); }}
               className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center backdrop-blur-md rounded-full border outline-none transition-all ${
                  emoteMenuOpen 
                     ? 'border-indigo-500 text-indigo-500 bg-indigo-500/10 rounded-l-none border-l-0' 
                     : (isDark ? 'bg-black/40 border-white/15 text-white hover:bg-black/60' : 'bg-white/60 border-slate-200 text-slate-700 hover:bg-white shadow-md')
               }`}
            >
               <Smile className="w-5 h-5" />
            </button>
         </div>

         {/* ── Adaptive Settings Menu (RESTORED Side Position) ── */}
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

                     <div className="p-4 space-y-5 overflow-y-auto scrollbar-hide">
                        {[
                           { label: 'Quality', icon: <Radio className="w-3 h-3" />, options: QUALITY_OPTIONS, val: quality, set: handleQuality },
                           { label: 'Playback Speed', icon: <Zap className="w-3 h-3" />, options: SPEED_OPTIONS, val: speed, set: handleSpeed },
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
                              { label: 'Theater Mode', icon: <Theater className="w-4 h-4" />, val: theaterMode, toggle: () => setTheaterMode(v => !v) },
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

         {/* ── Cinematic HUD Overlay (RESTORED) ── */}
         <AnimatePresence mode="wait">
            {hud.visible && (
               <motion.div
                  key={`hud-${hud.type}-${hud.value}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.5 }}
                  className="absolute inset-0 flex items-center justify-center z-[60] pointer-events-none px-4"
               >
                  <div className="bg-black/60 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col items-center gap-2 sm:gap-4 border border-white/10 shadow-2xl max-w-[90vw]">
                     <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-indigo-500/20 text-indigo-400">
                        {hud.type === 'volume' && <Volume2 className="w-8 h-8 sm:w-12 sm:h-12" />}
                        {hud.type === 'speed' && <Zap className="w-8 h-8 sm:w-12 sm:h-12" />}
                        {hud.type === 'quality' && <Signal className="w-8 h-8 sm:w-12 sm:h-12" />}
                     </div>
                     <span className="text-xl sm:text-3xl font-black text-white tracking-widest uppercase">{hud.value}</span>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

         {/* ── Autoplay Blocked Overlay (RESTORED) ── */}
         <AnimatePresence>
            {isAutoplayBlocked && (
               <motion.div 
                  key="autoplay-blocked"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 z-[70] flex items-center justify-center bg-black/40 backdrop-blur-sm"
               >
                  <button 
                     onClick={handleManualPlay}
                     className="group flex flex-col items-center gap-4 p-8 rounded-full transition-all hover:scale-110 active:scale-95"
                  >
                     <div className="w-20 h-20 flex items-center justify-center rounded-full bg-indigo-500 text-white shadow-[0_0_30px_rgba(99,102,241,0.5)] group-hover:bg-indigo-400">
                        <Play className="w-10 h-10 fill-current translate-x-1" />
                     </div>
                     <span className="text-sm font-black text-white uppercase tracking-widest drop-shadow-lg">Click to Unmute & Play</span>
                  </button>
               </motion.div>
            )}
         </AnimatePresence>

         {/* ── Bottom Controls Bar (RESTORED SIMPLE) ── */}
         <div className="absolute bottom-0 left-0 right-0 z-40 p-3 sm:p-4 pt-12 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end justify-between group/controls">
            <div className="flex items-center gap-2 sm:gap-4">
               {/* Play/Pause */}
               <button 
                  onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all active:scale-90"
               >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current translate-x-0.5" />}
               </button>

               {/* Volume Cluster */}
               <div className="flex items-center gap-2 group/volume" onClick={(e) => e.stopPropagation()}>
                  <button 
                     onClick={(e) => { 
                        e.stopPropagation(); 
                        if (window.innerWidth < 640) {
                           setShowMobileVolume(!showMobileVolume);
                        } else {
                           handleVolume(volume > 0 ? 0 : 0.8); 
                        }
                     }}
                     className="text-white hover:text-indigo-400 p-1 transition-colors"
                  >
                     {volume === 0 || isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <input 
                     type="range"
                     min="0"
                     max="1"
                     step="0.01"
                     value={volume}
                     onMouseDown={() => setIsVolumeDragging(true)}
                     onMouseUp={() => setIsVolumeDragging(false)}
                     onTouchStart={() => { setIsVolumeDragging(true); setShowMobileVolume(true); }}
                     onTouchEnd={() => setIsVolumeDragging(false)}
                     onChange={(e) => handleVolume(e.target.value)}
                     className={`transition-all duration-300 accent-indigo-500 h-1 appearance-none bg-white/20 rounded-full cursor-pointer ${
                        isVolumeDragging || showMobileVolume ? 'w-24 opacity-100' : 'w-0 opacity-0 sm:group-hover/volume:w-24 sm:group-hover/volume:opacity-100'
                     }`}
                  />
               </div>
            </div>

            {/* Progress Bar (Bottom Edge) */}
            <div className="absolute bottom-0 left-0 right-0 z-[60] px-0 group/progress">
               <input 
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={progress}
                  onChange={(e) => handleSeek(e.target.value)}
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full h-1.5 appearance-none bg-white/10 cursor-pointer accent-indigo-500 hover:h-2.5 transition-all outline-none"
                  style={{
                     background: `linear-gradient(to right, #6366f1 ${progress}%, rgba(255,255,255,0.1) ${progress}%)`
                  }}
               />
            </div>
         </div>

         <video 
            ref={videoRef}
            key={event.videoUrl}
            className="w-full h-full object-cover"
            src={event.videoUrl || 'https://vjs.zencdn.net/v/oceans.mp4'}
            autoPlay
            playsInline
            onTimeUpdate={(e) => setProgress((e.target.currentTime / e.target.duration) * 100)}
            onLoadedMetadata={(e) => setDuration(e.target.duration)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
         >
            <source src={event.videoUrl || 'https://vjs.zencdn.net/v/oceans.mp4'} type="video/mp4" />
         </video>
      </motion.div>
   );
}
