import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

interface SplitButtonProps {
  leftIcon?: React.ReactNode;
  rightText: string;
  href?: string;
  width?: string;
  color?: string;
  className?: string;
  onClick?: () => void;
}

const SplitButton = ({ 
  leftIcon, 
  rightText, 
  href, 
  width = '8rem',
  color = '#0EA5E9',
  className,
  onClick
}: SplitButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);
  
  // Track mouse position for the highlight effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  return (
    <div className={cn("inline-block", className)}>
      <motion.div
        className="relative cursor-pointer"
        style={{ width, height: "2.4rem" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        ref={buttonRef}
        onClick={onClick}
        whileTap={{ scale: 0.98 }}
      >
        {/* Glow effect */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              className="absolute -inset-0.5 rounded-full blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ backgroundColor: color, zIndex: -1 }}
            />
          )}
        </AnimatePresence>

        {/* Button container */}
        <div className="relative h-full w-full rounded-full overflow-hidden shadow-md">
          {/* Glass background */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-full border border-white/10" />

          {/* Initial full button */}
          <motion.div
            className="absolute inset-0 rounded-full flex items-center justify-center"
            style={{ backgroundColor: color }}
            initial={{ opacity: 1 }}
            animate={{
              opacity: isHovered ? 0 : 1,
              scale: isHovered ? 0.95 : 1
            }}
            transition={{ 
              opacity: { duration: isHovered ? 0.5 : 0.2, ease: "easeOut" },
              scale: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
            }}
          >
            <motion.div 
              className="text-white text-sm font-medium flex items-center justify-center space-x-1 px-4"
              animate={{ y: isHovered ? -30 : 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>{rightText}</span>
            </motion.div>
            
            {/* Subtle shimmer effect */}
            <motion.div
              className="absolute inset-0 split-button-shimmer opacity-0"
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear"
              }}
            />
          </motion.div>
          
          {/* Split button elements */}
          <div className="absolute inset-0 flex items-center">
            {/* Left circle button */}
            <motion.div
              className="absolute rounded-full flex items-center justify-center shadow-split-inner overflow-hidden"
              initial={{ width: '0%', left: '50%', opacity: 0 }}
              animate={{
                width: isHovered ? '2.4rem' : '0%',
                left: isHovered ? '0' : '50%',
                opacity: isHovered ? 1 : 0
              }}
              style={{ 
                height: '100%',
                aspectRatio: '1 / 1',
                backgroundColor: color
              }}
              transition={{ 
                width: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
                left: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
                opacity: { 
                  duration: isHovered ? 0.3 : 0.15, 
                  delay: isHovered ? 0.1 : 0,
                  ease: "easeOut"
                }
              }}
            >
              <motion.div 
                className="text-white flex items-center justify-center w-full h-full"
                initial={{ scale: 0.7, rotate: -90 }}
                animate={{ 
                  scale: isHovered ? 1 : 0.7,
                  rotate: isHovered ? 0 : -90
                }}
                transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              >
                {leftIcon || (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </motion.div>
            </motion.div>
            
            {/* Right pill button */}
            <motion.div
              className="absolute rounded-full flex items-center overflow-hidden shadow-split-inner"
              initial={{ left: '50%', right: '50%', opacity: 0 }}
              animate={{
                left: isHovered ? '2.2rem' : '50%',
                right: isHovered ? '0' : '50%',
                opacity: isHovered ? 1 : 0
              }}
              style={{ 
                height: '100%',
                backgroundColor: color
              }}
              transition={{ 
                left: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
                right: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
                opacity: { 
                  duration: isHovered ? 0.3 : 0.15, 
                  delay: isHovered ? 0.1 : 0,
                  ease: "easeOut"
                }
              }}
            >
              <motion.div 
                className="text-white text-sm font-medium h-full flex items-center justify-center px-4"
                initial={{ y: 30 }}
                animate={{ y: isHovered ? 0 : 30 }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.22, 1, 0.36, 1],
                  delay: isHovered ? 0.1 : 0
                }}
              >
                {rightText}
              </motion.div>
              
              {/* Mouse follower highlight */}
              <motion.div
                className="absolute w-16 h-16 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
                  left: mousePosition.x - 32,
                  top: mousePosition.y - 32,
                  opacity: isHovered ? 1 : 0
                }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const WrappedSplitButton = (props: SplitButtonProps) => {
  if (props.href) {
    return (
      <a href={props.href} className="inline-block">
        <SplitButton {...props} />
      </a>
    );
  }
  
  return <SplitButton {...props} />;
};

export { WrappedSplitButton as SplitButton };
