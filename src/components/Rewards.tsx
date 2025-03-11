
import React, { useEffect, useRef } from 'react';
import gsap from '@/lib/gsap';
import { Coffee, ShoppingBag, Ticket, Utensils, Bus, Leaf } from 'lucide-react';

const Rewards = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rewardsContainerRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<(HTMLDivElement | null)[]>([]);
  const couponRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Heading animation
    gsap.from('.rewards-title', {
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
    gsap.from('.rewards-subtitle', {
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

    // Counter animations
    countersRef.current.forEach((counter, index) => {
      if (!counter) return;
      
      const endValue = parseInt(counter.getAttribute('data-value') || '0', 10);
      const counterText = counter.querySelector('.counter-value');
      
      if (!counterText) return;
      
      gsap.from(counterText, {
        textContent: 0,
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        delay: 0.2 * index,
        scrollTrigger: {
          trigger: counter,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        onUpdate: function() {
          // @ts-ignore - gsap assigns this property
          counterText.textContent = Math.floor(this.targets()[0].textContent).toLocaleString();
        },
      });
    });

    // Coupon animations
    couponRefs.current.forEach((coupon, index) => {
      if (!coupon) return;
      
      // Staggered fade in
      gsap.from(coupon, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.1 * index,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: rewardsContainerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
      
      // Hover animation setup
      const createHoverAnimation = (element: HTMLDivElement) => {
        const hoverInTimeline = gsap.timeline({ paused: true });
        
        hoverInTimeline.to(element, {
          scale: 1.05,
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          duration: 0.3,
          ease: 'power2.out',
        });

        element.addEventListener('mouseenter', () => hoverInTimeline.play());
        element.addEventListener('mouseleave', () => hoverInTimeline.reverse());
      };
      
      createHoverAnimation(coupon);
    });

    return () => {
      gsap.killTweensOf(['.rewards-title', '.rewards-subtitle']);
      countersRef.current.forEach(counter => {
        if (!counter) return;
        gsap.killTweensOf(counter.querySelector('.counter-value'));
      });
      couponRefs.current.forEach(coupon => {
        if (!coupon) return;
        gsap.killTweensOf(coupon);
      });
    };
  }, []);

  const stats = [
    { value: 5000, label: 'Rewards Given', class: 'bg-primary/10 text-primary' },
    { value: 350, label: 'Partner Businesses', class: 'bg-accent/10 text-accent' },
    { value: 12000, label: 'Waste Properly Disposed', class: 'bg-green-500/10 text-green-500' },
  ];

  const coupons = [
    {
      icon: <Coffee size={24} />,
      title: 'Free Coffee',
      description: 'Enjoy a complimentary coffee at participating cafés',
      discount: '100% OFF',
      brand: 'Local Cafés',
    },
    {
      icon: <ShoppingBag size={24} />,
      title: 'Shopping Discount',
      description: 'Get a discount on your next purchase',
      discount: '15% OFF',
      brand: 'Eco-Friendly Stores',
    },
    {
      icon: <Utensils size={24} />,
      title: 'Restaurant Offer',
      description: 'Save on your meal at local restaurants',
      discount: '20% OFF',
      brand: 'Sustainable Eateries',
    },
    {
      icon: <Ticket size={24} />,
      title: 'Movie Tickets',
      description: 'Discount on movie tickets at local theaters',
      discount: '10% OFF',
      brand: 'Cinema Partners',
    },
    {
      icon: <Bus size={24} />,
      title: 'Public Transport',
      description: 'Free rides on public transportation',
      discount: 'Free Ride',
      brand: 'City Transit',
    },
    {
      icon: <Leaf size={24} />,
      title: 'Plant a Tree',
      description: "We'll plant a tree on your behalf",
      discount: 'Eco-Reward',
      brand: 'Green Initiative',
    },
  ];

  return (
    <section
      id="rewards"
      ref={sectionRef}
      className="py-20 md:py-32 px-4 bg-gradient-to-b from-white to-secondary/30 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-accent/5 blur-3xl"></div>
      
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="rewards-title text-3xl md:text-4xl font-display font-bold mb-6">
            Rewards That Matter
          </h2>
          <p className="rewards-subtitle text-lg text-muted-foreground">
            Our reward system is designed to provide meaningful incentives for sustainable behavior.
            Partner with local businesses to offer rewards that users actually want.
          </p>
        </div>

        {/* Stats Counter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={el => (countersRef.current[index] = el)}
              data-value={stat.value}
              className={`rounded-lg ${stat.class} p-8 text-center`}
            >
              <div className="counter-value text-4xl font-bold mb-2">0</div>
              <div className="text-lg font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Reward Coupons */}
        <div ref={rewardsContainerRef} className="mb-12">
          <h3 className="text-2xl font-bold mb-8 text-center">Sample Reward Coupons</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coupons.map((coupon, index) => (
              <div
                key={index}
                ref={el => (couponRefs.current[index] = el)}
                className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      {coupon.icon}
                    </div>
                    <span className="font-bold text-lg text-primary">{coupon.discount}</span>
                  </div>
                  
                  <h4 className="text-lg font-semibold mb-2">{coupon.title}</h4>
                  <p className="text-muted-foreground text-sm mb-4">{coupon.description}</p>
                  
                  <div className="border-t pt-4 flex justify-between items-center">
                    <span className="text-xs font-medium">{coupon.brand}</span>
                    <span className="text-xs text-muted-foreground">Valid for 30 days</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-lg mb-6">
            Become a partner and list your business in our reward program
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-primary text-white rounded-full hover:bg-opacity-90 transition-all transform hover:-translate-y-1 hover:shadow-lg"
          >
            Partner With Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default Rewards;
