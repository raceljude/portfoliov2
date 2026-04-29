"use client";

import { ArrowUpRight } from "lucide-react";

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

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  onClick: (exp: Experience) => void;
}

export default function ExperienceCard({ experience, index, onClick }: ExperienceCardProps) {
  return (
    <button
      onClick={() => onClick(experience)}
      className="group w-full text-left rounded-xl border border-[#2a2a2a] bg-[#141414] p-5 transition-all duration-300 hover:border-[#3a3a3a] hover:bg-[#1a1a1a] hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#c8602a]/40"
      style={{
        animation: `fadeUp 0.6s ease forwards`,
        animationDelay: `${100 + index * 100}ms`,
        opacity: 0,
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Status dot + company */}
          <div className="flex items-center gap-2 mb-2">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{
                background: experience.color,
                boxShadow: experience.status === "current" ? `0 0 8px ${experience.color}` : "none",
              }}
            />
            {experience.status === "current" && (
              <span className="text-xs font-mono text-[#c8602a]">Current</span>
            )}
            <span className="text-xs font-mono text-[#8a8070] truncate">{experience.period}</span>
          </div>

          {/* Role */}
          <h3 className="text-base font-display font-semibold text-[#f5f0e8] leading-snug group-hover:text-white transition-colors">
            {experience.role}
          </h3>
          <p className="text-sm text-[#8a8070] mt-0.5 truncate">{experience.company}</p>

          {/* Summary preview */}
          <p className="text-xs text-[#6a6058] mt-2 line-clamp-2 leading-relaxed">
            {experience.summary}
          </p>

          {/* Stack pills - show first 3 */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {experience.stack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono px-2 py-0.5 rounded border border-[#2a2a2a] text-[#6a6058] bg-[#1a1a1a]"
              >
                {tech}
              </span>
            ))}
            {experience.stack.length > 3 && (
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-[#2a2a2a] text-[#6a6058] bg-[#1a1a1a]">
                +{experience.stack.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Arrow */}
        <div className="shrink-0 mt-1">
          <div
            className="p-1.5 rounded-lg border border-[#2a2a2a] text-[#4a4040] group-hover:text-[#f5f0e8] group-hover:border-[#3a3a3a] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            <ArrowUpRight size={14} />
          </div>
        </div>
      </div>

      {/* Bottom accent on hover */}
      <div
        className="mt-4 h-px w-0 group-hover:w-full transition-all duration-500 rounded"
        style={{ background: `linear-gradient(90deg, ${experience.color}, transparent)` }}
      />
    </button>
  );
}
