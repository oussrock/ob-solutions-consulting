"use client";
import { useEffect, useRef } from "react";

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  alpha: number;
  pulsePhase: number;
  isHub: boolean;
}

const LINK_DIST   = 160;   // max connection distance
const MOUSE_DIST  = 180;   // mouse influence radius
const MOUSE_FORCE = 0.012; // how strongly nodes are pulled toward mouse
const MAX_SPEED   = 0.6;

function nodeCount(w: number) {
  if (w < 640)  return 40;
  if (w < 1024) return 70;
  return 100;
}

export default function NetworkBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Respect reduced motion
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0;
    let nodes: Node[] = [];
    let mouse = { x: -9999, y: -9999 };
    let rafId = 0;
    let t = 0;

    function buildNodes() {
      W = canvas!.width  = canvas!.offsetWidth;
      H = canvas!.height = canvas!.offsetHeight;
      const count = nodeCount(W);
      nodes = Array.from({ length: count }, () => ({
        x:          Math.random() * W,
        y:          Math.random() * H,
        vx:         (Math.random() - 0.5) * MAX_SPEED,
        vy:         (Math.random() - 0.5) * MAX_SPEED,
        radius:     Math.random() < 0.15 ? 3.5 : 1.8,
        alpha:      0.5 + Math.random() * 0.5,
        pulsePhase: Math.random() * Math.PI * 2,
        isHub:      Math.random() < 0.12,
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      t += 0.012;

      for (const node of nodes) {
        // Mouse attraction
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const d  = Math.hypot(dx, dy);
        if (d < MOUSE_DIST && d > 1) {
          node.vx += (dx / d) * MOUSE_FORCE;
          node.vy += (dy / d) * MOUSE_FORCE;
        }

        // Speed cap
        const speed = Math.hypot(node.vx, node.vy);
        if (speed > MAX_SPEED) {
          node.vx = (node.vx / speed) * MAX_SPEED;
          node.vy = (node.vy / speed) * MAX_SPEED;
        }

        // Move
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges with soft repulsion
        if (node.x < 0)  { node.x = 0;  node.vx = Math.abs(node.vx); }
        if (node.x > W)  { node.x = W;  node.vx = -Math.abs(node.vx); }
        if (node.y < 0)  { node.y = 0;  node.vy = Math.abs(node.vy); }
        if (node.y > H)  { node.y = H;  node.vy = -Math.abs(node.vy); }
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          if (dist > LINK_DIST) continue;

          const opacity = (1 - dist / LINK_DIST) * 0.35;
          // Gradient line — blue to lighter blue
          const grad = ctx!.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, `rgba(147,197,253,${opacity})`);
          grad.addColorStop(1, `rgba(96,165,250,${opacity})`);
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.strokeStyle = grad;
          ctx!.lineWidth = (a.isHub || b.isHub) ? 1.2 : 0.7;
          ctx!.stroke();
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const pulse = node.isHub
          ? 1 + 0.3 * Math.sin(t * 2 + node.pulsePhase)
          : 1;
        const r = node.radius * pulse;

        if (node.isHub) {
          // Outer glow ring for hub nodes
          const glow = ctx!.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 4);
          glow.addColorStop(0, `rgba(96,165,250,0.25)`);
          glow.addColorStop(1, `rgba(96,165,250,0)`);
          ctx!.beginPath();
          ctx!.arc(node.x, node.y, r * 4, 0, Math.PI * 2);
          ctx!.fillStyle = glow;
          ctx!.fill();
        }

        // Node circle
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx!.fillStyle = node.isHub
          ? `rgba(147,197,253,${node.alpha})`
          : `rgba(203,213,225,${node.alpha * 0.8})`;
        ctx!.fill();
      }
    }

    function loop() {
      draw();
      rafId = requestAnimationFrame(loop);
    }

    function onResize() {
      buildNodes();
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    function onMouseLeave() {
      mouse = { x: -9999, y: -9999 };
    }

    buildNodes();

    if (reduced) {
      draw(); // single static frame
    } else {
      loop();
    }

    window.addEventListener("resize", onResize);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ display: "block" }}
      aria-hidden="true"
    />
  );
}
