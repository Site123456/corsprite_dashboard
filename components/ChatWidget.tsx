"use client";

import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
      
      {/* Expanding Chat Window - Ultra Minimal Glass */}
      <div className={`w-[340px] bg-white/70 backdrop-blur-[30px] rounded-[2rem] shadow-[0_20px_80px_-10px_rgba(0,0,0,0.15)] border border-white/80 transition-all duration-300 origin-bottom flex flex-col overflow-hidden pointer-events-auto ${
        isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4 mb-[-400px]'
      }`}>
        
        {/* Minimal Header */}
        <div className="px-5 py-4 flex justify-between items-center bg-white/40 border-b border-black/[0.03]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gray-50 border border-gray-200/50 flex items-center justify-center">
              <Sparkles size={14} className="text-brand" />
            </div>
            <div className="flex flex-col">
              <h4 className="font-semibold text-gray-900 text-[13px] tracking-tight">Spatial Assistant</h4>
            </div>
          </div>
          
          <button 
            onClick={() => setIsOpen(false)} 
            className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-black/5 transition-colors"
          >
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Chat Body */}
        <div className="h-[280px] p-5 space-y-4 overflow-y-auto w-full custom-scrollbar flex flex-col items-start bg-transparent mask-image-fade">
          <div className="w-full flex justify-center mb-1">
            <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400 bg-black/5 px-2 py-0.5 rounded-full">Today</span>
          </div>
          <div className="flex justify-start animate-fade-in-up w-full">
            <div className="bg-white border border-gray-100/50 rounded-2xl rounded-tl-sm px-4 py-3 text-[13px] font-medium text-gray-700 shadow-sm max-w-[88%] leading-relaxed">
              Hello! Need help reconstructing a scene or extracting measurements?
            </div>
          </div>
          <div className="flex justify-start animate-fade-in-up w-full" style={{ animationDelay: '200ms' }}>
            <div className="flex flex-col gap-2 w-full">
              <button className="text-[12px] font-semibold text-gray-600 bg-gray-50 border border-transparent hover:bg-brand/5 hover:text-brand px-3 py-2 rounded-[0.8rem] transition-colors w-fit text-left">
                Export floor plan to CAD
              </button>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-3 bg-white/50 backdrop-blur-xl border-t border-black/[0.03]">
          <div className="relative flex items-center">
            <input 
              type="text" 
              placeholder="Message..." 
              className="w-full bg-white border border-gray-200/80 rounded-[1.2rem] pl-4 pr-10 py-2.5 text-[13px] font-medium text-gray-900 focus:outline-none focus:border-brand/40 focus:ring-2 focus:ring-brand/10 transition-all placeholder:text-gray-400 shadow-sm" 
            />
            <button className="absolute right-1.5 w-[28px] h-[28px] bg-gray-900 hover:bg-brand text-white rounded-full flex justify-center items-center transition-transform hover:scale-105">
              <Send size={12} className="ml-0.5" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      {/* FAB - Hides entirely when chat is open for absolute minimal flow */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`w-[52px] h-[52px] bg-gray-900 hover:bg-brand text-white rounded-full flex items-center justify-center shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_30px_rgba(58,123,255,0.4)] transition-all duration-300 pointer-events-auto ${
          isOpen ? 'scale-0 opacity-0 absolute bottom-0 right-0' : 'scale-100 opacity-100 relative hover:scale-105 active:scale-95'
        }`}
      >
        <MessageSquare size={20} className="mt-0.5" strokeWidth={2} />
        {!isOpen && (
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-gray-900"></span>
          </span>
        )}
      </button>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.1);
          border-radius: 10px;
        }
        .mask-image-fade {
          mask-image: linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%);
        }
      `}} />
    </div>
  );
}
