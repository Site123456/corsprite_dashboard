"use client";

import React, { useState, useEffect } from 'react';
import { Sparkles, X, ArrowRight } from 'lucide-react';

export default function PromoPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenPromo = document.cookie.includes('promoDismissed=true') || localStorage.getItem('promoDismissed') === 'true';
    if (!hasSeenPromo) {
      const timer = setTimeout(() => setIsVisible(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    document.cookie = "promoDismissed=true; max-age=2592000; path=/"; // 30 days
    localStorage.setItem('promoDismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 left-5 sm:bottom-8 sm:left-8 z-[100] animate-fade-in-up">
      <div className="w-[300px] sm:w-[320px] bg-white/95 backdrop-blur-2xl border border-gray-200/60 p-5 rounded-2xl shadow-[0_16px_40px_-12px_rgba(0,0,0,0.1)] relative overflow-hidden">

        {/* Subtle glow */}
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-brand/8 rounded-full blur-[25px] pointer-events-none" />

        <button 
          onClick={handleDismiss} 
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center transition-colors z-20"
        >
          <X size={12} strokeWidth={2.5} />
        </button>

        <div className="flex items-start gap-3 relative z-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand to-brand-light flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(58,123,255,0.35)]">
            <Sparkles size={16} className="text-white" strokeWidth={2} />
          </div>
          
          <div className="flex-1 pt-0.5">
            <h4 className="text-[14px] font-bold text-gray-900 tracking-tight leading-tight mb-1">
              Welcome to Corsprite
            </h4>
            <p className="text-[12px] text-gray-500 font-medium leading-[1.5] mb-3.5">
              Explore our spatial intelligence platform. Scan, remodel, and generate floor plans effortlessly.
            </p>
            
            <button 
              onClick={handleDismiss}
              className="w-full bg-gray-900 hover:bg-black text-white text-[12px] font-bold py-2.5 rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 group/btn active:scale-[0.98]"
            >
              Continue Browsing
              <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
