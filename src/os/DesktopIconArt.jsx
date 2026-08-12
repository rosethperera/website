// Small flat vector glyphs for the desktop icons that need to read as their
// subject (a tetromino stack, the Pac-Man character) rather than relying on
// an emoji that may not render consistently across platforms.

export function TetrisGlyph() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="2" width="9.5" height="9.5" rx="1.5" fill="#31C7EF" />
      <rect x="12.5" y="2" width="9.5" height="9.5" rx="1.5" fill="#F7D308" />
      <rect x="2" y="12.5" width="9.5" height="9.5" rx="1.5" fill="#EF7921" />
      <rect x="12.5" y="12.5" width="9.5" height="9.5" rx="1.5" fill="#42B642" />
    </svg>
  );
}

export function PacmanGlyph() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12,12 L20,7 A10,10 0 1 0 20,17 Z" fill="#FFFF00" />
      <circle cx="13" cy="6.2" r="1.2" fill="#3a2a00" />
    </svg>
  );
}

export function MineGlyph() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" aria-hidden="true">
      <g stroke="#111" strokeWidth="1.6" strokeLinecap="round">
        <line x1="12" y1="1.5" x2="12" y2="6" />
        <line x1="12" y1="18" x2="12" y2="22.5" />
        <line x1="1.5" y1="12" x2="6" y2="12" />
        <line x1="18" y1="12" x2="22.5" y2="12" />
        <line x1="4.6" y1="4.6" x2="7.8" y2="7.8" />
        <line x1="16.2" y1="16.2" x2="19.4" y2="19.4" />
        <line x1="19.4" y1="4.6" x2="16.2" y2="7.8" />
        <line x1="7.8" y1="16.2" x2="4.6" y2="19.4" />
      </g>
      <circle cx="12" cy="12" r="6.2" fill="#2b2b2b" />
      <circle cx="9.6" cy="9.6" r="1.4" fill="#ffffff" opacity="0.85" />
    </svg>
  );
}
