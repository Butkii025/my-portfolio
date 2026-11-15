'use client';

import { useEffect, useState } from 'react';

export default function CatAnimation() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 4);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const tailSwing = frame % 2 === 0 ? 4 : -4;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -left-[3.4rem] bottom-0 z-10"
    >
      <svg width="92" height="83" viewBox="0 0 80 70" fill="none">
        {/* Tail */}
        <path
          d={`M 40 50 Q ${50 + tailSwing} 60 ${55 + tailSwing} 55`}
          stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" fill="none"
          style={{ transition: 'd 0.15s ease' }}
        />

        {/* Body */}
        <ellipse
          cx="40"
          cy="48"
          rx="18"
          ry="14"
          fill="#1e293b" stroke="#334155" strokeWidth="1.5"
        />

        {/* Head */}
        <circle
          cx="40"
          cy="30"
          r="14"
          fill="#1e293b" stroke="#334155" strokeWidth="1.5"
        />

        {/* Ears */}
        <>
          <polygon points="28,20 24,8 34,18" fill="#1e293b" stroke="#334155" strokeWidth="1.2" />
          <polygon points="52,20 56,8 46,18" fill="#1e293b" stroke="#334155" strokeWidth="1.2" />
        </>

        {/* Eyes */}
        <>
          <path d="M 33 29 Q 36 26 39 29" stroke="#60a5fa" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M 41 29 Q 44 26 47 29" stroke="#60a5fa" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </>

        {/* Nose */}
        <circle
          cx="40"
          cy="34"
          r="2" fill="#f472b6"
        />

        {/* Whiskers */}
        <>
          <line x1="22" y1="33" x2="37" y2="34" stroke="#475569" strokeWidth="1" />
          <line x1="22" y1="36" x2="37" y2="36" stroke="#475569" strokeWidth="1" />
          <line x1="43" y1="34" x2="58" y2="33" stroke="#475569" strokeWidth="1" />
          <line x1="43" y1="36" x2="58" y2="36" stroke="#475569" strokeWidth="1" />
        </>

        {/* Legs */}
        <>
          <line x1="28" y1="58" x2="28" y2="68" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
          <line x1="34" y1="60" x2="34" y2="68" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
          <line x1="46" y1="60" x2="46" y2="68" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
          <line x1="52" y1="58" x2="52" y2="68" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
        </>
      </svg>
    </div>
  );
}