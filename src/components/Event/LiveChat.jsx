import { useState, useEffect, useRef } from 'react';
import { generateChatMessage } from '../../data/mockChat';
import { Send, Smile, Gift, ChevronDown, ChevronUp, X, Shield, Gem, Star, CheckCircle2, Crown, Flame, Zap, TrendingUp, Bell } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const COMMON_EMOJIS = ['😂', '❤️', '🔥', '👍', '👋', '🎉', '😮', '💯', '✨', '🙌'];

export default function LiveChat({ event, onCollapse, onFocusChange }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isPinnedToBottom, setIsPinnedToBottom] = useState(true);
  
  // Mobile feed toggle state
  const [mobileFeedOpen, setMobileFeedOpen] = useState(false);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [tipStep, setTipStep] = useState('none'); // 'none', 'select'
  
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
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setEmojiPickerOpen(false);
      }
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

  const handleSendTip = (amount) => {
    // LINK: Use the current input message if present, otherwise use a default premium label
    const userMessage = inputMessage.trim() || "Diamond Tier Support! 💎";
    
    const newMsg = {
      id: Math.random().toString(36).substr(2, 9),
      user: 'You',
      message: userMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isDonation: true,
      amount: amount
    };
    
    setMessages((prev) => [...prev, newMsg]);
    setTipStep('none');
    setInputMessage(''); // Clear the input after sending the linked super chat
    scrollToBottom();
  };

  const onMessagesScroll = () => {
    const el = messageContainerRef.current;
    if (!el) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
    setIsPinnedToBottom(nearBottom);
  };

  const addEmoji = (emoji) => setInputMessage(prev => prev + emoji);

  const handleInputFocus = () => {
    if (onFocusChange) onFocusChange(true);
    setMobileFeedOpen(true); 
  };

  const handleInputBlur = () => {
    // Keep it focused for a moment to allow emoji interaction
    setTimeout(() => {
      if (onFocusChange) onFocusChange(false);
    }, 200);
  };

  const [viewportHeight, setViewportHeight] = useState('100%');

  useEffect(() => {
    if (!window.visualViewport) return;
    
    const handleResize = () => {
      // On mobile, find the available height below the fixed video (approx 210-250px)
      // and ensure the chat fits in the visual viewport
      if (window.innerWidth < 1024 && mobileFeedOpen) {
        setViewportHeight(`${window.visualViewport.height - 230}px`);
      } else {
        setViewportHeight('');
      }
    };

    window.visualViewport.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    return () => window.visualViewport.removeEventListener('resize', handleResize);
  }, [mobileFeedOpen]);

  const shell = isLight ? 'bg-white border-slate-200' : 'bg-[#0a0a0f] border-white/10';
  const inputBar = isLight ? 'bg-slate-50 border-t border-slate-200/60' : 'bg-[#0a0a0f] border-t border-white/5';
  const inputField = isLight ? 'bg-white text-slate-900 border-slate-200 focus:border-indigo-500' : 'bg-white/5 text-white border-transparent focus:border-white/10';

  return (
    <div 
      className={`flex flex-col rounded-2xl overflow-hidden relative w-full border shadow-2xl transition-all duration-300 ${shell} ${
        mobileFeedOpen 
          ? 'h-[min(450px,60svh)] sm:h-[500px]' 
          : 'h-[60px] md:h-[min(580px,calc(100vh-10rem))]'
      }`}
      style={mobileFeedOpen ? { height: viewportHeight } : {}}
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
        className={`flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 scrollbar-hide relative ${isLight ? 'bg-white' : 'bg-[#0a0a0f]'} ${
          mobileFeedOpen ? 'block' : 'hidden md:block'
        }`}
      >
        {/* ── Pre-show Context Banner ── */}
        {event && !event.isLive && (
           <motion.div 
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             className={`sticky top-0 z-20 mb-4 p-3 rounded-xl border backdrop-blur-md flex items-center gap-3 shadow-xl ${
                isLight ? 'bg-indigo-50/90 border-indigo-100 flex-col items-start' : 'bg-indigo-500/10 border-indigo-500/20 flex-col items-start'
             }`}
           >
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                 <span className={`text-[10px] font-black uppercase tracking-widest ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`}>Pre-show Lounge Active</span>
              </div>
              <p className={`text-[11px] leading-snug ${isLight ? 'text-indigo-900/60 font-medium' : 'text-indigo-100/60 font-medium'}`}>
                 The official broadcast for <span className="text-indigo-500 font-bold">"{event.title}"</span> is scheduled to start at <span className="underline decoration-indigo-500/50 underline-offset-2">{event.schedule}</span>.
              </p>
           </motion.div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div 
              key={msg.id} 
              initial={{ opacity: 0, y: 10, scale: 0.95 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              className="flex flex-col gap-1 w-full"
            >
              {msg.isDonation ? (
                <div className="rounded-xl overflow-hidden border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.15)] mb-2">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold text-white uppercase">{msg.user[0]}</div>
                      <span className="font-black text-white text-xs">{msg.user}</span>
                    </div>
                    <span className="font-black text-white text-xs shadow-sm">${msg.amount}</span>
                  </div>
                  <div className={`p-3 text-xs font-medium leading-relaxed ${
                    isLight ? 'bg-amber-100 text-amber-950' : 'bg-amber-500/10 text-amber-200/90 backdrop-blur-sm'
                  }`}>
                    {msg.message}
                  </div>
                </div>
              ) : (
                <div className={`group relative p-2 rounded-xl transition-all border ${
                  msg.message.includes('@You') 
                    ? 'bg-indigo-500/10 border-indigo-500/40 shadow-[inset_0_0_20px_rgba(99,102,241,0.1)]' 
                    : isLight 
                      ? 'bg-slate-50/50 border-slate-200' 
                      : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.05] hover:border-white/10'
                } ${
                  msg.role === 'mod' ? 'border-emerald-500/20 bg-emerald-500/5' :
                  msg.role === 'vip' ? 'border-indigo-500/20 bg-indigo-500/5' :
                  msg.role === 'founder' ? 'border-amber-500/30 bg-amber-500/5 shadow-[0_0_15px_rgba(245,158,11,0.05)]' :
                  msg.role === 'top_fan' ? 'border-orange-500/20 bg-orange-500/5' :
                  msg.role === 'sub' ? 'border-sky-500/20 bg-sky-500/5' : ''
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      {msg.role === 'founder' && <Crown className="w-3 h-3 text-amber-400 shrink-0 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" />}
                      {msg.role === 'mod' && <Shield className="w-3 h-3 text-emerald-400 shrink-0" />}
                      {msg.role === 'vip' && <Gem className="w-3 h-3 text-indigo-400 shrink-0" />}
                      {msg.role === 'top_fan' && <Flame className="w-3 h-3 text-orange-500 shrink-0" />}
                      {msg.role === 'sub' && <Star className="w-3 h-3 text-sky-400 shrink-0" />}
                      
                      <span className={`font-bold text-[13px] truncate ${
                        msg.role === 'founder' ? 'text-amber-400' :
                        msg.role === 'mod' ? 'text-emerald-400' :
                        msg.role === 'vip' ? 'text-indigo-400' :
                        msg.role === 'top_fan' ? 'text-orange-500' :
                        msg.role === 'sub' ? 'text-sky-400' :
                        isLight ? 'text-slate-700' : 'text-neutral-300'
                      }`}>
                        {msg.user}
                      </span>
                      {msg.isVerified && <CheckCircle2 className="w-3 h-3 text-indigo-500 shrink-0" />}
                    </div>
                    <span className="text-[9px] text-neutral-500 ml-auto shrink-0">{msg.timestamp}</span>
                  </div>
                  <p className={`text-[13px] leading-relaxed break-words ${
                    msg.message.includes('@You') ? 'text-indigo-200 font-medium' :
                    isLight ? 'text-slate-600' : 'text-neutral-300/90'
                  }`}>
                    {msg.message.split('@You').map((part, i, arr) => (
                      <span key={i}>
                        {part}
                        {i < arr.length - 1 && <span className="bg-indigo-500/30 text-indigo-300 px-1 rounded font-bold">@You</span>}
                      </span>
                    ))}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Scroll Toast Button */}
        <AnimatePresence>
          {!isPinnedToBottom && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
              className="sticky bottom-4 left-0 right-0 flex justify-center z-50 pointer-events-none"
            >
              <button 
                onClick={scrollToBottom}
                className="pointer-events-auto bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold px-4 py-2 rounded-full shadow-[0_8px_30px_rgba(99,102,241,0.4)] flex items-center gap-2 transition-all border border-indigo-400/30"
              >
                <ChevronDown className="w-3 h-3" />
                NEW MESSAGES
              </button>
            </motion.div>
          )}
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
            
            {tipStep === 'select' && (
               <motion.div 
                 initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
                 className={`absolute bottom-full mb-3 left-0 w-full p-3 rounded-2xl border shadow-2xl z-[110] ${
                   isLight ? 'bg-white border-slate-200' : 'bg-[#121214]/95 border-white/10 backdrop-blur-xl'
                 }`}
               >
                  <div className="flex items-center justify-between mb-3 px-1">
                     <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">Super Chat Tips</span>
                     <button onClick={() => setTipStep('none')}><X className="w-3 h-3 text-neutral-500" /></button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                     {[5, 10, 50].map(amt => (
                        <button
                           key={amt}
                           type="button"
                           onClick={() => handleSendTip(amt)}
                           className="bg-amber-500 hover:bg-amber-400 text-white font-black py-2 rounded-xl transition-all active:scale-95 text-xs shadow-lg shadow-amber-500/20"
                        >
                           ${amt}
                        </button>
                     ))}
                  </div>
               </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-2 relative">
            <button 
              type="button" 
              onClick={() => { setEmojiPickerOpen(!emojiPickerOpen); setTipStep('none'); }}
              className={`p-1.5 transition-colors ${emojiPickerOpen ? 'text-indigo-500' : 'text-neutral-500 hover:text-indigo-400'}`}
            >
              <Smile className="w-5 h-5" />
            </button>
            <button 
              type="button" 
              onClick={() => { setTipStep(tipStep === 'none' ? 'select' : 'none'); setEmojiPickerOpen(false); }}
              className={`p-1.5 transition-colors ${tipStep !== 'none' ? 'text-amber-500' : 'text-neutral-500 hover:text-amber-400'}`}
            >
              <Gift className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={inputMessage}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
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
