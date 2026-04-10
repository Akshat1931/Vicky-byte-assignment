import { useState, useEffect, useRef } from 'react';
import { generateChatMessage } from '../../data/mockChat';
import { Send, Smile, Gift, ChevronDown, ChevronUp, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function LiveChat({ onCollapse }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isPinnedToBottom, setIsPinnedToBottom] = useState(true);
  /** On small screens: hide message list by default so the player stays visible; user can expand to read chat. */
  const [mobileFeedOpen, setMobileFeedOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const messageContainerRef = useRef(null);

  const scrollToBottom = () => {
    const container = messageContainerRef.current;
    if (!container) return;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const initial = Array.from({ length: 5 }, () => generateChatMessage());
    setMessages(initial);

    let timerId;
    const pushMessage = () => {
      setMessages((prev) => {
        const newMsg = generateChatMessage();
        const updated = [...prev, newMsg];
        return updated.length > 50 ? updated.slice(updated.length - 50) : updated;
      });
      const nextDelay = 1200 + Math.random() * 2600;
      timerId = setTimeout(pushMessage, nextDelay);
    };

    timerId = setTimeout(pushMessage, 1000 + Math.random() * 1800);

    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => {
    if (isPinnedToBottom) scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (mobileFeedOpen && isPinnedToBottom) {
      requestAnimationFrame(() => scrollToBottom());
    }
  }, [mobileFeedOpen]);

  const onMessagesScroll = () => {
    const el = messageContainerRef.current;
    if (!el) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
    setIsPinnedToBottom(nearBottom);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg = {
      id: Math.random().toString(36).substr(2, 9),
      user: 'You',
      message: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isDonation: false,
      amount: 0,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const shell = isLight
    ? 'border border-slate-200/90 bg-white shadow-[0_12px_40px_-18px_rgba(15,23,42,0.25)]'
    : 'glass-panel border-white/10 shadow-2xl';

  const headerBar = isLight
    ? 'border-b border-slate-200/90 bg-slate-50/95'
    : 'border-b border-white/5 bg-white/[0.02]';

  const headerTitle = isLight ? 'text-slate-900' : 'text-white';
  const badge = isLight
    ? 'border-slate-200 bg-white text-slate-600'
    : 'border-white/10 bg-black/20 text-neutral-400';

  const scrollArea = isLight ? 'bg-slate-50' : 'bg-[#0a0a0f]';
  const userName = isLight ? 'text-slate-800' : 'text-neutral-300';
  const timeStamp = isLight ? 'text-slate-400' : 'text-neutral-500';
  const bodyText = isLight ? 'text-slate-700' : 'text-neutral-100/90';
  const donationUser = isLight ? 'text-indigo-600' : 'text-indigo-400';
  const donationMsg = isLight ? 'text-slate-900' : 'text-white';
  const donationTime = isLight ? 'text-indigo-600/80' : 'text-indigo-200/75';
  const donationBox = isLight
    ? 'bg-indigo-50 border border-indigo-200/80'
    : 'bg-indigo-500/10 border border-indigo-500/30';

  const inputBar = isLight ? 'border-t border-slate-200/90 bg-white' : 'border-t border-white/5 bg-[#0a0a0f]';
  const inputField = isLight
    ? 'bg-slate-100 text-slate-900 placeholder:text-slate-400 border border-slate-200 focus:ring-indigo-500/40 focus:border-indigo-400/50'
    : 'bg-white/5 text-white placeholder:text-neutral-500 border-transparent focus:ring-indigo-500/50 group-focus-within:border-white/10';
  const iconMuted = isLight ? 'text-slate-400 hover:text-slate-700' : 'text-neutral-500 hover:text-white';
  const sendBtn = isLight
    ? 'bg-indigo-600 text-white disabled:bg-slate-200 disabled:text-slate-400'
    : 'bg-white text-black disabled:bg-neutral-800 disabled:text-neutral-500';

  return (
    <div
      className={`flex flex-col rounded-2xl overflow-hidden relative w-full max-w-full max-lg:h-auto lg:h-[min(560px,calc(100vh-7.5rem))] ${
        mobileFeedOpen ? 'max-lg:max-h-[min(420px,62vh)]' : ''
      } ${shell}`}
    >
      <div className={`p-3 sm:p-4 flex justify-between items-center gap-2 ${headerBar}`}>
        <h3 className={`font-bold flex items-center gap-2 text-sm sm:text-base min-w-0 ${headerTitle}`}>
          {onCollapse && (
            <button 
              onClick={onCollapse}
              className={`hidden lg:flex items-center justify-center p-1 rounded-md transition-colors ${
                isLight ? 'hover:bg-slate-200 text-slate-500' : 'hover:bg-white/10 text-neutral-400'
              }`}
              title="Collapse Chat"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          Live Chat
        </h3>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-[10px] font-medium tracking-wide border px-2 py-1 rounded ${badge}`}>
            2.3k online
          </span>
          <button
            type="button"
            onClick={() => setMobileFeedOpen((v) => !v)}
            className={`lg:hidden inline-flex items-center justify-center rounded-lg p-1.5 border transition-colors ${
              isLight
                ? 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                : 'border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10'
            }`}
            aria-expanded={mobileFeedOpen}
            aria-label={mobileFeedOpen ? 'Hide chat messages' : 'Show chat messages'}
          >
            {mobileFeedOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div
        ref={messageContainerRef}
        onScroll={onMessagesScroll}
        className={`flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 scrollbar-hide space-y-3 sm:space-y-4 ${scrollArea} ${
          mobileFeedOpen ? 'max-lg:block max-lg:max-h-[min(220px,36vh)]' : 'max-lg:hidden'
        } lg:block`}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 14, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: shouldReduceMotion ? 0.18 : 0.28 }}
              className={`text-sm ${msg.isDonation ? `${donationBox} p-3 rounded-xl shadow-sm` : 'pl-1 sm:pl-2'}`}
            >
              {msg.isDonation ? (
                <>
                  <div className={`font-bold mb-1 flex items-center gap-1.5 ${donationUser}`}>
                    <Gift className="w-4 h-4" /> {msg.user} donated ${msg.amount}
                  </div>
                  <span className={`font-medium ${donationMsg}`}>{msg.message}</span>
                  <div className={`mt-1 text-[11px] ${donationTime}`}>{msg.timestamp}</div>
                </>
              ) : (
                <div>
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className={`font-semibold ${userName}`}>{msg.user}</span>
                    <span className={`text-[11px] ${timeStamp}`}>{msg.timestamp}</span>
                  </div>
                  <span className={`font-light leading-relaxed ${bodyText}`}>{msg.message}</span>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div
        className={`p-3 sm:p-4 w-full ${inputBar} pb-[max(0.75rem,env(safe-area-inset-bottom))]`}
      >
        <form onSubmit={handleSubmit} className="flex items-center gap-2 relative group w-full">
          <button type="button" className={`absolute left-3 transition-colors ${iconMuted}`} aria-label="Emoji">
            <Smile className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
            className={`w-full text-sm rounded-full py-2.5 pl-10 pr-12 focus:outline-none focus:ring-2 transition-all ${inputField}`}
          />
          <motion.button
            whileHover={shouldReduceMotion ? undefined : { scale: 1.06 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
            type="submit"
            disabled={!inputMessage.trim()}
            className={`absolute right-2 p-1.5 rounded-full transition-colors flex items-center justify-center shadow-md ${sendBtn}`}
          >
            <Send className="w-3.5 h-3.5" />
          </motion.button>
        </form>
      </div>
    </div>
  );
}
