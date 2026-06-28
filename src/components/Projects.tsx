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

  return (
    <section id="projects" className="py-28 px-6 overflow-hidden dark:bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="uppercase tracking-[0.2em] mb-4 text-zinc-500 dark:text-zinc-500 text-xs font-semibold">Projects</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight dark:text-white text-black">
            Featured Work & Experiences
          </h2>
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
          {PROJECTS_DATA.map((project, index) => (
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

        {/* Desktop Interactive Expanding Accordion Layout */}
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
          {PROJECTS_DATA.map((project, index) => {
            const isActive = activeIndex === index;
            return (
              <div key={index} className="shrink-0"
                style={{
                  transition: 'width 0.6s cubic-bezier(0.34,1.4,0.64,1)',
                  width: isActive ? '380px' : '180px',
                  minWidth: isActive ? '380px' : '180px',
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