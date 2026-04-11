import { useState, useContext, useEffect, useLayoutEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStreaming } from '../../context/StreamingContext';

export default function PipOverlay() {
  const { theme } = useContext(ThemeContext);
  const { 
    activeStream, setActiveStream, 
    isManualPiP, setIsManualPiP,
    volume, setGlobalVolume, 
    isMuted, setGlobalMuted 
  } = useStreaming();
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef(null);
  const lastSyncedTime = useRef(0);
  
  const isLight = theme === 'light';

  // Logic: Show PiP only when NOT on an event detail page (OR manual PiP is active) AND a stream is active
  useEffect(() => {
    const isEventPage = location.pathname.startsWith('/event/');
    const shouldShow = (!isEventPage && activeStream) || (isEventPage && isManualPiP && activeStream);

    if (shouldShow) {
      setIsVisible(true);
    } else {
      if (isVisible) {
        setIsVisible(false);
        // Clean up when hidden to stop audio immediately
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.src = "";
          videoRef.current.load();
        }
      }
    }
  }, [location.pathname, activeStream, isManualPiP, isVisible]);

  // Reactive Seek: Sync PiP with actual timestamp as it arrives
  useEffect(() => {
     if (videoRef.current && isVisible && activeStream?.timestamp) {
        const diff = Math.abs(videoRef.current.currentTime - activeStream.timestamp);
        // Only seek if we are more than 1 second off (prevent loop)
        if (diff > 1 && activeStream.timestamp > lastSyncedTime.current) {
           videoRef.current.currentTime = activeStream.timestamp;
           lastSyncedTime.current = activeStream.timestamp;
        }
     }
  }, [activeStream?.timestamp, isVisible]);

  // Handle play/pause state
  useEffect(() => {
    if (videoRef.current && isVisible) {
      if (isPaused) videoRef.current.pause();
      else videoRef.current.play().catch(() => {});
    }
  }, [isPaused, isVisible]);

  // Sync Volume/Mute with hardware - SHIELD: Use useLayoutEffect for zero-latency sync
  useLayoutEffect(() => {
     if (videoRef.current) {
        videoRef.current.volume = volume;
        videoRef.current.muted = isMuted;
     }
  }, [volume, isMuted]);

  const handleVolumeChange = (newVal) => {
     setGlobalVolume(newVal);
  };

  if (!isVisible || !activeStream) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeStream.id}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        className="fixed bottom-24 right-4 md:bottom-28 md:right-10 z-[999] w-64 md:w-80 group"
      >
        <div className={`overflow-hidden rounded-2xl border shadow-2xl transition-all duration-300 ${
          isLight 
          ? 'bg-white/80 border-slate-200 backdrop-blur-xl shadow-slate-200/50' 
          : 'bg-[#0d0f14]/80 border-white/10 backdrop-blur-xl shadow-black/80'
        }`}>
          {/* Header / Controls */}
          <div className="absolute top-0 left-0 right-0 p-3 flex items-center justify-between opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-20 bg-gradient-to-b from-black/60 to-transparent">
             <button 
                onClick={() => setActiveStream(null)}
                className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-rose-500 transition-all"
                title="Dismiss PiP"
             >
                <X className="w-4 h-4" />
             </button>
             <button 
                onClick={() => {
                   if (videoRef.current) {
                      const currentTime = videoRef.current.currentTime;
                      setActiveStream(prev => prev ? { ...prev, timestamp: currentTime } : null);
                   }
                   setIsManualPiP(false);
                   setIsVisible(false);
                   navigate(`/event/${activeStream.id}`);
                 }}
                className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-indigo-500 transition-all"
                title="Expand to Full View"
             >
                <Maximize2 className="w-4 h-4" />
             </button>
          </div>

          {/* Video Player Engine */}
          <div className="aspect-video relative bg-black flex items-center justify-center overflow-hidden">
             <video
               ref={videoRef}
               src={activeStream.videoUrl || "https://vjs.zencdn.net/v/oceans.mp4"}
               autoPlay
               muted={isMuted}
               playsInline
               loop
               onTimeUpdate={(e) => {
                  const time = e.target.currentTime;
                  // Heartbeat Sync: Update global context every 5 seconds
                  // SHIELD: Ignore time < 1 to prevent Mount-Zero wipe
                  if (time > 1 && Math.floor(time) % 5 === 0 && Math.floor(time) !== Math.floor(activeStream?.timestamp || 0)) {
                     setActiveStream({ ...activeStream, timestamp: time });
                  }
               }}
               onPlay={() => {
                  if (videoRef.current) videoRef.current.volume = volume;
               }}
               onLoadedMetadata={() => {
                  if (videoRef.current) videoRef.current.volume = volume;
                  if (activeStream?.timestamp && videoRef.current) {
                     videoRef.current.currentTime = activeStream.timestamp;
                  }
               }}
               className={`w-full h-full object-cover transition-all duration-500 ${isPaused ? 'grayscale' : ''}`}
             />
             
             {/* Center Play/Pause Control */}
             <button 
                onClick={() => setIsPaused(!isPaused)}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20"
             >
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                   {isPaused ? <Play className="w-6 h-6 fill-white" /> : <Pause className="w-6 h-6 fill-white" />}
                </div>
             </button>

             {/* Live indicator if applicable */}
             {activeStream.isLive && (
               <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-rose-500 text-[8px] font-black text-white uppercase tracking-widest">
                  Live
               </div>
             )}
          </div>

          {/* Info Area */}
          <div className="p-3">
             <h4 className={`text-[11px] font-black truncate tracking-tight transition-colors ${
               isLight ? 'text-black' : 'text-white'
             }`}>
                {activeStream.title}
             </h4>
             <div className="flex items-center gap-2 mt-1">
                <p className="text-[10px] font-bold text-neutral-500 mr-auto">{activeStream.creator}</p>
                
                <div className="flex items-center gap-2 group/vol">
                   <button 
                      onClick={() => setGlobalMuted(!isMuted)}
                      className="text-neutral-500 hover:text-indigo-500 transition-colors"
                   >
                      {(isMuted || volume === 0) ? <VolumeX className="w-3 h-3 text-rose-500" /> : <Volume2 className="w-3 h-3 text-indigo-500" />}
                   </button>
                   
                   <div className="relative w-16 h-4 flex items-center">
                      {/* Custom Slider Track */}
                      <div className="absolute inset-0 top-1/2 -translate-y-1/2 h-1 bg-neutral-200 dark:bg-white/10 rounded-full overflow-hidden">
                         <div 
                            className={`h-full bg-indigo-500 transition-all ${isMuted ? 'w-0' : ''}`} 
                            style={{ width: isMuted ? '0%' : `${volume * 100}%` }}
                         />
                      </div>
                      {/* Transparent Range Input Overlay */}
                      <input 
                         type="range"
                         min="0"
                         max="1"
                         step="0.01"
                         value={isMuted ? 0 : volume}
                         onChange={(e) => handleVolumeChange(e.target.value)}
                         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer accent-indigo-500"
                      />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
