'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, animate, useInView } from 'framer-motion';
import StatStrip from '@/src/components/StatStrip';
import GradientText from '@/src/ui/GradientText';
import { semesterMarks, csSubjects, collegeInfo, schoolInfo } from '@/src/Data/Academicdata';

const TOTAL_SEMESTERS = 8; // B.Tech = 4 years
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
const schoolStats = [
  { label: 'Stream', value: 'Science PCM' },
  { label: 'Best Subject', value: 'Maths (95%)' },
  { label: 'Score', value: 'A+' },
];

const pill = 'text-xs px-3 py-1 rounded-full border dark:border-white/15 border-zinc-300 dark:text-zinc-300 text-zinc-600';
const inView = { whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

/** Number that counts up the first time it scrolls into view. */
function CountUp({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const c = animate(0, to, { duration: 1.4, ease: 'easeOut', onUpdate: setV });
    return () => c.stop();
  }, [seen, to]);
  return <span ref={ref}>{v.toFixed(decimals)}</span>;
}

/** "active" shows a pulsing dot; anything else reads "completed". */
function Status({ active }: { active?: boolean }) {
  if (active) {
    return (
      <GradientText
        colors={['#5227FF', '#FF9FFC', '#B497CF']}
        animationSpeed={1}
        showBorder
        className="py-1 px-3 mt-1 text-xs rounded-full font-medium tracking-wide"
      >
        Active
      </GradientText>
    );
  }

  return (
    <span className={pill}>completed</span>
  );
}

/** Timeline node: pulsing while active, solid once completed. */
function Node({ active }: { active?: boolean }) {
  return (
    <span className="absolute -left-8 top-2 flex h-[11px] w-[11px] items-center justify-center rounded-full border dark:border-white/30 border-zinc-400 md:-left-10">
      <span className={`h-[5px] w-[5px] rounded-full ${active ? 'animate-pulse bg-emerald-400' : 'dark:bg-zinc-400 bg-zinc-500'}`} />
    </span>
  );
}

