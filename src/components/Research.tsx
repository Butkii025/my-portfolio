
'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiGithub, FiFileText, FiArrowRight } from 'react-icons/fi';

function useTilt(strength = 3) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;

    el.style.transform = `perspective(1200px) rotateX(${-y / r.height * strength}deg) rotateY(${x / r.width * strength}deg)`;
    const glow = el.querySelector('.card-glow') as HTMLElement;
    if (glow) {
      glow.style.background = `radial-gradient(circle at ${50 + x / r.width * 60}% ${50 + y / r.height * 60}%, rgba(96,165,250,.18), transparent 65%)`;
      glow.style.opacity = '1';
    }
  };

  const onMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
    const glow = ref.current.querySelector('.card-glow') as HTMLElement;
    if (glow) glow.style.opacity = '0';
  };

  return { ref, onMouseMove, onMouseLeave };
}

const researchTags = [
  'Volatility Forecasting', 'Random Forest', 'Python Analytics',
  'Risk Modeling', 'NSE | BSE Data', '95% Confidence Score',
];

const documents = [
  { label: 'PresentCall: Biometrics Engine with Anti-spoofing & Realtime Sync', href: 'research/PresentCall_documentation.PDF', type: 'SYSTEM DESIGN' },
  { label: 'BhuNirvighna-Ai: Predictive analytics platform for land acquisition delay', href: 'research/BhNv-Ai proposal.PDF', type: 'AI / ML' },
  { label: 'CreditOptima - Loan Approval System', href: 'research/CreditOptima.PDF', type: 'FINTECH' },
  { label: 'Ensemble Real Estate Valuation & Analytics', href: 'research/Real-Estate-HousePricing.PDF', type: 'DATA SCIENCE' },
  { label: 'Xela_Arcade: Frictionless Multi-Game Matrix', href: 'research/Xela_Arcade-architecture.PDF', type: 'ARCHITECTURE' },
];

function TechBadge({ tech, index }: { tech: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * .06 }}
      className="px-3 py-1.5 rounded-lg text-[11px] font-medium tracking-wide
        border border-blue-400/20 bg-blue-400/[0.07]
        text-blue-400 dark:text-blue-400 dark:bg-blue-400/[0.07]"
    >
      {tech}
    </motion.span>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="p-4 rounded-xl border border-zinc-200/70 dark:border-white/[0.08] bg-white/50 dark:bg-white/[0.025]">
      <p className="text-xl md:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">{value}</p>
      <p className="text-[9px] uppercase tracking-[.18em] text-zinc-500 mt-1">{label}</p>
    </div>
  );
}

