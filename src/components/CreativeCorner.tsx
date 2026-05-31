import React, { useState, useEffect } from 'react';
import { FaPaintBrush, FaExternalLinkAlt } from 'react-icons/fa';

interface ArtImage {
  id: number;
  name: string;
}

interface CreativeCornerProps {
  onImageClick: (image: ArtImage) => void;
}

type SquareValue = 'X' | 'O' | null;
type BoardState = SquareValue[];

const LINES: number[][] = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]              // Diagonals
];

const getWinner = (b: BoardState): SquareValue => {
  for (const [a, c, d] of LINES) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
  }
  return null;
};

export default function CreativeCorner({ onImageClick }: CreativeCornerProps): React.JSX.Element {
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

  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [isUserTurn, setIsUserTurn] = useState<boolean>(true);

  const winner: SquareValue = getWinner(board);
  const isDraw: boolean = !winner && !board.includes(null);
  const isGameOver: boolean = !!winner || isDraw;

  const makeMove = (index: number, player: 'X' | 'O'): void => {
    setBoard((prev) => {
      const next = [...prev];
      next[index] = player;
      return next;
    });
    setIsUserTurn(player === 'O');
  };

  // computerr bot logic alog.
  useEffect(() => {
    if (isUserTurn || isGameOver) return;

    const timer = setTimeout(() => {
      const open = board
        .map((v, i) => (v === null ? i : null))
        .filter((v): v is number => v !== null);
        
      if (!open.length) return;

      for (const player of ['O', 'X'] as const) {
        for (const idx of open) {
          const test = [...board];
          test[idx] = player;
          if (getWinner(test) === player) {
            makeMove(idx, 'O');
            return;
          }
        }
      }

      const choice = open.includes(4) ? 4 : open[Math.floor(Math.random() * open.length)];
      makeMove(choice, 'O');
    }, 500);

    return () => clearTimeout(timer);
  }, [isUserTurn, board, isGameOver]);

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

      {/* MARQUEE LOOP */}
      <div className="relative w-full flex overflow-x-hidden border-y border-white/5 py-6 bg-zinc-900/30 group">
        {trackLayers.map((layerIndex) => (
          <div 
            key={`track-layer-${layerIndex}`}
            className="flex space-x-4 group-hover:[animation-play-state:paused] shrink-0 pr-4"
            style={{ animation: 'marquee 25s linear infinite' }}
            aria-hidden={layerIndex === 1 ? "true" : undefined}
          >
            {artImages.map((image) => (
              <div
                key={`layer-${layerIndex}-${image.id}`}
                className="relative w-44 h-44 cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={() => onImageClick(image)}
              >
                <img
                  src={`/${image.name}`}
                  alt={`Art ${image.id}`}
                  className="w-full h-full object-cover rounded-xl border border-zinc-300/30 shadow-lg"
                  style={{ boxShadow: '0 0 25px rgba(96, 165, 250, 0.15)' }}
                />
              </div>
            ))}
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
        <div className="flex items-center gap-4 relative">
          
          {/* Game Container Wrapper */}
          <div className="w-[300px] bg-gradient-to-br from-zinc-900/50 to-zinc-950 border border-white/10 p-5 rounded-[2rem] backdrop-blur-xl shadow-2xl flex flex-col items-center overflow-hidden">
            
            {/* Compact Title Section */}
            <div className="text-center mb-3">
              <p className="text-zinc-500 uppercase tracking-[0.2em] text-[10px] mb-0.5">Xela_Arcade</p>
              <h2 className="text-2xl font-bold tracking-tight text-white">fun_zone</h2>
              <p className="text-zinc-500 uppercase tracking-[0.2em] text-[7px] mt-0.5">
                Face off against a defensive bot algorithm
                </p>
            </div>

            <div className="w-full flex justify-center items-center h-10 mb-4 rounded-lg bg-zinc-950/60 border border-zinc-900 text-xs font-medium px-2 text-center">
              {winner ? (
                <span className={winner === 'X' ? 'text-emerald-400' : 'text-rose-400'}>
                  {winner === 'X' ? '🎉 You Beat the Bot!' : '🤖 Bot Wins!'}
                </span>
              ) : isDraw ? (
                <span className="text-amber-400">🤝 It's a Draw!</span>
              ) : (
                <div className="flex items-center gap-1.5 text-zinc-400">
                  {isUserTurn ? (
                    <>
                      <svg className="w-3.5 h-3.5 text-blue-400 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5-4-8-4z"/>
                      </svg>
                      Your Turn (X)
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5 text-purple-400 animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 8h-2V6c0-1.1-.9-2-2-2h-2V2h-2v2H9c-1.1 0-2 .9-2 2v2H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-7 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-8H9V9h6v2z"/>
                      </svg>
                      Bot is thinking...
                    </>
                  )}
                </div>
              )}
            </div>

            {/* 3x3 Tighter Grid System */}
            <div className="grid grid-cols-3 gap-2 w-full aspect-square mb-5">
              {board.map((value, idx) => {
                const canClick = !value && !isGameOver && isUserTurn;
                return (
                  <button
                    key={idx}
                    onClick={() => canClick && makeMove(idx, 'X')}
                    disabled={!canClick}
                    className={`text-3xl font-black rounded-xl border transition duration-300 flex items-center justify-center select-none h-full w-full
                      ${canClick ? 'border-zinc-800 bg-zinc-900/20 hover:border-blue-500/40 hover:bg-blue-500/5 cursor-pointer' : 'border-zinc-900 bg-zinc-950/40 cursor-default'}
                      ${value === 'X' ? 'text-blue-400 border-blue-500/20 shadow-[0_0_10px_rgba(96,165,250,0.05)]' : ''}
                      ${value === 'O' ? 'text-purple-400 border-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.05)]' : ''}
                    `}
                  >
                    <span className={value ? 'scale-100 transition duration-200' : 'scale-50 opacity-0'}>
                      {value}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Reset Button */}
            <button
              onClick={() => { setBoard(Array(9).fill(null)); setIsUserTurn(true); }}
              className="px-4 py-2.5 rounded-xl border border-white/15 bg-zinc-900/30 hover:bg-white/10 active:scale-95 transition duration-200 inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 cursor-pointer"
            >
              Reset Match 
              <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </button>
          </div>

          {/* REDIRECT ARROW */}
          <a 
            href="https://xela-arcade.netlify.app/" 
            target="_blank" 
            rel="noreferrer"
            title="Explore more on Xela_Arcade"
            className="flex items-center justify-center p-3 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-blue-500/50 text-zinc-400 hover:text-blue-500 transition-all duration-300 shadow-xl active:scale-90"
          >
            <FaExternalLinkAlt size={16} />
          </a>

        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  );
}