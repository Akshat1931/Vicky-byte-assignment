import { useState } from 'react';
import { Share2, Heart, EllipsisVertical } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EventInfo({ event }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
      <h1 className="text-3xl md:text-4xl font-semibold text-white mb-5 tracking-tight leading-tight">{event.title}</h1>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-7 border-b border-white/5">
        {/* Creator Info */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl ring-2 ring-white/10 shadow-lg">
            {event.creator.charAt(0)}
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg leading-tight tracking-wide">{event.creator}</h3>
            <p className="text-neutral-400 text-sm font-light">2.4M followers</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSubscribed((v) => !v)}
            className={`ml-0 sm:ml-6 font-semibold text-sm px-5 py-2.5 rounded-full transition-colors duration-200 shadow-xl ${
              isSubscribed ? 'bg-white/10 text-white border border-white/20 hover:bg-white/15' : 'bg-white text-black hover:bg-neutral-200'
            }`}
          >
            {isSubscribed ? 'Subscribed' : 'Subscribe'}
          </motion.button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLiked((v) => !v)}
            className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-4 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 shadow-lg"
          >
            <Heart className={`w-4 h-4 ml-[-2px] ${liked ? 'fill-rose-500 text-rose-500' : ''}`} /> 
            {likeCount.toLocaleString()}
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-4 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 shadow-lg"
          >
            <Share2 className="w-4 h-4 ml-[-2px]" /> 
            {copied ? 'Copied' : 'Share'}
          </motion.button>
          <div className="relative">
            <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMenuOpen((v) => !v)}
            className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full transition-colors duration-200 flex-shrink-0 shadow-lg"
            >
              <EllipsisVertical className="w-4 h-4" />
            </motion.button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-lg border border-white/10 bg-[#090b12] p-1.5 shadow-xl">
                <button className="w-full rounded-md px-2 py-2 text-left text-sm text-neutral-100 hover:bg-white/5">Report stream</button>
                <button className="w-full rounded-md px-2 py-2 text-left text-sm text-neutral-100 hover:bg-white/5">Save for later</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-7 glass-panel rounded-2xl p-5 md:p-7">
        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-neutral-400 mb-6 tracking-wide">
          <span className="text-white">{event.viewers.toLocaleString()} views</span>
          <span className="w-1 h-1 bg-white/20 rounded-full" />
          <span>Premiered {event.schedule}</span>
          <span className="text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer ml-auto">#{event.category}</span>
        </div>
        <p className="text-neutral-300 leading-relaxed whitespace-pre-wrap font-light text-sm md:text-[15px]">
          {event.description}
          <br /><br />
          Join {event.creator} in this exclusive live broadcast! Don't forget to like and subscribe for more amazing content to never miss another drop.
        </p>
      </div>
    </motion.div>
  );
}
