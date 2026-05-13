"use client";
import { useEffect, useRef } from "react";

export default function FuturisticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    /* ── Particles ── */
    interface Particle { x:number; y:number; vx:number; vy:number; r:number; color:string; opacity:number; }
    const PARTICLE_COLORS = ["#EAB308","#06B6D4","#7C3AED","#22C55E","#F8FAFC"];
    const particles: Particle[] = Array.from({length: 80}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.8 + 0.4,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      opacity: Math.random() * 0.55 + 0.1,
    }));

    /* ── Grid ── */
    const GRID = 16;
    let gridOffset = 0;

    /* ── Aurora blobs ── */
    interface Blob { x:number; y:number; r:number; color:string; vx:number; vy:number; }
    const blobs: Blob[] = [
      { x: canvas.width*0.2, y: canvas.height*0.3, r: 350, color:"rgba(6,182,212,0.05)",   vx:0.2,  vy:0.15 },
      { x: canvas.width*0.8, y: canvas.height*0.6, r: 400, color:"rgba(124,58,237,0.05)",  vx:-0.15,vy:0.2  },
      { x: canvas.width*0.5, y: canvas.height*0.8, r: 300, color:"rgba(234,179,8,0.04)",   vx:0.1,  vy:-0.2 },
      { x: canvas.width*0.1, y: canvas.height*0.8, r: 250, color:"rgba(34,197,94,0.04)",   vx:0.3,  vy:-0.1 },
    ];

    /* ── Digital rain columns ── */
    const CHARS = "01アカサタナハマヤラ∆∑⌘◈⬡";
    const COL_W = 22;
    const cols = Math.floor(canvas.width / COL_W);
    const drops = Array.from({length: cols}, () => Math.random() * -60);

    /* ── Hex grid ── */
    interface Hex { x:number; y:number; r:number; pulse:number; speed:number; color:string; }
    const hexes: Hex[] = Array.from({length: 14}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 22 + 10,
      pulse: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.012 + 0.006,
      color: Math.random() > 0.5 ? "#EAB308" : "#06B6D4",
    }));

    /* ── Rings ── */
    interface Ring { x:number; y:number; r:number; maxR:number; alpha:number; color:string; }
    const rings: Ring[] = [];
    let ringTick = 0;

    function hexPath(cx:number, cy:number, r:number) {
      if (!ctx) return;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI/3)*i - Math.PI/6;
        i === 0 ? ctx.moveTo(cx + r*Math.cos(a), cy + r*Math.sin(a))
                : ctx.lineTo(cx + r*Math.cos(a), cy + r*Math.sin(a));
      }
      ctx.closePath();
    }

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      if (!reduced) { t += 0.004; gridOffset = (gridOffset + 0.003) % (1/GRID); ringTick++; }
      if (ringTick % 80 === 0) rings.push({ x:Math.random()*W, y:Math.random()*H, r:0, maxR:Math.random()*150+60, alpha:0.6, color:Math.random()>0.5?"#EAB308":"#06B6D4" });

      /* Clear */
      /* Slightly lighter base so the grid/effects are visible but not overwhelming */
      ctx.fillStyle = "rgba(2,8,23,0.88)";
      ctx.fillRect(0, 0, W, H);

      /* ── Aurora blobs ── */
      blobs.forEach(b => {
        if (!reduced) { b.x += b.vx; b.y += b.vy; if(b.x<-b.r||b.x>W+b.r) b.vx*=-1; if(b.y<-b.r||b.y>H+b.r) b.vy*=-1; }
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, b.color); g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI*2); ctx.fill();
      });

      /* ── Perspective grid ── */
      const HY = H * 0.46, CX = W / 2;
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= GRID; i++) {
        const frac = ((i/GRID) + gridOffset) % 1;
        const d = Math.pow(frac, 1.8);
        const y = HY + (H - HY) * d;
        const sp = W * d * 1.8;
        const a = d * 0.5;
        ctx.strokeStyle = `rgba(6,182,212,${a * 0.7})`;
        ctx.beginPath(); ctx.moveTo(CX-sp, y); ctx.lineTo(CX+sp, y); ctx.stroke();
        // ceiling
        const yc = HY - HY * d;
        ctx.strokeStyle = `rgba(124,58,237,${a * 0.4})`;
        ctx.beginPath(); ctx.moveTo(CX-sp, yc); ctx.lineTo(CX+sp, yc); ctx.stroke();
      }
      for (let i = -GRID; i <= GRID; i++) {
        const xF = CX + (i/GRID)*W*1.8;
        ctx.strokeStyle = "rgba(6,182,212,0.12)";
        ctx.beginPath(); ctx.moveTo(CX, HY); ctx.lineTo(xF, H); ctx.stroke();
        ctx.strokeStyle = "rgba(124,58,237,0.05)";
        ctx.beginPath(); ctx.moveTo(CX, HY); ctx.lineTo(xF, 0); ctx.stroke();
      }

      /* ── Horizon neon line ── */
      const hg = ctx.createLinearGradient(0, HY-2, 0, HY+2);
      hg.addColorStop(0,"rgba(6,182,212,0)"); hg.addColorStop(0.5,"rgba(6,182,212,0.8)"); hg.addColorStop(1,"rgba(6,182,212,0)");
      ctx.fillStyle = hg; ctx.fillRect(0, HY-2, W, 4);
      // glow band
      const hg2 = ctx.createLinearGradient(0, HY-40, 0, HY+40);
      hg2.addColorStop(0,"rgba(6,182,212,0)"); hg2.addColorStop(0.5,"rgba(6,182,212,0.12)"); hg2.addColorStop(1,"rgba(6,182,212,0)");
      ctx.fillStyle = hg2; ctx.fillRect(0, HY-40, W, 80);

      /* ── Digital rain (edges only) ── */
      ctx.font = "12px monospace";
      drops.forEach((y, col) => {
        const x = col * COL_W;
        const frac = x / W;
        if (frac > 0.18 && frac < 0.82) return;
        const edge = frac < 0.18 ? (0.18 - frac)/0.18 : (frac - 0.82)/0.18;
        ctx.fillStyle = `rgba(6,182,212,${edge * 0.5})`;
        ctx.fillText(CHARS[Math.floor(Math.random()*CHARS.length)], x, y*20);
        if (y*20 > H && Math.random() > 0.97) drops[col] = 0;
        else if (!reduced) drops[col] += 0.45;
      });

      /* ── Connected particles ── */
      particles.forEach((p, i) => {
        if (!reduced) { p.x+=p.vx; p.y+=p.vy; if(p.x<0||p.x>W) p.vx*=-1; if(p.y<0||p.y>H) p.vy*=-1; }
        particles.slice(i+1).forEach(q => {
          const dx=p.x-q.x, dy=p.y-q.y, d=Math.sqrt(dx*dx+dy*dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(6,182,212,${0.1*(1-d/100)})`;
            ctx.lineWidth=0.4; ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.stroke();
          }
        });
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = p.color + Math.round(p.opacity*255).toString(16).padStart(2,"0");
        ctx.fill();
      });

      /* ── Hex nodes ── */
      hexes.forEach(h => {
        if (!reduced) h.pulse += h.speed;
        const pulse = Math.sin(h.pulse)*0.25+0.75;
        const r = h.r * pulse;
        const gg = ctx.createRadialGradient(h.x, h.y, 0, h.x, h.y, r*3);
        const c = h.color === "#EAB308" ? "234,179,8" : "6,182,212";
        gg.addColorStop(0, `rgba(${c},0.2)`); gg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath(); ctx.arc(h.x,h.y,r*3,0,Math.PI*2); ctx.fillStyle=gg; ctx.fill();
        hexPath(h.x, h.y, r);
        ctx.strokeStyle = h.color + "88"; ctx.lineWidth=1; ctx.stroke();
        ctx.beginPath(); ctx.arc(h.x,h.y,2,0,Math.PI*2); ctx.fillStyle=h.color; ctx.fill();
      });

      /* ── Rings ── */
      for (let i=rings.length-1; i>=0; i--) {
        const rr = rings[i];
        if (!reduced) { rr.r += 0.7; rr.alpha -= 0.7/rr.maxR; }
        if (rr.alpha <= 0) { rings.splice(i,1); continue; }
        ctx.beginPath(); ctx.arc(rr.x, rr.y, rr.r, 0, Math.PI*2);
        ctx.strokeStyle = rr.color + Math.round(rr.alpha*150).toString(16).padStart(2,"0");
        ctx.lineWidth=0.8; ctx.stroke();
      }

      /* ── HUD overlay ── */
      const hx = CX, hy = HY;
      ctx.setLineDash([3,6]);
      ctx.strokeStyle = `rgba(6,182,212,${0.25 + 0.1*Math.sin(t*2)})`;
      ctx.lineWidth=0.6;
      ctx.beginPath(); ctx.moveTo(hx-100,hy); ctx.lineTo(hx+100,hy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(hx,hy-60); ctx.lineTo(hx,hy+60); ctx.stroke();
      ctx.setLineDash([]);
      [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([sx,sy])=>{
        const bx=hx+sx*70, by=hy+sy*36, bl=14;
        ctx.strokeStyle=`rgba(234,179,8,${0.45+0.2*Math.sin(t*3)})`;
        ctx.lineWidth=1.5;
        ctx.beginPath(); ctx.moveTo(bx,by); ctx.lineTo(bx-sx*bl,by); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(bx,by); ctx.lineTo(bx,by-sy*bl); ctx.stroke();
      });

      /* ── Vignette ── */
      const vg = ctx.createRadialGradient(CX,H/2,H*0.15,CX,H/2,H*0.9);
      vg.addColorStop(0,"rgba(0,0,0,0)"); vg.addColorStop(1,"rgba(2,8,23,0.82)");
      ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
