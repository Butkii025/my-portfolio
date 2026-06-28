'use client';

import { useEffect, useState } from 'react';
import CatAnimation from './CatAnimation';
import GreetingLoader from './GreetingLoader';

export default function LandingPage({ onEnter }) {
  const [progress, setProgress] = useState(0);
  const [logoVisible, setLogoVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLogoVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(t);
          return 100;
        }
        return p + 0.6;
      });
    }, 40);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => {
        setFadeOut(true);
        setTimeout(onEnter, 800);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [progress, onEnter]);

  const handleSkip = () => {
    setFadeOut(true);
    setTimeout(onEnter, 600);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-black"
      style={{
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? 'none' : 'auto',
        transition: 'opacity 0.8s ease',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(96,165,250,0.15) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(96,165,250,0.12), transparent 70%)' }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        
        <div
          className="transition-all duration-1000"
          style={{
            opacity: logoVisible ? 1 : 0,
            transform: logoVisible ? 'scale(1) translateY(0)' : 'scale(0.7) translateY(20px)',
          }}
        >
          <img
            src="/logo-on-dark.png"
            alt="P_Vijay"
            className="w-28 h-28 rounded-full object-cover"
            style={{ boxShadow: '0 0 40px rgba(96,165,250,0.3), 0 0 80px rgba(96,165,250,0.1)' }}
          />
        </div>

        <div
          className="transition-all duration-1000 delay-300"
          style={{ opacity: logoVisible ? 1 : 0, transform: logoVisible ? 'translateY(0)' : 'translateY(10px)' }}
        >
          <h1 className="text-3xl md:text-4xl font-black tracking-widest text-white mb-1">
            P_Vijay
          </h1>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mt-4">
            ML Engineer · Data Analyst · Creative Coder
          </p>
        </div>

        <GreetingLoader progress={progress} logoVisible={logoVisible} />

        <button
          onClick={handleSkip}
          className="text-xs text-zinc-700 hover:text-zinc-400 transition duration-300 tracking-widest uppercase cursor-pointer mt-2"
        >
          skip →
        </button>
      </div>

      <CatAnimation />

      <div className="absolute bottom-6 text-center">
        <p className="text-xs text-zinc-700 tracking-widest">
          P_Vijay // Portfolio // 2026
        </p>
      </div>
    </div>
  );
}