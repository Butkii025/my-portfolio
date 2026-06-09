'use client';

import { useState, useEffect } from 'react';
import { FaHome, FaMoon, FaSun } from 'react-icons/fa';
import Hero from '../src/components/Hero';
import About from '../src/components/About';
import Skills from '../src/components/Skills';
import Projects from '../src/components/Projects';
import Credentials from '../src/components/Credentials';
import Research from '../src/components/Research';
import CreativeCorner from '../src/components/CreativeCorner';
import Contact from '../src/components/Contact';
import SmoothFollower from '@/src/components/anim/SmoothFollower';
import Footer from '../src/components/Footer';
import InteractiveDots from '@/src/components/anim/Interactivedots';
import Experience from '../src/components/Experience';
import AcademicBlock from '../src/components/Academics';
import LandingPage from '../src/components/Prepage/LandingPage'



export default function VijayPortfolio() {
  const [isMenuOpen,    setIsMenuOpen]    = useState(false);
  const [isLogoOpen,    setIsLogoOpen]    = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDark,        setIsDark]        = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add('dark');
    else        root.classList.remove('dark');
  }, [isDark]);

  const logoSrc = isDark ? '/logo-on-dark.png' : '/logo-on-white.png';

  const desktopLinks = [
    { label: <FaHome size={16} />, href: '#home' },
    { label: 'About',          href: '#about'          },
    { label: 'Projects',       href: '#projects'       },
    { label: 'Academics',     href: '#academics'     },
    { label: 'Creative_Corner',href: '#creative_corner'},
    { label: 'Contact',        href: '#contact'        },
  ];

  const allLinks = [
    { label: 'Home',           href: '#home'           },
    { label: 'About',          href: '#about'          },
    { label: 'Experience',     href: '#experience'     },
    { label: 'Academics',     href: '#academics'       },
    { label: 'Skills',         href: '#skills'         },
    { label: 'Projects',       href: '#projects'       },
    { label: 'Credentials',    href: '#credentials'    },
    { label: 'Research',       href: '#research'       },
    { label: 'Creative_Corner',href: '#creative_corner'},
    { label: 'Contact',        href: '#contact'        },
  ];

  const toggleMenu   = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu    = () => setIsMenuOpen(false);
  const openLogo     = () => setIsLogoOpen(true);
  const closeLogo    = () => setIsLogoOpen(false);
  const openProfile  = () => setIsProfileOpen(true);
  const closeProfile = () => setIsProfileOpen(false);

  return (
    <>
      {/* 1. The Preloader Lifecycle */}
      {showPreloader && (
        <LandingPage onEnter={() => setShowPreloader(false)} />
      )}
    <div className="relative min-h-screen dark:bg-black bg-white dark:text-white text-gray-900 transition-colors duration-300">

      {/* Global interactive dot background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <InteractiveDots
          backgroundColor={isDark ? '#000000' : '#ffffff'}
          dotColor={isDark ? '#395e8b' : '#93c5fd'}
          gridSpacing={25}
          animationSpeed={0.005}
          removeWaveLine={true}
        />
      </div>

      {/* All content above dots */}
      <div className="relative z-10">

        {/* NAVBAR */}
        <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md dark:bg-zinc-900/10 bg-white/70 border-b dark:border-white/5 border-blue-100 transition-colors duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6">

            {/* Logo */}
            <div className="flex items-center gap-3 py-1">
              <img
                src={logoSrc}
                alt="Logo"
                className="h-15 w-15 rounded-full cursor-pointer hover:scale-105 transition duration-300"
                onClick={openLogo}
              />
              <div className="flex flex-col justify-center">
                <h1 className="text-2xl font-bold tracking-wider leading-none dark:text-white text-zinc-800">
                  P_Vijay
                </h1>
              </div>
            </div>

            {/* Desktop nav + theme toggle + hamburger */}
            <div className="flex items-center gap-6">

              {/* Desktop links */}
              <div className="hidden md:flex items-center gap-1">
                {desktopLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 rounded-xl text-sm font-medium transition duration-300
                      dark:text-zinc-300 dark:hover:text-white dark:hover:bg-white/10
                      text-gray-600 hover:text-blue-700 hover:bg-blue-100 hover:scale-105"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Theme toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                aria-label="Toggle theme"
                className="p-2 rounded-xl transition duration-300 cursor-pointer
                  dark:text-yellow-300 dark:hover:bg-white/10 dark:hover:text-yellow-300
                  text-zinc-600 hover:bg-zinc-100 hover:text-zinc-800 hover:scale-110"
              >
                {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
              </button>

              {/* Hamburger — mobile only */}
              <button
                onClick={toggleMenu}
                className="flex md:hidden flex-col gap-1 cursor-pointer p-2 z-50"
                aria-label="Toggle menu"
              >
                <span className={`w-6 h-0.5 transition-all duration-300 dark:bg-white bg-zinc-700 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`w-6 h-0.5 transition-all duration-300 dark:bg-white bg-zinc-700 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </button>
            </div>
          </div>

          {/* Mobile dropdown */}
          {isMenuOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                onClick={closeMenu}
                style={{ boxShadow: 'inset 0 0 40px rgba(96,165,250,0.15)' }}
              />
              <div className="absolute top-24 right-6 w-48 rounded-2xl shadow-2xl z-40 animate-in fade-in slide-in-from-top-2 duration-300
                dark:bg-black dark:border-2 dark:border-blue-400
                bg-white border-2 border-blue-400">
                <div className="flex flex-col py-4">
                  {allLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className="px-6 py-3 text-sm transition duration-300 cursor-pointer
                        dark:text-white dark:hover:text-blue-400 dark:hover:bg-white/5
                        text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </>
          )}
        </nav>

        {/* LOGO MODAL — theme aware */}
        {isLogoOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              onClick={closeLogo}
              style={{ boxShadow: 'inset 0 0 60px rgba(96,165,250,0.2)' }}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
              <div
                className="pointer-events-auto animate-in fade-in zoom-in duration-300"
                onClick={e => e.stopPropagation()}
              >
                <img
                  src={logoSrc}
                  alt="Profile Logo"
                  className="w-64 h-64 rounded-full border-2 border-blue-400 shadow-2xl object-cover"
                  style={{ boxShadow: '0 0 40px rgba(96,165,250,0.4)' }}
                />
              </div>
            </div>
          </>
        )}

        {/* PROFILE MODAL */}
        {isProfileOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              onClick={closeProfile}
              style={{ boxShadow: 'inset 0 0 60px rgba(96,165,250,0.2)' }}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
              <div
                className="pointer-events-auto animate-in fade-in zoom-in duration-300"
                onClick={e => e.stopPropagation()}
              >
                <img
                  src="/profile.png"
                  alt="Profile Picture"
                  className="w-80 h-80 rounded-full border-2 border-blue-400 shadow-2xl object-cover"
                  style={{ boxShadow: '0 0 40px rgba(96,165,250,0.4)' }}
                />
              </div>
            </div>
          </>
        )}

        {/* SECTIONS */}
        
        <Hero onProfileClick={openProfile} />
        <About onProfileClick={openProfile} />
        <Skills />
        <Projects />
        <Experience />
        <AcademicBlock />
        <Credentials />
        <Research />
        <CreativeCorner />
        <Contact />
        <Footer />

        {/* Cursor */}
        <SmoothFollower />

      </div>
    </div>
  </>);
  
}