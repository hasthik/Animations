import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ScrollShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const xMove = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <section className="bg-[#09090b] text-white py-24 overflow-hidden" ref={containerRef}>
      <div className="px-4 md:px-12 mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">III. Scroll & Interactive</h2>
        <p className="text-slate-400">Horizontal scroll, Parallax, and 3D transforms driven by scroll position.</p>
      </div>

      {/* 16. Horizontal Scroll Strip */}
      <div className="relative w-full h-[60vh] flex items-center">
         <motion.div 
            className="flex gap-8 whitespace-nowrap pl-12"
            style={{ x: xMove }}
         >
            {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-[400px] h-[300px] bg-zinc-800 rounded-2xl border border-zinc-700 p-8 flex-shrink-0 relative overflow-hidden group">
                    <span className="text-9xl font-bold text-zinc-700 absolute -bottom-4 -right-4 z-0">{i}</span>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-2">Card {i}</h3>
                        <p className="text-zinc-400">Drag or scroll to move horizontally. Uses CSS Transforms mapped to window scroll.</p>
                    </div>
                    {/* 27. Reveal Animation (Masking) on Hover */}
                    <div className="absolute inset-0 bg-emerald-600/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                </div>
            ))}
         </motion.div>
      </div>

      {/* 14. Parallax Section */}
      <div className="h-[80vh] relative flex items-center justify-center overflow-hidden mt-24">
         <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
            className="absolute inset-0 bg-[url('https://picsum.photos/1920/1080?grayscale')] bg-cover bg-center opacity-20"
         />
         <div className="relative z-10 text-center">
            <motion.div 
                style={{ rotate }} 
                className="w-32 h-32 bg-emerald-500 mx-auto mb-8 rounded-xl backdrop-blur-md bg-opacity-80"
            />
            <h2 className="text-6xl font-bold mix-blend-overlay">PARALLAX DEPTH</h2>
         </div>
      </div>
    </section>
  );
};