export default function Research(): React.JSX.Element {
  const researchTilt = useTilt(3);
  const archiveTilt = useTilt(2);

  return (
    <section id="research" className="relative py-28 px-6 md:px-12 lg:px-24 overflow-hidden text-zinc-900 dark:text-zinc-100">

      {/* Ambient background */}
      <div className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full bg-blue-400/[0.07] blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-400/[0.05] blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.045] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(120,120,120,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(120,120,120,.5) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="mb-4">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-blue-400/80 dark:text-blue-400/70">
              Research Work
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div>
              <h2 className="flex items-center gap-3 font-serif text-4xl font-light md:text-6xl dark:text-white text-black mb-4">
                Research <span className="text-zinc-500 italic">&</span> Documents
              </h2>
              <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed">
                Experiments, technical documentation, and research-driven explorations at the intersection of machine learning and real-world systems.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[.2em] text-zinc-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
              </span>
              Research archive active
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-6 items-stretch">

          {/* Featured research */}
          <motion.div
            ref={researchTilt.ref}
            onMouseMove={researchTilt.onMouseMove}
            onMouseLeave={researchTilt.onMouseLeave}
            style={{ transition: 'transform .35s ease', transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group rounded-3xl border border-blue-400/20 dark:border-blue-400/15 bg-white/70 dark:bg-[#0c0d18]/80 backdrop-blur-2xl overflow-hidden p-6 md:p-8 shadow-xl shadow-blue-400/[0.04]"
          >
            <div className="card-glow absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500" />

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2 text-blue-400 dark:text-blue-400">
                  
                  <span className="text-[10px] uppercase tracking-[.25em] font-semibold">Featured Research</span>
                </div>
                <span className="text-[9px] tracking-widest px-3 py-1.5 rounded-full border border-blue-400/20 bg-blue-400/[0.07] text-blue-400 dark:text-blue-400">
                  SUBMITTED
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3 group-hover:text-blue-400 dark:group-hover:text-blue-400 transition-colors">
                Nifty 50 Volatility Forecasting
              </h3>

              <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-[1.9] mb-7">
                Development and empirical validation of a quantitative machine learning framework for short-term realized volatility forecasting on the Nifty 50 index using an ensemble Random Forest architecture in Python. The system captures non-linear volatility clustering dynamics from multi-lagged daily log returns, minimizing out-of-sample error variance (MSE: 0.000246, RMSE: 0.0157, R2_score: 0.9051). The predictive engine systematically calibrates an adaptive 95% parametric Value at Risk (VaR) framework, achieving structural risk coverage with an empirical backtested breach ratio of 4.37% over 389 trading days, matching theoretical targets with high precision.
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 mb-7">
                <Metric value="0.9051" label="R² Score" />
                <Metric value="0.0157" label="RMSE" />
                <Metric value="4.37%" label="VaR Breach" />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {researchTags.map((tag, i) => <TechBadge key={tag} tech={tag} index={i} />)}
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-3 pt-6 border-t border-zinc-200 dark:border-white/10">
                <a href="research/Research-doc.PDF" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium bg-blue-400 text-white hover:bg-blue-400/80 shadow-lg shadow-blue-400/20 transition-all hover:-translate-y-1">
                  <FiFileText /> Documentation <FiArrowUpRight />
                </a>
                <a href="research/NCMPCS-abstract.PDF" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium border border-zinc-200 dark:border-white/10 hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-400 dark:hover:text-blue-400 transition-all">
                  <FiArrowRight /> Read Abstract
                </a>
                <a href="https://github.com/Butkii025/Market-Reading" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium border border-zinc-200 dark:border-white/10 hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-400 dark:hover:text-blue-400 transition-all">
                  <FiGithub /> Repository <FiArrowUpRight />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Document archive */}
          <motion.div
            ref={archiveTilt.ref}
            onMouseMove={archiveTilt.onMouseMove}
            onMouseLeave={archiveTilt.onMouseLeave}
            style={{ transition: 'transform .35s ease', transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: .15, duration: .6 }}
            className="relative rounded-3xl border border-zinc-200/80 dark:border-white/10 bg-white/60 dark:bg-white/[0.025] backdrop-blur-2xl p-6 md:p-8 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-7">
              <div>
                <p className="text-[10px] uppercase tracking-[.25em] text-blue-400 dark:text-blue-400 font-semibold mb-2">The Archive</p>
                <h3 className="text-2xl font-semibold">Project Files</h3>
              </div>
              <div className="text-right">
                <p className="text-2xl font-light">05</p>
                <p className="text-[9px] uppercase tracking-widest text-zinc-500">Documents</p>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-blue-400/50 via-zinc-300/50 dark:via-white/10 to-transparent mb-4" />

            <div className="flex flex-col">
              {documents.map((doc, i) => (
                <motion.a
                  key={doc.href}
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * .07 }}
                  className="group/doc flex items-center gap-4 py-5 border-b border-zinc-200/70 dark:border-white/[0.07] last:border-0"
                >
                  <span className="font-mono text-xs text-blue-400/80 dark:text-blue-400/70 group-hover/doc:text-blue-400 dark:group-hover/doc:text-blue-400 transition-colors">
                    0{i + 1}
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] uppercase tracking-[.18em] text-zinc-400 mb-1.5">{doc.type}</p>
                    <p className="text-sm font-medium leading-relaxed text-zinc-700 dark:text-zinc-300 group-hover/doc:text-blue-400 dark:group-hover/doc:text-blue-400 transition-colors">
                      {doc.label}
                    </p>
                  </div>

                  <FiArrowUpRight className="w-4 h-4 shrink-0 text-zinc-400 group-hover/doc:text-blue-600 dark:group-hover/doc:text-blue-400 group-hover/doc:-translate-y-1 group-hover/doc:translate-x-1 transition-all" />
                </motion.a>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between text-[9px] uppercase tracking-[.2em] text-zinc-400">
              <span>Technical documentation</span>
              <span>Archive / 2026</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
