'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiGithub, FiExternalLink, FiFileText } from 'react-icons/fi';
import GradientText from "../ui/GradientText";

function useTilt(strength = 4) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    
    el.style.transform = `perspective(1000px) rotateX(${-(y / r.height) * strength}deg) rotateY(${(x / r.width) * strength}deg) scale3d(1.01, 1.01, 1.01)`;
    
    const glow = el.querySelector('.card-glow') as HTMLElement;
    if (glow) {
      const gx = 50 + (x / r.width) * 60;
      const gy = 50 + (y / r.height) * 60;
      glow.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(59,130,246,0.12), transparent 60%)`;
      glow.style.opacity = '1';
    }
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    const glow = el.querySelector('.card-glow') as HTMLElement;
    if (glow) glow.style.opacity = '0';
  };

  return { ref, onMouseMove, onMouseLeave };
}

function TechBadge({ tech, index }: { tech: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="px-3 py-1 rounded-lg text-xs font-medium transition-colors
        dark:bg-zinc-800/50 dark:border-zinc-700/50 dark:text-zinc-300
        bg-zinc-100/80 border border-zinc-200 text-zinc-600
        backdrop-blur-sm whitespace-nowrap"
    >
      {tech}
    </motion.span>
  );
}

const researchTags = [
  'Volatility Forecasting',
  'Random Forest',
  'Python Analytics',
  'Risk Modeling',
  'NSE | BSE Data',
  '95% Confidence Score',
];

export default function Research(): React.JSX.Element {
  const researchTilt = useTilt(4);
  const blogTilt = useTilt(4);

  return (
    <section 
      id="research" 
      className="py-28 px-6 md:px-12 lg:px-24 dark:bg-transparent text-zinc-900 dark:text-zinc-100 relative overflow-hidden"
    >
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none -z-10 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center md:items-start text-center md:text-left"
        >
          <p className="uppercase tracking-[0.25em] mb-3 text-zinc-500 dark:text-zinc-400 text-xs font-bold">
            Research
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Research & Documents 
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-xl">
            Empirical validations, architecture blueprints, and deep dives into my core technical methodologies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          
          <motion.div
            ref={researchTilt.ref}
            onMouseMove={researchTilt.onMouseMove}
            onMouseLeave={researchTilt.onMouseLeave}
            style={{ transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative group p-8 h-full rounded-3xl backdrop-blur-xl border transition-all duration-500
              dark:border-white/10 dark:bg-white/[0.02] dark:hover:bg-white/[0.04]
              border-zinc-200/80 bg-white/50 hover:bg-white/80
              hover:shadow-[0_8px_30px_rgb(59,130,246,0.12)]
              dark:hover:border-blue-500/30 hover:border-blue-400/30
              overflow-hidden flex flex-col"
          >
            <div className="card-glow absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-500" style={{ opacity: 0 }} />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    Research Work
                  </h3>
                </div>
                <span className="text-xs px-3 py-1 rounded-full font-medium tracking-wide mt-1
                  dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-300
                  bg-blue-50 border border-blue-100 text-blue-600">
                  Submitted
                </span>
              </div>

              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6 text-left">
                Development and empirical validation of a quantitative machine learning framework for short-term realized volatility forecasting on the Nifty 50 index using an ensemble Random Forest architecture in Python. The system captures non-linear volatility clustering dynamics from multi-lagged daily log returns, minimizing out-of-sample error variance (MSE: 0.000246, RMSE: 0.0157, R2_score: 0.9051). The predictive engine systematically calibrates an adaptive 95% parametric Value at Risk (VaR) framework, achieving structural risk coverage with an empirical backtested breach ratio of 4.37% over 389 trading days, matching theoretical targets with high precision.
              </p>

              <div className="mt-auto pt-2">
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {researchTags.map((tag, i) => (
                      <TechBadge key={i} tech={tag} index={i} />
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="research/Research-doc.PDF"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                      dark:bg-white/5 dark:hover:bg-blue-500/20 dark:border-white/10 dark:text-zinc-300
                      bg-white border border-zinc-200 text-zinc-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700
                      transition-all duration-300"
                  >
                    <FiFileText className="w-4 h-4" />
                    <span>Documentation</span>
                  </a>
                  <a
                    href="research/NCMPCS-abstract.PDF"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                      dark:bg-white/5 dark:hover:bg-blue-500/20 dark:border-white/10 dark:text-zinc-300
                      bg-white border border-zinc-200 text-zinc-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700
                      transition-all duration-300"
                  >
                    <FiArrowRight className="w-4 h-4 transition-transform group-hover/btn:-rotate-45" />
                    <span>Read Abstract</span>
                  </a>
                  <a
                    href="https://github.com/Butkii025/Market-Reading"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                      dark:bg-white/5 dark:hover:bg-blue-500/20 dark:border-white/10 dark:text-zinc-300
                      bg-white border border-zinc-200 text-zinc-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700
                      transition-all duration-300"
                  >
                    <FiGithub className="w-4 h-4" />
                    <span>Repository</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            ref={blogTilt.ref}
            onMouseMove={blogTilt.onMouseMove}
            onMouseLeave={blogTilt.onMouseLeave}
            style={{ transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="relative group p-8 h-full rounded-3xl backdrop-blur-xl border transition-all duration-500
              dark:border-white/10 dark:bg-white/[0.02] dark:hover:bg-white/[0.04]
              border-zinc-200/80 bg-white/50 hover:bg-white/80
              hover:shadow-[0_8px_30px_rgb(59,130,246,0.12)]
              dark:hover:border-blue-500/30 hover:border-blue-400/30
              overflow-hidden flex flex-col"
          >
            <div className="card-glow absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-500" style={{ opacity: 0 }} />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    Soft.documents
                  </h3>
                </div>
                <GradientText
                  colors={["#5227FF", "#FF9FFC", "#B497CF"]}
                  animationSpeed={1}
                  showBorder={true}
                  className="py-1 px-3 mt-1 text-xs rounded-full font-medium tracking-wide"
                >
                  Active
                </GradientText>
              </div>

              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6 text-left">
                Explore my latest designs and projects. This space showcases ideas, blueprints, and creative journeys of documentation regarding work insights and the stacks used.
              </p>

              <div className="mt-auto pt-4 border-t dark:border-white/10 border-zinc-200/80">
                <p className="text-xs uppercase tracking-widest font-semibold mb-4 ml-1 text-zinc-400 dark:text-zinc-500">
                  Project Documents
                </p>
                
                <div className="flex flex-col gap-2">
                  {[
                    { label: "BhuNirvighna-Ai: AI-powered predictive analytics platform for land acquisition delay", href: "research/BhNv-Ai proposal.PDF" },
                    { label: "CreditOptima - Loan Approval System", href: "research/CreditOptima.PDF" },
                    { label: "Ensemble Real Estate Valuation & Analytics", href: "research/Real-Estate-HousePricing.PDF" },
                    { label: "Book Data Analysis", href: "research/Bibiliofile-data-analysis.PDF" },
                    { label: "Xela_Arcade: Frictionless Multi-Game Matrix", href: "research/Xela_Arcade-architecture.PDF"},
                  ].map((doc, i) => (
                    <a
                      key={i}
                      href={doc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link flex items-center justify-between p-3 rounded-xl transition-all duration-300
                        dark:hover:bg-white/5 dark:border-transparent dark:hover:border-white/10 border border-transparent
                        hover:bg-black/5 hover:border-zinc-200/60"
                    >
                      <span className="text-sm font-medium leading-relaxed transition-colors duration-300
                        dark:text-zinc-300 dark:group-hover/link:text-blue-400
                        text-zinc-700 group-hover/link:text-blue-600">
                        {doc.label}
                      </span>
                      <FiExternalLink className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1
                        dark:text-zinc-500 dark:group-hover/link:text-blue-400
                        text-zinc-400 group-hover/link:text-blue-600" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}