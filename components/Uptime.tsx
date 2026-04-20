"use client";

import React, { useState, useEffect } from 'react';
import { X, Rocket } from 'lucide-react';

const services = [
  "Dashboard", "3D Viewer", "Scan API", "Mesh API", "Video API", "Auth", "CDN", "Webhooks"
];

export default function Uptime() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Minimal Status Strip */}
      <section id="status" className="py-10 md:py-14 px-4 sm:px-6 bg-white border-t border-gray-100">
        <div className="max-w-[900px] mx-auto">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <h3 className="text-[13px] font-bold text-red-900 tracking-tight">System Status</h3>
            </div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-red-600 bg-red-50 border border-red-200/50 px-2.5 py-1 rounded-full">404 Not Found</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {services.map((s, i) => (
              <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100 text-[11px] font-semibold text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Launch Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-fade-in">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowPopup(false)} />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-[0_40px_100px_-15px_rgba(0,0,0,0.25)] border border-gray-200/80 w-full max-w-[400px] overflow-hidden animate-scale-in">
            {/* Top accent */}
            <div className="h-[3px] w-full bg-gradient-to-r from-brand via-brand/60 to-transparent" />

            <div className="p-6 sm:p-8 text-center">
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 w-7 h-7 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
              >
                <X size={14} />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-brand/10 border border-brand/15 flex items-center justify-center mx-auto mb-5">
                <Rocket size={22} className="text-brand" strokeWidth={1.5} />
              </div>

              <h3 className="text-lg font-bold text-gray-900 tracking-tight mb-2">We're building something big.</h3>
              <p className="text-[13px] text-gray-500 font-medium leading-relaxed mb-6">
                Corsprite is currently under active development. All services are offline until our official launch in <span className="font-bold text-gray-900">2027</span>.
              </p>

              <div className="flex flex-col gap-2.5">
                <button className="w-full py-2.5 rounded-xl bg-brand hover:bg-brand-dark text-white text-[13px] font-bold transition-all shadow-sm hover:shadow-md">
                  Join the Waitlist
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="w-full py-2.5 rounded-xl bg-gray-50 border border-gray-200/80 text-gray-600 text-[13px] font-bold hover:bg-gray-100 transition-all"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scale-in { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-scale-in { animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
      `}} />
    </>
  );
}
