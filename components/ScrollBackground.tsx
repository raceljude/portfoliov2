"use client";

import { useEffect, useState, useRef } from "react";

const sectionThemes = [
  {
    id: "about",
    orbs: [
      { x: "10%",  y: "8%",  size: 560, color: "#c8602a", opacity: 0.14 },
      { x: "82%",  y: "20%", size: 340, color: "#9a4020", opacity: 0.08 },
      { x: "50%",  y: "65%", size: 260, color: "#c8602a", opacity: 0.05 },
    ],
    grid: 0.04,
    particles: [
      { text: "{ }",    size: 72, x: "6%",  y: "18%", dur: 7  },
      { text: "</>",    size: 54, x: "72%", y: "12%", dur: 9  },
      { text: "() =>",  size: 44, x: "55%", y: "55%", dur: 11 },
      { text: "npm",    size: 88, x: "18%", y: "70%", dur: 8  },
      { text: "git",    size: 60, x: "85%", y: "65%", dur: 10 },
    ],
  },
  {
    id: "experience",
    orbs: [
      { x: "75%",  y: "5%",  size: 520, color: "#2a6a8a", opacity: 0.13 },
      { x: "15%",  y: "30%", size: 320, color: "#1a4a6a", opacity: 0.09 },
      { x: "55%",  y: "72%", size: 220, color: "#2a6a8a", opacity: 0.05 },
    ],
    grid: 0.035,
    particles: [
      { text: "async",    size: 66, x: "5%",  y: "14%", dur: 8  },
      { text: "await",    size: 80, x: "68%", y: "8%",  dur: 10 },
      { text: "API",      size: 96, x: "40%", y: "60%", dur: 7  },
      { text: "REST",     size: 52, x: "80%", y: "55%", dur: 12 },
      { text: "fetch()",  size: 44, x: "22%", y: "75%", dur: 9  },
    ],
  },
  {
    id: "experience-detail",
    orbs: [
      { x: "20%",  y: "10%", size: 560, color: "#5a3a8a", opacity: 0.12 },
      { x: "72%",  y: "40%", size: 300, color: "#3a2a6a", opacity: 0.08 },
      { x: "40%",  y: "78%", size: 200, color: "#5a3a8a", opacity: 0.05 },
    ],
    grid: 0.04,
    particles: [
      { text: "CI/CD",    size: 58, x: "8%",  y: "20%", dur: 9  },
      { text: "React",    size: 84, x: "65%", y: "10%", dur: 7  },
      { text: "Node.js",  size: 50, x: "48%", y: "58%", dur: 11 },
      { text: "deploy",   size: 76, x: "78%", y: "62%", dur: 8  },
      { text: "git push", size: 46, x: "20%", y: "78%", dur: 10 },
    ],
  },
  {
    id: "projects",
    orbs: [
      { x: "62%",  y: "5%",  size: 500, color: "#2a8a5a", opacity: 0.12 },
      { x: "10%",  y: "25%", size: 340, color: "#1a6a3a", opacity: 0.08 },
      { x: "45%",  y: "68%", size: 240, color: "#2a8a5a", opacity: 0.05 },
    ],
    grid: 0.03,
    particles: [
      { text: "build",   size: 90, x: "5%",  y: "16%", dur: 8  },
      { text: "vercel",  size: 56, x: "70%", y: "9%",  dur: 10 },
      { text: "ship",    size: 80, x: "42%", y: "62%", dur: 7  },
      { text: "www",     size: 68, x: "82%", y: "58%", dur: 11 },
      { text: "render",  size: 48, x: "18%", y: "80%", dur: 9  },
    ],
  },
  {
    id: "contact",
    orbs: [
      { x: "50%",  y: "10%", size: 480, color: "#c8602a", opacity: 0.11 },
      { x: "18%",  y: "50%", size: 280, color: "#a04020", opacity: 0.07 },
      { x: "76%",  y: "70%", size: 200, color: "#c8602a", opacity: 0.05 },
    ],
    grid: 0.035,
    particles: [
      { text: "@",        size: 110, x: "8%",  y: "15%", dur: 7  },
      { text: "connect",  size: 58,  x: "65%", y: "10%", dur: 9  },
      { text: "hire",     size: 84,  x: "42%", y: "60%", dur: 8  },
      { text: "mail()",   size: 52,  x: "80%", y: "56%", dur: 11 },
      { text: "ping",     size: 70,  x: "20%", y: "78%", dur: 10 },
    ],
  },
];

interface ScrollBackgroundProps {
  theme: "dark" | "light";
}

export default function ScrollBackground({ theme }: ScrollBackgroundProps) {
  const [themeIndex, setThemeIndex] = useState(0);
  const [fading,     setFading]     = useState(false);
  const currentRef = useRef(0);
  const isDark = theme === "dark";

  useEffect(() => {
    const detect = () => {
      const OFFSET = 100;
      let best = 0;
      sectionThemes.forEach(({ id }, i) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (el.getBoundingClientRect().top <= OFFSET) best = i;
      });
      if (best !== currentRef.current) {
        setFading(true);
        setTimeout(() => {
          setThemeIndex(best);
          currentRef.current = best;
          setFading(false);
        }, 320);
      }
    };
    detect();
    window.addEventListener("scroll", detect, { passive: true });
    return () => window.removeEventListener("scroll", detect);
  }, []);

  const t = sectionThemes[themeIndex];
  const particleColor = isDark
    ? "rgba(200,96,42,0.09)"
    : "rgba(160,64,20,0.07)";
  const vignetteColor = isDark ? "#0f0f0f" : "#f0ebe0";

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0, transition: "opacity 0.5s ease", opacity: fading ? 0 : 1 }}
      aria-hidden="true"
    >
      {/* Orbs */}
      {t.orbs.map((orb, i) => (
        <div key={i} style={{
          position: "absolute",
          left: orb.x,
          top: orb.y,
          width: orb.size,
          height: orb.size,
          borderRadius: "50%",
          background: orb.color,
          opacity: isDark ? orb.opacity : orb.opacity * 0.5,
          filter: `blur(${orb.size * 0.45}px)`,
          transform: "translate(-50%, -50%)",
          animation: `orbFloat ${6 + i * 2.5}s ease-in-out infinite alternate`,
        }} />
      ))}

      {/* Dot grid */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `radial-gradient(circle, ${isDark ? `rgba(245,240,232,${t.grid})` : `rgba(80,50,20,${t.grid * 0.7})`} 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
      }} />

      {/* Large floating code particles */}
      {t.particles.map((p, i) => (
        <div key={p.text + i} style={{
          position: "absolute",
          left: p.x,
          top: p.y,
          fontFamily: "'DM Mono', 'Courier New', monospace",
          fontSize: `${p.size}px`,
          fontWeight: 700,
          color: particleColor,
          letterSpacing: "-0.02em",
          lineHeight: 1,
          animation: `particleDrift ${p.dur}s ease-in-out infinite alternate`,
          animationDelay: `${i * 0.7}s`,
          whiteSpace: "nowrap",
          userSelect: "none",
          pointerEvents: "none",
        }}>
          {p.text}
        </div>
      ))}

      {/* Vignette to keep text readable */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, ${vignetteColor} 90%)`,
      }} />

      <style>{`
        @keyframes orbFloat {
          0%   { transform: translate(-50%,-50%) scale(1); }
          100% { transform: translate(-50%,-46%) scale(1.06); }
        }
        @keyframes particleDrift {
          0%   { transform: translateY(0px) rotate(-1.5deg); }
          100% { transform: translateY(-22px) rotate(1.5deg); }
        }
      `}</style>
    </div>
  );
}
