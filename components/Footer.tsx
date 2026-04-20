import React from 'react';
export default function Footer() {
  return (
    <footer className="pt-24 pb-12 px-6 border-t border-gray-100 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/50 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 animate-fade-in-up">

        {/* Transparent Logo & Brand Bio */}
        <div className="lg:col-span-2">
          {/* Completely removed the background container box so logo blends into bg transparently! */}
          <img src="/logo/logo.png" alt="Corsprite Logo" className="h-7 object-contain mb-8 mix-blend-multiply" />
          <p className="text-[14px] leading-relaxed text-gray-500 font-medium max-w-sm">
            Corsprite provides an unprecedented API ecosystem for spatial mapping, AI semantic understanding, and autonomous architecture.
          </p>
        </div>

        <div>
          <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-widest mb-6">Platform</h4>
          <ul className="space-y-4 text-[14px] font-medium text-gray-500">
            <li><a href="#" className="hover:text-brand transition-colors">Capabilities</a></li>
            <li><a href="#" className="hover:text-brand transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-brand transition-colors">Changelog</a></li>
            <li><a href="#" className="hover:text-brand transition-colors">API Keys</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-widest mb-6">Solutions</h4>
          <ul className="space-y-4 text-[14px] font-medium text-gray-500">
            <li><a href="#" className="hover:text-brand transition-colors">Real Estate</a></li>
            <li><a href="#" className="hover:text-brand transition-colors">Interior Design</a></li>
            <li><a href="#" className="hover:text-brand transition-colors">Museums</a></li>
            <li><a href="#" className="hover:text-brand transition-colors">Insurance</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-widest mb-6">Stay Updated</h4>
          <div className="flex flex-col gap-3">
            <input type="email" placeholder="Email address" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-brand transition-colors" />
            <button className="w-full px-4 py-3 bg-gray-900 text-white rounded-xl text-[13px] font-bold transition-all hover:shadow-lg hover:bg-brand">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <p className="text-[12px] text-gray-400 font-medium tracking-wide">
          © 2026 Corsprite LLC. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-[12px] font-medium text-gray-400">
          <a href="#" className="hover:text-gray-900">Privacy Policy</a>
          <a href="#" className="hover:text-gray-900">Terms of Service</a>
          <a href="#" className="hover:text-gray-900">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
}
