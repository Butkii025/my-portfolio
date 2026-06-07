"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

const LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

const getWinner = (b) => {
  for (const line of LINES) {
    const [a,c,d] = line;
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
  }
  return null;
};

const getWinLine = (b) => {
  for (const line of LINES) {
    const [a,c,d] = line;
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return line;
  }
  return null;
};

export default function FunZone() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isUserTurn, setIsUserTurn] = useState(true);

  const winner = getWinner(board);
  const winLine = getWinLine(board);
  const isDraw = !winner && !board.includes(null);
  const isGameOver = !!winner || isDraw;

  const makeMove = useCallback((index, player) => {
    setBoard(prev => {
      const n = [...prev];
      n[index] = player;
      return n;
    });
    setIsUserTurn(player === 'O');
  }, []);

  useEffect(() => {
    if (isUserTurn || isGameOver) return;

    const timer = setTimeout(() => {
      const open = board
        .map((v, i) => (v === null ? i : null))
        .filter(v => v !== null);

      if (!open.length) return;

      // Try to win or block
      for (const player of ['O', 'X']) {
        for (const idx of open) {
          const test = [...board];
          test[idx] = player;
          if (getWinner(test) === player) {
            makeMove(idx, 'O');
            return;
          }
        }
      }

      // Take center or random
      const choice = open.includes(4) ? 4 : open[Math.floor(Math.random() * open.length)];
      makeMove(choice, 'O');
    }, 500);

    return () => clearTimeout(timer);
  }, [isUserTurn, isGameOver, board, makeMove]);

  const reset = () => {
    setBoard(Array(9).fill(null));
    setIsUserTurn(true);
  };

  return (
    <div className="relative">
      <div className="relative w-[300px] flex flex-col items-center overflow-hidden
        dark:bg-gradient-to-br dark:from-zinc-900/50 dark:to-zinc-950 dark:border dark:border-white/10
        dark:hover:border-blue-400/50 dark:hover:shadow-blue-500/10
        bg-gradient-to-br from-zinc-50 to-white border border-zinc-200
        hover:border-blue-400/50 hover:shadow-blue-500/10
        p-5 rounded-[2rem] backdrop-blur-xl shadow-2xl transition-shadow duration-500"
      >
        {/* External link */}
        <a
          href="https://xela-arcade.netlify.app/"
          target="_blank"
          rel="noreferrer"
          title="Explore more on Xela_Arcade"
          className="absolute top-4 right-4 z-20 flex items-center justify-center h-7 w-7 rounded-lg transition-all duration-200 active:scale-95
            dark:bg-zinc-900/60 dark:border dark:border-white/10 dark:text-zinc-500 dark:hover:border-blue-400/40 dark:hover:text-blue-400
            bg-zinc-100 border border-zinc-200 text-zinc-400 hover:border-blue-400/40 hover:text-blue-400"
        >
          <FaExternalLinkAlt size={10} />
        </a>

        {/* Title */}
        <div className="text-center mb-3">
          <p className="uppercase tracking-[0.2em] text-[10px] mb-0.5 dark:text-zinc-500 text-zinc-400">Xela_Arcade</p>
          <h2 className="text-2xl font-bold tracking-tight dark:text-white text-black">fun_zone</h2>
          <p className="uppercase tracking-[0.2em] text-[7px] mt-0.5 dark:text-zinc-500 text-zinc-400">
            Face off against a defensive bot algorithm
          </p>
        </div>

        {/* Status bar */}
        <div className="w-full flex justify-center items-center h-10 mb-4 rounded-lg px-2 text-xs font-medium text-center shrink-0
          dark:bg-zinc-950/60 dark:border dark:border-zinc-900
          bg-zinc-100 border border-zinc-200">
          {winner ? (
            <span className={winner === 'X' ? 'text-blue-400' : 'dark:text-zinc-400 text-zinc-500'}>
              {winner === 'X' ? '🎉 You Beat the Bot!' : '🤖 Bot Wins!'}
            </span>
          ) : isDraw ? (
            <span className="dark:text-zinc-400 text-zinc-500">🤝 It&apos;s a Draw!</span>
          ) : (
            <div className="flex items-center gap-1.5 dark:text-zinc-400 text-zinc-500">
              {isUserTurn ? (
                <>
                  <svg className="w-3.5 h-3.5 text-blue-400 animate-pulse shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5-4-8-4z"/>
                  </svg>
                  Your Turn (X)
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5 text-blue-400 animate-bounce shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 8h-2V6c0-1.1-.9-2-2-2h-2V2h-2v2H9c-1.1 0-2 .9-2 2v2H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-7 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-8H9V9h6v2z"/>
                  </svg>
                  Bot is thinking...
                </>
              )}
            </div>
          )}
        </div>

        {/* Board */}
        <div className="grid grid-cols-3 gap-2 w-full mb-5">
          {board.map((value, idx) => {
            const canClick = !value && !isGameOver && isUserTurn;
            const isWinCell = winLine && winLine.includes(idx);
            return (
              <button
                key={idx}
                onClick={() => canClick && makeMove(idx, 'X')}
                disabled={!canClick}
                className={[
                  'h-[76px] w-full text-3xl font-black rounded-xl border transition-colors duration-300 flex items-center justify-center select-none',
                  canClick
                    ? 'dark:border-zinc-800 dark:bg-zinc-900/20 dark:hover:border-blue-400/40 dark:hover:bg-blue-500/5 border-zinc-200 bg-zinc-50 hover:border-blue-400/40 hover:bg-blue-50 cursor-pointer'
                    : 'dark:border-zinc-900 dark:bg-zinc-950/40 border-zinc-100 bg-zinc-50/60 cursor-default',
                  value === 'X' ? 'text-blue-400 dark:border-blue-500/20 border-blue-200' : '',
                  value === 'O' ? 'dark:text-zinc-400 text-zinc-500 dark:border-zinc-700 border-zinc-200' : '',
                  isWinCell ? 'dark:border-blue-400/60 border-blue-400/60 dark:shadow-[0_0_14px_rgba(96,165,250,0.25)] shadow-[0_0_14px_rgba(96,165,250,0.2)]' : '',
                ].join(' ')}
              >
                <span className={`text-3xl font-black transition-all duration-200 ${value ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                  {value ?? ' '}
                </span>
              </button>
            );
          })}
        </div>

        {/* Reset */}
        <button
          onClick={reset}
          className="px-4 py-2.5 rounded-xl text-xs font-medium inline-flex items-center gap-1.5 transition duration-200 active:scale-95 cursor-pointer
            dark:border dark:border-white/15 dark:bg-zinc-900/30 dark:hover:bg-white/10 dark:text-zinc-300
            border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-600"
        >
          Reset Match
          <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </button>
      </div>
    </div>
  );
}