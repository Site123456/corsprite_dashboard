"use client";

import React from 'react';
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

export default function ApiPricing() {
  return (
    <section id="api-pricing" className="py-16 md:py-24 relative bg-white border-t border-gray-100 overflow-hidden">

      {/* Background glow for expensive premium vibe */}
      <div className="absolute top-0 left-[30%] -translate-x-1/2 w-[600px] h-[400px] bg-brand/[0.03] blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 relative z-10 animate-fade-in-up">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Spatial LLM Engines</h2>
          </div>
          <p className="text-[13px] text-gray-500 font-medium max-w-sm leading-relaxed mb-1 md:text-right">
            Direct access to high-parameter spatial intelligence models. Billed cleanly per 1 Million tokens processed.
          </p>
        </div>

        {/* Section 1: LLM Models Carousel */}
        <div className="w-full -mx-5 px-5 sm:-mx-8 sm:px-12 mb-12 overflow-x-auto pt-2 pb-8 hide-scrollbar flex items-stretch gap-6 lg:justify-start">
          {llmModels.map((model, idx) => (
            <div
              key={idx}
              className={`ms-2 flex-none w-[340px] sm:w-[380px] snap-center flex items-center p-5 rounded-[1.5rem] bg-white transition-all duration-500 border relative overflow-hidden isolate group cursor-default hover:-translate-y-1 ${model.accent}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent -z-10" />

              <div className={`w-14 h-14 rounded-[14px] flex items-center justify-center shrink-0 mr-4 transition-transform group-hover:scale-105 shadow-sm border border-black/5 ${model.iconBg} ${model.iconText}`}>
                <BrainCircuit size={24} strokeWidth={1.5} />
              </div>

              <div className="flex-1 flex flex-col justify-between h-full">
                <div className="flex items-start justify-between mb-1 gap-2">
                  <div className="overflow-hidden">
                    <h3 className="text-[15px] font-bold text-gray-900 tracking-tight leading-none mb-1 truncate">{model.name}</h3>
                    <p className={`text-[9px] font-bold uppercase tracking-wider ${model.requiresPro ? model.iconText : (model.badge === 'Recommended' ? 'text-brand' : 'text-gray-400')}`}>{model.params}</p>
                  </div>
                  {model.badge && (
                    <span className={`text-[8px] sm:text-[9px] px-2.5 py-0.5 rounded-[6px] font-bold uppercase tracking-wider shadow-[0_2px_5px_rgba(0,0,0,0.02)] whitespace-nowrap border ${model.requiresPro ? 'bg-white border-gray-200 text-gray-600' : 'bg-brand/10 border-brand/10 text-brand'
                      }`}>
                      {model.badge}
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-gray-500 font-medium leading-[1.3] mb-4 line-clamp-1">{model.desc}</p>

                <div className="flex flex-col gap-1.5 mt-auto w-full">
                  <div className="flex justify-between items-center text-[11px] border-b border-gray-100/80 pb-1.5">
                    <span className="text-gray-400 font-bold uppercase tracking-wider">Input <span className="text-[8px] opacity-60 normal-case tracking-normal">/ 1M Tkns</span></span>
                    <span className="font-bold text-gray-900">{model.priceIn}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] mb-1">
                    <span className="text-gray-400 font-bold uppercase tracking-wider">Output <span className="text-[8px] opacity-60 normal-case tracking-normal">/ 1M Tkns</span></span>
                    <span className="font-bold text-gray-900">{model.priceOut}</span>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Sections 2 & 3: Input & Output Architecture Details */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Supported Inputs Section */}
          <div className="flex flex-col justify-center p-6 sm:p-8 rounded-[1.8rem] bg-white border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] transition-all relative overflow-hidden isolate">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gray-50 blur-[50px] -z-10" />

            <h4 className="text-[15px] font-bold text-gray-900 mb-1.5 tracking-tight flex items-center gap-2">
              <UploadCloud size={16} className="text-brand" strokeWidth={2} /> Supported Input Prompts
            </h4>
            <p className="text-[12px] text-gray-500 font-medium mb-5">Native ingestion of multimodal contexts. No pre-pipeline conversions required.</p>

            <div className="flex flex-wrap gap-2.5">
              {inputs.map((input, i) => {
                const Icon = input.icon;
                return (
                  <div key={i} className="flex items-center gap-2.5 bg-gray-50/80 px-3.5 py-2 rounded-[12px] border border-gray-200/60 shadow-sm cursor-default hover:bg-white hover:border-brand/30 transition-all hover:-translate-y-0.5">
                    <Icon size={14} className="text-gray-400" />
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-bold text-gray-700 leading-none mb-px">{input.label}</span>
                      <span className="text-[9px] font-bold text-gray-400 bg-white shadow-[0_2px_5px_rgba(0,0,0,0.02)] border border-gray-100 px-1.5 py-0.5 rounded leading-none">{input.ext}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Supported Outputs Section */}
          <div className="flex flex-col justify-center p-6 sm:p-8 rounded-[1.8rem] bg-[#FAFAFC] border border-gray-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] transition-all relative overflow-hidden isolate">
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand/5 blur-[50px] -z-10" />

            <h4 className="text-[15px] font-bold text-gray-900 mb-1.5 tracking-tight flex items-center gap-2">
              <DownloadCloud size={16} className="text-brand" strokeWidth={2} /> Structured Output Formats
            </h4>
            <p className="text-[12px] text-gray-500 font-medium mb-5">Direct model payload generation cleanly typed into standardized system formats.</p>

            <div className="flex flex-wrap gap-2.5">
              {outputs.map((output, i) => {
                const Icon = output.icon;
                return (
                  <div key={i} className="flex items-center gap-2.5 bg-white px-3.5 py-2 rounded-[12px] border border-gray-200/80 shadow-sm cursor-default hover:border-brand/30 transition-all hover:-translate-y-0.5">
                    <Icon size={14} className="text-gray-400" />
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-bold text-gray-700 leading-none mb-px">{output.label}</span>
                      <span className="text-[9px] font-bold text-gray-400 bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded leading-none">{output.ext}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

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
