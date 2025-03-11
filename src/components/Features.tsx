import React, { useEffect, useRef } from 'react';
import gsap from '@/lib/gsap';
import { Award, Recycle, DollarSign, MonitorSmartphone, Users, Lock } from 'lucide-react';

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Initial animation for the heading
    gsap.from('.features-title', {
      opacity: 0,
      y: 50,
      duration: 0.8,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Initial animation for the subheading
    gsap.from('.features-subtitle', {
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

    // Animation for each feature card
    featureRefs.current.forEach((feature, index) => {
      if (!feature) return;
      
      gsap.from(feature, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.1 * index,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: feature,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    // Icon pulse animation
    gsap.to('.feature-icon', {
      scale: 1.1,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.2,
    });

    return () => {
      gsap.killTweensOf(['.features-title', '.features-subtitle', '.feature-icon']);
      gsap.killTweensOf(featureRefs.current);
    };
  }, []);

  const features = [
    {
      icon: <Recycle size={32} className="text-primary" />,
      title: 'Smart Waste Management',
      description: 'Advanced sensors detect and categorize waste, ensuring proper recycling procedures.',
    },
    {
      icon: <Award size={32} className="text-primary" />,
      title: 'Reward System',
      description: 'Earn digital coupons and points each time you dispose of waste properly.',
    },
    {
      icon: <DollarSign size={32} className="text-primary" />,
      title: 'Cost Efficiency',
      description: 'Reduces waste management costs while creating new revenue streams through advertising.',
    },
    {
      icon: <MonitorSmartphone size={32} className="text-primary" />,
      title: 'Digital Display',
      description: 'High-definition screen shows ads, promotions, and information when not in use.',
    },
    {
      icon: <Users size={32} className="text-primary" />,
      title: 'Community Engagement',
      description: 'Gamifies recycling, encouraging community participation and environmental awareness.',
    },
    {
      icon: <Lock size={32} className="text-primary" />,
      title: 'Secure Transactions',
      description: "All reward coupons are securely delivered to users' phones with verification.",
    },
  ];

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-20 md:py-32 px-4 relative overflow-hidden bg-secondary/50"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="features-title text-3xl md:text-4xl font-display font-bold mb-6">
            Features That Set Us Apart
          </h2>
          <p className="features-subtitle text-lg text-muted-foreground">
            Our smart bin is more than just a trash receptacle. It's a complete ecosystem 
            designed to promote sustainability while offering value to users and businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => (featureRefs.current[index] = el)}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="feature-icon mb-6 p-3 inline-block bg-primary/10 rounded-lg">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
