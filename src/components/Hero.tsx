
'use client';

import React, { useEffect, useState } from 'react';
import { FaDownload, FaGithub } from 'react-icons/fa';
import { FiSmile } from 'react-icons/fi';
import { MdWavingHand } from 'react-icons/md';
import GradientText from "../ui/GradientText";
import { motion } from 'framer-motion';
import CatAnimation from '../Prepage/CatAnimation';


interface HomeProps {
  onProfileClick: () => void;
}

export default function Home({ onProfileClick }: HomeProps): React.JSX.Element {
  const [localTime, setLocalTime] = useState('--:--:-- IST');

  useEffect(() => {
    const updateTime = () => {
      setLocalTime(
        new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date()) + ' IST',
      );
    };

    updateTime();
    const interval = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const buttonStyle =
    "portfolio-link-button group inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl " +
    "border border-zinc-300 dark:border-zinc-700 " +
    "bg-transparent text-zinc-700 dark:text-zinc-300 " +
    "hover:border-[#3B82F6] " +
    "hover:shadow-[0_0_18px_2px_rgba(96,165,250,0.45)] " +
    "transition-all duration-300 text-sm font-semibold " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60";

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-5 pt-28 pb-24 bg-transparent"
    >

      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[450px] h-[450px] rounded-full bg-blue-400/[0.07] blur-[140px]" />

        <div className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] rounded-full bg-blue-400/[0.04] blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.08] dark:opacity-[0.12]"
          style={{
            backgroundImage: 'radial-gradient(#60a5fa 1px, transparent 1px)',
            backgroundSize: '38px 38px',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-6xl mx-auto"
      >

        {/* TOP HEADER */}
        <div className="flex items-center justify-between gap-4 mb-12">

          {/* Portfolio - Left */}
          <div className="flex items-center gap-2 uppercase tracking-[0.25em] font-semibold text-xs dark:text-zinc-400 text-zinc-500">
            <GradientText
              colors={["#649ce1", "#4a47df", "#a44990"]}
              animationSpeed={4}
              showBorder={false}
              className="inline"
            >
              ____portfolio
            </GradientText>
            <FiSmile size={18} />
          </div>

          {/* Availability - Right */}
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium border border-emerald-500/20 bg-emerald-500/[0.07] text-zinc-500 dark:text-zinc-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for AI/ML & Data Engineering Roles
          </div>

        </div>

        {/* CENTRE INTRODUCTION */}
        <div className="flex flex-col items-center text-center">
          {/* <div
          aria-hidden="true"
          className="w-full flex justify-center items-center mt-4 mb-8 px-4 overflow-visible"        >
          <p
            className="whitespace-nowrap text-[clamp(3rem,9vw,8rem)] leading-[1.2] tracking-normal text-whit dark:text-white"
            style={{ fontFamily: "var(--font-great-vibes)" }}
          >
            Priyanshu Vijay
          </p>  
        </div> */}

          {/* Name */}
          <h1 className="font-bold tracking-[-0.065em] leading-[0.95] text-5xl md:text-6xl lg:text-8xl dark:text-white text-zinc-950">
            PRIYANSHU
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 text-zinc-500">
              VIJAY
            </span>
          </h1>

          {/* Professional title */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-8"
          >
            <h2 className="text-lg md:text-xl font-semibold dark:text-zinc-200 text-zinc-800">
              AI Engineer <span className="text-zinc-500">&</span> Data Scientist
            </h2>

            <p className="text-[10px] sm:text-xs uppercase tracking-[0.13em] leading-relaxed dark:text-zinc-500 text-zinc-500 mt-4">
              15+ Production Projects • 3+ Internships • 20+ Technologies • 2+ Hackathons
            </p>
          </motion.div>

        </div>

        {/* LOWER SECTION: TAGLINE + BUTTONS LEFT / IMAGE RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 lg:gap-10 mt-16 lg:mt-20">

          {/* LEFT SIDE */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="max-w-2xl text-sm md:text-base leading-relaxed dark:text-zinc-400 text-zinc-600"
            >
              Engineering intelligent systems through machine learning, Deep Learning  and LLM architectures ~ transforming complex data into intelligent, scalable solutions.
            </motion.p>

            <div className="mt-7 grid w-full max-w-2xl grid-cols-2 gap-x-5 gap-y-4 border-t border-zinc-300/70 pt-5 text-left dark:border-white/10 sm:grid-cols-4 sm:gap-x-4">
            
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-500">Status</p>
                <p className="mt-1.5 flex items-center gap-2 font-mono text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  <span className="h-2 w-2 rounded-full animate-ping bg-blue-400" />
                  Visitor
                </p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-500">Date</p>
                <p className="mt-1.5 font-mono text-sm font-semibold text-zinc-800 dark:text-zinc-200">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-500">Local</p>
                <time className="mt-1.5 block font-mono text-sm font-semibold text-zinc-800 dark:text-zinc-200">{localTime}</time>
              </div>
            </div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-9"
            >
              <motion.a
                href="https://docs.google.com/document/d/145I8HrBv9Ub2HroPFgFkyLaGp5p4T4UDzb6s-uII7Pk/preview"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ borderColor: '#3B82F6', boxShadow: '0 0 18px 2px rgba(59,130,246,0.45)' }}
                whileTap={{ scale: 0.96 }}
                className={buttonStyle}
              >
                Resume <FaDownload />
              </motion.a>

              <motion.a
                href="https://github.com/Butkii025"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ borderColor: '#3B82F6', boxShadow: '0 0 18px 2px rgba(59,130,246,0.45)' }}
                whileTap={{ scale: 0.96 }}
                className={buttonStyle}
              >
                GitHub <FaGithub />
              </motion.a>

            </motion.div>

          </div>


          {/* RIGHT SIDE: PROFILE IMAGE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative mt-4 mb-8 flex justify-center lg:justify-end"
          >
            <div className="relative w-[240px] sm:w-[270px] md:w-[290px]">

              {/* Decorative outer frames */}
              <div className="absolute -inset-3 rounded-[2rem] border border-blue-400/30 rotate-3" />

              <div className="absolute -inset-1.5 rounded-[2rem] border border-blue-400/20 -rotate-2" />

              {/* Portrait */}
              <button
                type="button"
                onClick={onProfileClick}
                aria-label="View profile image"
                className="relative block w-full overflow-hidden rounded-[1.7rem] border border-blue-400/30 bg-transparent shadow-[0_0_45px_rgba(96,165,250,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <img
                  src="/profile.png"
                  alt="Priyanshu Vijay"
                  className="block w-full aspect-[4/5] object-cover object-center transition-transform duration-500 hover:scale-[1.03]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </button>

              {/* Digital identity label */}
              <div className="absolute -bottom-5 -left-8 px-4 py-3 rounded-xl border border-white/10 bg-white/80 dark:bg-zinc-950/90 backdrop-blur-xl shadow-xl">
                <p className="text-[10px] uppercase tracking-[0.2em] text-blue-400 dark:text-blue-400 font-semibold">
                  Digital Identity
                </p>
                <p className="text-sm font-semibold mt-1 dark:text-white text-zinc-900">
                  Priyanshu Vijay
                </p>
              </div>

              {/* Creative / Technical label */}
              <div className="absolute -top-7 -right-7 flex items-center gap-2 text-[10px] tracking-widest uppercase dark:text-zinc-400 text-zinc-500">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                Code : KIRAN
              </div>

            </div>
            {/* <CatAnimation /> */}

          </motion.div>

        </div>

        <div className="mt-8 flex justify-center">
          <div className="relative">
            <CatAnimation />
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, borderColor: '#3B82F6', boxShadow: '0 0 26px 3px rgba(59,130,246,0.5)' }}
              whileTap={{ scale: 0.96 }}
              className={`${buttonStyle} border-blue-400/70 bg-gradient-to-r from-blue-500/15 to-indigo-500/15 text-zinc-700 shadow-[0_0_18px_rgba(96,165,250,0.25)] hover:border-blue-400 hover:shadow-[0_0_26px_3px_rgba(96,165,250,0.5)] dark:text-zinc-200`}
            >
              Say Hi
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-400/15">
                <MdWavingHand className="text-lg transition-transform duration-300 group-hover:rotate-12" />
              </span>
            </motion.a>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
