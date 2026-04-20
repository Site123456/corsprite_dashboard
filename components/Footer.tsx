"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';

export default function Footer() {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="pt-24 pb-12 px-6 border-t border-gray-100 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/50 pointer-events-none z-0" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16"
      >
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <img src="/logo/logo.png" alt="Corsprite Logo" className="h-[44px] object-contain mb-8 mix-blend-multiply" />
          <p className="text-[14px] leading-relaxed text-gray-500 font-medium max-w-sm">
            Corsprite provides an unprecedented API ecosystem for spatial mapping, AI semantic understanding, and autonomous architecture.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h4 className="text-[12px] font-bold text-gray-900 uppercase tracking-[0.2em] mb-6">Platform</h4>
          <ul className="space-y-4 text-[14px] font-medium text-gray-500">
            <li><a href="#" className="hover:text-brand transition-colors">Capabilities</a></li>
            <li><a href="#pricing" className="hover:text-brand transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-brand transition-colors">Changelog</a></li>
            <li><a href="#" className="hover:text-brand transition-colors">API Keys</a></li>
          </ul>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h4 className="text-[12px] font-bold text-gray-900 uppercase tracking-[0.2em] mb-6">Solutions</h4>
          <ul className="space-y-4 text-[14px] font-medium text-gray-500">
            <li><a href="#" className="hover:text-brand transition-colors">Real Estate</a></li>
            <li><a href="#" className="hover:text-brand transition-colors">Interior Design</a></li>
            <li><a href="#" className="hover:text-brand transition-colors">Museums</a></li>
            <li><a href="#" className="hover:text-brand transition-colors">Insurance</a></li>
          </ul>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h4 className="text-[12px] font-bold text-gray-900 uppercase tracking-[0.2em] mb-6">Newsletter</h4>
          <div className="flex flex-col gap-3">
            <p className="text-[12px] text-gray-400 font-medium mb-1">Get the latest spatial AI updates.</p>
            <div className="flex flex-col gap-2">
              <input type="email" placeholder="email@address.com" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-brand transition-all font-medium" />
              <button className="w-full px-4 py-3 bg-gray-900 text-white rounded-xl text-[13px] font-bold transition-all hover:bg-brand shadow-sm hover:shadow-md">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10"
      >
        <p className="text-[12px] text-gray-400 font-medium tracking-wide">
          © 2026 Corsprite LLC. All rights reserved. Built for the spatial era.
        </p>
        <div className="flex items-center gap-6 text-[12px] font-medium text-gray-400">
          <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Cookie Settings</a>
        </div>
      </motion.div>
    </footer>
  );
}
