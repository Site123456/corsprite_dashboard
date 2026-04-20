"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { MonitorDown, Smartphone, LayoutDashboard, KeyRound, ArrowRight, Loader2, Check, X, ShieldAlert } from 'lucide-react';

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [imageState, setImageState] = useState<'base' | 'loading' | 'removed' | 'green'>('base');
  const [chatSteps, setChatSteps] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [showAIProcessing, setShowAIProcessing] = useState(false);

  // OS Check
  const [osData, setOsData] = useState({ name: 'Download App', icon: MonitorDown, platform: 'web' });
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.includes('win')) setOsData({ name: 'Download for Windows', icon: MonitorDown, platform: 'windows' });
    else if (ua.includes('android')) setOsData({ name: 'Play Store', icon: Smartphone, platform: 'android' });
    else if (ua.includes('mac') || ua.includes('iphone') || ua.includes('ipad')) setOsData({ name: 'App Store', icon: MonitorDown, platform: 'ios' });

    let timeoutIds: NodeJS.Timeout[] = [];
    const runSequence = () => {
      const typePhrase = (phrase: string, offset: number) => {
        for (let i = 0; i <= phrase.length; i++) {
          timeoutIds.push(setTimeout(() => setTypedText(phrase.slice(0, i)), offset + (i * 30)));
        }
      };

      setTypedText(""); setImageState('base'); setChatSteps([]); setShowAIProcessing(false);

      timeoutIds.push(setTimeout(() => typePhrase("remove objects", 0), 1000));
      timeoutIds.push(setTimeout(() => {
        setChatSteps([{ role: 'user', text: "remove objects" }]);
        setTypedText(""); setShowAIProcessing(true); setImageState('loading');
      }, 1800));
      timeoutIds.push(setTimeout(() => {
        setChatSteps(prev => [...prev, { role: 'ai', text: "Running extraction logic..." }]);
      }, 2600));
      timeoutIds.push(setTimeout(() => {
        setImageState('removed'); setShowAIProcessing(false);
      }, 5000));

      timeoutIds.push(setTimeout(() => typePhrase("color this room in green", 0), 6500));
      timeoutIds.push(setTimeout(() => {
        setChatSteps(prev => [...prev, { role: 'user', text: "color this room in green" }]);
        setTypedText(""); setShowAIProcessing(true);
      }, 7300));
      timeoutIds.push(setTimeout(() => {
        setChatSteps(prev => [...prev, { role: 'ai', text: "Applying aesthetic map..." }]);
      }, 8200));
      timeoutIds.push(setTimeout(() => {
        setImageState('green'); setShowAIProcessing(false);
      }, 10500));

      timeoutIds.push(setTimeout(runSequence, 14500));
    };

    runSequence();
    return () => timeoutIds.forEach(clearTimeout);
  }, []);

  const OtpIcon = osData.icon;
  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val[val.length - 1];
    const newOtp = [...otpCode]; newOtp[index] = val; setOtpCode(newOtp);
    if (val && index < 5 && otpInputs.current[index + 1]) otpInputs.current[index + 1]?.focus();
  };

  return (
    <>
      <section className="relative flex items-center justify-center pt-24 sm:pt-28 pb-8 sm:pb-10 px-5 sm:px-6 bg-white overflow-hidden min-h-[calc(100vh-60px)] lg:min-h-screen">

        {/* Subtle gradient orbs */}
        <div className="absolute top-[-200px] left-[-100px] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-gradient-to-br from-purple-200/30 via-blue-100/20 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-150px] right-[-100px] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-gradient-to-tl from-emerald-200/25 via-cyan-100/15 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-[1200px] mx-auto w-full grid lg:grid-cols-[1fr_440px] gap-8 lg:gap-12 items-center z-10 relative">

          {/* Left: Compact Minimalist Typography */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left animate-fade-in-up">
            <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-4 flex items-center gap-2 px-3 py-1 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-full shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Spatial Intelligence
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem] font-bold tracking-tight mb-4 text-gray-900 leading-[1.08] max-w-full">
              <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-emerald-400 bg-clip-text text-transparent inline-block pb-0.5">Corsprite.</span><br />
              Conceptions,<br />
              Redefined.
            </h1>

            <p className="text-[13px] sm:text-[15px] text-gray-500 max-w-sm mx-auto lg:mx-0 mb-6 leading-relaxed font-medium">
              Extract structural intelligence from raw point clouds natively. Remodel layouts and generate accurate CAD floor plans instantly.
            </p>

            <div className="flex flex-col items-center lg:items-start gap-2.5 w-full max-w-[380px]">
              {/* Primary CTA row */}
              <div className="flex items-center gap-2 w-full">
                <button className="flex-1 px-4 py-2.5 sm:py-3 rounded-xl bg-gray-900 hover:bg-black text-white transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 group">
                  {osData.name.includes('Windows') && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="opacity-80"><path d="M0 3.5l9.9-1.4V12H0zm11-1.6L24 0v12H11zM0 12.5h9.9v9.9L0 21zm11 0h13V24l-13-1.8z" /></svg>
                  )}
                  {osData.name.includes('App Store') && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="opacity-80"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
                  )}
                  {osData.name.includes('Google Play') && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="opacity-80"><path d="M3.18 23.67c-.37-.2-.63-.55-.63-.97V1.3c0-.42.26-.77.63-.97l11.83 11.67L3.18 23.67zM15.82 12L5 1.56 17.64 8.4l-1.82 3.6zm2.36-1.22L20.8 12l-2.62 1.22L16.5 12l1.68-1.22zM5 22.44l12.64-6.84-1.82-3.6L5 22.44z" /></svg>
                  )}
                  <span className="font-bold text-[11px] sm:text-[12px] tracking-tight">{osData.name}</span>
                </button>

                <button onClick={() => setIsOTPModalOpen(true)} className="px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-gray-200 hover:border-gray-300 text-gray-700 transition-all flex items-center justify-center gap-2 group shadow-sm hover:shadow-md">
                  <KeyRound size={13} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
                  <span className="font-bold text-[11px] sm:text-[12px] tracking-tight whitespace-nowrap">View Space</span>
                </button>
              </div>

              {/* All platforms row */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[9px] sm:text-[10px] font-semibold text-gray-400 mr-0.5">Also on</span>
                {osData.platform !== 'windows' && (
                  <a href="#" className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg bg-gray-50 border border-gray-100 hover:border-gray-200 hover:bg-gray-100 transition-all group" title="Windows">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400 group-hover:text-gray-700 transition-colors"><path d="M0 3.5l9.9-1.4V12H0zm11-1.6L24 0v12H11zM0 12.5h9.9v9.9L0 21zm11 0h13V24l-13-1.8z" /></svg>
                    <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 group-hover:text-gray-700 transition-colors">Windows</span>
                  </a>
                )}
                {osData.platform !== 'ios' && (
                  <a href="#" className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg bg-gray-50 border border-gray-100 hover:border-gray-200 hover:bg-gray-100 transition-all group" title="iOS">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400 group-hover:text-gray-700 transition-colors"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
                    <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 group-hover:text-gray-700 transition-colors">iOS</span>
                  </a>
                )}
                {osData.platform !== 'android' && (
                  <a href="#" className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg bg-gray-50 border border-gray-100 hover:border-gray-200 hover:bg-gray-100 transition-all group" title="Android">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400 group-hover:text-gray-700 transition-colors"><path d="M17.6 11.5c0-.3 0-.5-.1-.8l1.7-1-1-1.7-1.7 1c-.5-.4-1.1-.7-1.7-.8V6h-2v2.1c-.6.2-1.2.5-1.7.8l-1.7-1-1 1.7 1.7 1c-.1.3-.1.5-.1.8s0 .5.1.8l-1.7 1 1 1.7 1.7-1c.5.4 1.1.7 1.7.8V18h2v-2.1c.6-.2 1.2-.5 1.7-.8l1.7 1 1-1.7-1.7-1c.1-.3.1-.5.1-.8zm-3.6 2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM7 2l-1 1 2.6 2.6C6.3 7.1 5 9.1 5 11.5c0 3.6 2.4 6.5 5.7 7.3L7 22l1 1 4-4-4-4-1 1 2.5 2.5c-2.5-.7-4.5-3-4.5-5.9 0-2 1-3.7 2.5-4.8L7 2z" /></svg>
                    <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 group-hover:text-gray-700 transition-colors">Android</span>
                  </a>
                )}
                {osData.platform !== 'web' && (
                  <a href="#" className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg bg-gray-50 border border-gray-100 hover:border-gray-200 hover:bg-gray-100 transition-all group" title="Web App">
                    <LayoutDashboard size={11} className="text-gray-400 group-hover:text-gray-700 transition-colors" />
                    <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 group-hover:text-gray-700 transition-colors">Web</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right: Interactive Demo Card — visible on all breakpoints */}
          <div className="flex justify-center lg:justify-end perspective-1000 mt-4 lg:mt-0">
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-none aspect-[4/4.5] sm:aspect-[4/4.8] transform-style-3d" style={{ animation: 'hyperFloat 10s ease-in-out infinite' }}>

              {/* Core Render Frame */}
              <div className="absolute inset-0 bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08)] rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 overflow-hidden flex flex-col p-1.5 sm:p-2">

                {/* Image Window */}
                <div className="flex-1 bg-gray-100 rounded-[1.2rem] sm:rounded-[1.8rem] border border-gray-100/50 shadow-inner relative flex items-center justify-center overflow-hidden">

                  <div className="absolute inset-0 w-full h-full">
                    <Image src="/room_demo_banner.png" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${imageState === 'base' ? 'opacity-100' : 'opacity-0'}`} alt="Scan" />
                    <Image src="/room_demo_banner_loading.png" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${imageState === 'loading' ? 'opacity-100' : 'opacity-0'}`} alt="Load" />
                    <Image src="/room_demo_banner_removed.png" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${imageState === 'removed' ? 'opacity-100' : 'opacity-0'}`} alt="Remove" />
                    <Image src="/room_demo_banner_removed_then_green.png" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${imageState === 'green' ? 'opacity-100' : 'opacity-0'}`} alt="Green" />
                  </div>

                  {/* Top Floating Status */}
                  <div className="absolute top-3 sm:top-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 bg-white/95 backdrop-blur-xl rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-sm border border-gray-200 z-20">
                    {(imageState === 'loading' || showAIProcessing) && <Loader2 size={10} className="animate-spin text-brand" />}
                    <span className={`text-[8px] sm:text-[10px] uppercase font-bold tracking-widest ${imageState === 'green' ? 'text-emerald-500' : 'text-gray-900'}`}>
                      {imageState === 'base' ? '01. Raw Data' : (imageState === 'loading' || imageState === 'removed' ? '02. Modifying Space' : '03. Render Final')}
                    </span>
                  </div>

                  {/* Chat bubbles */}
                  <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-5 flex flex-col gap-1.5 sm:gap-2.5 z-20">
                    {chatSteps.map((step, idx) => (
                      <div key={idx} className={`animate-fade-in-up text-[11px] sm:text-[13px] font-semibold px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl max-w-[85%] leading-relaxed shadow-sm backdrop-blur-2xl ${step.role === 'user'
                        ? 'bg-gray-900/90 text-white self-end rounded-br-sm'
                        : `self-start rounded-tl-[4px] border ${imageState === 'green' && idx === chatSteps.length - 1 ? 'bg-emerald-50/95 border-emerald-200 text-emerald-800' : 'bg-white/95 border-gray-100 text-gray-800'}`
                        }`}>
                        {step.text}
                      </div>
                    ))}

                    {typedText && (
                      <div className="bg-white/95 backdrop-blur-2xl border border-gray-100 px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-sm flex items-center animate-fade-in-up self-end max-w-[85%] rounded-br-sm text-[11px] sm:text-[13px] font-semibold text-gray-800">
                        {typedText}
                        <span className="animate-pulse w-[2px] sm:w-[3px] h-3 bg-gray-900 ml-[3px]" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isOTPModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-3xl animate-fade-in" onClick={() => setIsOTPModalOpen(false)} />
          <div className="relative w-full max-w-[400px] bg-white rounded-[2rem] p-8 md:p-10 border border-gray-200 shadow-[0_40px_100px_rgba(0,0,0,0.2)] flex flex-col items-center animate-fade-in-up">

            {/* Dynamic Icon */}
            <div className="w-16 h-16 rounded-[1.2rem] bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-900 mb-6 relative">
              <ShieldAlert size={28} strokeWidth={1.5} />
              <div className="absolute top-0 right-0 w-3 h-3 bg-brand rounded-full border-2 border-white animate-pulse" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-2 text-center">Private Space Viewer</h3>
            <p className="text-[14px] text-gray-500 font-medium text-center mb-8 leading-relaxed">
              Secure 3D views are locked. Please input your 6-digit Private View OTP token below to decrypt access.
            </p>

            <div className="flex gap-2.5 mb-8 z-10 w-full justify-between">
              {otpCode.map((val, idx) => (
                <input
                  key={idx} ref={el => { otpInputs.current[idx] = el; }} type="text" maxLength={1} value={val} onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-[45px] h-[55px] rounded-xl border border-gray-200 bg-gray-50 text-center text-xl font-bold text-gray-900 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 focus:bg-white transition-all shadow-inner"
                />
              ))}
            </div>

            <button className="w-full py-4 bg-gray-900 hover:bg-black text-white rounded-[1rem] font-bold text-[14px] tracking-wide transition-all shadow-md active:scale-95 mb-6">
              Decrypt & View Space
            </button>

            <p className="text-[11px] text-gray-400 font-medium text-center px-4">
              Don't have a token? <a href="#" className="text-brand hover:underline">Request access</a> from the space owner.
            </p>

            <button onClick={() => setIsOTPModalOpen(false)} className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes hyperFloat {
          0% { transform: translateY(0px) rotateX(1deg) rotateY(-2deg); }
          50% { transform: translateY(-12px) rotateX(-1deg) rotateY(2deg); }
          100% { transform: translateY(0px) rotateX(1deg) rotateY(-2deg); }
        }
      `}} />
    </>
  );
}
