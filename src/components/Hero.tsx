'use client';

import React, { useRef } from 'react';
import { FaDownload, FaGithub } from 'react-icons/fa';
import { FiSmile } from 'react-icons/fi';
import { MdWavingHand } from 'react-icons/md';
import GradientText from "./ui/GradientText";


interface HomeProps {
  onProfileClick: () => void;
}

export default function Home({ onProfileClick }: HomeProps): React.JSX.Element {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / rect.height) * 15;
    const rotateY = (x / rect.width) * 15;
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`;
  
    const glow = el.querySelector('.card-glow') as HTMLElement;
    if (glow) {
      const gx = 50 + (x / rect.width) * 60;
      const gy = 50 + (y / rect.height) * 60;
      glow.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(96,165,250,0.18), transparent 70%)`;
      glow.style.opacity = '1';
    }
  };

  const handleCardMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
    const glow = el.querySelector('.card-glow') as HTMLElement;
    if (glow) glow.style.opacity = '0';
  };

  const handleImgMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const el = imgRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / rect.height) * 20;
    const rotateY = (x / rect.width) * 20;
    el.style.transform = `perspective(400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.08,1.08,1.08)`;
  };

  const handleImgMouseLeave = () => {
    const el = imgRef.current;
    if (!el) return;
    el.style.transform = `perspective(400px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-20">

      <div className="absolute inset-0 opacity-90
         dark:via-black dark:to-black" />

      <div className="absolute w-[400px] h-[400px] rounded-full blur-3xl
        dark:bg-white/10 bg-zinc-400/10" />

      <div className="relative z-20 max-w-4xl mx-auto grid md:grid-cols-2 gap-center items-center mt-10">
        <div>
          <p className="flex items-center gap-2 uppercase tracking-[0.2em] font-semibold text-sm mb-10
            dark:text-white text-blue-400"><GradientText
                            colors={["#5d94d7", "#5a6168", "#1e1f21"]}
                            animationSpeed={5}
                            showBorder={false}
                            className="inline"
                          >
                            priyanshu
                          </GradientText>
             <FiSmile size={18} className="ml-2 animate-pulse" />
          </p>

          <h1 className="text-5xl md:text-4xl font-black leading-tight mb-3
            dark:text-white text-gray-900">
            Designer
            <span className="block dark:text-zinc-400 text-zinc-500">
              Data_Analyst & Creative_Coder
            </span>
          </h1>

          <p className="text-2lg leading-relaxed max-w-xl mb-8
            dark:text-zinc-400 text-zinc-700/100">
            Building intelligent systems powered by data and creativity
          </p>

          <div className="flex gap-4 flex-wrap">
            <a
              href="https://docs.google.com/document/d/14TxRuxXbM5NHvk2eK67MxWU4YnDQQSfl/edit?usp=sharing&ouid=111029989741912499048&rtpof=true&sd=true"
              className="px-6 py-3 rounded-2xl transition duration-300 cursor-pointer
                dark:border dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:active:bg-zinc-400
                border border-zinc-300 text-zinc-700 hover:bg-zinc-100 active:bg-zinc-300"
            >
              Resume <FaDownload size={18} className="inline-block ml-2" />
            </a>

            <a
              href="https://github.com/Butkii025"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 rounded-2xl transition duration-300 cursor-pointer inline-block
                dark:border dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:active:bg-zinc-400
                border border-zinc-300 text-zinc-700 hover:bg-zinc-100 active:bg-zinc-300"
            >
              GitHub <FaGithub size={18} className="inline-block ml-2" />
            </a>
          </div>
        </div>

        {/* Profile Card */}
        <div className="flex justify-center mt-4" style={{ perspective: '800px' }}>
          <div
            ref={cardRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{ transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
            className="relative w-[280px] h-[380px] rounded-[3rem] overflow-hidden shadow-2xl backdrop-blur-xl cursor-default
              dark:border dark:border-white/20 dark:bg-zinc-900/50 dark:bg-gradient-to-br dark:from-white/5 dark:to-white/0 dark:hover:border-blue-400/50 dark:hover:shadow-zinc-500/10
              border border-zinc-200 bg-white/60 bg-gradient-to-br hover:border-blue-400/50 hover:shadow-zinc-300/20"
          >
            <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-white/10 dark:to-transparent bg-gradient-to-b from-zinc-100/30 to-transparent" />

            <div
              className="card-glow absolute inset-0 pointer-events-none rounded-[3rem] transition-opacity duration-300"
              style={{ opacity: 0, background: 'radial-gradient(circle at 50% 50%, rgba(96,165,250,0.18), transparent 70%)' }}
            />

            <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">

              {/* Inner imag */}
              <div style={{ perspective: '400px', transformStyle: 'preserve-3d' }}>
                <img
                  ref={imgRef}
                  src="/profile.png"
                  alt="Profile Full"
                  style={{ transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
                  className="w-45 h-55 rounded-[3rem] object-cover shadow-2xl cursor-pointer
                    dark:border-4 dark:border-zinc-700 hover:scale-101
                    border-4 border-zinc-200"
                  onClick={onProfileClick}
                />
              </div>

              <h2 className="text-2xl font-bold font-['Alex_Brush',_cursive] mt-2
                dark:text-white text-gray-800">
                PRIYANSHU
              </h2>
              <br />

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=priyanshuvijay262@gmail.com&su=Portfolio%20Inquiry&body=Hii%20Priyanshu%2C%20i%27m%20here%20through%20your%20Portfolio%20!"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-2xl transition duration-300 cursor-pointer
                  dark:border dark:border-white/20 dark:text-white dark:hover:bg-white/10 dark:active:bg-zinc-400
                  border border-zinc-300 text-zinc-700 hover:bg-zinc-100 active:bg-zinc-200"
              >
                Say Hi <MdWavingHand size={18} className="inline-block ml-2 animate-wave" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}