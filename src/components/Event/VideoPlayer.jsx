import { motion } from 'framer-motion';

export default function VideoPlayer({ event }) {
  const videoId = "jfKfPfyJRdk"; // Lofi girl stream

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="w-full relative aspect-video bg-black rounded-2xl sm:rounded-3xl lg:rounded-[28px] overflow-hidden border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] max-w-full"
    >
      {event.isLive && (
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 flex gap-3">
          <div className="bg-rose-500/90 text-white text-[10px] tracking-widest font-bold px-3 py-1.5 rounded flex items-center gap-2 shadow-[0_0_15px_rgba(244,63,94,0.4)] backdrop-blur-md">
            <div className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
            </div>
            LIVE
          </div>
          <div className="bg-black/40 backdrop-blur-xl text-white text-[11px] font-medium px-3 py-1.5 rounded flex items-center gap-1.5 border border-white/10 shadow-lg">
            <span className="text-rose-400">●</span> {event.viewers.toLocaleString()}
          </div>
        </div>
      )}
      
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1`}
        title="Live Stream"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </motion.div>
  );
}
