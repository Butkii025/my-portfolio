'use client';

import { useEffect, useRef, useCallback } from 'react';

interface InteractiveDotsProps {
  backgroundColor?: string;
  dotColor?: string;
  gridSpacing?: number;
  animationSpeed?: number;
  removeWaveLine?: boolean;
}

const InteractiveDots = ({
  backgroundColor = '#000000',
  dotColor = '#728b97',
  gridSpacing = 30,
  animationSpeed = 0.005,
  removeWaveLine = true,
}: InteractiveDotsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const ripples = useRef<Array<{ x: number; y: number; time: number; intensity: number }>>([]);
  const dotsRef = useRef<Array<{ originalX: number; originalY: number; phase: number }>>([]);

  const getMouseInfluence = (x: number, y: number) => {
    const dx = x - mouseRef.current.x;
    const dy = y - mouseRef.current.y;
    return Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 150);
  };

  const getRippleInfluence = (x: number, y: number, now: number) => {
    let total = 0;
    ripples.current.forEach((r) => {
      const age = now - r.time;
      if (age < 3000) {
        const dx = x - r.x; const dy = y - r.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = (age / 3000) * 300;
        const width = 60;
        if (Math.abs(dist - radius) < width)
          total += (1 - age / 3000) * r.intensity * (1 - Math.abs(dist - radius) / width);
      }
    });
    return Math.min(total, 2);
  };

  const initDots = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dots: typeof dotsRef.current = [];
    for (let x = gridSpacing / 2; x < window.innerWidth; x += gridSpacing)
      for (let y = gridSpacing / 2; y < window.innerHeight; y += gridSpacing)
        dots.push({ originalX: x, originalY: y, phase: Math.random() * Math.PI * 2 });
    dotsRef.current = dots;
  }, [gridSpacing]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = window.innerWidth  * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width  = window.innerWidth  + 'px';
    canvas.style.height = window.innerHeight + 'px';
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);
    initDots();
  }, [initDots]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    timeRef.current += animationSpeed;
    const now = Date.now();

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    const rr = parseInt(dotColor.slice(1, 3), 16);
    const gg = parseInt(dotColor.slice(3, 5), 16);
    const bb = parseInt(dotColor.slice(5, 7), 16);

    dotsRef.current.forEach((dot) => {
      const mi = getMouseInfluence(dot.originalX, dot.originalY);
      const ri = getRippleInfluence(dot.originalX, dot.originalY, now);
      const total = mi + ri;
      const size    = 0.5 + total * 1.5 + Math.sin(timeRef.current + dot.phase) * 0.3;
      const opacity = Math.max(0.2, 0.35 + total * 0.5 + Math.abs(Math.sin(timeRef.current * 0.5 + dot.phase)) * 0.1);
      ctx.beginPath();
      ctx.arc(dot.originalX, dot.originalY, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rr},${gg},${bb},${opacity})`;
      ctx.fill();
    });

    // clean old ripples
    ripples.current = ripples.current.filter(r => now - r.time < 3000);

    animationFrameId.current = requestAnimationFrame(animate);
  }, [backgroundColor, dotColor, animationSpeed]);

  useEffect(() => {
    resizeCanvas();

    // ── attach to WINDOW so pointer-events-none wrapper doesn't block ──
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseDown = (e: MouseEvent) => {
      ripples.current.push({ x: e.clientX, y: e.clientY, time: Date.now(), intensity: 2 });
    };
    const onResize = () => resizeCanvas();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('resize',    onResize);

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('resize',    onResize);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      timeRef.current = 0;
      ripples.current = [];
      dotsRef.current = [];
    };
  }, [animate, resizeCanvas]);

  return (
    <div style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', backgroundColor, zIndex: 0 }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
};

export default InteractiveDots;