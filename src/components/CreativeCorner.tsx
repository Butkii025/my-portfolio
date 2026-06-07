"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FaPaintBrush } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight, FiX, FiPlay } from 'react-icons/fi';
import FunZone from './FunZone';

interface ArtImage { 
  id: number; 
  name: string; 
}

const artImages: ArtImage[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `artworks/image${i === 0 ? '' : i}.jpg`,
}));

const rangoliFacts = [
  { icon: '🎨', text: '50,000 disposable cups' },
  { icon: '📐', text: '2,500 sq. ft. coverage' },
  { icon: '🏛️', text: 'Bhoomi Fest 2026, Lucknow University' },
  { icon: '🕊️', text: 'Tribute to Pahalgam victims' },
  { icon: '🤝', text: 'With SFD-Awadh' },
];

function useTilt(strength = 12) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `perspective(500px) rotateX(${-(y/r.height)*strength}deg) rotateY(${(x/r.width)*strength}deg) scale3d(1.08,1.08,1.08)`;
    const g = el.querySelector('.art-glow') as HTMLElement;
    if (g) {
      g.style.background = `radial-gradient(circle at ${50+(x/r.width)*60}% ${50+(y/r.height)*60}%, rgba(96,165,250,0.3), transparent 70%)`;
      g.style.opacity = '1';
    }
  };
  const leave = () => {
    const el = ref.current; if (!el) return;
    el.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    const g = el.querySelector('.art-glow') as HTMLElement;
    if (g) g.style.opacity = '0';
  };
  return { ref, move, leave };
}
function ArtCard({ image, index, onClick }: { image: ArtImage; index: number; onClick: () => void }) {
  const { ref, move, leave } = useTilt(12);
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={leave} onClick={onClick}
      className="relative w-44 h-44 cursor-pointer shrink-0 mx-3"
      style={{ transform: `rotateY(${index % 2 === 0 ? '30deg' : '-20deg'}) translateZ(10px)`, transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out' }}>
      <img src={`/${image.name}`} alt={`Art ${image.id}`}
        className="w-full h-full object-cover rounded-xl border border-zinc-300/30 shadow-2xl opacity-80 hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: '0 15px 35px rgba(96,165,250,0.2)' }} />
      <div className="art-glow absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300" style={{ opacity: 0 }} />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none mix-blend-multiply" />
    </div>
  );
}

function VideoBox() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const previewRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = previewRef.current;
    if (!v) return;
    if (hovered) { v.currentTime = 0; v.play().catch(() => {}); }
    else v.pause();
  }, [hovered]);

  return (
    <>
      {/* box */}
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

          {/* content */}
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

      {/* Video */}
      {open && (
        <>
          <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 animate-in fade-in duration-200"
            onClick={() => setOpen(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto relative animate-in fade-in zoom-in duration-300"
              onClick={e => e.stopPropagation()}>
              {/* Close */}
              <button onClick={() => setOpen(false)}
                className="absolute -top-4 -right-4 z-10 p-1.5 rounded-full shadow-lg transition duration-200 cursor-pointer
                  dark:bg-zinc-900 dark:border dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-white
                  bg-white border border-zinc-200 text-zinc-500 hover:text-black">
                <FiX size={16} />
              </button>

              <video
                src="/artworks/pv-edit.mp4"
                controls
                autoPlay
                className="w-[300px] h-[540px] md:w-[280px] md:h-[500px] rounded-2xl shadow-2xl object-cover
                  border-2 border-blue-400"
                style={{ boxShadow: '0 0 40px rgba(96,165,250,0.4)' }}
              />

              <p className="text-center text-xs dark:text-zinc-500 text-zinc-400 italic mt-3">
                Am I an editor ??
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default function CreativeCorner(): React.JSX.Element {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const goNext = useCallback(() => setSelectedIndex(i => i === null ? 0 : (i + 1) % artImages.length), []);
  const goPrev = useCallback(() => setSelectedIndex(i => i === null ? 0 : (i - 1 + artImages.length) % artImages.length), []);

  useEffect(() => {
    if (selectedIndex === null) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [selectedIndex, goNext, goPrev]);

  return (
    <section id="creative_corner" className="py-28 px-6 overflow-hidden dark:text-white text-black">

      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="uppercase tracking-[0.2em] mb-4 dark:text-zinc-500 text-zinc-500">creative_corner</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Art_Gallery <FaPaintBrush size={20} className="inline-block ml-2 animate-bounce" />
          </h2>
        </div>

        <p className="leading-relaxed mb-10 dark:text-zinc-400 text-zinc-500 text-2lg max-w-3xl">
          Beyond code — I sketch, draw portraits, do charcoal work, design posters, and create visuals that carry emotions and stories. I've also done commissioned pieces for friends and clients.
        </p>

        <div className="flex items-center gap-3 mb-6">
          <span className="font-medium text-sm">Moment :</span>
          <a href="https://www.youtube.com/shorts/lpRupMkGGaM" target="_blank" rel="noreferrer"
            className="px-3 py-1.5 rounded-xl border text-sm transition duration-300
              dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-blue-400 dark:hover:text-blue-400
              border-zinc-200 text-zinc-500 hover:border-blue-400 hover:text-blue-400">
            झलक
          </a>
        </div>

        {/* Rangoli */}
        <div className="flex flex-wrap gap-3 mb-14">
          <span className="text-xs uppercase tracking-widest dark:text-zinc-600 text-zinc-400 self-center mr-1">Kala_Arpan —</span>
          {rangoliFacts.map((f, i) => (
            <span key={i} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs
              dark:bg-zinc-900 dark:border dark:border-zinc-800 dark:text-zinc-400
              bg-zinc-100 border border-zinc-200 text-zinc-600">
              {f.icon} {f.text}
            </span>
          ))}
        </div>
      </div>

      {/* Marquee loop contarner */}
      <div className="relative w-full overflow-hidden py-12 dark:bg-zinc-900/30 bg-zinc-100/60"
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
        <div className="flex w-max" style={{ animation: 'marquee 35s linear infinite' }}>
          {[...artImages, ...artImages].map((img, i) => (
            <ArtCard key={i} image={img} index={i % artImages.length} onClick={() => setSelectedIndex(i % artImages.length)} />
          ))}
        </div>
        <div className="absolute left-0 top-0 h-full w-20 pointer-events-none z-10 dark:bg-gradient-to-r dark:from-black dark:to-transparent bg-gradient-to-r from-white to-transparent" />
        <div className="absolute right-0 top-0 h-full w-20 pointer-events-none z-10 dark:bg-gradient-to-l dark:from-black dark:to-transparent bg-gradient-to-l from-white to-transparent" />
      </div>

      <p className="dark:text-zinc-400 text-zinc-500 text-center text-sm italic mt-20">
        " Since you've come this far, here's some cool stuff "
      </p>

      <div className="max-w-4xl mx-auto mt-24 flex flex-col lg:flex-row items-center justify-center gap-16 px-4">
        <VideoBox />
        <FunZone />
      </div>

      {selectedIndex !== null && (
        <>
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-in fade-in duration-200"
            onClick={() => setSelectedIndex(null)} style={{ boxShadow: 'inset 0 0 60px rgba(96,165,250,0.2)' }} />
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto relative animate-in fade-in zoom-in duration-300 flex flex-col items-center gap-4"
              onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedIndex(null)}
                className="absolute -top-4 -right-4 z-10 p-1.5 rounded-full shadow-lg transition duration-200 cursor-pointer
                  dark:bg-zinc-900 dark:border dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-white
                  bg-white border border-zinc-200 text-zinc-500 hover:text-black">
                <FiX size={16} />
              </button>
              <img key={selectedIndex} src={`/${artImages[selectedIndex].name}`} alt={`Art ${selectedIndex + 1}`}
                className="max-w-[85vw] max-h-[70vh] rounded-lg border-2 border-blue-400 shadow-2xl object-contain dark:bg-zinc-950 bg-zinc-100 animate-in fade-in zoom-in duration-200"
                style={{ boxShadow: '0 0 40px rgba(96,165,250,0.4)' }} />
              <div className="flex items-center gap-6">
                <button onClick={goPrev} className="p-2 rounded-xl transition duration-200 cursor-pointer
                  dark:border dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-white dark:hover:border-blue-400/50
                  border border-zinc-200 text-zinc-500 hover:text-black hover:border-blue-400/50">
                  <FiChevronLeft size={20} />
                </button>
                <div className="flex gap-1.5">
                  {artImages.map((_, i) => (
                    <button key={i} onClick={() => setSelectedIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === selectedIndex ? 'w-4 bg-blue-400' : 'w-1.5 dark:bg-zinc-600 bg-zinc-300'}`} />
                  ))}
                </div>
                <button onClick={goNext} className="p-2 rounded-xl transition duration-200 cursor-pointer
                  dark:border dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-white dark:hover:border-blue-400/50
                  border border-zinc-200 text-zinc-500 hover:text-black hover:border-blue-400/50">
                  <FiChevronRight size={20} />
                </button>
              </div>
              <p className="text-xs dark:text-zinc-500 text-zinc-400">{selectedIndex + 1} / {artImages.length}</p>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}