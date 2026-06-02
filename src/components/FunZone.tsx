"use client";

import React, { useState, useEffect } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

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

export default function FunZone(): React.JSX.Element {
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

  // computer bot logic alog.
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
          <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
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
            className="flex items-center justify-center h-[38px] w-[38px] rounded-xl bg-zinc-900/40 hover:bg-white/10 border border-white/15 hover:border-blue-500/40 text-zinc-400 hover:text-blue-400 transition-all duration-200 shadow-md active:scale-95 shrink-0"
          >
            <FaExternalLinkAlt size={12} />
          </a>
    </div>
  );
}