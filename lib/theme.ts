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
    bg:      isDark ? "#0c1018"  : "#f0f4f8",
    card:    isDark ? "#111827"  : "#e8eef4",
    cardHov: isDark ? "#17202e"  : "#dce5ed",
    border:  isDark ? "#1e2a3a"  : "#c4d2de",
    borHov:  isDark ? "#2a3f56"  : "#9ab8cc",
    textPri: isDark ? "#f0ece8"  : "#0e1e2a",
    textSec: isDark ? "#8aa8bc"  : "#2a4f66",
    textMut: isDark ? "#4a6a80"  : "#5a8aaa",
    textDim: isDark ? "#2a4a60"  : "#8ab0c8",
    pillBg:  isDark ? "#0e1e2c"  : "#dce8f0",
    langTxt: isDark ? "#c8dce8"  : "#0e1e2a",
    divider: isDark ? "#1e2a3a"  : "#c4d2de",
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
