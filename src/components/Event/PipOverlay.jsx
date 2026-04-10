import { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Play, Pause, Volume2 } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PipOverlay() {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Example state - in a real app this would come from a global VideoContext
  const [activeStream, setActiveStream] = useState({
    id: 'live-1',
    title: 'Global E-Sports 2026',
    creator: 'ESL Network'
  });

  const isLight = theme === 'light';

  // Logic: Show PiP only when NOT on an event detail page
  useEffect(() => {
    const isEventPage = location.pathname.startsWith('/event/');
    // For demo purposes, we'll show it if the user has "navigated away" from a stream
    // In a real implementation, this would trigger when a video is already playing
    if (!isEventPage && activeStream) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [location.pathname, activeStream]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        className="fixed bottom-6 right-6 z-[999] w-72 md:w-80 group"
      >
        <div className={`overflow-hidden rounded-2xl border shadow-2xl transition-all duration-300 ${
          isLight 
          ? 'bg-white/80 border-slate-200 backdrop-blur-xl shadow-slate-200/50' 
          : 'bg-[#0d0f14]/80 border-white/10 backdrop-blur-xl shadow-black/80'
        }`}>
          {/* Header / Controls */}
          <div className="absolute top-0 left-0 right-0 p-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity z-20 bg-gradient-to-b from-black/60 to-transparent">
             <button 
                onClick={() => setIsVisible(false)}
                className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-rose-500 transition-all"
             >
                <X className="w-4 h-4" />
             </button>
             <button 
                onClick={() => navigate(`/event/${activeStream.id}`)}
                className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-indigo-500 transition-all"
             >
                <Maximize2 className="w-4 h-4" />
             </button>
          </div>

          {/* Video / Thumbnail Area */}
          <div className="aspect-video relative bg-black flex items-center justify-center overflow-hidden">
             <img 
               src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070" 
               alt="Pip Preview"
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

             {/* Live indicator */}
             <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-rose-500 text-[8px] font-black text-white uppercase tracking-widest">
                Live
             </div>
          </div>

          {/* Info Area */}
          <div className="p-3">
             <h4 className={`text-[11px] font-black truncate tracking-tight transition-colors ${
               isLight ? 'text-black' : 'text-white'
             }`}>
                {activeStream.title}
             </h4>
             <div className="flex items-center justify-between mt-1">
                <p className="text-[10px] font-bold text-neutral-500">{activeStream.creator}</p>
                <div className="flex items-center gap-2 text-neutral-500">
                   <Volume2 className="w-3 h-3" />
                   <div className="w-12 h-1 bg-neutral-200 dark:bg-white/10 rounded-full overflow-hidden">
                      <div className="w-2/3 h-full bg-indigo-500" />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
