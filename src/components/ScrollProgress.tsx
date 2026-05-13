"use client";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const h = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop;
      const total = doc.scrollHeight - doc.clientHeight;
      setP(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-[100] bg-slate-200/0">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-none"
        style={{ width: `${p}%` }}
      />
    </div>
  );
}
