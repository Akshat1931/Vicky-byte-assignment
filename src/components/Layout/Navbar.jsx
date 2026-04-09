import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, Bell, User, Sun, Moon, Check, ChevronRight } from 'lucide-react';

export default function Navbar({ theme, onToggleTheme }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications] = useState([
    { id: 'n1', text: 'Neon Nights Virtual Concert is live now', time: '2m ago' },
    { id: 'n2', text: 'New event in Technology you may like', time: '15m ago' },
    { id: 'n3', text: 'Your followed creator just scheduled a stream', time: '1h ago' },
  ]);
  const bellRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const onClick = (event) => {
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    const onEsc = (event) => {
      if (event.key === 'Escape') {
        setNotificationsOpen(false);
        setProfileOpen(false);
      }
    };
    window.addEventListener('click', onClick);
    window.addEventListener('keydown', onEsc);
    return () => {
      window.removeEventListener('click', onClick);
      window.removeEventListener('keydown', onEsc);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b border-white/5 transition-colors duration-300">
      <div className="app-container">
        <div className="flex justify-between items-center min-h-[60px] sm:min-h-[64px] md:h-[72px] py-2 md:py-0">
          <div className="flex items-center gap-4 md:gap-6">
            <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-indigo-500/10 p-2 rounded-xl border border-white/5 group-hover:bg-white/10 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polygon points="6 3 20 12 6 21 6 3" /></svg>
            </div>
            <span className="font-bold text-lg md:text-xl tracking-tight text-white">Stream<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Sphere</span></span>
            </Link>
            <div className="hidden lg:flex items-center gap-2">
              <NavLink
                to="/following"
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 text-sm transition-colors ${isActive ? 'bg-white text-black' : 'text-neutral-300 hover:text-white hover:bg-white/10'}`
                }
              >
                Following
              </NavLink>
              <NavLink
                to="/browse"
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 text-sm transition-colors ${isActive ? 'bg-white text-black' : 'text-neutral-300 hover:text-white hover:bg-white/10'}`
                }
              >
                Browse
              </NavLink>
            </div>
          </div>
          
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search
                  className={`h-4 w-4 ${theme === 'light' ? 'text-slate-400' : 'text-neutral-400'}`}
                />
              </div>
              <input
                type="text"
                placeholder="Search events, streams, or creators..."
                className={`block w-full pl-10 pr-3 py-2 rounded-full leading-5 border sm:text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/35 ${
                  theme === 'light'
                    ? 'bg-white text-slate-800 placeholder:text-slate-400 border-slate-200 shadow-sm focus:border-indigo-400 focus:bg-white'
                    : 'bg-neutral-900 text-neutral-300 placeholder-neutral-500 border-transparent focus:bg-white focus:text-neutral-900 focus:border-indigo-500'
                }`}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4 text-neutral-300">
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
                className="hover:text-white transition-colors relative p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-neutral-950 bg-rose-500"></span>
              </button>
              {notificationsOpen && (
                <div className={`absolute right-0 mt-2 w-72 rounded-xl border shadow-2xl p-2 ${
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
                className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white ring-2 ring-transparent hover:ring-indigo-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                aria-label="Profile menu"
              >
                <User className="w-4 h-4" />
              </button>
              {profileOpen && (
                <div className={`absolute right-0 mt-2 w-56 rounded-xl border shadow-2xl p-2 ${
                  theme === 'light'
                    ? 'border-slate-200 bg-white'
                    : 'border-white/10 bg-[#090b12]'
                }`}>
                  {['Profile', 'Creator Dashboard', 'Settings'].map((item) => (
                    <button
                      key={item}
                      className={`w-full flex items-center justify-between rounded-lg px-2 py-2 text-sm transition-colors ${
                        theme === 'light'
                          ? 'text-slate-800 hover:bg-slate-100'
                          : 'text-neutral-100 hover:bg-white/5'
                      }`}
                    >
                      <span>{item}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-neutral-500" />
                    </button>
                  ))}
                  <button
                    onClick={onToggleTheme}
                    className={`mt-1 w-full flex items-center justify-between rounded-lg px-2 py-2 text-sm transition-colors ${
                      theme === 'light'
                        ? 'text-slate-800 hover:bg-slate-100'
                        : 'text-neutral-100 hover:bg-white/5'
                    }`}
                  >
                    <span>{theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}</span>
                    <Check className="h-3.5 w-3.5 text-indigo-300" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile / tablet: Following & Browse (hidden on lg+ where they sit in the top row) */}
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
                  ? 'bg-white text-black'
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
                  ? 'bg-white text-black'
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
    </nav>
  );
}
