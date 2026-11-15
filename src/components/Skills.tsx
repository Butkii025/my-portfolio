'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { FaBrain, FaChartLine, FaCode, FaServer } from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTypescript,
  SiReact,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiScikitlearn,
  SiTensorflow,
  SiHuggingface,
  SiPandas,
  SiNumpy,
  SiFastapi,
  SiDocker,
  SiVercel,
  SiStreamlit,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiGit,
  SiGithub,
  SiOpencv,
  SiJupyter,
  SiMysql,
  SiFirebase,
  SiHtml5,
  SiCss,
} from 'react-icons/si';
import type { IconType } from 'react-icons';
import { SKILL_CATEGORIES } from '@/src/Data/skilldata';
import type { SkillCategory } from '@/src/Data/skilldata';

const engineeringPillars = [
  {
    number: '01',
    title: 'Full-Stack Engineering',
    description: 'End-to-end web applications, APIs, and data-backed product experiences.',
    technologies: 'Next.js · TypeScript · React · PostgreSQL',
    icon: FaCode,
  },
  {
    number: '02',
    title: 'AI & Machine Learning',
    description: 'Predictive models and intelligent decision systems built for real use cases.',
    technologies: 'PyTorch · scikit-learn · XGBoost · Transformers',
    icon: FaBrain,
  },
  {
    number: '03',
    title: 'Data Science & LLM Applications',
    description: 'Turning analysis and model capabilities into useful, AI-powered product features.',
    technologies: 'Python · Pandas · Statistical Analysis · Gemini',
    icon: FaChartLine,
  },
  {
    number: '04',
    title: 'AI Infrastructure & Delivery',
    description: 'Serving models and shipping applications through practical deployment workflows.',
    technologies: 'FastAPI · Docker · Vercel · Streamlit Cloud',
    icon: FaServer,
  },
];

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return isDesktop;
}

const technologyIcons: Record<string, IconType> = {
  'next.js': SiNextdotjs,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  react: SiReact,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  python: SiPython,
  pytorch: SiPytorch,
  'scikit-learn': SiScikitlearn,
  sklearn: SiScikitlearn,
  tensorflow: SiTensorflow,
  transformers: SiHuggingface,
  huggingface: SiHuggingface,
  pandas: SiPandas,
  numpy: SiNumpy,
  opencv: SiOpencv,
  jupyter: SiJupyter,
  fastapi: SiFastapi,
  docker: SiDocker,
  vercel: SiVercel,
  streamlit: SiStreamlit,
  javascript: SiJavascript,
  tailwindcss: SiTailwindcss,
  'tailwind css': SiTailwindcss,
  'node.js': SiNodedotjs,
  nodejs: SiNodedotjs,
  mongodb: SiMongodb,
  git: SiGit,
  github: SiGithub,
  mysql: SiMysql,
  firebase: SiFirebase,
  html: SiHtml5,
  html5: SiHtml5,
  css: SiCss,
  css3: SiCss,
};

const getTechnologyIcon = (skill: string): IconType => {
  const normalized = skill.toLowerCase().trim();
  return technologyIcons[normalized] ?? FaCode;
};

