import { useEffect, useState } from "react";
import { useWindowManager } from "./WindowManagerContext";
import { windowMeta } from "./windowMeta";
import StartMenu from "./StartMenu";

function formatClock(date) {
  let h = date.getHours();
  const m = date.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${String(m).padStart(2, "0")} ${ampm}`;
}

export default function Taskbar() {
  const { windows, toggleMinimize, focusWindow } = useWindowManager();
  const [clock, setClock] = useState(() => formatClock(new Date()));
  const [startOpen, setStartOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setClock(formatClock(new Date())), 15000);
    return () => clearInterval(id);
  }, []);

  const openIds = Object.keys(windows);

  return (
    <div className="taskbar">
      <div className="start-btn" onClick={() => setStartOpen((v) => !v)}>
        <span className="start-flag">⊞</span> start
      </div>
      {startOpen && (
        <>
          <div className="start-menu-scrim" onClick={() => setStartOpen(false)} />
          <StartMenu onClose={() => setStartOpen(false)} />
        </>
      )}
      <div className="taskbar-sep" />
      <div className="task-items">
        {openIds.map((id) => {
          const meta = windowMeta[id] || {};
          const win = windows[id];
          const label = meta.title || id;
          return (
            <div
              key={id}
              className={`task-item${!win.minimized ? " active" : ""}`}
              onClick={() => (win.minimized ? focusWindow(id) : toggleMinimize(id))}
            >
              <span className="task-item-icon">{meta.icon}</span>
              {label.length > 22 ? `${label.slice(0, 22)}…` : label}
            </div>
          );
        })}
      </div>
      <div className="systray">
        🔊 <span>{clock}</span>
      </div>
    </div>
  );
}
