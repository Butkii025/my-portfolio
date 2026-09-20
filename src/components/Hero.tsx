'use client';

import React, { useRef } from 'react';
import { FaDownload, FaGithub } from 'react-icons/fa';
import { FiSmile } from 'react-icons/fi';
import { MdWavingHand } from 'react-icons/md';
import GradientText from "../ui/GradientText";
import { motion } from 'framer-motion';

interface HomeProps {
  onProfileClick: () => void;
}

export default function Home({ onProfileClick }: HomeProps): React.JSX.Element {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / rect.height) * 15;
    const rotateY = (x / rect.width) * 15;
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`;

    const glow = el.querySelector('.card-glow') as HTMLElement;
    if (glow) {
      const gx = 50 + (x / rect.width) * 60;
      const gy = 50 + (y / rect.height) * 60;
      glow.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(96,165,250,0.18), transparent 70%)`;
      glow.style.opacity = '1';
    }
  };

  const handleCardMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
    const glow = el.querySelector('.card-glow') as HTMLElement;
    if (glow) glow.style.opacity = '0';
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-20">

      <div className="absolute inset-0 opacity-90 dark:via-black dark:to-black" />

      <div className="absolute w-[400px] h-[400px] rounded-full blur-3xl dark:bg-white/10 bg-zinc-400/10" />

      <div className="relative z-20 max-w-4xl mx-auto grid md:grid-cols-2 gap-center items-center mt-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="flex items-center gap-2 uppercase tracking-[0.2em] font-semibold text-sm mb-10
            dark:text-white text-zinc-400">
            <GradientText
              colors={["#5d94d7", "#5a6168", "#1e1f21"]}
              animationSpeed={4}
              showBorder={false}
              className="inline"
            >
              ____portfolio
            </GradientText>
            <FiSmile size={18} className="ml-2 animate-pulse" />
          </p>

          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6
            dark:text-white text-gray-900">
            Priyanshu
            <span className="text-4xl md:text-5xl block bg-gradient-to-r text-zinc-500 text-transparent font-black mb-6">
              Vijay
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8"
          >
            <p className="text-lg md:text-xl font-bold mb-2
              dark:text-zinc-400 text-zinc-600 mt-10">
              Data Scientist  & ML Engineer
              <span className="text-xs uppercase tracking-widest dark:text-zinc-500 text-zinc-500 mt-2 block">
                12+ Production Projects • 3+ Internships • 20+ Technologies
              </span>
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-sm leading-relaxed max-w-xl mb-8
              dark:text-zinc-400 text-zinc-700"
          >
            Building intelligent systems at the intersection of data science, machine learning,
            Transforming complex problems into scalable solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex gap-4 flex-wrap mb-4"
          >
            <motion.a
              href="https://docs.google.com/document/d/145I8HrBv9Ub2HroPFgFkyLaGp5p4T4UDzb6s-uII7Pk/export?format=pdf"
              className="px-4 py-3 rounded-2xl transition duration-300 cursor-pointer font-semibold
                  dark:border dark:border-white/20 dark:text-white dark:hover:bg-white/10 dark:active:bg-zinc-400
                  border border-zinc-300 text-zinc-700 hover:bg-zinc-100 active:bg-zinc-200
                  flex items-center gap-2"
            >
              Resume <FaDownload size={16} />
            </motion.a>

            <motion.a
              href="https://github.com/Butkii025"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-2xl transition duration-300 cursor-pointer font-semibold
                  dark:border dark:border-white/20 dark:text-white dark:hover:bg-white/10 dark:active:bg-zinc-400
                  border border-zinc-300 text-zinc-700 hover:bg-zinc-100 active:bg-zinc-200
                  flex items-center gap-2"
            >
              GitHub <FaGithub size={16} />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mt-4"
          style={{ perspective: '800px' }}
        >
          <div
            ref={cardRef}
            style={{ transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            className="relative w-[260px] h-[360px] rounded-[3rem] overflow-hidden shadow-2xl backdrop-blur-xl cursor-default
              dark:border dark:border-white/20 dark:bg-zinc-900/50 dark:bg-gradient-to-br dark:from-white/5 dark:to-white/0 dark:hover:border-zinc-400/50 dark:hover:shadow-zinc-500/10
              border border-zinc-200 bg-white/60 bg-gradient-to-br hover:border-zinc-400/50 hover:shadow-zinc-300/20"
          >
            <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-white/10 dark:to-transparent bg-gradient-to-b from-zinc-100/30 to-transparent" />

            <div
              className="card-glow absolute inset-0 pointer-events-none rounded-[3rem] transition-opacity duration-300"
              style={{ opacity: 0, background: 'radial-gradient(circle at 50% 50%, rgba(96,165,250,0.18), transparent 70%)' }}
            />

            <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
              <div style={{ perspective: '400px', transformStyle: 'preserve-3d' }}>
                <img
                  ref={imgRef}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  src="/6.png"
                  alt="Profile Full"
                  style={{ transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
                  className="w-45 h-60 rounded-[3rem] object-cover shadow-2xl cursor-pointer
                    dark:border-4 dark:border-zinc-700 hover:scale-101
                    border-4 border-zinc-200"
                  onClick={onProfileClick}
                />
              </div>
              <br />

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-2xl transition duration-300 cursor-pointer font-semibold
                  dark:border dark:border-white/20 dark:text-white dark:hover:bg-white/10 dark:active:bg-zinc-400
                  border border-zinc-300 text-zinc-700 hover:bg-zinc-100 active:bg-zinc-200
                  flex items-center gap-2"
              >
                Say Hi <MdWavingHand size={18} className="animate-wave" />
              </motion.a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}