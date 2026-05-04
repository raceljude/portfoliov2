"use client";
import { P } from "@/lib/theme";
import { profile } from "@/config/personal";

import { useEffect, useRef, useState } from "react";
import { X, Mail, Phone, MapPin, Github, Linkedin, MessageCircle, Copy, Check } from "lucide-react";


const contacts = [
  { icon: Mail,     label: "Email",         value: profile.email,                                       href: `mailto:${profile.email}`,                                hint: "Best for project inquiries",         color: P.midRed,  copyable: true  },
  { icon: Phone,    label: "Phone / Viber",  value: profile.phoneDisplay,                                          href: `tel:${profile.phone}`,                                         hint: "Mon–Fri, 9AM–6PM PHT",               color: P.amber,   copyable: true  },
  { icon: Linkedin, label: "LinkedIn",       value: "racel-jude-marahay",                                        href: profile.linkedin,  hint: "Connect professionally",             color: P.blue,    copyable: false },
  { icon: Github,   label: "GitHub",         value: "github.com/raceljude",                                      href: profile.github,                               hint: "See my open source work",            color: P.navy,    copyable: false },
  { icon: MapPin,   label: "Location",       value: profile.location,                             href: null,                                                        hint: "Open to remote & on-site roles",     color: P.deepRed, copyable: false },
];

function CopyButton({ text, isDark }: { text: string; isDark: boolean }) {
  const [copied, setCopied] = useState(false);
  const handle = async () => { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const border = isDark ? "#1e2a3a" : "#c4d2de";
  const color  = isDark ? "#4a6a80" : "#5a8aaa";
  return (
    <button onClick={handle} className="p-1.5 rounded-md transition-all focus:outline-none shrink-0"
      style={{ color, border: `1px solid ${border}`, background: "transparent" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = P.blue; (e.currentTarget as HTMLElement).style.borderColor = P.blue; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = color; (e.currentTarget as HTMLElement).style.borderColor = border; }}>
      {copied ? <Check size={12}/> : <Copy size={12}/>}
    </button>
  );
}

interface Props { isOpen: boolean; onClose: () => void; isDark: boolean; }

export default function HireMeModal({ isOpen, onClose, isDark }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const bg      = isDark ? "#111827" : "#e8eef4";
  const border  = isDark ? "#1e2a3a" : "#c4d2de";
  const textPri = isDark ? "#f0ece8" : "#0e1e2a";
  const textSec = isDark ? "#8aa8bc" : "#2a4f66";
  const textMut = isDark ? "#4a6a80" : "#5a8aaa";
  const cardBg  = isDark ? "#0e1e2c" : "#dce8f0";
  const cardHov = isDark ? "#152535" : "#d0e0ec";

  return (
    <div ref={overlayRef} className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={e => { if (e.target === overlayRef.current) onClose(); }}
      style={{ animation: "fadeIn 0.2s ease forwards" }}>
      <div className="absolute inset-0 backdrop-blur-sm" style={{ background: isDark ? "rgba(0,0,0,0.85)" : "rgba(80,120,150,0.35)" }}/>

      <div className="relative w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
        style={{ background: bg, border: `1px solid ${border}`, animation: "slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards" }}>
        <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${P.deepRed}, ${P.midRed}, ${P.amber}, transparent)` }}/>

        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg transition-all focus:outline-none"
          style={{ color: textMut, border: `1px solid ${border}` }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = textPri; (e.currentTarget as HTMLElement).style.borderColor = P.midRed; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = textMut; (e.currentTarget as HTMLElement).style.borderColor = border; }}>
          <X size={16}/>
        </button>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: P.amber }}/>
              <span className="text-xs font-mono uppercase tracking-widest" style={{ color: P.amber }}>Available for hire</span>
            </div>
            <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)", color: textPri }}>Let&apos;s work together</h2>
            <p className="text-sm mt-1.5 leading-relaxed" style={{ color: textSec }}>
              I&apos;m open to full-time, freelance, and contract opportunities. Reach out through any of the channels below.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            {contacts.map(c => {
              const Icon = c.icon;
              const inner = (
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${c.color}18`, border: `1px solid ${c.color}35` }}>
                    <Icon size={15} style={{ color: c.color }}/>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono uppercase tracking-widest mb-0.5" style={{ color: textMut }}>{c.label}</p>
                    <p className="text-sm font-medium truncate" style={{ color: textPri }}>{c.value}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: textMut }}>{c.hint}</p>
                  </div>
                </div>
              );
              return (
                <div key={c.label} className="flex items-center gap-2 p-3 rounded-xl transition-all duration-200"
                  style={{ background: cardBg, border: `1px solid ${border}` }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = cardHov; (e.currentTarget as HTMLElement).style.borderColor = `${c.color}50`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = cardBg; (e.currentTarget as HTMLElement).style.borderColor = border; }}>
                  {c.href
                    ? <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="flex-1 min-w-0">{inner}</a>
                    : <div className="flex-1 min-w-0">{inner}</div>}
                  {c.copyable && <CopyButton text={c.value.replace(/\s/g, "")} isDark={isDark}/>}
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-4" style={{ borderTop: `1px solid ${border}` }}>
            <a href={`mailto:${profile.email}`}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: P.midRed, color: "#fff" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = P.deepRed}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = P.midRed}>
              <MessageCircle size={15}/> Send me an email
            </a>
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
