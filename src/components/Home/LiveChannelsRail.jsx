import { Link } from 'react-router-dom';
import { useMemo, useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpDown, Settings, Compass, Users, LayoutDashboard, User, CreditCard } from 'lucide-react';
import { mockEvents, CATEGORIES } from '../../data/mockEvents';

const AVATAR_COLORS = [
  'from-rose-500 to-pink-600', 'from-indigo-500 to-blue-600',
  'from-emerald-500 to-teal-600', 'from-amber-500 to-orange-600',
  'from-violet-500 to-purple-600', 'from-cyan-500 to-sky-500',
  'from-fuchsia-500 to-rose-600', 'from-lime-500 to-green-600',
];
function avatarColor(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h);
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}
function initials(creator) {
  return creator.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}
function formatViewers(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  return n.toString();
}

const CAT_COLORS = {
  Gaming: 'from-indigo-600 to-purple-700',
  Music: 'from-rose-600 to-pink-700',
  Technology: 'from-cyan-600 to-blue-700',
  Sports: 'from-emerald-600 to-teal-700',
  Entertainment: 'from-amber-600 to-orange-700',
  Art: 'from-fuchsia-600 to-violet-700',
  Education: 'from-lime-600 to-green-700',
};

// Simulated followed (offline) creators
const FOLLOWED = ['TechDaily', 'SpeedHunters', 'ArtVisionaries', 'CodeAcademy', 'ActionSports', 'DesignDock', 'MidnightBeats', 'AstroTalks'].map(name => {
  const ev = mockEvents.find(e => e.creator === name);
  return ev || { id: name, creator: name, category: 'Streaming', schedule: 'Offline' };
});

