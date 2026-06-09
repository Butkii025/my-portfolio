'use client';

import { useEffect, useState } from 'react';

export default function CatAnimation() {
  const [catPos, setCatPos] = useState(-1000); 
  const [catState, setCatState] = useState('sitting'); 
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    setCatPos(window.innerWidth * 0.42);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 4);
      if (catState === 'leaving') {
        setCatPos((pos) => pos + 4);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [catState]);

  useEffect(() => {
    if (catState !== 'sitting') return;
    const t = setTimeout(() => setCatState('leaving'), 2500);
    return () => clearTimeout(t);
  }, [catState]);

  const isWalking = catState === 'walking' || catState === 'leaving';
  const legOffset = isWalking ? (frame % 2 === 0 ? 2 : -2) : 0;
  const tailSwing = catState === 'sitting'
    ? Math.sin(Date.now() / 300) * 8
    : isWalking ? (frame % 2 === 0 ? 15 : -5) : 0;

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        bottom: '80px',
        left: `${catPos}px`,
        transition: catState === 'sitting' ? 'none' : undefined,
      }}
    >
      <svg width="80" height="70" viewBox="0 0 80 70" fill="none">
        {/* Tail */}
        <path
          d={catState === 'sitting'
            ? `M 40 50 Q ${50 + tailSwing} 60 ${55 + tailSwing} 55`
            : `M 10 45 Q ${0 + legOffset * 2} 35 ${-5 + legOffset} 25`}
          stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" fill="none"
          style={{ transition: 'd 0.15s ease' }}
        />

        {/* Body */}
        <ellipse
          cx={catState === 'sitting' ? "40" : "35"}
          cy={catState === 'sitting' ? "48" : "42"}
          rx={catState === 'sitting' ? "18" : "20"}
          ry={catState === 'sitting' ? "14" : "12"}
          fill="#1e293b" stroke="#334155" strokeWidth="1.5"
        />

        {/* Head */}
        <circle
          cx={catState === 'sitting' ? "40" : "52"}
          cy={catState === 'sitting' ? "30" : "30"}
          r="14"
          fill="#1e293b" stroke="#334155" strokeWidth="1.5"
        />

        {/* Ears */}
        {catState === 'sitting' ? (
          <>
            <polygon points="28,20 24,8 34,18" fill="#1e293b" stroke="#334155" strokeWidth="1.2" />
            <polygon points="52,20 56,8 46,18" fill="#1e293b" stroke="#334155" strokeWidth="1.2" />
          </>
        ) : (
          <>
            <polygon points="42,20 38,8 48,18" fill="#1e293b" stroke="#334155" strokeWidth="1.2" />
            <polygon points="62,20 66,8 56,18" fill="#1e293b" stroke="#334155" strokeWidth="1.2" />
          </>
        )}

        {/* Eyes */}
        {catState === 'sitting' ? (
          <>
            <path d="M 33 29 Q 36 26 39 29" stroke="#60a5fa" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M 41 29 Q 44 26 47 29" stroke="#60a5fa" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="48" cy="29" r="3" fill="#60a5fa" />
            <circle cx="57" cy="29" r="3" fill="#60a5fa" />
            <circle cx="49" cy="28" r="1" fill="white" />
            <circle cx="58" cy="28" r="1" fill="white" />
          </>
        )}

        {/* Nose */}
        <circle
          cx={catState === 'sitting' ? "40" : "52"}
          cy={catState === 'sitting' ? "34" : "34"}
          r="2" fill="#f472b6"
        />

        {/* Whiskers */}
        {catState === 'sitting' ? (
          <>
            <line x1="22" y1="33" x2="37" y2="34" stroke="#475569" strokeWidth="1" />
            <line x1="22" y1="36" x2="37" y2="36" stroke="#475569" strokeWidth="1" />
            <line x1="43" y1="34" x2="58" y2="33" stroke="#475569" strokeWidth="1" />
            <line x1="43" y1="36" x2="58" y2="36" stroke="#475569" strokeWidth="1" />
          </>
        ) : (
          <>
            <line x1="36" y1="33" x2="48" y2="34" stroke="#475569" strokeWidth="1" />
            <line x1="36" y1="36" x2="48" y2="35" stroke="#475569" strokeWidth="1" />
            <line x1="56" y1="34" x2="68" y2="33" stroke="#475569" strokeWidth="1" />
            <line x1="56" y1="35" x2="68" y2="36" stroke="#475569" strokeWidth="1" />
          </>
        )}

        {/* Legs */}
        {catState === 'sitting' ? (
          <>
            <line x1="28" y1="58" x2="28" y2="68" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
            <line x1="34" y1="60" x2="34" y2="68" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
            <line x1="46" y1="60" x2="46" y2="68" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
            <line x1="52" y1="58" x2="52" y2="68" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
          </>
        ) : (
          <>
            <line x1="20" y1="50" x2={`${18 + legOffset}`} y2="65" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
            <line x1="28" y1="52" x2={`${30 - legOffset}`} y2="65" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
            <line x1="40" y1="52" x2={`${38 + legOffset}`} y2="65" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
            <line x1="48" y1="50" x2={`${50 - legOffset}`} y2="65" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
          </>
        )}
      </svg>
    </div>
  );
}