'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FiGithub, FiArrowUpRight } from 'react-icons/fi';
import StatStrip from '@/src/components/StatStrip';
import { experiences, type ExperienceItem } from '@/src/Data/experiencedata';

const pad = (n: number) => String(n).padStart(2, '0');
const label = 'text-xs uppercase tracking-widest font-semibold text-zinc-500';
const org = (r: string) => r.replace(/^@/, '').trim();       // "@ElevatesLab - Remote" -> "ElevatesLab - Remote"
const shortOrg = (r: string) => org(r).split(' - ')[0];        // -> "ElevatesLab"

// Tidies the mixed date formats: "May26 - July26" -> "May – Jul 2026", "September 2026" -> "Sep 2026"
const prettyDate = (d: string) => {
  const range = d.match(/^([A-Za-z]+)(\d{2})\s*-\s*([A-Za-z]+)(\d{2})$/);
  if (range) return `${range[1].slice(0, 3)} – ${range[3].slice(0, 3)} 20${range[4]}`;
  return d.replace(/^([A-Za-z]{3})[A-Za-z]*\s(\d{4})$/, '$1 $2');
};
const splitDate = (d: string) => {
  const m = prettyDate(d).match(/^(.*)\s(20\d{2})$/);
  return { months: m?.[1] ?? d, year: m?.[2] ?? '' };
};

function Entry({ item, index, active, onEnter }: { item: ExperienceItem; index: number; active: boolean; onEnter: (i: number) => void }) {
  const ref = useRef<HTMLElement>(null);
  const inCenter = useInView(ref, { margin: '-45% 0px -45% 0px' }); // true while crossing the middle of the screen
  useEffect(() => { if (inCenter) onEnter(index); }, [inCenter, index, onEnter]);

  return (
    <motion.article
      ref={ref}
      id={`exp-${index}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      animate={{ opacity: active ? 1 : 0.35 }}
      whileHover={{ opacity: active ? 1 : 0.7 }}
      transition={{ duration: 0.5 }}
      className="relative border-b py-14 first:pt-0 last:border-b-0 dark:border-white/10 border-zinc-200"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 top-8 select-none font-serif text-8xl font-light leading-none text-transparent"
        style={{ WebkitTextStroke: '1px rgba(113,113,122,0.3)' }}
      >
        {pad(index + 1)}
      </span>

      <p className={`${label} mb-3 md:hidden`}>{pad(index + 1)} · {prettyDate(item.date)}</p>
      <h3 className="max-w-[85%] font-serif text-3xl font-light leading-tight md:text-4xl dark:text-white text-black">{item.title}</h3>
      <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-blue-400/80 dark:text-blue-400/80">{org(item.role)}</p>

      <p className="mt-6 text-sm leading-relaxed md:text-base dark:text-zinc-300 text-zinc-700">{item.description}</p>

      <div className="mt-6 border-l-2 border-blue-400/60 pl-4">
        <p className={`${label} mb-1`}>Impact</p>
        <p className="text-sm leading-relaxed dark:text-zinc-400 text-zinc-600">{item.impact}</p>
      </div>

      <p className="mt-6 text-xs leading-loose dark:text-zinc-400 text-zinc-600">{item.tech.join('  ·  ')}</p>

      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
        {item.links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm font-medium underline decoration-blue-400/40 underline-offset-4 transition-colors hover:decoration-blue-400 dark:text-zinc-200 text-zinc-800"
          >
            {l.icon === 'github' && <FiGithub className="h-4 w-4" />}
            {l.label}
            <FiArrowUpRight className="h-4 w-4 text-blue-400 dark:text-blue-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        ))}
      </div>
    </motion.article>
  );
}

export default function Experience(): React.JSX.Element {
  const [active, setActive] = useState(0);
  const { months, year } = splitDate(experiences[active].date);
  const jump = (i: number) => document.getElementById(`exp-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  return (
    <section id="experience" className="py-28 px-6 md:px-12 lg:px-24 dark:bg-transparent overflow-x-clip">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-blue-400/80 dark:text-blue-400/70">
            Experience
          </p>
          <h2 className="flex items-center gap-3 font-serif text-4xl font-light md:text-6xl dark:text-white text-black mb-4">
            Professional Journey
          </h2>
          <p className="text-xs md:text-sm dark:text-zinc-400 text-zinc-600 max-w-2xl">
            A chronological look at my roles and contributions.
          </p>
        </motion.div>

        <div className="grid gap-16 md:grid-cols-[5fr_7fr]">
          {/* sticky: current dates + table of contents */}
          <div className="hidden md:block md:sticky md:top-28 md:self-start">
            <p className={label}>Role {pad(active + 1)} / {pad(experiences.length)}</p>
            <div className="relative mt-4 h-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0"
                >
                  <p className="whitespace-nowrap font-serif text-6xl font-light tracking-tight lg:text-7xl dark:text-white text-black">{months}</p>
                  <p className="mt-2 text-sm font-semibold tracking-[0.3em] text-blue-400 dark:text-blue-400">{year}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <ul className="mt-10 space-y-3">
              {experiences.map((e, i) => (
                <li key={e.role}>
                  <button type="button" onClick={() => jump(i)} className="group flex items-center gap-3 text-left">
                    <span className={`h-px transition-all duration-300 ${i === active ? 'w-12 bg-blue-400' : 'w-5 dark:bg-white/25 bg-zinc-300 group-hover:w-8'}`} />
                    <span className={`text-xs uppercase tracking-widest transition-colors ${i === active ? 'dark:text-white text-black' : 'text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300'}`}>
                      {shortOrg(e.role)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            {experiences.map((item, i) => (
              <Entry key={item.role} item={item} index={i} active={active === i} onEnter={setActive} />
            ))}
          </div>
        </div>

        <StatStrip
          className="mt-24"
          items={[
            { label: 'Experiences', value: '3+' },
            { label: 'Tech Stack', value: '20+' },
            { label: 'Projects', value: '10+' },
            { label: 'Data Rows', value: '60k+' },
          ]}
        />

      </div>
    </section>
  );
}