export function Logo() {
  return (
    <svg viewBox="0 0 288 288" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Stylized "R4U" wordmark on a rounded utility plate */}
      <rect x="16" y="16" width="256" height="256" rx="40" fill="#442e25" />
      <rect x="16" y="16" width="256" height="256" rx="40" fill="none" stroke="#a27233" strokeWidth="8" />
      <text
        x="144"
        y="168"
        textAnchor="middle"
        fontFamily="'Big Shoulders Display', sans-serif"
        fontWeight="900"
        fontSize="104"
        letterSpacing="2"
        fill="#faf5ea"
      >
        R4
        <tspan fill="#c99a5b">U</tspan>
      </text>
      <text
        x="144"
        y="216"
        textAnchor="middle"
        fontFamily="'IBM Plex Mono', monospace"
        fontWeight="600"
        fontSize="30"
        letterSpacing="6"
        fill="#8fa8ae"
      >
        RENT
      </text>
    </svg>
  );
}
