'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiFileText, FiAward, FiUsers, FiExternalLink } from 'react-icons/fi';
import { credentialsData } from '@/src/Data/Credentialsdata';
import type { CredentialItem, CredentialCardProps } from '@/src/Data/Credentialsdata';

function useTiltCard(strength = 8) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / rect.height) * strength;
    const rotateY = (x / rect.width) * strength;
    el.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
    const glow = el.querySelector('.card-glow') as HTMLElement;
    if (glow) {
      const gx = 50 + (x / rect.width) * 60;
      const gy = 50 + (y / rect.height) * 60;
      glow.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(96,165,250,0.2), transparent 70%)`;
      glow.style.opacity = '1';
    }
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    const glow = el.querySelector('.card-glow') as HTMLElement;
    if (glow) glow.style.opacity = '0';
  };

  return { ref, onMouseMove, onMouseLeave };
}

function CredentialItem({ item }: { item: CredentialItem }) {
  const isPDF = item.href.toLowerCase().endsWith('.pdf');

  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover={{ x: 5 }}
      className="group relative flex items-start gap-3 p-3 rounded-lg transition-all duration-300
        dark:hover:bg-white/5 hover:bg-zinc-50/50
        dark:hover:border-blue-400/30 hover:border-blue-300/30
        border dark:border-white/0 border-transparent"
    >
      <span className="mt-1 flex-shrink-0">
        {isPDF ? (
          <FiFileText className="w-4 h-4 dark:text-blue-400 text-blue-500" />
        ) : (
          <FiAward className="w-4 h-4 dark:text-purple-400 text-purple-500" />
        )}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium dark:text-zinc-300 text-zinc-700 group-hover:dark:text-blue-300 group-hover:text-blue-600 transition-colors">
          {item.label}
        </p>
        {item.date && (
          <p className="text-xs dark:text-zinc-600 text-zinc-500 mt-0.5">{item.date}</p>
        )}
      </div>
      <FiExternalLink className="w-4 h-4 flex-shrink-0 dark:text-zinc-600 text-zinc-400 group-hover:dark:text-blue-400 group-hover:text-blue-500 transition-colors opacity-0 group-hover:opacity-100" />
    </motion.a>
  );
}

function CredentialCard({ title, desc, icon, badgeColor, items }: CredentialCardProps) {
  const tilt = useTiltCard(8);

  const getIconComponent = (iconEmoji: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      '🏆': <FiAward className="w-6 h-6 text-white" />,
      '📚': <FiFileText className="w-6 h-6 text-white" />,
      '👥': <FiUsers className="w-6 h-6 text-white" />,
    };
    return iconMap[iconEmoji] || <FiAward className="w-6 h-6 text-white" />;
  };

  return (
    <motion.div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={{ transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d', width: '320px', minWidth: '320px', height: '500px' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group p-8 rounded-3xl backdrop-blur-xl transition-all duration-500
        dark:border dark:border-white/10 border-zinc-200 dark:bg-gradient-to-br dark:from-white/5 dark:to-white/0
        border border-white/40 bg-gradient-to-br from-white/60 to-zinc-50/40
        flex flex-col h-full
        hover:shadow-2xl hover:dark:shadow-blue-500/20 hover:shadow-blue-500/10
        dark:hover:border-blue-400/50 hover:border-blue-300/30"
    >
      <div
        className="card-glow absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300"
        style={{ opacity: 0 }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${badgeColor}`}>
              {getIconComponent(icon)}
            </div>
            <div>
              <h3 className="text-2xl font-bold dark:text-white text-zinc-900">
                {title}
              </h3>
            </div>
          </div>
        </div>

        <p className="text-sm dark:text-zinc-400 text-zinc-600 mb-6 leading-relaxed">
          {desc}
        </p>

        <div className="w-12 h-1 bg-gradient-to-r dark:from-blue-500/40 dark:to-blue-500/0 from-blue-400/40 to-blue-400/0 rounded-full mb-6" />

        <div className="flex-1 space-y-2 min-h-0 overflow-y-auto pr-2
          [&::-webkit-scrollbar]:w-1
          dark:[&::-webkit-scrollbar-track]:bg-transparent
          dark:[&::-webkit-scrollbar-thumb]:bg-zinc-700
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-zinc-300
          [&::-webkit-scrollbar-thumb]:rounded-full
          hover:dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600
          hover:[&::-webkit-scrollbar-thumb]:bg-zinc-400">
          {items.map((item, i) => (
            <CredentialItem key={i} item={item} />
          ))}
        </div>

        <div className="mt-6 pt-6 border-t dark:border-white/5 border-white/30">
          <p className="text-xs uppercase tracking-widest font-semibold dark:text-zinc-500 text-zinc-500">
            {items.length} Credential{items.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Credentials(): React.JSX.Element {
  return (
    <section id="credentials" className="py-28 px-6 md:px-12 lg:px-24 dark:bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="uppercase tracking-[0.2em] mb-4 text-zinc-500 dark:text-zinc-500 text-xs font-semibold">
            Achievements
          </p>
          <h2 className="flex items-center gap-3 text-5xl md:text-6xl font-bold dark:text-white text-black mb-4">
            Credentials & Certifications
          </h2>
          <p className="text-base dark:text-zinc-400 text-zinc-600 max-w-2xl">
            A collection of professional achievements, educational certifications, and community contributions.
          </p>
        </motion.div>

        <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory items-start
          [&::-webkit-scrollbar]:h-1.5
          dark:[&::-webkit-scrollbar-track]:bg-zinc-900
          dark:[&::-webkit-scrollbar-thumb]:bg-zinc-800
          [&::-webkit-scrollbar-track]:bg-zinc-100
          [&::-webkit-scrollbar-thumb]:bg-zinc-300
          [&::-webkit-scrollbar-thumb]:rounded-full">
          {credentialsData.map((card, i) => (
            <div key={i} className="snap-start flex-shrink-0">
              <CredentialCard {...card} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}