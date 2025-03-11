
import React, { useEffect, useRef } from 'react';
import gsap from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !timelineRef.current) return;
    
    // Heading animation
    gsap.from('.how-title', {
      opacity: 0,
      y: 50,
      duration: 0.8,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
    
    // Subtitle animation
    gsap.from('.how-subtitle', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Timeline animation
    const timeline = timelineRef.current;
    gsap.from(timeline, {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: timeline,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 0.5,
      },
    });

    // Step-by-step animation
    stepsRef.current.forEach((step, index) => {
      if (!step) return;
      
      const image = step.querySelector('.step-image');
      const content = step.querySelector('.step-content');
      const number = step.querySelector('.step-number');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: step,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
      
      // Timeline animation
      tl.from(number, {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
      })
      .from(content, {
        opacity: 0,
        x: index % 2 === 0 ? -30 : 30,
        duration: 0.6,
        ease: 'power2.out',
      }, "-=0.3")
      .from(image, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out',
      }, "-=0.3");
    });

    return () => {
      gsap.killTweensOf(['.how-title', '.how-subtitle', timelineRef.current]);
      stepsRef.current.forEach(step => {
        if (!step) return;
        gsap.killTweensOf(step.querySelectorAll('.step-image, .step-content, .step-number'));
      });
    };
  }, []);

  const steps = [
    {
      title: "Approach the Smart Bin",
      description: "Walk up to any SmartBin station in your area. Our bins feature a sleek design with an interactive digital display that guides you through the process.",
      image: "https://images.unsplash.com/photo-1605248587616-98432f3e29bf?w=800&auto=format&fit=crop&q=60",
    },
    {
      title: "Dispose Your Waste",
      description: "Open the bin by waving your hand over the sensor and dispose of your waste. Our AI-powered system automatically categorizes your waste for proper recycling.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=60",
    },
    {
      title: "Scan for Rewards",
      description: "After disposal, the display will prompt you to scan a QR code with your smartphone to claim your reward. First-time users will be directed to download our app.",
      image: "https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=800&auto=format&fit=crop&q=60",
    },
    {
      title: "Receive Digital Coupon",
      description: "A digital coupon or reward points are instantly transferred to your account. These can be redeemed at participating local businesses or converted to eco-rewards.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&auto=format&fit=crop&q=60",
    },
  ];

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-20 md:py-32 px-4 bg-white relative"
    >
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="how-title text-3xl md:text-4xl font-display font-bold mb-6">
            How SmartBin Works
          </h2>
          <p className="how-subtitle text-lg text-muted-foreground">
            Experience a seamless waste disposal process that rewards you every step of the way.
            It's as simple as these four steps.
          </p>
        </div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div 
            ref={timelineRef}
            className="absolute left-[50%] transform -translate-x-1/2 w-1 bg-primary h-full z-0 hidden md:block"
          ></div>

          {/* Steps */}
          <div className="relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={el => (stepsRef.current[index] = el)}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center gap-8 mb-20 last:mb-0`}
              >
                <div className="md:w-1/2 relative">
                  <div className="step-image overflow-hidden rounded-lg shadow-md">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="md:w-1/2 step-content">
                  <div className="bg-white p-6 rounded-lg shadow-sm relative">
                    <div className="step-number absolute top-0 left-1/2 md:left-auto transform -translate-x-1/2 md:translate-x-0 -translate-y-1/2 bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl z-10">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 pt-4">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
