// Small flat vector glyphs for the desktop icons that need to read as their
// subject (a tetromino stack, the Pac-Man character) rather than relying on
// an emoji that may not render consistently across platforms.

export function TetrisGlyph() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="2" width="9.5" height="9.5" rx="1.5" fill="#31C7EF" />
      <rect x="12.5" y="2" width="9.5" height="9.5" rx="1.5" fill="#F7D308" />
      <rect x="2" y="12.5" width="9.5" height="9.5" rx="1.5" fill="#EF7921" />
      <rect x="12.5" y="12.5" width="9.5" height="9.5" rx="1.5" fill="#42B642" />
    </svg>
  );
}

export function PacmanGlyph() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12,12 L20,7 A10,10 0 1 0 20,17 Z" fill="#FFFF00" />
      <circle cx="13" cy="6.2" r="1.2" fill="#3a2a00" />
    </svg>
  );
}
