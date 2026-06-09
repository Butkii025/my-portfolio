'use client';

import React, { useRef } from 'react';
import GradientText from "./ui/GradientText";

function useTiltCard(strength = 8) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / rect.height) * strength;
    const rotateY = (x / rect.width) * strength;
    el.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
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
    el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    const glow = el.querySelector('.card-glow') as HTMLElement;
    if (glow) glow.style.opacity = '0';
  };

  return { ref, onMouseMove, onMouseLeave };
}

const researchTags = [
  'Volatility Forecasting',
  'Random Forest',
  'Python Analytics',
  'Risk Modeling',
  'NSE | BSE Data',
];

export default function Research(): React.JSX.Element {
  const researchTilt = useTiltCard(8);
  const blogTilt = useTiltCard(8);

  return (
    <section id="research" className="py-28 px-6 dark:bg-transparent">
      <div className="max-w-6xl mx-auto">

        <div className="mb-14">
          <p className="uppercase tracking-[0.2em] mb-4 dark:text-zinc-500 text-zinc-500">Research</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight dark:text-white text-black">
            Research & Blogs
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Research Work Card */}
          <div
            ref={researchTilt.ref}
            onMouseMove={researchTilt.onMouseMove}
            onMouseLeave={researchTilt.onMouseLeave}
            style={{ transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
            className="relative group p-6 rounded-2xl backdrop-blur-sm transition-shadow duration-500
              hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between gap-6
              dark:border dark:border-white/10 dark:bg-gradient-to-br dark:from-white/5 dark:to-white/0 dark:hover:border-blue-400/50
              border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white hover:border-blue-400/50"
          >
            <div
              className="card-glow absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
              style={{ opacity: 0 }}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold transition duration-300
                  dark:text-white dark:group-hover:text-blue-400
                  text-zinc-800 group-hover:text-blue-400">
                  Research Work
                </h3>

                <span className="text-xs px-2 py-1 rounded-full
                  dark:bg-zinc-900 dark:border dark:border-zinc-700 dark:text-zinc-400
                  bg-zinc-100 border border-zinc-200 text-zinc-500">
                  Submitted
                </span>
              </div>

              <p className="leading-relaxed text-sm md:text-base
                dark:text-zinc-400 text-zinc-500">
                Research on Indian market volatility forecasting system using NSE/BSE official data with Python, Random Forest, machine learning, predictive analytics techniques and forecasting market insights.
              </p>
            </div>

            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                {researchTags.map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 text-xs rounded-md
                    dark:bg-zinc-900/80 dark:border dark:border-zinc-800 dark:text-zinc-400
                    bg-zinc-100 border border-zinc-200 text-zinc-600">
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href="/NCMPCS.PDF"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm transition-all duration-300 origin-left
                  dark:text-zinc-500 dark:hover:text-blue-400
                  text-zinc-500 hover:text-blue-400 hover:scale-[1.03]"
              >
                <span className="dark:text-zinc-600 text-zinc-400">•</span>
                <span className="hover:underline underline-offset-2">View Research Certificate</span>
              </a>
            </div>
          </div>

          <div
            ref={blogTilt.ref}
            onMouseMove={blogTilt.onMouseMove}
            onMouseLeave={blogTilt.onMouseLeave}
            style={{ transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
            className="relative group p-6 rounded-2xl backdrop-blur-sm transition-shadow duration-500
              hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between gap-6
              dark:border dark:border-white/10 dark:bg-gradient-to-br dark:from-white/5 dark:to-white/0 dark:hover:border-blue-400/50
              border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white hover:border-blue-400/50"
          >
            <div
              className="card-glow absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
              style={{ opacity: 0 }}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold transition duration-300
                  dark:text-white dark:group-hover:text-blue-400
                  text-zinc-800 group-hover:text-blue-400">
                  Blogs
                </h3>

                <GradientText
                  colors={["#5227FF", "#FF9FFC", "#B497CF"]}
                  animationSpeed={1}
                  showBorder={true}
                  className="py-1 px-2 text-xs rounded-full"
                >
                  Active
                </GradientText>
              </div>

              <p className="leading-relaxed text-sm md:text-base
                dark:text-zinc-400 text-zinc-500">
                Explore my latest thoughts, designs, and project insights. This space showcases ideas, blueprints, and creative journeys.
              </p>
            </div>
            <div className="relative z-10 flex flex-col gap-3">
              <p className="text-xs uppercase tracking-widest dark:text-zinc-600 text-zinc-400">Latest</p>
              <a
                href="https://docs.google.com/document/d/19uTBz7EuTVufrOsQsNTRrwAKSsSPFJLwatDf_PN8xOI/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group/link flex items-start gap-2 transition-all duration-300"
              >
                <span className="mt-0.5 dark:text-zinc-600 text-zinc-400 text-sm">→</span>
                <span className="text-sm leading-relaxed transition-all duration-300 origin-left
                  dark:text-zinc-500 dark:group-hover/link:text-blue-400
                  text-zinc-500 group-hover/link:text-blue-400
                  group-hover/link:scale-[1.02] inline-block
                  group-hover/link:underline underline-offset-2">
                  Xela_Arcade Architecture Blueprint
                </span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}