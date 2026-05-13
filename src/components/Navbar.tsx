"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(true);

  useEffect(() => {
    const h = () => {
      setScrolled(window.scrollY > 20);
      setOnDark(window.scrollY < window.innerHeight * 0.7);
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const isDark = onDark && !scrolled;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-blur shadow-sm py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/30 group-hover:bg-blue-700 transition-colors">
            <Zap size={18} className="text-white fill-white" />
          </div>
          <span className={`font-bold text-lg tracking-tight transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>
            OB <span className="text-blue-600">Solutions</span>
          </span>
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className={`text-sm font-medium transition-colors duration-200 hover:text-blue-600 relative group ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-600 rounded-full transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <Link href="/contact"
          className="hidden md:inline-flex items-center gap-2 btn-primary px-5 py-2.5 text-sm cursor-pointer">
          Free Consultation
        </Link>

        <button className={`md:hidden cursor-pointer ${isDark ? "text-white" : "text-slate-700"}`} onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-4 shadow-lg">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="text-slate-700 hover:text-blue-600 font-medium transition-colors">{l.label}</Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)}
            className="btn-primary px-4 py-2.5 text-sm text-center cursor-pointer">
            Free Consultation
          </Link>
        </div>
      )}
    </header>
  );
}
