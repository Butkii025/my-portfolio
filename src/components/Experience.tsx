'use client';

import React, { useRef } from 'react';
import GradientText from "./ui/GradientText";

function useTilt(strength = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `perspective(600px) rotateX(${-(y/r.height)*strength}deg) rotateY(${(x/r.width)*strength}deg) scale3d(1.02,1.02,1.02)`;
    const g = el.querySelector('.card-glow') as HTMLElement;
    if (g) {
      g.style.background = `radial-gradient(circle at ${50+(x/r.width)*60}% ${50+(y/r.height)*60}%, rgba(96,165,250,0.15), transparent 70%)`;
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

const cardBase = `relative group p-6 rounded-2xl backdrop-blur-sm transition-shadow duration-500
  hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between gap-6
  dark:border dark:border-white/10 dark:bg-gradient-to-br dark:from-white/5 dark:to-white/0 dark:hover:border-blue-400/50
  border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white hover:border-blue-400/50`;

function ExperienceCard({ children }: { children: React.ReactNode }) {
  const tilt = useTilt();
  return (
    <div ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}
      style={{ transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
      className={cardBase}>
      <div className="card-glow absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300" style={{ opacity: 0 }} />
      {children}
    </div>
  );
}

function CardLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="group/link flex items-start gap-2 transition-all duration-300">
      <span className="mt-0.5 dark:text-zinc-600 text-zinc-400 text-sm">→</span>
      <span className="text-sm transition-all duration-300 origin-left
        dark:text-zinc-500 dark:group-hover/link:text-blue-400
        text-zinc-500 group-hover/link:text-blue-400
        group-hover/link:scale-[1.02] inline-block group-hover/link:underline underline-offset-2">
        {label}
      </span>
    </a>
  );
}

export default function Experience(): React.JSX.Element {
  return (
    <section id="experience" className="py-28 px-6 md:px-12 lg:px-24 dark:bg-transparent">
      <div className="max-w-6xl mx-auto">

        <div className="mb-14">
          <p className="uppercase tracking-[0.2em] mb-4 dark:text-zinc-500 text-zinc-500">Experience</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight dark:text-white text-black">
            Collaborations & Impact
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <ExperienceCard>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold transition duration-300
                  dark:text-white dark:group-hover:text-blue-400
                  text-zinc-800 group-hover:text-blue-400">
                  Science Tech Institute, UP
                </h3>
                <span className="text-xs px-2 py-1 rounded-full shrink-0
                  dark:bg-zinc-900 dark:border dark:border-zinc-700 dark:text-zinc-400
                  bg-zinc-100 border border-zinc-200 text-zinc-500">
                  Completed
                </span>
              </div>
              <p className="leading-relaxed text-sm dark:text-zinc-400 text-zinc-500">
                Data Analysis using R, Excel, and Python. Gained hands-on experience in statistical data processing and predictive modeling.
              </p>
            </div>
            <div className="relative z-10 flex flex-col gap-2">
              <p className="text-xs uppercase tracking-widest dark:text-zinc-600 text-zinc-400">Certificate</p>
              <CardLink href="/credentials/pv-saifai-intership.PDF" label="Data-Analysis Internship" />
            </div>
          </ExperienceCard>

          <ExperienceCard>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold transition duration-300
                  dark:text-white dark:group-hover:text-blue-400
                  text-zinc-800 group-hover:text-blue-400">
                  BeeSkilled
                </h3>
                <GradientText colors={["#5227FF", "#FF9FFC", "#B497CF"]} animationSpeed={1} showBorder={true}
                  className="py-1 px-2 text-xs rounded-full shrink-0">
                  Active
                </GradientText>
              </div>
              <p className="leading-relaxed text-sm dark:text-zinc-400 text-zinc-500">
                Conducted EDA on global financial data, built a Python regression model to forecast sales volumes, and developed an interactive Power BI dashboard for business insights.
              </p>
            </div>
            <div className="relative z-10 flex flex-col gap-2">
              <p className="text-xs uppercase tracking-widest dark:text-zinc-600 text-zinc-400">GitHub</p>
              <CardLink href="https://github.com/Butkii025/Data-Analysis-Predictive-Modelling" label="Data-Analysis & Predictive-Modelling" />
            </div>
          </ExperienceCard>

        </div>
      </div>
    </section>
  );
}