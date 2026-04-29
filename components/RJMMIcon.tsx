export default function RJMMIcon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="RJMM"
    >
      {/* Background square with rounded corners */}
      <rect width="40" height="40" rx="9" fill="#141414" />
      {/* Accent top-left corner bar */}
      <rect x="0" y="0" width="40" height="2" rx="1" fill="#c8602a" />
      {/* Border */}
      <rect
        x="0.75"
        y="0.75"
        width="38.5"
        height="38.5"
        rx="8.25"
        stroke="#2a2a2a"
        strokeWidth="1.5"
      />
      {/* Monogram text "RJ" top, "MM" bottom — compact 2x2 grid */}
      <text
        x="20"
        y="17"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="'Syne', sans-serif"
        fontWeight="800"
        fontSize="11"
        letterSpacing="1.5"
        fill="#f5f0e8"
      >
        RJ
      </text>
      <text
        x="20"
        y="29"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="'Syne', sans-serif"
        fontWeight="800"
        fontSize="11"
        letterSpacing="1.5"
        fill="#c8602a"
      >
        MM
      </text>
    </svg>
  );
}
