"use client";
import { tagColors, tokens } from "@/lib/theme";

import { ArrowUpRight, ExternalLink } from "lucide-react";

interface Project { id: string; title: string; url: string; description: string; role: string; tags: string[]; color: string; featured: boolean; }
interface Props { project: Project; index: number; isDark: boolean; }

export default function ProjectCard({ project, index, isDark }: Props) {
  const t = tokens(isDark);

  return (
    <a href={project.url} target="_blank" rel="noopener noreferrer"
      className="group relative flex flex-col rounded-xl p-5 focus:outline-none overflow-hidden"
      style={{
        animation: `fadeUp 0.6s ease forwards`,
        animationDelay: `${150 + index * 80}ms`,
        opacity: 0,
        background: t.card,
        border: `1px solid ${t.border}`,
        transition: "background 0.25s, border-color 0.25s, transform 0.25s, box-shadow 0.25s",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = t.cardHov;
        el.style.borderColor = project.color;
        el.style.transform = "translateY(-4px)";
        el.style.boxShadow = `0 12px 36px ${project.color}28`;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = t.card;
        el.style.borderColor = t.border;
        el.style.transform = "none";
        el.style.boxShadow = "none";
      }}>
      <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
        style={{ background: project.color }}/>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full shrink-0" style={{ background: project.color }}/>
          {project.featured && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full"
              style={{ color: "#ffbf6b", background: "#ffbf6b18", border: "1px solid #ffbf6b35" }}>Featured</span>
          )}
        </div>
        <div className="p-1.5 rounded-lg" style={{ border: `1px solid ${t.border}`, color: t.textDim }}>
          <ArrowUpRight size={13}/>
        </div>
      </div>
      <h3 className="text-sm font-semibold leading-snug mb-1.5"
        style={{ fontFamily: "var(--font-display)", color: t.textPri }}>{project.title}</h3>
      <p className="text-xs leading-relaxed line-clamp-2 mb-3 flex-1"
        style={{ color: t.textMut }}>{project.description}</p>
      <div className="flex items-center gap-1.5 text-[10px] font-mono mb-3" style={{ color: t.textDim }}>
        <ExternalLink size={9}/><span className="truncate">{project.url.replace(/^https?:\/\//, "")}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map(tag => (
          <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded"
            style={{
              background: `${tagColors[tag] || "#398eb2"}18`,
              border: `1px solid ${tagColors[tag] || "#398eb2"}35`,
              color: tagColors[tag] || "#398eb2",
            }}>
            {tag}
          </span>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
        style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}/>
    </a>
  );
}