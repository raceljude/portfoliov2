// ─────────────────────────────────────────────────────────────
//  THEME CONFIG — edit colors here to restyle the whole app
// ─────────────────────────────────────────────────────────────

export const P = {
  deepRed: "#96312e",
  midRed:  "#d1675a",
  amber:   "#ffbf6b",
  blue:    "#398eb2",
  navy:    "#153d52",
} as const;

export function tokens(isDark: boolean) {
  return {
    bg:      isDark ? "#0c1018"  : "#e8f4fb",
    card:    isDark ? "#111827"  : "#d6ecf7",
    cardHov: isDark ? "#17202e"  : "#c8e4f2",
    border:  isDark ? "#1e2a3a"  : "#a8cfe0",
    borHov:  isDark ? "#2a3f56"  : "#7ab8d4",
    textPri: isDark ? "#f0ece8"  : "#0d2233",
    textSec: isDark ? "#8aa8bc"  : "#1e4d6b",
    textMut: isDark ? "#4a6a80"  : "#3a7a9c",
    textDim: isDark ? "#2a4a60"  : "#6aaac8",
    pillBg:  isDark ? "#0e1e2c"  : "#c8e4f2",
    langTxt: isDark ? "#c8dce8"  : "#0d2233",
    divider: isDark ? "#1e2a3a"  : "#a8cfe0",
  };
}

// Skill category → color mapping
export const skillColors: Record<string, string> = {
  fullstack: P.midRed,
  frontend:  P.blue,
  backend:   P.deepRed,
  devops:    P.amber,
  language:  P.navy,
  cloud:     P.blue,
};

// Project tag → color mapping
export const tagColors: Record<string, string> = {
  Frontend:     P.blue,
  Backend:      P.midRed,
  DevOps:       P.amber,
  "Full Stack":  P.deepRed,
};