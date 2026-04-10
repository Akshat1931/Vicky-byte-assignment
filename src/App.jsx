import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ThemeContext } from './context/ThemeContext';
import Navbar from './components/Layout/Navbar';
import ScrollToTopButton from './components/Layout/ScrollToTopButton';
import LiveChannelsRail from './components/Home/LiveChannelsRail';
import Home from './pages/Home';
import EventDetail from './pages/EventDetail';
import Browse from './pages/Browse';

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

function AnimatedRoutes() {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
        transition={{ duration: shouldReduceMotion ? 0.15 : 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/following" element={<Browse />} />
          <Route path="/event/:id" element={<EventDetail />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

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
      <BrowserRouter>
        <ScrollToTop />
        <div
          className={`flex flex-col min-h-screen transition-colors duration-300 ${
            theme === 'light' ? 'bg-[#f7f8fc]' : 'bg-neutral-950'
          }`}
        >
          <Navbar theme={theme} onToggleTheme={toggleTheme} />

          {/* Global fixed sidebar — xl only */}
          <LiveChannelsRail
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed((v) => !v)}
          />

          {/* Main content — single render, margin driven by JS media query */}
          <motion.main
            className="flex-1 min-w-0 flex flex-col"
            animate={{ marginLeft }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatedRoutes />
          </motion.main>

          <ScrollToTopButton />
        </div>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
