import { useState, useEffect, useRef } from 'react';
import { generateChatMessage } from '../../data/mockChat';
import { Send, Smile, Gift, ChevronDown, ChevronUp, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const COMMON_EMOJIS = ['😂', '❤️', '🔥', '👍', '👋', '🎉', '😮', '💯', '✨', '🙌'];

export default function LiveChat({ onCollapse }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isPinnedToBottom, setIsPinnedToBottom] = useState(true);
  
  // Mobile feed toggle state
  const [mobileFeedOpen, setMobileFeedOpen] = useState(false);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  
  const shouldReduceMotion = useReducedMotion();
  const messageContainerRef = useRef(null);
  const emojiRef = useRef(null);

  const scrollToBottom = () => {
    const container = messageContainerRef.current;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
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
      timerId = setTimeout(pushMessage, 1200 + Math.random() * 2600);
    };
    timerId = setTimeout(pushMessage, 1000 + Math.random() * 1800);
    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => { if (isPinnedToBottom) scrollToBottom(); }, [messages]);

  // Handle mobile feed scrolling when opened
  useEffect(() => {
    if (mobileFeedOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [mobileFeedOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) setEmojiPickerOpen(false);
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    const newMsg = {
      id: Math.random().toString(36).substr(2, 9),
      user: 'You',
      message: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isDonation: false,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputMessage('');
    setEmojiPickerOpen(false);
  };

  const onMessagesScroll = () => {
    const el = messageContainerRef.current;
    if (!el) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
    setIsPinnedToBottom(nearBottom);
  };

  const addEmoji = (emoji) => setInputMessage(prev => prev + emoji);

  const shell = isLight ? 'bg-white border-slate-200' : 'bg-[#0a0a0f] border-white/10';
  const inputBar = isLight ? 'bg-slate-50 border-t border-slate-200/60' : 'bg-[#0a0a0f] border-t border-white/5';
  const inputField = isLight ? 'bg-white text-slate-900 border-slate-200 focus:border-indigo-500' : 'bg-white/5 text-white border-transparent focus:border-white/10';

  return (
    <div 
      className={`flex flex-col rounded-2xl overflow-hidden relative w-full border shadow-2xl transition-all duration-300 ${shell} ${
        mobileFeedOpen ? 'h-[450px] sm:h-[500px]' : 'h-[60px] md:h-[min(580px,calc(100vh-10rem))]'
      }`}
    >
      {/* Header */}
      <div className={`p-3 sm:p-4 flex justify-between items-center border-b shrink-0 ${isLight ? 'bg-slate-50/50 border-slate-200/60' : 'bg-white/[0.02] border-white/5'}`}>
        <h3 className={`font-bold flex items-center gap-2 text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
          {onCollapse && (
            <button onClick={onCollapse} className="hidden lg:flex p-1 rounded hover:bg-black/5 text-neutral-500" title="Hide Chat"><X className="w-4 h-4" /></button>
          )}
          Live Chat
        </h3>
        <div className="flex items-center gap-2">
          <span className={`text-[9px] uppercase font-bold px-2 py-1 rounded bg-black/5 border ${isLight ? 'text-slate-500 border-slate-200' : 'text-neutral-500 border-white/5'}`}>2.3k online</span>
          
          {/* Mobile Toggle Button */}
          <button 
            onClick={() => setMobileFeedOpen(!mobileFeedOpen)}
            className={`md:hidden p-1.5 rounded-lg border transition-colors ${
              isLight ? 'border-slate-200 bg-white text-slate-600' : 'border-white/10 bg-white/5 text-neutral-400'
            }`}
          >
            {mobileFeedOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Message Area */}
      <div 
        ref={messageContainerRef} 
        onScroll={onMessagesScroll}
        className={`flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 scrollbar-hide ${isLight ? 'bg-white' : 'bg-[#0a0a0f]'} ${
          mobileFeedOpen ? 'block' : 'hidden md:block'
        }`}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div key={msg.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="text-sm">
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`font-bold ${isLight ? 'text-slate-800' : 'text-neutral-300'}`}>{msg.user}</span>
                <span className="text-[10px] text-neutral-500">{msg.timestamp}</span>
              </div>
              <span className={isLight ? 'text-slate-600' : 'text-neutral-100/90'}>{msg.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input Section */}
      <div className={`p-3 sm:p-4 shrink-0 ${inputBar} ${mobileFeedOpen ? 'block' : 'hidden md:block'}`}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 relative">
          <AnimatePresence>
            {emojiPickerOpen && (
              <motion.div 
                ref={emojiRef}
                initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className={`absolute bottom-full mb-3 left-0 w-full p-2 rounded-xl border shadow-2xl z-[110] flex flex-wrap gap-2 ${
                  isLight ? 'bg-white border-slate-200' : 'bg-[#121214] border-white/10'
                }`}
              >
                {COMMON_EMOJIS.map(emoji => (
                  <button key={emoji} type="button" onClick={() => addEmoji(emoji)} className="p-1.5 hover:scale-125 transition-transform text-lg">{emoji}</button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-2 relative">
            <button 
              type="button" 
              onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
              className={`p-1.5 transition-colors ${emojiPickerOpen ? 'text-indigo-500' : 'text-neutral-500 hover:text-indigo-400'}`}
            >
              <Smile className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Send a message..."
              className={`flex-1 text-sm rounded-full py-2 px-4 focus:outline-none transition-all border ${inputField}`}
            />
            <button type="submit" disabled={!inputMessage.trim()} className="p-2 rounded-full bg-indigo-500 text-white disabled:bg-neutral-800 disabled:text-neutral-500">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
