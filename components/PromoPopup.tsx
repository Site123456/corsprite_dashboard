"use client";

import React, { useState, useEffect } from 'react';
import { Gift, X, Sparkles, ArrowRight } from 'lucide-react';

export default function PromoPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Wait for client to mount before reading local storage to avoid hydration mismatches
    const hasSeenPromo = document.cookie.includes('promoDismissed=true') || localStorage.getItem('promoDismissed') === 'true';
    if (!hasSeenPromo) {
      // Delay popup by 2.5 seconds so it doesn't interrupt immediate visual flow
      const timer = setTimeout(() => setIsVisible(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    // Set both cookie and localStorage for utmost persistence
    document.cookie = "promoDismissed=true; max-age=2592000; path=/"; // 30 days
    localStorage.setItem('promoDismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 lg:bottom-10 left-6 lg:left-10 z-[100] animate-fade-in-up">
      <div 
        className="w-[340px] bg-white/90 backdrop-blur-3xl border border-gray-200/60 p-6 rounded-[1.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1),0_0_20px_rgba(58,123,255,0.05)] relative overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glow Effects */}
        <div className={`absolute -top-10 -right-10 w-32 h-32 bg-brand/10 rounded-full blur-[30px] transition-all duration-700 pointer-events-none ${isHovered ? 'scale-150 bg-brand/20' : ''}`} />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-[30px] pointer-events-none" />

        <button 
          onClick={handleDismiss} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-7 h-7 rounded-full flex items-center justify-center transition-colors z-20"
        >
          <X size={14} strokeWidth={2.5} />
        </button>

        <div className="flex items-start gap-4 relative z-10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand to-brand-light flex items-center justify-center shrink-0 shadow-[0_5px_15px_rgba(58,123,255,0.4)] relative">
            <Gift size={18} className="text-white relative z-10" strokeWidth={2} />
            <Sparkles size={12} className="text-white absolute top-1 right-0 animate-pulse" />
          </div>
          
          <div className="flex-1 pt-0.5">
            <h4 className="text-[15px] font-bold text-gray-900 tracking-tight leading-none mb-1.5 flex items-center gap-2">
              Limited Time Offer
              <span className="text-[8px] bg-gray-900 text-white px-2 py-0.5 rounded-full tracking-widest uppercase">New</span>
            </h4>
            <p className="text-[13px] text-gray-500 font-medium leading-[1.6] mb-4">
              Invite your friends or team to Corsprite. Get <strong className="text-brand">5 Extra Free Scan Credits</strong> when they sign up this month.
            </p>
            
            <button className="w-full bg-gray-900 hover:bg-black text-white text-[13px] font-bold py-3 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 group/btn">
              Claim Referral Link 
              <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
