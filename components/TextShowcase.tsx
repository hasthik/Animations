import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { RefreshCcw } from 'lucide-react';

const TEXT_ANIMATIONS = [
  { id: 'glide', name: '35. Glide', type: 'reveal' },
  { id: 'morph-inflate', name: '34. Morph: Inflating', type: 'morph' },
  { id: 'counter', name: '38. Counter: Installs', type: 'data' },
  { id: 'gravity', name: '40. Zero Gravity', type: 'physics' },
  { id: 'glitch', name: '43. Glitch 01', type: 'glitch' },
  { id: 'departures', name: '46. Departures Board', type: 'scroller' },
  { id: 'mask', name: '48. Negative Mask', type: 'mask' },
  { id: 'elastic', name: '53. Stretch', type: 'physics' },
  { id: 'scramble', name: '70. Matrix/Scramble', type: 'scroller' },
  { id: 'blur', name: '39. Blur Scroller', type: 'reveal' },
];

export const TextShowcase: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('glide');
  const [key, setKey] = useState(0); // Used to replay animations

  const replay = () => setKey(k => k + 1);

  return (
    <section className="py-24 px-4 md:px-12 bg-zinc-900 border-t border-white/10" id="text-lab">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">V. Text Animation Lab</h2>
            <p className="text-slate-400">Interactive playground for items 33-71 from the technique list.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[600px]">
          {/* Selector Sidebar */}
          <div className="lg:col-span-3 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
            {TEXT_ANIMATIONS.map((anim) => (
              <button
                key={anim.id}
                onClick={() => { setActiveId(anim.id); replay(); }}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-mono transition-all duration-200 border ${
                  activeId === anim.id 
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
                    : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'
                }`}
              >
                {anim.name}
              </button>
            ))}
          </div>

          {/* Stage */}
          <div className="lg:col-span-9 bg-black rounded-2xl border border-white/10 flex flex-col relative overflow-hidden">
            <div className="absolute top-4 right-4 z-20">
              <button onClick={replay} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <RefreshCcw className="w-5 h-5 text-white" />
              </button>
            </div>
            
            <div className="flex-1 flex items-center justify-center p-8">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={`${activeId}-${key}`} // Force remount on replay
                  className="text-center"
                >
                  {activeId === 'glide' && <GlideText />}
                  {activeId === 'morph-inflate' && <InflateText />}
                  {activeId === 'counter' && <CounterText />}
                  {activeId === 'gravity' && <GravityText />}
                  {activeId === 'glitch' && <GlitchText />}
                  {activeId === 'departures' && <DeparturesBoard />}
                  {activeId === 'mask' && <MaskText />}
                  {activeId === 'elastic' && <StretchText />}
                  {activeId === 'scramble' && <ScrambleText />}
                  {activeId === 'blur' && <BlurText />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Specific Implementations of "V. Text Animations" ---

const GlideText = () => {
  const words = "The Quick Brown Fox".split(" ");
  return (
    <div className="overflow-hidden flex gap-4 text-5xl md:text-7xl font-bold">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: 150, rotate: 10 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: i * 0.1, 
            ease: [0.2, 0.65, 0.3, 0.9] 
          }}
          className="inline-block origin-top-left"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

const InflateText = () => (
    <motion.h1 
        className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-violet-500"
        initial={{ scale: 0.5, filter: "blur(10px)", opacity: 0 }}
        animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
    >
        INFLATE
    </motion.h1>
);

const CounterText = () => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);
    
    useEffect(() => {
        const controls = { stop: () => {} };
        // Simple animation implementation instead of useAnimate for brevity
        let start = 0;
        const end = 1000;
        const duration = 2000;
        const startTime = performance.now();

        const animate = (time: number) => {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quart
            const ease = 1 - Math.pow(1 - progress, 4);
            count.set(start + (end - start) * ease);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }, []);

    return (
        <div className="flex flex-col items-center">
            <motion.div className="text-8xl font-mono font-bold text-emerald-400">
                <motion.span>{rounded}</motion.span>+
            </motion.div>
            <span className="text-xl uppercase tracking-widest mt-4">Figma Installs</span>
        </div>
    );
};

const GravityText = () => {
    const letters = "BOUNCY".split("");
    return (
        <div className="flex text-7xl md:text-9xl font-black">
            {letters.map((l, i) => (
                <motion.span
                    key={i}
                    initial={{ y: -200, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                        type: "spring", 
                        damping: 12, 
                        stiffness: 200, 
                        delay: i * 0.1 
                    }}
                    className="inline-block text-white"
                >
                    {l}
                </motion.span>
            ))}
        </div>
    );
};

const GlitchText = () => (
    <div className="relative group">
        <h1 className="text-8xl font-black text-white relative z-10">GLITCH</h1>
        <h1 className="text-8xl font-black text-red-500 absolute top-0 left-0 -z-10 opacity-0 group-hover:opacity-70 animate-glitch" style={{ animationDelay: '0.1s' }}>GLITCH</h1>
        <h1 className="text-8xl font-black text-blue-500 absolute top-0 left-0 -z-10 opacity-0 group-hover:opacity-70 animate-glitch" style={{ animationDelay: '0.2s' }}>GLITCH</h1>
    </div>
);

const DeparturesBoard = () => {
    const [text, setText] = useState("NEW YORK");
    const targets = ["LONDON", "TOKYO", "PARIS", "BERLIN"];
    
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(targets[i % targets.length]);
            i++;
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // Simplified effect for demo
    return (
        <div className="bg-zinc-800 p-8 rounded-xl border border-zinc-700">
            <div className="text-6xl font-mono tracking-widest text-amber-500">
                {text.split('').map((char, i) => (
                    <span key={`${text}-${i}`} className="inline-block border-r border-zinc-900 bg-zinc-900 px-2 py-1 mx-[1px] min-w-[50px] animate-pulse">
                        {char}
                    </span>
                ))}
            </div>
            <div className="mt-4 flex justify-between text-amber-500/50 font-mono text-sm uppercase">
                <span>Flight 404</span>
                <span>On Time</span>
            </div>
        </div>
    );
};

const MaskText = () => (
    <div className="relative overflow-hidden w-[600px] h-[200px] flex items-center justify-center bg-white text-black">
        <motion.div
            className="absolute inset-0 bg-black z-10"
            initial={{ x: "0%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <h1 className="text-8xl font-bold tracking-tighter">NEGATIVE</h1>
    </div>
);

const StretchText = () => (
    <motion.h1
        className="text-8xl font-black tracking-tight"
        initial={{ scaleY: 2, scaleX: 0.5, opacity: 0 }}
        animate={{ scaleY: 1, scaleX: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 8, mass: 0.5 }}
    >
        STRETCH
    </motion.h1>
);

const ScrambleText = () => {
    const target = "ENCRYPTED";
    const chars = "!@#$%^&*()_+{}|:<>?";
    const [display, setDisplay] = useState(target);

    useEffect(() => {
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplay(
                target
                    .split("")
                    .map((letter, index) => {
                        if (index < iterations) return target[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );
            if (iterations >= target.length) clearInterval(interval);
            iterations += 1 / 3; 
        }, 30);
        return () => clearInterval(interval);
    }, []);

    return <h1 className="text-6xl font-mono text-green-500">{display}</h1>;
};

const BlurText = () => (
    <div className="space-y-4 text-center">
        {["Motion", "Creates", "Emotion"].map((word, i) => (
            <motion.div
                key={i}
                initial={{ filter: "blur(20px)", opacity: 0, y: 20 }}
                animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="text-6xl font-bold"
            >
                {word}
            </motion.div>
        ))}
    </div>
);
