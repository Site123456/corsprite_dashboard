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
                className="flex flex-col items-start p-6 rounded-xl bg-white border border-gray-200/80 hover:border-gray-300 group animate-fade-in-up transition-colors duration-300 shadow-sm" 
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="shrink-0 w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 group-hover:text-brand transition-colors mb-4">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <div className="pt-0.5">
                  <h3 className="text-[14px] font-bold mb-2 text-gray-900 tracking-tight">{industry.title}</h3>
                  <p className="text-gray-500 leading-[1.5] font-medium text-[13px]">{industry.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
