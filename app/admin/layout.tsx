"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { User, Briefcase, FolderOpen, Code2, LogOut, Home, Menu, X } from "lucide-react";
import RJMMIcon from "@/components/RJMMIcon";

// Admin uses the same dark-mode palette as the portfolio dark theme,
// with the same bg colour so it feels like one continuous product.
const A = {
  bg:          "#0c1018",   // identical to portfolio dark bg
  sidebar:     "#090d15",   // just a hair darker for the rail
  card:        "#111827",   // same card token
  border:      "#1e2a3a",   // same border token
  textPri:     "#f0ece8",
  textSec:     "#8aa8bc",
  textMut:     "#4a6a80",
  textDim:     "#2a4a60",
  accent:      "#d1675a",
  accentBlue:  "#398eb2",
  accentAmber: "#ffbf6b",
} as const;

const navItems = [
  { href: "/admin",             label: "Dashboard",  icon: Home       },
  { href: "/admin/profile",     label: "Profile",    icon: User       },
  { href: "/admin/experiences", label: "Experience", icon: Briefcase  },
  { href: "/admin/projects",    label: "Projects",   icon: FolderOpen },
  { href: "/admin/skills",      label: "Skills",     icon: Code2      },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") return <>{children}</>;

  const NavContent = () => (
    <>
      {/* Logo */}
      <div
        className="flex items-center gap-2.5 p-5 pb-4 shrink-0"
        style={{ borderBottom: "1px solid " + A.border }}
      >
        <RJMMIcon size={32} />
        <div>
          <p className="text-xs font-bold" style={{ color: A.textPri, fontFamily: "var(--font-display)" }}>
            Portfolio
          </p>
          <p className="text-[10px] font-mono" style={{ color: A.textDim }}>Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 p-3 flex-1 overflow-y-auto">
        {navItems.map(item => {
          const Icon   = item.icon;
          const active = pathname === item.href;
          return (
            <button
              key={item.href}
              onClick={() => { router.push(item.href); setMobileOpen(false); }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-mono text-left w-full focus:outline-none transition-all"
              style={{
                background: active ? A.card : "transparent",
                color:      active ? A.accent : A.textMut,
                borderLeft: active ? "2px solid " + A.accent : "2px solid transparent",
              }}
            >
              <Icon size={14} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 shrink-0" style={{ borderTop: "1px solid " + A.border }}>
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono w-full mb-1"
          style={{ color: A.textDim }}
        >
          <Home size={13} /> View site
        </a>
        <button
          onClick={logout}
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono w-full focus:outline-none transition-all"
          style={{ color: A.textMut }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = A.accent}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = A.textMut}
        >
          <LogOut size={13} /> Sign out
        </button>
      </div>
    </>
  );

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        // Same layered orb-glow treatment as the portfolio ScrollBackground —
        // deep navy top-left, deep red bottom-right, over the same base bg.
        background: `
          radial-gradient(ellipse 55% 45% at 5% 0%,   rgba(21,61,82,0.28)  0%, transparent 65%),
          radial-gradient(ellipse 45% 35% at 95% 100%, rgba(150,49,46,0.18) 0%, transparent 60%),
          ${A.bg}
        `,
        color: A.textPri,
      }}
    >
      {/* Subtle grid overlay — mirrors ScrollBackground gridlines */}
      <div
        aria-hidden="true"
        style={{
          position:   "fixed",
          inset:      0,
          pointerEvents: "none",
          zIndex:     0,
          backgroundImage: "linear-gradient(rgba(57,142,178,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(57,142,178,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 90% 90% at 50% 40%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 40%, black 20%, transparent 80%)",
        }}
      />

      {/* Mobile top bar */}
      <header
        className="flex sm:hidden items-center justify-between px-4 py-3 shrink-0 relative z-10"
        style={{
          background:   A.sidebar + "f0",
          borderBottom: "1px solid " + A.border,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <RJMMIcon size={28} />
          <div>
            <p className="text-xs font-bold leading-none" style={{ color: A.textPri, fontFamily: "var(--font-display)" }}>Portfolio</p>
            <p className="text-[10px] font-mono mt-0.5" style={{ color: A.textDim }}>Admin Panel</p>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(v => !v)}
          className="p-2 rounded-xl focus:outline-none"
          style={{ background: A.card, border: "1px solid " + A.border, color: A.textMut }}
        >
          {mobileOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </header>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 sm:hidden"
          style={{ background: "rgba(0,0,0,0.65)" }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      <aside
        className="fixed top-0 left-0 bottom-0 z-50 flex flex-col w-56 sm:hidden transition-transform duration-300"
        style={{
          background:  A.sidebar,
          borderRight: "1px solid " + A.border,
          transform:   mobileOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <NavContent />
      </aside>

      <div className="flex flex-1 overflow-hidden relative z-10">
        {/* Desktop sidebar */}
        <aside
          className="hidden sm:flex flex-col w-56 shrink-0"
          style={{
            background:   A.sidebar + "d8",
            borderRight:  "1px solid " + A.border,
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <NavContent />
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}