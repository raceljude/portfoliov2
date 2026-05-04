export default function RJMMIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="RJ">
      <rect width="40" height="40" rx="10" fill="#111827"/>
      <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="9.25" stroke="#1e2a3a" strokeWidth="1.5"/>
      {/* Accent diagonal slash */}
      <line x1="27" y1="7" x2="13" y2="33" stroke="#ffbf6b" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      {/* R - white */}
      <text x="7" y="28" fontFamily="'Poppins', sans-serif" fontWeight="800" fontSize="19" fill="#f0ece8" letterSpacing="-1">R</text>
      {/* J - red */}
      <text x="21" y="28" fontFamily="'Poppins', sans-serif" fontWeight="800" fontSize="19" fill="#d1675a" letterSpacing="-1">J</text>
      {/* Bottom bar: deepRed to blue */}
      <rect x="8" y="33" width="24" height="1.5" rx="0.75" fill="url(#rjGrad)" opacity="0.6"/>
      <defs>
        <linearGradient id="rjGrad" x1="8" y1="0" x2="32" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#96312e"/>
          <stop offset="1" stopColor="#398eb2"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
