import React from 'react';
import { Play } from 'lucide-react';

export default function Demo() {
  return (
    <section className="py-16 md:py-20 px-6 bg-[#FAFAFC] border-t border-gray-100">
      <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row items-center gap-12 animate-fade-in-up">
        
        <div className="flex-1 w-full aspect-video rounded-2xl overflow-hidden relative flex items-center justify-center group cursor-pointer border border-gray-200/80 hover:border-gray-300 transition-colors shadow-sm bg-white">
          <div className="absolute inset-0 bg-brand/5 opacity-50 mix-blend-overlay" />
          <div className="w-14 h-14 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-900 group-hover:scale-105 group-hover:text-brand transition-all duration-300">
            <Play fill="currentColor" size={20} className="ml-1" />
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[12px] font-bold text-gray-700">
            <span className="bg-white/90 px-3 py-1.5 rounded-md shadow-sm border border-gray-100">Live Dashboard</span>
            <span className="bg-white/90 px-3 py-1.5 rounded-md shadow-sm border border-gray-100">2:14</span>
          </div>
        </div>

        <div className="flex-1 text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 tracking-tight">Watch it in action</h2>
          <p className="text-[14px] text-gray-500 font-medium max-w-sm mb-6 leading-[1.5]">Experience the raw power of the point-to-mesh automated spatial generator strictly within the web portal.</p>
        </div>

      </div>
    </section>
  );
}