/** SGPA per semester as a learning curve. Remaining semesters are dashed "pending" nodes. */
function LearningCurve() {
  const n = semesterMarks.length;
  const best = Math.max(...semesterMarks.map((s) => s.mark));
  const x = (i: number) => ((i + 0.5) / TOTAL_SEMESTERS) * 100; // column centre, in %
  const pts = semesterMarks.map((s, i) => `${(x(i) * 8).toFixed(1)},${(100 - s.mark * 10).toFixed(1)}`);
  const line = `M${pts.join(' L')}`;
  const area = `${line} L${(x(n - 1) * 8).toFixed(1)},100 L${(x(0) * 8).toFixed(1)},100 Z`;

  return (
    <div>
      <div className="relative h-56">
        <div className="absolute inset-x-0 top-8 bottom-0 border-b dark:border-white/10 border-zinc-200">
          <span className="absolute inset-x-0 top-0 border-t border-dashed dark:border-white/10 border-zinc-200" />
          <span className="absolute inset-x-0 top-1/2 border-t border-dashed dark:border-white/10 border-zinc-200" />

          {/* the curve draws left to right */}
          <motion.div
            className="absolute inset-0"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.2, ease: 'easeOut' }}
          >
            <svg viewBox="0 0 800 100" preserveAspectRatio="none" className="h-full w-full overflow-visible">
              <defs>
                <linearGradient id="sgpa-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#60a5fa" stopOpacity="0.25" />
                  <stop offset="1" stopColor="#60a5fa" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={area} fill="url(#sgpa-fill)" />
              <path d={line} fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            </svg>
          </motion.div>

          {/* points pop in as the curve reaches them */}
          {semesterMarks.map((s, i) => (
            <div key={s.sem} className="absolute -translate-x-1/2 translate-y-1/2" style={{ left: `${x(i)}%`, bottom: `${s.mark * 10}%` }}>
              <motion.span
                className="relative block"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (x(i) / 100) * 1.3, type: 'spring', stiffness: 300, damping: 18 }}
              >
                {s.mark === best && <span className="absolute inset-0 animate-ping rounded-full bg-blue-400/60" />}
                <span className={`relative block h-3 w-3 rounded-full border-2 border-blue-400 ${s.mark === best ? 'bg-blue-400' : 'dark:bg-zinc-950 bg-white'}`} />
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[11px] font-semibold dark:text-zinc-300 text-zinc-700">{s.mark}</span>
              </motion.span>
            </div>
          ))}

          {/* semesters still to come */}
          {ROMAN.slice(n).map((r, k) => (
            <div key={r} className="absolute bottom-0 -translate-x-1/2 translate-y-1/2" style={{ left: `${x(n + k)}%` }}>
              <span className="block h-3 w-3 animate-pulse rounded-full border-2 border-dashed dark:border-white/30 border-zinc-400" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 grid" style={{ gridTemplateColumns: `repeat(${TOTAL_SEMESTERS}, minmax(0, 1fr))` }}>
        {ROMAN.map((r, i) => (
          <span key={r} className={`text-center text-xs font-semibold ${i < n ? 'dark:text-zinc-400 text-zinc-600' : 'dark:text-zinc-600 text-zinc-400'}`}>
            {r}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Academics(): React.JSX.Element {
  const done = semesterMarks.length;
  const pct = Math.round((done / TOTAL_SEMESTERS) * 100);
  const currentCGPA = semesterMarks.reduce((a, b) => a + b.mark, 0) / done;
  const highestGPA = Math.max(...semesterMarks.map((s) => s.mark));

  return (
    <section id="academics" className="py-28 px-6 md:px-12 lg:px-24 dark:bg-transparent text-zinc-900 dark:text-zinc-100">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-blue-400/80  dark:text-blue-400/70">
              Academics
            </p>
          <h2 className="font-serif text-4xl font-light md:text-6xl dark:text-white text-black mb-4">
            Educational Journey
          </h2>
          <p className="text-xs md:text-sm dark:text-zinc-400 text-zinc-600 max-w-2xl">
            Pursuing B.Tech in Computer Science & Engineering with focus on full-stack development, machine learning, algorithms, and software design. Building practical knowledge through hands-on projects and problem-solving.
          </p>
        </motion.div>

        {/* timeline rail: active degree on top, completed school below */}
        <div className="relative pl-8 md:pl-10">
          <motion.span
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            style={{ originY: 0 }}
            className="absolute left-[5px] top-3 bottom-0 w-px bg-gradient-to-b from-blue-400 to-zinc-400/20"
          />

          {/* DEGREE */}
          <div className="relative mb-20">
            <Node active />
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-3 text-2xl font-bold dark:text-white text-black mb-3"
            >
              🎓 {collegeInfo.degree}
              <span className={pill}>{collegeInfo.duration}</span>
              <Status active />
            </motion.h3>
            <p className="text-xs md:text-sm italic dark:text-zinc-400 text-zinc-600 mb-6">{collegeInfo.university}</p>

            <div className="mb-10 max-w-md">
              <div className="mb-2 flex justify-between text-xs font-semibold uppercase tracking-widest dark:text-zinc-400 text-zinc-600">
                <span>Semester {done} of {TOTAL_SEMESTERS}</span>
                <span>{pct}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full dark:bg-white/10 bg-zinc-200">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-blue-400/60 to-blue-400"
                >
                  <motion.span
                    animate={{ x: ['-100%', '500%'] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'linear', repeatDelay: 0.8 }}
                    className="absolute inset-y-0 w-1/4 bg-white/50 blur-sm"
                  />
                </motion.div>
              </div>
            </div>

            <StatStrip
              items={[
                { label: 'Current CGPA', value: <CountUp to={currentCGPA} decimals={2} /> },
                { label: 'Semesters Completed', value: <CountUp to={done} /> },
                { label: 'Highest SGPA', value: <CountUp to={highestGPA} decimals={2} /> },
              ]}
            />

            {/* The only card in this section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              {...inView}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-3xl backdrop-blur-xl border
                dark:bg-gradient-to-br dark:from-white/5 dark:to-white/0 dark:border-white/10
                bg-gradient-to-br from-white/40 to-zinc-50/40 border-zinc-200"
            >
              <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-lg font-semibold dark:text-zinc-400 text-zinc-600">
                  📊 Semester Performance (SGPA: 0-10)
                </h4>
                <span className="text-xs uppercase tracking-widest dark:text-zinc-500 text-zinc-500">learning curve</span>
              </div>
              <LearningCurve />

              <div className="mt-8 pt-8 border-t dark:border-zinc-800/50 border-zinc-200/50">
                <p className="text-xs font-semibold dark:text-zinc-400 text-zinc-600 mb-4">📚 Core Computer Science Subjects:</p>
                <div className="flex flex-wrap gap-2">
                  {csSubjects.map((subject, i) => (
                    <motion.span
                      key={subject}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.04 }}
                      className="text-[11px] px-3 py-1.5 rounded-lg border dark:border-white/10 border-zinc-300 dark:text-zinc-300 text-zinc-700 font-medium transition-colors duration-300 hover:border-blue-400"
                    >
                      {subject}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* HIGHER SECONDARY: no card, no tiles */}
          <motion.div initial={{ opacity: 0, y: 20 }} {...inView} transition={{ duration: 0.6 }} className="relative">
            <Node />
            <h3 className="flex flex-wrap items-center gap-3 text-lg md:text-xl font-semibold dark:text-white text-black mb-3">
              📚 {schoolInfo.degree}
              <span className={pill}>{schoolInfo.year}</span>
              <Status />
            </h3>
            <p className="text-xs md:text-sm italic dark:text-zinc-400 text-zinc-600 mb-8">{schoolInfo.school}</p>
            <StatStrip className="mb-0" items={schoolStats} />
          </motion.div>
        </div>

      </div>
    </section>
  );
}