'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import {
  semesterMarks,
  schoolDetails,
  csSubjects,
  collegeInfo,
  schoolInfo,
} from '@/src/Data/Academicdata';

function useTilt(strength = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `perspective(600px) rotateX(${-(y / r.height) * strength}deg) rotateY(${(x / r.width) * strength}deg) scale3d(1.02,1.02,1.02)`;
    const g = el.querySelector('.card-glow') as HTMLElement;
    if (g) {
      g.style.background = `radial-gradient(circle at ${50 + (x / r.width) * 60}% ${50 + (y / r.height) * 60}%, rgba(96,165,250,0.15), transparent 70%)`;
      g.style.opacity = '1';
    }
  };
  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    const g = el.querySelector('.card-glow') as HTMLElement;
    if (g) g.style.opacity = '0';
  };
  return { ref, onMouseMove, onMouseLeave };
}

function GradeBar({ mark, sem, index }: { mark: number; sem: string; index: number }) {
  const percentage = (mark / 10) * 100;
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="flex items-center gap-3"
    >
      <span className="w-16 text-xs font-semibold dark:text-zinc-400 text-zinc-600">{sem}</span>
      <div className="flex-1 relative h-8 rounded-lg overflow-hidden dark:bg-zinc-900/50 bg-zinc-100">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          transition={{ delay: index * 0.15 + 0.3, duration: 0.8, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-end pr-2"
        >
          <span className="text-[10px] font-bold text-white">{mark}</span>
        </motion.div>
      </div>
      <span className="w-10 text-right text-xs font-semibold dark:text-zinc-300 text-zinc-700">{mark}/10</span>
    </motion.div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string | number; icon: string }) {
  const tilt = useTilt(6);
  return (
    <motion.div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={{ transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group p-6 rounded-2xl backdrop-blur-sm transition-shadow duration-500
  hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between gap-6
  dark:border dark:border-white/10 dark:bg-gradient-to-br dark:from-white/5 dark:to-white/0 dark:hover:border-blue-400/50
  border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white hover:border-blue-400/50"
    >
      <div className="card-glow absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300" style={{ opacity: 0 }} />
      <div className="relative z-10">
        <span className="text-2xl block mb-2">{icon}</span>
        <p className="text-xs uppercase tracking-widest dark:text-zinc-500 text-zinc-600 mb-1 font-semibold">{label}</p>
        <p className="text-2xl font-bold dark:text-white text-black">{value}</p>
      </div>
    </motion.div>
  );
}

export default function Academics(): React.JSX.Element {
  const currentCGPA = (semesterMarks.reduce((a, b) => a + b.mark, 0) / semesterMarks.length).toFixed(2);

  return (
    <section id="academics" className="py-28 px-6 md:px-12 lg:px-24 dark:bg-transparent">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="uppercase tracking-[0.2em] mb-4 text-zinc-500 dark:text-zinc-500 text-xs font-semibold">academics</p>
          <h2 className="flex items-center gap-3 text-4xl md:text-5xl font-bold dark:text-white text-black mb-4">
            Educational Journey
            <motion.span animate={{ rotate: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              <FaStar size={32} className="text-yellow-400" />
            </motion.span>
          </h2>
          <p className="text-base dark:text-zinc-400 text-zinc-600 max-w-2xl">
            Pursuing B.Tech in Computer Science & Engineering with focus on full-stack development, data structures, algorithms, and software architecture. Building practical knowledge through hands-on projects and problem-solving.
          </p>
        </motion.div>

        {/* COLLEGE SECTION */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 text-2xl font-bold dark:text-white text-black mb-8"
          >
            🎓 {collegeInfo.degree}
            <span className="text-xs px-3 py-1 rounded-full dark:bg-blue-500/20 dark:text-blue-300 bg-blue-100 text-blue-700">
              {collegeInfo.duration}
            </span>
          </motion.h3>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm italic dark:text-zinc-400 text-zinc-600 mb-8"
          >
            {collegeInfo.university}
          </motion.p>

          {/* SEMESTER PROGRESS - FULL WIDTH */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative p-8 rounded-3xl backdrop-blur-xl border overflow-hidden
              dark:bg-gradient-to-br dark:from-white/5 dark:to-white/0 dark:border-white/10
              bg-gradient-to-br from-white/40 to-zinc-50/40 border-white/20">
              <div className="card-glow absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300" style={{ opacity: 0 }} />
              <div className="relative z-10">
                <h4 className="text-sm uppercase tracking-widest font-semibold dark:text-zinc-400 text-zinc-600 mb-8">
                  📊 Semester Performance (SGPA: 0-10)
                </h4>
                <div className="space-y-5">
                  {semesterMarks.map((item, i) => (
                    <GradeBar key={i} mark={item.mark} sem={item.sem} index={i} />
                  ))}
                </div>

                {/* SUBJECTS & TREND */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="mt-8 pt-8 border-t dark:border-zinc-800/50 border-zinc-200/50"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold dark:text-zinc-400 text-zinc-600">📚 Core Computer Science Subjects:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {csSubjects.map((subject, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + i * 0.05 }}
                          className="text-[11px] px-3 py-1.5 rounded-lg dark:bg-blue-500/20 dark:text-blue-300 bg-blue-100/60 text-blue-700 font-medium"
                        >
                          {subject}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* STATS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 ">
            <StatCard label="Current CGPA" value={currentCGPA} icon="🎯" />
            <StatCard label="Semesters Completed" value="5" icon="📅" />
            <StatCard label="Highest Mark" value="9.64" icon="🏆" />
          </div>

          
        </div>

        {/* SCHOOL SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-20 pt-20 border-t dark:border-zinc-800 border-zinc-200"
        >
          <h3 className="flex items-center gap-3 text-2xl font-bold dark:text-white text-black mb-4">
            📚 {schoolInfo.degree}
            <span className="text-xs px-3 py-1 rounded-full dark:bg-blue-500/20 dark:text-blue-300 bg-blue-100 text-blue-700">
              {schoolInfo.year}
            </span>
          </h3>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm italic dark:text-zinc-400 text-zinc-600 mb-8"
          >
            {schoolInfo.school}
          </motion.p>

          {/* SCHOOL STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {schoolDetails.map((detail, i) => {
              const tilt = useTilt(6);
              return (
                <motion.div
                  key={i}
                  ref={tilt.ref}
                  onMouseMove={tilt.onMouseMove}
                  onMouseLeave={tilt.onMouseLeave}
                  style={{ transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="relative p-6 rounded-2xl backdrop-blur-xl border overflow-hidden
                    dark:bg-gradient-to-br dark:from-white/5 dark:to-white/0 dark:border-white/10
                    bg-gradient-to-br from-white/40 to-zinc-50/40 border-white/20"
                >
                  <div className="card-glow absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300" style={{ opacity: 0 }} />
                  <div className="relative z-10">
                    <span className="text-4xl mb-3 block">{detail.icon}</span>
                    <p className="text-xs uppercase tracking-widest dark:text-zinc-500 text-zinc-600 mb-2 font-semibold">{detail.label}</p>
                    <p className="text-xl font-bold dark:text-white text-black">{detail.value}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}