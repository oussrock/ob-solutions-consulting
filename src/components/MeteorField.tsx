"use client";
/**
 * MeteorField — faithful port of the CodePen "Interactive Stars" by Thibka.
 *
 * Three layers:
 *  1. Canvas — stars drifting upward + mouse-trail dots with connecting lines
 *  2. Color filter div — slow overlay pulse (blue/indigo for brand alignment)
 *  3. Optional mountain silhouette SVG at the bottom
 */
import { useEffect, useRef } from "react";

interface StarObj { id: number; x: number; y: number; r: number; color: string; }
interface DotObj {
  id: number; x: number; y: number; r: number;
  maxLinks: number; speed: number;
  a: number; aReduction: number;
  color: string; linkColor: string;
  dir: number;
}

const PARAMS = {
  maxDistFromCursor: 50,
  dotsSpeed: 0,
  backgroundSpeed: 0,
};

export default function MeteorField({
  className = "",
  showLandscape = false,
}: {
  className?: string;
  showLandscape?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;


    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let WIDTH = 0, HEIGHT = 0;
    let mouseMoving = false;
    let mouseMoveChecker: ReturnType<typeof setTimeout>;
    let mouseX = 0, mouseY = 0;
    const stars: StarObj[] = [];
    const initStarsPopulation = 80;
    const dots: Record<number, DotObj> = {};
    const dotsMinDist = 2;
    let rafId = 0;

    function degToRad(deg: number) { return deg * (Math.PI / 180); }

    function makeStar(id: number): StarObj {
      const alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
      return {
        id,
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
        r: Math.floor(Math.random() * 2) + 1,
        color: `rgba(255,255,255,${alpha})`,
      };
    }

    function drawStar(s: StarObj) {
      ctx.fillStyle = s.color;
      ctx.shadowBlur = s.r * 2;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.fill();
    }

    function moveStar(s: StarObj) {
      s.y -= 0.15 + PARAMS.backgroundSpeed / 100;
      if (s.y <= -10) s.y = HEIGHT + 10;
      drawStar(s);
    }

    function makeDot(id: number, x: number, y: number): DotObj {
      const a = 0.5;
      return {
        id, x, y,
        r: Math.floor(Math.random() * 5) + 1,
        maxLinks: 2,
        speed: 0.5,
        a,
        aReduction: 0.005,
        color: `rgba(255,255,255,${a})`,
        linkColor: `rgba(255,255,255,${a / 4})`,
        dir: Math.floor(Math.random() * 140) + 200,
      };
    }

    function drawDot(d: DotObj) {
      ctx.fillStyle = d.color;
      ctx.shadowBlur = d.r * 2;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.fill();
    }

    function getPreviousDot(id: number, stepback: number): DotObj | false {
      if (id === 0 || id - stepback < 0) return false;
      const candidate = dots[id - stepback];
      return candidate ?? false;
    }

    function linkDot(d: DotObj) {
      if (d.id === 0) return;
      const p1 = getPreviousDot(d.id, 1);
      const p2 = getPreviousDot(d.id, 2);
      const p3 = getPreviousDot(d.id, 3);
      if (!p1) return;
      ctx.strokeStyle = d.linkColor;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(d.x, d.y);
      if (p2) ctx.lineTo(p2.x, p2.y);
      if (p3) ctx.lineTo(p3.x, p3.y);
      ctx.stroke();
      ctx.closePath();
    }

    function moveDot(d: DotObj) {
      d.a -= d.aReduction;
      if (d.a <= 0) { delete dots[d.id]; return; }
      d.color = `rgba(255,255,255,${d.a})`;
      d.linkColor = `rgba(255,255,255,${d.a / 4})`;
      d.x += Math.cos(degToRad(d.dir)) * (d.speed + PARAMS.dotsSpeed / 100);
      d.y += Math.sin(degToRad(d.dir)) * (d.speed + PARAMS.dotsSpeed / 100);
      drawDot(d);
      linkDot(d);
    }

    function setCanvasSize() {
      WIDTH  = canvas!.offsetWidth  || document.documentElement.clientWidth;
      HEIGHT = canvas!.offsetHeight || document.documentElement.clientHeight;
      canvas!.setAttribute("width", String(WIDTH));
      canvas!.setAttribute("height", String(HEIGHT));
    }

    function init() {
      ctx.strokeStyle = "white";
      ctx.shadowColor = "white";
      for (let i = 0; i < initStarsPopulation; i++) {
        stars[i] = makeStar(i);
      }
      ctx.shadowBlur = 0;
    }

    function drawIfMouseMoving() {
      if (!mouseMoving) return;
      const len = Object.keys(dots).length;

      if (len === 0) {
        dots[0] = makeDot(0, mouseX, mouseY);
        drawDot(dots[0]);
        return;
      }

      const prevKey = Math.max(...Object.keys(dots).map(Number));
      const prev = dots[prevKey];
      if (!prev) return;

      const diffX = Math.abs(prev.x - mouseX);
      const diffY = Math.abs(prev.y - mouseY);
      if (diffX < dotsMinDist || diffY < dotsMinDist) return;

      const xv = (Math.random() > 0.5 ? -1 : 1) * (Math.floor(Math.random() * PARAMS.maxDistFromCursor) + 1);
      const yv = (Math.random() > 0.5 ? -1 : 1) * (Math.floor(Math.random() * PARAMS.maxDistFromCursor) + 1);
      const nextId = prevKey + 1;
      dots[nextId] = makeDot(nextId, mouseX + xv, mouseY + yv);
      drawDot(dots[nextId]);
      linkDot(dots[nextId]);
    }

    function animate() {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      for (const s of stars) moveStar(s);
      for (const id in dots) moveDot(dots[+id]);
      drawIfMouseMoving();
      rafId = requestAnimationFrame(animate);
    }

    function onMouseMove(e: MouseEvent) {
      mouseMoving = true;
      const rect = canvas!.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      clearTimeout(mouseMoveChecker);
      mouseMoveChecker = setTimeout(() => { mouseMoving = false; }, 100);
    }

    setCanvasSize();
    init();
    if (reduced) {
      // single static frame
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      for (const s of stars) drawStar(s);
    } else {
      animate();
    }

    window.addEventListener("resize", () => { setCanvasSize(); });
    canvas.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(mouseMoveChecker);
      window.removeEventListener("resize", () => { setCanvasSize(); });
      canvas.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      {/* Gradient sky */}
      <div
        className={`absolute inset-0 ${className}`}
        style={{ background: "linear-gradient(to bottom, #000010 0%, #0d1b4e 60%, #1a3a7c 100%)" }}
        aria-hidden="true"
      />

      {/* Color pulse filter — blue/indigo instead of red */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "#3b5bdb",
          mixBlendMode: "overlay",
          animation: "meteorColorPulse 30s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      {/* Stars + dot trails canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: "block", cursor: "none" }}
        aria-hidden="true"
      />

      {/* Optional mountain silhouette */}
      {showLandscape && (
        <svg
          className="absolute bottom-0 left-0 w-full pointer-events-none"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,200 L0,130 L120,90 L220,120 L340,60 L440,100 L560,40 L660,80 L760,20 L860,70 L960,30 L1060,75 L1160,45 L1280,95 L1380,65 L1440,85 L1440,200 Z"
            fill="rgba(0,0,10,0.85)"
          />
        </svg>
      )}
    </>
  );
}
