'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaMoon, FaSun, FaDesktop } from 'react-icons/fa';

import CreativeCorner from '../../src/components/ArtGallery';
import Contact from '../../src/components/Contact';
import Footer from '../../src/components/Footer';
import ChatBot from '../../src/components/ChatBot';

import SmoothFollower from '@/src/anim/SmoothFollower';
import InteractiveDots from '@/src/ui/Interactivedots';
import ArtisticConstellationBg from '@/src/ui/ArtisticConstellationBg';

type ThemeMode = 'dark' | 'system' | 'light';

export default function GalleryPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoOpen, setIsLogoOpen] = useState(false);

  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
  const [isDark, setIsDark] = useState(true);

  // Load the same saved theme preference as the homepage
  useEffect(() => {
    const saved = localStorage.getItem('theme_preference');

    if (saved === 'dark' || saved === 'light' || saved === 'system') {
      setThemeMode(saved);
    } else {
      setThemeMode('dark');
      localStorage.setItem('theme_preference', 'dark');
    }
  }, []);

  // Apply theme consistently across pages
  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateTheme = () => {
      let resolvedDark = true;

      if (themeMode === 'system') {
        resolvedDark = mediaQuery.matches;
      } else if (themeMode === 'light') {
        resolvedDark = false;
      }

      setIsDark(resolvedDark);
      root.classList.toggle('dark', resolvedDark);
    };

    updateTheme();
    localStorage.setItem('theme_preference', themeMode);

    if (themeMode === 'system') {
      mediaQuery.addEventListener('change', updateTheme);

      return () => {
        mediaQuery.removeEventListener('change', updateTheme);
      };
    }
  }, [themeMode]);

  // Same logo assets as homepage
  const logoSrc = isDark
    ? '/logo-on-dark.png'
    : '/logo-on-white.png';

  // Desktop navigation
  const desktopLinks = [
    { label: 'About', href: '/#about' },
    { label: 'Stacks', href: '/#skills' },
    { label: 'Projects', href: '/experience#projects' },
    { label: 'Experience', href: '/experience' },
    { label: 'Gallery', href: '/gallery' },
  ];

  // Complete navigation for mobile
  const allLinks = [
    { label: 'Home', href: '/#hero' },
    { label: 'About', href: '/#about' },
    { label: 'Academics', href: '/#academics' },
    { label: 'Stacks', href: '/#skills' },
    { label: 'Credentials', href: '/#credentials' },
    { label: 'Research', href: '/#research' },
    { label: 'Experience', href: '/experience' },
    { label: 'Projects', href: '/experience#projects' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/gallery#contact' },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <div className="relative min-h-screen bg-white text-zinc-900 transition-colors duration-500 dark:bg-black dark:text-zinc-100">

        {/* BACKGROUND */}
        <div className="pointer-events-none fixed inset-0 z-0">
          {themeMode !== 'system' && (
            <InteractiveDots
              backgroundColor={isDark ? '#000000' : '#ffffff'}
              dotColor={isDark ? '#395e8b' : '#93c5fd'}
              gridSpacing={25}
              animationSpeed={0.005}
              removeWaveLine={true}
            />
          )}
        </div>

        {/* MAIN CONTENT */}
        <div className="relative z-10">

          {/* NAVBAR */}
          <nav className="fixed left-0 top-0 z-50 w-full border-b border-blue-100 bg-white/70 backdrop-blur-md transition-colors duration-300 dark:border-white/5 dark:bg-zinc-900/10">

            <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6">

              {/* LOGO */}
              <div className="flex items-center gap-3 py-1">
                <img
                  src={logoSrc}
                  alt="P_Vijay Logo"
                  onClick={() => setIsLogoOpen(true)}
                  className="h-15 w-15 cursor-pointer rounded-full transition duration-300 hover:scale-105"
                />

                <div className="flex flex-col justify-center">
                  <h1 className="text-2xl font-bold leading-none tracking-wider text-zinc-800 dark:text-white">
                    P_Vijay
                  </h1>
                </div>
              </div>

              {/* DESKTOP NAVIGATION */}
              <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 md:flex">
                {desktopLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-xl px-2.5 py-2 text-sm font-medium transition duration-300 hover:scale-105 dark:text-zinc-300 dark:hover:bg-white/10 ${
                      link.label === 'Gallery'
                        ? 'bg-blue-50 text-blue-500 dark:bg-white/10 dark:text-blue-400'
                        : 'text-gray-600 hover:bg-blue-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* THEME SWITCHER + MOBILE HAMBURGER */}
              <div className="flex items-center gap-6">

                {/* DESKTOP THEME SWITCHER */}
                <div
                  role="radiogroup"
                  aria-label="Theme switcher"
                  className="relative flex items-center rounded-full border border-zinc-200/80 bg-zinc-100/90 p-0.5 shadow-xs backdrop-blur-md transition-all duration-300 dark:border-white/10 dark:bg-zinc-900/90"
                >
                  {/* DARK */}
                  <button
                    type="button"
                    role="radio"
                    aria-checked={themeMode === 'dark'}
                    aria-label="Dark theme"
                    title="Dark theme"
                    onClick={() => setThemeMode('dark')}
                    className={`relative z-10 grid h-7 w-7 cursor-pointer place-items-center rounded-full transition-all duration-200 ${
                      themeMode === 'dark'
                        ? 'scale-105 bg-white text-indigo-500 shadow-xs dark:bg-white/15 dark:text-indigo-400'
                        : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                    }`}
                  >
                    <FaMoon size={12} />
                  </button>

                  {/* SYSTEM */}
                  <button
                    type="button"
                    role="radio"
                    aria-checked={themeMode === 'system'}
                    aria-label="System theme"
                    title="System theme"
                    onClick={() => setThemeMode('system')}
                    className={`relative z-10 grid h-7 w-7 cursor-pointer place-items-center rounded-full transition-all duration-200 ${
                      themeMode === 'system'
                        ? 'scale-105 bg-white text-blue-500 shadow-xs dark:bg-white/15 dark:text-blue-400'
                        : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                    }`}
                  >
                    <FaDesktop size={12} />
                  </button>

                  {/* LIGHT */}
                  <button
                    type="button"
                    role="radio"
                    aria-checked={themeMode === 'light'}
                    aria-label="Light theme"
                    title="Light theme"
                    onClick={() => setThemeMode('light')}
                    className={`relative z-10 grid h-7 w-7 cursor-pointer place-items-center rounded-full transition-all duration-200 ${
                      themeMode === 'light'
                        ? 'scale-105 bg-white text-amber-500 shadow-xs'
                        : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                    }`}
                  >
                    <FaSun size={12} />
                  </button>
                </div>

                {/* MOBILE HAMBURGER */}
                <button
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                  className="z-50 flex cursor-pointer flex-col gap-1 p-2 md:hidden"
                  aria-label="Toggle menu"
                  aria-expanded={isMenuOpen}
                >
                  <span
                    className={`h-0.5 w-6 bg-zinc-700 transition-all duration-300 dark:bg-white ${
                      isMenuOpen ? 'translate-y-1.5 rotate-45' : ''
                    }`}
                  />
                  <span
                    className={`h-0.5 w-6 bg-zinc-700 transition-all duration-300 dark:bg-white ${
                      isMenuOpen ? '-translate-y-1.5 -rotate-45' : ''
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* MOBILE MENU */}
            {isMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
                  onClick={closeMenu}
                  style={{
                    boxShadow: 'inset 0 0 40px rgba(96,165,250,0.15)',
                  }}
                />

                <div className="animate-in fade-in slide-in-from-top-2 absolute right-6 top-24 z-40 w-56 overflow-hidden rounded-2xl border-2 border-blue-400 bg-white shadow-2xl duration-300 dark:bg-black">

                  <div className="flex flex-col py-3">

                    {/* MOBILE THEME SWITCHER */}
                    <div className="mb-2 flex items-center justify-between border-b border-zinc-200 px-4 py-2 dark:border-white/10">
                      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                        Theme
                      </span>

                      <div
                        role="radiogroup"
                        aria-label="Mobile theme switcher"
                        className="flex items-center rounded-full border border-zinc-200/80 bg-zinc-100/90 p-0.5 dark:border-white/10 dark:bg-zinc-900/90"
                      >
                        <button
                          type="button"
                          role="radio"
                          aria-checked={themeMode === 'dark'}
                          aria-label="Dark theme"
                          onClick={() => setThemeMode('dark')}
                          className={`grid h-6 w-6 place-items-center rounded-full ${
                            themeMode === 'dark'
                              ? 'bg-white text-indigo-400 dark:bg-white/20'
                              : 'text-zinc-400'
                          }`}
                        >
                          <FaMoon size={10} />
                        </button>

                        <button
                          type="button"
                          role="radio"
                          aria-checked={themeMode === 'system'}
                          aria-label="System theme"
                          onClick={() => setThemeMode('system')}
                          className={`grid h-6 w-6 place-items-center rounded-full ${
                            themeMode === 'system'
                              ? 'bg-white text-blue-500 dark:bg-white/20'
                              : 'text-zinc-400'
                          }`}
                        >
                          <FaDesktop size={10} />
                        </button>

                        <button
                          type="button"
                          role="radio"
                          aria-checked={themeMode === 'light'}
                          aria-label="Light theme"
                          onClick={() => setThemeMode('light')}
                          className={`grid h-6 w-6 place-items-center rounded-full ${
                            themeMode === 'light'
                              ? 'bg-white text-amber-500'
                              : 'text-zinc-400'
                          }`}
                        >
                          <FaSun size={10} />
                        </button>
                      </div>
                    </div>

                    {/* PAGE LINKS */}
                    {allLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={closeMenu}
                        className={`cursor-pointer px-6 py-2.5 text-sm transition duration-300 hover:bg-blue-50 dark:text-white dark:hover:bg-white/5 ${
                          link.label === 'Gallery'
                            ? 'bg-blue-50 font-semibold text-blue-500 dark:bg-white/5 dark:text-blue-400'
                            : 'text-gray-700'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </nav>

          {/* LOGO MODAL */}
          {isLogoOpen && (
            <>
              <div
                className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
                onClick={() => setIsLogoOpen(false)}
                style={{
                  boxShadow: 'inset 0 0 60px rgba(96,165,250,0.2)',
                }}
              />

              <div className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center">
                <div
                  className="pointer-events-auto animate-in fade-in zoom-in duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={logoSrc}
                    alt="Profile Logo"
                    className="h-64 w-64 rounded-full border-2 border-blue-400 object-cover shadow-2xl"
                    style={{
                      boxShadow: '0 0 40px rgba(96,165,250,0.4)',
                    }}
                  />
                </div>
              </div>
            </>
          )}

          {/* BACK TO HERO */}
          <div className="mx-auto max-w-7xl px-6 pb-2 pt-28">
            <Link
              href="/#hero"
              className="inline-flex items-center gap-2 rounded-full border border-blue-200 px-5 py-2.5 text-sm font-medium text-zinc-700 transition duration-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-500 dark:border-white/15 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-blue-400"
            >
              <span aria-hidden="true">←</span>
              Back to Home
            </Link>
          </div>

          {/* CREATIVE CORNER / GALLERY */}
          <section className="relative">
            <CreativeCorner />
          </section>

          {/* CONTACT */}
          <section id="contact" className="relative scroll-mt-24">
            <Contact />
          </section>

          {/* FOOTER */}
          <Footer />

          {/* CHATBOT */}
          <ChatBot />

          {/* CURSOR FOLLOWER */}
          <SmoothFollower />

        </div>
      </div>
    </>
  );
}
