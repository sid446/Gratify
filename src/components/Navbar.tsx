
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import gsap from '@/lib/gsap';
import { Menu, X } from 'lucide-react';
import { SplitButton } from './ui/SplitButton';
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Initial animation
    gsap.from('.nav-item', {
      opacity: 0,
      y: -20,
      stagger: 0.1,
      duration: 0.8,
      delay: 0.5,
      ease: 'power3.out',
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      // Animate mobile menu open
      gsap.to('.mobile-menu', {
        height: 'auto',
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
      
      gsap.from('.mobile-nav-item', {
        opacity: 0,
        x: -20,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.2,
        ease: 'power2.out',
      });
    } else {
      // Animate mobile menu close
      gsap.to('.mobile-menu', {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, [mobileMenuOpen]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10',
        isScrolled
          ? 'bg-white bg-opacity-70 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <a href="#" className="text-2xl font-display font-bold text-foreground">
            Gratify<span className="text-primary">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <SplitButton href="#features"  leftIcon="" rightText="Features" width='7rem'/>
            <SplitButton href="#how-it-works" leftIcon="" rightText="How it works" width='10rem'/>
            <SplitButton href="#rewards" leftIcon="" rightText="Rewards" width='7rem'/>
            <SplitButton href="#advertising" leftIcon="" rightText="Advertizing" width='9rem'/>
            <SplitButton href="#contact" leftIcon="" rightText="Contact us" width='9rem'/>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="mobile-menu md:hidden overflow-hidden h-0 opacity-0">
          <div className="flex flex-col space-y-4 pt-4 pb-6">
            <a href="#features" className="mobile-nav-item text-foreground hover:text-primary transition-colors py-2">
              Features
            </a>
            <a href="#how-it-works" className="mobile-nav-item text-foreground hover:text-primary transition-colors py-2">
              How It Works
            </a>
            <a href="#rewards" className="mobile-nav-item text-foreground hover:text-primary transition-colors py-2">
              Rewards
            </a>
            <a href="#advertising" className="mobile-nav-item text-foreground hover:text-primary transition-colors py-2">
              Advertising
            </a>
            <a
              href="#contact"
              className="mobile-nav-item inline-block px-6 py-2 rounded-full bg-primary text-white hover:bg-opacity-90 transition-all hover:shadow-lg"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
