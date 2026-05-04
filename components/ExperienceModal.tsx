"use client";

import { useEffect, useRef } from "react";
import { X, MapPin, Calendar, Code2 } from "lucide-react";

interface Experience {
  id: string; role: string; company: string; period: string;
  location: string; status: string; color: string;
  summary: string; highlights: string[]; stack: string[];
}
interface ExperienceModalProps { experience: Experience | null; onClose: () => void; isDark: boolean; }

export default function ExperienceModal({ experience, onClose, isDark }: ExperienceModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!experience) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [experience, onClose]);

  if (!experience) return null;

  const bg      = isDark ? "#111827" : "#e8eef4";
  const border  = isDark ? "#1e2a3a" : "#c4d2de";
  const textPri = isDark ? "#f0ece8" : "#0e1e2a";
  const textSec = isDark ? "#8aa8bc" : "#2a4f66";
  const textMut = isDark ? "#4a6a80" : "#5a8aaa";
  const pillBg  = isDark ? "#0e1e2c" : "#dce8f0";

  return (
    <div ref={overlayRef} className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={e => { if (e.target === overlayRef.current) onClose(); }}
      style={{ animation: "fadeIn 0.2s ease forwards" }}>
      <div className="absolute inset-0 backdrop-blur-sm" style={{ background: isDark ? "rgba(0,0,0,0.82)" : "rgba(100,140,160,0.45)" }}/>
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl shadow-2xl"
        style={{ background: bg, border: `1px solid ${border}`, animation: "slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards" }}>
        <div className="h-[3px] w-full rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${experience.color}, transparent)` }}/>
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg transition-all focus:outline-none"
          style={{ color: textMut, border: `1px solid ${border}` }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = textPri; (e.currentTarget as HTMLElement).style.borderColor = experience.color; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = textMut; (e.currentTarget as HTMLElement).style.borderColor = border; }}>
          <X size={18}/>
        </button>
        <div className="p-6 pt-5">
          {experience.status === "current" && (
            <span className="inline-flex items-center gap-1.5 text-xs font-mono px-2 py-0.5 rounded-full mb-3"
              style={{ color: experience.color, background: `${experience.color}18`, border: `1px solid ${experience.color}35` }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: experience.color }}/> Current
            </span>
          )}
          <h2 className="text-2xl font-bold leading-tight" style={{ fontFamily: "var(--font-display)", color: textPri }}>{experience.role}</h2>
          <p className="font-medium mt-1 text-sm" style={{ color: experience.color }}>{experience.company}</p>
          <div className="flex flex-wrap gap-4 mt-3 text-xs font-mono" style={{ color: textMut }}>
            <span className="flex items-center gap-1.5"><Calendar size={12}/>{experience.period}</span>
            <span className="flex items-center gap-1.5"><MapPin size={12}/>{experience.location}</span>
          </div>
          <p className="mt-5 text-sm leading-relaxed border-l-2 pl-4" style={{ color: textSec, borderColor: experience.color }}>{experience.summary}</p>
          <div className="mt-6">
            <h3 className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: textMut }}>What I did</h3>
            <ul className="space-y-2.5">
              {experience.highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: isDark ? "#c8dce8" : "#1a3a50" }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: experience.color }}/>{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <h3 className="text-xs font-mono uppercase tracking-widest mb-3 flex items-center gap-1.5" style={{ color: textMut }}>
              <Code2 size={11}/> Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {experience.stack.map(tech => (
                <span key={tech} className="text-xs font-mono px-2.5 py-1 rounded-md" style={{ border: `1px solid ${border}`, color: isDark ? "#8aa8bc" : "#2a4f66", background: pillBg }}>{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes slideUp { from { opacity:0; transform:translateY(30px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
      `}</style>
    </div>
  );
}
