/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

export default function AmbientCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particleCountRef = useRef<number>(50);

  useEffect(() => {
    const handleUpdateDensity = (e: any) => {
      particleCountRef.current = e.detail;
    };
    
    window.addEventListener('update-particles-density', handleUpdateDensity);
    return () => {
      window.removeEventListener('update-particles-density', handleUpdateDensity);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
    }> = [];

    // Initialize particles array based on density limits
    const initParticles = (width: number, height: number) => {
      particles = [];
      const count = particleCountRef.current;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.2 + 0.4,
          speedX: (Math.random() - 0.5) * 0.25,
          speedY: (Math.random() - 0.5) * 0.25
        });
      }
    };

    // Update canvas size safely via container dimensions instead of window objects
    const updateSize = (width: number, height: number) => {
      canvas.width = width;
      canvas.height = height;
      initParticles(width, height);
    };

    // Responsive element resizing via ResizeObserver (MANDATORY Guideline)
    let debounceTimer: string | number | NodeJS.Timeout | undefined;
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      
      // Debounced resize execution for performance (MANDATORY Guideline)
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        updateSize(width, height);
      }, 150);
    });

    resizeObserver.observe(container);

    // Continuous tick loop
    const tick = () => {
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) {
        animationRef.current = requestAnimationFrame(tick);
        return;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(0, 220, 230, 0.2)';

      // Adjust density matching on-the-fly dynamically
      const countDiff = particleCountRef.current - particles.length;
      if (countDiff > 0) {
        // Add more
        for (let i = 0; i < Math.min(countDiff, 5); i++) {
          particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            size: Math.random() * 1.2 + 0.4,
            speedX: (Math.random() - 0.5) * 0.25,
            speedY: (Math.random() - 0.5) * 0.25
          });
        }
      } else if (countDiff < 0) {
        // Pop off лишнее
        particles.splice(0, Math.abs(countDiff));
      }

      // Draw and advance each node coordinate limits
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Bounce back constraints
        if (p.x > w) p.x = 0;
        if (p.x < 0) p.x = w;
        if (p.y > h) p.y = 0;
        if (p.y < 0) p.y = h;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      resizeObserver.disconnect();
      if (debounceTimer) clearTimeout(debounceTimer);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 w-full h-full pointer-events-none opacity-20"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
