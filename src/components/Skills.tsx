'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILL_CATEGORIES, SkillCategory } from '@/src/Data/skilldata';

function SkillChip({ skill }: { skill: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.08 }}
      className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap
        dark:bg-blue-500/20 dark:border dark:border-blue-400/50 dark:text-blue-200
        bg-blue-50 border border-blue-200 text-blue-700
        backdrop-blur-sm cursor-default transition-shadow duration-200 hover:shadow-sm"
    >
      {skill}
    </motion.div>
  );
}

function CategoryNavItem({ category, isActive, onHover }: { category: SkillCategory; isActive: boolean; onHover: () => void }) {
  return (
    <motion.button
      onHoverStart={onHover}
      whileHover={{ x: 8 }}
      className={`w-full text-left px-5 py-2.5 rounded-xl transition-all duration-300 relative group border
        ${isActive
          ? 'dark:bg-blue-500/30 dark:border-blue-400/60 bg-blue-50/70 border-blue-200 shadow-sm'
          : 'dark:hover:bg-white/5 hover:bg-zinc-50 border-transparent'
        }`}
    >
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-full"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}

      <div className="flex items-center gap-3 relative z-10">
        <span className="text-lg">{category.icon}</span>
        <div className="flex-1">
          <p className={`font-semibold text-sm ${isActive ? 'dark:text-blue-100 text-blue-700' : 'dark:text-zinc-300 text-zinc-700'}`}>
            {category.title}
          </p>
          <p className="text-xs dark:text-zinc-600 text-zinc-500 mt-0.5">{category.skills.length} skills</p>
        </div>
      </div>

      <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
        dark:bg-blue-500/10 bg-blue-500/5 pointer-events-none`} />
    </motion.button>
  );
}

export default function Skills(): React.JSX.Element {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>(SKILL_CATEGORIES[0]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section id="skills" className="py-28 px-6 md:px-12 lg:px-24 dark:bg-transparent text-zinc-900 dark:text-zinc-100">
      <div className="max-w-7xl mx-auto">

        <div className="mb-16">
          <p className="uppercase tracking-[0.2em] mb-4 text-zinc-500 dark:text-zinc-500 text-xs font-semibold">Skills</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-3">
            Technical Expertise
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
            A comprehensive toolkit built through real-world projects and continuous learning.
          </p>
        </div>

        <div className="hidden md:grid grid-cols-3 gap-8">
          {/* Left Sidebar - Compact Navigation */}
          <div className="space-y-2 h-fit sticky top-24">
            {SKILL_CATEGORIES.map((cat) => (
              <CategoryNavItem
                key={cat.id}
                category={cat}
                isActive={activeCategory.id === cat.id}
                onHover={() => setActiveCategory(cat)}
              />
            ))}
          </div>

          {/* Right Container - Sticky Content */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
            className="col-span-2 relative group sticky top-24 h-fit"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative p-8 rounded-3xl backdrop-blur-xl overflow-hidden
                  dark:bg-gradient-to-br dark:from-white/5 dark:to-white/0 dark:border dark:border-white/10
                  bg-gradient-to-br from-zinc-50 to-white border border-zinc-200
                  dark:hover:border-blue-400/50 dark:hover:shadow-blue-500/10
                  hover:border-blue-400/50 hover:shadow-blue-500/10
                  transition-all duration-500"
              >
                <div
                  className="absolute -inset-20 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(59,130,246,0.15) 0%, transparent 50%)`,
                  }}
                />

                <div className="relative z-10">
                  <div className="mb-8">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-3xl font-bold dark:text-white text-zinc-900 mb-2">
                          {activeCategory.title}
                        </h3>
                        <p className="text-base dark:text-zinc-400 text-zinc-600">
                          {activeCategory.description}
                        </p>
                      </div>
                      <span className="text-5xl opacity-20 select-none">{activeCategory.icon}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {activeCategory.metrics.map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-3 rounded-xl dark:bg-white/5 bg-white border dark:border-white/10 border-zinc-200 shadow-sm"
                      >
                        <p className="text-xs dark:text-zinc-500 text-zinc-500 uppercase tracking-wide mb-1 font-semibold">
                          {m.label}
                        </p>
                        <p className="text-2xl font-bold dark:text-blue-400 text-blue-600">
                          {m.value}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-widest dark:text-zinc-600 text-zinc-500 mb-4 font-semibold">
                      Core Skills
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <AnimatePresence>
                        {activeCategory.skills.map((skill) => (
                          <SkillChip key={skill} skill={skill} />
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex overflow-x-auto gap-2 pb-4 mb-6 -mx-6 px-6 snap-x scroll-smooth">
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all snap-center shadow-sm
                  ${activeCategory.id === cat.id
                    ? 'dark:bg-blue-500 dark:text-white bg-blue-600 text-white'
                    : 'dark:bg-white/10 dark:text-zinc-300 bg-zinc-100 text-zinc-600'
                  }`}
              >
                {cat.icon} {cat.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-2xl dark:bg-white/5 bg-zinc-50 border dark:border-white/10 border-zinc-200 shadow-sm"
            >
              <h3 className="text-2xl font-bold dark:text-white text-zinc-900 mb-2">
                {activeCategory.title}
              </h3>
              <p className="text-sm dark:text-zinc-400 text-zinc-600 mb-6">
                {activeCategory.description}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {activeCategory.metrics.map((m, i) => (
                  <div key={i} className="p-2 rounded-lg dark:bg-white/5 bg-white border dark:border-white/10 border-zinc-200/60 shadow-sm">
                    <p className="text-[10px] dark:text-zinc-500 text-zinc-500 uppercase tracking-wide mb-0.5 font-semibold">
                      {m.label}
                    </p>
                    <p className="text-lg font-bold dark:text-blue-400 text-blue-600">
                      {m.value}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-xs uppercase tracking-widest dark:text-zinc-600 text-zinc-500 mb-3 font-semibold">
                Core Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {activeCategory.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 rounded-full text-xs font-medium shadow-sm
                    dark:bg-blue-500/20 dark:border dark:border-blue-400/50 dark:text-blue-200
                    bg-blue-50 border border-blue-200 text-blue-700">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}