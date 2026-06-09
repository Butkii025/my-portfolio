'use client';

import React, { useState } from 'react';
import ContactForm from './contactform';

export default function Contact(): React.JSX.Element {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="py-28 px-6 md:px-12 lg:px-24 dark:bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="uppercase tracking-[0.2em] mb-4 dark:text-zinc-500 text-zinc-500">Contact</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight dark:text-white text-black">
            Let's Build Together
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          <div className="flex flex-col gap-8">
            <p className="leading-relaxed dark:text-zinc-400 text-zinc-500">
              Interested in collaborations, projects, or creative ideas?<br></br> Let's connect and create impactful digital experiences.
            </p>

            <div className="flex flex-col gap-3">
              <a href="mailto:priyanshuvijay262@gmail.com"
                className="inline-flex items-center gap-2 text-sm transition-all duration-300 origin-left
                  dark:text-zinc-500 dark:hover:text-blue-400 text-zinc-500 hover:text-blue-400 hover:scale-[1.02]">
                <span className="dark:text-zinc-600 text-zinc-400">→</span>
                <span className="hover:underline underline-offset-2">priyanshuvijay262@gmail.com</span>
              </a>
              <a href="https://github.com/Butkii025" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm transition-all duration-300 origin-left
                  dark:text-zinc-500 dark:hover:text-blue-400 text-zinc-500 hover:text-blue-400 hover:scale-[1.02]">
                <span className="dark:text-zinc-600 text-zinc-400">→</span>
                <span className="hover:underline underline-offset-2">github.com/Butkii025</span>
              </a>
            </div>

            <ChaiCup submitted={submitted} />

            <p className="text-sm italic dark:text-zinc-500 text-zinc-400 font-['Alex_Brush',_cursive] text-lg">
              " — the best meetings start with chai "
            </p>
          </div>

          <div>
            <ContactForm onSuccess={() => setSubmitted(true)} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ChaiCup({ submitted }: { submitted: boolean }) {
  return (
    <div className="relative w-52 h-52">
      <style>{`
        @keyframes axisRotate {
          0%   { transform: rotateY(0deg);   }
          100% { transform: rotateY(360deg); }
        }
        @keyframes glowPulse {
          0%,100% { filter: drop-shadow(0 0 4px rgba(96,165,250,0.2)); }
          50%      { filter: drop-shadow(0 0 22px rgba(96,165,250,0.9)); }
        }
        .cup-axis-spin {
          animation:
            axisRotate 1.1s cubic-bezier(0.4,0,0.2,1) forwards,
            glowPulse   1.1s ease forwards;
          transform-origin: center center;
          transform-style: preserve-3d;
        }
        .steam-wip { opacity: 0; }
        .do-steam .steam-wip { opacity: 1; }
      `}</style>

      {/* Orbit ring */}
      {submitted && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div style={{
            width: '210px', height: '210px', borderRadius: '50%',
            border: '1px solid rgba(96,165,250,0.25)',
            animation: 'axisRotate 3s linear infinite',
            transformStyle: 'preserve-3d',
          }} />
        </div>
      )}

      <svg
        viewBox="0 0 200 200"
        className={`w-full h-full ${submitted ? 'cup-axis-spin do-steam' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{
          perspective: '400px',
          filter: submitted ? 'drop-shadow(0 0 14px rgba(96,165,250,0.6))' : undefined,
        }}
      >
        {/* Mandala rings */}
        {[68, 55, 42].map((r, i) => (
          <circle key={i} cx="100" cy="120" r={r} fill="none"
            stroke={`rgba(96,165,250,${submitted ? 0.3 - i*0.07 : 0.1 - i*0.02})`}
            strokeWidth="1" style={{ transition: 'stroke 0.5s' }} />
        ))}

        {/* Spokes */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 30) * Math.PI / 180;
          return <line key={i}
            x1={100 + Math.cos(a)*42} y1={120 + Math.sin(a)*42}
            x2={100 + Math.cos(a)*62} y2={120 + Math.sin(a)*62}
            stroke={`rgba(96,165,250,${submitted ? 0.35 : 0.1})`} strokeWidth="1"
            style={{ transition: 'stroke 0.5s' }} />;
        })}

        {/* Dots */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 45) * Math.PI / 180;
          return <circle key={i} cx={100 + Math.cos(a)*52} cy={120 + Math.sin(a)*52}
            r="3" fill="none" stroke={`rgba(96,165,250,${submitted ? 0.45 : 0.15})`}
            strokeWidth="1" style={{ transition: 'stroke 0.5s' }} />;
        })}

        <ellipse cx="100" cy="158" rx="52" ry="10"
          fill="rgba(96,165,250,0.08)"
          stroke={`rgba(96,165,250,${submitted ? 0.6 : 0.25})`}
          strokeWidth="1.5" style={{ transition: 'stroke 0.5s' }} />
        <ellipse cx="100" cy="158" rx="38" ry="6"
          fill="rgba(96,165,250,0.05)"
          stroke={`rgba(96,165,250,${submitted ? 0.35 : 0.12})`} strokeWidth="1" />

        {/* Cup body */}
        <path d="M60 105 Q58 148 100 152 Q142 148 140 105 Z"
          fill={`rgba(96,165,250,${submitted ? 0.18 : 0.08})`}
          stroke={`rgba(96,165,250,${submitted ? 0.7 : 0.35})`}
          strokeWidth="1.5" style={{ transition: 'all 0.5s' }} />

        <ellipse cx="100" cy="105" rx="40" ry="8"
          fill={`rgba(96,165,250,${submitted ? 0.2 : 0.1})`}
          stroke={`rgba(96,165,250,${submitted ? 0.8 : 0.4})`}
          strokeWidth="1.5" style={{ transition: 'all 0.5s' }} />

        <ellipse cx="100" cy="105" rx="36" ry="6"
          fill={`rgba(180,120,60,${submitted ? 0.5 : 0.25})`}
          style={{ transition: 'fill 0.5s' }} />

        <path d="M140 115 Q162 115 162 130 Q162 145 140 145"
          fill="none" stroke={`rgba(96,165,250,${submitted ? 0.65 : 0.35})`}
          strokeWidth="2" strokeLinecap="round" style={{ transition: 'stroke 0.5s' }} />

        {/* Cup mandala */}
        <circle cx="100" cy="128" r="14" fill="none"
          stroke={`rgba(96,165,250,${submitted ? 0.45 : 0.2})`} strokeWidth="1" />
        {Array.from({ length: 6 }).map((_, i) => {
          const a = (i * 60) * Math.PI / 180;
          return <line key={i}
            x1={100 + Math.cos(a)*8} y1={128 + Math.sin(a)*8}
            x2={100 + Math.cos(a)*14} y2={128 + Math.sin(a)*14}
            stroke={`rgba(96,165,250,${submitted ? 0.45 : 0.2})`} strokeWidth="1" />;
        })}
        <circle cx="100" cy="128" r="4"
          fill={`rgba(96,165,250,${submitted ? 0.3 : 0.15})`}
          stroke={`rgba(96,165,250,${submitted ? 0.55 : 0.3})`} strokeWidth="1" />

        <g className={submitted ? 'do-steam' : ''}>
          {[
            { dx: 88, delay: '0s',   dur: '2s'   },
            { dx: 100, delay: '0.4s', dur: '2.4s' },
            { dx: 112, delay: '0.8s', dur: '2.2s' },
          ].map(({ dx, delay, dur }, i) => (
            <path key={i} className="steam-wip"
              d={`M${dx} 100 Q${dx-4} 88 ${dx} 76 Q${dx+4} 64 ${dx} 52`}
              fill="none" stroke="rgba(200,200,200,0.5)" strokeWidth="2" strokeLinecap="round">
              <animate attributeName="opacity" dur={dur} begin={delay} repeatCount="indefinite" values="0;0.6;0" />
              <animate attributeName="d" dur={dur} begin={delay} repeatCount="indefinite"
                values={`M${dx} 100 Q${dx-4} 88 ${dx} 76 Q${dx+4} 64 ${dx} 52;M${dx} 100 Q${dx+4} 88 ${dx} 76 Q${dx-4} 64 ${dx} 52;M${dx} 100 Q${dx-4} 88 ${dx} 76 Q${dx+4} 64 ${dx} 52`} />
            </path>
          ))}
        </g>
      </svg>
    </div>
  );
}