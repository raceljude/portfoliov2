"use client";

import { ArrowUpRight } from "lucide-react";

interface Experience {
  id: string; role: string; company: string; period: string;
  location: string; status: string; color: string;
  summary: string; highlights: string[]; stack: string[];
}

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  onClick: (exp: Experience) => void;
  isDark: boolean;
}

export default function ExperienceCard({ experience, index, onClick, isDark }: ExperienceCardProps) {
  const card    = isDark ? "#141414" : "#ede8df";
  const cardHov = isDark ? "#1a1a1a" : "#e5ddd0";
  const border  = isDark ? "#2a2a2a" : "#d0c8bc";
  const borHov  = isDark ? "#3a3a3a" : "#b8b0a4";
  const textPri = isDark ? "#f5f0e8" : "#1a1008";
  const textSec = isDark ? "#8a8070" : "#7a6858";
  const textMut = isDark ? "#6a6058" : "#9a8878";
  const pillBg  = isDark ? "#1a1a1a" : "#e0d8ce";

  return (
    <button
      onClick={() => onClick(experience)}
      className="group w-full text-left rounded-xl p-5 focus:outline-none focus:ring-2 focus:ring-[#c8602a]/40"
      style={{
        animation: `fadeUp 0.6s ease forwards`,
        animationDelay: `${100 + index * 100}ms`,
        opacity: 0,
        background: card,
        border: `1px solid ${border}`,
        transition: "background 0.3s, border-color 0.3s, transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = cardHov;
        el.style.borderColor = borHov;
        el.style.transform = "translateY(-2px)";
        el.style.boxShadow = "0 8px 30px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = card;
        el.style.borderColor = border;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full shrink-0" style={{
              background: experience.color,
              boxShadow: experience.status === "current" ? `0 0 8px ${experience.color}` : "none",
            }} />
            {experience.status === "current" && (
              <span className="text-xs font-mono text-[#c8602a]">Current</span>
            )}
            <span className="text-xs font-mono truncate" style={{ color: textSec }}>{experience.period}</span>
          </div>

          <h3 className="text-base font-display font-semibold leading-snug" style={{ color: textPri }}>
            {experience.role}
          </h3>
          <p className="text-sm mt-0.5 truncate" style={{ color: textSec }}>{experience.company}</p>
          <p className="text-xs mt-2 line-clamp-2 leading-relaxed" style={{ color: textMut }}>
            {experience.summary}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {experience.stack.slice(0, 3).map((tech) => (
              <span key={tech} className="text-xs font-mono px-2 py-0.5 rounded"
                style={{ border: `1px solid ${border}`, color: textMut, background: pillBg }}>
                {tech}
              </span>
            ))}
            {experience.stack.length > 3 && (
              <span className="text-xs font-mono px-2 py-0.5 rounded"
                style={{ border: `1px solid ${border}`, color: textMut, background: pillBg }}>
                +{experience.stack.length - 3}
              </span>
            )}
          </div>
        </div>

        <div className="shrink-0 mt-1 p-1.5 rounded-lg transition-all duration-200"
          style={{ border: `1px solid ${border}`, color: textMut }}>
          <ArrowUpRight size={14} />
        </div>
      </div>

      <div className="mt-4 h-px w-0 group-hover:w-full transition-all duration-500 rounded"
        style={{ background: `linear-gradient(90deg, ${experience.color}, transparent)` }} />
    </button>
  );
}
