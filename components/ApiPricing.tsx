"use client";

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { BrainCircuit, Box, FileText, Image as ImageIcon, Video, Mic, Gem, UploadCloud, DownloadCloud } from 'lucide-react';

const llmModels = [
  {
    name: "Corsprite 120B",
    params: "Fast & Efficient",
    priceIn: "€0.80",
    priceOut: "€1.40",
    desc: "Optimal logic & speed balance",
    badge: "All Plans",
    accent: "border-blue-200/60 hover:border-blue-300 hover:shadow-[0_20px_40px_-15px_rgba(58,123,255,0.15)] shadow-sm",
    iconBg: "bg-blue-50",
    iconText: "text-blue-600",
    requiresPro: false,
  },
  {
    name: "Corsprite 260B",
    params: "Accurate & Efficient",
    priceIn: "€3.00",
    priceOut: "€15.00",
    desc: "Deep visual structure inference",
    badge: "Pro & Enterprise",
    accent: "border-purple-200/60 hover:border-purple-300 hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.15)] shadow-sm",
    iconBg: "bg-purple-50",
    iconText: "text-purple-600",
    requiresPro: true,
  },
  {
    name: "Corsprite 640B",
    params: "Most Accurate",
    priceIn: "€8.00",
    priceOut: "€24.00",
    desc: "Absolute parameter physics scale",
    badge: "Pro & Enterprise",
    accent: "border-amber-200/60 hover:border-amber-400 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.15)] shadow-sm",
    iconBg: "bg-amber-50",
    iconText: "text-amber-500",
    requiresPro: true,
  }
];

const inputs = [
  { icon: FileText, label: "Text", ext: "txt, json" },
  { icon: ImageIcon, label: "Image", ext: "png, jpg" },
  { icon: Video, label: "Video", ext: "mp4, mov" },
  { icon: Mic, label: "Audio", ext: "mp3, wav" },
  { icon: Box, label: "3D Spatial", ext: "obj, stl, glb" },
];

const outputs = [
  { icon: FileText, label: "Intelligence", ext: "json" },
  { icon: Box, label: "Files", ext: "mp3, mp4, png, obj, stl, txt, pdf" },
];

