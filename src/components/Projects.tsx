'use client';

import React, { useRef, useState } from 'react';

interface Project {
  title: string;
  desc: string;
  tech: string[];
  url: string;
  img: string;
  code: string;
  type: string;
}

const PROJECTS_DATA: Project[] = [
  {
    title: "MLOps Pipeline - Predictive Book Analytics",
    desc: "An automated Python pipeline that harvests web data, trains an ensemble ML model, and exposes a real-time CLI for predictive inference.",
    tech: ["Python", "Scikit-Learn", "Request API", "BeautifulSoup4", "LXML", "joblib"],
    url: 'https://github.com/Butkii025/bibliophile-data-extractor',
    img: 'project-img/extractor_pipeline.png',
    code: 'https://github.com/Butkii025/bibliophile-data-extractor',
    type: 'MLOps / Data Eng.',
  },
  {
    title: "Xela_Arcade",
    desc: "A Next-Gen Library of Custom-Classic Games with Core Frameworks and Algorithms (chess-is-best)",
    tech: ["JavaScript", "TypeScript", "React", "Next.js", "Framer Motion", "Lucide React"],
    url: 'https://xela-arcade.netlify.app/',
    img: 'project-img/Xela_Arcade.png',
    code: 'https://github.com/Butkii025/Xela_Arcade',
    type: 'WEB / AI-BOT',
  },
  {
    title: "Personal Portfolio",
    desc: "Developed an optimized and responsive personal space to showcase my work.",
    tech: ["Next.js", "React", "Tailwind CSS", "Turbo Pack", "SmoothCursor"],
    url: 'https://p-vijay.vercel.app/',
    img: 'project-img/portfolio.png',
    code: 'https://github.com/Butkii025/my-portfolio',
    type: 'WEB',
  },
  {
    title: "Craft-Greet",
    desc: "Custom or predefined direct device downloads. Personalized cards with custom images/message.",
    tech: ["HTML5", "JS"],
    url: 'https://butkii025.github.io/Craft-Greet/',
    img: 'project-img/craftgreet.png',
    code: 'https://github.com/Butkii025/Craft-Greet',
    type: 'WEB',
  },
  {
    title: "GPA Calculator",
    desc: "Allows users to calculate their GPA by subject grade points and credits.",
    tech: ["HTML5", "JS"],
    url: 'https://butkii025.github.io/SGPA-calculator/',
    img: 'project-img/clgplusminus.png',
    code: 'https://github.com/Butkii025/SGPA-calculator',
    type: 'WEB',
  },
];

function useTiltCard(strength = 10) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `perspective(800px) rotateX(${-(y/rect.height)*strength}deg) rotateY(${(x/rect.width)*strength}deg) scale3d(1.02,1.02,1.02)`;
    const glow = el.querySelector('.card-glow') as HTMLElement;
    if (glow) {
      glow.style.background = `radial-gradient(circle at ${50+(x/rect.width)*60}% ${50+(y/rect.height)*60}%, rgba(96,165,250,0.15), transparent 70%)`;
      glow.style.opacity = '1';
    }
  };

  const onMouseLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    const glow = el.querySelector('.card-glow') as HTMLElement;
    if (glow) glow.style.opacity = '0';
  };

  return { ref, onMouseMove, onMouseLeave };
}

