"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Check, ChevronDown, ChevronUp, Plus, X } from 'lucide-react';
import { useRelease } from '@/context/ReleaseContext';

const tiers = [
  {
    name: "Free",
    idealFor: "Just exploring",
    priceMonthly: "0",
    priceAnnual: "0",
    desc: "All necessary features but limited.",
    cumulativeText: null,
    coreFeatures: [
      "1 Seat (Strict maximum)",
      "3 basic scans per week",
      "3 exports per day",
      "Non-Commercial Use Only"
    ],
    expandedFeatures: [
      "1 Private View OTP limit",
      "Standard PDF Exports",
      "Standard processing (1K textures)",
      "Community Discord support",
      "Basic 2D Floor Plan Overview",
      "Interactive 3D Web Viewer",
      "Basic Object Classification Database"
    ],
    cta: "Start Free",
    highlight: false
  },
  {
    name: "Starter",
    idealFor: "Small Businesses",
    priceMonthly: "12.99",
    priceAnnual: "9.99",
    desc: "All necessary features at a good access level.",
    cumulativeText: "Everything in Free, plus:",
    coreFeatures: [
      "1 Seat (Strict maximum)",
      "20 high-res scans / mo",
      "100 exports per day",
      "Full Commercial License"
    ],
    expandedFeatures: [
      "Unlimited Private View OTPs",
      "Standard CAD (.DWG) Export",
      "Point Cloud Export (.LAS / .XYZ / .E57)",
      "Full Chat-with-Space Interactive UI",
      "High Resolution Mesh Textures (2K)",
      "Standard PDF & Live CSV Analytics",
      "Immersive VR Walkthroughs",
      "24/7 Global Email Support",
      "Automated Light Estimation Tracking",
      "Basic Cloud Rendering Allocation"
    ],
    cta: "Start 7-Day Trial",
    highlight: false
  },
  {
    name: "Pro",
    idealFor: "Growing Teams",
    priceMonthly: "64.99",
    priceAnnual: "49.99",
    desc: "All access and beyond for serious professionals.",
    cumulativeText: "Everything in Starter, plus:",
    coreFeatures: [
      "2 Seats included (Extra: €60/seat)",
      "100 master scans / mo",
      "Unlimited daily exports",
      "Automated Object Removal"
    ],
    expandedFeatures: [
      "Meeting Features & Interactive Mesh Presentations",
      "Semantic Defect Segmentation AI",
      "Advanced BIM (.IFC) Export formatting",
      "Direct 3D Measurement Extraction Matrix",
      "Ultra-Sharp Native Textures (4K+)",
      "Multi-Language Dashboard Integration",
      "Instant 24/7 Priority Engineer Chat",
      "Automated Data Alignment algorithms",
      "Direct Revit / AutoCAD Plugins",
      "Custom Model Tagging Architecture"
    ],
    cta: "Get Started",
    highlight: true
  },
  {
    name: "Enterprise",
    idealFor: "10+ user large teams",
    priceMonthly: "129.99",
    priceAnnual: "99.99",
    desc: "All pro features and a powerful teaming system.",
    cumulativeText: "Everything in Pro, plus:",
    coreFeatures: [
      "6 Seats included (Extra: €20/seat)",
      "Unlimited master processing volume",
      "Full Portal White-Labeling",
      "Custom Hosted AI Models"
    ],
    expandedFeatures: [
      "Meeting Features & Interactive Mesh Presentations",
      "Bespoke Identity Single Sign-On (SAML/SSO)",
      "Raw Uncompressed Textures Server Access",
      "Dedicated Enterprise Account Manager",
      "Custom 99.994% Architecture SLA guarantees",
      "Fully Isolated On-Premise Deployment",
      "Unlimited Virtual Reality Hosting Bandwidth",
      "SOC-2 / GDPR Certified Secure Tunneling",
      "Hardware-Accelerated Local Rendering Pipeline",
      "Multi-Region Geographic Data Pinning",
      "Custom Machine Learning Engine Training"
    ],
    cta: "Start 14-Day Trial",
    highlight: false
  }
];

