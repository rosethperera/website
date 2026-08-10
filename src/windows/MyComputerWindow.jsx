import { featuredProjects } from "../data/content";
import { useNavigate } from "../os/NavigationContext";
import { windowMeta } from "../os/windowMeta";

const extraDrives = [
  { drive: "H:", label: "Skills", id: "skills", icon: "⚙️" },
  { drive: "I:", label: "Awards", id: "awards", icon: "🏆" },
  { drive: "J:", label: "Resume", id: "resume", icon: "📄" },
];

export default function MyComputerWindow() {
  const openWindow = useNavigate();

  const projectDrives = featuredProjects.map((project) => ({
    drive: project.drive,
    label: project.title,
    id: `project-${project.slug}`,
    icon: windowMeta[`project-${project.slug}`]?.icon || "📁",
  }));

  const drives = [...projectDrives, ...extraDrives];

  return (
    <div>
      <p className="win-hint">Double-click a drive to browse it.</p>
      <div className="folder-grid">
        {drives.map((d) => (
          <div
            key={d.drive}
            className="folder-item"
            onDoubleClick={() => openWindow(d.id)}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => (e.key === "Enter" ? openWindow(d.id) : null)}
          >
            <div className="fico">{d.icon}</div>
            <div className="flbl">
              {d.drive} {d.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
