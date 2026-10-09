'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiGithub, FiExternalLink, FiChevronDown } from 'react-icons/fi';
import { experiences, type ExperienceItem } from '@/src/Data/experiencedata';

function useTilt(strength = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `perspective(600px) rotateX(${-(y / r.height) * strength}deg) rotateY(${(x / r.width) * strength}deg) scale3d(1.02,1.02,1.02)`;
    const g = el.querySelector('.card-glow') as HTMLElement;
    if (g) {
      g.style.background = `radial-gradient(circle at ${50 + (x / r.width) * 60}% ${50 + (y / r.height) * 60}%, rgba(96,165,250,0.15), transparent 70%)`;
      g.style.opacity = '1';
    }
  };
  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    const g = el.querySelector('.card-glow') as HTMLElement;
    if (g) g.style.opacity = '0';
  };
  return { ref, onMouseMove, onMouseLeave };
}

function TechBadge({ tech, index }: { tech: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className="px-3 py-1 rounded-full text-xs font-medium
        dark:bg-white/10 dark:border-white/20 dark:text-zinc-300
        bg-black/10 border border-white/30 text-zinc-700
        backdrop-blur-sm whitespace-nowrap"
    >
      {tech}
    </motion.span>
  );
}

function ExperienceCard({ item, index }: { item: ExperienceItem; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const tilt = useTilt(6);

  return (
    <motion.div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={{ transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative group w-[350px] md:w-[450px] flex-shrink-0"
    >
      <motion.div
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative p-8 h-full rounded-3xl backdrop-blur-xl border transition-all duration-300 cursor-pointer
          dark:border-white/10 border-zinc-200 dark:bg-gradient-to-br dark:from-white/5 dark:to-white/0
          border-white/40 bg-gradient-to-br from-white/60 to-zinc-50/40
          hover:shadow-2xl hover:dark:shadow-blue-500/20 hover:shadow-blue-500/10
          dark:hover:border-blue-400/50 hover:border-blue-400/50
          overflow-hidden flex flex-col justify-between"
      >
        <div className="card-glow absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300" style={{ opacity: 0 }} />

        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"
        />

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-widest dark:text-zinc-600 text-zinc-500 font-semibold mb-2">
                  {item.date}
                </p>
                <h3 className="text-xl md:text-2xl font-bold dark:text-white text-black mb-1 group-hover:dark:text-blue-300 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm dark:text-zinc-400 text-zinc-600 font-medium">
                  {item.role}
                </p>
              </div>
              <motion.button
                animate={{ rotate: isExpanded ? 180 : 0 }}
                className="p-2 rounded-lg dark:bg-white/10 dark:hover:bg-white/20 bg-black/10 hover:bg-black/20
                  dark:text-zinc-400 text-zinc-600 transition-all flex-shrink-0 ml-2"
              >
                <FiChevronDown className="w-5 h-5" />
              </motion.button>
            </div>

            <p className="text-sm dark:text-zinc-300 text-zinc-700 mb-4 leading-relaxed">
              {item.description}
            </p>

            <motion.div
              initial={false}
              animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-4 mb-4 pt-4 border-t dark:border-white/10 border-white/30">
                <div>
                  <p className="text-xs uppercase tracking-widest dark:text-zinc-600 text-zinc-500 font-semibold mb-2">
                    🎯 Key Impact
                  </p>
                  <p className="text-sm dark:text-zinc-300 text-zinc-700">
                    {item.impact}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div>
            <div className="mb-6">
              <p className="text-xs uppercase tracking-widest dark:text-zinc-600 text-zinc-500 font-semibold mb-3">
                Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {item.tech.map((tech, i) => (
                  <TechBadge key={i} tech={tech} index={i} />
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {item.links.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  className="group/link inline-flex items-center gap-2 px-4 py-2 rounded-lg
                    dark:bg-white/10 dark:hover:bg-blue-500/20 dark:border-white/20 dark:text-zinc-300
                    bg-black/10 hover:bg-blue-500/20 border border-white/30 text-zinc-700
                    transition-all duration-300"
                >
                  {link.icon === 'github' && <FiGithub className="w-4 h-4" />}
                  {link.icon === 'link' && <FiExternalLink className="w-4 h-4" />}
                  {link.icon === 'download' && <FiArrowRight className="w-4 h-4" />}
                  <span className="text-sm font-medium">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Experience(): React.JSX.Element {
  return (
    <section id="experience" className="py-28 px-6 md:px-12 lg:px-24 dark:bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="uppercase tracking-[0.2em] mb-4 text-zinc-500 dark:text-zinc-500 text-xs font-semibold">
            Experience
          </p>
          <h2 className="flex items-center gap-3 text-5xl md:text-6xl font-bold dark:text-white text-black mb-4">
            Professional Journey
          </h2>
          <p className="text-base dark:text-zinc-400 text-zinc-600 max-w-2xl">
            A chronological look at my roles and contributions. Scroll horizontally or swipe to discover more.
          </p>
        </motion.div>

        <div 
          className="flex gap-6 overflow-x-auto pb-8 pt-4 snap-x snap-mandatory 
            scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {experiences.map((experience, index) => (
            <div key={index} className="snap-center">
              <ExperienceCard item={experience} index={index} />
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {[
            { label: 'Experiences', value: '3+' },
            { label: 'Tech Stack', value: '20+' },
            { label: 'Projects', value: '10+' },
            { label: 'Data Rows', value: '60k+' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="p-4 rounded-xl text-center backdrop-blur-sm border
                dark:bg-white/5 dark:border-white/10
                bg-white/40 border-white/30"
            >
              <p className="text-2xl font-bold dark:text-white text-black">{stat.value}</p>
              <p className="text-xs uppercase tracking-widest dark:text-zinc-500 text-zinc-600 mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}