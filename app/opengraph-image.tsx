import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Racel Jude Marahay — Software Developer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0c1018",
          padding: "70px 90px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
          justifyContent: "space-between",
        }}
      >
        {/* Background orb — red/left */}
        <div style={{
          position: "absolute", width: 500, height: 500,
          left: -100, top: -100, borderRadius: "50%",
          background: "#d1675a", opacity: 0.15,
          filter: "blur(100px)",
        }} />
        {/* Background orb — blue/right */}
        <div style={{
          position: "absolute", width: 400, height: 400,
          right: -80, bottom: -80, borderRadius: "50%",
          background: "#398eb2", opacity: 0.12,
          filter: "blur(100px)",
        }} />

        {/* Available badge */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "rgba(255,191,107,0.12)",
          border: "1px solid rgba(255,191,107,0.3)",
          borderRadius: 999, padding: "6px 16px",
          fontSize: 13, color: "#ffbf6b",
          letterSpacing: 2,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ffbf6b" }} />
          OPEN TO OPPORTUNITIES
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", gap: 16 }}>
          <div style={{ fontSize: 72, fontWeight: 900, lineHeight: 1, color: "#f0ece8", letterSpacing: -2, display: "flex" }}>
            Racel Jude&nbsp;<span style={{ color: "#d1675a" }}>Marahay</span>
          </div>
          <div style={{ fontSize: 24, color: "#398eb2", letterSpacing: 3, display: "flex" }}>
            SOFTWARE DEVELOPER
          </div>
          <div style={{ fontSize: 18, color: "#8aa8bc", maxWidth: 680, lineHeight: 1.6, marginTop: 4, display: "flex" }}>
            Building full-stack apps & automated business systems. MERN/PERN · React · Node.js · Google Workspace · Metro Manila, PH
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: 24, borderTop: "1px solid rgba(30,42,58,0.8)",
        }}>
          <div style={{ display: "flex", gap: 10 }}>
            {["React", "TypeScript", "Node.js", "Google Workspace"].map((s) => (
              <div key={s} style={{
                background: "rgba(14,30,44,0.9)", border: "1px solid #1e2a3a",
                borderRadius: 8, padding: "6px 14px",
                fontSize: 13, color: "#4a6a80", display: "flex",
              }}>{s}</div>
            ))}
          </div>
          <div style={{ fontSize: 14, color: "#2a4a60", display: "flex" }}>
            raceljude@gmail.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}