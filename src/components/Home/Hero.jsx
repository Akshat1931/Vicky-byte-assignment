import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { mockEvents } from '../../data/mockEvents';
import { Play } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef(null);
  const Motion = motion;
  
  // We track scroll progress specifically over the Hero's designated 300vh wrapper.
  // By using 'scrollYProgress', it cleanly maps 0 to 1 without hard-coded pixel breakpoints that risk breaking on different devices.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Adding a tiny useSpring smoothing function cleans up native browser scroll lag/stutter on trackpads
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.5 });
  
  const featuredEvents = mockEvents.slice(0, 3);

  // --- REFINED TIMELINE SCRUB SEQUENCE (0 to 1 Progress) ---
  
  // Background slowly scales in
  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.2]);
  
  // High-Impact Typography (Zooms out and vanishes instantly during first 20% scroll)
  const textScale = useTransform(smoothProgress, [0, 0.2], [1, 2]);
  const textOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const textY = useTransform(smoothProgress, [0, 0.2], [0, -100]);

  // Left card flies from outside screen space
  const leftX = useTransform(smoothProgress, [0.1, 0.4], [-600, 0]);
  const leftY = useTransform(smoothProgress, [0.1, 1], [150, -100]); 
  const leftRotate = useTransform(smoothProgress, [0.1, 0.4], [-45, -8]);
  const leftOpacity = useTransform(smoothProgress, [0.1, 0.2], [0, 1]);

  // Right card flies from the far right edge
  const rightX = useTransform(smoothProgress, [0.1, 0.4], [600, 0]);
  const rightY = useTransform(smoothProgress, [0.1, 1], [150, -100]);
  const rightRotate = useTransform(smoothProgress, [0.1, 0.4], [45, 8]);
  const rightOpacity = useTransform(smoothProgress, [0.1, 0.2], [0, 1]);

  // Main Event Card Arrival & Lock
  const mainY = useTransform(smoothProgress, [0.2, 0.6], [800, 0]);
  const mainScale = useTransform(smoothProgress, [0.2, 0.6], [0.7, 1]);
  const mainRotateX = useTransform(smoothProgress, [0.2, 0.6], [25, 0]); 

  // Smooth Exit fade-out of the fixed container so it gracefully transitions into the EventGrid
  const exitOpacity = useTransform(smoothProgress, [0.85, 1], [1, 0]);
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[250vh] w-full bg-[#030305]" style={{ position: 'relative' }}>
      <Motion.div
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden perspective-[1200px]"
        style={{ opacity: exitOpacity, willChange: 'opacity' }}
      >
        
        {/* Deep Background */}
        <Motion.div 
          className="absolute inset-0 z-0 pointer-events-none mix-blend-screen"
          style={{ scale: bgScale, willChange: 'transform' }}
        >
          <div className="absolute top-0 w-[50%] h-[60%] left-[25%] bg-indigo-600/10 rounded-full blur-[160px]" />
          <div className="absolute top-10 right-10 w-[40%] h-[50%] bg-purple-600/10 rounded-full blur-[150px]" />
        </Motion.div>

        {/* Cinematic HUD (additive only, does not alter choreography) */}
        <div className="pointer-events-none absolute inset-0 z-40 hidden md:block">
          <div className="absolute right-8 top-1/2 -translate-y-1/2 h-48 w-1 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="w-full origin-bottom bg-gradient-to-t from-indigo-500 via-purple-400 to-pink-400"
              style={{ height: '100%', scaleY: progressScale }}
            />
          </div>
        </div>

        {/* Forefront Typography */}
        <Motion.div 
          className="absolute z-10 flex flex-col items-center top-[15vh] px-4 w-full"
          style={{ y: textY, opacity: textOpacity, scale: textScale, willChange: 'transform, opacity' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 glass-panel text-xs text-indigo-300 mb-8 font-semibold tracking-widest uppercase shadow-[0_0_20px_rgba(99,102,241,0.2)]">
             <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(129,140,248,1)]" /> Cinematic Timeline Scrub
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] leading-[1.0] font-black tracking-tighter text-white mb-6 text-center drop-shadow-2xl">
            Live Streaming
            <br />
            <span className="hero-title-accent bg-gradient-to-br from-white via-indigo-200 to-indigo-600 bg-clip-text text-transparent">Reinvented</span>
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto font-light text-center tracking-normal">
            Scroll smoothly to dive in. Zero latency. Maximum interaction.
          </p>
        </Motion.div>

        {/* Timeline Sequence Layer */}
        <div className="absolute inset-x-0 top-[20vh] md:top-[40vh] z-20 flex justify-center items-center w-full max-w-[1600px] mx-auto px-4">
          
          {/* Left Sub-Card */}
          <Motion.div 
            className="absolute left-[5%] md:left-[15%] w-48 md:w-[320px] aspect-[3/4] md:aspect-video rounded-3xl overflow-hidden glass-panel shadow-[0_0_60px_rgba(0,0,0,0.6)] z-10 border border-white/5 pointer-events-auto"
            style={{ x: leftX, y: leftY, rotateZ: leftRotate, opacity: leftOpacity, willChange: 'transform, opacity' }}
          >
            <Link to={`/event/${featuredEvents[1].id}`} className="w-full h-full relative cursor-pointer group block">
              <img src={featuredEvents[1].imageUrl} alt="Sub Event" className="w-full h-full object-cover mix-blend-luminosity opacity-80 group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-700" />
            </Link>
          </Motion.div>

          {/* Right Sub-Card */}
          <Motion.div 
            className="absolute right-[5%] md:right-[15%] w-40 md:w-[280px] aspect-[4/5] md:aspect-video rounded-3xl overflow-hidden glass-panel shadow-[0_0_60px_rgba(0,0,0,0.6)] z-10 border border-white/5 pointer-events-auto"
            style={{ x: rightX, y: rightY, rotateZ: rightRotate, opacity: rightOpacity, willChange: 'transform, opacity' }}
          >
             <Link to={`/event/${featuredEvents[2].id}`} className="w-full h-full relative cursor-pointer group block">
               <img src={featuredEvents[2].imageUrl} alt="Secondary Event" className="w-full h-full object-cover mix-blend-luminosity opacity-70 group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-700" />
             </Link>
          </Motion.div>

          {/* Main Dominant Center Card */}
          <Motion.div 
            className="absolute z-30 w-[90%] md:w-[750px] aspect-video rounded-[32px] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(99,102,241,0.2)] border border-white/10 pointer-events-auto bg-black"
            style={{ y: mainY, scale: mainScale, rotateX: mainRotateX, willChange: 'transform' }}
          >
            <div className="w-full h-full relative group">
              <img src={featuredEvents[0].imageUrl} alt="Main Event" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12 transition-opacity duration-300">
                 <div className="flex items-center gap-3 mb-4">
                   <span className="px-3 py-1.5 bg-rose-500/20 backdrop-blur-xl border border-rose-500/30 text-[10px] text-rose-300 font-bold tracking-widest uppercase rounded flex items-center gap-2">
                     <div className="w-1.5 h-1.5 bg-rose-500 rounded-full shadow-[0_0_15px_rgba(244,63,94,1)] animate-pulse" /> LIVE NOW
                   </span>
                 </div>
                 <h3 className="text-3xl md:text-5xl font-black text-white mb-2 md:mb-4 tracking-tight drop-shadow-xl">{featuredEvents[0].title}</h3>
                 <p className="text-neutral-300 text-sm md:text-lg mb-6 md:mb-8 font-light drop-shadow-md">{featuredEvents[0].creator}</p>
                 <Link 
                   to={`/event/${featuredEvents[0].id}`}
                   className="pointer-events-auto"
                 >
                   <Motion.button 
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     className="flex items-center justify-center gap-2 bg-white text-black font-semibold py-3 md:py-4 px-8 md:px-10 rounded-full shadow-2xl w-max transition-colors hover:bg-neutral-200"
                   >
                     <Play className="w-5 h-5 fill-black" /> Enter Stream
                   </Motion.button>
                 </Link>
              </div>
            </div>
          </Motion.div>
        </div>
        
      </Motion.div>
    </div>
  );
}
