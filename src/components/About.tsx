'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

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

interface Highlight {
  icon: string;
  label: string;
  value: string;
}

const highlights: Highlight[] = [
  { icon: '🤖', label: 'Focus', value: 'Data Science & ML' },
  { icon: '🐍', label: 'Tools', value: 'Python All-Rounder' },
  { icon: '💻', label: 'Approach', value: 'Data-Driven Design' },
  { icon: '⭐', label: 'Specialty', value: 'ML + Web Stack' },
];

function HighlightCard({ highlight, index }: { highlight: Highlight; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative group p-6 rounded-2xl backdrop-blur-xl border overflow-hidden
        dark:bg-gradient-to-br dark:from-white/5 dark:to-white/0 dark:border-white/10 dark:hover:border-blue-400/50
        bg-gradient-to-br from-white/40 to-zinc-50/40 border-white/40 hover:border-blue-400/50
        transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

      <div className="relative z-10">
        <span className="text-3xl mb-3 block">{highlight.icon}</span>
        <p className="text-xs uppercase tracking-widest dark:text-zinc-500 text-zinc-600 font-semibold mb-2">
          {highlight.label}
        </p>
        <h3 className="text-lg font-bold dark:text-white text-black">
          {highlight.value}
        </h3>
      </div>
    </motion.div>
  );
}

export default function AboutCool({ isDark }: { isDark: boolean }): React.JSX.Element {
  const imgTilt = useTilt(20);
  const [profileImage, setProfileImage] = useState('/1.png');

  useEffect(() => {
    setProfileImage(isDark ? '/4.png' : '/6.png');
  }, [isDark]);

  return (
    <section id="about" className="py-28 px-6 md:px-12 lg:px-24 dark:bg-transparent relative overflow-hidden">

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="uppercase tracking-[0.2em] mb-4 text-zinc-500 dark:text-zinc-500 text-xs font-semibold">
            Who I Am
          </p>
          <h2 className="flex items-center gap-3 text-4xl md:text-6xl font-bold dark:text-white text-black mb-4">
            About Me
            <motion.span animate={{ rotate: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              <FaStar size={40} className="dark:text-white text-black" />
            </motion.span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-zinc-400 to-cyan-400 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center md:justify-start"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-8 rounded-full border dark:border-blue-500/30 border-blue-400/30"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-12 rounded-full border dark:border-cyan-500/20 border-cyan-400/20"
              />

              <div
                ref={imgTilt.ref}
                onMouseMove={imgTilt.onMouseMove}
                onMouseLeave={imgTilt.onMouseLeave}
                style={{ transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
                className="relative w-fit cursor-pointer"
              >
                <motion.img
                  key={profileImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  src={profileImage}
                  alt="Priyanshu"
                  className="w-80 h-100 rounded-full object-cover shadow-2xl
                    dark:border-2 dark:border-zinc-400
                    border-2 border-zinc-400"
                />
                <motion.div
                  className="card-glow absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300"
                  style={{ opacity: 0 }}
                />
                <div className="absolute inset-0 rounded-full pointer-events-none
                  dark:ring-1 dark:ring-white/10 ring-1 ring-black/5" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative flex -rotate-[10deg]"
              >
                <img
                  src="/pv_sign.png"
                  alt="Signature"
                  className="w-40 object-contain opacity-70 dark:invert dark:opacity-50"
                />
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center h-100 gap-6"
          >
            <div>
              <p className="text-sm leading-relaxed dark:text-zinc-400 text-zinc-600">
                CS undergrad driven by a simple philosophy: <strong className="dark:text-white text-zinc-600">Build tech that works for end users</strong>. Building at the intersection of Data Science, Machine Learning, and UI Design, turning raw data into actionable insights.
              </p>
            </div>
            <div>
              <p className="text-sm leading-relaxed dark:text-zinc-400 text-zinc-600">
                I have experience working with <strong className="dark:text-white text-zinc-600">Python, Machine Learning, Data Science & Analysis</strong>, GitHub, and Web technologies. I enjoy building practical projects that solve real-world problems, continuously learning about the stock market, data science, and emerging technologies.
              </p>
            </div>
            <div>
              <p className="text-sm leading-relaxed dark:text-zinc-400 text-zinc-600">
                Apart from academics, I enjoy <strong className="dark:text-white text-zinc-600">open source collaboration, creating public PRs, and networking</strong>. I believe in combining creativity with technology to create meaningful and impactful work.
              </p>
            </div>
            <motion.a
              href="#projects"
              whileHover={{ x: 4 }}
              className="w-fit flex items-center gap-2 px-6 py-3 rounded-xl font-semibold
                dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:text-white
                bg-zinc-500 hover:bg-zinc-600 text-white
                transition-all duration-300 mt-4"
            >
              Explore My Work →
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold dark:text-white text-black mb-8">
            Core Strengths
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, i) => (
              <HighlightCard key={i} highlight={highlight} index={i} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-20 grid grid-cols-3 gap-4 md:gap-8"
        >
          {[
            { label: 'Internships', value: '3+' },
            { label: 'Projects Built', value: '15+' },
            { label: 'Technologies', value: '20+' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="p-6 rounded-xl text-center backdrop-blur-sm border
                dark:bg-white/5 dark:border-white/10
                bg-white/40 border-white/30"
            >
              <p className="text-3xl font-bold dark:text-white text-black">{stat.value}</p>
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