function ProjectCard({
  project, isActive, onMouseEnter,
  onMouseLeave: onCardLeave, onExplore,
}: {
  project: Project;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onExplore: (e: React.MouseEvent<HTMLAnchorElement>, title: string) => void;
}) {
  const tilt = useTiltCard(10);

  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={() => { tilt.onMouseLeave(); onCardLeave(); }}
      style={{ transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
      className="group relative rounded-3xl overflow-hidden w-full h-full
        dark:bg-gradient-to-br dark:from-white/5 dark:to-white/0 dark:border dark:border-white/10
        dark:hover:border-blue-400/50 dark:hover:shadow-blue-500/10
        bg-gradient-to-br from-zinc-50 to-white border border-zinc-200
        hover:border-blue-400/50 hover:shadow-blue-500/10
        backdrop-blur-sm hover:shadow-2xl flex flex-col justify-between min-h-[480px]"
    >
      
      <div className="card-glow absolute inset-0 pointer-events-none rounded-3xl z-10 transition-opacity duration-300" style={{ opacity: 0 }} />

      {/* Image */}
      <div className="w-full flex flex-col">
        <div className="h-48 sm:h-56 md:h-60 w-full overflow-hidden relative shrink-0
          dark:bg-gradient-to-br dark:from-zinc-700 dark:via-zinc-900 dark:to-black
          bg-gradient-to-br from-zinc-200 via-zinc-100 to-white">
          <img
            src={project.img}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
          />
          <div className="absolute inset-0 dark:bg-zinc-950/20 bg-white/10 transition-opacity duration-500 group-hover:opacity-0" />
        
          <span className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md
            dark:bg-zinc-900/80 dark:border dark:border-zinc-700 dark:text-zinc-400
            bg-white/80 border border-zinc-200 text-zinc-500">
            {project.type}
          </span>
        </div>

        <div className="p-5 md:p-6 flex-1 min-w-0">
          <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight transition-colors duration-300
            whitespace-normal md:truncate md:group-hover:whitespace-normal
            dark:text-white text-zinc-800 group-hover:text-blue-400">
            {project.title}
          </h3>

          <div
            style={{
              transition: 'opacity 0.45s cubic-bezier(0.25,1,0.5,1), max-height 0.55s cubic-bezier(0.25,1,0.5,1)',
              opacity: isActive ? 1 : 0,
              maxHeight: isActive ? '8rem' : '0px',
              overflow: 'hidden',
            }}
            className="leading-relaxed text-sm md:text-base dark:text-zinc-400 text-zinc-500"
          >
            {project.desc}
          </div>
        </div>
      </div>

      <div
        style={{
          transition: 'opacity 0.4s ease 0.1s, max-height 0.55s cubic-bezier(0.25,1,0.5,1)',
          opacity: isActive ? 1 : 0,
          maxHeight: isActive ? '16rem' : '0px',
          overflow: 'hidden',
        }}
        className="px-5 md:px-6 pb-5 md:pb-6 w-full shrink-0"
      >
        <div className="flex flex-wrap gap-1.5 mb-4 text-xs">
          {project.tech.map((techItem, i) => (
            <span key={i} className="px-2 py-0.5 rounded-md whitespace-nowrap
              dark:bg-zinc-900/80 dark:border dark:border-zinc-800/80 dark:text-zinc-400
              bg-zinc-100 border border-zinc-200 text-zinc-600">
              {techItem}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          <a href={project.url} target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center" onClick={(e) => onExplore(e, project.title)}>
            <button className="w-full px-3 py-2.5 text-xs md:text-sm font-medium rounded-xl transition duration-200 cursor-pointer
              dark:border dark:border-zinc-800 dark:text-white dark:hover:bg-white/10 dark:active:bg-blue-400
              border border-zinc-300 text-zinc-700 hover:bg-zinc-100 active:bg-blue-400">
              Preview
            </button>
          </a>
          <a href={project.code} target="_blank" rel="noopener noreferrer" className="flex-1 text-center">
            <button className="w-full px-3 py-2.5 text-xs md:text-sm font-medium rounded-xl transition duration-200 cursor-pointer
              dark:border dark:border-zinc-800 dark:text-white dark:hover:bg-white/10 dark:active:bg-blue-400
              border border-zinc-300 text-zinc-700 hover:bg-zinc-100 active:bg-blue-400">
              Code
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

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
    <section id="projects" className="py-28 px-6 overflow-hidden dark:bg-transparen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="uppercase tracking-[0.2em] mb-4 dark:text-zinc-500 text-zinc-500">Projects</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight dark:text-white text-black">
            Featured Work & Experiences
          </h2>
        </div>

        <div className="
          flex gap-4 pb-4
          overflow-x-auto snap-x snap-mandatory scroll-smooth
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
              <div
                key={index}
                className="snap-center shrink-0"
                style={{
                  transition: 'width 0.65s cubic-bezier(0.34,1.4,0.64,1)',
                  width: isActive ? 'min(420px, 78vw)' : 'min(200px, 56vw)',
                  minWidth: isActive ? 'min(420px, 78vw)' : 'min(200px, 56vw)',
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
          ← hover / swipe to explore →
        </p>
      </div>
    </section>
  );
}