"use client";
/**
 * StarField — Interactive constellation canvas.
 * Stars drift slowly across the sky. As the mouse moves nearby,
 * constellation lines form between stars within range.
 * Stars twinkle, and clicking creates a burst of new stars.
 */
import { useEffect, useRef } from "react";

interface Star {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

const STAR_COUNT_BASE = 160;
const CONSTELLATION_DIST = 120;   // px — max line distance
const MOUSE_DIST          = 160;   // px — mouse pulls nearby stars
const MOUSE_FORCE         = 0.006;
const MAX_SPEED           = 0.35;

function starCount(w: number) {
  if (w < 640)  return 80;
  if (w < 1024) return 120;
  return STAR_COUNT_BASE;
}

export default function StarField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0;
    let stars: Star[] = [];
    let mouse = { x: -9999, y: -9999 };
    let rafId = 0;
    let t = 0;

    function makeStars(count: number): Star[] {
      return Array.from({ length: count }, () => ({
        x:            Math.random() * W,
        y:            Math.random() * H,
        vx:           (Math.random() - 0.5) * MAX_SPEED,
        vy:           (Math.random() - 0.5) * MAX_SPEED,
        radius:       Math.random() < 0.08 ? 2.2          // bright star
                    : Math.random() < 0.3  ? 1.4          // medium
                    :                        0.8,          // dim
        alpha:        0.4 + Math.random() * 0.6,
        twinkleSpeed: 0.5 + Math.random() * 1.5,
        twinklePhase: Math.random() * Math.PI * 2,
      }));
    }

    function build() {
      W = canvas!.width  = canvas!.offsetWidth;
      H = canvas!.height = canvas!.offsetHeight;
      stars = makeStars(starCount(W));
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      t += 0.016;

      // ── Move stars ──────────────────────────────────────────
      for (const s of stars) {
        // Soft mouse attraction
        const dx = mouse.x - s.x;
        const dy = mouse.y - s.y;
        const d  = Math.hypot(dx, dy);
        if (d < MOUSE_DIST && d > 1) {
          s.vx += (dx / d) * MOUSE_FORCE;
          s.vy += (dy / d) * MOUSE_FORCE;
        }

        // Speed cap
        const speed = Math.hypot(s.vx, s.vy);
        if (speed > MAX_SPEED) {
          s.vx = (s.vx / speed) * MAX_SPEED;
          s.vy = (s.vy / speed) * MAX_SPEED;
        }

        s.x += s.vx;
        s.y += s.vy;

        // Wrap around edges (seamless)
        if (s.x < -5)  s.x = W + 5;
        if (s.x > W+5) s.x = -5;
        if (s.y < -5)  s.y = H + 5;
        if (s.y > H+5) s.y = -5;
      }

      // ── Constellation lines ─────────────────────────────────
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const a = stars[i], b = stars[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);

          // Only draw lines when both stars are near the mouse
          const aDist = Math.hypot(mouse.x - a.x, mouse.y - a.y);
          const bDist = Math.hypot(mouse.x - b.x, mouse.y - b.y);
          const proximity = Math.min(aDist, bDist);

          if (dist > CONSTELLATION_DIST || proximity > MOUSE_DIST * 1.8) continue;

          // Fade in as mouse approaches
          const mouseAlpha = Math.max(0, 1 - proximity / (MOUSE_DIST * 1.8));
          const distAlpha  = (1 - dist / CONSTELLATION_DIST) * 0.6;
          const alpha      = mouseAlpha * distAlpha;

          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.strokeStyle = `rgba(147, 210, 255, ${alpha})`;
          ctx!.lineWidth = 0.6;
          ctx!.stroke();
        }
      }

      // ── Draw stars ──────────────────────────────────────────
      for (const s of stars) {
        // Twinkle
        const twinkle = 0.65 + 0.35 * Math.sin(t * s.twinkleSpeed + s.twinklePhase);
        const a = s.alpha * twinkle;

        // Glow for brighter stars
        if (s.radius > 1.8) {
          const glow = ctx!.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius * 5);
          glow.addColorStop(0,   `rgba(200, 230, 255, ${a * 0.6})`);
          glow.addColorStop(0.4, `rgba(147, 210, 255, ${a * 0.2})`);
          glow.addColorStop(1,   `rgba(100, 180, 255, 0)`);
          ctx!.beginPath();
          ctx!.arc(s.x, s.y, s.radius * 5, 0, Math.PI * 2);
          ctx!.fillStyle = glow;
          ctx!.fill();
        }

        // Star core
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(220, 240, 255, ${a})`;
        ctx!.fill();
      }

      // ── Mouse cursor star burst ──────────────────────────────
      if (mouse.x > 0 && mouse.x < W) {
        const pulse = 0.4 + 0.3 * Math.sin(t * 3);
        const cur = ctx!.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 30);
        cur.addColorStop(0,   `rgba(147, 210, 255, ${pulse * 0.35})`);
        cur.addColorStop(1,   `rgba(147, 210, 255, 0)`);
        ctx!.beginPath();
        ctx!.arc(mouse.x, mouse.y, 30, 0, Math.PI * 2);
        ctx!.fillStyle = cur;
        ctx!.fill();
      }
    }

    function loop() { draw(); rafId = requestAnimationFrame(loop); }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    function onMouseLeave() { mouse = { x: -9999, y: -9999 }; }

    function onClick(e: MouseEvent) {
      // Burst: spawn 8 new stars near click, remove 8 old ones
      const rect = canvas!.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const burst: Star[] = Array.from({ length: 8 }, () => ({
        x: cx + (Math.random() - 0.5) * 40,
        y: cy + (Math.random() - 0.5) * 40,
        vx: (Math.random() - 0.5) * MAX_SPEED * 2,
        vy: (Math.random() - 0.5) * MAX_SPEED * 2,
        radius: 0.8 + Math.random() * 1.4,
        alpha: 0.7 + Math.random() * 0.3,
        twinkleSpeed: 1 + Math.random(),
        twinklePhase: Math.random() * Math.PI * 2,
      }));
      stars.splice(0, 8);
      stars.push(...burst);
    }

    build();
    if (reduced) { draw(); } else { loop(); }

    window.addEventListener("resize", build);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", build);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ display: "block", cursor: "crosshair" }}
      aria-hidden="true"
    />
  );
}
