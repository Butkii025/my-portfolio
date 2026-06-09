'use client';

import React, { useRef } from 'react';
import { FaPaintBrush } from 'react-icons/fa';
import { FiMonitor, FiServer, FiCpu, FiBarChart2 } from 'react-icons/fi';

interface SkillCategory {
  title: string;
  icon: React.JSX.Element;
  technologies: string[];
}

function useTiltDiv(strength = 8) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / rect.height) * strength;
    const rotateY = (x / rect.width) * strength;
    el.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`;
    const glow = el.querySelector('.card-glow') as HTMLElement;
    if (glow) {
      const gx = 50 + (x / rect.width) * 60;
      const gy = 50 + (y / rect.height) * 60;
      glow.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(96,165,250,0.15), transparent 70%)`;
      glow.style.opacity = '1';
    }
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
    const glow = el.querySelector('.card-glow') as HTMLElement;
    if (glow) glow.style.opacity = '0';
  };

  return { ref, onMouseMove, onMouseLeave };
}

function SkillCard({ category }: { category: SkillCategory }) {
  const tilt = useTiltDiv(8);

  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={{ transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
      className="group relative p-6 rounded-2xl backdrop-blur-sm transition-shadow duration-500 hover:shadow-2xl cursor-default
        dark:bg-gradient-to-br dark:from-white/5 dark:to-white/0 dark:border dark:border-white/10 dark:hover:border-blue-400/50 dark:hover:shadow-blue-500/10
        bg-gradient-to-br from-zinc-50 to-white border border-zinc-200 hover:border-blue-400/50 hover:shadow-blue-500/10"
    >
     
      <div
        className="card-glow absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
        style={{ opacity: 0 }}
      />

      <div className="relative z-10 flex items-center gap-3 mb-5">
        <span className="text-3xl">{category.icon}</span>
        <h3 className="text-2xl font-bold transition duration-300
          dark:text-white dark:group-hover:text-blue-400
          text-zinc-800 group-hover:text-blue-400">
          {category.title}
        </h3>
      </div>

      <div className="relative z-10 flex flex-wrap gap-2">
        {category.technologies.map((tech, i) => (
          <span
            key={i}
            className="px-3 py-1 text-xs font-medium rounded-full transition duration-300
              dark:bg-zinc-900 dark:border dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-blue-400/60 dark:hover:text-white
              bg-zinc-100 border border-zinc-200 text-zinc-600 hover:border-blue-400/60 hover:text-zinc-900"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills(): React.JSX.Element {
  const skills: Record<string, SkillCategory> = {
    frontEnd: {
      title: 'Front-End',
      icon: <FiMonitor size={24} className="text-blue-400" />,
      technologies: ['React.js', 'Next.js', 'HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'Animations'],
    },
    backEnd: {
      title: 'Databases & Management',
      icon: <FiServer size={24} className="text-blue-400" />,
      technologies: ['APIs', 'SQL', 'Data Administration', 'Information Management', 'DBMS'],
    },
    aiml: {
      title: 'AI / ML',
      icon: <FiCpu size={24} className="text-blue-400" />,
      technologies: ['Python', 'PyTorch', 'TensorFlow', 'Hugging Face', 'APIs', 'Web Scraping', 'Pandas', 'NumPy', 'Scikit-learn', 'Deep Learning', 'Prompt Engineering'],
    },
    dataAnalytics: {
      title: 'Data Analytics',
      icon: <FiBarChart2 size={24} className="text-blue-400" />,
      technologies: ['SQL', 'Pandas', "PowerBI", 'Excel', 'A/B Testing', 'Data Wrangling', 'EDA'],
    },
    designing: {
      title: 'Designing',
      icon: <FaPaintBrush size={24} className="text-blue-400" />,
      technologies: ['Figma', 'Adobe Express', 'Canva'],
    },
  };

  return (
    <section id="skills" className="py-28 px-6 md:px-12 lg:px-24 dark:bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="uppercase tracking-[0.2em] mb-4 dark:text-zinc-500 text-zinc-500">
            Skills
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight dark:text-white text-black">
            Tools & Technologies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(skills).map((category, index) => (
            <SkillCard key={index} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}