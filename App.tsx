import React from 'react';
import { HeroSection } from './components/HeroSection';
import { TextShowcase } from './components/TextShowcase';
import { ScrollShowcase } from './components/ScrollShowcase';
import { CoreAnimations } from './components/CoreAnimations';
import { CustomCursor } from './components/CustomCursor';
import { motion, useScroll, useSpring } from 'framer-motion';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-[#09090b] text-white min-h-screen cursor-none selection:bg-emerald-500/30 selection:text-emerald-200">
      <CustomCursor />
      
      {/* 20. Reading Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-40 mix-blend-difference">
        <span className="font-bold text-xl tracking-tighter">MOTION.</span>
        <div className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#text-lab" className="hover:text-emerald-400 transition-colors">Text FX</a>
            <a href="#scroll" className="hover:text-emerald-400 transition-colors">Scroll</a>
            <a href="#core" className="hover:text-emerald-400 transition-colors">Core</a>
        </div>
      </nav>

      <main>
        <HeroSection />
        <CoreAnimations />
        <ScrollShowcase />
        <TextShowcase />
      </main>

      <footer className="py-12 border-t border-white/10 text-center text-zinc-500 text-sm">
        <p>Built with React, Tailwind & Framer Motion</p>
        <p className="mt-2">Implementing 70+ Web Animation Techniques</p>
      </footer>
    </div>
  );
};

export default App;