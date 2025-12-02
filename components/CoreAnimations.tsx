import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, Send, Heart, Bell } from 'lucide-react';

export const CoreAnimations: React.FC = () => {
  return (
    <section className="py-24 px-4 md:px-12 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12">I. & II. Core Mechanics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* 1. Loaders */}
                <div className="p-8 bg-zinc-900 rounded-xl border border-zinc-800">
                    <h3 className="text-xl font-bold mb-6 text-emerald-400">01. Loaders</h3>
                    <div className="flex gap-4 items-center justify-center h-32">
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        >
                            <Loader2 className="w-8 h-8 text-white" />
                        </motion.div>
                        
                        <div className="flex gap-1">
                            {[0, 1, 2].map(i => (
                                <motion.div 
                                    key={i}
                                    className="w-3 h-3 bg-emerald-500 rounded-full"
                                    animate={{ y: [-5, 5, -5] }}
                                    transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. Microinteractions */}
                <div className="p-8 bg-zinc-900 rounded-xl border border-zinc-800">
                    <h3 className="text-xl font-bold mb-6 text-blue-400">02. Microinteractions</h3>
                    <div className="flex flex-col gap-4 items-center justify-center h-32">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-black px-6 py-2 rounded-full font-medium flex items-center gap-2 group"
                        >
                            Send Message
                            <motion.span 
                                className="inline-block"
                                group-hover={{ x: 5, rotate: -45 }}
                            >
                                <Send className="w-4 h-4" />
                            </motion.span>
                        </motion.button>

                        <div className="flex gap-4">
                            <motion.button whileTap={{ scale: 0.8 }} className="p-3 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors">
                                <Heart className="w-5 h-5 text-red-500" />
                            </motion.button>
                            <motion.button 
                                whileHover={{ rotate: [0, -10, 10, -10, 0] }} 
                                className="p-3 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors"
                            >
                                <Bell className="w-5 h-5 text-yellow-500" />
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* 31. Neumorphism / Glassmorphism */}
                <div className="p-8 bg-zinc-800 rounded-xl border border-zinc-700 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20" />
                    <h3 className="text-xl font-bold mb-6 text-purple-400 relative z-10">32. Glassmorphism</h3>
                    <div className="flex items-center justify-center h-32 relative z-10">
                        <motion.div 
                            className="w-48 h-24 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl shadow-xl flex items-center justify-center"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        >
                            <span className="font-semibold text-white/80">Frosted Glass</span>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};