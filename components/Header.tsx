"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ChevronDown, Globe, Play, ArrowRight,
  Box, Brain, Ruler, LayoutTemplate, ScanSearch, Palette,
  Building2, Armchair, HardHat, ShieldCheck, Library,
  BookOpen, Terminal, Newspaper, Users, HelpCircle, MessageSquare
} from 'lucide-react';
import { useRelease } from '@/context/ReleaseContext';

const megaMenus = {
  platform: {
    label: 'Platform',
    mainLinks: [
      { icon: Box, title: "3D Reconstruction", desc: "Build photorealistic models from scans." },
      { icon: Palette, title: "Customizable UX", desc: "White-labeled, fully adaptable viewer." },
      { icon: Brain, title: "Scene AI", desc: "Semantic understanding & defect detection." },
      { icon: Ruler, title: "Auto-Measurements", desc: "Millimeter-accurate spatial dimensions." },
      { icon: LayoutTemplate, title: "Floor Plans", desc: "Export 2D & 3D top-down blueprints." },
      { icon: ScanSearch, title: "Object Detection", desc: "Catalog furniture, fixtures, and assets." },
    ],
    highlight: {
      title: "New Feature",
      heading: "Chat With Your Space",
      desc: "Ask contextual questions about the scanned room using our spatial LLMs.",
      action: "Learn more",
      icon: MessageSquare
    }
  },
  solutions: {
    label: 'Solutions',
    mainLinks: [
      { icon: Building2, title: "Real Estate", desc: "Auto-generate listings and virtual tours." },
      { icon: Armchair, title: "Interior Design", desc: "Export accurate rooms to CAD." },
      { icon: Library, title: "Museums & Galleries", desc: "Archive and exhibit artifacts in 3D." },
      { icon: HardHat, title: "Construction", desc: "Track site progress and verify as-built." },
      { icon: ShieldCheck, title: "Insurance", desc: "Document claims precisely with context." },
    ],
    highlight: {
      title: "Planning",
      heading: "Case Studies — Coming Soon",
      desc: "We're documenting how leading organizations will deploy spatial intelligence at scale.",
      action: "Stay tuned",
      icon: Library
    }
  },
  resources: {
    label: 'Resources',
    mainLinks: [
      { icon: BookOpen, title: "Documentation", desc: "Guides and tutorials for Corsprite." },
      { icon: Terminal, title: "API Reference", desc: "Integrate Corsprite into your workflow." },
      { icon: Newspaper, title: "Blog", desc: "Latest product updates and spatial tech." },
      { icon: Users, title: "Community", desc: "Connect with other Corsprite users." },
      { icon: HelpCircle, title: "Help Center", desc: "Support articles and FAQs." },
    ],
    highlight: {
      title: "Webinar",
      heading: "Intro to Spatial AI",
      desc: "Join our next live webinar to learn the basics of spatial intelligence.",
      action: "Register now",
      icon: Play
    }
  }
};

const languages = [
  { code: 'EN', name: 'English' },
  { code: 'FR', name: 'Français' },
  { code: 'ES', name: 'Español' },
  { code: 'DE', name: 'Deutsch' },
  { code: 'IT', name: 'Italiano' }
];

