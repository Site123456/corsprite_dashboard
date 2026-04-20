"use client";

import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Box, Brain, Palette, Library, Ruler, LayoutTemplate, ScanSearch, MessageSquare } from 'lucide-react';

const features = [
  { icon: Palette, title: "Customizable App UX", desc: "Tailor the platform's look, feel, and flow entirely to match your brand's unique identity." },
  { icon: Library, title: "Museum Exhibitions", desc: "Preserve heritage with millimeter-accurate 3D asset generation and digital archives." },
  { icon: Box, title: "3D Reconstruction", desc: "Build photorealistic 3D models of any specific environment instantly with precise meshes." },
  { icon: Brain, title: "Scene Understanding", desc: "Our localized LLMs analyze objects, context, and complex structural elements intuitively." },
  { icon: Ruler, title: "Auto Measurements", desc: "Millimeter-accurate dimensions automatically extracted from point-cloud scans natively." },
  { icon: LayoutTemplate, title: "Floor Plan Export", desc: "Extract standardized 2D and 3D top-down blueprints completely formatted for CAD." },
  { icon: ScanSearch, title: "Object Detection", desc: "Tag and catalog furniture, fixtures, and valuable assets systematically without manual input." },
  { icon: MessageSquare, title: "Chat With Space", desc: "Ask contextual questions about the exact scanned room directly leveraging our spatial APIs." }
];

const FeatureCard = ({ feature, idx }: { feature: typeof features[0], idx: number }) => {
  const Icon = feature.icon;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 40 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <div className="perspective-1000">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        className="bg-white border border-gray-100 p-7 flex flex-col group transition-colors duration-500 rounded-[1.5rem] shadow-[0_5px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] relative overflow-hidden isolate transform-style-3d cursor-pointer h-full"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

        <div className="w-11 h-11 rounded-[12px] flex items-center justify-center mb-6 bg-gray-50 text-gray-500 group-hover:bg-brand text-brand shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:text-white border border-gray-100 group-hover:border-brand transform-style-3d translate-z-10">
          <Icon className="w-5 h-5" strokeWidth={1.5} />
        </div>
        <div className="transform-style-3d translate-z-5">
          <h3 className="text-[15px] font-bold text-gray-900 mb-2.5 tracking-tight group-hover:text-brand transition-colors">{feature.title}</h3>
          <p className="text-[13px] text-gray-500 leading-relaxed font-medium">{feature.desc}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default function Features() {
  return (
    <section className="py-16 md:py-24 px-6 relative bg-white border-t border-gray-50/50">
      <div className="max-w-[1300px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-14"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 tracking-tight">Capabilities Redefined</h2>
          <p className="text-gray-500 max-w-xl font-medium text-[14px] leading-relaxed">
            A comprehensive suite of intelligence tools designed strictly for creating customizable spatial experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
