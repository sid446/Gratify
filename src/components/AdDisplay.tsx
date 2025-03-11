
import React, { useEffect, useRef } from 'react';
import gsap from '@/lib/gsap';
import { ChevronRight, BarChart3, Target, Users } from 'lucide-react';

const AdDisplay = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const adContentRef = useRef<HTMLDivElement>(null);
  const benefitsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Heading animation
    gsap.from('.ad-title', {
      opacity: 0,
      y: 50,
      duration: 0.8,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Subheading animation
    gsap.from('.ad-subtitle', {
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

    // Screen animation
    if (screenRef.current && adContentRef.current) {
      const screenTl = gsap.timeline({
        scrollTrigger: {
          trigger: screenRef.current,
          start: 'top 70%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse',
        },
      });

      screenTl
        .from(screenRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power2.out',
        })
        .from(adContentRef.current.children, {
          opacity: 0,
          y: 20,
          stagger: 0.2,
          duration: 0.5,
          ease: 'power2.out',
        }, '-=0.4');

      // Ad content cycle animation
      const adItems = adContentRef.current.querySelectorAll('.ad-item');
      
      if (adItems.length > 0) {
        gsap.set(adItems, { opacity: 0, display: 'none' });
        gsap.set(adItems[0], { opacity: 1, display: 'block' });

        let currentIndex = 0;
        const cycleAds = () => {
          gsap.to(adItems[currentIndex], {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              gsap.set(adItems[currentIndex], { display: 'none' });
              currentIndex = (currentIndex + 1) % adItems.length;
              gsap.set(adItems[currentIndex], { display: 'block' });
              gsap.to(adItems[currentIndex], { opacity: 1, duration: 0.5 });
            },
          });
        };

        const adInterval = setInterval(cycleAds, 3000);
        
        return () => {
          clearInterval(adInterval);
        };
      }
    }

    // Benefits animation
    benefitsRefs.current.forEach((benefit, index) => {
      if (!benefit) return;
      
      gsap.from(benefit, {
        opacity: 0,
        x: index % 2 === 0 ? -20 : 20,
        duration: 0.8,
        delay: 0.1 * index,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: benefit,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => {
      gsap.killTweensOf(['.ad-title', '.ad-subtitle']);
      if (screenRef.current) gsap.killTweensOf(screenRef.current);
      if (adContentRef.current) gsap.killTweensOf(adContentRef.current.children);
      benefitsRefs.current.forEach(benefit => {
        if (!benefit) return;
        gsap.killTweensOf(benefit);
      });
    };
  }, []);

  const benefits = [
    {
      icon: <BarChart3 size={24} className="text-primary" />,
      title: 'High Visibility',
      description: 'Ads are displayed at eye level with high dwell time as users interact with the bin.',
    },
    {
      icon: <Target size={24} className="text-primary" />,
      title: 'Targeted Advertising',
      description: 'Display location-specific ads based on bin placement to reach your desired audience.',
    },
    {
      icon: <Users size={24} className="text-primary" />,
      title: 'Positive Association',
      description: 'Connect your brand with sustainability and community environmental efforts.',
    },
  ];

  return (
    <section
      id="advertising"
      ref={sectionRef}
      className="py-20 md:py-32 px-4 bg-secondary/50 relative overflow-hidden"
    >
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="ad-title text-3xl md:text-4xl font-display font-bold mb-6">
            Smart Advertising Platform
          </h2>
          <p className="ad-subtitle text-lg text-muted-foreground">
            Turn idle moments into engagement opportunities. Our smart bin features a high-definition 
            screen that displays advertisements when not in use.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          {/* Digital Display Visualization */}
          <div className="lg:w-1/2">
            <div 
              ref={screenRef}
              className="relative mx-auto w-full max-w-md aspect-[9/16] bg-black rounded-xl overflow-hidden shadow-2xl"
            >
              {/* Screen frame */}
              <div className="absolute inset-0 border-8 border-gray-800 rounded-xl z-10"></div>
              
              {/* Screen content */}
              <div 
                ref={adContentRef}
                className="absolute inset-0 bg-gradient-to-br from-primary to-accent p-6 flex flex-col items-center justify-center text-white"
              >
                {/* Ad Item 1 */}
                <div className="ad-item text-center">
                  <div className="text-2xl font-bold mb-4">Summer Sale</div>
                  <div className="text-4xl font-bold mb-6">Up to 50% OFF</div>
                  <img 
                    src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800&auto=format&fit=crop&q=60" 
                    alt="Shopping" 
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                  <div className="text-xl font-medium">Shop Now at EcoStore</div>
                </div>
                
                {/* Ad Item 2 */}
                <div className="ad-item text-center">
                  <div className="text-2xl font-bold mb-4">New Restaurant</div>
                  <div className="text-4xl font-bold mb-6">Grand Opening</div>
                  <img 
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop&q=60" 
                    alt="Restaurant" 
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                  <div className="text-xl font-medium">Visit GreenEats Today</div>
                </div>
                
                {/* Ad Item 3 */}
                <div className="ad-item text-center">
                  <div className="text-2xl font-bold mb-4">City Event</div>
                  <div className="text-4xl font-bold mb-6">Eco Festival</div>
                  <img 
                    src="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&auto=format&fit=crop&q=60" 
                    alt="Festival" 
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                  <div className="text-xl font-medium">This Weekend at City Park</div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-bold mb-8">Advertising Benefits</h3>
            
            <div className="space-y-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  ref={el => (benefitsRefs.current[index] = el)}
                  className="flex items-start"
                >
                  <div className="p-3 rounded-lg bg-primary/10 mr-4 shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <a
                href="#contact"
                className="inline-flex items-center text-primary font-medium hover:underline"
              >
                Learn more about advertising opportunities
                <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Advertisement Metrics */}
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Advertisement Performance Metrics
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">94%</div>
              <div className="text-muted-foreground">Average Ad View Rate</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">12s</div>
              <div className="text-muted-foreground">Average Attention Span</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">23%</div>
              <div className="text-muted-foreground">Engagement Increase</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdDisplay;
