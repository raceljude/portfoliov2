"use client";

import { useEffect, useRef } from "react";
import { X, MapPin, Calendar, Code2 } from "lucide-react";

interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  status: string;
  color: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

interface ExperienceModalProps {
  experience: Experience | null;
  onClose: () => void;
}

export default function ExperienceModal({ experience, onClose }: ExperienceModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!experience) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [experience, onClose]);

  if (!experience) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      style={{ animation: "fadeIn 0.2s ease forwards" }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-[#2a2a2a] bg-[#141414] shadow-2xl"
        style={{ animation: "slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" }}
      >
        {/* Header accent bar */}
        <div
          className="h-1 w-full rounded-t-2xl"
          style={{ background: `linear-gradient(90deg, ${experience.color}, transparent)` }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-[#8a8070] hover:text-[#f5f0e8] hover:bg-[#2a2a2a] transition-all duration-200"
        >
          <X size={18} />
        </button>

        <div className="p-6 pt-5">
          {/* Role & Status */}
          <div className="flex items-start gap-3 mb-1">
            {experience.status === "current" && (
              <span className="mt-1 flex items-center gap-1.5 text-xs font-mono text-[#c8602a] bg-[#c8602a]/10 border border-[#c8602a]/20 px-2 py-0.5 rounded-full shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8602a] animate-pulse" />
                Now
              </span>
            )}
          </div>

          <h2
            className="text-2xl font-display font-700 text-[#f5f0e8] leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {experience.role}
          </h2>
          <p className="text-[#c8602a] font-medium mt-1 text-sm">{experience.company}</p>

          {/* Meta */}
          <div className="flex flex-wrap gap-4 mt-3 text-[#8a8070] text-xs font-mono">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {experience.period}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={12} />
              {experience.location}
            </span>
          </div>

          {/* Summary */}
          <p className="mt-5 text-[#b8b0a0] text-sm leading-relaxed border-l-2 pl-4" style={{ borderColor: experience.color }}>
            {experience.summary}
          </p>

          {/* Highlights */}
          <div className="mt-6">
            <h3 className="text-xs font-mono text-[#8a8070] uppercase tracking-widest mb-3">What I did</h3>
            <ul className="space-y-2.5">
              {experience.highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#c8c0b0]">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: experience.color }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Stack */}
          <div className="mt-6">
            <h3 className="text-xs font-mono text-[#8a8070] uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <Code2 size={11} /> Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {experience.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-2.5 py-1 rounded-md border border-[#2a2a2a] text-[#b8b0a0] bg-[#1e1e1e]"
                >
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
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