export default function Header() {
  const { onOpenRelease } = useRelease();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      if (currentScrollY > 100 && currentScrollY > lastScrollY && !isMobileOpen && !activeMenu) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobileOpen, activeMenu]);

  // Close lang dropdown on outside click
  useEffect(() => {
    const handler = () => setIsLangOpen(false);
    if (isLangOpen) {
      window.addEventListener('click', handler);
      return () => window.removeEventListener('click', handler);
    }
  }, [isLangOpen]);

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  return (
    <div className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>

      {/* ── Top Bar ── */}
      <header
        className={`relative w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled
            ? 'h-[60px] bg-white/70 backdrop-blur-2xl border-b border-gray-200/40 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
            : 'h-[68px] bg-transparent'
          }`}
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-[1280px] mx-auto h-full flex items-center justify-between px-5 lg:px-8">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 shrink-0 relative z-10">
            <img
              src="/logo/logo.png"
              alt="Corsprite"
              className={`object-contain mix-blend-multiply transition-all duration-500 ${scrolled ? 'h-[36px]' : 'h-[40px]'}`}
            />
          </a>

          {/* ── Center Nav ── */}
          <nav className="hidden lg:flex items-center gap-0.5 h-full">
            {Object.entries(megaMenus).map(([key, menu]) => (
              <div
                key={key}
                className="h-full flex items-center"
                onMouseEnter={() => handleMouseEnter(key)}
              >
                <button
                  className={`relative flex items-center gap-1 text-[13px] font-medium tracking-[-0.01em] px-3.5 py-1.5 rounded-lg transition-all duration-300 ${activeMenu === key
                      ? 'text-gray-900 bg-gray-100/70'
                      : 'text-gray-500 hover:text-gray-800'
                    }`}
                >
                  {menu.label}
                  <ChevronDown
                    size={12}
                    className={`text-gray-400 transition-transform duration-300 ${activeMenu === key ? 'rotate-180 text-gray-600' : ''}`}
                  />
                </button>
              </div>
            ))}

            <a
              href="#pricing"
              className="text-[13px] font-medium tracking-[-0.01em] px-3.5 py-1.5 rounded-lg text-gray-500 hover:text-gray-800 transition-all duration-300"
            >
              Pricing
            </a>
            <a
              href="#"
              className="text-[13px] font-medium tracking-[-0.01em] px-3.5 py-1.5 rounded-lg text-gray-500 hover:text-gray-800 transition-all duration-300"
            >
              Docs
            </a>
          </nav>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-2 shrink-0 relative z-10">

            {/* Language Switcher */}
            <div className="relative">
              <button
                className="flex items-center gap-1.5 text-[12px] font-medium text-gray-400 hover:text-gray-700 px-2 py-1.5 rounded-lg transition-colors"
                onClick={(e) => { e.stopPropagation(); setIsLangOpen(!isLangOpen); setActiveMenu(null); }}
              >
                <Globe size={13} />
                <span className="hidden sm:inline">{currentLang}</span>
                <span className="sm:hidden text-[10px]">{currentLang}</span>
              </button>
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-[40px] right-0 w-[140px] bg-white/95 backdrop-blur-2xl border border-gray-100 shadow-xl rounded-xl py-1.5 origin-top-right z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {languages.map(l => (
                      <button
                        key={l.code}
                        className="w-full text-left px-4 py-2 text-[12px] hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-colors flex justify-between items-center font-medium"
                        onClick={() => { setCurrentLang(l.code); setIsLangOpen(false); }}
                      >
                        {l.name}
                        {currentLang === l.code && <span className="w-1.5 h-1.5 rounded-full bg-brand" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-5 bg-gray-200/60" />

            {/* Auth */}
            <button
              onClick={onOpenRelease}
              className="hidden lg:flex items-center text-[13px] font-medium text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg transition-colors"
            >
              Log in
            </button>
            <button
              onClick={onOpenRelease}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-900 text-white text-[12px] font-semibold tracking-[-0.01em] transition-all duration-300 hover:bg-black hover:shadow-lg hover:shadow-gray-900/10 active:scale-[0.97]"
            >
              Get Started
              <ArrowRight size={12} className="opacity-60" />
            </button>

            {/* Mobile Auth Actions */}
            <div className="lg:hidden flex items-center gap-1">
              <button
                onClick={onOpenRelease}
                className="flex items-center text-[11px] font-semibold text-gray-500 px-2.5 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Log in
              </button>
              <button
                onClick={onOpenRelease}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-900 text-white text-[11px] font-semibold transition-all hover:bg-black active:scale-[0.97]"
              >
                Get App
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-gray-600 hover:bg-gray-100/80 transition-colors ml-1"
              onClick={() => { setIsMobileOpen(!isMobileOpen); setActiveMenu(null); setIsLangOpen(false); }}
              aria-label="Toggle navigation"
            >
              {isMobileOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
            </button>
          </div>
        </div>

        {/* ── Mega Dropdown ── */}
        <AnimatePresence>
          {activeMenu && megaMenus[activeMenu as keyof typeof megaMenus] && (
            <motion.div
              key={activeMenu}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-1/2 -translate-x-1/2 w-[780px] max-w-[calc(100vw-32px)] mt-2"
              onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
              onMouseLeave={handleMouseLeave}
            >
              <div className="bg-white/95 backdrop-blur-2xl border border-gray-200/60 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.12)] rounded-2xl overflow-hidden">
                <div className="flex">
                  {/* Links Grid */}
                  <div className="flex-1 p-6 grid grid-cols-2 gap-1">
                    {megaMenus[activeMenu as keyof typeof megaMenus].mainLinks.map((link, idx) => {
                      const Icon = link.icon;
                      return (
                        <a
                          key={idx}
                          href="#"
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50/80 group transition-all duration-200"
                        >
                          <div className="shrink-0 w-9 h-9 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-brand group-hover:border-brand/20 group-hover:bg-brand/5 transition-all duration-200">
                            <Icon size={16} strokeWidth={1.8} />
                          </div>
                          <div className="min-w-0 pt-0.5">
                            <h4 className="text-[13px] font-semibold text-gray-800 group-hover:text-gray-900 transition-colors leading-none mb-1">
                              {link.title}
                            </h4>
                            <p className="text-[11px] text-gray-400 leading-relaxed font-medium line-clamp-2">
                              {link.desc}
                            </p>
                          </div>
                        </a>
                      );
                    })}
                  </div>

                  {/* Highlight Panel */}
                  <div className="w-[260px] bg-gradient-to-b from-gray-50/80 to-gray-50/40 p-7 border-l border-gray-100/60 flex flex-col justify-center">
                    <p className="text-[9px] font-bold text-brand tracking-[0.15em] uppercase mb-3">
                      {megaMenus[activeMenu as keyof typeof megaMenus].highlight.title}
                    </p>
                    <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-700 mb-4">
                      {React.createElement(megaMenus[activeMenu as keyof typeof megaMenus].highlight.icon, { size: 18, strokeWidth: 1.5 })}
                    </div>
                    <h4 className="text-[15px] font-bold text-gray-900 mb-1.5 tracking-tight leading-snug">
                      {megaMenus[activeMenu as keyof typeof megaMenus].highlight.heading}
                    </h4>
                    <p className="text-[11px] text-gray-500 leading-relaxed font-medium mb-4">
                      {megaMenus[activeMenu as keyof typeof megaMenus].highlight.desc}
                    </p>
                    <a href="#" className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-800 hover:text-brand transition-colors group/link">
                      {megaMenus[activeMenu as keyof typeof megaMenus].highlight.action}
                      <ArrowRight size={11} className="text-gray-400 group-hover/link:text-brand group-hover/link:translate-x-0.5 transition-all" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Mobile Slide-in Panel ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-white/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 bg-white/85 backdrop-blur-3xl z-50 lg:hidden flex flex-col h-[100dvh]"
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between px-6 h-[72px] shrink-0 border-b border-gray-100/50">
                <motion.img
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  src="/logo/logo.png"
                  alt="Corsprite"
                  className="h-[34px] object-contain mix-blend-multiply"
                />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMobileOpen(false)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Panel Content - Scrollable */}
              <div className="flex-1 overflow-y-auto px-6 py-8 scrollbar-none space-y-8">
                <nav className="space-y-2">
                  {Object.entries(megaMenus).map(([key, menu], idx) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08, duration: 0.5 }}
                      className="group"
                    >
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === key ? null : key)}
                        className={`w-full flex items-center justify-between py-4 text-[18px] font-bold tracking-tight transition-all ${mobileExpanded === key ? 'text-brand' : 'text-gray-900 active:translate-x-1'
                          }`}
                      >
                        {menu.label}
                        <motion.div
                          animate={{ rotate: mobileExpanded === key ? 180 : 0, scale: mobileExpanded === key ? 1.1 : 1 }}
                          transition={{ duration: 0.3 }}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${mobileExpanded === key ? 'bg-brand/10 text-brand' : 'bg-gray-50 text-gray-400'}`}
                        >
                          <ChevronDown size={18} />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {mobileExpanded === key && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pb-6 pt-1 grid grid-cols-1 gap-2">
                              {menu.mainLinks.map((link, lIdx) => (
                                <motion.a
                                  key={lIdx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: lIdx * 0.04 }}
                                  href="#"
                                  className="flex items-center gap-4 py-3.5 px-4 rounded-2xl bg-gray-50/50 hover:bg-brand/5 transition-all border border-transparent hover:border-brand/10 group/item"
                                >
                                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 group-hover/item:text-brand transition-all shadow-sm">
                                    <link.icon size={18} strokeWidth={1.8} />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[14px] font-bold text-gray-800">
                                      {link.title}
                                    </span>
                                    <span className="text-[11px] text-gray-400 font-medium line-clamp-1">
                                      {link.desc}
                                    </span>
                                  </div>
                                </motion.a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}

                  {/* Static Links */}
                  <div className="pt-4 space-y-1">
                    <motion.a
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      href="#pricing"
                      className="block py-4 text-[18px] font-bold text-gray-900 border-b border-gray-50 active:translate-x-1 transition-transform"
                    >
                      Pricing
                    </motion.a>
                    <motion.a
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      href="#"
                      className="block py-4 text-[18px] font-bold text-gray-900 active:translate-x-1 transition-transform"
                    >
                      Documentation
                    </motion.a>
                  </div>
                </nav>
              </div>

              {/* Panel Footer */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="px-6 py-6 border-t border-gray-100/60 bg-white/50 shrink-0 space-y-5"
              >
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => { setIsMobileOpen(false); onOpenRelease(); }}
                    className="w-full h-11 rounded-xl bg-gray-900 text-white text-[13px] font-bold transition-all hover:bg-black active:scale-[0.98] shadow-lg shadow-gray-900/10 flex items-center justify-center gap-1.5"
                  >
                    Get Started
                    <ArrowRight size={14} />
                  </button>
                  <button
                    onClick={() => { setIsMobileOpen(false); onOpenRelease(); }}
                    className="w-full h-11 rounded-xl bg-white border border-gray-200 text-gray-900 text-[13px] font-bold transition-all hover:bg-gray-50 active:scale-[0.98]"
                  >
                    Log in
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
