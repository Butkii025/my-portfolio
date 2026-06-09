'use client';

import React, { useRef } from 'react';
import { FaStar } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';

interface academicsProps {
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

export default function academics({ onProfileClick }: academicsProps): React.JSX.Element {
  const imgTilt = useTilt(20);

  return (
    <section id="academics" className="py-28 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div>
          <p className="uppercase tracking-[0.2em] mb-4 dark:text-zinc-500 text-zinc-500">academics</p>

          <h2 className="flex items-center gap-2 text-4xl md:text-3xl font-bold leading-tight dark:text-white text-black">
            My Academic Background
            <FaStar size={18} className="inline-block ml-2 animate-bounce" />
          </h2>

        </div>
      </div>

      {/* Education */}
      <div className="max-w-3xl mx-auto mt-15">
        <h2 className="flex justify-center items-center gap-2 text-3xl md:text-2xl font-bold w-full mb-12 leading-tight
          dark:text-zinc-400 text-zinc-700">
          Education
          <FaPencil size={18} className="inline-block ml-2 animate-bounce" />
        </h2>

        <div className="relative ml-4 md:ml-20 pl-6 md:pl-8 space-y-12 py-2
          border-l-4 dark:border-zinc-600 border-zinc-300">

          {/* COLLEGE */}
          <div className="relative">
            <span className="absolute -left-[38px] top-1.5 font-semibold text-sm px-3 py-1 rounded-md shadow-md cursor-pointer hover:animate-bounce hover:scale-110 active:scale-95 transition duration-300
              dark:bg-zinc-900 dark:border-2 dark:text-zinc-400 dark:hover:border-white
              bg-white border-2 border-zinc-300 text-zinc-600 hover:border-zinc-500">
              College
            </span>
            <EducationBlock>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-1 relative z-10">
                <h3 className="font-bold text-2lg tracking-wide transition duration-300
                  dark:text-white dark:group-hover:text-blue-400 text-black group-hover:text-blue-400">
                  B.Tech — Computer Science & Engineering
                </h3>
                <span className="text-xs px-2 py-1 rounded-md w-fit dark:bg-zinc-800 dark:text-blue-400 bg-zinc-100 text-blue-400">
                  2023–2027
                </span>
              </div>
              <span className="text-xs italic px-10 py-1 rounded-md w-fit flex items-center justify-center relative z-10
                dark:bg-zinc-900 dark:text-zinc-400 bg-zinc-100 text-zinc-500">
                Dr. Sakuntala Misra National Rehabilitation University, Lucknow
              </span>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm font-medium pt-4 mt-4 relative z-10
                border-t dark:border-zinc-900 border-zinc-200 dark:text-zinc-400 text-zinc-600">
                {semesterMarks.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 p-2 rounded-xl
                    dark:bg-zinc-950/40 dark:border dark:border-zinc-900 bg-zinc-50 border border-zinc-200">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full shrink-0" />
                    <span>{item.sem}: <strong className="dark:text-zinc-400 text-zinc-700 font-semibold">{item.mark}</strong></span>
                  </li>
                ))}
                <li className="flex items-center gap-2 p-2 rounded-xl col-span-2 sm:col-span-3
                  dark:bg-zinc-950/40 dark:border dark:border-zinc-900 bg-zinc-50 border border-zinc-200">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full shrink-0" />
                  <span className="text-xs dark:text-zinc-500 text-zinc-500 italic">Consistent upward trend → 9.64 in Sem V</span>
                </li>
              </ul>
            </EducationBlock>
          </div>

          {/* SCHOOL */}
          <div className="relative">
            <span className="absolute -left-[38px] top-1.5 font-semibold text-sm px-3 py-1 rounded-md shadow-md cursor-pointer hover:animate-bounce hover:scale-110 active:scale-95 transition duration-300
              dark:bg-zinc-900 dark:border-2 dark:text-zinc-400 dark:hover:border-white
              bg-white border-2 border-zinc-300 text-zinc-600 hover:border-zinc-500">
              School
            </span>
            <EducationBlock>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-1 relative z-10">
                <h3 className="font-bold text-2lg tracking-wide transition duration-300
                  dark:text-white dark:group-hover:text-blue-400 text-black group-hover:text-blue-400">
                  Higher Secondary (XII) — Science PCM
                </h3>
                <span className="text-xs px-2 py-1 rounded-md w-fit dark:bg-zinc-800 dark:text-blue-400 bg-zinc-100 text-blue-400">
                  May 2023
                </span>
              </div>
              <span className="text-xs italic px-10 py-1 rounded-md w-fit flex items-center justify-center relative z-10
                dark:bg-zinc-900 dark:text-zinc-400 bg-zinc-100 text-zinc-500">
                New Public Inter College, Lucknow
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm font-medium pt-4 mt-4 relative z-10
                border-t dark:border-zinc-900 border-zinc-200 dark:text-zinc-400 text-zinc-600">
                {schoolDetails.map((detail, i) => (
                  <li key={i} className="flex flex-col gap-1 p-3 rounded-xl
                    dark:bg-zinc-950/40 dark:border dark:border-zinc-900 bg-zinc-50 border border-zinc-200">
                    <span className="text-xs font-normal uppercase tracking-wider dark:text-zinc-500 text-zinc-500">{detail.label}</span>
                    <strong className="font-semibold dark:text-zinc-400 text-zinc-700">{detail.value}</strong>
                  </li>
                ))}
              </ul>
            </EducationBlock>
          </div>

        </div>
      </div>
    </section>
  );
}