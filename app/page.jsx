
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaMoon, FaSun, FaDesktop } from 'react-icons/fa';

import Hero from '../src/components/Hero';
import About from '../src/components/About';
import AcademicBlock from '../src/components/Academics';
import Skills from '../src/components/Skills';
import Credentials from '../src/components/Credentials';
import Research from '../src/components/Research';
import Experience from '../src/components/Experience';
import Projects from '../src/components/Projects';
import Contact from '../src/components/Contact';
import Footer from '../src/components/Footer';
import ChatBot from '../src/components/ChatBot';
import LandingPage from '../src/Prepage/LandingPage';
import DeveloperZone from '../src/components/DeveloperZone';

import SmoothFollower from '@/src/anim/SmoothFollower';
import InteractiveDots from '@/src/ui/Interactivedots';

const desktopLinks = [
  ['About', '/#about'],
  ['Stacks', '/#skills'],
  ['Projects', '/#projects'],
  ['Experience', '/#experience'],
  ['Gallery', '/gallery'],
];

const mobileLinks = [
  ['Home', '/#hero'],
  ['About', '/#about'],
  ['Academics', '/#academics'],
  ['Stacks', '/#skills'],
  ['Credentials', '/#credentials'],
  ['Research', '/#research'],
  ['Experience', '/#experience'],
  ['Projects', '/#projects'],
  ['Developer Zone', '/#developer-zone'],
  ['Gallery', '/gallery'],
  ['Contact', '/#contact'],
];

