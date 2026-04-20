import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Industries from '@/components/Industries';
import Demo from '@/components/Demo';
import Pricing from '@/components/Pricing';
import ApiPricing from '@/components/ApiPricing';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-brand/40 selection:text-white relative bg-white">
      <Hero />
      <Features />
      <Demo />
      <Industries />
      <Pricing />
      <ApiPricing />
      <Footer />
    </main>
  );
}
