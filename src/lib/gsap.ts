
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

// Utility function to check if we're running in a browser
const isBrowser = typeof window !== 'undefined';

// Hook for running GSAP animations on component mount
export const useGSAPAnimation = (animation) => {
  const elementRef = React.useRef(null);

  React.useEffect(() => {
    if (!elementRef.current) return;

    const timeline = animation(elementRef.current);

    return () => {
      if (timeline) timeline.kill();
    };
  }, [animation]);

  return elementRef;
};

// Hook for scroll-triggered animations
export const useScrollAnimation = (animation) => {
  const elementRef = React.useRef(null);

  React.useEffect(() => {
    if (!elementRef.current) return;

    const timeline = animation(elementRef.current);
    
    return () => {
      if (timeline) timeline.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animation]);

  return elementRef;
};

// Setup scroll progress indicator - CONVERTED TO COMPONENT HOOK
export const useScrollIndicator = () => {
  React.useEffect(() => {
    if (!isBrowser) return;

    // Create scroll indicator element if it doesn't exist
    let indicator = document.querySelector('.scroll-indicator');
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.classList.add('scroll-indicator');
      document.body.appendChild(indicator);
    }

    // Set up the scroll animation
    gsap.to(indicator, {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};

// Staggered reveal animation for child elements - CONVERTED TO COMPONENT HOOK
export const useStaggerReveal = (
  parentSelector, 
  childSelector, 
  options = { delay: 0.2, duration: 0.8, stagger: 0.1 }
) => {
  React.useEffect(() => {
    if (!isBrowser) return;

    const parents = document.querySelectorAll(parentSelector);
    
    parents.forEach(parent => {
      const children = parent.querySelectorAll(childSelector);
      
      gsap.set(children, { opacity: 0, y: 20 });
      
      ScrollTrigger.create({
        trigger: parent,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(children, {
            opacity: 1,
            y: 0,
            duration: options.duration,
            stagger: options.stagger,
            delay: options.delay,
            ease: 'power2.out',
          });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [parentSelector, childSelector, options.delay, options.duration, options.stagger]);
};

// Text animation with typing effect
export const textRevealAnimation = (
  element,
  text,
  options = { duration: 2, delay: 0.5 }
) => {
  return gsap.to(element, {
    duration: options.duration,
    text: {
      value: text,
    },
    ease: 'none',
    delay: options.delay,
  });
};

// Mouse follow animation - CONVERTED TO COMPONENT HOOK
export const useMouseFollow = () => {
  React.useEffect(() => {
    if (!isBrowser) return;

    // Create mouse follower element if it doesn't exist
    let follower = document.querySelector('.mouse-follow');
    if (!follower) {
      follower = document.createElement('div');
      follower.classList.add('mouse-follow');
      follower.style.backgroundColor = 'hsl(var(--primary))';
      document.body.appendChild(follower);
    }

    // Set initial position off-screen
    gsap.set(follower, { x: -100, y: -100 });

    // Mouse move handler
    const onMouseMove = (e) => {
      gsap.to(follower, {
        duration: 0.5,
        x: e.clientX,
        y: e.clientY,
        ease: 'power3.out',
      });
    };

    // Hover effect change size handler
    const handleMouseEnter = () => {
      gsap.to(follower, {
        duration: 0.3,
        width: 80,
        height: 80,
        backgroundColor: 'hsl(var(--accent))',
        ease: 'power1.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(follower, {
        duration: 0.3,
        width: 40,
        height: 40,
        backgroundColor: 'hsl(var(--primary))',
        ease: 'power1.out',
      });
    };

    // Add event listeners
    document.addEventListener('mousemove', onMouseMove);
    
    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);
};

// Parallax scroll effect - CONVERTED TO COMPONENT HOOK
export const useParallaxScroll = (selector, speed = 0.5) => {
  React.useEffect(() => {
    if (!isBrowser) return;

    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
      gsap.to(element, {
        y: `${speed * 100}%`,
        ease: 'none',
        scrollTrigger: {
          trigger: element.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [selector, speed]);
};

// Add missing import
import React from 'react';

export default gsap;
