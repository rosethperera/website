import { aboutText, profile } from "../data/content";
import { useNavigate } from "../os/NavigationContext";

export default function AboutWindow() {
  const openWindow = useNavigate();

  return (
    <div>
      <h2>Hi, I'm {profile.name} 👋</h2>
      {aboutText.map((paragraph) => (
        <p key={paragraph.slice(0, 24)}>{paragraph}</p>
      ))}
      <div className="win-action-row">
        <button className="xp-btn" onClick={() => openWindow("mybuilds")}>
          📁 My Builds
        </button>
        <button className="xp-btn" onClick={() => openWindow("resume")}>
          📄 Resume
        </button>
        <button className="xp-btn" onClick={() => openWindow("contact")}>
          ✉️ Contact
        </button>
      </div>
      <p className="win-hint">Double-click an icon on the desktop to open it. Try "My Builds."</p>
    </div>
  );
}
