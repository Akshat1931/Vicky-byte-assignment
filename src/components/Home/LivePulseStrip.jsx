import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { mockEvents } from '../../data/mockEvents';
import { useStreaming } from '../../context/StreamingContext';

export default function LivePulseStrip() {
  const liveEvents = mockEvents.filter((event) => event.isLive).slice(0, 8);
  const items = [...liveEvents, ...liveEvents];
  const { setActiveStream } = useStreaming();
  const navigate = useNavigate();

  if (liveEvents.length === 0) return null;

  return (
    <section className="app-container -mt-6 md:-mt-10 relative z-30">
      <div className="rounded-2xl border border-white/10 glass-panel px-3 py-2 overflow-hidden">
        <div className="mb-2 flex items-center justify-between px-2">
          <p className="text-[11px] uppercase tracking-[0.14em] text-rose-300 font-semibold">Live Pulse</p>
          <p className="text-[11px] text-neutral-400">{liveEvents.length} channels live</p>
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-2 w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
          >
            {items.map((event, index) => (
              <div
                key={`${event.id}-${index}`}
                onClick={() => {
                  setActiveStream(null);
                  navigate(`/event/${event.id}`);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white whitespace-nowrap cursor-pointer hover:bg-white/10 transition-colors active:scale-95"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse" />
                <span className="font-medium">{event.title}</span>
                <span className="text-neutral-400">{event.viewers.toLocaleString()} watching</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
