import { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Share2, Eye, Calendar, MoreVertical, X, Ban, Link2 } from 'lucide-react';

const AVATAR_COLORS = [
  'from-rose-500 to-pink-600', 'from-indigo-500 to-blue-600',
  'from-emerald-500 to-teal-600', 'from-amber-500 to-orange-600',
  'from-violet-500 to-purple-600', 'from-cyan-500 to-sky-500',
  'from-fuchsia-500 to-rose-600', 'from-lime-500 to-green-600',
];
function avatarColor(creator) {
  let h = 0;
  for (let i = 0; i < creator.length; i++) h = creator.charCodeAt(i) + ((h << 5) - h);
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}
function initials(creator) {
  return creator.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}
function formatNum(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  return n.toString();
}

export default function EventCard({ event }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(event.likes || 0);
  const [copied, setCopied] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);  // "Not Interested" hides the card
  const menuRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  const handleLike = (e) => {
    e.preventDefault();
    setIsLiked(v => { setLikeCount(c => v ? c - 1 : c + 1); return !v; });
  };
  const handleShare = async (e) => {
    e?.preventDefault?.();
    const url = `${window.location.origin}/event/${event.id}`;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
        setCopied(true); setTimeout(() => setCopied(false), 1500);
      } else window.prompt('Copy this link:', url);
    } catch { window.prompt('Copy this link:', url); }
    setMenuOpen(false);
  };

  // Hidden via "Not Interested"
  if (hidden) {
    return (
      <div className="flex flex-col gap-2 h-full">
        <div className="rounded-xl bg-white/[0.03] border border-white/8 flex flex-col items-center justify-center gap-2 p-6 text-center" style={{ aspectRatio: '16/9' }}>
          <X className="w-6 h-6 text-neutral-500" />
          <p className="text-sm text-neutral-400 font-medium">Not Interested</p>
          <button onClick={() => setHidden(false)} className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors mt-1 underline underline-offset-2">
            Undo
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      layout
      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
      transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.2 }}
      className="group flex flex-col"
    >
      {/* ── Thumbnail ── */}
      <Link to={`/event/${event.id}`} className="relative block rounded-xl overflow-hidden bg-neutral-900" style={{ aspectRatio: '16/9' }}>
        {/* Gradient fallback */}
        <div className={`absolute inset-0 bg-gradient-to-br ${avatarColor(event.creator)} opacity-70`} />
        {!imgFailed && (
          <img
            src={event.imageUrl}
            alt={event.title}
            onError={() => setImgFailed(true)}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            loading="lazy"
            decoding="async"
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* LIVE badge */}
        {event.isLive && (
          <span className="absolute top-2 left-2 flex items-center gap-1 bg-rose-600 text-white text-[11px] font-bold tracking-wider px-2 py-0.5 rounded shadow-lg shadow-rose-600/40 z-10">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> LIVE
          </span>
        )}

        {/* Viewer/schedule — bottom left */}
        <div className="absolute bottom-2 left-2 z-10">
          {event.isLive ? (
            <span className="flex items-center gap-1 bg-black/75 backdrop-blur-sm text-white text-xs font-medium px-2 py-0.5 rounded-md">
              <Eye className="w-3.5 h-3.5" /> {formatNum(event.viewers)} viewers
            </span>
          ) : (
            <span className="flex items-center gap-1 bg-black/75 backdrop-blur-sm text-white text-xs font-medium px-2 py-0.5 rounded-md">
              <Calendar className="w-3.5 h-3.5" /> {event.schedule}
            </span>
          )}
        </div>

        {/* Watch Now hover */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <span className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 bg-white text-black font-semibold text-sm px-5 py-2 rounded-full shadow-2xl">
            Watch Now
          </span>
        </div>
      </Link>

      {/* ── Metadata ── */}
      <div className="flex items-start gap-2.5 mt-3 px-0.5">
        {/* Creator avatar */}
        <Link to={`/event/${event.id}`} className="flex-shrink-0 mt-0.5">
          <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColor(event.creator)} flex items-center justify-center font-bold text-white text-xs shadow ring-2 ring-black/20 hover:ring-indigo-400/50 transition-all`}>
            {initials(event.creator)}
          </div>
        </Link>

        <div className="min-w-0 flex-1">
          {/* Title row: Title | ❤ Like | 🔗 Share | ⋮ — all in one flex row */}
          <div className="flex items-center gap-1 min-w-0">
            <Link to={`/event/${event.id}`} className="flex-1 min-w-0 overflow-hidden">
              <h3
                className="text-sm font-semibold text-white truncate hover:text-indigo-300 transition-colors leading-snug"
                title={event.title}
              >
                {event.title}
              </h3>
            </Link>
            {/* Actions group — NEVER shrinks, always stays right */}
            <div className="flex items-center gap-0.5 flex-shrink-0 ml-1">
              {/* Like */}
              <motion.button
                whileTap={shouldReduceMotion ? undefined : { scale: 0.85 }}
                onClick={handleLike}
                className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-xs font-medium transition-all flex-shrink-0 ${
                  isLiked ? 'text-rose-400' : 'text-neutral-500 hover:text-rose-400'
                }`}
                title="Like"
              >
                <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-400' : ''}`} />
                <span className="tabular-nums">{formatNum(likeCount)}</span>
              </motion.button>
              {/* Share */}
              <motion.button
                whileTap={shouldReduceMotion ? undefined : { scale: 0.85 }}
                onClick={handleShare}
                className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-xs font-medium text-neutral-500 hover:text-indigo-400 transition-all flex-shrink-0"
                title="Share"
              >
                <Share2 className="w-3.5 h-3.5" />
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? 'c' : 's'}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                    className={`${copied ? 'text-emerald-400' : ''} whitespace-nowrap`}
                  >
                    {copied ? 'Copied!' : 'Share'}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
              {/* Three-dot ⋮ */}
              <div className="relative flex-shrink-0" ref={menuRef}>
              <button
                onClick={(e) => { e.preventDefault(); setMenuOpen(v => !v); }}
                className="mt-0.5 p-0.5 rounded-full text-neutral-600 hover:text-neutral-300 hover:bg-white/10 transition-all"
                title="More options"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-7 z-50 w-44 rounded-xl bg-[#141418] border border-white/10 shadow-2xl shadow-black/50 py-1 overflow-hidden"
                  >
                    <button
                      onClick={() => { setHidden(true); setMenuOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-neutral-200 hover:bg-white/8 transition-colors"
                    >
                      <X className="w-4 h-4 text-neutral-400" />
                      Not Interested
                    </button>
                    <div className="my-1 border-t border-white/8" />
                    <button
                      onClick={() => setMenuOpen(false)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors"
                    >
                      <Ban className="w-4 h-4" />
                      Report Stream
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>  {/* end three-dot */}
            </div>  {/* end actions group */}
          </div>  {/* end title row */}

          {/* Creator */}
          <p className="text-xs text-neutral-400 mt-0.5 truncate">{event.creator}</p>

          {/* Tags only */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <span className="text-xs font-medium bg-white/10 text-neutral-200 px-2.5 py-1 rounded-full border border-white/10">
              {event.category}
            </span>
            {event.isLive
              ? <span className="text-xs font-semibold bg-rose-500/15 text-rose-300 px-2.5 py-1 rounded-full border border-rose-500/30">🔴 Live</span>
              : <span className="text-xs font-semibold bg-indigo-500/15 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-500/25">📅 Upcoming</span>
            }
          </div>
        </div>
      </div>
    </motion.div>
  );
}
