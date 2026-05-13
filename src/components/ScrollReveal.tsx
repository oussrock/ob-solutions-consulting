"use client";
import { useEffect, useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade";
  className?: string;
  threshold?: number;
  once?: boolean;
}

const transforms: Record<string, string> = {
  up:    "translateY(32px)",
  left:  "translateX(-32px)",
  right: "translateX(32px)",
  fade:  "translateY(0px)",
};

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  threshold = 0.12,
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    el.style.opacity = "0";
    el.style.transform = transforms[direction];
    el.style.transition = `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms`;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "none";
          if (once) obs.unobserve(el);
        } else if (!once) {
          el.style.opacity = "0";
          el.style.transform = transforms[direction];
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, direction, threshold, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
