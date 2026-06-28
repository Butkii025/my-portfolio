'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FiX, FiPlay } from 'react-icons/fi';

export default function VideoBox() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const previewRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = previewRef.current;
    if (!v) return;
    if (hovered) { 
      v.currentTime = 0; 
      v.play().catch(() => {}); 
    } else {
      v.pause();
    }
  }, [hovered]);

  return (
    <>
      <div className="flex flex-col items-center gap-3">
        <p className="text-xs uppercase tracking-widest dark:text-zinc-500 text-zinc-400">bingoo..</p>

        <div
          className="relative w-[180px] h-[100px] rounded-2xl overflow-hidden cursor-pointer group transition-all duration-500
            dark:border dark:border-zinc-800 dark:hover:border-blue-400/60 dark:hover:shadow-blue-500/20
            border border-zinc-200 hover:border-blue-400/60 hover:shadow-blue-500/10
            hover:shadow-2xl"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => setOpen(true)}
        >
          <video
            ref={previewRef}
            src="/artworks/pv-edit.mp4"
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
            style={{ filter: hovered ? 'blur(3px) brightness(0.55)' : 'blur(8px) brightness(0.45)' }}
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10 dark:bg-transparent bg-white/10">
            <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-400
              dark:border-zinc-600 border-zinc-300
              ${hovered ? 'scale-110 border-blue-400 shadow-[0_0_16px_rgba(96,165,250,0.5)]' : ''}`}>
              <FiPlay size={16} className={`ml-0.5 transition-colors duration-300 ${hovered ? 'text-blue-400' : 'dark:text-zinc-400 text-zinc-500'}`} />
            </div>
          </div>

          {hovered && <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{ boxShadow: 'inset 0 0 30px rgba(96,165,250,0.15)' }} />}
        </div>

        <p className="text-xs italic dark:text-zinc-500 text-zinc-400">hover to peek, click to watch</p>
      </div>

      {open && (
        <>
          <div 
            className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 animate-in fade-in duration-200"
            onClick={() => setOpen(false)} 
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div 
              className="pointer-events-auto relative animate-in fade-in zoom-in duration-300"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setOpen(false)}
                className="absolute -top-4 -right-4 z-10 p-1.5 rounded-full shadow-lg transition duration-200 cursor-pointer
                  dark:bg-zinc-900 dark:border dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-white
                  bg-white border border-zinc-200 text-zinc-500 hover:text-black"
              >
                <FiX size={16} />
              </button>

              <video
                src="/artworks/pv-edit.mp4"
                controls
                autoPlay
                className="w-[300px] h-[540px] md:w-[280px] md:h-[500px] rounded-2xl shadow-2xl object-cover border-2 border-blue-400"
                style={{ boxShadow: '0 0 40px rgba(96,165,250,0.4)' }}
              />

              <p className="text-center text-xs dark:text-zinc-500 text-zinc-400 italic mt-3">
                editor ??
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}