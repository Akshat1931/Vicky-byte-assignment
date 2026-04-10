import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HypeBurst({ active }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (active) {
      const newParticles = Array.from({ length: 12 }).map((_, i) => ({
        id: Date.now() + i,
        angle: (i * 30) * (Math.PI / 180),
        distance: 40 + Math.random() * 40,
        size: 4 + Math.random() * 6
      }));
      setParticles(newParticles);
      
      const timer = setTimeout(() => setParticles([]), 800);
      return () => clearTimeout(timer);
    }
  }, [active]);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
            animate={{ 
              scale: [0, 1, 0.5],
              x: Math.cos(p.angle) * p.distance,
              y: Math.sin(p.angle) * p.distance,
              opacity: 0
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute rounded-full bg-gradient-to-r from-amber-400 to-rose-500 shadow-[0_0_10px_rgba(251,191,36,0.6)]"
            style={{ width: p.size, height: p.size }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
