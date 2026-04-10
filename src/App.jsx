import { useEffect, useState, memo } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ThemeContext } from './context/ThemeContext';
import Navbar from './components/Layout/Navbar';
import ScrollToTopButton from './components/Layout/ScrollToTopButton';
import LiveChannelsRail from './components/Home/LiveChannelsRail';
import UndoToast from './components/Common/UndoToast';
import { StreamingProvider } from './context/StreamingContext';
import Home from './pages/Home';
import EventDetail from './pages/EventDetail';
import Browse from './pages/Browse';
import Following from './pages/Following';
import Search from './pages/Search';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Subscriptions from './pages/Subscriptions';
import Settings from './pages/Settings';
import PipOverlay from './components/Event/PipOverlay';

// Media query hook — no SSR issues, no double renders
function useIsXL() {
  const [isXL, setIsXL] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1280 : false
  );
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1280px)');
    const handler = (e) => setIsXL(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isXL;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

const AnimatedRoutes = memo(function AnimatedRoutes() {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname + location.search}
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
        transition={{ duration: shouldReduceMotion ? 0.15 : 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/following" element={<Following />} />
          <Route path="/search" element={<Search />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/event/:id" element={<EventDetail />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
});

function App() {
  const isXL = useIsXL();

  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('vickybytes-theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Always starts collapsed — user can expand manually, no persistence
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('light', theme === 'light');
    localStorage.setItem('vickybytes-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  // Sidebar only offsets content on xl screens
  const marginLeft = isXL ? (sidebarCollapsed ? 60 : 240) : 0;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StreamingProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div
            className={`flex flex-col min-h-screen transition-colors duration-300 ${
              theme === 'light' ? 'bg-[#f7f8fc]' : 'bg-neutral-950'
            }`}
          >
            <Navbar theme={theme} onToggleTheme={toggleTheme} />

            <LiveChannelsRail
              collapsed={sidebarCollapsed}
              onToggle={() => setSidebarCollapsed((v) => !v)}
            />

            <motion.main
              className="flex-1 min-w-0 flex flex-col"
              animate={{ marginLeft }}
              transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }}
            >
              <AnimatedRoutes />
            </motion.main>

            <ScrollToTopButton />
            <PipOverlay />
            <UndoToast />
          </div>
        </BrowserRouter>
      </StreamingProvider>
    </ThemeContext.Provider>
  );
}

export default App;
