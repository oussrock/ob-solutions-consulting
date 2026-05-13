"use client";
/**
 * AuroraBackground — soft animated gradient blobs for light sections.
 * Very subtle: large blurred circles drifting slowly.
 * Works on white / near-white backgrounds.
 */
import { useEffect, useRef } from "react";

interface Blob {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  r_color: number; g_color: number; b_color: number;
  alpha: number;
  phase: number;
}

const PALETTES = [
  // blue-indigo (default)
  [
    { r: 219, g: 234, b: 254 }, // blue-200
    { r: 199, g: 210, b: 254 }, // indigo-200
    { r: 186, g: 230, b: 253 }, // sky-200
    { r: 221, g: 214, b: 254 }, // violet-200
    { r: 167, g: 243, b: 208 }, // green-200
  ],
];

export default function AuroraBackground({
  className = "",
  palette = 0,
  blobCount = 5,
}: {
  className?: string;
  palette?: number;
  blobCount?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const colors = PALETTES[palette % PALETTES.length];

    let W = 0, H = 0;
    let blobs: Blob[] = [];
    let rafId = 0;
    let t = 0;

    function build() {
      W = canvas!.width  = canvas!.offsetWidth;
      H = canvas!.height = canvas!.offsetHeight;
      const minR = Math.min(W, H) * 0.25;
      const maxR = Math.min(W, H) * 0.55;
      blobs = Array.from({ length: blobCount }, (_, i) => {
        const c = colors[i % colors.length];
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r:  minR + Math.random() * (maxR - minR),
          r_color: c.r, g_color: c.g, b_color: c.b,
          alpha: 0.28 + Math.random() * 0.18,
          phase: Math.random() * Math.PI * 2,
        };
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      t += 0.004;

      for (const b of blobs) {
        b.x += b.vx;
        b.y += b.vy;

        // Soft bounce
        if (b.x < -b.r * 0.5)  b.vx =  Math.abs(b.vx);
        if (b.x > W + b.r * 0.5) b.vx = -Math.abs(b.vx);
        if (b.y < -b.r * 0.5)  b.vy =  Math.abs(b.vy);
        if (b.y > H + b.r * 0.5) b.vy = -Math.abs(b.vy);

        // Breathing radius
        const pulse = 1 + 0.08 * Math.sin(t * 1.5 + b.phase);
        const r = b.r * pulse;

        const grad = ctx!.createRadialGradient(b.x, b.y, 0, b.x, b.y, r);
        grad.addColorStop(0,   `rgba(${b.r_color},${b.g_color},${b.b_color},${b.alpha})`);
        grad.addColorStop(0.5, `rgba(${b.r_color},${b.g_color},${b.b_color},${b.alpha * 0.4})`);
        grad.addColorStop(1,   `rgba(${b.r_color},${b.g_color},${b.b_color},0)`);

        ctx!.beginPath();
        ctx!.arc(b.x, b.y, r, 0, Math.PI * 2);
        ctx!.fillStyle = grad;
        ctx!.fill();
      }
    }

    function loop() { draw(); rafId = requestAnimationFrame(loop); }

    build();
    if (reduced) { draw(); } else { loop(); }

    const onResize = () => build();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, [palette, blobCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ display: "block" }}
      aria-hidden="true"
    />
  );
}
