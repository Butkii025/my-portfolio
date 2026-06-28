'use client';

import React, { useRef } from 'react';
import { ArtImage } from '@/src/Data/creativeData';

function useTilt(strength = 12) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `perspective(500px) rotateX(${-(y / r.height) * strength}deg) rotateY(${(x / r.width) * strength}deg) scale3d(1.08,1.08,1.08)`;
    const g = el.querySelector('.art-glow') as HTMLElement;
    if (g) {
      g.style.background = `radial-gradient(circle at ${50 + (x / r.width) * 60}% ${50 + (y / r.height) * 60}%, rgba(96,165,250,0.3), transparent 70%)`;
      g.style.opacity = '1';
    }
  };

  const leave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    const g = el.querySelector('.art-glow') as HTMLElement;
    if (g) g.style.opacity = '0';
  };

  return { ref, move, leave };
}

interface ArtCardProps {
  image: ArtImage;
  index: number;
  onClick: () => void;
}

export default function ArtCard({ image, index, onClick }: ArtCardProps) {
  const { ref, move, leave } = useTilt(12);
  
  return (
    <div 
      ref={ref} 
      onMouseMove={move} 
      onMouseLeave={leave} 
      onClick={onClick}
      className="relative w-44 h-44 cursor-pointer shrink-0 mx-3 animate-in fade-in duration-300"
      style={{ 
        transform: `rotateY(${index % 2 === 0 ? '30deg' : '-20deg'}) translateZ(10px)`, 
        transformStyle: 'preserve-3d', 
        transition: 'transform 0.15s ease-out' 
      }}
    >
      <img 
        src={`/${image.name}`} 
        alt={`Art ${image.id}`}
        className="w-full h-full object-cover rounded-xl border border-zinc-300/30 shadow-2xl opacity-80 hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: '0 15px 35px rgba(96,165,250,0.2)' }} 
      />
      <div className="art-glow absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300" style={{ opacity: 0 }} />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none mix-blend-multiply" />
    </div>
  );
}