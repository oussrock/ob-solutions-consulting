"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  to: number;
  from?: number;
  suffix?: string;
  className?: string;
  duration?: number;
}

export default function AnimatedCounter({ to, from = 0, suffix = "", className = "", duration = 1800 }: Props) {
  const [count, setCount] = useState(from);
  const [pulsing, setPulsing] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(to); return;
    }
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const steps = 60;
        const inc = (to - from) / steps;
        let cur = from;
        const timer = setInterval(() => {
          cur = Math.min(cur + inc, to);
          setCount(Math.floor(cur));
          if (cur >= to) {
            clearInterval(timer);
            setPulsing(true);
            setTimeout(() => setPulsing(false), 600);
          }
        }, duration / steps);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, from, duration]);

  return (
    <span
      ref={ref}
      className={`inline-block transition-transform duration-300 ${pulsing ? "scale-110" : "scale-100"} ${className}`}
    >
      {count}{suffix}
    </span>
  );
}