function SectionLabel({ label, collapsed, rightEl }) {
  return (
    <div 
      style={{ maxHeight: collapsed ? '0px' : '30px', marginBottom: collapsed ? '0px' : '0.375rem' }}
      className="flex items-center justify-between px-3 transition-all duration-300 overflow-hidden"
    >
      <p className={`text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-500 transition-opacity duration-300 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>{label}</p>
      <div className={`transition-opacity duration-300 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>
        {rightEl}
      </div>
    </div>
  );
}

function ShowMore({ collapsed, expanded, onToggle, count, threshold }) {
  if (count <= threshold) return null;
  return (
    <div 
      style={{ maxHeight: collapsed ? '0px' : '40px' }}
      className="overflow-hidden transition-all duration-300"
    >
      <button
        onClick={onToggle}
        className="w-full text-left px-3 py-1 text-[12px] text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
        {expanded ? '↑ Show Less' : '↓ Show More'}
      </button>
    </div>
  );
}

const ChannelRow = memo(({ event, collapsed, isLive }) => {
  if (!event) return null;
  return (
    <Link to={`/event/${event.id}`}
      title={collapsed ? `${event.creator}${isLive ? ` — ${formatViewers(event.viewers)} viewers` : ' (Offline)'}` : undefined}
      style={{ '--hover-bg': 'var(--sidebar-hover)' }}
      className={`flex items-center w-full py-2 hover:bg-[var(--sidebar-hover)] transition-colors group ${collapsed ? 'justify-center px-3 gap-0' : 'gap-2.5 px-2'}`}>
      <div className="relative flex-shrink-0">
        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${avatarColor(event.creator)} flex items-center justify-center font-bold text-white text-xs ring-2 ring-black/30 ${!isLive ? 'opacity-50 group-hover:opacity-80 transition-opacity' : ''}`}>
          {initials(event.creator)}
        </div>
        {isLive && (
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-rose-500 border-[2px] border-[#0a0a0f] shadow-[0_0_7px_rgba(244,63,94,0.9)]" />
        )}
      </div>
      <div 
        style={{ width: collapsed ? '0px' : 'auto', visibility: collapsed ? 'hidden' : 'visible' }}
        className={`min-w-0 flex-1 flex items-center justify-between gap-1 transition-all duration-300 ${collapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <div className="min-w-0">
          <p className="text-[13px] font-medium truncate leading-tight group-hover:text-indigo-400 transition-colors" style={{ color: 'var(--sidebar-text-primary)' }}>
            {event.creator}
          </p>
          <p className="text-[11px] truncate leading-tight" style={{ color: 'var(--sidebar-text-secondary)' }}>
            {isLive ? event.category : (event.schedule || event.category)}
          </p>
        </div>
        <div className="flex-shrink-0">
          {isLive ? (
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span className="text-[12px] text-neutral-300 tabular-nums font-semibold">{formatViewers(event.viewers)}</span>
            </div>
          ) : (
            <span className="text-[11px] text-neutral-600">Offline</span>
          )}
        </div>
      </div>
    </Link>
  );
});

export default function LiveChannelsRail({ collapsed, onToggle }) {
  const [showMoreFollowed, setShowMoreFollowed] = useState(false);
  const [showMoreLive, setShowMoreLive] = useState(false);

  const liveEvents = mockEvents.filter(e => e.isLive);
  const visibleFollowed = showMoreFollowed ? FOLLOWED : FOLLOWED.slice(0, 4);
  const visibleLive = showMoreLive ? liveEvents : liveEvents.slice(0, 5);

  const catViewers = CATEGORIES.filter(c => c !== 'All').map(cat => ({
    cat,
    viewers: mockEvents.filter(e => e.category === cat && e.isLive).reduce((s, e) => s + e.viewers, 0),
  })).sort((a, b) => b.viewers - a.viewers);

  return (
    <motion.aside
      animate={{ width: collapsed ? 60 : 240 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }}
      style={{ 
        backgroundColor: 'var(--sidebar-bg)',
        borderColor: 'var(--sidebar-border)',
        willChange: 'width'
      }}
      className="hidden xl:flex flex-col fixed left-0 top-[72px] bottom-0 z-40 border-r overflow-hidden"
    >
      {/* ── Header ── */}
      <div 
        style={{ borderColor: 'var(--sidebar-border)' }}
        className={`flex items-center py-3 px-2 border-b flex-shrink-0 ${collapsed ? 'justify-center' : 'justify-between'}`}
      >
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ color: 'var(--sidebar-text-primary)' }}
              className="text-[13px] font-bold pl-1">For You</motion.span>
          )}
        </AnimatePresence>
        <button onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-500 hover:text-white transition-colors flex-shrink-0"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
        <div className={`py-3 transition-all duration-300 ${collapsed ? 'space-y-2' : 'space-y-5'}`}>

          {/* ── FOLLOWED CHANNELS ── */}
          <section>
            <SectionLabel label="Followed Channels" collapsed={collapsed}
              rightEl={<button className="text-neutral-600 hover:text-neutral-300 transition-colors"><ArrowUpDown className="w-3 h-3" /></button>} />
            {visibleFollowed.map(ev => (
              <ChannelRow key={ev.id || ev.creator} event={ev} collapsed={collapsed} isLive={false} />
            ))}
            <ShowMore collapsed={collapsed} expanded={showMoreFollowed} onToggle={() => setShowMoreFollowed(v => !v)} count={FOLLOWED.length} threshold={4} />
          </section>

          {/* ── LIVE CHANNELS ── */}
          <section>
            <SectionLabel label="Live Channels" collapsed={collapsed}
              rightEl={<span className="text-[10px] font-bold text-rose-400">{liveEvents.length} ON</span>} />
            {visibleLive.map(ev => (
              <ChannelRow key={ev.id} event={ev} collapsed={collapsed} isLive={true} />
            ))}
            <ShowMore collapsed={collapsed} expanded={showMoreLive} onToggle={() => setShowMoreLive(v => !v)} count={liveEvents.length} threshold={5} />
          </section>

          {/* ── RECOMMENDED CATEGORIES ── */}
          <section>
            <SectionLabel label="Recommended Categories" collapsed={collapsed} />
            {catViewers.map(({ cat, viewers }) => (
              <Link key={cat} to="/browse"
                title={collapsed ? cat : undefined}
                className={`flex items-center py-1.5 hover:bg-white/[0.06] transition-colors group ${collapsed ? 'justify-center px-3 gap-0' : 'gap-2.5 px-3'}`}>
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${CAT_COLORS[cat] || 'from-neutral-700 to-neutral-800'} flex-shrink-0 flex items-center justify-center shadow`}>
                  <span className="text-[9px] font-extrabold text-white/90">{cat.slice(0, 2).toUpperCase()}</span>
                </div>
                <div 
                  style={{ width: collapsed ? '0px' : 'auto', visibility: collapsed ? 'hidden' : 'visible' }}
                  className={`min-w-0 flex-1 flex items-center justify-between gap-1 transition-all duration-300 ${collapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                >
                  <div>
                    <p className="text-[13px] font-medium text-neutral-200 truncate group-hover:text-indigo-400 transition-colors">{cat}</p>
                    <p className="text-[11px] text-neutral-600 truncate">{viewers > 0 ? 'Live now' : 'Browse'}</p>
                  </div>
                  {viewers > 0 && (
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span className="text-[12px] text-neutral-300 tabular-nums font-semibold">{formatViewers(viewers)}</span>
                    </div>
                  )}
                </div>
             </Link>
            ))}
          </section>

          {/* ── SECONDARY DISCOVERY ── */}
          <section 
            style={{ 
              maxHeight: collapsed ? '0px' : '200px', 
              paddingBottom: collapsed ? '0px' : '1rem', 
              paddingTop: collapsed ? '0px' : '0.5rem', 
              opacity: collapsed ? 0 : 1,
              borderColor: 'var(--sidebar-border)'
            }}
            className="px-3 border-t transition-all duration-300 overflow-hidden" 
          >
            <div className="space-y-1 mt-2">
              {[
                { icon: <Compass className="w-3.5 h-3.5" />, label: 'Browse All', to: '/browse' },
                { icon: <Users className="w-3.5 h-3.5" />, label: 'Following', to: '/following' },
              ].map(({ icon, label, to }) => (
                <Link key={label} to={to}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-[12px] text-neutral-500 hover:text-neutral-200 hover:bg-white/5 transition-colors">
                  {icon}
                  {label}
                </Link>
              ))}
            </div>
            <p className="mt-4 text-[10px] text-neutral-700 px-2">© 2026 StreamSphere</p>
          </section>

        </div>
      </div>
    </motion.aside>
  );
}
