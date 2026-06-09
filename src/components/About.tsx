'use client';

import React, { useRef } from 'react';
import { FaStar } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import GradientText from "./ui/GradientText";

interface AboutProps {
  onProfileClick: () => void;
}

interface SemesterMark { sem: string; mark: number; }
interface SchoolDetail  { label: string; value: string | number; }

const semesterMarks: SemesterMark[] = [
  { sem: 'Sem I',   mark: 6.86 },
  { sem: 'Sem II',  mark: 6.36 },
  { sem: 'Sem III', mark: 8.91 },
  { sem: 'Sem IV',  mark: 8.55 },
  { sem: 'Sem V',   mark: 9.64 },
];

const schoolDetails: SchoolDetail[] = [
  { label: 'Stream',           value: 'Science PCM'  },
  { label: 'Best Performance', value: 'Maths (95%)'  },
  { label: 'Marks',            value: '75%'          },
];

const highlights = [
  { label: 'Focus',    value: 'Data Science & ML'         },
  { label: 'Skill', value: 'UI / Frontend Engineering'  },
  { label: 'Tools',    value: 'Python, React'       },
  { label: 'Approach', value: 'Data-driven + Design-first' },
];

function useTilt(strength = 20) {
  const ref = useRef<HTMLDivElement>(null);
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `perspective(500px) rotateX(${-(y/r.height)*strength}deg) rotateY(${(x/r.width)*strength}deg) scale3d(1.05,1.05,1.05)`;
    const g = el.querySelector('.img-glow') as HTMLElement;
    if (g) {
      g.style.background = `radial-gradient(circle at ${50+(x/r.width)*60}% ${50+(y/r.height)*60}%, rgba(96,165,250,0.3), transparent 70%)`;
      g.style.opacity = '1';
    }
  };
  const onMouseLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    const g = el.querySelector('.img-glow') as HTMLElement;
    if (g) g.style.opacity = '0';
  };
  return { ref, onMouseMove, onMouseLeave };
}

function useTiltDiv(strength = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `perspective(600px) rotateX(${-(y/r.height)*strength}deg) rotateY(${(x/r.width)*strength}deg) scale3d(1.02,1.02,1.02)`;
    const g = el.querySelector('.card-glow') as HTMLElement;
    if (g) {
      g.style.background = `radial-gradient(circle at ${50+(x/r.width)*60}% ${50+(y/r.height)*60}%, rgba(96,165,250,0.13), transparent 70%)`;
      g.style.opacity = '1';
    }
  };
  const onMouseLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    const g = el.querySelector('.card-glow') as HTMLElement;
    if (g) g.style.opacity = '0';
  };
  return { ref, onMouseMove, onMouseLeave };
}

function useTiltLi(strength = 10) {
  const ref = useRef<HTMLLIElement>(null);
  const onMouseMove = (e: React.MouseEvent<HTMLLIElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `perspective(600px) rotateX(${-(y/r.height)*strength}deg) rotateY(${(x/r.width)*strength}deg) scale3d(1.02,1.02,1.02)`;
    const g = el.querySelector('.card-glow') as HTMLElement;
    if (g) {
      g.style.background = `radial-gradient(circle at ${50+(x/r.width)*60}% ${50+(y/r.height)*60}%, rgba(96,165,250,0.13), transparent 70%)`;
      g.style.opacity = '1';
    }
  };
  const onMouseLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    const g = el.querySelector('.card-glow') as HTMLElement;
    if (g) g.style.opacity = '0';
  };
  return { ref, onMouseMove, onMouseLeave };
}

function HighlightCard({ h }: { h: { label: string; value: string } }) {
  const tilt = useTiltLi(10);
  return (
    <li
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={{ transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
      className="relative flex flex-col gap-1 p-3 rounded-xl cursor-default overflow-hidden
        dark:bg-zinc-900 dark:border dark:border-zinc-900  dark:hover:border-blue-400/50 dark:hover:shadow-blue-500/10 hover:border-blue-400/50 hover:shadow-blue-500/10 bg-zinc-50 border border-zinc-200"
    >
      <div className="card-glow absolute inset-0 pointer-events-none rounded-xl transition-opacity duration-300" style={{ opacity: 0 }} />
      <span className="text-xs font-normal uppercase tracking-wider dark:text-zinc-500 text-zinc-500 relative z-10">{h.label}</span>
      <strong className="text-sm font-semibold dark:text-zinc-400 text-zinc-700 relative z-10">{h.value}</strong>
    </li>
  );
}

function EducationBlock({ children }: { children: React.ReactNode }) {
  const tilt = useTiltDiv(6);
  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={{ transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
      className="relative group p-6 rounded-2xl backdrop-blur-sm transition-shadow duration-500 hover:shadow-2xl ml-16 overflow-hidden
        dark:bg-gradient-to-br dark:from-white/5 dark:to-white/0 dark:border dark:border-white/10 dark:hover:border-blue-400/50 dark:hover:shadow-blue-500/10
        bg-gradient-to-br from-zinc-50 to-white border border-zinc-200 hover:border-blue-400/50 hover:shadow-blue-500/10"
    >
      <div className="card-glow absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300" style={{ opacity: 0 }} />
      {children}
    </div>
  );
}

export default function About({ onProfileClick }: AboutProps): React.JSX.Element {
  const imgTilt = useTilt(20);

  return (
    <section id="about" className="py-28 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div>
          <p className="uppercase tracking-[0.2em] mb-4 dark:text-zinc-500 text-zinc-500">About</p>

          <h2 className="flex items-center gap-2 text-4xl md:text-3xl font-bold mb-6 mt-4 leading-tight dark:text-white text-black">
            My Introduction
            <FaStar size={18} className="inline-block ml-2 animate-bounce" />
          </h2>

          <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
            <div
              ref={imgTilt.ref}
              onMouseMove={imgTilt.onMouseMove}
              onMouseLeave={imgTilt.onMouseLeave}
              style={{ transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
              className="relative w-fit cursor-pointer"
            >
              <img
                src="/profile1.png"
                alt="Profile"
                className="w-60 h-90 rounded-full object-cover shadow-2xl
                  dark:border-2 dark:border-zinc-700 border-2 border-zinc-700"
              />
              <div
                className="img-glow absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300"
                style={{ opacity: 0 }}
              />
              <div className="absolute inset-0 rounded-full pointer-events-none
                dark:ring-1 dark:ring-white/10 ring-1 ring-black/5" />
            </div>
          </div>

          {/* Signature */}
          <div className="relative flex justify-start pl-4 -mt-8 ml-2 z-20">
            <div className="flex items-end gap-2 -rotate-[5deg]">
              <img
                src="/pv_sign.png"
                alt="Priyanshu signature"
                className="w-35 object-contain opacity-80 dark:invert dark:opacity-60"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <p className="text-2lg leading-relaxed max-w-xl mt-4 dark:text-zinc-400 text-zinc-500">
            CS undergrad building at the intersection of{' '}
            <span className="dark:text-white text-black font-medium">Data Science</span>,{' '}
            <span className="dark:text-white text-black font-medium">Machine Learning</span>, and{' '}
            <span className="dark:text-white text-black font-medium">UI Design,</span> turning raw data into backend insights and clean, responsive interfaces users actually enjoy.
          </p>

          <p className="text-2lg leading-relaxed max-w-xl dark:text-zinc-400 text-zinc-500">
            A creative thinker with a background in traditional sketching and digital design, approaching every technical problem with both logic and visual intuition.
          </p>

          <ul className="grid grid-cols-2 gap-3 mt-2">
            {highlights.map((h, i) => (
              <HighlightCard key={i} h={h} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}