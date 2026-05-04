"use client";

import { ArrowUpRight, ExternalLink } from "lucide-react";

const P = { deepRed: "#96312e", midRed: "#d1675a", amber: "#ffbf6b", blue: "#398eb2", navy: "#153d52" };
const tagColors: Record<string, string> = {
  Frontend: P.blue, Backend: P.midRed, DevOps: P.amber, "Full Stack": P.deepRed,
};

interface Project { id: string; title: string; url: string; description: string; role: string; tags: string[]; color: string; featured: boolean; }
interface ProjectCardProps { project: Project; index: number; isDark: boolean; }

export default function ProjectCard({ project, index, isDark }: ProjectCardProps) {
  const card    = isDark ? "#111827" : "#e8eef4";
  const cardHov = isDark ? "#17202e" : "#dce5ed";
  const border  = isDark ? "#1e2a3a" : "#c4d2de";
  const borHov  = isDark ? "#2a3f56" : "#9ab8cc";
  const textPri = isDark ? "#f0ece8" : "#0e1e2a";
  const textMut = isDark ? "#4a6a80" : "#5a8aaa";
  const urlCol  = isDark ? "#2a4a60" : "#8ab0c8";

  return (
    <a href={project.url} target="_blank" rel="noopener noreferrer"
      className="group relative flex flex-col rounded-xl p-5 focus:outline-none overflow-hidden"
      style={{
        animation: `fadeUp 0.6s ease forwards`, animationDelay: `${150 + index * 80}ms`, opacity: 0,
        background: card, border: `1px solid ${border}`,
        transition: "background 0.25s, border-color 0.25s, transform 0.25s, box-shadow 0.25s",
      }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = cardHov; el.style.borderColor = project.color; el.style.transform = "translateY(-4px)"; el.style.boxShadow = `0 12px 36px ${project.color}28`; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = card; el.style.borderColor = border; el.style.transform = "none"; el.style.boxShadow = "none"; }}>
      <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" style={{ background: project.color }}/>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full shrink-0" style={{ background: project.color }}/>
          {project.featured && <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full" style={{ color: P.amber, background: `${P.amber}18`, border: `1px solid ${P.amber}35` }}>Featured</span>}
        </div>
        <div className="p-1.5 rounded-lg" style={{ border: `1px solid ${border}`, color: urlCol }}><ArrowUpRight size={13}/></div>
      </div>
      <h3 className="text-sm font-semibold leading-snug mb-1.5" style={{ fontFamily: "var(--font-display)", color: textPri }}>{project.title}</h3>
      <p className="text-xs leading-relaxed line-clamp-2 mb-3 flex-1" style={{ color: textMut }}>{project.description}</p>
      <div className="flex items-center gap-1.5 text-[10px] font-mono mb-3" style={{ color: urlCol }}>
        <ExternalLink size={9}/><span className="truncate">{project.url.replace(/^https?:\/\//, "")}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map(tag => (
          <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded"
            style={{ background: `${tagColors[tag] || P.blue}18`, border: `1px solid ${tagColors[tag] || P.blue}35`, color: tagColors[tag] || P.blue }}>
            {tag}
          </span>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}/>
    </a>
  );
}
