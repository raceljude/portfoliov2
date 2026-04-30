"use client";

import { useEffect, useRef } from "react";
import { X, MapPin, Calendar, Code2 } from "lucide-react";

interface Experience {
  id: string; role: string; company: string; period: string;
  location: string; status: string; color: string;
  summary: string; highlights: string[]; stack: string[];
}

interface ExperienceModalProps {
  experience: Experience | null;
  onClose: () => void;
  isDark: boolean;
}

export default function ExperienceModal({ experience, onClose, isDark }: ExperienceModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!experience) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [experience, onClose]);

  if (!experience) return null;

  const bg      = isDark ? "#141414" : "#ede8df";
  const border  = isDark ? "#2a2a2a" : "#d0c8bc";
  const textPri = isDark ? "#f5f0e8" : "#1a1008";
  const textSec = isDark ? "#b8b0a0" : "#5a4838";
  const textMut = isDark ? "#8a8070" : "#8a7868";
  const pillBg  = isDark ? "#1e1e1e" : "#e5ddd0";

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{ animation: "fadeIn 0.2s ease forwards" }}
    >
      <div className="absolute inset-0 backdrop-blur-sm" style={{ background: isDark ? "rgba(0,0,0,0.80)" : "rgba(200,180,160,0.60)" }} />

      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl shadow-2xl"
        style={{
          background: bg,
          border: `1px solid ${border}`,
          animation: "slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards",
          transition: "background 0.3s, border-color 0.3s",
        }}
      >
        <div className="h-1 w-full rounded-t-2xl"
          style={{ background: `linear-gradient(90deg, ${experience.color}, transparent)` }} />

        <button onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg transition-all duration-200"
          style={{ color: textMut, border: `1px solid ${border}`, background: "transparent" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = textPri; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = textMut; }}
        >
          <X size={18} />
        </button>

        <div className="p-6 pt-5">
          <div className="flex items-start gap-3 mb-1">
            {experience.status === "current" && (
              <span className="mt-1 flex items-center gap-1.5 text-xs font-mono text-[#c8602a] bg-[#c8602a]/10 border border-[#c8602a]/20 px-2 py-0.5 rounded-full shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8602a] animate-pulse" /> Now
              </span>
            )}
          </div>

          <h2 className="text-2xl font-display font-bold leading-tight" style={{ fontFamily: "var(--font-display)", color: textPri }}>
            {experience.role}
          </h2>
          <p className="text-[#c8602a] font-medium mt-1 text-sm">{experience.company}</p>

          <div className="flex flex-wrap gap-4 mt-3 text-xs font-mono" style={{ color: textMut }}>
            <span className="flex items-center gap-1.5"><Calendar size={12} />{experience.period}</span>
            <span className="flex items-center gap-1.5"><MapPin size={12} />{experience.location}</span>
          </div>

          <p className="mt-5 text-sm leading-relaxed border-l-2 pl-4" style={{ color: textSec, borderColor: experience.color }}>
            {experience.summary}
          </p>

          <div className="mt-6">
            <h3 className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: textMut }}>What I did</h3>
            <ul className="space-y-2.5">
              {experience.highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: isDark ? "#c8c0b0" : "#4a3828" }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: experience.color }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="text-xs font-mono uppercase tracking-widest mb-3 flex items-center gap-1.5" style={{ color: textMut }}>
              <Code2 size={11} /> Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {experience.stack.map((tech) => (
                <span key={tech} className="text-xs font-mono px-2.5 py-1 rounded-md"
                  style={{ border: `1px solid ${border}`, color: isDark ? "#b8b0a0" : "#5a4838", background: pillBg }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
