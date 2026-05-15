"use client";

import { useEffect, useRef, useState } from "react";
import { X, Mail, Phone, MapPin, Github, Linkedin, MessageCircle, Copy, Check } from "lucide-react";
import { P, tokens } from "@/lib/theme";

function CopyButton({ text, isDark }: { text: string; isDark: boolean }) {
  const [copied, setCopied] = useState(false);
  const t = tokens(isDark);
  const handle = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handle}
      className="p-1.5 rounded-md transition-all focus:outline-none shrink-0"
      style={{ color: t.textMut, border: "1px solid " + t.border, background: "transparent" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = P.blue; (e.currentTarget as HTMLElement).style.borderColor = P.blue; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = t.textMut; (e.currentTarget as HTMLElement).style.borderColor = t.border; }}
      title="Copy to clipboard">
      {copied ? <Check size={12} /> : <Copy size={12} />}
    </button>
  );
}

interface ProfileProp {
  email: string; phone: string; phoneDisplay: string; phoneHint: string;
  location: string; locationHint: string;
  github: string; githubDisplay: string;
  linkedin: string; linkedinDisplay: string;
  statusText: string; hireMeHeading: string; hireMeSubtext: string;
}
interface Props { isOpen: boolean; onClose: () => void; isDark: boolean; profile: ProfileProp; }

export default function HireMeModal({ isOpen, onClose, isDark, profile }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const t = tokens(isDark);

  const contacts = [
    { icon: Mail,      label: "Email",        value: profile.email,           href: "mailto:" + profile.email,  hint: "Best for project inquiries", color: P.midRed,  copyable: true  },
    { icon: Phone,     label: "Phone / Viber", value: profile.phoneDisplay,   href: "tel:" + profile.phone,     hint: profile.phoneHint,            color: P.amber,   copyable: true  },
    { icon: Linkedin,  label: "LinkedIn",      value: profile.linkedinDisplay, href: profile.linkedin,           hint: "Connect professionally",     color: P.blue,    copyable: false },
    { icon: Github,    label: "GitHub",        value: profile.githubDisplay,  href: profile.github,             hint: "See my open source work",    color: P.navy,    copyable: false },
    { icon: MapPin,    label: "Location",      value: profile.location,       href: null,                       hint: profile.locationHint,         color: P.deepRed, copyable: false },
  ];

  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={overlayRef} className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={e => { if (e.target === overlayRef.current) onClose(); }}
      style={{ animation: "fadeIn 0.2s ease forwards" }}>
      <div className="absolute inset-0 backdrop-blur-sm"
        style={{ background: isDark ? "rgba(0,0,0,0.85)" : "rgba(100,70,60,0.25)" }}/>

      <div className="relative w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
        style={{ background: t.card, border: "1px solid " + t.border, animation: "slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards" }}>
        <div className="h-[3px] w-full"
          style={{ background: "linear-gradient(90deg, " + P.deepRed + ", " + P.midRed + ", " + P.amber + ", transparent)" }}/>

        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg transition-all focus:outline-none"
          style={{ color: t.textMut, border: "1px solid " + t.border }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = t.textPri; (e.currentTarget as HTMLElement).style.borderColor = P.midRed; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = t.textMut; (e.currentTarget as HTMLElement).style.borderColor = t.border; }}>
          <X size={16} />
        </button>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: P.amber }} />
              <span className="text-xs font-mono uppercase tracking-widest" style={{ color: P.amber }}>
                {profile.statusText}
              </span>
            </div>
            <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)", color: t.textPri }}>
              {profile.hireMeHeading}
            </h2>
            <p className="text-sm mt-1.5 leading-relaxed" style={{ color: t.textSec }}>
              {profile.hireMeSubtext}
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            {contacts.map(c => {
              const Icon = c.icon;
              const inner = (
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: c.color + "18", border: "1px solid " + c.color + "35" }}>
                    <Icon size={15} style={{ color: c.color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono uppercase tracking-widest mb-0.5" style={{ color: t.textMut }}>
                      {c.label}
                    </p>
                    <p className="text-sm font-medium truncate" style={{ color: t.textPri }}>{c.value}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: t.textMut }}>{c.hint}</p>
                  </div>
                </div>
              );
              return (
                <div key={c.label}
                  className="flex items-center gap-2 p-3 rounded-xl transition-all duration-200"
                  style={{ background: t.pillBg, border: "1px solid " + t.border }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = t.cardHov; (e.currentTarget as HTMLElement).style.borderColor = c.color + "50"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = t.pillBg; (e.currentTarget as HTMLElement).style.borderColor = t.border; }}>
                  {c.href
                    ? <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="flex-1 min-w-0">{inner}</a>
                    : <div className="flex-1 min-w-0">{inner}</div>
                  }
                  {c.copyable && <CopyButton text={c.value.replace(/\s/g, "")} isDark={isDark} />}
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-4" style={{ borderTop: "1px solid " + t.divider }}>
            <a href={"mailto:" + profile.email}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: P.midRed, color: "#fff" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = P.deepRed; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = P.midRed; }}>
              <MessageCircle size={15} /> Send me an email
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