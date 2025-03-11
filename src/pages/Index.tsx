
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Rewards from '@/components/Rewards';
import AdDisplay from '@/components/AdDisplay';
import Footer from '@/components/Footer';
import { useScrollIndicator, useMouseFollow, useStaggerReveal, useParallaxScroll } from '@/lib/gsap';

const Index = () => {
  // Use our custom hooks
  useScrollIndicator();
  useMouseFollow();
  
  React.useEffect(() => {
    // Setup staggered reveal animations
    // Use our custom hook directly in the component
    document.title = 'Gratify - Transform Waste into Rewards';
  }, []);
  
  // Use the custom stagger reveal hook
  useStaggerReveal('.stagger-children', 'div, h3, p, a');
  
  // Use the custom parallax scroll hook
  useParallaxScroll('.parallax-item', 0.1);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Rewards />
        <AdDisplay />
      </main>
      <Footer />
      
      {/* Scroll to top button - will be animated with GSAP */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-white shadow-lg opacity-0 invisible transition-all"
        id="scroll-to-top"
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>
    </div>
  );
};

export default Index;
