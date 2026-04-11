import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { mockEvents } from '../data/mockEvents';
import VideoPlayer from '../components/Event/VideoPlayer';
import LiveChat from '../components/Event/LiveChat';
import EventInfo from '../components/Event/EventInfo';
import StreamProfilePanel from '../components/Event/StreamProfilePanel';
import SuggestedEvents from '../components/Event/SuggestedEvents';
import { MessageSquarePlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStreaming } from '../context/StreamingContext';
import SEO from '../components/Core/SEO';

export default function EventDetail() {
  const { id } = useParams();
  const event = mockEvents.find((e) => e.id === id);
  const [chatCollapsed, setChatCollapsed] = useState(false);
  const [theaterMode, setTheaterMode] = useState(false);
  
  const { setActiveStream } = useStreaming();
  
  // New state for mobile sticky video overlay
  const [isPiPActive, setIsPiPActive] = useState(false);

  // Set this as the active stream for the global PiP overlay
  useEffect(() => {
    if (event) {
      setActiveStream(event);
    }
  }, [event, setActiveStream]);

  // Sync state with body class for global components (Navbar) to respond
  useEffect(() => {
    if (isPiPActive) document.body.classList.add('pip-active');
    else document.body.classList.remove('pip-active');
    return () => document.body.classList.remove('pip-active');
  }, [isPiPActive]);

  if (!event) return <Navigate to="/" replace />;

  return (
    <div className={`relative transition-all duration-500 ${
      theaterMode ? 'w-full max-w-none px-0' : 'app-container'
    } ${
      isPiPActive ? 'py-0' : theaterMode ? 'pt-0 pb-12' : 'py-4 sm:py-6 lg:py-8'
    }`}>
      <SEO 
        title={event.title} 
        description={`Watch ${event.creator} stream ${event.title} live on StreamSphere. High-fidelity video, custom controls, and more.`}
        image={event.thumbnail}
      />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 transition-all duration-500">

        {/* ── Video Container ── */}
        <div
          className={`
            order-1
            ${theaterMode 
              ? 'lg:col-span-12 overflow-hidden' 
              : chatCollapsed
                ? 'lg:col-start-1 lg:col-span-12'
                : 'lg:col-start-1 lg:col-span-8 xl:col-span-9'}
            lg:row-start-1 min-w-0 relative transition-all duration-500
          `}
        >
          {/* GHOST PLACEHOLDER: accounts for the video space when fixed at top */}
          <div className={`hidden max-lg:block transition-all duration-300 ${isPiPActive ? 'aspect-video w-full' : 'h-0 opacity-0'}`} />

          <VideoPlayer 
            event={event} 
            isPiPActive={isPiPActive} 
            theaterMode={theaterMode}
            setTheaterMode={setTheaterMode}
          />

          <AnimatePresence>
            {chatCollapsed && !isPiPActive && (
              <motion.button
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => setChatCollapsed(false)}
                className="absolute top-16 right-4 z-50 flex items-center gap-2 bg-black/50 hover:bg-black/80 backdrop-blur-md text-white px-3 py-2 rounded-lg border border-white/10 shadow-lg text-sm font-medium transition-colors"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span className="hidden sm:block">Expand Chat</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* ── Chat ── */}
        {!chatCollapsed && (
          <aside
            className={`
              order-2
              ${theaterMode
                ? 'lg:col-span-4 lg:col-start-9 lg:row-start-2'
                : 'lg:col-start-9 xl:col-start-10 lg:col-span-4 xl:col-span-3 lg:row-start-1 lg:row-span-2'}
              min-w-0 self-start lg:sticky lg:top-20 xl:top-24 z-10 transition-all duration-500
            `}
          >
            <LiveChat 
              event={event}
              onCollapse={() => setChatCollapsed(true)} 
              onFocusChange={(focused) => setIsPiPActive(focused && window.innerWidth < 1024)}
            />
          </aside>
        )}

        {/* ── Info/Meta ── */}
        <div
          className={`
            order-3
            ${theaterMode
              ? 'lg:col-span-8 lg:col-start-1 lg:row-start-2'
              : chatCollapsed
                ? 'lg:col-start-1 lg:col-span-12'
                : 'lg:col-start-1 lg:col-span-8 xl:col-span-9'}
            lg:row-start-2 min-w-0 space-y-4 sm:space-y-5 transition-all duration-500
            ${isPiPActive ? 'opacity-30 blur-[2px] pointer-events-none' : ''}
          `}
        >
          <EventInfo event={event} />
          <StreamProfilePanel event={event} />
          <SuggestedEvents currentEventId={event.id} />
        </div>

      </div>
    </div>
  );
}
