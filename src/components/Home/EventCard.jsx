import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Share2, Eye, Calendar } from 'lucide-react';

export default function EventCard({ event }) {
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const status = event.isLive ? `${event.viewers.toLocaleString()} watching` : event.schedule;

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/event/${event.id}`;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } else {
        window.prompt('Copy this link:', shareUrl);
      }
    } catch {
      window.prompt('Copy this link:', shareUrl);
    }
  };

  return (
    <motion.div 
      layout
      whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.008 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.992 }}
      transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.24 }}
      className="group relative bg-[#0a0a0f] rounded-2xl overflow-hidden border border-white/5 hover:border-indigo-300/30 glass-panel-hover flex flex-col h-full shadow-[0_16px_40px_-28px_rgba(0,0,0,0.9)] hover:shadow-[0_28px_70px_-34px_rgba(99,102,241,0.45)]"
      style={{ willChange: 'transform' }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(120%_70%_at_50%_0%,rgba(99,102,241,0.16),transparent_70%)] z-0" />
      <div className="relative aspect-video overflow-hidden bg-black">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
        />
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {event.isLive && (
            <span className="px-2 py-1 bg-rose-500/90 backdrop-blur-md text-[10px] font-bold tracking-wider text-white rounded flex items-center gap-1.5 shadow-[0_0_15px_rgba(244,63,94,0.4)]">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> LIVE
            </span>
          )}
          <span className="px-2 py-1 glass-panel text-[10px] font-medium tracking-wide text-neutral-200 rounded">
            {event.category}
          </span>
        </div>

        {event.isLive && (
          <div className="absolute top-3 right-3 rounded-full border border-white/15 bg-black/45 backdrop-blur-md px-2.5 py-1 text-[10px] text-neutral-200">
            {event.viewers.toLocaleString()} watching
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-indigo-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
          <Link 
            to={`/event/${event.id}`}
          className="flex items-center gap-2 bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 backdrop-blur-md px-6 py-2.5 rounded-full shadow-2xl transition-all duration-200 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 font-semibold text-sm"
          >
            <Eye className="w-4 h-4" /> Watch Now
          </Link>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-4 mb-3">
          <h3 className="font-semibold text-base md:text-lg text-white leading-tight line-clamp-2" title={event.title}>
            {event.title}
          </h3>
          <motion.button 
            whileHover={shouldReduceMotion ? undefined : { scale: 1.1 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
            onClick={(e) => { e.preventDefault(); setIsLiked(!isLiked); }}
            className={`p-1.5 rounded-full mt-0.5 transition-colors ${
              isLiked ? 'text-rose-500 bg-rose-500/10' : 'text-neutral-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Heart className={`w-5 h-5 transition-transform ${isLiked ? 'fill-rose-500 scale-110' : ''}`} />
          </motion.button>
        </div>

        <p className="text-neutral-400 text-sm mb-4 font-light">
          by <span className="text-neutral-200 font-medium hover:text-indigo-400 transition-colors cursor-pointer">{event.creator}</span>
        </p>

        {event.previewMessage && (
          <p className="text-xs text-neutral-400/90 leading-relaxed mb-4 line-clamp-2">
            {event.previewMessage}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <div className="flex items-center text-xs text-neutral-400 font-medium tracking-wide">
            {event.isLive ? (
              <div className="flex items-center text-rose-400 gap-1.5">
                <Eye className="w-4 h-4" />
                {status}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 opacity-70">
                <Calendar className="w-4 h-4" />
                {status}
              </div>
            )}
          </div>
          
          <motion.button
            whileHover={shouldReduceMotion ? undefined : { scale: 1.08, rotate: 3 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
            onClick={handleShare}
            className="text-neutral-500 hover:text-neutral-200 transition-colors p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
            title={copied ? 'Copied!' : 'Copy event link'}
          >
            <Share2 className="w-4 h-4" />
          </motion.button>
        </div>
        {copied && <p className="mt-2 text-[11px] text-emerald-300">Link copied to clipboard</p>}
      </div>
    </motion.div>
  );
}
