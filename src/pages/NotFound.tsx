
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import gsap from '@/lib/gsap';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Animate elements
    gsap.from('.error-title', {
      opacity: 0,
      y: -50,
      duration: 0.8,
      ease: 'power3.out',
    });

    gsap.from('.error-message', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out',
    });

    gsap.from('.home-link', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.4,
      ease: 'power3.out',
    });

    // Update document title
    document.title = 'Page Not Found | SmartBin';

  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
      <div className="text-center">
        <h1 className="error-title text-8xl font-display font-bold mb-6 text-primary">404</h1>
        <p className="error-message text-xl text-muted-foreground mb-8">
          Oops! We couldn't find the page you're looking for.
        </p>
        <a 
          href="/" 
          className="home-link inline-block px-8 py-3 bg-primary text-white rounded-full hover:bg-opacity-90 transition-all transform hover:-translate-y-1 hover:shadow-lg"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
