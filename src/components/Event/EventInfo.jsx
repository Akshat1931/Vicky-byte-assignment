import { useState, useCallback, useEffect } from 'react';
import { Share2, Heart as HeartIcon, EllipsisVertical, X, Flag, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import HypeBurst from './HypeBurst';

const AVATAR_COLORS = [
  'from-rose-500 to-pink-600', 'from-indigo-500 to-blue-600',
  'from-emerald-500 to-teal-600', 'from-amber-500 to-orange-600',
  'from-violet-500 to-purple-600', 'from-cyan-500 to-sky-500',
  'from-fuchsia-500 to-rose-600', 'from-lime-500 to-green-600',
];

function avatarColor(creator) {
  let h = 0;
  for (let i = 0; i < (creator || '').length; i++) h = creator.charCodeAt(i) + ((h << 5) - h);
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

const REPORT_REASONS = [
  "Inappropriate Content",
  "Copyright / Stolen",
  "Spam or Scams",
  "Harassment",
  "Other"
];

export default function EventInfo({ event }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reportStep, setReportStep] = useState('none');
  const [donateStep, setDonateStep] = useState('none'); // 'none', 'tiers', 'success'
  const [isSaved, setIsSaved] = useState(false);
  const [showHype, setShowHype] = useState(false);

  // Toggle Like ONLY (Professional behavior)
  const handleLike = useCallback(() => {
    const nextLiked = !liked;
    setLiked(nextLiked);
    if (nextLiked) {
      setShowHype(true);
      setTimeout(() => setShowHype(false), 800);
    }
  }, [liked]);

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

  useEffect(() => {
    if (reportStep === 'success' || donateStep === 'success') {
      const timer = setTimeout(() => {
        setReportStep('none');
        setDonateStep('none');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [reportStep, donateStep]);

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
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-tr ${avatarColor(event.creator)} flex items-center justify-center text-white font-bold text-lg ring-2 shadow-lg ${
            isLight ? 'ring-white/10' : 'ring-white/10'
          }`}>
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
            onClick={() => setDonateStep('tiers')}
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
            <HypeBurst active={showHype} />
          </motion.button>

          {/* Share */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className={`flex items-center gap-2 border px-4 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 shadow-lg ${
              copied 
                ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-400' 
                : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
            }`}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} key="check">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 h-4 text-indigo-400" />
                </motion.div>
              ) : (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} key="share">
                  <Share2 className="w-3.5 h-3.5 sm:w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
            <span className="hidden xs:block">{copied ? 'Link Copied' : 'Share'}</span>
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
                  className={`absolute right-0 top-full mt-2 w-48 rounded-xl border p-1.5 shadow-2xl z-[200] ${
                    isLight ? 'bg-white border-slate-200' : 'bg-[#0d0f14]/95 border-white/10 backdrop-blur-xl'
                  }`}
                >
                  <button 
                    onClick={() => { setReportStep('reasons'); setMenuOpen(false); }} 
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      isLight ? 'text-rose-600 hover:bg-rose-50' : 'text-rose-400 hover:bg-white/5'
                    }`}
                  >
                    Report stream
                  </button>
                  <button 
                    onClick={() => { setIsSaved(!isSaved); setMenuOpen(false); }} 
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors flex items-center justify-between group ${
                      isSaved 
                        ? 'text-indigo-400 bg-white/5' 
                        : (isLight ? 'text-slate-700 hover:bg-slate-50' : 'text-neutral-100 hover:bg-white/5')
                    }`}
                  >
                    {isSaved ? 'Saved in library' : 'Save for later'}
                    {isSaved && <CheckCircle2 className="w-3 h-3 text-indigo-400" />}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {(reportStep !== 'none' || donateStep !== 'none') && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className={`absolute right-0 top-full mt-2 w-64 rounded-2xl border p-4 shadow-2xl z-[300] ${
                    isLight ? 'bg-white border-slate-200' : 'bg-[#12141a] border-white/10 backdrop-blur-3xl'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className={`text-xs font-black uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {reportStep !== 'none' ? 'Report Stream' : 'Support Creator'}
                    </h4>
                    <button onClick={() => { setReportStep('none'); setDonateStep('none'); }} className={`p-1 rounded-full transition-colors ${isLight ? 'hover:bg-slate-100 text-slate-400' : 'hover:bg-white/10 text-white/60'}`}>
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Donate Flow */}
                  {donateStep === 'tiers' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        {[2, 5, 10, 20].map(amt => (
                          <button
                            key={amt}
                            onClick={() => { setDonateStep('success'); setShowHype(true); setTimeout(() => setShowHype(false), 2000); }}
                            className="bg-indigo-500/10 hover:bg-indigo-500 border border-indigo-500/20 hover:border-indigo-400 text-indigo-400 hover:text-white font-black py-2.5 rounded-xl transition-all active:scale-95"
                          >
                            ${amt}
                          </button>
                        ))}
                      </div>
                      
                      <div className="relative pt-2 border-t border-white/10">
                        <div className="flex items-center gap-2">
                           <div className="relative flex-1">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 font-bold">$</span>
                              <input 
                                 type="number" 
                                 placeholder="Custom Tip"
                                 className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-7 pr-3 text-xs font-bold text-white focus:outline-none focus:border-indigo-500/50 transition-all"
                                 onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                       setDonateStep('success');
                                       setShowHype(true);
                                       setTimeout(() => setShowHype(false), 2000);
                                    }
                                 }}
                              />
                           </div>
                           <button 
                              onClick={() => { setDonateStep('success'); setShowHype(true); setTimeout(() => setShowHype(false), 2000); }}
                              className="bg-indigo-500 hover:bg-indigo-600 text-white p-2.5 rounded-xl transition-all active:scale-95"
                           >
                              <CheckCircle2 className="w-4 h-4" />
                           </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {donateStep === 'success' && (
                    <div className="text-center py-4 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 mx-auto">
                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }}>
                          <HeartIcon className="w-6 h-6 text-emerald-400 fill-emerald-400" />
                        </motion.div>
                      </div>
                      <div>
                        <p className="font-black text-xs uppercase tracking-tight text-white mb-1">Donation Sent!</p>
                        <p className="text-[11px] text-white/60 leading-relaxed">Thank you for supporting the stream!</p>
                      </div>
                    </div>
                  )}

                  {/* Report Flow */}
                  {reportStep === 'reasons' && (
                    <div className="space-y-1.5">
                      {REPORT_REASONS.map(reason => (
                        <button
                          key={reason}
                          onClick={() => setReportStep('success')}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 flex items-center justify-between group ${
                            isLight ? 'text-slate-700 bg-slate-50 hover:bg-indigo-600 hover:text-white' : 'text-white/80 bg-white/5 hover:bg-indigo-600 hover:text-white'
                          }`}
                        >
                          {reason}
                          <Flag className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  )}

                  {reportStep === 'success' && (
                    <div className="text-center py-4 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 mx-auto relative">
                        <CheckCircle2 className="w-6 h-6 text-indigo-400" />
                      </div>
                      <div>
                        <p className={`font-black text-xs uppercase tracking-tight mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>Report Submitted</p>
                        <p className={`text-[11px] leading-relaxed ${isLight ? 'text-slate-500' : 'text-white/60'}`}>Thanks for the feedback!</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Stats & Description */}
      <div className="mt-7 glass-panel rounded-2xl p-5 md:p-7 relative z-10 transition-colors">
        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-medium text-neutral-400 mb-6 tracking-wide">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${event.isLive ? 'bg-rose-500 animate-pulse' : 'bg-indigo-500'}`} />
            <span className={isLight ? 'text-slate-900 font-bold' : 'text-white'}>
               {event.isLive ? `${event.viewers.toLocaleString()} watching` : event.schedule}
            </span>
          </div>
          <span className="w-1 h-1 bg-white/20 rounded-full" />
          <span className={isLight ? 'text-slate-500' : ''}>Performance in {event.category}</span>
          <div className="ml-auto flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-widest border border-indigo-500/20">
              #{event.category}
            </span>
          </div>
        </div>
        <p className={`leading-relaxed whitespace-pre-wrap font-light text-sm md:text-base ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
          {event.description}
          <br /><br />
          Join {event.creator} in this exclusive live broadcast! Don't forget to like and subscribe for more amazing content to never miss another drop.
        </p>
      </div>
    </motion.div>
  );
}
