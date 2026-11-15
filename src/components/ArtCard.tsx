'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { ArtImage } from '@/src/Data/creativeData';

interface ArtCardProps {
  image: ArtImage;
  index: number;
  onClick: () => void;
}

export default function ArtCard({ image, index, onClick }: ArtCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 14;
    const rotateX = ((y / rect.height) - 0.5) * -14;

    el.style.setProperty('--mouse-x', `${x}px`);
    el.style.setProperty('--mouse-y', `${y}px`);
    el.style.transform =
      `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;

    el.style.transform =
      'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <motion.button
      ref={cardRef}
      type="button"
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: (index % 5) * 0.08 }}
      whileTap={{ scale: 0.97 }}
      aria-label={`View artwork ${image.id}`}
      className="group relative mx-4 h-72 w-56 shrink-0 cursor-pointer overflow-hidden rounded-sm
        border dark:border-white/10 border-zinc-300
        bg-zinc-200 dark:bg-zinc-900
        shadow-[0_20px_60px_rgba(0,0,0,0.2)]
        transition-[transform,border-color] duration-300
        hover:border-blue-400/70
        sm:h-80 sm:w-64 md:h-[22rem] md:w-72"
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 180ms ease-out, border-color 300ms ease',
      }}
    >
      {/* Artwork */}
      <img
        src={`/${image.name}`}
        alt={`Artwork ${image.id}`}
        loading="lazy"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover
          transition-transform duration-700 ease-out
          group-hover:scale-110"
      />

      {/* Cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-t
        from-black/80 via-black/10 to-black/20
        opacity-70 transition-opacity duration-500
        group-hover:opacity-100"
      />

      {/* Cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(96,165,250,0.25), transparent 65%)',
        }}
      />

      {/* Frame details */}
      <div className="absolute inset-3 border border-white/20 transition-all duration-500
        group-hover:inset-5 group-hover:border-blue-400/60"
      />

      {/* Bottom caption */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-left">
        <div>
          <p className="mb-1 text-[9px] uppercase tracking-[0.3em] text-blue-300">
            Artwork / {String(index + 1).padStart(2, '0')}
          </p>
          <p className="font-serif text-xl font-light text-white">
            A piece of me.
          </p>
        </div>

        <span className="flex h-9 w-9 items-center justify-center rounded-full
          border border-white/40 text-white transition-all duration-300
          group-hover:border-blue-400 group-hover:bg-blue-400 group-hover:text-black"
        >
          <FiArrowUpRight size={17} />
        </span>
      </div>
    </motion.button>
  );
}