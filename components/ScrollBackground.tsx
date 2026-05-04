"use client";

import { useEffect, useState, useRef } from "react";

const P = { deepRed: "#96312e", midRed: "#d1675a", amber: "#ffbf6b", blue: "#398eb2", navy: "#153d52" };

const sectionThemes = [
  {
    id: "about",
    orbs: [
      { x: "10%",  y: "8%",  size: 560, color: P.midRed,  opacity: 0.12 },
      { x: "80%",  y: "20%", size: 340, color: P.blue,    opacity: 0.08 },
      { x: "50%",  y: "65%", size: 260, color: P.deepRed, opacity: 0.05 },
    ],
    particles: [
      { text: "{ }",   size: 28, x: "6%",  y: "18%", dur: 7  },
      { text: "</>",   size: 22, x: "72%", y: "12%", dur: 9  },
      { text: "() =>", size: 18, x: "55%", y: "55%", dur: 11 },
      { text: "npm",   size: 32, x: "18%", y: "70%", dur: 8  },
      { text: "git",   size: 24, x: "85%", y: "65%", dur: 10 },
    ],
  },
  {
    id: "experience",
    orbs: [
      { x: "75%",  y: "5%",  size: 520, color: P.blue,    opacity: 0.12 },
      { x: "15%",  y: "30%", size: 320, color: P.navy,    opacity: 0.10 },
      { x: "55%",  y: "72%", size: 220, color: P.midRed,  opacity: 0.06 },
    ],
    particles: [
      { text: "async",   size: 26, x: "5%",  y: "14%", dur: 8  },
      { text: "await",   size: 30, x: "68%", y: "8%",  dur: 10 },
      { text: "API",     size: 36, x: "40%", y: "60%", dur: 7  },
      { text: "REST",    size: 20, x: "80%", y: "55%", dur: 12 },
      { text: "fetch()", size: 18, x: "22%", y: "75%", dur: 9  },
    ],
  },
  {
    id: "experience-detail",
    orbs: [
      { x: "20%",  y: "10%", size: 560, color: P.navy,    opacity: 0.14 },
      { x: "72%",  y: "40%", size: 300, color: P.blue,    opacity: 0.09 },
      { x: "40%",  y: "78%", size: 200, color: P.deepRed, opacity: 0.05 },
    ],
    particles: [
      { text: "CI/CD",   size: 22, x: "8%",  y: "20%", dur: 9  },
      { text: "React",   size: 32, x: "65%", y: "10%", dur: 7  },
      { text: "Node.js", size: 20, x: "48%", y: "58%", dur: 11 },
      { text: "deploy",  size: 28, x: "78%", y: "62%", dur: 8  },
      { text: "git push",size: 18, x: "20%", y: "78%", dur: 10 },
    ],
  },
  {
    id: "projects",
    orbs: [
      { x: "62%",  y: "5%",  size: 500, color: P.amber,   opacity: 0.08 },
      { x: "10%",  y: "25%", size: 340, color: P.blue,    opacity: 0.10 },
      { x: "45%",  y: "68%", size: 240, color: P.midRed,  opacity: 0.06 },
    ],
    particles: [
      { text: "build",  size: 34, x: "5%",  y: "16%", dur: 8  },
      { text: "vercel", size: 22, x: "70%", y: "9%",  dur: 10 },
      { text: "ship",   size: 30, x: "42%", y: "62%", dur: 7  },
      { text: "www",    size: 26, x: "82%", y: "58%", dur: 11 },
      { text: "render", size: 18, x: "18%", y: "80%", dur: 9  },
    ],
  },
  {
    id: "contact",
    orbs: [
      { x: "50%",  y: "10%", size: 480, color: P.midRed,  opacity: 0.11 },
      { x: "18%",  y: "50%", size: 280, color: P.deepRed, opacity: 0.07 },
      { x: "76%",  y: "70%", size: 200, color: P.blue,    opacity: 0.06 },
    ],
    particles: [
      { text: "@",       size: 40, x: "8%",  y: "15%", dur: 7  },
      { text: "connect", size: 22, x: "65%", y: "10%", dur: 9  },
      { text: "hire",    size: 32, x: "42%", y: "60%", dur: 8  },
      { text: "mail()",  size: 20, x: "80%", y: "56%", dur: 11 },
      { text: "ping",    size: 26, x: "20%", y: "78%", dur: 10 },
    ],
  },
];

interface Props { theme: "dark" | "light"; }

export default function ScrollBackground({ theme }: Props) {
  const [themeIndex, setThemeIndex] = useState(0);
  const [fading, setFading] = useState(false);
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
        setTimeout(() => { setThemeIndex(best); currentRef.current = best; setFading(false); }, 320);
      }
    };
    detect();
    window.addEventListener("scroll", detect, { passive: true });
    return () => window.removeEventListener("scroll", detect);
  }, []);

  const t = sectionThemes[themeIndex];
  const particleColor = isDark ? "rgba(255,191,107,0.07)" : "rgba(150,49,46,0.06)";
  const vignetteColor = isDark ? "#0c1018" : "#f0f4f8";

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0, transition: "opacity 0.5s ease", opacity: fading ? 0 : 1 }}
      aria-hidden="true">
      {t.orbs.map((orb, i) => (
        <div key={i} style={{
          position: "absolute", left: orb.x, top: orb.y,
          width: orb.size, height: orb.size, borderRadius: "50%",
          background: orb.color,
          opacity: isDark ? orb.opacity : orb.opacity * 0.5,
          filter: `blur(${orb.size * 0.44}px)`,
          transform: "translate(-50%, -50%)",
          animation: `orbFloat ${6 + i * 2.5}s ease-in-out infinite alternate`,
        }}/>
      ))}

      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(circle, ${isDark ? `rgba(57,142,178,0.05)` : `rgba(21,61,82,0.04)`} 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
      }}/>

      {t.particles.map((p, i) => (
        <div key={p.text + i} style={{
          position: "absolute", left: p.x, top: p.y,
          fontFamily: "'DM Mono', monospace",
          fontSize: `${p.size}px`, fontWeight: 700,
          color: particleColor,
          animation: `particleDrift ${p.dur}s ease-in-out infinite alternate`,
          animationDelay: `${i * 0.7}s`,
          whiteSpace: "nowrap", userSelect: "none", pointerEvents: "none",
        }}>{p.text}</div>
      ))}

      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, ${vignetteColor} 90%)`,
      }}/>

      <style>{`
        @keyframes orbFloat { 0% { transform:translate(-50%,-50%) scale(1); } 100% { transform:translate(-50%,-46%) scale(1.06); } }
        @keyframes particleDrift { 0% { transform:translateY(0px) rotate(-1.5deg); } 100% { transform:translateY(-22px) rotate(1.5deg); } }
      `}</style>
    </div>
  );
}
