"use client";
import { useEffect, useState } from "react";

interface Props {
  phrases: string[];
  className?: string;
}

export default function TypewriterText({ phrases, className = "" }: Props) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayed(phrases[0]);
      return;
    }

    const current = phrases[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setPhraseIndex((i) => (i + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, phraseIndex, phrases]);

  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse text-yellow-400">|</span>
    </span>
  );
}
