"use client";

import { ArrowUpRight, ExternalLink } from "lucide-react";

const tagColors: Record<string, string> = {
  Frontend: "#5a7a9a",
  Backend: "#7a9a5a",
  DevOps: "#9a7a5a",
  "Full Stack": "#c8602a",
};

interface Project {
  id: string;
  title: string;
  url: string;
  description: string;
  role: string;
  tags: string[];
  color: string;
  featured: boolean;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col rounded-xl border border-[#2a2a2a] bg-[#141414] p-5 transition-all duration-300 hover:border-[#3a3a3a] hover:bg-[#1a1a1a] hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#c8602a]/40 overflow-hidden"
      style={{
        animation: `fadeUp 0.6s ease forwards`,
        animationDelay: `${150 + index * 80}ms`,
        opacity: 0,
      }}
    >
      {/* Corner glow on hover */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
        style={{ background: project.color }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: project.color }}
          />
          {project.featured && (
            <span className="text-[10px] font-mono text-[#c8602a] bg-[#c8602a]/10 border border-[#c8602a]/20 px-1.5 py-0.5 rounded-full">
              Featured
            </span>
          )}
        </div>
        <div className="p-1.5 rounded-lg border border-[#2a2a2a] text-[#4a4040] group-hover:text-[#f5f0e8] group-hover:border-[#3a3a3a] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0">
          <ArrowUpRight size={13} />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-sm font-display font-semibold text-[#f5f0e8] leading-snug group-hover:text-white transition-colors mb-1.5">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-xs text-[#6a6058] leading-relaxed line-clamp-2 mb-3 flex-1">
        {project.description}
      </p>

      {/* URL */}
      <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#4a4040] group-hover:text-[#6a6058] transition-colors mb-3">
        <ExternalLink size={9} />
        <span className="truncate">{project.url.replace(/^https?:\/\//, "")}</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-mono px-2 py-0.5 rounded border text-[#b8b0a0]"
            style={{
              background: `${tagColors[tag] || "#8a8070"}15`,
              borderColor: `${tagColors[tag] || "#8a8070"}30`,
              color: tagColors[tag] || "#8a8070",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
        style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
      />
    </a>
  );
}
