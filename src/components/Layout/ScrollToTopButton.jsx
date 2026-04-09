import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      // Show the button when the user scrolls down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[90] p-3.5 rounded-full shadow-2xl transition-colors duration-300 ${
            theme === 'light' 
              ? 'bg-white text-indigo-600 border border-slate-200/80 hover:bg-slate-50' 
              : 'glass-panel text-white border-white/10 hover:bg-white/10'
          }`}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
