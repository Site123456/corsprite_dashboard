"use client";

import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Plus, X } from 'lucide-react';

const tiers = [
  {
    name: "Free",
    idealFor: "Just exploring",
    priceMonthly: "€0",
    priceAnnual: "€0",
    desc: "Explore core capabilities. No credit card required.",
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
    priceMonthly: "€12.99",
    priceAnnual: "€9.99",
    desc: "Consistent workflows optimized for physical portfolios.",
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
    cta: "Get Started",
    highlight: false
  },
  {
    name: "Pro",
    idealFor: "Growing Teams",
    priceMonthly: "€64.99",
    priceAnnual: "€49.99",
    desc: "Advanced tools and unlimited exports for scaling teams.",
    cumulativeText: "Everything in Starter, plus:",
    coreFeatures: [
      "3 Seats included (Extra: €20/seat)",
      "100 master scans / mo",
      "Unlimited daily exports",
      "Automated Object Removal"
    ],
    expandedFeatures: [
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
    cta: "Start 14-Day Trial",
    highlight: true
  },
  {
    name: "Enterprise",
    idealFor: "10+ user large teams",
    priceMonthly: "€129.99",
    priceAnnual: "€99.99",
    desc: "Full-scale deployment with white-labeling. Extra seats at €10/seat.",
    cumulativeText: "Everything in Pro, plus:",
    coreFeatures: [
      "10 Seats included (Extra: €10/seat)",
      "Unlimited master processing volume",
      "Full Portal White-Labeling",
      "Custom Hosted AI Models"
    ],
    expandedFeatures: [
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
    cta: "Contact Sales",
    highlight: false
  }
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [isExpandedAll, setIsExpandedAll] = useState(false);

  const toggleExpand = () => {
    setIsExpandedAll(prev => !prev);
  };

  return (
    <section id="pricing" className="py-20 md:py-28 px-4 sm:px-6 relative bg-white overflow-hidden border-t border-gray-100">
      <div className="max-w-[1300px] mx-auto animate-fade-in-up relative z-10 w-full">

        {/* Header Layout */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="text-left flex flex-col items-start">
            <p className="text-[10px] font-bold tracking-widest uppercase text-brand mb-3">Platform Pricing</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 tracking-tight">Scale beyond limits.</h2>
            <p className="text-[14px] text-gray-500 font-medium mb-5 max-w-md">Simple, transparent pricing. No API costs bundled in — pay only for the platform features you need.</p>

            <div className="flex items-center gap-1 bg-gray-50 border border-gray-200/60 p-1 rounded-lg">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-2 rounded-md text-[12px] font-bold tracking-tight transition-all ${!isAnnual ? 'bg-white shadow-sm border border-gray-200/50 text-gray-900' : 'text-gray-500 hover:text-gray-900 border border-transparent'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-4 py-2 rounded-md text-[12px] font-bold tracking-tight transition-all flex items-center gap-2 ${isAnnual ? 'bg-white shadow-sm border border-gray-200/50 text-gray-900' : 'text-gray-500 hover:text-gray-900 border border-transparent'}`}
              >
                Annually <span className={`text-[9px] px-1.5 py-0.5 rounded ${isAnnual ? 'bg-brand/10 text-brand' : 'bg-gray-200 text-gray-500'}`}>SAVE 20%</span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 w-full pb-10">
            {tiers.map((tier, idx) => {
              const isExpanded = isExpandedAll;
              return (
                <div
                  key={idx}
                  className={`relative flex flex-col p-6 lg:p-7 rounded-2xl transition-all duration-300 h-full ${tier.highlight
                      ? 'bg-white border-2 border-brand/80 shadow-[0_15px_40px_-10px_rgba(58,123,255,0.15)] ring-1 ring-brand/5 z-10 xl:scale-[1.02]'
                      : 'bg-white border border-gray-200/80 hover:border-gray-300 shadow-sm hover:shadow-md'
                    }`}
                >
                  {tier.highlight && (
                    <div className="absolute -top-3 left-6 bg-brand text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                      Most Popular
                    </div>
                  )}

                  {tier.idealFor && (
                    <div className="mb-3">
                      <span className={`text-[9px] font-bold tracking-[0.1em] uppercase px-2 py-1 rounded ${tier.highlight ? 'bg-brand/10 text-brand' : 'bg-gray-100/80 text-gray-500'}`}>
                        {tier.idealFor}
                      </span>
                    </div>
                  )}

                  <h3 className={`text-xl font-bold tracking-tight mb-1.5 ${tier.highlight ? 'text-brand' : 'text-gray-900'}`}>{tier.name}</h3>
                  <p className="text-[12px] mb-5 font-medium leading-[1.5] text-gray-500 min-h-[36px]">{tier.desc}</p>

                  <div className="mb-5 flex flex-col">
                    <div className="flex items-baseline mb-1">
                      {tier.name === 'Enterprise' ? (
                        <div className="flex items-baseline flex-wrap gap-1">
                          <span className="text-[11px] font-bold text-gray-500 border border-gray-200 px-2 py-0.5 rounded-md bg-gray-50">From</span>
                          <span className="text-3xl lg:text-4xl font-bold tracking-tighter mr-1 text-gray-900 leading-none">
                            {isAnnual ? tier.priceAnnual : tier.priceMonthly}
                          </span>
                          <span className="text-[12px] font-bold text-gray-400">/mo</span>
                        </div>
                      ) : (
                        <>
                          <span className="text-3xl lg:text-4xl font-bold tracking-tighter mr-1 text-gray-900 leading-none">
                            {isAnnual ? tier.priceAnnual : tier.priceMonthly}
                          </span>
                          {tier.name !== 'Free' && <span className="text-[12px] font-bold text-gray-400">/mo</span>}
                        </>
                      )}
                    </div>
                    <div className="h-4 mt-1">
                      {isAnnual && tier.name !== 'Free' && (
                        <span className="text-[10px] font-bold tracking-wide uppercase text-brand">Billed annually</span>
                      )}
                    </div>
                  </div>

                  <button
                    className={`w-full py-2.5 rounded-xl font-bold text-[13px] transition-all duration-300 mb-7 ${tier.highlight
                        ? 'bg-brand text-white hover:bg-brand-dark shadow-sm hover:shadow-md'
                        : tier.name === 'Enterprise'
                          ? 'bg-gray-900 text-white hover:bg-black shadow-sm hover:shadow-md'
                          : 'bg-gray-50 border border-gray-200/80 text-gray-800 hover:bg-white hover:border-gray-300'
                      }`}
                  >
                    {tier.cta}
                  </button>

                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 pb-2">Included Capabilities</div>

                  {tier.cumulativeText && (
                    <div className="flex items-center gap-1.5 mb-3 text-[12px] font-bold text-gray-900">
                      <Plus size={12} className="text-brand stroke-[3]" />
                      {tier.cumulativeText}
                    </div>
                  )}

                  <ul className="space-y-2.5 flex-1">
                    {tier.coreFeatures.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mr-2.5 mt-0.5 ${tier.highlight ? 'bg-brand/10 text-brand' : 'bg-gray-50 border border-gray-200 text-gray-500'}`}>
                          <Check size={10} strokeWidth={3} />
                        </div>
                        <span className="text-[13px] font-medium leading-[1.3] text-gray-700">{feature}</span>
                      </li>
                    ))}

                    <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExpanded ? 'max-h-[800px] opacity-100 pt-1' : 'max-h-0 opacity-0'}`}>
                      <li className="pt-2 pb-1 h-px w-full"><div className="h-full border-t border-gray-100/80" /></li>
                      {tier.expandedFeatures.map((extFeature, extIdx) => (
                        <li key={extIdx} className="flex items-start mt-2.5">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mr-2.5 mt-0.5 ${tier.highlight ? 'bg-brand text-white shadow-sm' : 'bg-gray-100 text-gray-500 border border-gray-200'}`}>
                            <Check size={10} strokeWidth={3} />
                          </div>
                          <span className="text-[12px] font-medium leading-[1.3] text-gray-600">{extFeature}</span>
                        </li>
                      ))}
                    </div>
                  </ul>

                  <button
                    onClick={toggleExpand}
                    className="mt-5 flex items-center justify-center gap-1.5 text-[11px] font-bold tracking-wide text-gray-400 hover:text-gray-900 transition-colors pt-4 border-t border-gray-100/80 w-full"
                  >
                    {isExpanded ? 'Hide Details' : 'Expand features'}
                    {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* No API callout */}
        <div className="mt-2 mb-4 flex items-center justify-center gap-3 py-3 px-5 rounded-xl bg-gray-50 border border-gray-100 max-w-lg mx-auto">
          <X size={14} className="text-gray-400 shrink-0" />
          <p className="text-[12px] font-medium text-gray-500">
            Platform plans <span className="font-bold text-gray-700">do not include API access</span>. See API pricing below for programmatic integrations.
          </p>
        </div>
      </div>
    </section>
  );
}
