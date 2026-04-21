"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MonitorDown, Smartphone, LayoutDashboard, KeyRound, ArrowRight, Loader2, Check, X, ShieldAlert, Sparkles, Play } from 'lucide-react';
import { useRelease } from '@/context/ReleaseContext';

export default function Hero() {
  const { onOpenRelease } = useRelease();
  const [typedText, setTypedText] = useState("");
  const [imageState, setImageState] = useState<'base' | 'loading' | 'removed' | 'green'>('base');
  const [chatSteps, setChatSteps] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [showAIProcessing, setShowAIProcessing] = useState(false);

  // OS Check
  const [osData, setOsData] = useState({ name: 'Download App', icon: MonitorDown, platform: 'web' });
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  // 3D Card logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

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

  const platformButtons = [
    {
      key: 'windows', label: 'Windows', icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3.5l9.9-1.4V12H0zm11-1.6L24 0v12H11zM0 12.5h9.9v9.9L0 21zm11 0h13V24l-13-1.8z" /></svg>
      )
    },
    {
      key: 'ios', label: 'iOS', icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
      )
    },
    {
      key: 'android', label: 'Android', icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 11.5c0-.3 0-.5-.1-.8l1.7-1-1-1.7-1.7 1c-.5-.4-1.1-.7-1.7-.8V6h-2v2.1c-.6.2-1.2.5-1.7.8l-1.7-1-1 1.7 1.7 1c-.1.3-.1.5-.1.8s0 .5.1.8l-1.7 1 1 1.7 1.7-1c.5.4 1.1.7 1.7.8V18h2v-2.1c.6-.2 1.2-.5 1.7-.8l1.7 1 1-1.7-1.7-1c.1-.3.1-.5.1-.8zm-3.6 2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM7 2l-1 1 2.6 2.6C6.3 7.1 5 9.1 5 11.5c0 3.6 2.4 6.5 5.7 7.3L7 22l1 1 4-4-4-4-1 1 2.5 2.5c-2.5-.7-4.5-3-4.5-5.9 0-2 1-3.7 2.5-4.8L7 2z" /></svg>
      )
    },
    { key: 'web', label: 'Web', icon: <LayoutDashboard size={12} /> },
  ];

  return (
    <>
      <section className="relative min-h-dvh flex items-center justify-center px-5 sm:px-6 overflow-hidden bg-white">

        {/* ── Ambient Background ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Ultra-subtle grid */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
            backgroundSize: '64px 64px'
          }} />

          {/* Scanning Beam Effect */}
          <motion.div
            animate={{
              top: ['-20%', '120%'],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute left-0 right-0 h-[100px] bg-gradient-to-b from-brand/0 via-brand/10 to-brand/0 -skew-y-12 z-0"
          />

          {/* Gradient orbs — very muted */}
          <div className="absolute top-[-15%] left-[-8%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-gradient-to-br from-blue-200/20 via-purple-100/10 to-transparent blur-[80px] sm:blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[300px] sm:w-[550px] h-[300px] sm:h-[550px] rounded-full bg-gradient-to-tl from-emerald-200/15 via-cyan-100/10 to-transparent blur-[80px] sm:blur-[120px]" />

          {/* Floating 'Data Points' */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.4, 0],
                y: [0, 20 * (i % 2 ? 1 : -1), 0],
                x: [0, 10 * (i % 3 ? 1 : -1), 0]
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.8
              }}
              className="absolute w-1 h-1 rounded-full bg-brand/30"
              style={{
                top: `${20 + i * 12}%`,
                left: `${15 + i * 14}%`
              }}
            />
          ))}

          {/* Top fade for header blending */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent" />
        </div>


        <div className="relative max-w-[1200px] mx-auto w-full flex flex-col-reverse lg:grid lg:grid-cols-[1fr_420px] gap-8 lg:gap-16 items-center lg:items-center pt-20 pb-8 lg:py-0">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-[560px] mx-auto lg:mx-0 lg:shrink-0"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="hidden lg:inline-flex items-center gap-2 px-2.5 py-1 mb-4 sm:mb-6 rounded-full bg-gray-50 border border-gray-200/60 text-gray-500"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span className="text-[10px] font-semibold tracking-wide uppercase">Spatial Intelligence</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-[1.8rem] sm:text-[3rem] lg:text-[3.8rem] xl:text-[4.2rem] font-bold tracking-[-0.035em] leading-[1.1] mb-4 sm:mb-5 text-gray-900">
              CorSprite,{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#3A7BFF] via-[#8B5CF6] to-[#10B981] bg-clip-text text-transparent">
                  2D & 3D assistant
                </span>
                {/* Underline accent */}
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none">
                  <path d="M1 5.5Q50 1 100 4.5T199 3" stroke="url(#grad)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <defs><linearGradient id="grad" x1="0" x2="200" y1="0" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="#3A7BFF" /><stop offset="0.5" stopColor="#8B5CF6" /><stop offset="1" stopColor="#10B981" /></linearGradient></defs>
                </svg>
              </span>
              .
            </h1>

            {/* Subheadline */}
            <p className="text-[12px] sm:text-[16px] text-gray-400 max-w-[380px] leading-relaxed font-medium mb-5 sm:mb-8">
              Revolutionize your spatial workflows with AI-powered 2D & 3D content creation, editing, and analysis.
            </p>

            {/* CTA Row */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-2.5 w-full sm:w-auto">
              <button
                onClick={onOpenRelease}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-gray-900 text-white text-[13px] font-semibold tracking-[-0.01em] transition-all duration-300 hover:bg-black hover:shadow-xl hover:shadow-gray-900/15 active:scale-[0.97] overflow-hidden"
              >
                {/* shine effect */}
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <span className="relative">{osData.name}</span>
                <ArrowRight size={14} className="relative opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                onClick={() => setIsOTPModalOpen(true)}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-gray-200 hover:border-gray-300 text-gray-700 text-[13px] font-semibold transition-all duration-300 hover:shadow-md hover:shadow-gray-100 active:scale-[0.97]"
              >
                <KeyRound size={14} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                View Space
              </button>
            </div>

            {/* Platform pills */}
            <div className="flex items-center gap-1.5 mt-6">
              <span className="text-[10px] text-gray-300 font-medium mr-1">Also on</span>
              {platformButtons.filter(p => p.key !== osData.platform).map(p => (
                <a
                  key={p.key}
                  href="#"
                  className="flex items-center gap-1 px-2 py-1 rounded-md text-gray-300 hover:text-gray-500 hover:bg-gray-50 transition-all text-[10px] font-semibold"
                  title={p.label}
                >
                  {p.icon}
                  <span className="hidden sm:inline">{p.label}</span>
                </a>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: 1, 
              y: [0, -6, 0],
            }}
            transition={{ 
              opacity: { duration: 0.8, ease: "easeOut" },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="flex w-full min-h-[220px] justify-center lg:justify-end perspective-1000 shrink-0"
          >
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ 
                rotateX: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : rotateX, 
                rotateY: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : rotateY 
              }}
              className="relative w-full max-w-[260px] sm:max-w-[400px] lg:max-w-[420px] aspect-[4/3.2] sm:aspect-[3/3.6] transform-style-3d cursor-pointer"
            >
              {/* Card shell */}
              <div className="absolute inset-0 rounded-[1.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] bg-white/40 backdrop-blur-xl sm:backdrop-blur-2xl flex flex-col p-1 transition-all duration-500 hover:shadow-[0_40px_100px_-15px_rgba(0,0,0,0.2)]">

                {/* Image Window */}
                <div className="flex-1 rounded-[1.1rem] bg-gray-100 relative overflow-hidden border border-gray-100/50">

                  {/* Image stack */}
                  <div className="absolute inset-0 w-full h-full">
                    <Image priority src="/room_demo_banner.png" width={500} height={500} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${imageState === 'base' ? 'opacity-100' : 'opacity-0'}`} alt="Scan" />
                    <Image src="/room_demo_banner_loading.png" width={500} height={500} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${imageState === 'loading' ? 'opacity-100' : 'opacity-0'}`} alt="Load" />
                    <Image src="/room_demo_banner_removed.png" width={500} height={500} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${imageState === 'removed' ? 'opacity-100' : 'opacity-0'}`} alt="Remove" />
                    <Image src="/room_demo_banner_removed_then_green.png" width={500} height={500} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${imageState === 'green' ? 'opacity-100' : 'opacity-0'}`} alt="Green" />
                  </div>

                  {/* Floating Step Indicator */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20">
                    <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm sm:backdrop-blur-md rounded-full px-2.5 py-1 shadow-sm border border-white/50">
                      {(imageState === 'loading' || showAIProcessing) && <Loader2 size={10} className="animate-spin text-brand" />}
                      {imageState === 'green' && <Check size={10} className="text-emerald-500" />}
                      <span className={`text-[8px] sm:text-[9px] uppercase font-bold tracking-widest ${imageState === 'green' ? 'text-emerald-600' : 'text-gray-600'}`}>
                        {imageState === 'base' ? 'Raw scan' : imageState === 'loading' ? 'Processing' : imageState === 'removed' ? 'Objects removed' : 'Render complete'}
                      </span>
                    </div>
                  </div>

                  {/* Chat overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-1.5 z-20">
                    {chatSteps.map((step, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className={`text-[10px] sm:text-[12px] font-medium px-2.5 py-1.5 rounded-xl max-w-[85%] leading-tight sm:leading-relaxed backdrop-blur-sm sm:backdrop-blur-md border ${step.role === 'user'
                          ? 'bg-gray-900/40 text-white self-end rounded-br-sm border-white/10 shadow-lg'
                          : `self-start rounded-tl-[4px] shadow-sm ${imageState === 'green' && idx === chatSteps.length - 1
                            ? 'bg-emerald-50/70 border-emerald-200/40 text-emerald-700'
                            : 'bg-white/50 border-white/40 text-gray-800'
                          }`
                          }`}
                      >
                        {step.text}
                      </motion.div>
                    ))}

                    {typedText && (
                      <div className="bg-white/90 backdrop-blur-xl border border-gray-100/60 px-3 py-2 rounded-xl shadow-sm flex items-center self-end max-w-[82%] rounded-br-sm text-[11px] sm:text-[12px] font-medium text-gray-700">
                        {typedText}
                        <span className="animate-pulse w-[2px] h-3 bg-gray-800 ml-1 rounded-full" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Floating accent particles — very subtle */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br from-brand/10 to-purple-400/5 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-400/10 to-cyan-300/5 blur-2xl pointer-events-none" />
            </motion.div>
          </motion.div>
        </div>

        {/* ── Bottom scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="hidden lg:block text-[10px] text-gray-300 font-medium tracking-wider uppercase">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-gray-200 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-1.5 rounded-full bg-gray-300"
            />
          </div>
        </motion.div>
      </section>

      {/* ── OTP Modal ── */}
      {isOTPModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-xl animate-fade-in" onClick={() => setIsOTPModalOpen(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[400px] bg-white rounded-2xl p-8 md:p-10 border border-gray-200/80 shadow-2xl flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-800 mb-5 relative">
              <ShieldAlert size={24} strokeWidth={1.5} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand rounded-full border-2 border-white animate-pulse" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-1.5 text-center">Private Space Viewer</h3>
            <p className="text-[13px] text-gray-400 font-medium text-center mb-7 leading-relaxed max-w-[280px]">
              Enter your 6-digit OTP token to decrypt and view this private space.
            </p>

            <div className="flex gap-2 mb-7 z-10 w-full justify-center">
              {otpCode.map((val, idx) => (
                <input
                  key={idx}
                  ref={el => { otpInputs.current[idx] = el; }}
                  type="text"
                  maxLength={1}
                  value={val}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-[44px] h-[52px] rounded-xl border border-gray-200 bg-gray-50 text-center text-lg font-bold text-gray-900 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 focus:bg-white transition-all"
                />
              ))}
            </div>

            <button className="w-full py-3.5 bg-gray-900 hover:bg-black text-white rounded-xl font-semibold text-[13px] transition-all active:scale-[0.97] mb-5">
              Decrypt & View
            </button>

            <p className="text-[11px] text-gray-400 font-medium text-center">
              No token? <a href="#" className="text-brand hover:underline">Request access</a> from the owner.
            </p>

            <button onClick={() => setIsOTPModalOpen(false)} className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-gray-300 hover:text-gray-900 hover:bg-gray-100 transition-colors">
              <X size={14} />
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
}
