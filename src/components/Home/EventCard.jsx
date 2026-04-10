import { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Share2, Eye, Calendar, MoreVertical, X, Ban, Link2, RotateCcw, Flag, CheckCircle2 } from 'lucide-react';
import { useStreaming } from '../../context/StreamingContext';
import { useTheme } from '../../context/ThemeContext';

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

function initials(creator) {
  return (creator || '??').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function formatNum(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  return (n || 0).toString();
}

const REPORT_REASONS = [
  "Inappropriate Content",
  "Copyright / Stolen",
  "Spam or Scams",
  "Harassment",
  "Other"
];

export default function EventCard({ event }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { hideEvent } = useStreaming();
  
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(event.likes || 0);
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reportStep, setReportStep] = useState('none'); // 'none', 'reasons', 'success'
  const [imgError, setImgError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  
  const menuRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => { 
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); 
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  useEffect(() => {
    if (reportStep === 'success') {
      const timer = setTimeout(() => {
        setReportStep('none');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [reportStep]);

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(v => { setLikeCount(c => v ? c - 1 : c + 1); return !v; });
  };

  const handleShare = async (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    const url = `${window.location.origin}/event/${event.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link');
    }
    setMenuOpen(false);
  };

  const startReport = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setReportStep('reasons');
    setMenuOpen(false);
  };

  return (
    <div className="group flex flex-col relative">
      {/* Thumbnail Area */}
      <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-white/5 border border-white/5 shadow-2xl">
        <Link to={`/event/${event.id}`} className="block w-full h-full">
          {!imgError ? (
            <img 
              src={event.imageUrl} 
              alt={event.title}
              onError={() => setImgError(true)}
              className={`w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ${reportStep !== 'none' ? 'blur-md' : ''}`}
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${avatarColor(event.category)} flex items-center justify-center opacity-60`}>
              <Link2 className="w-10 h-10 text-white/40" />
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

          {/* Premium Badges */}
          <div className="absolute top-2.5 left-2.5 z-30 flex flex-col gap-2">
            {event.isLive ? (
              <span className="flex items-center gap-1.5 bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-xl shadow-rose-600/40 border border-white/20">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> LIVE
              </span>
            ) : (
              <span className="flex items-center gap-1.5 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-xl shadow-indigo-600/40 border border-white/20">
                <Calendar className="w-3 h-3" /> Upcoming
              </span>
            )}
          </div>

          {/* Status info - Bottom Left */}
          <div className="absolute bottom-3 left-3 text-white z-20">
             <div className="flex flex-col">
                <p className="text-[10px] font-black uppercase tracking-wider opacity-60 mb-0.5">
                   {event.isLive ? 'Viewers' : 'Schedule'}
                </p>
                <p className="text-xs font-bold leading-none">
                   {event.isLive ? formatNum(event.viewers) : event.schedule}
                </p>
             </div>
          </div>

          {/* Watch Now Overlay */}
          {reportStep === 'none' && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 backdrop-blur-[1px] z-10">
               <div className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-black uppercase tracking-widest shadow-2xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  Watch Now
               </div>
            </div>
          )}
        </Link>

        {/* Professional Report Overlay */}
        <AnimatePresence>
          {reportStep !== 'none' && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 z-40 bg-black/60 backdrop-blur-md flex flex-col p-4 sm:p-6"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white text-sm font-black uppercase tracking-wider">Report Event</h4>
                <button onClick={() => setReportStep('none')} className="p-1 hover:bg-white/10 rounded-full text-white/60 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {reportStep === 'reasons' && (
                <div className="flex-1 flex flex-col gap-1.5 overflow-y-auto pr-1">
                  <p className="text-[11px] text-white/50 font-bold mb-1 uppercase tracking-widest">Select a reason:</p>
                  {REPORT_REASONS.map(reason => (
                    <button
                      key={reason}
                      onClick={() => setReportStep('success')}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-white/80 bg-white/5 border border-white/5 hover:bg-indigo-600 hover:text-white hover:border-indigo-400 transition-all active:scale-95 flex items-center justify-between group"
                    >
                      {reason}
                      <Flag className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              )}

              {reportStep === 'success' && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                    <CheckCircle2 className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-white font-black text-sm mb-1 uppercase tracking-tight">Report Submitted</p>
                    <p className="text-white/60 text-[11px] leading-relaxed max-w-[180px]">Thanks for the feedback! This helps us keep StreamSphere safe.</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content Area */}
      <div className="mt-4 flex gap-3 px-0.5">
        <Link to="/profile" className="flex-shrink-0">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColor(event.creator)} flex items-center justify-center text-white ring-2 shadow-xl overflow-hidden ${
            isLight ? 'ring-white' : 'ring-[#0a0a0f]'
          }`}>
             {!avatarError ? (
               <img 
                 src={event.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${event.creator}`} 
                 alt={event.creator}
                 onError={() => setAvatarError(true)}
                 className="w-full h-full object-cover"
               />
             ) : (
               <span className="text-[10px] font-black uppercase tracking-tighter">{initials(event.creator)}</span>
             )}
          </div>
        </Link>

        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-start justify-between gap-1">
            <Link to={`/event/${event.id}`} className="min-w-0">
              <h3 className={`text-sm font-bold line-clamp-1 leading-snug group-hover:text-indigo-400 transition-colors ${
                isLight ? 'text-black font-black' : 'text-white'
              }`}>
                {event.title}
              </h3>
              <p className={`text-xs mt-0.5 font-bold ${isLight ? 'text-slate-500 font-extrabold' : 'text-neutral-500'}`}>
                {event.creator}
              </p>
            </Link>

            <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
              {/* Individual Like Button */}
              <button 
                onClick={handleLike}
                className={`flex items-center gap-1 px-1.5 py-1 rounded-lg transition-all ${
                  isLiked 
                    ? 'text-rose-500' 
                    : isLight ? 'text-slate-400 hover:text-rose-500 hover:bg-rose-50' : 'text-neutral-500 hover:text-rose-400 hover:bg-white/5'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500' : ''}`} />
                <span className="text-[11px] font-black">{formatNum(likeCount)}</span>
              </button>

              {/* Individual Share Button */}
              <button 
                onClick={handleShare}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-lg transition-all ${
                  copied 
                    ? 'text-emerald-500' 
                    : isLight ? 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50' : 'text-neutral-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden xs:block text-[11px] font-black">{copied ? 'Copied' : 'Share'}</span>
              </button>

              <div className="relative" ref={menuRef}>
                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setMenuOpen(!menuOpen); }}
                  className={`p-1 rounded-lg transition-colors ${isLight ? 'hover:bg-slate-100 text-slate-400' : 'hover:bg-white/10 text-neutral-500'}`}
                >
                  <MoreVertical className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className={`absolute right-0 bottom-full mb-3 w-48 rounded-2xl border p-2 shadow-2xl z-50 ${
                        isLight ? 'bg-white border-slate-200' : 'bg-neutral-900/95 border-white/10 backdrop-blur-xl'
                      }`}
                    >
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); hideEvent(event.id); setMenuOpen(false); }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-colors ${
                          isLight ? 'text-slate-600 hover:bg-slate-50' : 'text-neutral-400 hover:bg-white/5'
                        }`}
                      >
                        <Ban className="w-4 h-4 text-indigo-500" />
                        Not Interested
                      </button>
                      <button
                        onClick={startReport}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-colors ${
                          isLight ? 'text-rose-500 hover:bg-rose-50' : 'text-rose-400 hover:bg-rose-500/10'
                        }`}
                      >
                        <Flag className="w-4 h-4 text-rose-500" />
                        Report
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="mt-2.5 flex items-center gap-2">
            <span className={`text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-widest border transition-all ${
              isLight 
                ? 'bg-slate-100 border-slate-200 text-slate-500 hover:border-indigo-500 hover:text-indigo-500' 
                : 'bg-white/5 border-white/10 text-neutral-400 hover:border-indigo-400 hover:text-indigo-400'
            }`}>
              {event.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
