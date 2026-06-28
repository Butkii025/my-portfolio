'use client';

import React, { useRef } from 'react';
import { FaStar } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import GradientText from "../ui/GradientText";

interface AboutProps {
  onProfileClick: () => void;
}

const highlights = [
  { label: 'Focus',    value: 'Data Science & ML'        },
  { label: 'Additional', value: 'Stock Market Analytics'  },
  { label: 'Tools',    value: 'All rounder Python'       },
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

export default function About({ onProfileClick }: AboutProps): React.JSX.Element {
  const imgTilt = useTilt(20);

  return (
    <section id="about" className="py-28 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div>
          <p className="uppercase tracking-[0.2em] mb-4 text-zinc-500 dark:text-zinc-500 text-xs font-semibold">About</p>

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
                src="/1.png"
                alt="Profile"
                className="w-65 h-110 rounded-full object-cover shadow-2xl
                  dark:border-1 dark:border-zinc-700 
                  dark:hover:border-blue-400 hover:shadow-zinc-300/20 border-1 border-zinc-700 hover:border-blue-400 hover:shadow-zinc-300/20"
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
          <p className="text-sm leading-relaxed max-w-xl mt-4 dark:text-zinc-400 text-zinc-500">
            CS undergrad driven by a simple philosophy : {' '}
            <span className="dark:text-white text-black font-medium">Build tech that works for end user</span>, building at the intersection of{' '}
            <span className="dark:text-white text-black font-medium">Data Science</span>,{' '}
            <span className="dark:text-white text-black font-medium">Machine Learning</span>, and{' '}
            <span className="dark:text-white text-black font-medium">UI Design,</span> turning raw data into backend insights.
          </p>

          <p className="text-sm leading-relaxed max-w-xl dark:text-zinc-400 text-zinc-500">
            I have experience working with <span className="dark:text-white text-black font-medium">Python, Machine Learning, Data Science & Analysis, GitHub, and Web technologies</span>. I enjoy building practical projects that solve real-world problems, continuously learning about the stock market, data science, and emerging technologies to expand my knowledge and skills.
          </p>

          <p className="text-sm leading-relaxed max-w-xl dark:text-zinc-400 text-zinc-500">Apart from academics, I enjoy open source collaboration, creating public PR, Networking, I believe in combining creativity with technology to create meaningful and impactful work.
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