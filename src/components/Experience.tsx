'use client';

import React, { useRef } from 'react';
import GradientText from "../ui/GradientText";

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

// Added responsive width configuration, disabled shrinking, and added snap alignment for a smooth desktop/mobile scrolling feel
const cardBase = `relative group p-6 rounded-2xl backdrop-blur-sm transition-shadow duration-500
  hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between gap-6
  dark:border dark:border-white/10 dark:bg-gradient-to-br dark:from-white/5 dark:to-white/0 dark:hover:border-blue-400/50
  border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white hover:border-blue-400/50
  w-[290px] sm:w-[380px] md:w-[450px] shrink-0 snap-start`;

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

        <div className="mb-8">
          <p className="uppercase tracking-[0.2em] mb-4 text-zinc-500 dark:text-zinc-500 text-xs font-semibold">Experience</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight dark:text-white text-black">
            Collaborations & Impact
          </h2>
        </div>

        {/* Changed grid layout to a flex horizontal scroll container with custom padding rules to preserve hover glow clipping */}
        <div className="flex gap-6 overflow-x-auto pb-8 pt-2 px-2 -mx-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">

          <ExperienceCard>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold transition duration-300
                  dark:text-white dark:group-hover:text-blue-400
                  text-zinc-800 group-hover:text-blue-400">
                  Google × Kaggle Hackathon
                </h3>
                <span className="text-xs px-2 py-1 rounded-full shrink-0
                  dark:bg-zinc-900 dark:border dark:border-zinc-700 dark:text-zinc-400
                  bg-zinc-100 border border-zinc-200 text-zinc-500">
                  JUNE-2026
                </span>
              </div>
              <p className="leading-relaxed text-sm dark:text-zinc-400 text-zinc-500">
                <b>Idea : <i>LearnForge AI</i></b> — Full-Stack AI Education Platform & Secure Code Sandbox.<br/>
                <b>Working & Objective :</b> Developed a next-gen learning application for the joint Google × Kaggle 2026 Hackathon. Implemented a custom Model Context Protocol (MCP) backend featuring strict regex-driven token sanitization, 4 AI Agent-automated validation schema tests, and isolated subprocess execution.<br/><br/>
                <b>Tech Used :</b> Python | MCP Server | React | Vite | Tailwind CSS | Docker | Subprocess
              </p>
            </div>
            <div className="relative z-10 flex flex-col gap-2">
              <p className="text-xs uppercase tracking-widest dark:text-zinc-600 text-zinc-400">Source Code</p>
              <CardLink href="https://github.com/Butkii025/LearnForge-AI" label="GitHub Repository" />
            </div>
            <div className="relative z-10 flex flex-col gap-2">
              <p className="text-xs uppercase tracking-widest dark:text-zinc-600 text-zinc-400">Overview</p>
              <CardLink href="https://www.kaggle.com/competitions/vibecoding-agents-capstone-project/writeups/learnforge-ai-a-multi-agent-study-system-for-engi" label="Kaggle Writeup" />
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
                <span className="text-xs px-2 py-1 rounded-full shrink-0
                  dark:bg-zinc-900 dark:border dark:border-zinc-700 dark:text-zinc-400
                  bg-zinc-100 border border-zinc-200 text-zinc-500">
                  JUNE-2026
                </span>
              </div>
              <p className="leading-relaxed text-sm dark:text-zinc-400 text-zinc-500">
               <b>Internship : </b> As a ML/AI & Data Analyst<br/>

                <b>Working & Objective :</b> Implement EDA, trained a Scikit-Learn Linear Regression model, and deployed an interactive Power BI dashboard. Work on 4-level datasets & mildstone project using a real-world corporate dataset to model and forecast $118M+ in global sales. Caught a -3.1% profit drain in Enterprise and recommended scaling high-margin (73.1%) Channel Partners.<br/><br/>

                <b>Tech Used :</b> Python | Pandas | Scikit-Learn | Matplotlib | Seaborn | Power BI Desktop.
              </p>
            </div>
            <div className="relative z-10 flex flex-col gap-2">
              <p className="text-xs uppercase tracking-widest dark:text-zinc-600 text-zinc-400">GitHub</p>
              <CardLink href="https://github.com/Butkii025/Financial-Predictive-Modelling---intern" label="Data-Analysis & Predictive-Modelling" />
            </div>
          </ExperienceCard>

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
                  JULY-2025
                </span>
              </div>
              <p className="leading-relaxed text-sm dark:text-zinc-400 text-zinc-500">
                <b>Internship : </b>As a role of Data Analyst<br/>
                <b>Working & Objective :</b> Developed new ecosystem using R, Excel, and Python. Work on multiple projects per week given by Institute's real dataset. Gained hands-on experience in statistical data processing and predictive modeling. Extract insights using pandas and pivot table<br/><br/>
                <b>Tech Used :</b> Python | R | Pandas | Numpy | Matplotlib | Excel | Pivot
              </p>
            </div>
            <div className="relative z-10 flex flex-col gap-2">
              <p className="text-xs uppercase tracking-widest dark:text-zinc-600 text-zinc-400">Certificate</p>
              <CardLink href="/credentials/pv-saifai-intership.PDF" label="Data-Analysis Internship" />
            </div>
          </ExperienceCard>
                  
        </div>
      </div>
    </section>
  );
}