"use client";

import { ArrowUpRight, ExternalLink } from "lucide-react";

const tagColors: Record<string, string> = {
  Frontend: "#5a7a9a",
  Backend: "#7a9a5a",
  DevOps: "#9a7a5a",
  "Full Stack": "#c8602a",
};

interface Project {
  id: string; title: string; url: string; description: string;
  role: string; tags: string[]; color: string; featured: boolean;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  isDark: boolean;
}

export default function ProjectCard({ project, index, isDark }: ProjectCardProps) {
  const card    = isDark ? "#141414" : "#ede8df";
  const cardHov = isDark ? "#1a1a1a" : "#e5ddd0";
  const border  = isDark ? "#2a2a2a" : "#d0c8bc";
  const borHov  = isDark ? "#3a3a3a" : "#b8b0a4";
  const textPri = isDark ? "#f5f0e8" : "#1a1008";
  const textMut = isDark ? "#6a6058" : "#8a7868";
  const urlCol  = isDark ? "#4a4040" : "#a09080";

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col rounded-xl p-5 focus:outline-none focus:ring-2 focus:ring-[#c8602a]/40 overflow-hidden"
      style={{
        animation: `fadeUp 0.6s ease forwards`,
        animationDelay: `${150 + index * 80}ms`,
        opacity: 0,
        background: card,
        border: `1px solid ${border}`,
        transition: "background 0.3s, border-color 0.3s, transform 0.25s, box-shadow 0.25s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = cardHov;
        el.style.borderColor = borHov;
        el.style.transform = "translateY(-4px)";
        el.style.boxShadow = isDark ? "0 12px 40px rgba(0,0,0,0.3)" : "0 12px 40px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = card;
        el.style.borderColor = border;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Corner glow */}
      <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
        style={{ background: project.color }} />

      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full shrink-0" style={{ background: project.color }} />
          {project.featured && (
            <span className="text-[10px] font-mono text-[#c8602a] bg-[#c8602a]/10 border border-[#c8602a]/20 px-1.5 py-0.5 rounded-full">
              Featured
            </span>
          )}
        </div>
        <div className="p-1.5 rounded-lg transition-all duration-200"
          style={{ border: `1px solid ${border}`, color: urlCol }}>
          <ArrowUpRight size={13} />
        </div>
      </div>

      <h3 className="text-sm font-display font-semibold leading-snug mb-1.5" style={{ color: textPri }}>
        {project.title}
      </h3>

      <p className="text-xs leading-relaxed line-clamp-2 mb-3 flex-1" style={{ color: textMut }}>
        {project.description}
      </p>

      <div className="flex items-center gap-1.5 text-[10px] font-mono mb-3" style={{ color: urlCol }}>
        <ExternalLink size={9} />
        <span className="truncate">{project.url.replace(/^https?:\/\//, "")}</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded"
            style={{
              background: `${tagColors[tag] || "#8a8070"}15`,
              border: `1px solid ${tagColors[tag] || "#8a8070"}30`,
              color: tagColors[tag] || "#8a8070",
            }}>
            {tag}
          </span>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
        style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />
    </a>
  );
}
