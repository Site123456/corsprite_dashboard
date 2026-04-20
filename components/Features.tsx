import React from 'react';
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

export default function Features() {
  return (
    <section className="py-16 md:py-24 px-6 relative bg-white">
      <div className="max-w-[1300px] mx-auto">
        <div className="mb-12 animate-fade-in-up">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 tracking-tight">Capabilities Redefined</h2>
          <p className="text-gray-500 max-w-xl font-medium text-[14px] leading-relaxed">
            A comprehensive suite of intelligence tools designed strictly for creating customizable spatial experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div 
                key={idx} 
                className="bg-white border border-gray-100 p-7 flex flex-col group hover:-translate-y-1 hover:border-brand/20 transition-all duration-500 animate-fade-in-up rounded-[1.5rem] shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden isolate" 
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {/* Subtle hover gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                <div className="w-11 h-11 rounded-[12px] flex items-center justify-center mb-6 bg-gray-50 text-gray-500 group-hover:bg-brand/5 group-hover:text-brand border border-gray-100 group-hover:border-brand/10 transition-all duration-300 group-hover:scale-110 shadow-sm">
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <h3 className="text-[15px] font-bold text-gray-900 mb-2.5 tracking-tight group-hover:text-brand transition-colors">{feature.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
