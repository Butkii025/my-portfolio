'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export type Project = {
  name: string;
  title: string;
  type: string;
  focused?: string;
  desc: string;
  img: string;
  tech: string[];
  url?: string;
  code?: string;
};

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [isActive, setIsActive] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const handlePointerMove = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    if (e.pointerType !== 'mouse') return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 20;
    const rotateX = (y / rect.height - 0.5) * -20;

    setTilt({ x: rotateX, y: rotateY });

    setGlow({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const resetTilt = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="w-[78vw] max-w-[340px] shrink-0 snap-center"
    >
      <motion.div
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{
          type: 'spring',
          stiffness: 180,
          damping: 18,
        }}
        style={{
          transformStyle: 'preserve-3d',
          perspective: 1000,
        }}
        className="relative min-h-[480px] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#18211b]"
      >
        {/* Cursor-following glow */}
        <div
          className="pointer-events-none absolute inset-0 z-20 opacity-60"
          style={{
            background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(91, 148, 215, 0.22), transparent 45%)`,
          }}
        />

        {/* Project image */}
        <div className="relative h-[205px] overflow-hidden bg-zinc-100 dark:bg-[#111812]">
          <img
            src={project.img}
            alt={project.name}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-[#18211b]" />

          <span className="absolute left-4 top-4 rounded-full border border-zinc-300 bg-white/85 px-3 py-1 text-xs text-zinc-700 backdrop-blur-md dark:border-white/15 dark:bg-black/40 dark:text-zinc-200">
            {project.type}
          </span>
        </div>

        {/* Main card content */}
        <div className="relative z-10 flex flex-col p-5">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-blue-400/80 dark:text-blue-400/80">
            Project {String(index + 1).padStart(2, '0')}
          </p>

          <h3 className="font-serif text-2xl font-light leading-tight text-zinc-900 dark:text-zinc-100">
            {project.name}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            {project.desc}
          </p>

          <button
            type="button"
            onClick={() => setIsActive(!isActive)}
            className="mt-5 flex items-center justify-between border-t border-zinc-200 pt-4 text-sm text-blue-700 transition-colors hover:text-blue-800 dark:border-white/10 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <span>
              {isActive ? 'Show less' : 'Explore project'}
            </span>

            <span className="text-lg">
              {isActive ? '−' : '+'}
            </span>
          </button>

          {/* Expandable project details */}
          <AnimatePresence initial={false}>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden"
              >
                {project.focused && (
                  <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">
                    {project.focused}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech?.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex gap-5 text-sm">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Preview ↗
                    </a>
                  )}

                  {project.code && (
                    <a
                      href={project.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Source Code ↗
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}