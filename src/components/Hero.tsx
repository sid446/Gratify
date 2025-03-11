
import React, { useEffect, useRef } from 'react';
import gsap from '@/lib/gsap';
import { ArrowDown } from 'lucide-react';
import BouncingOrbs from './BouncingOrd';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const binRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Main timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    const elements = document.querySelectorAll(".parallax-bg");

   

    // Initial load animation
    tl.from(binRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.2,
    })
      .from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
      }, "-=0.8")
      .from(paragraphRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
      }, "-=0.6")
      .from(ctaRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
      }, "-=0.4")
      .from(scrollIndicatorRef.current, {
        y: 10,
        opacity: 0,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
      }, "-=0.2");

    // Parallax effect on scroll
    gsap.to(".parallax-bg", {
      y: (i, el) => -parseFloat(el.getAttribute("data-speed") || "0") * 100,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Bin floating animation
    gsap.to(binRef.current, {
      y: 15,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    return () => {
      gsap.killTweensOf([
        binRef.current,
        headingRef.current,
        paragraphRef.current,
        ctaRef.current,
        scrollIndicatorRef.current,
        ".parallax-bg"
      ]);
    };
  }, []);

  return (
    <div 
      ref={heroRef} 
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden"
      style={{ paddingTop: '80px' }}
    >
      {/* Background Elements */}
      <BouncingOrbs />
      
      {/* Parallax Background */}
      

      {/* Hero Content */}
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between z-10 pt-10">
        <div className="md:w-1/2 md:pr-10 text-center md:text-left mt-10 md:mt-0">
          <h1 
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight"
          >
            Transform Waste into <span className="text-primary">Rewards</span>
          </h1>
          
          <p 
            ref={paragraphRef}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0"
          >
            The smart bin that rewards sustainability. Dispose waste properly and 
            earn coupons while our display shows engaging content.
          </p>
          
          <div 
            ref={ctaRef}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start"
          >
            <a 
              href="#how-it-works" 
              className="px-8 py-3 bg-primary text-primary-foreground rounded-full hover:shadow-lg transition-all transform hover:-translate-y-1 hover:bg-opacity-90 inline-flex items-center"
            >
              See How It Works
            </a>
            <a 
              href="#contact" 
              className="px-8 py-3 border border-primary text-primary rounded-full hover:bg-primary/5 transition-all transform hover:-translate-y-1 inline-flex items-center"
            >
              Contact Sales
            </a>
          </div>
        </div>
        
        <div 
          ref={binRef}
          className="md:w-1/2 flex justify-center items-center"
        >
          <div className="relative w-64 h-80 md:w-80 md:h-96">
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-48 h-72 md:w-60 md:h-80 bg-gradient-to-b from-primary/90 to-primary rounded-lg rounded-b-2xl">
                {/* Interactive screen simulation */}
                <div className="w-full h-24 bg-white/90 mt-4 mx-auto rounded-t-md overflow-hidden">
                  <div className="h-full w-full flex items-center justify-center text-sm text-center p-2">
                    <span className="animate-pulse-soft">Throw waste to receive rewards!</span>
                  </div>
                </div>
                
                {/* Bin opening */}
                <div className="w-12 h-2 bg-gray-800 mx-auto mt-4 rounded-full"></div>
                
                {/* Bin body details */}
                <div className="mt-4 w-full px-4">
                  <div className="h-1 bg-primary-foreground/20 rounded-full mb-3"></div>
                  <div className="h-1 bg-primary-foreground/20 rounded-full mb-3"></div>
                  <div className="h-1 bg-primary-foreground/20 rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* Shadow */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-10 bg-black/10 rounded-full filter blur-md"></div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-muted-foreground flex flex-col items-center cursor-pointer"
        onClick={() => {
          document.getElementById('features')?.scrollIntoView({
            behavior: 'smooth'
          });
        }}
      >
        <span className="text-sm mb-2">Scroll to explore</span>
        <ArrowDown size={20} className="animate-bounce" />
      </div>
    </div>
  );
};

export default Hero;
