"use client";

import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Industries from '@/components/Industries';
import Demo from '@/components/Demo';
import Pricing from '@/components/Pricing';
import ApiPricing from '@/components/ApiPricing';
import Footer from '@/components/Footer';
import ReleaseModal from '@/components/ReleaseModal';

export default function Home() {
  const [isReleaseOpen, setIsReleaseOpen] = useState(false);

  useEffect(() => {
    const hasSeenRelease = document.cookie.split('; ').find(row => row.startsWith('corsprite_release_shown='));
    
    if (!hasSeenRelease) {
      const timer = setTimeout(() => {
        setIsReleaseOpen(true);
        // Set cookie to expire in 30 days
        document.cookie = "corsprite_release_shown=true; max-age=" + 60 * 60 * 24 * 30 + "; path=/";
      }, 6000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <main className="min-h-screen selection:bg-brand/40 selection:text-white relative bg-white">
      <Hero />
      <Features />
      <Demo />
      <Industries />
      <Pricing />
      <ApiPricing />
      <Footer />
      <ReleaseModal isOpen={isReleaseOpen} onClose={() => setIsReleaseOpen(false)} />
    </main>
  );
}
