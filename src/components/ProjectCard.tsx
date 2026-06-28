'use client';

import React, { useRef } from 'react';
import { Project } from '@/src/Data/projectsData';

function useTilt(strength = 10) {
  const ref = useRef<HTMLDivElement>(null);
  
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `perspective(800px) rotateX(${-(y / r.height) * strength}deg) rotateY(${(x / r.width) * strength}deg) scale3d(1.02,1.02,1.02)`;
    const g = el.querySelector('.card-glow') as HTMLElement;
    if (g) {
      g.style.background = `radial-gradient(circle at ${50 + (x / r.width) * 60}% ${50 + (y / r.height) * 60}%, rgba(96,165,250,0.15), transparent 70%)`;
      g.style.opacity = '1';
    }
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    const g = el.querySelector('.card-glow') as HTMLElement;
    if (g) g.style.opacity = '0';
  };

  return { ref, onMouseMove, onMouseLeave };
}

interface ProjectCardProps {
  project: Project;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onExplore: (e: React.MouseEvent<HTMLAnchorElement>, title: string) => void;
}

export default function ProjectCard({
  project,
  isActive,
  onMouseEnter,
  onMouseLeave: onLeave,
  onExplore,
}: ProjectCardProps) {
  const tilt = useTilt(10);
  const ease = 'cubic-bezier(0.25,1,0.5,1)';

  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={() => { tilt.onMouseLeave(); onLeave(); }}
      style={{ transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
      className="group relative rounded-3xl overflow-hidden w-full h-full flex flex-col min-h-[480px]
        dark:bg-gradient-to-br dark:from-white/5 dark:to-white/0 dark:border dark:border-white/10 dark:hover:border-blue-400/50 dark:hover:shadow-blue-500/10
        bg-gradient-to-br from-zinc-50 to-white border border-zinc-200 hover:border-blue-400/50 hover:shadow-blue-500/10
        backdrop-blur-sm hover:shadow-2xl"
    >
      <div className="card-glow absolute inset-0 pointer-events-none rounded-3xl z-10 transition-opacity duration-300" style={{ opacity: 0 }} />

      <div className="relative h-48 sm:h-52 w-full overflow-hidden shrink-0 dark:bg-zinc-900 bg-zinc-100">
        <img src={project.img} alt={project.title}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105" />
        <div className="absolute inset-0 dark:bg-zinc-950/20 bg-white/10 transition-opacity duration-500 group-hover:opacity-0" />

        <span className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md
          dark:bg-zinc-900/90 dark:border dark:border-zinc-700 dark:text-zinc-400
          bg-white/90 border border-zinc-200 text-zinc-500">
          {project.type}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-bold text-base tracking-tight mb-2 transition-colors duration-300
          dark:text-white text-zinc-800 group-hover:text-blue-400
          line-clamp-2 group-hover:line-clamp-none">
          {project.title}
        </h3>

        <p className="text-xs italic mb-3 dark:text-zinc-600 text-zinc-400 line-clamp-1">
           {project.focused}
        </p>

        <div style={{
          transition: `opacity 0.45s ${ease}, max-height 0.55s ${ease}`,
          opacity: isActive ? 1 : 0,
          maxHeight: isActive ? '20rem' : '0px',  // ← Changed from '10rem' to '20rem'
          overflow: 'hidden',
        }}
          className="text-sm leading-relaxed dark:text-zinc-400 text-zinc-500 mb-8 mt-2">
          {project.desc}
        </div>

        <div style={{
          transition: `opacity 0.4s ${ease} 0.1s, max-height 0.5s ${ease}`,
          opacity: isActive ? 1 : 0,
          maxHeight: isActive ? '6rem' : '0px',
          overflow: 'hidden',
        }}
          className="flex flex-wrap gap-1.5 mb-4 text-xs">
          {project.tech.map((t, i) => (
            <span key={i}
              style={{
                transitionDelay: isActive ? `${0.15 + i * 0.04}s` : '0s',
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateY(0)' : 'translateY(6px)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
              }}
              className="px-2 py-0.5 rounded-md whitespace-nowrap
                dark:bg-zinc-900/80 dark:border dark:border-zinc-800 dark:text-zinc-400
                bg-zinc-100 border border-zinc-200 text-zinc-600">
              {t}
            </span>
          ))}
        </div>

        <div style={{
          transition: `opacity 0.4s ${ease} 0.25s, max-height 0.5s ${ease}`,
          opacity: isActive ? 1 : 0,
          maxHeight: isActive ? '5rem' : '0px',
          overflow: 'hidden',
        }}
          className="flex gap-3 mt-4">

          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer"
              className="flex-1 text-center" onClick={(e) => onExplore(e, project.title)}>
              <button className="w-full px-3 py-2.5 text-xs font-medium rounded-xl transition duration-200 cursor-pointer
                dark:border dark:border-zinc-800 dark:text-white dark:hover:bg-white/10 dark:active:bg-blue-400
                border border-zinc-300 text-zinc-700 hover:bg-zinc-100 active:bg-blue-400">
                Preview ↗
              </button>
            </a>
          )}

          <a href={project.code} target="_blank" rel="noopener noreferrer"
            className={project.url ? 'flex-1 text-center' : 'w-full text-center'}>
            <button className="w-full px-3 py-2.5 text-xs font-medium rounded-xl transition duration-200 cursor-pointer
              dark:border dark:border-zinc-800 dark:text-white dark:hover:bg-white/10 dark:active:bg-blue-400
              border border-zinc-300 text-zinc-700 hover:bg-zinc-100 active:bg-blue-400">
              Code 
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}