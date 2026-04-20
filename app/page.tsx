import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Industries from '@/components/Industries';
import Demo from '@/components/Demo';
import Pricing from '@/components/Pricing';
import ApiPricing from '@/components/ApiPricing';
import Uptime from '@/components/Uptime';
import Footer from '@/components/Footer';
import PromoPopup from '@/components/PromoPopup';

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-brand/40 selection:text-white relative bg-white">
      <Hero />
      <Features />
      <Demo />
      <Industries />
      <Pricing />
      <ApiPricing />
      <Uptime />
      <Footer />
      <PromoPopup />
    </main>
  );
}
