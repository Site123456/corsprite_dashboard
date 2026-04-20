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
                className="bg-white border border-gray-200/80 p-6 flex flex-col group hover:border-gray-300 transition-colors duration-300 animate-fade-in-up rounded-xl" 
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5 bg-gray-50 text-gray-500 group-hover:text-brand border border-gray-100 transition-colors">
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <h3 className="text-[14px] font-bold text-gray-900 mb-2 tracking-tight">{feature.title}</h3>
                <p className="text-[13px] text-gray-500 leading-[1.5] font-medium">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
