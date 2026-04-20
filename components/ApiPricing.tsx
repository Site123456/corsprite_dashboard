"use client";

import React, { useState } from 'react';
import { Check, Zap, ScanSearch, Video, Boxes, ArrowRight, Info } from 'lucide-react';

const apiEndpoints = [
  {
    name: "Scan Analyser",
    icon: ScanSearch,
    tagline: "Raw scan → structured intelligence",
    desc: "Defect reports, material classification, metadata extraction.",
    perRequest: "€0.12",
    per1kTokens: "€0.04",
    freeQuota: null,
    includedRequests: "Pay-as-you-go",
    features: [
      "JSON / CSV response",
      "Defect severity scoring",
      "Material classification",
      "Webhook delivery",
      "Batch upload support",
    ],
    color: "brand",
  },
  {
    name: "Video to Mesh",
    icon: Video,
    tagline: "MP4 / MOV → textured .OBJ, .GLTF, .FBX",
    desc: "Production-ready 3D mesh generation from standard video.",
    perRequest: "€0.45",
    per1kTokens: "€0.08",
    freeQuota: null,
    includedRequests: "Pay-as-you-go",
    features: [
      ".OBJ, .GLTF, .FBX & .USD",
      "Textured output up to 4K",
      "Up to 10 min video input",
      "Real-time progress stream",
      "Custom pipeline config",
    ],
    color: "violet",
  },
  {
    name: "Mesh Analyser",
    icon: Boxes,
    tagline: "3D mesh → topology, measurements, AI insights",
    desc: "Validate, inspect, and extract intelligence from existing meshes.",
    perRequest: "€0.08",
    per1kTokens: "€0.03",
    freeQuota: null,
    includedRequests: "Pay-as-you-go",
    features: [
      "Topology validation & repair",
      "Auto-measurement extraction",
      "AI defect detection",
      "A/B mesh comparison",
      "Compliance report gen",
    ],
    color: "emerald",
  },
];

const volumeTiers = [
  { label: "0 – 1K req/mo", discount: "Standard rate" },
  { label: "1K – 10K", discount: "10% off" },
  { label: "10K – 100K", discount: "25% off" },
  { label: "100K+", discount: "40% off" },
];

export default function ApiPricing() {
  const [hoveredEndpoint, setHoveredEndpoint] = useState<number | null>(null);

  return (
    <section id="api-pricing" className="py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden bg-gray-50/50 border-t border-gray-100">
      <div className="max-w-[1300px] mx-auto relative z-10 w-full">

        {/* Header — compact */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-brand/10 border border-brand/15 flex items-center justify-center">
                <Zap size={14} className="text-brand" />
              </div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-brand">API Access</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-1">Usage-based API pricing.</h2>
            <p className="text-[13px] text-gray-500 font-medium max-w-md">
              No subscriptions. No free tier. Pay per request and per 1K tokens processed. Requires a platform account (Free or above).
            </p>
          </div>
          <a href="#" className="flex items-center gap-1.5 text-[12px] font-bold text-brand hover:underline whitespace-nowrap">
            View full API docs <ArrowRight size={12} />
          </a>
        </div>

        {/* Endpoint Cards — Horizontal on xl, stack on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {apiEndpoints.map((ep, idx) => {
            const Icon = ep.icon;
            const isHovered = hoveredEndpoint === idx;

            return (
              <div
                key={idx}
                className="group relative flex flex-col rounded-2xl border border-gray-200/80 bg-white shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300 overflow-hidden"
                onMouseEnter={() => setHoveredEndpoint(idx)}
                onMouseLeave={() => setHoveredEndpoint(null)}
              >
                {/* Top bar accent */}
                <div className="h-[3px] w-full bg-gradient-to-r from-brand via-brand/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="p-5 lg:p-6 flex flex-col flex-1">
                  {/* Icon + Name row */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-brand/5 border border-brand/10 flex items-center justify-center text-brand">
                      <Icon size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-bold text-gray-900 tracking-tight leading-none">{ep.name}</h3>
                      <p className="text-[10px] font-semibold text-gray-400 mt-0.5">{ep.tagline}</p>
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-500 leading-relaxed font-medium mb-5">{ep.desc}</p>

                  {/* Core pricing */}
                  <div className="flex items-stretch gap-3 mb-5">
                    <div className="flex-1 bg-gray-50 rounded-xl border border-gray-100 p-3 text-center">
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Per Request</p>
                      <p className="text-xl font-bold text-gray-900 tracking-tight">{ep.perRequest}</p>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-xl border border-gray-100 p-3 text-center">
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Per 1K Tokens</p>
                      <p className="text-xl font-bold text-gray-900 tracking-tight">{ep.per1kTokens}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 flex-1">
                    {ep.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                          <Check size={8} className="text-brand" strokeWidth={3} />
                        </div>
                        <span className="text-[11px] font-medium text-gray-600">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className="mt-5 w-full py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-[11px] font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-sm hover:shadow-md">
                    Get API Key
                    <ArrowRight size={12} className="text-gray-400 group-hover/btn:text-brand group-hover/btn:translate-x-0.5 transition-all" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Volume Discount Strip */}
        <div className="rounded-2xl border border-gray-200/80 bg-white shadow-sm p-5 lg:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Info size={14} className="text-gray-400" />
              <h4 className="text-[13px] font-bold text-gray-900 tracking-tight">Volume discounts</h4>
            </div>
            <p className="text-[11px] text-gray-400 font-medium">Applies automatically to all endpoints.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {volumeTiers.map((t, i) => (
              <div key={i} className={`rounded-xl border p-3 text-center transition-all ${i === 3 ? 'border-brand/30 bg-brand/[0.02]' : 'border-gray-100 bg-gray-50/50'}`}>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">{t.label}</p>
                <p className={`text-[13px] font-bold tracking-tight ${i === 3 ? 'text-brand' : 'text-gray-900'}`}>{t.discount}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 text-center">
          <p className="text-[11px] text-gray-400 font-medium">
            All endpoints must be in <span className="text-gray-600 font-bold">HTTPS</span>
          </p>
        </div>
      </div>
    </section>
  );
}