const ModelCard = ({ model, idx }: { model: typeof llmModels[0], idx: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <div className="perspective-1000 flex-none h-full py-4">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] as const }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        className={`w-[340px] sm:w-[380px] flex items-center p-6 rounded-[2rem] bg-white transition-all duration-500 border relative overflow-hidden isolate group cursor-default transform-style-3d ${model.accent}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent -z-10" />

        <div className={`w-14 h-14 rounded-[16px] flex items-center justify-center shrink-0 mr-5 transition-all duration-500 group-hover:scale-110 shadow-sm border border-black/5 transform-style-3d translate-z-10 ${model.iconBg} ${model.iconText}`}>
          <BrainCircuit size={24} strokeWidth={1.5} />
        </div>

        <div className="flex-1 flex flex-col justify-between h-full transform-style-3d translate-z-5">
          <div className="flex items-start justify-between mb-2 gap-2">
            <div className="overflow-hidden">
              <h3 className="text-[16px] font-bold text-gray-900 tracking-tight leading-none mb-1.5 truncate">{model.name}</h3>
              <p className={`text-[10px] font-bold uppercase tracking-[0.1em] ${model.requiresPro ? model.iconText : (model.badge === 'Recommended' ? 'text-brand' : 'text-gray-400')}`}>{model.params}</p>
            </div>
            {model.badge && (
              <span className={`text-[9px] px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider shadow-sm border ${model.requiresPro ? 'bg-white border-gray-100 text-gray-500' : 'bg-brand/10 border-brand/10 text-brand'
                }`}>
                {model.badge}
              </span>
            )}
          </div>

          <p className="text-[12px] text-gray-500 font-medium leading-relaxed mb-5 line-clamp-1">{model.desc}</p>

          <div className="flex flex-col gap-2 mt-auto w-full">
            <div className="flex justify-between items-center text-[12px] border-b border-gray-50 pb-2">
              <span className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Input <span className="text-[8px] opacity-60 normal-case tracking-normal">/ 1M Tkns</span></span>
              <span className="font-bold text-gray-900">{model.priceIn}</span>
            </div>
            <div className="flex justify-between items-center text-[12px]">
              <span className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Output <span className="text-[8px] opacity-60 normal-case tracking-normal">/ 1M Tkns</span></span>
              <span className="font-bold text-gray-900">{model.priceOut}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function ApiPricing() {
  return (
    <section id="api-pricing" className="py-24 md:py-32 relative bg-white border-t border-gray-100 overflow-hidden">
      <div className="absolute top-0 left-[20%] -translate-x-1/2 w-[500px] h-[500px] bg-brand/[0.04] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 sm:px-10 relative z-10 w-full">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-none mb-4">Spatial LLM Engines</h2>
            <p className="text-[15px] text-gray-500 font-medium max-w-lg leading-relaxed">
              Programmable access to high-parameter spatial intelligence models. Billed cleanly per 1 Million tokens processed.
            </p>
          </motion.div>
        </div>

        <div className="w-full -mx-6 px-6 sm:-mx-10 sm:px-10 mb-16 overflow-x-auto pt-2 pb-10 hide-scrollbar flex items-stretch gap-8 lg:justify-start snap-x snap-mandatory">
          {llmModels.map((model, idx) => (
            <ModelCard key={idx} model={model} idx={idx} />
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center p-8 sm:p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all relative overflow-hidden isolate"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gray-50/50 blur-[60px] -z-10" />
            <h4 className="text-[16px] font-bold text-gray-900 mb-2 tracking-tight flex items-center gap-2.5">
              <UploadCloud size={18} className="text-brand" strokeWidth={2.5} /> Supported Input Prompts
            </h4>
            <p className="text-[13px] text-gray-500 font-medium mb-6">Native ingestion of multimodal contexts. No pre-pipeline conversions required.</p>

            <div className="flex flex-wrap gap-3">
              {inputs.map((input, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 bg-gray-50/80 px-4 py-2.5 rounded-xl border border-gray-200/60 shadow-sm hover:bg-white hover:border-brand/40 hover:shadow-md transition-all hover:-translate-y-0.5 cursor-default group"
                >
                  <input.icon size={15} className="text-gray-400 group-hover:text-brand transition-colors" />
                  <div className="flex items-center gap-2.5">
                    <span className="text-[13px] font-bold text-gray-800 leading-none">{input.label}</span>
                    <span className="text-[10px] font-bold text-gray-400 bg-white border border-gray-100 px-2 py-0.5 rounded shadow-sm">{input.ext}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-center p-8 sm:p-10 rounded-[2.5rem] bg-[#FAFAFC] border border-gray-200/80 shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all relative overflow-hidden isolate"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand/[0.03] blur-[60px] -z-10" />
            <h4 className="text-[16px] font-bold text-gray-900 mb-2 tracking-tight flex items-center gap-2.5">
              <DownloadCloud size={18} className="text-brand" strokeWidth={2.5} /> Structured Output Formats
            </h4>
            <p className="text-[13px] text-gray-500 font-medium mb-6">Direct model payload generation cleanly typed into standardized system formats.</p>

            <div className="flex flex-wrap gap-3">
              {outputs.map((output, i) => (
                <motion.div 
                   key={i}
                   initial={{ opacity: 0, scale: 0.9 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   transition={{ delay: i * 0.05 }}
                   className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-gray-200/80 shadow-sm hover:border-brand/40 hover:shadow-md transition-all hover:-translate-y-0.5 cursor-default group"
                >
                  <output.icon size={15} className="text-gray-400 group-hover:text-brand transition-colors" />
                  <div className="flex items-center gap-2.5">
                    <span className="text-[13px] font-bold text-gray-800 leading-none">{output.label}</span>
                    <span className="text-[10px] font-bold text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded shadow-sm">{output.ext}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}
