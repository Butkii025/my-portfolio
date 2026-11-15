'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';
import StatStrip from '@/src/components/StatStrip';

const stages = [
  ['data', 'Start with the mess.', 'Real datasets are never clean. I begin with cleaning, EDA and the right questions.', '700K+ records analyzed'],
  ['model', 'Measured, never guessed.', 'Every model ships with its metrics: validated, cross-checked and honest about its limits.', '0.97 ROC-AUC · 89.54% R²'],
  ['interface', 'Models people can use.', 'I wrap predictions in live Streamlit and Next.js apps, so results never stay in a notebook.', '13 projects deployed'],
  ['canvas', 'Drawn by hand.', 'Sketching and portraits train the same eye for detail that goes into my interfaces.', '50,000-cup rangoli, 2,500 sq. ft.'],
] as const;

const label = 'text-xs uppercase tracking-widest font-semibold dark:text-zinc-500 text-zinc-600';
const inView = { whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

function Stage({ s, i }: { s: (typeof stages)[number]; i: number }) {
  const delay = i * 0.3;
  const fill = { initial: { scale: 0 }, whileInView: { scale: 1 }, viewport: { once: true, amount: 0.8 } };
  return (
    <div className="relative flex flex-col pl-8 md:pl-0 md:pt-9">
      <span className="absolute left-0 top-[6px] md:top-0 flex h-[11px] w-[11px] items-center justify-center rounded-full border dark:border-white/30 border-zinc-400">
        <motion.span {...fill} transition={{ delay, duration: 0.3 }} className="h-[5px] w-[5px] rounded-full bg-blue-400" />
      </span>
      {i < stages.length - 1 && (
        <span className="absolute left-[5px] top-[23px] h-[calc(100%+1px)] w-px overflow-hidden dark:bg-white/10 bg-zinc-200 md:left-[17px] md:top-[5px] md:h-px md:w-[calc(100%+1px)]">
          <motion.span {...fill} transition={{ delay: delay + 0.2, duration: 0.4 }} style={{ originX: 0, originY: 0 }} className="absolute inset-0 bg-blue-400/70" />
        </span>
      )}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        {...inView}
        transition={{ delay: delay + 0.1, duration: 0.5 }}
        className="flex-1 rounded-2xl border p-6 transition-all duration-300 dark:border-white/10 border-zinc-200 hover:border-blue-400/50 hover:-translate-y-0.5"
      >
        <p className={label}><span className="text-blue-600 dark:text-blue-400">{String(i + 1).padStart(2, '0')}</span> / {s[0]}</p>
        <h4 className="mt-3 text-lg font-semibold dark:text-white text-black">{s[1]}</h4>
        <p className="mt-2 text-xs md:text-sm leading-relaxed dark:text-zinc-400 text-zinc-600">{s[2]}</p>
        <p className="mt-4 text-xs font-semibold dark:text-zinc-300 text-zinc-700"><span className="text-blue-600 dark:text-blue-400">→</span> {s[3]}</p>
      </motion.div>
    </div>
  );
}

export default function AboutCool({
  isDark,
  themeMode,
  onProfileClick,
}: {
  isDark: boolean;
  themeMode?: string;
  onProfileClick?: () => void;
}): React.JSX.Element {
  const [profileImage, setProfileImage] = useState('/6.png');

  useEffect(() => {
    if (themeMode === 'system') {
      setProfileImage('/pv-gamified.png');
    } else if (themeMode === 'light' || !isDark) {
      setProfileImage('/pv.png');
    } else {
      // dark theme
      setProfileImage('/pv-gamified.png');
    }
  }, [themeMode, isDark]);

  return (
    <section id="about" className="py-28 px-6 md:px-12 lg:px-24 dark:bg-transparent relative overflow-hidden">

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-blue-600/80 dark:text-blue-400/70">
            About Me 
          </p>
          <h2 className="flex items-center gap-3 font-serif text-4xl font-light md:text-6xl dark:text-white text-black mb-4 no-underline">
            Who I Am
            
          </h2>
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

              <div className="relative w-fit">
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
                <div className="absolute inset-0 rounded-full pointer-events-none
                  dark:ring-1 dark:ring-white/10 ring-1 ring-black/5" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative -mt-3 flex -rotate-[10deg]"
              >
                <img
                  src="/pv_sign.png"
                  alt="Signature"
                  className="w-60 object-contain opacity-70 dark:invert dark:opacity-50"
                />
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <div>
              <p className="text-xs md:text-sm leading-relaxed dark:text-zinc-400 text-zinc-600">
                I'm  <strong className="dark:text-white text-zinc-800">Priyanshu Vijay</strong>, a Full-Stack Software Engineer passionate about building intelligent, data-driven applications working at the intersection of predictive modeling, AI full-stack architecture and user-centric interfaces.
              </p>
            </div>
            <div>
              <p className="text-xs md:text-sm leading-relaxed dark:text-zinc-400 text-zinc-600">
               I develop end-to-end solutions using Next.js, FastAPI and PostgreSQL, integrating AI capabilities through platforms like OpenAI and Grok. My expertise spans Machine Learning, Deep Learning, Predictive Modeling, and Feature Engineering, with hands-on experience in real-world data analysis and predictive systems achieving approximately 89% model accuracy.
              </p>
            </div>
            <div>
              <p className="text-xs md:text-sm leading-relaxed dark:text-zinc-400 text-zinc-600">
               Beyond traditional ML, I'm exploring the evolving world of LLMs, Transformers, RAG architectures, Vector Embeddings and Agentic AI. I also work with modern infrastructure and deployment technologies, including Docker and Kubernetes, to turn intelligent prototypes into practical applications.
              </p>
            </div>
            <div>
              <p className="text-xs md:text-sm leading-relaxed dark:text-zinc-400 text-zinc-600">
                I'm driven by curiosity, My philosophy is simple: Build with purpose. Engineer with intelligence. Then make it beautiful.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <motion.a
                href="https://docs.google.com/document/d/1dU8dJlBS6JWsHmSSNptbHJuFgnGopdwDu06hMEQ_2B0/preview"
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-link-button w-fit flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 font-semibold
                  bg-transparent dark:bg-transparent dark:text-zinc-300 text-zinc-700
                  transition-all duration-300"
              >
                CV <FaDownload size={16} />
              </motion.a>
              <motion.a
                href="#projects"
                className="portfolio-link-button w-fit flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 font-semibold
                  bg-transparent dark:bg-transparent dark:text-zinc-300 text-zinc-700
                  transition-all duration-300"
              >
                Explore My Work →
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} {...inView} transition={{ duration: 0.5 }} className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <h3 className="text-lg md:text-xl font-semibold dark:text-white text-black">How I Work</h3>
          <p className={label}>data → model → interface → canvas</p>
        </motion.div>
        <div className="grid gap-y-6 md:grid-cols-4 md:gap-x-6 md:gap-y-0">
          {stages.map((s, i) => <Stage key={s[0]} s={s} i={i} />)}
        </div>

        <StatStrip
          className="mt-16"
          items={[
            { label: 'Internships', value: '3+' },
            { label: 'Hackathons', value: '2+' },
            { label: 'Projects Built', value: '15+' },
            { label: 'Technologies', value: '20+' },
          ]}
        />
      </div>
    </section>
  );
}