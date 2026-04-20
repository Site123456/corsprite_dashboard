"use client";

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';

export default function Demo() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <section className="py-16 md:py-24 px-6 bg-[#FAFAFC] border-t border-gray-100 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-br from-brand/5 to-transparent blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row items-center gap-14 relative z-10">
        
        <div className="flex-1 w-full perspective-1000">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY }}
            className="w-full aspect-video rounded-[2rem] overflow-hidden relative flex items-center justify-center group cursor-pointer border border-white/60 hover:border-brand/30 transition-colors shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_40px_80px_rgba(30,50,100,0.15)] bg-white transform-style-3d glass-card"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand/[0.04] via-transparent to-brand/[0.04] opacity-50 mix-blend-overlay group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-16 h-16 rounded-full bg-white/95 backdrop-blur-md border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex items-center justify-center text-gray-900 group-hover:scale-110 group-hover:text-brand transition-all duration-500 relative z-10 transform-style-3d translate-z-10">
              <Play fill="currentColor" size={22} className="ml-1 relative z-10" />
              <div className="absolute inset-0 rounded-full border-2 border-brand/50 group-hover:animate-ping opacity-0 group-hover:opacity-100 pointer-events-none" />
            </div>
            <div className="absolute bottom-5 left-5 right-5 flex justify-between items-center text-[12px] font-bold text-gray-700 transform-style-3d translate-z-5">
              <span className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-[10px] shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-gray-100 hover:text-brand transition-colors">Live Dashboard</span>
              <span className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-[10px] shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-gray-100">2:14</span>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex-1 text-left"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 tracking-tight">Watch it in action</h2>
          <p className="text-[15px] text-gray-500 font-medium max-w-md leading-relaxed">
            Experience the raw power of the point-to-mesh automated spatial generator strictly within the web portal. High-fidelity rendering with absolute accuracy.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
