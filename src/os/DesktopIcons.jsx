import { useState } from "react";
import { useNavigate } from "./NavigationContext";
import { TetrisGlyph, PacmanGlyph } from "./DesktopIconArt";

const ICONS = [
  { id: "mycomputer", label: "My Computer", cls: "mycomputer", glyph: "🖥️" },
  { id: "mybuilds", label: "My Builds", cls: "projects", glyph: "📁" },
  { id: "resume", label: "resume.pdf", cls: "resume", glyph: "📄" },
  { id: "contact", label: "Contact Me", cls: "contact", glyph: "✉️" },
  { id: "recyclebin", label: "Recycle Bin", cls: "recycle", glyph: "🗑️" },
  { id: "tetris", label: "Tetris", cls: "tetris", glyph: <TetrisGlyph /> },
  { id: "pacman", label: "Pac-Man", cls: "pacman", glyph: <PacmanGlyph /> },
];

export default function DesktopIcons() {
  const openWindow = useNavigate();
  const [selected, setSelected] = useState(null);

  return (
    <div className="icons">
      {ICONS.map((icon) => (
        <div
          key={icon.id}
          className={`dicon${selected === icon.id ? " selected" : ""}`}
          onClick={() => setSelected(icon.id)}
          onDoubleClick={() => openWindow(icon.id)}
          tabIndex={0}
          role="button"
          onKeyDown={(e) => (e.key === "Enter" ? openWindow(icon.id) : null)}
        >
          <div className={`ico ${icon.cls}`}>{icon.glyph}</div>
          <div className="lbl">{icon.label}</div>
        </div>
      ))}
    </div>
  );
}
