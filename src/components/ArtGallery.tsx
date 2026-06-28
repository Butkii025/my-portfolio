'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { FaPaintBrush } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import { ART_IMAGES, RANGOLI_FACTS } from '@/src/Data/creativeData';
import ArtCard from '@/src/components/ArtCard';
import VideoBox from '@/src/Data/VideoBox';
import FunZone from './FunZone';
import { ArtImage } from '@/src/Data/creativeData';
import ComponentLibrary from '@/src/components/Componentlibrary';


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

export default function CreativeCorner(): React.JSX.Element {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const goNext = useCallback(() => setSelectedIndex(i => i === null ? 0 : (i + 1) % ART_IMAGES.length), []);
  const goPrev = useCallback(() => setSelectedIndex(i => i === null ? 0 : (i - 1 + ART_IMAGES.length) % ART_IMAGES.length), []);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, goNext, goPrev]);

  return (
    <section className="pt-8 py-28 px-6 overflow-hidden dark:text-white text-black">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-8">
          <ComponentLibrary />
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Art_Gallery <FaPaintBrush size={20} className="inline-block ml-2 animate-bounce text-blue-400" />
          </h2>
        </div>

        <p className="leading-relaxed mb-10 dark:text-zinc-400 text-zinc-500 text-base max-w-3xl">
          Beyond code — I sketch, draw portraits, do charcoal work, design posters, and create visuals that carry emotions and stories. I've also done commissioned pieces for friends and clients.
        </p>

        <div className="flex items-center gap-3 mb-6">
          <span className="font-medium text-sm dark:text-zinc-300 text-zinc-700">Moment :</span>
          <a href="https://www.youtube.com/shorts/lpRupMkGGaM" target="_blank" rel="noreferrer"
            className="px-3 py-1.5 rounded-xl border text-sm transition duration-300 shadow-sm
              dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-blue-400 dark:hover:text-blue-400
              border-zinc-200 text-zinc-500 hover:border-blue-400 hover:text-blue-400">
            झलक
          </a>
        </div>

        {/* Rangoli Project Milestones */}
        <div className="flex flex-wrap gap-3 mb-14">
          <span className="text-xs uppercase tracking-widest dark:text-zinc-500 text-zinc-400 self-center mr-1 font-semibold">Kala_Arpan —</span>
          {RANGOLI_FACTS.map((f, i) => (
            <span key={i} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs shadow-sm
              dark:bg-zinc-900 dark:border dark:border-zinc-800 dark:text-zinc-400
              bg-zinc-100 border border-zinc-200 text-zinc-600">
              {f.icon} {f.text}
            </span>
          ))}
        </div>
      </div>

      <div className="relative w-full overflow-hidden py-12 dark:bg-zinc-900/30 bg-zinc-100/60">
        <div className="flex w-max" style={{ animation: 'marquee 35s linear infinite reverse' }}>
          {[...ART_IMAGES, ...ART_IMAGES].map((img, i) => (
            <ArtCard 
              key={i} 
              image={img} 
              index={i % ART_IMAGES.length} 
              onClick={() => setSelectedIndex(i % ART_IMAGES.length)} 
            />
          ))}
        </div>
        <div className="absolute left-0 top-0 h-full w-20 pointer-events-none z-10 dark:bg-gradient-to-r dark:from-zinc-950 dark:to-transparent bg-gradient-to-r from-white to-transparent" />
        <div className="absolute right-0 top-0 h-full w-20 pointer-events-none z-10 dark:bg-gradient-to-l dark:from-zinc-950 dark:to-transparent bg-gradient-to-l from-white to-transparent" />
      </div>

      <p className="dark:text-zinc-400 text-zinc-500 text-center text-sm italic mt-20">
        " Since you've come this far, here's some cool stuff "
      </p>

      <div className="max-w-4xl mx-auto mt-24 flex flex-col lg:flex-row items-center justify-center gap-16 px-4">
        <VideoBox />
        <FunZone />
      </div>

      {selectedIndex !== null && (
        <>
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-in fade-in duration-200"
            onClick={() => setSelectedIndex(null)} 
            style={{ boxShadow: 'inset 0 0 60px rgba(96,165,250,0.2)' }} 
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div 
              className="pointer-events-auto relative animate-in fade-in zoom-in duration-300 flex flex-col items-center gap-4"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedIndex(null)}
                className="absolute -top-4 -right-4 z-10 p-1.5 rounded-full shadow-lg transition duration-200 cursor-pointer
                  dark:bg-zinc-900 dark:border dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-white
                  bg-white border border-zinc-200 text-zinc-500 hover:text-black"
              >
                <FiX size={16} />
              </button>
              
              <img 
                key={selectedIndex} 
                src={`/${ART_IMAGES[selectedIndex].name}`} 
                alt={`Art ${selectedIndex + 1}`}
                className="max-w-[85vw] max-h-[70vh] rounded-lg border-2 border-blue-400 shadow-2xl object-contain dark:bg-zinc-950 bg-zinc-100"
                style={{ boxShadow: '0 0 40px rgba(96,165,250,0.4)' }} 
              />
              
              <div className="flex items-center gap-6">
                <button 
                  onClick={goPrev} 
                  className="p-2 rounded-xl transition duration-200 cursor-pointer border
                    dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-white dark:hover:border-blue-400/50
                    border-zinc-200 text-zinc-500 hover:text-black hover:border-blue-400/50"
                >
                  <FiChevronLeft size={20} />
                </button>
                <div className="flex gap-1.5">
                  {ART_IMAGES.map((_, i) => (
                    <button 
                      key={i} 
                      onClick={() => setSelectedIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === selectedIndex ? 'w-4 bg-blue-400' : 'w-1.5 dark:bg-zinc-600 bg-zinc-300'}`} 
                    />
                  ))}
                </div>
                <button 
                  onClick={goNext} 
                  className="p-2 rounded-xl transition duration-200 cursor-pointer border
                    dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-white dark:hover:border-blue-400/50
                    border-zinc-200 text-zinc-500 hover:text-black hover:border-blue-400/50"
                >
                  <FiChevronRight size={20} />
                </button>
              </div>
              <p className="text-xs dark:text-zinc-500 text-zinc-400">{selectedIndex + 1} / {ART_IMAGES.length}</p>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}