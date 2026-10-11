'use client';

import { useEffect, useRef } from 'react';

interface Props {
  isDark?: boolean;
}

export default function ArtisticIllustrativeBg({ isDark = false }: Props) {
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
      initElements();
    };
    window.addEventListener('resize', onResize);

    // Smooth cursor follower with gentle easing
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 170,
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Subtle luminescent click ripple waves
    const ripples: Array<{ x: number; y: number; r: number; maxR: number; alpha: number; color: string }> = [];
    const onMouseDown = (e: MouseEvent) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        r: 8,
        maxR: 200,
        alpha: 0.45,
        color: isDark ? 'rgba(96, 165, 250, ' : 'rgba(59, 130, 246, ',
      });
    };
    window.addEventListener('mousedown', onMouseDown);

    // Professional creative geometry motifs
    interface ArtObject {
      x: number;
      y: number;
      size: number;
      angle: number;
      vAngle: number;
      vx: number;
      vy: number;
      type: 'mandala' | 'sacredRings' | 'sparkStar' | 'origamiFacet' | 'brushStroke';
      color: string;
      glowColor: string;
      alpha: number;
      pulseSpeed: number;
    }

    let artObjects: ArtObject[] = [];

    const initElements = () => {
      const count = Math.min(36, Math.floor((width * height) / 30000));
      const types: ArtObject['type'][] = [
        'mandala',
        'sacredRings',
        'sparkStar',
        'origamiFacet',
        'brushStroke',
      ];

      // Soft light, elegant, curated editorial palette (champagne, soft azure, lavender, sage, warm rose)
      const palette = isDark
        ? [
            { base: 'rgba(125, 211, 252, ', glow: 'rgba(56, 189, 248, 0.45)' }, // Soft Sky
            { base: 'rgba(196, 181, 253, ', glow: 'rgba(167, 139, 250, 0.45)' }, // Soft Lavender
            { base: 'rgba(110, 231, 183, ', glow: 'rgba(52, 211, 153, 0.45)' }, // Soft Mint
            { base: 'rgba(253, 186, 116, ', glow: 'rgba(251, 146, 60, 0.45)' }, // Soft Peach
            { base: 'rgba(244, 114, 182, ', glow: 'rgba(236, 72, 153, 0.45)' }, // Soft Rose
          ]
        : [
            { base: 'rgba(59, 130, 246, ', glow: 'rgba(96, 165, 250, 0.35)' }, // Slate Blue
            { base: 'rgba(139, 92, 246, ', glow: 'rgba(167, 139, 250, 0.35)' }, // Lavender Violet
            { base: 'rgba(16, 185, 129, ', glow: 'rgba(52, 211, 153, 0.35)' }, // Sage Emerald
            { base: 'rgba(245, 158, 11, ', glow: 'rgba(251, 191, 36, 0.35)' }, // Warm Amber
            { base: 'rgba(236, 72, 153, ', glow: 'rgba(244, 114, 182, 0.35)' }, // Soft Peony
          ];

      artObjects = Array.from({ length: count }, () => {
        const p = palette[Math.floor(Math.random() * palette.length)];
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 38 + 22,
          angle: Math.random() * Math.PI * 2,
          vAngle: (Math.random() - 0.5) * 0.008,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          type: types[Math.floor(Math.random() * types.length)],
          color: p.base,
          glowColor: p.glow,
          alpha: Math.random() * 0.22 + 0.16,
          pulseSpeed: Math.random() * 0.018 + 0.008,
        };
      });
    };

    initElements();

    let t = 0;

    const render = () => {
      t += 1;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // --- 1. Soft Light Painterly Ambient Glow Washes ---
      // Primary luminous orb (top left)
      const wash1 = ctx.createRadialGradient(
        width * 0.28 + Math.sin(t * 0.0012) * 90 + (mouse.x - width / 2) * 0.04,
        height * 0.26 + Math.cos(t * 0.001) * 80,
        30,
        width * 0.28,
        height * 0.26,
        width * 0.52
      );
      wash1.addColorStop(0, isDark ? 'rgba(56, 189, 248, 0.09)' : 'rgba(186, 230, 253, 0.55)');
      wash1.addColorStop(0.55, isDark ? 'rgba(167, 139, 250, 0.05)' : 'rgba(233, 213, 255, 0.35)');
      wash1.addColorStop(1, 'transparent');
      ctx.fillStyle = wash1;
      ctx.fillRect(0, 0, width, height);

      // Secondary warm pearl / lavender orb (bottom right)
      const wash2 = ctx.createRadialGradient(
        width * 0.74 + Math.cos(t * 0.0014) * 90 + (mouse.x - width / 2) * 0.04,
        height * 0.74 + Math.sin(t * 0.0012) * 80,
        40,
        width * 0.74,
        height * 0.74,
        width * 0.48
      );
      wash2.addColorStop(0, isDark ? 'rgba(244, 114, 182, 0.08)' : 'rgba(254, 215, 226, 0.45)');
      wash2.addColorStop(0.6, isDark ? 'rgba(129, 140, 248, 0.04)' : 'rgba(224, 231, 255, 0.30)');
      wash2.addColorStop(1, 'transparent');
      ctx.fillStyle = wash2;
      ctx.fillRect(0, 0, width, height);

      // Tertiary champagne accent orb (center float)
      const wash3 = ctx.createRadialGradient(
        width * 0.5 + Math.sin(t * 0.0008) * 120,
        height * 0.5 + Math.cos(t * 0.0009) * 90,
        20,
        width * 0.5,
        height * 0.5,
        width * 0.4
      );
      wash3.addColorStop(0, isDark ? 'rgba(251, 191, 36, 0.05)' : 'rgba(254, 243, 199, 0.40)');
      wash3.addColorStop(1, 'transparent');
      ctx.fillStyle = wash3;
      ctx.fillRect(0, 0, width, height);

      // --- 2. Interactive Click Ripple Rings ---
      for (let rIdx = ripples.length - 1; rIdx >= 0; rIdx--) {
        const rip = ripples[rIdx];
        rip.r += 2.6;
        rip.alpha *= 0.96;
        if (rip.alpha < 0.015 || rip.r > rip.maxR) {
          ripples.splice(rIdx, 1);
          continue;
        }
        ctx.save();
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
        ctx.strokeStyle = `${rip.color}${rip.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      // --- 3. Subtle Creative Resonance Lines Between Nearby Motifs ---
      for (let i = 0; i < artObjects.length; i++) {
        for (let j = i + 1; j < artObjects.length; j++) {
          const dx = artObjects[i].x - artObjects[j].x;
          const dy = artObjects[i].y - artObjects[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 125;

          if (dist < maxDist) {
            const threadAlpha = (1 - dist / maxDist) * (isDark ? 0.16 : 0.13);
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(artObjects[i].x, artObjects[i].y);
            ctx.lineTo(artObjects[j].x, artObjects[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(186, 230, 253, ${threadAlpha})`
              : `rgba(96, 165, 250, ${threadAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // --- 4. Render Professional & Creative Illustrative Motifs ---
      artObjects.forEach((item) => {
        item.x += item.vx;
        item.y += item.vy;
        item.angle += item.vAngle;

        // Gentle cursor proximity repulsion
        const dx = item.x - mouse.x;
        const dy = item.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius && dist > 0) {
          const force = ((mouse.radius - dist) / mouse.radius) * 1.2;
          item.x += (dx / dist) * force;
          item.y += (dy / dist) * force;
        }

        // Wrap around bounds seamlessly
        if (item.x < -60) item.x = width + 60;
        if (item.x > width + 60) item.x = -60;
        if (item.y < -60) item.y = height + 60;
        if (item.y > height + 60) item.y = -60;

        const pulse = Math.sin(t * item.pulseSpeed) * 0.08;
        const currentAlpha = Math.min(0.48, Math.max(0.12, item.alpha + pulse));
        const strokeStyle = `${item.color}${currentAlpha})`;
        const fillStyle = `${item.color}${currentAlpha * 0.35})`;

        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.angle);
        ctx.strokeStyle = strokeStyle;
        ctx.fillStyle = fillStyle;
        ctx.lineWidth = 1.2;
        ctx.shadowColor = item.glowColor;
        ctx.shadowBlur = 6;

        const r = item.size / 2;

        switch (item.type) {
          case 'mandala': {
            // Refined minimalist sacred mandala
            ctx.beginPath();
            ctx.arc(0, 0, r * 0.35, 0, Math.PI * 2);
            ctx.stroke();
            for (let p = 0; p < 6; p++) {
              const pa = (p * Math.PI) / 3;
              const px = Math.cos(pa) * (r * 0.65);
              const py = Math.sin(pa) * (r * 0.65);
              ctx.beginPath();
              ctx.arc(px, py, r * 0.25, 0, Math.PI * 2);
              ctx.stroke();
            }
            break;
          }

          case 'sacredRings': {
            // Elegant concentric architectural compass rings
            ctx.beginPath();
            ctx.arc(0, 0, r * 0.75, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0, 0, r * 0.4, 0, Math.PI * 2);
            ctx.stroke();
            for (let a = 0; a < 4; a++) {
              const angle = (a * Math.PI) / 2;
              ctx.beginPath();
              ctx.moveTo(Math.cos(angle) * (r * 0.25), Math.sin(angle) * (r * 0.25));
              ctx.lineTo(Math.cos(angle) * (r * 0.85), Math.sin(angle) * (r * 0.85));
              ctx.stroke();
            }
            break;
          }

          case 'sparkStar': {
            // Subtle 4-point celestial star mark
            ctx.beginPath();
            ctx.moveTo(0, -r);
            ctx.quadraticCurveTo(0, 0, r, 0);
            ctx.quadraticCurveTo(0, 0, 0, r);
            ctx.quadraticCurveTo(0, 0, -r, 0);
            ctx.quadraticCurveTo(0, 0, 0, -r);
            ctx.fill();
            ctx.stroke();
            break;
          }

          case 'origamiFacet': {
            // Clean geometric triangular facet
            ctx.beginPath();
            ctx.moveTo(0, -r * 0.8);
            ctx.lineTo(r * 0.7, r * 0.6);
            ctx.lineTo(-r * 0.7, r * 0.6);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(0, -r * 0.8);
            ctx.lineTo(0, r * 0.6);
            ctx.stroke();
            break;
          }

          case 'brushStroke': {
            // Refined calligraphic S-curve flourish
            ctx.beginPath();
            ctx.moveTo(-r * 0.9, -r * 0.35);
            ctx.bezierCurveTo(-r * 0.3, r * 0.7, r * 0.3, -r * 0.7, r * 0.9, r * 0.35);
            ctx.stroke();
            break;
          }
        }

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      cancelAnimationFrame(animId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
}
