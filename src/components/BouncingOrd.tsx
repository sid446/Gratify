import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Bounce } from "gsap/all";

gsap.registerPlugin(Bounce);

interface Orb {
  id: number;
  element: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;
}

// Single light blue color for all orbs
const LIGHT_BLUE = { hue: 200, saturation: 67, lightness: 80, alpha: 1 };


const BouncingOrbs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<Orb[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const numOrbs = 12;
    let orbs: Orb[] = [];
    let width = window.innerWidth;
    let height = window.innerHeight;

    const createOrbs = () => {
      if (container.children.length > 0) {
        container.innerHTML = '';
      }
      orbs = [];

      for (let i = 0; i < numOrbs; i++) {
        const size = Math.random() * 120 + 40;
        const { hue, saturation, lightness, alpha } = LIGHT_BLUE;

        const orbElement = document.createElement('div');
        orbElement.className = 'orb absolute rounded-full shadow-md';
        orbElement.style.background = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
        orbElement.style.width = `${size}px`;
        orbElement.style.height = `${size}px`;
        orbElement.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        orbElement.style.boxShadow = `0 4px 8px hsla(${hue}, ${saturation - 10}%, ${lightness - 10}%, 0.3)`;

        // Spread orbs across the entire screen with varied velocities
        const initialX = Math.random() * width;
        const initialY = Math.random() * height;
        
        // Increase initial velocity range for more movement
        const initialVx = (Math.random() - 0.5) * 4;
        const initialVy = (Math.random() - 0.5) * 4;

        orbElement.style.transform = `translate(${initialX}px, ${initialY}px)`;
        container.appendChild(orbElement);

        orbs.push({
          id: i,
          element: orbElement,
          x: initialX,
          y: initialY,
          vx: initialVx,
          vy: initialVy,
          radius: size / 2,
          color: `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`,
          hue,
          saturation,
          lightness,
          alpha
        });
      }

      orbsRef.current = orbs;
    };

    const updateOrb = (orb: Orb) => {
      orb.x += orb.vx;
      orb.y += orb.vy;

      // Bounce off walls with reduced friction
      if (orb.x <= 0 || orb.x + orb.radius * 2 >= width) {
        orb.vx *= -1;
        orb.vx *= 0.99; // Less friction on horizontal collisions
        gsap.to(orb.element, {
          scale: 1.1,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: Bounce.easeOut
        });
        
        // Add small random vertical velocity to prevent horizontal patterns
        orb.vy += (Math.random() - 0.5) * 1.0;
      }

      if (orb.y <= 0 || orb.y + orb.radius * 2 >= height) {
        orb.vy *= -1;
        orb.vy *= 0.99; // Less friction on vertical collisions
        gsap.to(orb.element, {
          scale: 1.1,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: Bounce.easeOut
        });
        
        // Add small random horizontal velocity to break patterns
        orb.vx += (Math.random() - 0.5) * 1.0;
      }

      // Reduced friction and gravity to prevent clustering at bottom
      orb.vx *= 0.999; // Almost no horizontal friction
      orb.vy *= 0.999; // Almost no vertical friction
      
      // Very minimal gravity or none to prevent bottom clustering
      orb.vy += 0.005; // Minimal gravity
      
      // Ensure minimum velocity to keep orbs moving
      const minVelocity = 1.0;
      const currentVelocity = Math.sqrt(orb.vx * orb.vx + orb.vy * orb.vy);
      
      if (currentVelocity < minVelocity) {
        // Boost velocity in random direction if too slow
        const angle = Math.random() * Math.PI * 2;
        orb.vx = Math.cos(angle) * minVelocity;
        orb.vy = Math.sin(angle) * minVelocity;
      }
      
      orb.element.style.transform = `translate(${orb.x}px, ${orb.y}px)`;
    };

    const checkCollision = (orb1: Orb, orb2: Orb) => {
      const dx = orb2.x - orb1.x;
      const dy = orb2.y - orb1.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const minDistance = orb1.radius + orb2.radius;

      if (distance < minDistance) {
        const angle = Math.atan2(dy, dx);
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);

        const vx1 = orb1.vx * cos + orb1.vy * sin;
        const vy1 = orb1.vy * cos - orb1.vx * sin;
        const vx2 = orb2.vx * cos + orb2.vy * sin;
        const vy2 = orb2.vy * cos - orb2.vx * sin;

        const m1 = orb1.radius * orb1.radius;
        const m2 = orb2.radius * orb2.radius;
        const u1 = ((m1 - m2) * vx1 + 2 * m2 * vx2) / (m1 + m2);
        const u2 = ((m2 - m1) * vx2 + 2 * m1 * vx1) / (m1 + m2);

        orb1.vx = u1 * cos - vy1 * sin;
        orb1.vy = vy1 * cos + u1 * sin;
        orb2.vx = u2 * cos - vy2 * sin;
        orb2.vy = vy2 * cos + u2 * sin;

        const overlap = minDistance - distance;
        const separationX = overlap * cos / 2;
        const separationY = overlap * sin / 2;

        orb1.x -= separationX;
        orb1.y -= separationY;
        orb2.x += separationX;
        orb2.y += separationY;

        // Simple scale animation for collision
        gsap.to([orb1.element, orb2.element], {
          scale: 1.2,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: Bounce.easeOut
        });
      }
    };

    const animate = () => {
      orbsRef.current.forEach(orb => {
        updateOrb(orb);
      });

      for (let i = 0; i < orbsRef.current.length; i++) {
        for (let j = i + 1; j < orbsRef.current.length; j++) {
          checkCollision(orbsRef.current[i], orbsRef.current[j]);
        }
      }

      // Every so often, randomly boost an orb to keep things moving
      if (Math.random() < 0.01) {
        const randomOrbIndex = Math.floor(Math.random() * orbsRef.current.length);
        const randomOrb = orbsRef.current[randomOrbIndex];
        const angle = Math.random() * Math.PI * 2;
        const boost = 2 + Math.random() * 2;
        
        randomOrb.vx += Math.cos(angle) * boost;
        randomOrb.vy += Math.sin(angle) * boost;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      orbsRef.current.forEach(orb => {
        if (orb.x < 0) orb.x = 0;
        if (orb.y < 0) orb.y = 0;
        if (orb.x + orb.radius * 2 > width) orb.x = width - orb.radius * 2;
        if (orb.y + orb.radius * 2 > height) orb.y = height - orb.radius * 2;
      });
    };

    createOrbs();
    animate();
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full overflow-hidden z-0"
      aria-hidden="true"
    />
  );
};

export default BouncingOrbs;
