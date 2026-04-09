import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ThemeContext } from './context/ThemeContext';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home';
import EventDetail from './pages/EventDetail';
import Browse from './pages/Browse';

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
        transition={{ duration: shouldReduceMotion ? 0.18 : 0.3, ease: [0.16, 1, 0.3, 1] }}
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
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('vickybytes-theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('light', theme === 'light');
    localStorage.setItem('vickybytes-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <BrowserRouter>
        <div
          className={`flex flex-col min-h-screen transition-colors duration-300 ${
            theme === 'light' ? 'bg-[#f7f8fc]' : 'bg-neutral-950'
          }`}
        >
          <Navbar theme={theme} onToggleTheme={toggleTheme} />
          <main className="flex-1 min-w-0">
            <AnimatedRoutes />
          </main>
        </div>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