function SkillPanel({
  category,
  index,
  active,
  isDesktop,
  onActivate,
}: {
  category: SkillCategory;
  index: number;
  active: boolean;
  isDesktop: boolean;
  onActivate: () => void;
}) {
  const glowRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const number = String(index + 1).padStart(2, '0');
  const skills = useMemo(() => Array.from(new Set(category.skills)), [category.skills]);
  const collapsedDesktop = isDesktop && !active;

  const moveGlow = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = glowRef.current;
    if (!el) return;
    const r = e.currentTarget.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - r.left}px`);
    el.style.setProperty('--y', `${e.clientY - r.top}px`);
  };

  const enter = () => {
    if (!isDesktop || active) return;
    hoverTimer.current = setTimeout(onActivate, 90); // hover intent, avoids flicker while moving across
  };
  const leave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  };

  return (
    <div
      onMouseEnter={enter}
      onMouseLeave={leave}
      onMouseMove={active ? moveGlow : undefined}
      style={{ flexGrow: active ? 6 : 1 }}
      className="relative flex flex-col overflow-hidden lg:basis-0 transition-[flex-grow] duration-500 ease-out
        border-t first:border-t-0 lg:border-t-0 lg:border-l lg:first:border-l-0
        dark:border-white/15 border-zinc-300"
    >
      {/* accent line + cursor glow (active only) */}
      <motion.div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-0.5 bg-blue-400 origin-left"
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: active ? 1 : 0,
          background:
            'radial-gradient(420px circle at var(--x, 50%) var(--y, 20%), rgba(96,165,250,0.12), transparent 60%)',
        }}
      />

      {/* HEADER */}
      {collapsedDesktop ? (
        <button
          type="button"
          onClick={onActivate}
          onFocus={onActivate}
          aria-expanded={false}
          aria-controls={`skills-${category.id}`}
          className="group relative z-10 flex w-full flex-1 flex-col items-center justify-between py-6"
        >
          <span className="font-mono text-xs text-blue-600 dark:text-blue-400">{number}</span>
          <span className="rotate-180 whitespace-nowrap text-lg font-semibold tracking-wide dark:text-zinc-400 text-zinc-600 transition-colors group-hover:text-black dark:group-hover:text-white [writing-mode:vertical-rl]">
            {category.title}
          </span>
          <span className="text-xl opacity-70 transition-opacity group-hover:opacity-100">{category.icon}</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={onActivate}
          aria-expanded={active}
          aria-controls={`skills-${category.id}`}
          className="relative z-10 flex w-full items-center gap-4 px-5 py-4 text-left lg:px-7 lg:pt-6 lg:pb-3"
        >
          <span className="font-mono text-xs text-blue-600 dark:text-blue-400">{number}</span>
          <span className="text-xl">{category.icon}</span>
          <span className="flex-1 min-w-0">
            <span
              className={`block text-sm font-semibold lg:text-2xl lg:font-bold ${
                active ? 'dark:text-white text-black' : 'dark:text-zinc-300 text-zinc-700'
              }`}
            >
              {category.title}
            </span>
            <span className="block text-xs dark:text-zinc-500 text-zinc-500 lg:hidden">
              {skills.length} skills
            </span>
          </span>
          <FiChevronDown
            className={`h-4 w-4 shrink-0 dark:text-zinc-400 text-zinc-500 transition-transform duration-300 lg:hidden ${
              active ? 'rotate-180' : ''
            }`}
          />
        </button>
      )}

      {/* CONTENT */}
      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            key="content"
            id={`skills-${category.id}`}
            role="region"
            initial={isDesktop ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={isDesktop ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={isDesktop ? { opacity: 0, transition: { duration: 0 } } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, delay: isDesktop ? 0.2 : 0 }}
            className="relative z-10 overflow-hidden"
          >
            <div className="px-5 pb-6 lg:min-w-[24rem] lg:px-7">
              <p className="mb-5 max-w-md text-xs md:text-sm dark:text-zinc-400 text-zinc-600">{category.description}</p>

              {/* metrics: plain numbers, no boxes */}
              <div className="mb-5 flex flex-wrap gap-y-3">
                {category.metrics.map((m, i) => (
                  <div
                    key={m.label}
                    className={`pr-6 ${i > 0 ? 'sm:border-l sm:pl-6 dark:border-white/15 border-zinc-300' : ''}`}
                  >
                    <p className="text-2xl font-bold leading-none dark:text-white text-black">{m.value}</p>
                    <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-widest dark:text-zinc-500 text-zinc-600">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* TECHNOLOGY ICONS */}
              <div className="flex flex-wrap gap-2.5">
                {skills.map((skill, i) => {
                  const TechIcon = getTechnologyIcon(skill);

                  return (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: (isDesktop ? 0.25 : 0.1) + i * 0.025,
                        duration: 0.3,
                      }}
                      className="group inline-flex items-center gap-2 rounded-md border px-3 py-2
                        dark:border-white/10 border-zinc-200
                        dark:bg-white/[0.02] bg-zinc-50
                        transition-all duration-300
                        hover:border-blue-400/50 hover:bg-blue-400/[0.06]"
                    >
                      <TechIcon
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-blue-400 transition-transform duration-300 group-hover:scale-110"
                      />

                      <span className="text-xs font-medium whitespace-nowrap dark:text-zinc-300 text-zinc-700">
                        {skill}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Skills(): React.JSX.Element {
  const [activeId, setActiveId] = useState<string>(SKILL_CATEGORIES[0].id);
  const isDesktop = useIsDesktop();

  return (
    <section id="skills" className="py-28 px-6 md:px-12 lg:px-24 dark:bg-transparent text-zinc-900 dark:text-zinc-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-blue-400/80 dark:text-blue-400/70">Skills</p>
            <h2 className="flex items-center gap-3 font-serif text-4xl font-light md:text-6xl dark:text-white text-black mb-4">
              Technical Expertise
            </h2>
            <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl">
              A comprehensive toolkit built through real-world projects and continuous learning.
            </p>
          </div>
          <p className="font-mono text-xs dark:text-zinc-500 text-zinc-500">
            {SKILL_CATEGORIES.length} stacks
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:min-h-[27rem] lg:flex-row border-y dark:border-white/15 border-zinc-300"
        >
          {SKILL_CATEGORIES.map((cat, i) => (
            <SkillPanel
              key={cat.id}
              category={cat}
              index={i}
              active={activeId === cat.id}
              isDesktop={isDesktop}
              onActivate={() => setActiveId(cat.id)}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <h3 className="mb-8 text-lg md:text-xl font-semibold dark:text-white text-black">
            How I Build
          </h3>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {engineeringPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.number}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  whileHover={{ y: -4 }}
                  className="border-t pt-4 transition-colors duration-300 hover:border-blue-400 dark:border-white/15 border-zinc-300"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-mono text-xs tracking-widest dark:text-zinc-500 text-zinc-500">
                      {pillar.number} /
                    </span>
                    <Icon aria-hidden="true" className="text-lg dark:text-blue-400 text-blue-600" />
                  </div>
                  <h4 className="mb-2 text-lg font-semibold dark:text-white text-black">
                    {pillar.title}
                  </h4>
                  <p className="mb-4 text-xs md:text-sm leading-relaxed dark:text-zinc-400 text-zinc-600">
                    {pillar.description}
                  </p>
                  <p className="text-xs leading-relaxed dark:text-zinc-500 text-zinc-500">
                    {pillar.technologies}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}