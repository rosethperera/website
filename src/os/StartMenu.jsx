import { useNavigate } from "./NavigationContext";

const MAIN_ITEMS = [
  { id: "about", label: "About Me", icon: "🖥️" },
  { id: "mybuilds", label: "My Builds", icon: "📁" },
  { id: "experience", label: "Experience", icon: "📄" },
  { id: "skills", label: "Skills", icon: "⚙️" },
  { id: "awards", label: "Awards", icon: "🏆" },
  { id: "resume", label: "Resume", icon: "📄" },
  { id: "contact", label: "Contact Me", icon: "✉️" },
  { id: "mycomputer", label: "My Computer", icon: "🖥️" },
];

const GAME_ITEMS = [
  { id: "tetris", label: "Tetris.exe", icon: "🎮" },
  { id: "pacman", label: "Pac-Man.exe", icon: "🟡" },
];

export default function StartMenu({ onClose }) {
  const openWindow = useNavigate();

  const select = (id) => {
    openWindow(id);
    onClose();
  };

  return (
    <div className="start-menu">
      <div className="start-menu-banner">Roseth Perera</div>
      <div className="start-menu-items">
        {MAIN_ITEMS.map((item) => (
          <div key={item.id} className="start-menu-item" onClick={() => select(item.id)}>
            <span className="sm-icon">{item.icon}</span>
            {item.label}
          </div>
        ))}
        <div className="start-menu-sep" />
        {GAME_ITEMS.map((item) => (
          <div key={item.id} className="start-menu-item" onClick={() => select(item.id)}>
            <span className="sm-icon">{item.icon}</span>
            {item.label}
          </div>
        ))}
        <div className="start-menu-sep" />
        <div className="start-menu-item" onClick={() => select("recyclebin")}>
          <span className="sm-icon">🗑️</span>
          Recycle Bin
        </div>
      </div>
    </div>
  );
}
