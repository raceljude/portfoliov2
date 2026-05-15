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
  if (isDark) {
    return {
      bg:      "#0c1018",
      card:    "#111827",
      cardHov: "#17202e",
      border:  "#1e2a3a",
      borHov:  "#2a3f56",
      textPri: "#f0ece8",
      textSec: "#8aa8bc",
      textMut: "#4a6a80",
      textDim: "#2a4a60",
      pillBg:  "#0e1e2c",
      langTxt: "#c8dce8",
      divider: "#1e2a3a",
    };
  }

  // ── Light mode — warm parchment palette ──────────────────────
  // #f7ebe5  warm parchment bg
  // #d3e0c9  sage green — hover/active accents only, never fills
  // #ffb74d  amber (used in amber P slots)
  // #333333  primary text
  // #aaaaaa  dim text
  //
  // Cards are the same warm family as bg — subtle depth with shadows,
  // not contrasting fills. Borders are barely-there warm taupe.
  return {
    bg:      "#f7ebe5",
    card:    "#f2e2d8",           // 1 step warmer/darker than bg
    cardHov: "#ead9ce",           // hover: another step deeper
    border:  "#ddd0c8",           // soft warm taupe — quiet, not distracting
    borHov:  "#b8c9b0",           // sage-green border hint on hover
    textPri: "#333333",
    textSec: "#5c4a3e",           // warm dark brown
    textMut: "#8a7068",           // medium warm brown
    textDim: "#aaaaaa",
    pillBg:  "#ece0d8",           // badges: parchment tint, same family
    langTxt: "#333333",
    divider: "#ddd0c8",
  };
}

// Skill category → color mapping
export const skillColors: Record<string, string> = {
  fullstack: P.midRed,
  frontend:  P.blue,
  backend:   P.deepRed,
  devops:    "#c47f00",           // richer gold — punchy on warm bg
  language:  P.navy,
  cloud:     P.blue,
};

// Project tag → color mapping
export const tagColors: Record<string, string> = {
  Frontend:     P.blue,
  Backend:      P.midRed,
  DevOps:       "#c47f00",
  "Full Stack":  P.deepRed,
};