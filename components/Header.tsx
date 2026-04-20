"use client";

import React, { useState, useRef } from 'react';
import {
  Menu, X, ChevronDown, Globe, Play, ArrowRight,
  Box, Brain, Ruler, LayoutTemplate, ScanSearch, Palette,
  Building2, Armchair, HardHat, ShieldCheck, Library,
  BookOpen, Terminal, Newspaper, Users, HelpCircle, MessageSquare
} from 'lucide-react';

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
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 72 && currentScrollY > lastScrollY && !isMobileOpen && !activeMenu) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    const handleClick = () => {
      setIsVisible(true);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
    };
  }, [lastScrollY, isMobileOpen, activeMenu]);

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  return (
    <div className={`fixed top-0 inset-x-0 z-50 pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <header className={`w-full h-[72px] relative flex items-center justify-between transition-all duration-300 px-4 sm:px-6 lg:px-12 pointer-events-auto ${isVisible ? 'bg-white/80 backdrop-blur-[40px] border-b border-gray-200/50 shadow-sm' : 'bg-transparent'}`} onMouseLeave={handleMouseLeave}>

        {/* Left Side: Logo */}
        <div className="flex items-center w-[160px]">
          <a href="#" className="flex items-center gap-2">
            <img src="/logo/logo.png" alt="Corsprite" className="h-[44px] sm:h-[44px] object-contain mix-blend-multiply" />
          </a>
        </div>

        {/* Center: Unified Shelf Nav */}
        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center h-full gap-2">
          {Object.entries(megaMenus).map(([key, menu]) => (
            <div
              key={key}
              /* REMOVED RELATIVE: the dropdown will map natively to the <nav> container instead of the button itself! */
              className="h-full flex items-center group"
              onMouseEnter={() => handleMouseEnter(key)}
            >
              <button className={`flex items-center gap-1.5 text-[14px] font-semibold tracking-tight px-4 py-2 rounded-full transition-all duration-300 ${activeMenu === key ? 'bg-gray-100/80 text-gray-900' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
                {menu.label}
                <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ${activeMenu === key ? 'rotate-180 text-gray-900' : ''}`} />
              </button>

              {/* Mega Dropdown Centered via Unified Nav Architecture */}
              <div
                className={`absolute top-[72px] left-1/2 -translate-x-1/2 w-[840px] max-w-[calc(100vw-48px)] bg-white/95 backdrop-blur-3xl border border-gray-200/80 shadow-[0_40px_100px_-15px_rgba(0,0,0,0.15)] rounded-[2.5rem] transition-all duration-500 origin-top overflow-hidden ease-[cubic-bezier(0.16,1,0.3,1)] ${activeMenu === key ? 'opacity-100 visible scale-100 translate-y-2' : 'opacity-0 invisible scale-[0.98] -translate-y-2 pointer-events-none'}`}
              >
                <div className="flex flex-col md:flex-row h-full">
                  <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                    {menu.mainLinks.map((link, idx) => {
                      const Icon = link.icon;
                      return (
                        <a key={idx} href="#" className="flex items-start gap-4 p-3 rounded-[1.5rem] hover:bg-gray-50/80 group border border-transparent hover:border-gray-100/50 transition-all duration-300">
                          <div className="shrink-0 w-10 h-10 rounded-[12px] border border-gray-100/80 flex items-center justify-center text-gray-400 bg-white group-hover:bg-brand/5 group-hover:text-brand transition-all duration-300 shadow-sm">
                            <Icon size={18} strokeWidth={2} />
                          </div>
                          <div className="pt-0.5">
                            <h4 className="text-[13px] font-bold text-gray-900 mb-1 group-hover:text-brand transition-colors tracking-tight leading-none">{link.title}</h4>
                            <p className="text-[12px] text-gray-500 leading-relaxed font-medium">{link.desc}</p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                  {/* Highlight Block */}
                  <div className="w-full md:w-[320px] bg-gray-50/50 p-10 border-t md:border-t-0 md:border-l border-gray-100/80 flex flex-col items-start justify-center relative overflow-hidden">
                    <p className="text-[10px] font-bold text-brand tracking-widest uppercase mb-4 relative z-10">{menu.highlight.title}</p>
                    <div className="w-12 h-12 rounded-[14px] bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-800 mb-5 relative z-10">
                      <menu.highlight.icon size={22} strokeWidth={1.5} />
                    </div>
                    <h4 className="text-[17px] font-bold text-gray-900 mb-2 tracking-tight relative z-10">{menu.highlight.heading}</h4>
                    <p className="text-[13px] text-gray-500 leading-relaxed font-medium mb-6 relative z-10">
                      {menu.highlight.desc}
                    </p>
                    <a href="#" className="flex items-center gap-2 text-[12px] font-bold text-gray-900 hover:text-brand transition-colors group relative z-10">
                      {menu.highlight.action}
                      <ArrowRight size={14} className="group-hover:translate-x-1 text-gray-400 group-hover:text-brand transition-all" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <a href="#" className="flex items-center gap-1.5 text-[14px] font-semibold tracking-tight px-4 py-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300">Pricing</a>
        </nav>

        {/* Right Side: Actions (Desktop & Mobile Refined) */}
        <div className="flex items-center justify-end gap-2 w-auto">

          <div className="hidden lg:flex items-center gap-4">
            <a href="#" className="text-[13px] font-semibold tracking-tight px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors">Documentation</a>

            <div className="relative border-r border-gray-200/60 pr-4 mr-2">
              <button
                className="flex items-center gap-1.5 text-[13px] font-semibold tracking-tight px-3 py-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={(e) => { e.stopPropagation(); setIsLangOpen(!isLangOpen); setActiveMenu(null); }}
              >
                <Globe size={15} className="text-gray-400" />
                {currentLang}
              </button>
              <div className={`absolute top-[45px] left-1/2 -translate-x-1/2 w-36 bg-white/95 backdrop-blur-3xl border border-gray-100 shadow-md rounded-[1.5rem] py-2 transition-all duration-300 origin-top ${isLangOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}`}>
                {languages.map(l => (
                  <button
                    key={l.code}
                    className="w-full text-left px-5 py-2 text-[13px] hover:bg-gray-50/80 text-gray-700 hover:text-brand transition-colors flex justify-between items-center font-medium"
                    onClick={() => { setCurrentLang(l.code); setIsLangOpen(false); }}
                  >
                    {l.name}
                    {currentLang === l.code && <span className="w-1.5 h-1.5 rounded-full bg-brand shadow-sm" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Minimal Auth Actions */}
          <button className="hidden sm:flex items-center gap-2 text-[13px] font-bold tracking-wide px-5 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-full shrink-0">
            Log In
          </button>
          <button className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-[1.2rem] bg-gray-900 hover:bg-black text-white text-[13px] font-bold tracking-wide transition-all duration-300 shadow-sm shrink-0 hover:shadow-md">
            Get Platform
          </button>

          {/* Mobile Extremely Clean Right Module */}
          <div className="sm:hidden flex items-center gap-1 border border-gray-200/60 p-1 rounded-full bg-white/50 shadow-sm">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full text-gray-600 hover:bg-gray-50 text-[11px] font-bold transition-all shrink-0">
              Log In
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand hover:bg-brand-dark text-white text-[11px] font-bold transition-all shadow-sm shrink-0">
              Get App
            </button>
          </div>

          <button
            className={`lg:hidden text-gray-900 p-2 relative ml-1 rounded-full transition-colors pointer-events-auto flex items-center justify-center bg-gray-50/80 hover:bg-gray-100 ${isMobileOpen ? 'bg-gray-100' : ''}`}
            onClick={() => { setIsMobileOpen(!isMobileOpen); setActiveMenu(null); setIsLangOpen(false); }}
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <div className={`lg:hidden absolute top-[72px] left-0 w-full bg-white/95 backdrop-blur-3xl border-b border-gray-200/50 shadow-[0_40px_100px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-y-auto pointer-events-auto origin-top ${isMobileOpen ? 'max-h-[85vh] opacity-100 scale-100 block' : 'max-h-0 opacity-0 scale-[0.98] hidden pointer-events-none'}`}>
        <div className="flex flex-col px-6 py-6 space-y-6">
          {Object.entries(megaMenus).map(([key, menu]) => (
            <div key={key} className="space-y-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{menu.label}</p>
              <div className="grid grid-cols-1 gap-3 pl-2 border-l border-gray-100/50">
                {menu.mainLinks.map((link, idx) => (
                  <a key={idx} href="#" className="flex gap-4 items-center group">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-brand border border-gray-100">
                      <link.icon size={14} />
                    </div>
                    <span className="text-[13px] font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">{link.title}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
          <div className="pt-2 border-t border-gray-100/50 flex flex-col gap-3">
            <a href="#" className="text-[14px] font-semibold text-gray-800">Pricing</a>
            <a href="#" className="text-[14px] font-semibold text-gray-800">Documentation</a>
          </div>
        </div>
      </div>
    </div>
  );
}
