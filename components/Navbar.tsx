"use client";

import { useEffect, useState } from "react";
import RJMMIcon from "./RJMMIcon";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll("section[id], header[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(15, 15, 15, 0.92)"
            : "rgba(15, 15, 15, 0)",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid #1e1e1e" : "1px solid transparent",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2.5 group focus:outline-none"
              aria-label="Back to top"
            >
              <div className="transition-transform duration-200 group-hover:scale-105">
                <RJMMIcon size={34} />
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span
                  className="text-[11px] font-extrabold text-[#f5f0e8] tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Racel Jude
                </span>
                <span className="text-[9px] font-mono text-[#8a8070] tracking-widest uppercase mt-0.5">
                  Marahay
                </span>
              </div>
            </button>

            {/* Desktop links */}
            <div className="hidden sm:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-colors duration-200 rounded-md focus:outline-none ${
                    activeSection === link.href
                      ? "text-[#c8602a]"
                      : "text-[#6a6058] hover:text-[#f5f0e8]"
                  }`}
                >
                  {link.label}
                  {activeSection === link.href && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#c8602a]" />
                  )}
                </button>
              ))}

              {/* CTA */}
              <a
                href="mailto:raceljude@gmail.com"
                className="ml-2 px-3 py-1.5 text-xs font-mono tracking-wider uppercase rounded-lg border border-[#c8602a]/40 text-[#c8602a] hover:bg-[#c8602a]/10 transition-all duration-200 focus:outline-none"
              >
                Hire me
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="sm:hidden p-2 rounded-lg border border-[#2a2a2a] text-[#8a8070] hover:text-[#f5f0e8] hover:border-[#3a3a3a] transition-all focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1 w-4">
                <span
                  className="h-px bg-current transition-all duration-300 origin-center"
                  style={{
                    transform: menuOpen ? "translateY(4px) rotate(45deg)" : "",
                  }}
                />
                <span
                  className="h-px bg-current transition-all duration-300"
                  style={{ opacity: menuOpen ? 0 : 1 }}
                />
                <span
                  className="h-px bg-current transition-all duration-300 origin-center"
                  style={{
                    transform: menuOpen ? "translateY(-4px) rotate(-45deg)" : "",
                  }}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className="sm:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: menuOpen ? "300px" : "0",
            opacity: menuOpen ? 1 : 0,
          }}
        >
          <div className="border-t border-[#1e1e1e] bg-[#0f0f0f]/95 backdrop-blur-xl px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`w-full text-left px-3 py-2.5 text-xs font-mono tracking-wider uppercase rounded-lg transition-colors duration-200 focus:outline-none ${
                  activeSection === link.href
                    ? "text-[#c8602a] bg-[#c8602a]/10"
                    : "text-[#6a6058] hover:text-[#f5f0e8] hover:bg-[#1a1a1a]"
                }`}
              >
                {link.label}
              </button>
            ))}
            <a
              href="mailto:raceljude@gmail.com"
              className="mt-1 px-3 py-2.5 text-xs font-mono tracking-wider uppercase rounded-lg border border-[#c8602a]/40 text-[#c8602a] hover:bg-[#c8602a]/10 transition-all duration-200 text-center"
            >
              Hire me
            </a>
          </div>
        </div>
      </nav>

      {/* Spacer so content doesn't hide behind navbar */}
      <div className="h-14" />
    </>
  );
}
