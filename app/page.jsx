'use client';

import { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import Home from '../src/components/Home';
import About from '../src/components/About';
import Skills from '../src/components/Skills';
import Projects from '../src/components/Projects';
import Credentials from '../src/components/Credentials'
import CreativeCorner from '../src/components/CreativeCorner';
import Contact from '../src/components/Contact';
import Education from '../src/components/education';
// import CanvasCursor from '../src/components/CanvasCursor';
import SmoothFollower from '@/src/components/SmoothFollower';

export default function VijayPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoOpen, setIsLogoOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedArtImage, setSelectedArtImage] = useState(null);

  const navLinks = [
    { label: <FaHome size={18} className="inline-block ml-2" />, href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Credentials', href: '#credentials' },
    { label: 'Creative_Corner', href: '#creative_corner' },
    { label: 'Contact', href: '#contact' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openLogo = () => {
    setIsLogoOpen(true);
  };

  const closeLogo = () => {
    setIsLogoOpen(false);
  };

  const openProfile = () => {
    setIsProfileOpen(true);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-1">
          {/* LEFT SIDE */}
          <div className="flex items-center gap-3">
            <img
              src="/pv_newlogo.jpg"
              alt="Logo"
              className="h-20 w-20 rounded-full cursor-pointer hover:scale-center transition duration-300"
              onClick={openLogo}
            />
            <h1 className="text-2xl font-bold tracking-wider">P_Vijay</h1>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex gap-8 text-sm text-zinc-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="cursor-pointer hover:text-blue-400 transition duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* HAMBURGER MENU */}
          <button
            onClick={toggleMenu}
            className="flex flex-col gap-1 cursor-pointer p-2"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={closeMenu}
              style={{ boxShadow: 'inset 0 0 40px rgba(96, 165, 250, 0.15)' }}
            />
            <div className="absolute top-16 right-6 w-48 bg-black border-2 border-blue-400 rounded-2xl shadow-2xl z-40 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex flex-col py-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="px-6 py-3 text-white hover:text-blue-400 hover:bg-white/5 cursor-pointer transition duration-300 text-sm"
                  >
                    {link.label}
                  </a>
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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={closeLogo}
            style={{ boxShadow: 'inset 0 0 60px rgba(96, 165, 250, 0.2)' }}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div
              className="pointer-events-auto animate-in fade-in zoom-in duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="/pv_newlogo.jpg"
                alt="Profile Logo"
                className="w-64 h-64 rounded-full border-2 border-blue-400 shadow-2xl object-cover"
                style={{ boxShadow: '0 0 40px rgba(96, 165, 250, 0.4), inset 0 0 40px rgba(96, 165, 250, 0.1)' }}
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
            style={{ boxShadow: 'inset 0 0 60px rgba(96, 165, 250, 0.2)' }}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div
              className="pointer-events-auto animate-in fade-in zoom-in duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="/profile.png"
                alt="Profile Picture"
                className="w-80 h-80 rounded-2xl border-2 border-blue-400 shadow-2xl object-cover"
                style={{ boxShadow: '0 0 40px rgba(96, 165, 250, 0.4), inset 0 0 40px rgba(96, 165, 250, 0.1)' }}
              />
            </div>
          </div>
        </>
      )}

      {/* ART IMAGE MODAL */}
      {selectedArtImage && (
        <>
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={() => setSelectedArtImage(null)}
            style={{ boxShadow: 'inset 0 0 60px rgba(96, 165, 250, 0.2)' }}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div
              className="pointer-events-auto animate-in fade-in zoom-in duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={`/${selectedArtImage.name}`}
                alt={`Art ${selectedArtImage.id}`}
                className="max-w-2xl max-h-96 rounded-lg border-4 border-blue-400 shadow-2xl object-cover"
                style={{ boxShadow: '0 0 40px rgba(96, 165, 250, 0.4), inset 0 0 40px rgba(96, 165, 250, 0.1)' }}
              />
            </div>
          </div>
        </>
      )}

      {/* SECTIONS - Imported Components */}
      <Home onProfileClick={openProfile} />
      
      <About onProfileClick={openProfile} />
      <Education />
      
      <Skills />
      
      <Projects />
      
      <Credentials />
      
      <CreativeCorner onImageClick={setSelectedArtImage} />
      
      <Contact />

      {/* FOOTER */}
      <footer className="py-8 border-t border-white/10 text-center text-zinc-500 text-sm">
        © 2026 P_Vijay. All rights reserved
      </footer>
      {/* <CanvasCursor /> */}
      <SmoothFollower />
    </div>
  );
}
