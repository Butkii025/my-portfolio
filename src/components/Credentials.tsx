
'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { FiArrowUpRight, FiFileText, FiLayers } from 'react-icons/fi';
import { credentialsData } from '@/src/Data/Credentialsdata';
import type { CredentialItem } from '@/src/Data/Credentialsdata';

type Preview = { src: string | null; label: string } | null;

const isImage = (h: string) => /\.(png|jpe?g|webp|gif)$/i.test(h);
const isExternal = (h: string) => /^https?:\/\//i.test(h);

const getPreview = (item: CredentialItem): Preview =>
  isExternal(item.href) ? null : {
    src: isImage(item.href) ? item.href : null,
    label: item.label,
  };

function CredentialRow({ item, index, onHover }: {
  item: CredentialItem;
  index: number;
  onHover: (p: Preview) => void;
}) {
  const preview = () => onHover(getPreview(item));

  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      onMouseEnter={preview}
      onMouseLeave={() => onHover(null)}
      onFocus={preview}
      onBlur={() => onHover(null)}
      className="group flex items-baseline gap-3 border-b border-zinc-200 py-5 transition-colors hover:border-blue-400/40 dark:border-white/10 sm:gap-4"
    >
      <span className="w-7 shrink-0 font-mono text-xs text-zinc-400 group-hover:text-blue-500">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="font-serif text-lg font-light leading-snug text-zinc-800 transition-all group-hover:translate-x-1 group-hover:text-blue-600 dark:text-zinc-200 dark:group-hover:text-white sm:text-2xl">
        {item.label}
      </span>
      <span className="mb-1.5 hidden h-px min-w-6 flex-1 border-b border-dotted border-zinc-300 group-hover:border-blue-400/60 dark:border-white/20 sm:block" />
      {item.date && <span className="ml-auto shrink-0 font-mono text-[10px] uppercase tracking-widest text-zinc-500 sm:text-xs">{item.date}</span>}
      <FiArrowUpRight className="h-4 w-4 shrink-0 self-center text-zinc-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-500" />
    </motion.a>
  );
}

export default function Credentials(): React.JSX.Element {
  const [active, setActive] = useState(0);
  const [preview, setPreview] = useState<Preview>(null);
  const [mounted, setMounted] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const allItems = credentialsData.flatMap(c => c.items);
  const group = active === -1 ? null : credentialsData[active];
  const items = group?.items ?? allItems;
  const total = allItems.length;

  useEffect(() => setMounted(true), []);

  const onMove = (e: React.MouseEvent) => {
    const x = e.clientX > window.innerWidth - 320 ? e.clientX - 296 : e.clientX + 24;
    mx.set(Math.max(8, x));
    my.set(Math.max(8, Math.min(e.clientY + 16, window.innerHeight - 240)));
  };

  const tabClass = (selected: boolean) =>
    `relative pb-4 font-serif text-xl font-light transition-colors sm:text-2xl ${
      selected ? 'text-black dark:text-white' : 'text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300'
    }`;

  return (
    <section id="credentials" className="relative overflow-hidden px-6 py-28 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
        
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-blue-400/80 dark:text-blue-400/70">
              Achievements
            </p>

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              
              <h2 className="flex items-center gap-3 font-serif text-4xl font-light md:text-6xl dark:text-white text-black mb-4">
                Credentials <span className="text-zinc-500 italic">& </span>Certifications
              </h2>
              <p className="mt-5 max-w-xl text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 md:text-sm">
                A collection of professional achievements, educational certifications, and community contributions.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/[0.04] px-4 py-3">
                <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-blue-400/80 dark:text-blue-400/70">Live archive</span>
              </div>
              {[
                ['Collections', credentialsData.length],
                ['Total records', total],
              ].map(([label, value]) => (
                <div key={label} className="min-w-[105px] rounded-xl border border-zinc-200 bg-white/40 px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]">
                  <p className="text-[9px] uppercase tracking-widest text-zinc-500">{label}</p>
                  <p className="mt-1 font-mono text-2xl font-light text-zinc-900 dark:text-white">{String(value).padStart(2, '0')}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Category navigation */}
        <div role="tablist" aria-label="Credential categories" className="flex flex-wrap gap-x-8 gap-y-4 border-b border-zinc-200 dark:border-white/10">
          {[{ title: 'All', items: allItems }, ...credentialsData].map((category, i) => {
            const selected = (i === 0 && active === -1) || i === active + 1;
            return (
              <button key={category.title} type="button" role="tab" aria-selected={selected} onClick={() => setActive(i - 1)} className={tabClass(selected)}>
                {category.title}
                <sup className="ml-1.5 font-mono text-[10px] text-blue-500">{category.items.length}</sup>
                {selected && <motion.span layoutId="credential-tab" className="absolute inset-x-0 -bottom-px h-px bg-blue-500" />}
              </button>
            );
          })}
        </div>

        {/* Description */}
        <div className="mb-3 mt-7 flex items-center justify-between gap-4">
          <p className="max-w-xl text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 md:text-sm">
            {group?.desc ?? 'Explore all achievements and milestones in one place.'}
          </p>
          <p className="hidden shrink-0 font-mono text-[9px] uppercase tracking-widest text-zinc-400 md:block">Hover to preview ↗</p>
        </div>

        {/* Credential ledger */}
        <div onMouseMove={onMove} className="min-h-[260px] border-t border-zinc-200 dark:border-white/10">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              {items.map((item, i) => <CredentialRow key={`${item.href}-${i}`} item={item} index={i} onHover={setPreview} />)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-5 dark:border-white/10">
          <div className="flex items-center gap-2">
            <FiLayers className="h-3.5 w-3.5 text-blue-500" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">{group?.title ?? 'All collections'}</span>
          </div>
          <p className="font-mono text-[9px] tracking-widest text-zinc-400">{items.length} RECORDS</p>
        </div>
      </div>

      {/* Floating preview */}
      {mounted && createPortal(
        <AnimatePresence>
          {preview && (
            <motion.div
              key="credential-preview"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.15 }}
              style={{ x: mx, y: my }}
              className="pointer-events-none fixed left-0 top-0 z-[70] hidden w-[272px] rounded-xl border border-zinc-200 bg-white/95 p-2 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/95 md:block"
            >
              {preview.src ? (
                <img src={preview.src} alt={preview.label} className="max-h-52 w-full rounded-lg object-contain" />
              ) : (
                <div className="flex h-36 flex-col items-center justify-center gap-3 rounded-lg bg-zinc-100 dark:bg-white/[0.04]">
                  <FiFileText className="h-8 w-8 text-blue-500" />
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500">PDF · Click to open</span>
                </div>
              )}
              <p className="mt-2 truncate px-1 text-[10px] text-zinc-500">{preview.label}</p>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
