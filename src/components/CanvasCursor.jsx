// src/components/CanvasCursor.jsx
'use client';

import { useEffect } from 'react';

const CanvasCursor = () => {
  useEffect(() => {
    function n(e) { this.init(e || {}); }
    n.prototype = {
      init: function (e) {
        this.phase = e.phase || 0;
        this.offset = e.offset || 0;
        this.frequency = e.frequency || 0.001;
        this.amplitude = e.amplitude || 1;
      },
      update: function () {
        return (this.phase += this.frequency, this.offset + Math.sin(this.phase) * this.amplitude);
      }
    };

    function Line(e) { this.init(e || {}); }
    let canvas, ctx, lines = [], pos = { x: 0, y: 0 };
    const E = { debug: false, friction: 0.5, trails: 20, size: 50, damping: 0.25, tension: 0.98 };

    function Node() { this.x = 0; this.y = 0; this.vx = 0; this.vy = 0; }

    Line.prototype = {
      init: function (e) {
        this.spring = e.spring + 0.1 * Math.random() - 0.02;
        this.friction = E.friction + 0.01 * Math.random() - 0.002;
        this.nodes = [];
        for (var t, n = 0; n < E.size; n++) {
          t = new Node(); t.x = pos.x; t.y = pos.y; this.nodes.push(t);
        }
      },
      update: function () {
        var e = this.spring, t = this.nodes[0];
        t.vx += (pos.x - t.x) * e; t.vy += (pos.y - t.y) * e;
        for (var n, i = 0, a = this.nodes.length; i < a; i++) {
          t = this.nodes[i];
          if (i > 0) {
            n = this.nodes[i - 1];
            t.vx += (n.x - t.x) * e; t.vy += (n.y - t.y) * e;
            t.vx += n.vx * E.damping; t.vy += n.vy * E.damping;
          }
          t.vx *= this.friction; t.vy *= this.friction;
          t.x += t.vx; t.y += t.vy; e *= E.tension;
        }
      },
      draw: function () {
        var e, t, n = this.nodes[0].x, i = this.nodes[0].y;
        ctx.beginPath(); ctx.moveTo(n, i);
        for (var a = 1, o = this.nodes.length - 2; a < o; a++) {
          e = this.nodes[a]; t = this.nodes[a + 1];
          n = 0.5 * (e.x + t.x); i = 0.5 * (e.y + t.y);
          ctx.quadraticCurveTo(e.x, e.y, n, i);
        }
        e = this.nodes[a]; t = this.nodes[a + 1];
        ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
        ctx.stroke(); ctx.closePath();
      }
    };

    function onMouseMove(e) {
      if (e.touches) { pos.x = e.touches[0].pageX; pos.y = e.touches[0].pageY; }
      else { pos.x = e.clientX; pos.y = e.clientY; }
    }

    function resizeCanvas() {
      if (canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    }

    function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(156, 163, 175, 0.4)"; 
      ctx.lineWidth = 1;
      for (var e = 0; e < E.trails; e++) { var t = lines[e]; t.update(); t.draw(); }
      requestAnimationFrame(render);
    }

    canvas = document.getElementById('canvas-cursor');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onMouseMove);
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    for (var i = 0; i < E.trails; i++) {
      lines.push(new Line({ spring: 0.45 + (i / E.trails) * 0.05 }));
    }
    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      id="canvas-cursor" 
      className="pointer-events-none fixed inset-0 z-50 block h-screen w-screen"
    />
  );
};

export default CanvasCursor;