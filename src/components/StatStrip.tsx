'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface StatItem {
  label: string;
  value: React.ReactNode;
}

/** Plain number row with thin dividers. No boxes, no borders around each stat. */
export default function StatStrip({
  items,
  className = 'mb-10',
}: {
  items: StatItem[];
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-2 gap-y-8 md:flex md:gap-y-0 ${className}`}>
      {items.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className={`md:px-10 md:first:pl-0 md:last:pr-0 ${
            i > 0 ? 'md:border-l md:border-zinc-300 dark:md:border-white/15' : ''
          }`}
        >
          <p className="text-3xl font-bold dark:text-white text-black">{s.value}</p>
          <p className="text-xs uppercase tracking-widest dark:text-zinc-500 text-zinc-600 mt-1 font-semibold">
            {s.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}