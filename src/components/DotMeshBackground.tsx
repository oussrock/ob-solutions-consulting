"use client";
/**
 * DotMeshBackground — a slow-breathing dot grid for light sections.
 * Dots gently pulse in opacity waves, with subtle mouse-proximity highlight.
 */
import { useEffect, useRef } from "react";

export default function DotMeshBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0;
    let rafId = 0;
    let t = 0;
    let mouse = { x: -9999, y: -9999 };

    const GAP = 36; // grid spacing in px

    function build() {
      W = canvas!.width  = canvas!.offsetWidth;
      H = canvas!.height = canvas!.offsetHeight;
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      t += 0.018;

      const cols = Math.ceil(W / GAP) + 1;
      const rows = Math.ceil(H / GAP) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * GAP;
          const y = r * GAP;

          // Wave: ripple based on distance from centre + time
          const cx = W / 2, cy = H / 2;
          const waveDist = Math.hypot(x - cx, y - cy);
          const wave = 0.5 + 0.5 * Math.sin(waveDist * 0.025 - t);

          // Mouse proximity highlight
          const md = Math.hypot(x - mouse.x, y - mouse.y);
          const mouseBoost = md < 120 ? (1 - md / 120) * 0.5 : 0;

          const alpha = 0.06 + wave * 0.09 + mouseBoost;
          const radius = 1.5 + wave * 0.8 + mouseBoost * 2;

          ctx!.beginPath();
          ctx!.arc(x, y, radius, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(29, 78, 216, ${alpha})`;
          ctx!.fill();
        }
      }
    }

    function loop() { draw(); rafId = requestAnimationFrame(loop); }

    function onMouse(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    function onLeave() { mouse = { x: -9999, y: -9999 }; }

    build();
    if (reduced) { draw(); } else { loop(); }

    window.addEventListener("resize", build);
    canvas.addEventListener("mousemove", onMouse);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", build);
      canvas.removeEventListener("mousemove", onMouse);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ display: "block" }}
      aria-hidden="true"
    />
  );
}