const PricingCard = ({ tier, idx, isAnnual, isExpandedAll, toggleExpand }: { 
  tier: typeof tiers[0], 
  idx: number, 
  isAnnual: boolean, 
  isExpandedAll: boolean,
  toggleExpand: () => void 
}) => {
  const { onOpenRelease } = useRelease();
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
    <div className="perspective-1000 h-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        className={`relative flex flex-col p-6 lg:p-8 rounded-[2.5rem] transition-all duration-500 h-full overflow-hidden isolate transform-style-3d ${tier.highlight
          ? 'bg-white border-2 border-brand/80 shadow-[0_20px_60px_-15px_rgba(58,123,255,0.2)] ring-1 ring-brand/5 z-10'
          : 'bg-white border border-gray-100 hover:border-brand/30 shadow-sm'
          }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/20 to-transparent -z-10 pointer-events-none" />

        {tier.highlight && (
          <div className="absolute -top-3 left-6 bg-brand text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
            Most Popular
          </div>
        )}

        <div className="mb-4 transform-style-3d translate-z-10">
          <span className={`text-[9px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 rounded ${tier.highlight ? 'bg-brand/10 text-brand' : 'bg-gray-100/80 text-gray-500'}`}>
            {tier.idealFor}
          </span>
        </div>

        <h3 className={`text-xl font-bold tracking-tight mb-2 transform-style-3d translate-z-10 ${tier.highlight ? 'text-brand' : 'text-gray-900'}`}>{tier.name}</h3>
        <p className="text-[12px] mb-6 font-medium leading-[1.5] text-gray-500 min-h-[36px] transform-style-3d translate-z-5">{tier.desc}</p>

        <div className="mb-6 flex flex-col transform-style-3d translate-z-10">
          <div className="flex items-baseline mb-1">
            <span className="text-[15px] font-bold text-gray-900 mr-2">€</span>
            <motion.span
              key={isAnnual ? 'annual' : 'monthly'}
              initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-5xl font-bold tracking-tighter mr-2 text-gray-900 leading-none">
              {isAnnual ? tier.priceAnnual : tier.priceMonthly}
            </motion.span>
            {tier.name !== 'Free' && <span className="text-[13px] font-bold text-gray-400">/mo</span>}
          </div>
          <div className="h-4 flex items-center">
            <AnimatePresence mode="wait">
              {isAnnual && tier.name !== 'Free' && (
                <motion.span
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className="text-[10px] font-bold tracking-wide uppercase text-brand">
                  Billed annually
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        <button
          onClick={onOpenRelease}
          className={`w-full py-3.5 rounded-2xl font-bold text-[13px] transition-all duration-300 mb-8 transform-style-3d translate-z-10 ${tier.highlight
            ? 'bg-brand text-white hover:shadow-[0_15px_30px_-5px_rgba(58,123,255,0.4)] active:scale-95'
            : 'bg-gray-900 text-white hover:bg-black active:scale-95'
            }`}
        >
          {tier.cta}
        </button>

        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-5 border-b border-gray-100 pb-2 transform-style-3d translate-z-5">Included Capabilities</div>

        <div className="flex-1 flex flex-col transform-style-3d translate-z-5">
          {tier.cumulativeText && (
            <div className="flex items-center gap-1.5 mb-4 text-[13px] font-bold text-gray-900">
              <Plus size={12} className="text-brand stroke-[3]" />
              {tier.cumulativeText}
            </div>
          )}

          <ul className="space-y-3 flex-1 mb-6">
            {tier.coreFeatures.map((feature, fIdx) => (
              <li key={fIdx} className="flex items-start">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mr-3 mt-0.5 ${tier.highlight ? 'bg-brand/10 text-brand' : 'bg-gray-50 border border-gray-200 text-gray-400'}`}>
                  <Check size={10} strokeWidth={3} />
                </div>
                <span className="text-[13px] font-medium leading-[1.3] text-gray-700">{feature}</span>
              </li>
            ))}

            <AnimatePresence>
              {isExpandedAll && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 pb-3 border-t border-gray-50" />
                  {tier.expandedFeatures.map((extFeature, extIdx) => (
                    <li key={extIdx} className="flex items-start mb-3">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mr-3 mt-0.5 ${tier.highlight ? 'bg-brand text-white' : 'bg-gray-100 text-gray-500'}`}>
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <span className="text-[12px] font-medium leading-[1.3] text-gray-600">{extFeature}</span>
                    </li>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </ul>
        </div>

        <button
          onClick={toggleExpand}
          className="group mt-auto flex items-center justify-center gap-2 text-[11px] font-bold tracking-wide text-gray-400 hover:text-gray-900 transition-colors pt-5 border-t border-gray-100/80 w-full transform-style-3d translate-z-10"
        >
          {isExpandedAll ? 'Hide Details' : 'Expand all features'}
          <motion.div animate={{ rotate: isExpandedAll ? 180 : 0 }}>
            <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
          </motion.div>
        </button>
      </motion.div>
    </div>
  );
};

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [isExpandedAll, setIsExpandedAll] = useState(false);

  return (
    <section id="pricing" className="py-24 md:py-32 px-5 sm:px-8 relative bg-white overflow-hidden border-t border-gray-100">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-[1300px] mx-auto relative z-10 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
            className="text-left flex flex-col items-start max-w-xl"
          >
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand mb-4">Platform Investment</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 tracking-tight leading-none text-balance">Scale without friction.</h2>
            <p className="text-[15px] text-gray-500 font-medium leading-relaxed">
              Powerful, transparent pricing designed for elite spatial engineering. No hidden costs. Choose the tier that matches your structural ambitions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-gray-50 border border-gray-200/60"
          >
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2.5 rounded-xl text-[13px] font-bold tracking-tight transition-all duration-300 ${!isAnnual ? 'bg-white shadow-[0_5px_15px_rgba(0,0,0,0.05)] text-gray-900 border border-gray-100' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2.5 rounded-xl text-[13px] font-bold tracking-tight transition-all duration-300 flex items-center gap-2 ${isAnnual ? 'bg-white shadow-[0_5px_15px_rgba(0,0,0,0.05)] text-gray-900 border border-gray-100' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Annually <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${isAnnual ? 'bg-brand/10 text-brand' : 'bg-gray-200 text-gray-500'}`}>-20%</span>
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full pb-12">
          {tiers.map((tier, idx) => (
            <PricingCard
              key={idx} tier={tier} idx={idx} isAnnual={isAnnual}
              isExpandedAll={isExpandedAll} toggleExpand={() => setIsExpandedAll(!isExpandedAll)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4 py-4 px-6 rounded-2xl bg-gray-50 border border-gray-100 max-w-2xl mx-auto"
        >
          <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
            <Plus size={16} />
          </div>
          <p className="text-[13px] font-medium text-gray-500 text-center md:text-left">
            Platform plans do not include API access. For volume processing or direct model access, explore our <a href="#api-pricing" className="text-brand font-bold hover:underline">Spatial API Pricing</a> below.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
