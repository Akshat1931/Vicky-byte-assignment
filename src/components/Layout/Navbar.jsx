import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Bell, User, Sun, Moon, Check, ChevronRight, X, LayoutGrid, Gamepad2, TrendingUp, LayoutDashboard, CreditCard, Settings, Users, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockEvents } from '../../data/mockEvents';
import { mockUser } from '../../data/mockUser';

export default function Navbar({ theme, onToggleTheme }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  const [notifications] = useState(mockUser.notifications);
  const bellRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);

  const [isPipMode, setIsPipMode] = useState(false);

  useEffect(() => {
    // Production-level observer to detect global PiP state without prop drilling
    const observer = new MutationObserver(() => {
      const active = document.body.classList.contains('pip-active');
      setIsPipMode(active);
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    const onClick = (event) => {
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    const onEsc = (event) => {
      if (event.key === 'Escape') {
        setNotificationsOpen(false);
        setProfileOpen(false);
        setShowSuggestions(false);
      }
    };
    window.addEventListener('click', onClick);
    window.addEventListener('keydown', onEsc);
    return () => {
      observer.disconnect();
      window.removeEventListener('click', onClick);
      window.removeEventListener('keydown', onEsc);
    };
  }, []);

  // Sync state if URL changes externally
  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  // Handle live suggestions
  useEffect(() => {
    if (searchQuery.length >= 2) {
      const q = searchQuery.toLowerCase();
      const filtered = mockEvents.filter(e => 
        e.title.toLowerCase().includes(q) || 
        e.creator.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q)
      ).slice(0, 6);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    e?.preventDefault?.();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
    setShowSuggestions(false);
    setIsMobileSearchOpen(false);
  };

  const selectSuggestion = (q) => {
    setSearchQuery(q);
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setShowSuggestions(false);
    setIsMobileSearchOpen(false);
  };

  return (
    <AnimatePresence>
      {!isPipMode && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`sticky top-0 z-[100] w-full border-b transition-colors duration-300 ${
            theme === 'light' ? 'bg-white/60 backdrop-blur-md border-slate-200' : 'glass-panel border-white/5'
          }`}
        >
          <div className="app-container">
            <div className="flex justify-between items-center min-h-[60px] sm:min-h-[64px] md:h-[72px] py-2 md:py-0">
              <div className="flex items-center gap-4 md:gap-6">
                <Link to="/" className="flex items-center gap-3 group">
                <div className={`p-2 rounded-xl border transition-colors duration-300 ${
                  theme === 'light' ? 'bg-indigo-50 border-indigo-100 group-hover:bg-indigo-100' : 'bg-indigo-500/10 border-white/5 group-hover:bg-white/10'
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={theme === 'light' ? 'text-indigo-600' : 'text-white'}><polygon points="6 3 20 12 6 21 6 3" /></svg>
                </div>
                <span className={`font-bold text-lg md:text-xl tracking-tight flex-shrink-0 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Stream<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Sphere</span></span>
                </Link>
                <div className="hidden lg:flex items-center gap-2">
                  <NavLink
                    to="/following"
                    className={({ isActive }) =>
                      `rounded-full px-3 py-1.5 text-sm transition-colors ${
                        isActive 
                        ? (theme === 'light' ? 'bg-indigo-500 text-white shadow-[0_2px_12px_rgba(99,102,241,0.25)]' : 'bg-indigo-600 text-white shadow-[0_2px_12px_rgba(79,70,229,0.3)]') 
                        : (theme === 'light' ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-neutral-300 hover:text-white hover:bg-white/10')
                      }`
                    }
                  >
                    Following
                  </NavLink>
                  <NavLink
                    to="/browse"
                    className={({ isActive }) =>
                      `rounded-full px-3 py-1.5 text-sm transition-colors ${
                        isActive 
                        ? (theme === 'light' ? 'bg-indigo-500 text-white shadow-[0_2px_12px_rgba(99,102,241,0.25)]' : 'bg-indigo-600 text-white shadow-[0_2px_12px_rgba(79,70,229,0.3)]')
                        : (theme === 'light' ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-neutral-300 hover:text-white hover:bg-white/10')
                      }`
                    }
                  >
                    Browse
                  </NavLink>
                </div>
              </div>
              
              <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative" ref={searchRef}>
                <form onSubmit={handleSearch} className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search
                      className={`h-4 w-4 ${theme === 'light' ? 'text-indigo-400' : 'text-neutral-500'}`}
                    />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search events, streams, or creators..."
                    style={{ 
                      backgroundColor: 'var(--search-bg)', 
                      color: 'var(--search-text)',
                      borderColor: 'var(--search-border)'
                    }}
                    className="block w-full pl-10 pr-3 py-2 rounded-full leading-5 border sm:text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/35 placeholder:text-[var(--search-placeholder)] focus:bg-[var(--search-focus-bg)]"
                  />
                </form>

                {/* Desktop Autocomplete Dropdown */}
                <AnimatePresence>
                    {showSuggestions && suggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className={`absolute top-full left-0 right-0 mt-2 rounded-2xl border shadow-2xl overflow-hidden z-[110] ${
                          theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#090b12] border-white/10 backdrop-blur-3xl'
                        }`}
                      >
                        <div className="py-2">
                           {suggestions.map((s) => (
                             <button
                               key={s.id}
                               onClick={() => selectSuggestion(s.title)}
                               className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                                 theme === 'light' ? 'hover:bg-slate-50' : 'hover:bg-white/5'
                               }`}
                             >
                                <div className="p-2 rounded-lg bg-indigo-500/10">
                                   {s.isLive ? <TrendingUp className="w-3.5 h-3.5 text-rose-500" /> : <LayoutGrid className="w-3.5 h-3.5 text-indigo-400" />}
                                </div>
                                <div className="min-w-0">
                                   <p className={`text-sm font-bold truncate ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>{s.title}</p>
                                   <p className="text-[11px] text-neutral-500">{s.creator} • {s.category}</p>
                                </div>
                             </button>
                           ))}
                        </div>
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>

              <div className={`flex items-center gap-2 sm:gap-3 md:gap-4 ${
                theme === 'light' ? 'text-slate-500' : 'text-neutral-300'
              }`}>
                {/* Mobile Search Toggle */}
                <button 
                  className="md:hidden hover:text-white transition-colors p-1"
                  onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                >
                  {isMobileSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                </button>
                
                <button
                  onClick={onToggleTheme}
                  className="hover:text-white transition-colors p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                  aria-label="Toggle theme"
                  title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <div className="relative" ref={bellRef}>
                  <button
                    onClick={() => setNotificationsOpen((v) => !v)}
                    className={`transition-colors relative p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/60 ${
                      theme === 'light' ? 'text-slate-400 hover:text-indigo-600' : 'hover:text-white'
                    }`}
                    aria-label="Notifications"
                  >
                    <Bell className="w-5 h-5" />
                    <span className={`absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)] ${
                      theme === 'light' ? 'ring-white' : 'ring-neutral-950'
                    }`}></span>
                  </button>
                  {notificationsOpen && (
                    <div className={`absolute right-0 mt-2 w-72 rounded-xl border shadow-2xl p-2 z-[110] ${
                      theme === 'light'
                        ? 'border-slate-200 bg-white'
                        : 'border-white/10 bg-[#090b12]'
                    }`}>
                      <p className="px-2 py-1 text-xs uppercase tracking-[0.14em] text-neutral-400">Notifications</p>
                      {notifications.map((item) => (
                        <button
                          key={item.id}
                          className={`w-full text-left rounded-lg px-2 py-2 transition-colors ${
                            theme === 'light' ? 'hover:bg-slate-100' : 'hover:bg-white/5'
                          }`}
                        >
                          <p className={`text-sm leading-snug ${theme === 'light' ? 'text-slate-800' : 'text-neutral-100'}`}>{item.text}</p>
                          <p className="text-[11px] text-neutral-500 mt-1">{item.time}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen((v) => !v)}
                    className={`h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white ring-2 transition-all duration-200 shadow-[0_0_15px_rgba(99,102,241,0.3)] overflow-hidden ${
                      theme === 'light' ? 'ring-transparent hover:ring-indigo-100' : 'ring-transparent hover:ring-indigo-400'
                    }`}
                    aria-label="Profile menu"
                  >
                    <img 
                      src={mockUser.avatar} 
                      alt={mockUser.name} 
                      className="w-full h-full object-cover relative z-10"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <User className="w-4 h-4 absolute opacity-40 group-hover:opacity-100 transition-opacity" />
                  </button>
                  {profileOpen && (
                    <div className={`absolute right-0 mt-2 w-56 rounded-xl border shadow-2xl p-2 z-[110] ${
                      theme === 'light'
                        ? 'border-slate-200 bg-white'
                        : 'border-white/10 bg-[#090b12]'
                    }`}>
                      {[
                        { icon: <User className="w-4 h-4" />, label: 'Profile', to: '/profile' },
                        { icon: <LayoutDashboard className="w-4 h-4" />, label: 'Creator Dashboard', to: '/dashboard' },
                        { icon: <CreditCard className="w-4 h-4" />, label: 'Subscriptions', to: '/subscriptions' },
                        { icon: <Settings className="w-4 h-4" />, label: 'Settings', to: '/settings' },
                      ].map((item) => (
                        <Link
                          key={item.label}
                          to={item.to}
                          onClick={() => setProfileOpen(false)}
                          className={`w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-all hover:pl-4 ${
                            theme === 'light'
                              ? 'text-slate-700 hover:bg-slate-50 hover:text-indigo-600'
                              : 'text-neutral-200 hover:bg-white/5 hover:text-indigo-400'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="opacity-70 group-hover:opacity-100 transition-opacity">{item.icon}</span>
                            <span className="font-medium">{item.label}</span>
                          </div>
                          <ChevronRight className="h-3.5 w-3.5 opacity-30" />
                        </Link>
                      ))}
                      
                      <div className={`my-2 border-t ${theme === 'light' ? 'border-slate-100' : 'border-white/5'}`} />

                      <button
                        onClick={onToggleTheme}
                        className={`w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${
                          theme === 'light'
                            ? 'text-slate-700 hover:bg-slate-50'
                            : 'text-neutral-200 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
                          <span className="font-medium">{theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}</span>
                        </div>
                        <Check className={`h-3.5 w-3.5 ${theme === 'light' ? 'text-indigo-600' : 'text-indigo-400'}`} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile / tablet navigation */}
            <div
              className={`lg:hidden flex items-center gap-2 pb-3 pt-1 -mx-1 px-1 overflow-x-auto scrollbar-hide border-t ${
                theme === 'light' ? 'border-slate-200/80' : 'border-white/10'
              }`}
            >
              <NavLink
                to="/following"
                className={({ isActive }) =>
                  `shrink-0 rounded-full px-3 py-1.5 text-sm transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                      : theme === 'light'
                        ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        : 'text-neutral-300 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                Following
              </NavLink>
              <NavLink
                to="/browse"
                className={({ isActive }) =>
                  `shrink-0 rounded-full px-3 py-1.5 text-sm transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                      : theme === 'light'
                        ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        : 'text-neutral-300 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                Browse
              </NavLink>
            </div>
          </div>

          {/* Mobile Search Overlay */}
          <AnimatePresence>
            {isMobileSearchOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className={`md:hidden border-t overflow-hidden ${theme === 'light' ? 'bg-white border-slate-200/80' : 'bg-[#030305]/95 border-white/5 backdrop-blur-xl'}`}
              >
                <div className="p-4 relative">
                  <form onSubmit={handleSearch} className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className={`h-4 w-4 ${theme === 'light' ? 'text-slate-400' : 'text-neutral-400'}`} />
                    </div>
                    <input 
                      type="text" 
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search streams..." 
                      className={`block w-full pl-10 pr-3 py-3 rounded-xl leading-5 border text-sm transition-all focus:outline-none focus:border-indigo-500 shadow-inner ${
                        theme === 'light' 
                          ? 'bg-slate-50 text-slate-800 placeholder:text-slate-400 border-slate-200' 
                          : 'bg-neutral-900 text-white placeholder-neutral-500 border-white/10'
                      }`}
                    />
                  </form>

                  {/* Mobile suggestions */}
                  {suggestions.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/5 space-y-1">
                       {suggestions.map(s => (
                         <button
                            key={`mob-${s.id}`}
                            onClick={() => selectSuggestion(s.title)}
                            className="w-full flex items-center gap-3 py-2 text-left"
                         >
                            <Search className="w-3.5 h-3.5 text-neutral-500" />
                            <span className="text-sm text-neutral-300 truncate">{s.title}</span>
                         </button>
                       ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
