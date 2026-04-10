import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { mockEvents } from '../data/mockEvents';
import VideoPlayer from '../components/Event/VideoPlayer';
import LiveChat from '../components/Event/LiveChat';
import EventInfo from '../components/Event/EventInfo';
import StreamControls from '../components/Event/StreamControls';
import StreamProfilePanel from '../components/Event/StreamProfilePanel';
import SuggestedEvents from '../components/Event/SuggestedEvents';
import { MessageSquarePlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EventDetail() {
  const { id } = useParams();
  const event = mockEvents.find((e) => e.id === id);
  const [chatCollapsed, setChatCollapsed] = useState(false);

  if (!event) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="app-container py-4 sm:py-6 lg:py-8 max-w-[1600px] relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 md:gap-6 xl:gap-8 transition-all duration-500 ease-in-out">
        
        {/* Video Player Column */}
        <div className={`order-1 lg:order-none ${chatCollapsed ? 'lg:col-span-12' : 'lg:col-span-8 xl:col-span-9'} lg:row-start-1 min-w-0 transition-all duration-500 ease-in-out relative`}>
          <VideoPlayer event={event} />
          
          {/* Uncollapse Chat Floating Button */}
          <AnimatePresence>
            {chatCollapsed && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setChatCollapsed(false)}
                className="absolute top-4 right-4 z-50 flex items-center gap-2 bg-black/50 hover:bg-black/80 backdrop-blur-md text-white px-3 py-2 rounded-lg border border-white/10 shadow-lg text-sm font-medium transition-colors"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span className="hidden sm:block">Expand Chat</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Live Chat Column */}
        {!chatCollapsed && (
          <aside className="order-2 lg:order-none lg:col-span-4 xl:col-span-3 lg:row-start-1 lg:row-span-2 min-w-0 self-start lg:sticky lg:top-20 xl:top-24 z-10 transition-all duration-500">
            <LiveChat onCollapse={() => setChatCollapsed(true)} />
          </aside>
        )}

        {/* Meta Controls & Info */}
        <div className={`order-3 lg:order-none ${chatCollapsed ? 'lg:col-span-8 xl:col-span-9' : 'lg:col-span-8 xl:col-span-9'} lg:row-start-2 min-w-0 space-y-4 sm:space-y-5 transition-all duration-500 mx-auto w-full`}>
          <StreamControls event={event} />
          <EventInfo event={event} />
          <StreamProfilePanel event={event} />
          <SuggestedEvents currentEventId={event.id} />
        </div>
      </div>
    </div>
  );
}
