import { featuredProjects } from "../data/content";
import { useNavigate } from "../os/NavigationContext";
import { windowMeta } from "../os/windowMeta";

export default function MyBuildsWindow() {
  const openWindow = useNavigate();

  return (
    <div className="folder-grid">
      {featuredProjects.map((project) => {
        const id = `project-${project.slug}`;
        return (
          <div
            key={id}
            className="folder-item"
            onDoubleClick={() => openWindow(id)}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => (e.key === "Enter" ? openWindow(id) : null)}
          >
            <div className="fico">{windowMeta[id]?.icon || "📁"}</div>
            <div className="flbl">{project.title}</div>
          </div>
        );
      })}
    </div>
  );
}
