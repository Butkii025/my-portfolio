'use client';

import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { PROJECTS_DATA } from '@/src/Data/projectsData';
import ProjectCard, { Project } from './ProjectCard';
import GradientText from '../ui/GradientText';

const categories = [
  'All',
  'Web Application',
  'Ai Application',
  'Machine Learning',
  'Research & Analytics',
];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Category filtering
  const filteredProjects = useMemo(() => {
    return (PROJECTS_DATA as Project[]).filter((project) => {
      if (selectedCategory === 'All') return true;

      if (selectedCategory === 'Research & Analytics') {
        return /data|research|dashboard|analytics/i.test(project.type);
      }

      return project.type
        .toLowerCase()
        .includes(selectedCategory.toLowerCase());
    });
  }, [selectedCategory]);

  // Safe active index
  const safeIndex = Math.min(
    activeIndex,
    Math.max(filteredProjects.length - 1, 0)
  );

  const activeProject = filteredProjects[safeIndex];

  // Previous and next project previews
  const previousPreview =
    filteredProjects.length > 1
      ? filteredProjects[
          (safeIndex - 1 + filteredProjects.length) %
            filteredProjects.length
        ]
      : null;

  const nextPreview =
    filteredProjects.length > 1
      ? filteredProjects[
          (safeIndex + 1) % filteredProjects.length
        ]
      : null;

  // Navigation
  const nextProject = () => {
    setActiveIndex((prev) =>
      prev >= filteredProjects.length - 1 ? 0 : prev + 1
    );
  };

  const previousProject = () => {
    setActiveIndex((prev) =>
      prev <= 0 ? filteredProjects.length - 1 : prev - 1
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setActiveIndex(0);
  };

  // Personal portfolio alert
  const handleExploreClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    url: string
  ) => {
    if (url.toLowerCase().includes('personal-portfolio')) {
      e.preventDefault();

      alert(
        'वाह वाह 👏! क्या अर्थ है इसका, अभी तो पोर्टफोलियो ही देखा जा रहा है न 🤨 ?? कोई बात नहीं, अब फिर से प्रारंभ करो ✌️ आपका दिन मंगलमय हो 🙏'
      );

      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-transparent px-5 py-20 text-zinc-900 dark:text-zinc-100 md:px-10 lg:px-16 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12 text-left">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-blue-400/80 dark:text-blue-400/70">
            Archive Projects
          </p>

          <h2 className="font-serif text-4xl font-light md:text-6xl">
            A World of Ideas
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            A collection of experiments, ideas and solutions
            built through curiosity and creativity.
          </p>
        </div>

        {/* Category filters */}
        <div className="mb-12 flex flex-wrap justify-center gap-2 md:gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`rounded-full border px-4 py-2 text-xs transition-all duration-300 md:text-sm ${
                selectedCategory === category
                  ? 'border-blue-600/50 bg-blue-600/10 text-blue-700 dark:border-blue-400/50 dark:bg-blue-400/10 dark:text-blue-300'
                  : 'border-zinc-300 text-zinc-600 hover:border-zinc-400 hover:text-zinc-900 dark:border-white/10 dark:text-zinc-400 dark:hover:border-white/30 dark:hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {!filteredProjects.length ? (
          <p className="py-20 text-center text-zinc-600 dark:text-zinc-400">
            No projects found in this category.
          </p>
        ) : (
          <>
            {/* =========================================
                MOBILE VIEW — HORIZONTAL PROJECT CARDS
            ========================================== */}
            <div className="block lg:hidden">
              <div
                className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[11vw] pb-8 pt-3 scrollbar-hide"
                style={{
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={`${project.name}-${index}`}
                    project={project}
                    index={index}
                  />
                ))}
              </div>

              <p className="mt-2 text-center text-xs tracking-widest text-zinc-500 dark:text-zinc-400">
                SWIPE TO EXPLORE
              </p>
            </div>

            {/* =========================================
                DESKTOP VIEW — CINEMATIC IMAGE CAROUSEL
            ========================================== */}
            <div className="hidden lg:block">

              <div className="grid grid-cols-[0.9fr_1.1fr] items-center gap-14 xl:gap-20">

                {/* Left: Image carousel */}
                <div className="min-w-0">

                  <div className="relative mx-auto flex h-[360px] w-full items-center justify-center xl:h-[410px]">

                    {/* Previous project image */}
                    {previousPreview && (
                      <button
                        type="button"
                        onClick={previousProject}
                        aria-label="View previous project"
                        className="absolute left-0 z-10 h-[65%] w-[48%] overflow-hidden rounded-lg opacity-40 blur-[2px] transition-all duration-500 hover:opacity-70 hover:blur-0"
                      >
                        <img
                          src={previousPreview.img}
                          alt={previousPreview.name}
                          className="h-full w-full object-contain"
                        />
                      </button>
                    )}

                    {/* Next project image */}
                    {nextPreview && (
                      <button
                        type="button"
                        onClick={nextProject}
                        aria-label="View next project"
                        className="absolute right-0 z-10 h-[65%] w-[48%] overflow-hidden rounded-lg opacity-40 blur-[2px] transition-all duration-500 hover:opacity-70 hover:blur-0"
                      >
                        <img
                          src={nextPreview.img}
                          alt={nextPreview.name}
                          className="h-full w-full object-contain"
                        />
                      </button>
                    )}

                    {/* Active central image */}
                    <div className="absolute z-20 h-[85%] w-[76%] overflow-hidden rounded-lg border border-zinc-300 bg-zinc-100 shadow-2xl dark:border-white/15 dark:bg-[#111812]">

                      <AnimatePresence mode="wait">
                        <motion.img
                          key={activeProject.img}
                          src={activeProject.img}
                          alt={activeProject.name}
                          initial={{
                            opacity: 0,
                            scale: 0.94,
                            x: 25,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            x: 0,
                          }}
                          exit={{
                            opacity: 0,
                            scale: 0.94,
                            x: -25,
                          }}
                          transition={{
                            duration: 0.45,
                            ease: 'easeInOut',
                          }}
                          className="h-full w-full object-contain"
                        />
                      </AnimatePresence>

                    </div>
                  </div>

                  {/* Active project name */}
                  <AnimatePresence mode="wait">
                    <motion.h3
                      key={activeProject.name}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 text-center font-serif text-2xl font-light leading-tight text-zinc-900 dark:text-zinc-100 md:text-3xl"
                    >
                      {activeProject.name}
                    </motion.h3>
                  </AnimatePresence>

                  {/* Previous / Counter / Next */}
                  <div className="mt-7 flex items-center justify-center gap-6">

                    <button
                      type="button"
                      onClick={previousProject}
                      aria-label="Previous project"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 text-xl text-zinc-600 transition-all duration-300 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:border-white/15 dark:text-zinc-300 dark:hover:border-blue-400 dark:hover:bg-blue-400/10 dark:hover:text-blue-300"
                    >
                      ←
                    </button>

                    <span className="text-xs tabular-nums tracking-[0.2em] text-zinc-600 dark:text-zinc-400">
                      {String(safeIndex + 1).padStart(2, '0')}
                      {' / '}
                      {String(filteredProjects.length).padStart(2, '0')}
                    </span>

                    <button
                      type="button"
                      onClick={nextProject}
                      aria-label="Next project"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 text-xl text-zinc-600 transition-all duration-300 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:border-white/15 dark:text-zinc-300 dark:hover:border-blue-400 dark:hover:bg-blue-400/10 dark:hover:text-blue-300"
                    >
                      →
                    </button>

                  </div>
                </div>

                {/* Right: Project details */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.name}
                    initial={{ opacity: 0, x: 35 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -35 }}
                    transition={{ duration: 0.45 }}
                    className="self-start flex min-w-0 flex-col items-center py-8 text-center"
                  >
                    <span className="mb-5 text-xs uppercase tracking-[0.25em] text-text-blue-400/80 dark:text-blue-400/70">
                      {activeProject.type}
                    </span>

                    <h3 className="font-serif text-4xl font-light leading-tight text-zinc-900 dark:text-zinc-100 xl:text-4xl">
                      {activeProject.title}
                    </h3>

                    {activeProject.focused && (
                      <p className="mt-5 text-sm text-text-blue-400/80 dark:text-blue-400/80">
                        {activeProject.focused}
                      </p>
                    )}

                    <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                      {activeProject.desc}
                    </p>

                    {/* Technologies */}
                    <div className="mt-7 flex flex-wrap justify-center gap-2">
                      {activeProject.tech?.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-zinc-300 px-3 py-1.5 text-xs text-zinc-700 dark:border-white/10 dark:text-zinc-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Project links */}
                    <div className="mt-9 flex flex-wrap justify-center gap-7 text-sm">

                      {activeProject.url && (
                        <a
                          href={activeProject.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) =>
                            handleExploreClick(e, activeProject.url!)
                          }
                          className="border-b border-blue-600/50 pb-1 text-blue-700 transition hover:text-blue-800 dark:border-blue-400/50 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Explore Project ↗
                        </a>
                      )}

                      {activeProject.code && (
                        <a
                          href={activeProject.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border-b border-zinc-300 pb-1 text-zinc-700 transition hover:text-zinc-950 dark:border-white/20 dark:text-zinc-300 dark:hover:text-white"
                        >
                          View Source ↗
                        </a>
                      )}

                    </div>
                  </motion.div>
                </AnimatePresence>

              </div>

              {/* Desktop project indicators */}
              <div className="mt-14 flex justify-center gap-2">
                {filteredProjects.map((project, index) => (
                  <button
                    key={project.name}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Go to project ${index + 1}`}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      safeIndex === index
                        ? 'w-10 bg-blue-400'
                        : 'w-3 bg-zinc-300 hover:bg-zinc-400 dark:bg-white/20 dark:hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

            </div>
          </>
        )}

        {/* Personal Mantra */}
        <div className="mt-24 text-center">

          <div className="mb-6 flex items-center justify-center gap-5">
            <span className="h-px w-16 bg-zinc-300 dark:bg-white/20 md:w-28" />

            <p className="shrink-0 text-xs uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
              Personal Mantra
            </p>

            <span className="h-px w-16 bg-zinc-300 dark:bg-white/20 md:w-28" />
          </div>

          <GradientText
            colors={['#5d94d7', '#a670c6', '#bf9dba']}
            animationSpeed={6}
            className="font-serif text-3xl italic leading-tight sm:text-4xl md:text-5xl lg:text-6xl"
          >
            "Make the logic work first ~ Then make it beautiful"
          </GradientText>

        </div>

      </div>
    </section>
  );
}