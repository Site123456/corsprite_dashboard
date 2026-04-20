import React from 'react';
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

export default function Industries() {
  return (
    <section className="py-16 md:py-20 px-6 relative z-10 bg-white border-t border-gray-100">
      <div className="max-w-[1300px] mx-auto">
        <div className="mb-12 animate-fade-in-up">
           <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 tracking-tight">Engineered for your industry</h2>
           <p className="text-[14px] text-gray-500 font-medium">Vertical-specific implementations powering massive structures.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div 
                key={index} 
                className="relative flex flex-col items-start p-7 rounded-[1.5rem] bg-white border border-gray-100 hover:border-gray-200 group animate-fade-in-up transition-all duration-500 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1 overflow-hidden isolate" 
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                <div className="shrink-0 w-12 h-12 rounded-[14px] bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-brand/5 group-hover:text-brand transition-all duration-300 mb-5 group-hover:scale-110 shadow-sm">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <div className="pt-0.5">
                  <h3 className="text-[15px] font-bold mb-2.5 text-gray-900 tracking-tight group-hover:text-brand transition-colors">{industry.title}</h3>
                  <p className="text-gray-500 leading-relaxed font-medium text-[13px]">{industry.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
