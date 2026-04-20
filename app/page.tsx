"use client";

import { useState } from 'react';
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

  setTimeout(() => {
    setIsReleaseOpen(true);
  }, 6000);

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