export default function VijayPortfolio() {
  const [menu, setMenu] = useState(false);
  const [logo, setLogo] = useState(false);
  const [profile, setProfile] = useState(false);
  const [themeMode, setThemeMode] = useState('dark');
  const [isDark, setIsDark] = useState(true);
  const [showPreloader, setShowPreloader] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    const visited = sessionStorage.getItem('hasVisited') === 'true';
    setShowPreloader(!visited);
    setSessionChecked(true);

    const saved = localStorage.getItem('theme_preference');
    if (saved === 'dark' || saved === 'light' || saved === 'system') {
      setThemeMode(saved);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const update = () => {
      const dark = themeMode === 'system'
        ? media.matches
        : themeMode === 'dark';

      setIsDark(dark);
      root.classList.toggle('dark', dark);
    };

    update();
    localStorage.setItem('theme_preference', themeMode);

    if (themeMode === 'system') {
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    }
  }, [themeMode]);

  const logoSrc = isDark ? '/logo-on-dark.png' : '/logo-on-white.png';

  const enterSite = () => {
    sessionStorage.setItem('hasVisited', 'true');
    setShowPreloader(false);
  };

  const themeButtons = [
    [FaMoon, 'dark'],
    [FaDesktop, 'system'],
    [FaSun, 'light'],
  ];

  return (
    <>
      {sessionChecked && showPreloader && <LandingPage onEnter={enterSite} />}

      <div className="relative min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
        <div className="fixed inset-0 z-0 pointer-events-none">
          {themeMode !== 'system' && (
            <InteractiveDots
              backgroundColor={isDark ? '#000000' : '#ffffff'}
              dotColor={isDark ? '#395e8b' : '#93c5fd'}
              gridSpacing={25}
              animationSpeed={0.005}
              removeWaveLine
            />
          )}
        </div>

        <div className="relative z-10">
          {/* NAVBAR */}
          <nav className="fixed top-0 left-0 z-50 w-full border-b border-blue-100 bg-white/70 backdrop-blur-md dark:border-white/5 dark:bg-zinc-900/10">
            <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6">

              <div className="flex items-center gap-3 py-1">
                <img
                  src={logoSrc}
                  alt="Logo"
                  onClick={() => setLogo(true)}
                  className="h-15 w-15 cursor-pointer rounded-full transition hover:scale-105"
                />
                <h1 className="text-2xl font-bold tracking-wider dark:text-white">
                  P_Vijay
                </h1>
              </div>

              {/* DESKTOP LINKS */}
              <div className="absolute left-1/2 hidden -translate-x-1/2 items-center md:flex">
                {desktopLinks.map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    className="rounded-xl px-2.5 py-2 text-sm font-medium text-gray-600 transition hover:scale-105 hover:bg-blue-100 dark:text-zinc-300 dark:hover:bg-white/10"
                  >
                    {label}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-4">
                {/* THEME SWITCHER */}
                <div className="flex rounded-full border border-zinc-200 bg-zinc-100 p-0.5 dark:border-white/10 dark:bg-zinc-900">
                  {themeButtons.map(([Icon, mode]) => (
                    <button
                      key={mode}
                      onClick={() => setThemeMode(mode)}
                      title={`${mode} theme`}
                      aria-label={`${mode} theme`}
                      className={`grid h-7 w-7 place-items-center rounded-full ${
                        themeMode === mode
                          ? 'bg-white text-blue-500 shadow dark:bg-white/15'
                          : 'text-zinc-500'
                      }`}
                    >
                      <Icon size={12} />
                    </button>
                  ))}
                </div>

                {/* MOBILE MENU BUTTON */}
                <button
                  onClick={() => setMenu(!menu)}
                  className="flex flex-col gap-1 p-2 md:hidden"
                  aria-label="Toggle menu"
                >
                  <span className={`h-0.5 w-6 bg-zinc-700 transition dark:bg-white ${menu ? 'translate-y-1.5 rotate-45' : ''}`} />
                  <span className={`h-0.5 w-6 bg-zinc-700 transition dark:bg-white ${menu ? '-translate-y-0.5 -rotate-45' : ''}`} />
                </button>
              </div>
            </div>

            {/* MOBILE MENU */}
            {menu && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                  onClick={() => setMenu(false)}
                />
                <div className="absolute right-6 top-24 z-50 w-56 overflow-hidden rounded-2xl border-2 border-blue-400 bg-white py-3 shadow-2xl dark:bg-black">
                  <div className="flex justify-around border-b border-zinc-200 px-3 pb-3 dark:border-white/10">
                    {themeButtons.map(([Icon, mode]) => (
                      <button key={mode} onClick={() => setThemeMode(mode)}>
                        <Icon className={themeMode === mode ? 'text-blue-500' : 'text-zinc-500'} />
                      </button>
                    ))}
                  </div>

                  {mobileLinks.map(([label, href]) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setMenu(false)}
                      className="block px-6 py-2.5 text-sm text-gray-700 hover:bg-blue-50 dark:text-white dark:hover:bg-white/5"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </nav>

          {/* LOGO MODAL */}
          {logo && (
            <div
              onClick={() => setLogo(false)}
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm"
            >
              <img src={logoSrc} alt="Logo" className="h-64 w-64 rounded-full border-2 border-blue-400 object-cover shadow-2xl" />
            </div>
          )}

          {/* PROFILE MODAL */}
          {profile && (
            <div
              onClick={() => setProfile(false)}
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm"
            >
              <img src="/profile.png" alt="Profile" className="h-80 w-80 rounded-full border-2 border-blue-400 object-cover shadow-2xl" />
            </div>
          )}

          {/* ALL HOMEPAGE SECTIONS */}
          <section id="hero"><Hero onProfileClick={() => setProfile(true)} /></section>
          <section id="about"><About isDark={isDark} themeMode={themeMode} onProfileClick={() => setProfile(true)} /></section>
          <section id="academics"><AcademicBlock /></section>
          <section id="skills"><Skills /></section>
          <section id="credentials"><Credentials /></section>
          <section id="research"><Research /></section>
          <section id="experience"><Experience /></section>
          <section id="projects"><Projects /></section>
          {/* DEVELOPER ZONE */}
          <section id="developer-zone"><DeveloperZone /></section>
          <section id="contact"><Contact /></section>

          <Footer />
          <ChatBot />
          <SmoothFollower />
        </div>
      </div>
    </>
  );
}
