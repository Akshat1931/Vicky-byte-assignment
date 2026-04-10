import { useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Undo2, X, CheckCircle2 } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { useStreaming } from '../../context/StreamingContext';

export default function UndoToast() {
  const { theme } = useContext(ThemeContext);
  const { undoData, restoreEvent, setUndoData } = useStreaming();
  const isLight = theme === 'light';

  useEffect(() => {
    if (undoData) {
      const timer = setTimeout(() => {
        setUndoData(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [undoData, setUndoData]);

  return (
    <AnimatePresence>
      {undoData && (
        <motion.div
          initial={{ y: 100, opacity: 0, x: '-50%' }}
          animate={{ y: 0, opacity: 1, x: '-50%' }}
          exit={{ y: 100, opacity: 0, x: '-50%' }}
          className="fixed bottom-8 left-1/2 z-[9999] w-[92%] max-w-md"
        >
          <div className={`flex items-center justify-between p-3.5 pr-5 rounded-full border shadow-2xl backdrop-blur-xl transition-all duration-300 ${
            isLight 
            ? 'bg-white/95 border-slate-200 shadow-slate-200/50' 
            : 'bg-[#12141a]/95 border-white/10 shadow-black'
          }`}>
            <div className="flex items-center gap-3.5">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isLight ? 'bg-indigo-50 text-indigo-600' : 'bg-indigo-500/10 text-indigo-400'}`}>
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className={`text-[13px] font-black tracking-tight leading-none mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {undoData.message || 'Removed from feed'}
                </p>
                <p className={`text-[11px] font-bold leading-none ${isLight ? 'text-slate-400' : 'text-neutral-500'}`}>
                  We won't show you this again
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={restoreEvent}
                className={`px-5 py-2.5 rounded-full text-xs font-black transition-all hover:scale-[1.02] active:scale-[0.98] ${
                  isLight 
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-600' 
                  : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500'
                }`}
              >
                Undo
              </button>
              <button
                onClick={() => setUndoData(null)}
                className={`p-1.5 rounded-full transition-colors ${
                  isLight ? 'text-slate-300 hover:bg-slate-50 hover:text-slate-500' : 'text-neutral-600 hover:bg-white/5 hover:text-neutral-300'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
