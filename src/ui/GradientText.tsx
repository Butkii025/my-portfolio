'use client';

import React, { ReactNode } from 'react';
import { motion } from 'motion/react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}

export default function GradientText({
  children,
  className = "",
  colors = ["#40ffaa", "#4079ff", "#40ffaa", "#9b40ff", "#40ffaa"],
  animationSpeed = 8,
  showBorder = false,
}: GradientTextProps) {
  
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    backgroundSize: '300% 100%',
  };

  return (
    <div className={`relative flex items-center justify-center font-medium ${className}`}>
      {showBorder && (
        <div 
          className="absolute inset-0 rounded-full p-[1px] pointer-events-none overflow-hidden"
          style={{
            ...gradientStyle,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        >
          <motion.div
            className="w-full h-full"
            style={gradientStyle}
            animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
            transition={{
              duration: animationSpeed,
              ease: "linear",
              repeat: Infinity,
            }}
          />
        </div>
      )}
      
      <motion.span
        className="bg-clip-text text-transparent"
        style={gradientStyle}
        animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
        transition={{
          duration: animationSpeed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {children}
      </motion.span>
    </div>
  );
}