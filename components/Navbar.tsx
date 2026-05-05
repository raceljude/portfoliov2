"use client";
import { P } from "@/lib/theme";

import { useEffect, useState, useRef } from "react";
import { Sun, Moon } from "lucide-react";
import RJMMIcon from "./RJMMIcon";


const navLinks = [
  { label: "About",        href: "#about",             id: "about" },
  { label: "Experience",   href: "#experience",        id: "experience" },
  { label: "Work History", href: "#experience-detail", id: "experience-detail" },
  { label: "Skills",       href: "#skills",            id: "skills" },
  { label: "Projects",     href: "#projects",          id: "projects" },
  { label: "Contact",      href: "#contact",           id: "contact" },
];

interface NavbarProps {
  theme: "dark" | "light";
  onThemeToggle: () => void;
  onHireMe: () => void;
  isDark: boolean;
  profileFirstName?: string;
  profileLastName?: string;
}

export default function Navbar({ theme, onThemeToggle, onHireMe, isDark, profileFirstName = "Racel Jude", profileLastName = "Marahay" }: NavbarProps) {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pill,        setPill]        = useState({ left: 0, width: 0 });
  const linkRefs     = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const clickLockRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lockedRef    = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const detect = () => {
      if (lockedRef.current) return;
      const OFFSET = 100;
      let best = 0;
      navLinks.forEach(({ id }, i) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (el.getBoundingClientRect().top <= OFFSET) best = i;
      });
      setActiveIndex(best);
    };
    detect();
    window.addEventListener("scroll", detect, { passive: true });
    return () => window.removeEventListener("scroll", detect);
  }, []);

  useEffect(() => {
    const move = () => {
      const btn = linkRefs.current[activeIndex];
      const con = containerRef.current;
      if (!btn || !con) return;
      const b = btn.getBoundingClientRect();
      const c = con.getBoundingClientRect();
      setPill({ left: b.left - c.left, width: b.width });
    };
    move();
    window.addEventListener("resize", move);
    return () => window.removeEventListener("resize", move);
  }, [activeIndex]);

  const handleNavClick = (href: string, index: number) => {
    setMenuOpen(false);
    setActiveIndex(index);
    lockedRef.current = true;
    if (clickLockRef.current) clearTimeout(clickLockRef.current);
    clickLockRef.current = setTimeout(() => { lockedRef.current = false; }, 1000);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navBg     = scrolled ? isDark ? "rgba(12,16,24,0.92)" : "rgba(240,244,248,0.92)" : "transparent";
  const navBorder = scrolled ? isDark ? "1px solid rgba(30,42,58,0.9)"  : "1px solid rgba(196,210,222,0.6)" : "1px solid transparent";
  const linkColor = isDark ? "#4a6a80" : "#5a8aaa";
  const linkHover = isDark ? "#c8dce8" : "#0e1e2a";

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40" style={{
        transition: "background 0.4s ease, border-color 0.4s ease",
        background: navBg,
        backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
        borderBottom: navBorder,
      }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">

            {/* Logo */}
            <button onClick={() => { handleNavClick("#about", 0); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center gap-2.5 group focus:outline-none" aria-label="Back to top">
              <div className="group-hover:scale-105" style={{ transition: "transform 0.2s ease" }}>
                <RJMMIcon size={34}/>
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-[11px] font-extrabold tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-display)", color: isDark ? "#f0ece8" : "#0e1e2a" }}>
                  {profileFirstName}
                </span>
                <span className="text-[9px] font-mono tracking-widest uppercase mt-0.5" style={{ color: linkColor }}>
                  {profileLastName}
                </span>
              </div>
            </button>

            {/* Desktop links */}
            <div className="hidden sm:flex items-center gap-0.5 relative" ref={containerRef}>
              {/* Sliding pill */}
              <div aria-hidden="true" style={{
                position: "absolute", top: "50%", transform: "translateY(-50%)",
                left: pill.left, width: pill.width, height: "28px", borderRadius: "8px",
                background: `${P.midRed}15`, border: `1px solid ${P.midRed}30`,
                transition: "left 0.35s cubic-bezier(0.4,0,0.2,1), width 0.35s cubic-bezier(0.4,0,0.2,1)",
                pointerEvents: "none", zIndex: 0,
              }}/>

              {navLinks.map((link, i) => (
                <button key={link.href} ref={el => { linkRefs.current[i] = el; }}
                  onClick={() => handleNavClick(link.href, i)}
                  className="relative z-10 px-3 py-1.5 text-xs font-mono tracking-wider uppercase focus:outline-none"
                  style={{ color: activeIndex === i ? P.midRed : linkColor, transition: "color 0.25s ease" }}
                  onMouseEnter={e => { if (activeIndex !== i) (e.currentTarget as HTMLElement).style.color = linkHover; }}
                  onMouseLeave={e => { if (activeIndex !== i) (e.currentTarget as HTMLElement).style.color = linkColor; }}>
                  {link.label}
                </button>
              ))}

              {/* Theme toggle */}
              <button onClick={onThemeToggle} className="ml-2 p-2 rounded-lg border focus:outline-none"
                style={{ borderColor: isDark ? "#1e2a3a" : "#c4d2de", color: linkColor, transition: "all 0.2s", background: "transparent" }}
                aria-label="Toggle theme"
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = P.blue; (e.currentTarget as HTMLElement).style.color = P.blue; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = isDark ? "#1e2a3a" : "#c4d2de"; (e.currentTarget as HTMLElement).style.color = linkColor; }}>
                {isDark ? <Sun size={13}/> : <Moon size={13}/>}
              </button>

              {/* Hire me */}
              <button onClick={onHireMe} className="ml-1 px-3 py-1.5 text-xs font-mono tracking-wider uppercase rounded-lg border focus:outline-none"
                style={{ borderColor: `${P.midRed}50`, color: P.midRed, transition: "background 0.2s, border-color 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${P.midRed}14`; (e.currentTarget as HTMLElement).style.borderColor = P.midRed; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = `${P.midRed}50`; }}>
                Hire me
              </button>
            </div>

            {/* Mobile */}
            <div className="sm:hidden flex items-center gap-2">
              <button onClick={onThemeToggle} className="p-2 rounded-lg border focus:outline-none"
                style={{ borderColor: isDark ? "#1e2a3a" : "#c4d2de", color: linkColor }}>
                {isDark ? <Sun size={13}/> : <Moon size={13}/>}
              </button>
              <button onClick={() => setMenuOpen(v => !v)} className="p-2 rounded-lg border focus:outline-none"
                style={{ borderColor: isDark ? "#1e2a3a" : "#c4d2de", color: linkColor }} aria-label="Toggle menu">
                <div className="flex flex-col gap-1 w-4">
                  {[0, 1, 2].map(i => (
                    <span key={i} className="h-px bg-current block" style={{
                      transition: "transform 0.3s ease, opacity 0.3s ease",
                      transform: menuOpen ? i === 0 ? "translateY(4px) rotate(45deg)" : i === 2 ? "translateY(-4px) rotate(-45deg)" : "none" : "none",
                      opacity: menuOpen && i === 1 ? 0 : 1,
                    }}/>
                  ))}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="sm:hidden overflow-hidden" style={{
          maxHeight: menuOpen ? "340px" : "0", opacity: menuOpen ? 1 : 0,
          transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease",
        }}>
          <div className="border-t px-4 py-3 flex flex-col gap-1 backdrop-blur-xl"
            style={{ borderColor: isDark ? "#1e2a3a" : "#c4d2de", background: isDark ? "rgba(10,14,22,0.98)" : "rgba(240,244,248,0.98)" }}>
            {navLinks.map((link, i) => (
              <button key={link.href} onClick={() => handleNavClick(link.href, i)}
                className="w-full text-left px-3 py-2.5 text-xs font-mono tracking-wider uppercase rounded-lg focus:outline-none"
                style={{ color: activeIndex === i ? P.midRed : linkColor, background: activeIndex === i ? `${P.midRed}10` : "transparent", transition: "color 0.2s, background 0.2s" }}>
                {link.label}
              </button>
            ))}
            <button onClick={() => { setMenuOpen(false); onHireMe(); }}
              className="mt-1 px-3 py-2.5 text-xs font-mono tracking-wider uppercase rounded-lg border text-center w-full focus:outline-none"
              style={{ borderColor: `${P.midRed}50`, color: P.midRed }}>
              Hire me
            </button>
          </div>
        </div>
      </nav>
      <div className="h-14"/>
    </>
  );
}
