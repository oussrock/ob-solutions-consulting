"use client";
import { useEffect, useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  staggerMs?: number;
  baseDelay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "fade";
}

export default function StaggerChildren({
  children,
  staggerMs = 80,
  baseDelay = 0,
  className = "",
  direction = "up",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parent = ref.current;
    if (!parent) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const transforms: Record<string, string> = {
      up:    "translateY(28px)",
      left:  "translateX(-28px)",
      right: "translateX(28px)",
      fade:  "translateY(0)",
    };

    const children = Array.from(parent.children) as HTMLElement[];
    children.forEach((child, i) => {
      child.style.opacity = "0";
      child.style.transform = transforms[direction];
      child.style.transition = `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${baseDelay + i * staggerMs}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${baseDelay + i * staggerMs}ms`;
    });

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        children.forEach((child) => {
          child.style.opacity = "1";
          child.style.transform = "none";
        });
        obs.unobserve(parent);
      }
    }, { threshold: 0.1 });

    obs.observe(parent);
    return () => obs.disconnect();
  }, [staggerMs, baseDelay, direction]);

  return <div ref={ref} className={className}>{children}</div>;
}
