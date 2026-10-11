'use client';

import { useEffect, useRef } from 'react';

export default function ArtisticConstellationBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Particle nodes for artistic constellation & flow
    const count = Math.min(65, Math.floor((width * height) / 18000));
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.8 + 1,
      hue: Math.random() > 0.6 ? 215 : Math.random() > 0.5 ? 260 : 185, // Blue, violet, cyan hues
    }));

    let t = 0;

    const render = () => {
      t += 0.003;
      ctx.clearRect(0, 0, width, height);

      // Subtle dynamic artistic fluid glow orbs
      const g1 = ctx.createRadialGradient(
        width * 0.25 + Math.sin(t) * 80,
        height * 0.3 + Math.cos(t * 0.8) * 80,
        0,
        width * 0.25,
        height * 0.3,
        width * 0.45
      );
      g1.addColorStop(0, 'rgba(59, 130, 246, 0.07)'); // Blue
      g1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      const g2 = ctx.createRadialGradient(
        width * 0.75 + Math.cos(t * 0.9) * 90,
        height * 0.65 + Math.sin(t * 1.1) * 90,
        0,
        width * 0.75,
        height * 0.65,
        width * 0.4
      );
      g2.addColorStop(0, 'rgba(147, 51, 234, 0.05)'); // Purple artistic aura
      g2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      const g3 = ctx.createRadialGradient(
        width * 0.5 + Math.sin(t * 1.2) * 110,
        height * 0.85 + Math.cos(t) * 60,
        0,
        width * 0.5,
        height * 0.85,
        width * 0.35
      );
      g3.addColorStop(0, 'rgba(6, 182, 212, 0.04)'); // Cyan
      g3.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = g3;
      ctx.fillRect(0, 0, width, height);

      // Connect constellation lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 135;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.16;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(147, 197, 253, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw and move particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 85%, 65%, 0.45)`;
        ctx.shadowColor = `hsla(${p.hue}, 85%, 65%, 0.5)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
}
