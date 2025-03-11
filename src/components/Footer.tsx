
import React, { useEffect, useRef } from 'react';
import gsap from '@/lib/gsap';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    // Form animation
    gsap.from('.contact-form', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.contact-form',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Contact info animation
    gsap.from('.contact-info', {
      opacity: 0,
      x: -30,
      duration: 0.8,
      delay: 0.2,
      scrollTrigger: {
        trigger: '.contact-info',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Footer bottom animation
    gsap.from('.footer-bottom', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.footer-bottom',
        start: 'top 95%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      gsap.killTweensOf(['.contact-form', '.contact-info', '.footer-bottom']);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would be where you handle the form submission
    alert('Thanks for your message! We will get back to you soon.');

    // Animation on successful submit
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { y: 0, opacity: 1 },
        {
          y: -10,
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            // Reset form
            formRef.current?.reset();
            
            // Animate form back in
            gsap.to(formRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.3,
              delay: 0.1,
            });
          },
        }
      );
    }
  };

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="bg-white pt-20 pb-8 px-4 relative"
    >
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground">
            Interested in our smart bin solution? Contact us to learn more about 
            how we can bring sustainable waste management to your community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="bg-secondary/30 p-8 rounded-xl contact-form">
            <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
            
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your Name"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  required
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="" disabled selected>Select an option</option>
                  <option value="business">Business Inquiry</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="advertising">Advertising Interest</option>
                  <option value="support">Technical Support</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-white rounded-md hover:bg-opacity-90 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="contact-info flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-3 rounded-lg bg-primary/10 mr-4">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Our Location</h4>
                    <p className="text-muted-foreground">
                      123 Innovation Street, Tech City, 10001
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 rounded-lg bg-primary/10 mr-4">
                    <Mail size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email Us</h4>
                    <p className="text-muted-foreground">
                      contact@smartbin.example.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 rounded-lg bg-primary/10 mr-4">
                    <Phone size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Call Us</h4>
                    <p className="text-muted-foreground">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Business Hours */}
            <div className="mt-8 md:mt-0">
              <h3 className="text-xl font-bold mb-4">Business Hours</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook size={20} className="text-primary" />
                  </a>
                  <a 
                    href="#" 
                    className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter size={20} className="text-primary" />
                  </a>
                  <a 
                    href="#" 
                    className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} className="text-primary" />
                  </a>
                  <a 
                    href="#" 
                    className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} className="text-primary" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <a href="#" className="text-xl font-display font-bold text-foreground">
                SmartBin<span className="text-primary">.</span>
              </a>
            </div>
            
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} SmartBin. All rights reserved.
            </div>
            
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
