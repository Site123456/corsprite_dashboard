"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight } from 'lucide-react';

interface ReleaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReleaseModal({ isOpen, onClose }: ReleaseModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
        onClose();
      }, 2500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-5 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 4 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
            className="relative w-full max-w-[380px] rounded-[1.75rem] bg-white shadow-[0_25px_80px_-15px_rgba(0,0,0,0.25)] overflow-hidden"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all z-10"
            >
              <X size={14} strokeWidth={2.5} />
            </button>

            <div className="px-7 pt-8 pb-7">

              {/* Copy */}
              <motion.h2
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-[22px] font-bold text-gray-900 tracking-tight leading-[1.2] mb-2"
              >
                Coming soon.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-[13px] text-gray-500 font-medium leading-relaxed mb-6"
              >
                Corsprite launches this fall December 2026. Get notified when access opens.
              </motion.p>

              {/* Form / Success */}
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ delay: 0.25 }}
                    onSubmit={handleSubmit}
                    className="flex gap-2"
                  >
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[13px] font-medium text-gray-900 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all placeholder:text-gray-400"
                    />
                    <button
                      type="submit"
                      className="px-4 py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-bold text-[13px] transition-all active:scale-95 flex items-center gap-1.5 shrink-0"
                    >
                      Notify
                      <ArrowRight size={13} />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-3 py-3 px-4 rounded-xl bg-emerald-50 border border-emerald-100"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                      <Check size={12} className="text-white" strokeWidth={3} />
                    </div>
                    <p className="text-[12px] font-semibold text-emerald-800">You're on the list — we'll be in touch.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Legal */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="text-[10px] text-gray-400 font-medium mt-4"
              >
                Preregister now and get free 3 months of pro plan. <a href="#" className="text-brand hover:underline">Terms</a>
              </motion.p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
