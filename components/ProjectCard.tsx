"use client";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useState, useRef } from "react";
import { tagColors } from "@/lib/theme";

interface Project { id: string; title: string; url: string; description: string; role: string; tags: string[]; color: string; featured: boolean; }
interface Props { project: Project; index: number; isDark: boolean; }

export default function ProjectCard({ project, index, isDark }: Props) {
  const card    = isDark ? "#111827" : "#e8eef4";
  const cardHov = isDark ? "#17202e" : "#dce5ed";
  const border  = isDark ? "#1e2a3a" : "#c4d2de";
  const textPri = isDark ? "#f0ece8" : "#0e1e2a";
  const textMut = isDark ? "#4a6a80" : "#5a8aaa";
  const urlCol  = isDark ? "#2a4a60" : "#8ab0c8";
  const previewBg = isDark ? "#0c1018" : "#f0f4f8";
  const previewBorder = isDark ? "#1e2a3a" : "#c4d2de";

  const [hovered, setHovered] = useState(false);
  const [previewLoaded, setPreviewLoaded] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (el: HTMLElement) => {
    el.style.background = cardHov;
    el.style.borderColor = project.color;
    el.style.transform = "translateY(-4px)";
    el.style.boxShadow = `0 12px 36px ${project.color}28`;
    hoverTimerRef.current = setTimeout(() => setHovered(true), 300);
  };

  const handleMouseLeave = (el: HTMLElement) => {
    el.style.background = card;
    el.style.borderColor = border;
    el.style.transform = "none";
    el.style.boxShadow = "none";
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setHovered(false);
    setPreviewLoaded(false);
    setPreviewError(false);
  };

  return (
    <a href={project.url} target="_blank" rel="noopener noreferrer"
      className="group relative flex flex-col rounded-xl p-5 focus:outline-none overflow-visible"
      style={{ animation: `fadeUp 0.6s ease forwards`, animationDelay: `${150 + index * 80}ms`, opacity: 0, background: card, border: `1px solid ${border}`, transition: "background 0.25s, border-color 0.25s, transform 0.25s, box-shadow 0.25s" }}
      onMouseEnter={e => handleMouseEnter(e.currentTarget as HTMLElement)}
      onMouseLeave={e => handleMouseLeave(e.currentTarget as HTMLElement)}>

      {/* URL Preview Popup */}
      {hovered && (
        <div
          onClick={e => e.preventDefault()}
          style={{
            position: "absolute",
            bottom: "calc(100% + 10px)",
            left: "50%",
            transform: "translateX(-50%)",
            width: "280px",
            height: "175px",
            zIndex: 50,
            borderRadius: "10px",
            overflow: "hidden",
            border: `1px solid ${previewBorder}`,
            background: previewBg,
            boxShadow: isDark ? "0 16px 48px rgba(0,0,0,0.6)" : "0 16px 48px rgba(0,0,0,0.15)",
            animation: "previewFadeIn 0.2s ease forwards",
            pointerEvents: "none",
          }}>

          {/* Header bar */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 10px",
            borderBottom: `1px solid ${previewBorder}`,
            background: isDark ? "#111827" : "#e8eef4",
          }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#d1675a" }} />
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#ffbf6b" }} />
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#4a9a6a" }} />
            <span style={{
              flex: 1,
              fontSize: "9px",
              fontFamily: "var(--font-mono, monospace)",
              color: textMut,
              textAlign: "center",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              paddingLeft: "4px",
            }}>
              {project.url.replace(/^https?:\/\//, "")}
            </span>
          </div>

          {/* iFrame */}
          <div style={{ position: "relative", width: "100%", height: "calc(100% - 29px)" }}>
            {!previewLoaded && !previewError && (
              <div style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                background: previewBg,
              }}>
                <div style={{
                  width: "18px",
                  height: "18px",
                  border: `2px solid ${previewBorder}`,
                  borderTopColor: project.color,
                  borderRadius: "50%",
                  animation: "iframeSpin 0.8s linear infinite",
                }} />
                <span style={{ fontSize: "10px", fontFamily: "var(--font-mono, monospace)", color: textMut }}>
                  Loading preview…
                </span>
              </div>
            )}
            {previewError && (
              <div style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                background: previewBg,
              }}>
                <ExternalLink size={18} style={{ color: textMut }} />
                <span style={{ fontSize: "10px", fontFamily: "var(--font-mono, monospace)", color: textMut, textAlign: "center", padding: "0 16px" }}>
                  Preview unavailable
                </span>
              </div>
            )}
            <iframe
              src={project.url}
              title={`Preview of ${project.title}`}
              sandbox="allow-scripts allow-same-origin"
              style={{
                width: "200%",
                height: "200%",
                transform: "scale(0.5)",
                transformOrigin: "top left",
                border: "none",
                opacity: previewLoaded ? 1 : 0,
                transition: "opacity 0.3s ease",
                pointerEvents: "none",
              }}
              onLoad={() => setPreviewLoaded(true)}
              onError={() => setPreviewError(true)}
            />
          </div>

          {/* Arrow pointing down */}
          <div style={{
            position: "absolute",
            bottom: "-6px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "10px",
            height: "10px",
            background: isDark ? "#111827" : "#e8eef4",
            border: `1px solid ${previewBorder}`,
            borderTop: "none",
            borderLeft: "none",
            rotate: "45deg",
          }} />
        </div>
      )}

      <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" style={{ background: project.color }} />
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full shrink-0" style={{ background: project.color }} />
          {project.featured && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full" style={{ color: "#ffbf6b", background: "#ffbf6b18", border: "1px solid #ffbf6b35" }}>Featured</span>
          )}
        </div>
        <div className="p-1.5 rounded-lg" style={{ border: `1px solid ${border}`, color: urlCol }}><ArrowUpRight size={13} /></div>
      </div>
      <h3 className="text-sm font-semibold leading-snug mb-1.5" style={{ fontFamily: "var(--font-display)", color: textPri }}>{project.title}</h3>
      <p className="text-xs leading-relaxed line-clamp-2 mb-3 flex-1" style={{ color: textMut }}>{project.description}</p>
      <div className="flex items-center gap-1.5 text-[10px] font-mono mb-3" style={{ color: urlCol }}>
        <ExternalLink size={9} /><span className="truncate">{project.url.replace(/^https?:\/\//, "")}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map(tag => (
          <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded"
            style={{ background: `${tagColors[tag] || "#398eb2"}18`, border: `1px solid ${tagColors[tag] || "#398eb2"}35`, color: tagColors[tag] || "#398eb2" }}>
            {tag}
          </span>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

      <style jsx>{`
        @keyframes previewFadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(6px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes iframeSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </a>
  );
}