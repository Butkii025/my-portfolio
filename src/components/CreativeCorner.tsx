"use client";

import React, { useState } from 'react';
import { FaPaintBrush } from 'react-icons/fa';
import FunZone from './FunZone';

interface ArtImage {
  id: number;
  name: string;
}

export default function CreativeCorner(): React.JSX.Element {
  const [selectedArtImage, setSelectedArtImage] = useState<ArtImage | null>(null);

  const artImages: ArtImage[] = [
    { id: 1, name: 'artworks/image.jpg' },
    { id: 2, name: 'artworks/image1.jpg' },
    { id: 3, name: 'artworks/image2.jpg' },
    { id: 4, name: 'artworks/image3.jpg' },
    { id: 5, name: 'artworks/image4.jpg' },
    { id: 6, name: 'artworks/image5.jpg' },
    { id: 7, name: 'artworks/image6.jpg' },
    { id: 8, name: 'artworks/image7.jpg' },
    { id: 9, name: 'artworks/image8.jpg' },
    { id: 10, name: 'artworks/image9.jpg' },
  ];

  const trackLayers = [0, 1];
  const btnStyle = "inline-block px-4 py-2 rounded-xl border border-zinc-700 hover:bg-white/10 active:bg-blue-400 text-xs transition duration-300 text-center ml-4";

  return (
    <section id="creative_corner" className="py-28 px-6 overflow-hidden bg-black text-white">
      {/* HEADER SECTION */}
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-zinc-500 uppercase tracking-[0.2em] mb-4">creative_corner</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Art_Gallery<FaPaintBrush size={20} className="inline-block ml-2 animate-bounce"/>
          </h2>
        </div>

        <p className="text-zinc-400 text-2lg leading-relaxed mb-12">
          This space reflects the artistic side of my personality beyond technology and coding. I enjoy sketching, portrait art, charcoal drawing, poster designing, and creating meaningful visual concepts that express emotions, stories, and social messages. Alongside personal projects, I have also completed numerous commissioned artworks for friends and clients, bringing their ideas to life with creativity and precision.
        </p>

        <h3>Moment : 
          <a href="https://www.youtube.com/shorts/lpRupMkGGaM" target="_blank" rel="noreferrer" className={btnStyle}>
            झलक
          </a>
        </h3>
        <p className="text-zinc-400 font-['Alex_Brush',_cursive] text-sm leading-relaxed mb-12 mt-2">
          Led team “Kala_Arpan” in creating a record-setting Rangoli artwork using 50,000 disposable cups, covering 2,500 sq. ft., at Bhoomi Fest 2026, organised by Lucknow University in collaboration with SFD-Awadh, as a heartfelt tribute to the victims of Pahalgam.
        </p>
      </div>

      {/* CIRCULAR PERSPECTIVE MARQUEE CONTAINER */}
      <div 
        className="relative w-full flex overflow-x-hidden py-12 bg-zinc-900/30 group"
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      >
        {trackLayers.map((layerIndex) => (
          <div 
            key={`track-layer-${layerIndex}`}
            className="flex space-x-6 group-hover:[animation-play-state:paused] shrink-0 pr-6"
            style={{ 
              animation: 'marquee 30s linear infinite',
              transformStyle: 'preserve-3d'
            }}
            aria-hidden={layerIndex === 1 ? "true" : undefined}
          >
            {artImages.map((image, index) => {
              const curveAngle = (index % 2 === 0) ? '30deg' : '-20deg';
              
              return (
                <div
                  key={`layer-${layerIndex}-${image.id}`}
                  className="relative w-44 h-44 cursor-pointer transition-all duration-500 hover:scale-110"
                  style={{
                    transform: `rotateY(${curveAngle}) translateZ(10px)`,
                    transformStyle: 'preserve-3d'
                  }}
                  onClick={() => setSelectedArtImage(image)}
                >
                  <img
                    src={`/${image.name}`}
                    alt={`Art ${image.id}`}
                    className="w-full h-full object-cover rounded-xl border border-zinc-300/30 shadow-2xl transition-all duration-300 group-hover:opacity-70 hover:!opacity-100"
                    style={{ 
                      boxShadow: '0 15px 35px rgba(96, 165, 250, 0.2)',
                    }}
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none mix-blend-multiply" />
                </div>
              );
            })}
          </div>
        ))}
      </div>
      
      <p className="text-zinc-400 text-center text-sm italic mt-20">
        “ Since you’ve come this far, here’s some cool stuff ”
      </p>

      <div className="max-w-4xl mx-auto mt-24 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 px-4">
        
        {/* VIDEO SECTION */}
        <div className="text-center flex flex-col justify-between h-full">
          {/* <div>
            
            <video 
              src="/artworks/pv-edit.mp4" 
              controls 
              className="w-[270px] h-[480px] rounded-xl border border-zinc-700 shadow-2xl transition-transform duration-300 hover:scale-[1.02] cursor-pointer hover:border-blue-400/50 backdrop-blur-sm hover:shadow-blue-500/10"
            />
          </div>
          <p className="text-zinc-400 text-sm italic mt-6">
            Am I an editor ??
          </p> */}
        </div>

        {/* FUN ZONE GAME */}
        <FunZone />

      </div>

      {/* ART IMAGE MODAL */}
      {selectedArtImage && (
        <>
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 animate-in fade-in duration-200"
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
                className="max-w-2xl max-h-[75vh] rounded-lg border-2 border-blue-400 shadow-2xl object-contain bg-zinc-950"
                style={{ boxShadow: '0 0 40px rgba(96, 165, 250, 0.4), inset 0 0 40px rgba(96, 165, 250, 0.1)' }}
              />
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  );
}