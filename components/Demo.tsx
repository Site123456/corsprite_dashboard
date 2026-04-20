import React from 'react';
import { Play } from 'lucide-react';

export default function Demo() {
  return (
    <section className="py-16 md:py-20 px-6 bg-[#FAFAFC] border-t border-gray-100">
      <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row items-center gap-12 animate-fade-in-up">
        
        <div className="flex-1 w-full aspect-video rounded-[2rem] overflow-hidden relative flex items-center justify-center group cursor-pointer border border-gray-100 hover:border-brand/30 transition-all duration-500 shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] bg-white transform hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-brand/5 opacity-50 mix-blend-overlay group-hover:opacity-80 transition-opacity duration-500" />
          <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex items-center justify-center text-gray-900 group-hover:scale-110 group-hover:text-brand group-hover:bg-white transition-all duration-500 relative z-10">
            <Play fill="currentColor" size={22} className="ml-1 relative z-10" />
            <div className="absolute inset-0 rounded-full border-2 border-brand/50 group-hover:animate-ping opacity-0 group-hover:opacity-100 pointer-events-none" />
          </div>
          <div className="absolute bottom-5 left-5 right-5 flex justify-between items-center text-[12px] font-bold text-gray-700">
            <span className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-[10px] shadow-sm border border-gray-100 hover:text-brand transition-colors">Live Dashboard</span>
            <span className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-[10px] shadow-sm border border-gray-100">2:14</span>
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
