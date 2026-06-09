'use client';

import { useEffect, useState } from 'react';

const greetings = [
  { text: 'नमस्ते',     lang: 'Hindi'    },
  { text: 'Hello',     lang: 'English'  },
  { text: 'வணக்கம்', lang: 'Tamil' },
  { text: 'Bonjour',   lang: 'French'   }
];

export default function GreetingLoader({ progress, logoVisible }) {
  const [greetIndex, setGreetIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const current = greetings[greetIndex].text;
    if (typing) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 900);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 50);
        return () => clearTimeout(t);
      } else {
        setGreetIndex((i) => (i + 1) % greetings.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, greetIndex]);

  const requiresSansSerif = ['Hindi', 'Tamil'].includes(greetings[greetIndex].lang);

  return (
    <>
      <div
        className="transition-all duration-1000 delay-500 flex flex-col items-center gap-1"
        style={{ opacity: logoVisible ? 1 : 0 }}
      >
        <div className="h-12 flex items-center justify-center">
          <span
            className="text-4xl md:text-5xl font-bold text-white"
            style={{
              textShadow: '0 0 20px rgba(96,165,250,0.4)',
              fontFamily: requiresSansSerif ? 'sans-serif' : 'inherit',
            }}
          >
            {displayed}
            <span className="animate-pulse text-blue-400">|</span>
          </span>
        </div>
        <p className="text-xs tracking-[0.3em] uppercase text-zinc-600">
          {greetings[greetIndex].lang}
        </p>
      </div>

      <div
        className="w-64 md:w-80 transition-all duration-1000 delay-700"
        style={{ opacity: logoVisible ? 1 : 0 }}
      >
        <div className="flex justify-between text-xs text-zinc-600 mb-2">
          <span className="tracking-wider uppercase">Vijay's Warehouse</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-px bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, rgba(96,165,250,0.6), rgba(96,165,250,1))',
              boxShadow: '0 0 8px rgba(96,165,250,0.6)',
            }}
          />
        </div>
      </div>
    </>
  );
}