import { useCallback, useRef } from "react";
import { useWindowManager } from "./WindowManagerContext";

const TASKBAR_HEIGHT = 34;
// Leaves room so a maximized window's own titlebar buttons never sit under
// the always-on-top game-layer toggle in the top-right corner.
const MAXIMIZED_TOP_INSET = 46;

export default function Window({
  id,
  title,
  icon,
  width,
  statusText,
  menuItems = ["File", "Edit", "View", "Help"],
  children,
}) {
  const { windows, closeWindow, focusWindow, toggleMinimize, toggleMaximize, commitPosition } =
    useWindowManager();
  const win = windows[id];
  const nodeRef = useRef(null);
  const dragState = useRef(null);

  const onTitlePointerDown = useCallback(
    (e) => {
      if (e.button !== 0 || win?.maximized) return;
      if (e.target.closest(".tb-btn")) return;
      focusWindow(id);
      const node = nodeRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const parentRect = node.offsetParent.getBoundingClientRect();
      dragState.current = {
        startX: e.clientX,
        startY: e.clientY,
        origLeft: rect.left - parentRect.left,
        origTop: rect.top - parentRect.top,
      };
      e.currentTarget.setPointerCapture?.(e.pointerId);
    },
    [focusWindow, id, win?.maximized]
  );

  const onTitlePointerMove = useCallback((e) => {
    const drag = dragState.current;
    const node = nodeRef.current;
    if (!drag || !node) return;
    const nx = drag.origLeft + (e.clientX - drag.startX);
    const ny = Math.max(0, drag.origTop + (e.clientY - drag.startY));
    node.style.left = nx + "px";
    node.style.top = ny + "px";
  }, []);

  const endDrag = useCallback(
    (e) => {
      const drag = dragState.current;
      const node = nodeRef.current;
      if (!drag) return;
      dragState.current = null;
      e.currentTarget.releasePointerCapture?.(e.pointerId);
      if (node) commitPosition(id, parseFloat(node.style.left) || 0, parseFloat(node.style.top) || 0);
    },
    [commitPosition, id]
  );

  if (!win) return null;

  const style = win.maximized
    ? { left: 0, top: MAXIMIZED_TOP_INSET, right: 0, bottom: TASKBAR_HEIGHT, width: "auto", zIndex: win.zIndex }
    : { left: win.x, top: win.y, width: width ?? win.width, zIndex: win.zIndex };

  return (
    <div
      ref={nodeRef}
      className={`win${win.maximized ? " win-maximized" : ""}`}
      style={{ ...style, display: win.minimized ? "none" : "flex" }}
      onPointerDownCapture={() => focusWindow(id)}
    >
      <div
        className="titlebar"
        onPointerDown={onTitlePointerDown}
        onPointerMove={onTitlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={() => toggleMaximize(id)}
      >
        <div className="tb-left">
          <span className="tb-icon">{icon}</span>
          <span className="tb-title">{title}</span>
        </div>
        <div className="tb-btns">
          <div className="tb-btn" onClick={() => toggleMinimize(id)} title="Minimize">
            _
          </div>
          <div className="tb-btn" onClick={() => toggleMaximize(id)} title="Maximize">
            &#9633;
          </div>
          <div className="tb-btn close" onClick={() => closeWindow(id)} title="Close">
            &times;
          </div>
        </div>
      </div>
      {menuItems && (
        <div className="menubar">
          {menuItems.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      )}
      <div className="winbody">{children}</div>
      {statusText && <div className="statusbar">{statusText}</div>}
    </div>
  );
}
