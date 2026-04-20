"use client";

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Building2, Armchair, HardHat, Library } from 'lucide-react';

const industries = [
  {
    icon: Building2,
    title: "Real Estate",
    description: "Auto-generate immersive virtual tours, exact measurements, and detailed property descriptions to create higher-converting listings automatically."
  },
  {
    icon: Armchair,
    title: "Interior Design",
    description: "Export highly accurate 3D rooms into your CAD tools. Receive smart layout suggestions and analyze customizable furniture placement natively."
  },
  {
    icon: HardHat,
    title: "Construction",
    description: "Track site progress seamlessly, verify as-built dimensions against structural blueprints, and manage comprehensive visual documentation."
  },
  {
    icon: Library,
    title: "Museums & Culture",
    description: "Archive entire historic spaces in millimeter accuracy. Provide a customizable user experience tailored to digital museum exhibitions for global audiences."
  }
];

const IndustryPlate = ({ item, idx }: { item: typeof industries[0], idx: number }) => {
  const Icon = item.icon;
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
    <div className="perspective-1000 h-full">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        className="relative flex flex-col items-start p-8 rounded-[2rem] bg-white border border-gray-100 group transition-colors duration-500 shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] overflow-hidden isolate transform-style-3d cursor-default h-full"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        
        <div className="shrink-0 w-14 h-14 rounded-[16px] bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-brand group-hover:text-white transition-all duration-500 mb-6 group-hover:scale-110 shadow-sm transform-style-3d translate-z-10">
          <Icon size={24} strokeWidth={1.5} />
        </div>
        
        <div className="pt-0.5 transform-style-3d translate-z-5">
          <h3 className="text-[17px] font-bold mb-3 text-gray-900 tracking-tight group-hover:text-brand transition-colors">{item.title}</h3>
          <p className="text-gray-500 leading-relaxed font-medium text-[14px]">{item.description}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default function Industries() {
  return (
    <section className="py-16 md:py-24 px-6 relative z-10 bg-[#FAFAFC] border-t border-gray-100 overflow-hidden">
      <div className="max-w-[1300px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-14"
        >
           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Engineered for your industry</h2>
           <p className="text-[15px] max-w-lg text-gray-500 font-medium">Vertical-specific implementations powering massive structures, natively processing raw datasets.</p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 hover:gap-6">
          {industries.map((item, index) => (
            <IndustryPlate key={index} item={item} idx={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
