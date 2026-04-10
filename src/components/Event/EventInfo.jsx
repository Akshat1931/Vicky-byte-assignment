import { useState, useCallback } from 'react';
import { Share2, Heart as HeartIcon, EllipsisVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EventInfo({ event }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle Like ONLY (Professional behavior)
  const handleLike = useCallback(() => {
    setLiked(prev => !prev);
  }, []);

  const likeCount = liked ? event.likes + 1 : event.likes;

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="mt-7 mb-10"
    >
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-5 tracking-tight leading-tight">{event.title}</h1>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-7 border-b border-white/5 relative z-50">
        {/* Creator Info */}
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg ring-2 ring-white/10 shadow-lg">
            {event.creator.charAt(0)}
          </div>
          <div>
            <h3 className="text-white font-semibold text-base md:text-lg leading-tight tracking-wide">{event.creator}</h3>
            <p className="text-neutral-400 text-xs md:text-sm font-light">2.4M followers</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSubscribed((v) => !v)}
            className={`ml-2 sm:ml-6 font-semibold text-xs md:text-sm px-4 py-2 md:px-5 md:py-2.5 rounded-full transition-colors duration-200 shadow-xl ${
              isSubscribed ? 'bg-white/10 text-white border border-white/20 hover:bg-white/15' : 'bg-white text-black hover:bg-neutral-200'
            }`}
          >
            {isSubscribed ? 'Subscribed' : 'Subscribe'}
          </motion.button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mt-4 sm:mt-0 relative w-full sm:w-auto">
          {/* Donate */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-[0_4px_12px_rgba(99,102,241,0.3)]"
          >
            Donate
          </motion.button>
          
          {/* Like Button (Toggle) */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLike}
            className={`flex items-center gap-2 border px-4 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 shadow-lg ${
              liked 
                ? 'bg-rose-500/10 border-rose-500/40 text-rose-400' 
                : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
            }`}
          >
            <HeartIcon className={`w-3.5 h-3.5 sm:w-4 h-4 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} /> 
            {likeCount.toLocaleString()}
          </motion.button>

          {/* Share */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-4 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all shadow-lg"
          >
            <Share2 className="w-3.5 h-3.5 sm:w-4 h-4" /> 
            <span className="hidden xs:block">{copied ? 'Copied' : 'Share'}</span>
          </motion.button>

          {/* More Menu */}
          <div className="relative isolate ml-auto sm:ml-0">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMenuOpen((v) => !v)}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full transition-all shadow-lg"
            >
              <EllipsisVertical className="w-4 h-4" />
            </motion.button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-white/10 bg-[#0d0f14]/95 backdrop-blur-xl p-1.5 shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-[200]"
                >
                  <button onClick={() => setMenuOpen(false)} className="w-full rounded-lg px-3 py-2 text-left text-sm text-rose-400 hover:bg-white/5 transition-colors">Report stream</button>
                  <button onClick={() => setMenuOpen(false)} className="w-full rounded-lg px-3 py-2 text-left text-sm text-neutral-100 hover:bg-white/5 transition-colors">Save for later</button>
                  <button onClick={() => setMenuOpen(false)} className="w-full rounded-lg px-3 py-2 text-left text-sm text-neutral-100 hover:bg-white/5 transition-colors">Not interested</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Stats & Description */}
      <div className="mt-7 glass-panel rounded-2xl p-5 md:p-7 relative z-10">
        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-medium text-neutral-400 mb-6 tracking-wide">
          <span className="text-white">{event.viewers.toLocaleString()} views</span>
          <span className="w-1 h-1 bg-white/20 rounded-full" />
          <span>Premiered {event.schedule}</span>
          <span className="text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer ml-auto">#{event.category}</span>
        </div>
        <p className="text-neutral-300 leading-relaxed whitespace-pre-wrap font-light text-sm md:text-base">
          {event.description}
          <br /><br />
          Join {event.creator} in this exclusive live broadcast! Don't forget to like and subscribe for more amazing content to never miss another drop.
        </p>
      </div>
    </motion.div>
  );
}
