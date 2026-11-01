'use client';

import React, { useState } from 'react';
import { PROJECTS_DATA } from '@/src/Data/projectsData';
import ProjectCard from '@/src/components/ProjectCard';

export default function Projects(): React.JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>, title: string) => {
    if (title === "Personal Portfolio") {
      e.preventDefault();
      alert("वाह वाह 👏! क्या अर्थ है इसका, अभी तो पोर्टफोलियो ही देखा जा रहा है न 🤨 ?? कोई बात नहीं, अब फिर से प्रारंभ करो ✌️ आपका दिन मंगलमय हो 🙏");
      window.open(e.currentTarget.href, '_blank', 'noopener,noreferrer');
    }
  };

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', 'Full Stack', 'Ai Application', 'Machine Learning', 'Research & Analytics'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => {
        if (selectedCategory === 'Research & Analytics') {
          return p.type.toLowerCase().includes('data') || p.type.toLowerCase().includes('research') || p.type.toLowerCase().includes('dashboard');
        }
        return p.type.toLowerCase().includes(selectedCategory.toLowerCase());
      });

  return (
    <section id="projects" className="py-28 px-6 md:px-12 lg:px-24 dark:bg-transparent text-zinc-900 dark:text-zinc-100">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="uppercase tracking-[0.2em] mb-4 text-zinc-500 dark:text-zinc-500 text-xs font-semibold">Projects</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
            <div>
              <h2 className="flex items-center gap-3 text-5xl md:text-6xl font-bold dark:text-white text-black mb-3">
                Featured Work &amp; Experiences
              </h2>
              <p className="text-base dark:text-zinc-400 text-zinc-600 max-w-2xl">
                Projects where data science, machine learning models, and modern UI design come together.
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setActiveIndex(null); }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105'
                      : 'dark:bg-white/5 dark:text-zinc-400 dark:hover:text-white bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="
          md:hidden
          flex gap-4 pb-4
          overflow-x-auto snap-x snap-mandatory scroll-smooth
          [&::-webkit-scrollbar]:h-1.5
          dark:[&::-webkit-scrollbar-track]:bg-zinc-900
          dark:[&::-webkit-scrollbar-thumb]:bg-zinc-700
          [&::-webkit-scrollbar-track]:bg-zinc-100
          [&::-webkit-scrollbar-thumb]:bg-zinc-300
          [&::-webkit-scrollbar-thumb]:rounded-full
        ">
          {filteredProjects.map((project, index) => (
            <div key={index} className="snap-center shrink-0 w-[78vw]">
              <ProjectCard
                project={project}
                isActive={activeIndex === index}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onExplore={handleExploreClick}
              />
            </div>
          ))}
        </div>

        <div className="
          hidden md:flex gap-4 pb-4
          overflow-x-auto scroll-smooth
          [&::-webkit-scrollbar]:h-1.5
          dark:[&::-webkit-scrollbar-track]:bg-zinc-900
          dark:[&::-webkit-scrollbar-thumb]:bg-zinc-700
          [&::-webkit-scrollbar-track]:bg-zinc-100
          [&::-webkit-scrollbar-thumb]:bg-zinc-300
          [&::-webkit-scrollbar-thumb]:rounded-full
        ">
          {filteredProjects.map((project, index) => {
            const isActive = activeIndex === index;
            return (
              <div key={index} className="shrink-0"
                style={{
                  transition: 'width 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
                  width: isActive ? '390px' : '220px',
                  minWidth: isActive ? '390px' : '220px',
                }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <ProjectCard
                  project={project}
                  isActive={isActive}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  onExplore={handleExploreClick}
                />
              </div>
            );
          })}
        </div>

        <p className="mt-3 text-center text-xs dark:text-zinc-600 text-zinc-400">
          ← hover to expand / swipe to explore →
        </p>
      </div>
    </section>
  );
}