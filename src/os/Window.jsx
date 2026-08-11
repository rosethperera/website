import { useCallback, useRef } from "react";
import { useWindowManager } from "./WindowManagerContext";
import { useNavigate } from "./NavigationContext";

const TASKBAR_HEIGHT = 34;
// Leaves room so a maximized window's own titlebar buttons never sit under
// the always-on-top game-layer toggle in the top-right corner.
const MAXIMIZED_TOP_INSET = 46;

const DEFAULT_MIN_WIDTH = 340;
const DEFAULT_MIN_HEIGHT = 260;

const RESIZE_EDGES = [
  { edge: "n", cls: "rh-n" },
  { edge: "s", cls: "rh-s" },
  { edge: "e", cls: "rh-e" },
  { edge: "w", cls: "rh-w" },
  { edge: "ne", cls: "rh-ne" },
  { edge: "nw", cls: "rh-nw" },
  { edge: "se", cls: "rh-se" },
  { edge: "sw", cls: "rh-sw" },
];

export default function Window({
  id,
  title,
  icon,
  width,
  height,
  minWidth = DEFAULT_MIN_WIDTH,
  minHeight = DEFAULT_MIN_HEIGHT,
  statusText,
  menuItems = ["File", "Edit", "View", "Help"],
  children,
}) {
  const { windows, closeWindow, focusWindow, toggleMinimize, toggleMaximize, commitPosition, commitGeometry } =
    useWindowManager();
  const navigate = useNavigate();
  const win = windows[id];
  const nodeRef = useRef(null);
  const dragState = useRef(null);
  const resizeState = useRef(null);

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

  const onResizePointerDown = useCallback(
    (edge) => (e) => {
      if (e.button !== 0 || win?.maximized) return;
      e.stopPropagation();
      focusWindow(id);
      const node = nodeRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const parentRect = node.offsetParent.getBoundingClientRect();
      resizeState.current = {
        edge,
        startX: e.clientX,
        startY: e.clientY,
        origLeft: rect.left - parentRect.left,
        origTop: rect.top - parentRect.top,
        origWidth: rect.width,
        origHeight: rect.height,
      };
      e.currentTarget.setPointerCapture?.(e.pointerId);
    },
    [focusWindow, id, win?.maximized]
  );

  const onResizePointerMove = useCallback(
    (e) => {
      const rs = resizeState.current;
      const node = nodeRef.current;
      if (!rs || !node) return;
      const dx = e.clientX - rs.startX;
      const dy = e.clientY - rs.startY;
      let { origLeft: left, origTop: top, origWidth: w, origHeight: h } = rs;

      if (rs.edge.includes("e")) w = rs.origWidth + dx;
      if (rs.edge.includes("s")) h = rs.origHeight + dy;
      if (rs.edge.includes("w")) {
        w = rs.origWidth - dx;
        if (w < minWidth) left = rs.origLeft + (rs.origWidth - minWidth);
        else left = rs.origLeft + dx;
      }
      if (rs.edge.includes("n")) {
        h = rs.origHeight - dy;
        if (h < minHeight) top = rs.origTop + (rs.origHeight - minHeight);
        else top = rs.origTop + dy;
      }
      w = Math.max(minWidth, w);
      h = Math.max(minHeight, h);

      node.style.left = left + "px";
      node.style.top = Math.max(0, top) + "px";
      node.style.width = w + "px";
      node.style.height = h + "px";
    },
    [minWidth, minHeight]
  );

  const endResize = useCallback(
    (e) => {
      const rs = resizeState.current;
      const node = nodeRef.current;
      if (!rs) return;
      resizeState.current = null;
      e.currentTarget.releasePointerCapture?.(e.pointerId);
      if (node) {
        commitGeometry(id, {
          x: parseFloat(node.style.left) || 0,
          y: parseFloat(node.style.top) || 0,
          width: parseFloat(node.style.width) || minWidth,
          height: parseFloat(node.style.height) || minHeight,
        });
      }
    },
    [commitGeometry, id, minWidth, minHeight]
  );

  if (!win) return null;

  const style = win.maximized
    ? { left: 0, top: MAXIMIZED_TOP_INSET, right: 0, bottom: TASKBAR_HEIGHT, width: "auto", height: "auto", zIndex: win.zIndex }
    : {
        left: win.x,
        top: win.y,
        width: win.width ?? width,
        height: win.height ?? height ?? "auto",
        minWidth,
        minHeight,
        zIndex: win.zIndex,
      };

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
          {menuItems.map((m) => {
            if (typeof m === "string") return <span key={m}>{m}</span>;
            return (
              <span key={m.label} className="menubar-link" onClick={() => navigate(m.targetId)}>
                {m.label}
              </span>
            );
          })}
        </div>
      )}
      <div className="winbody">{children}</div>
      {statusText && <div className="statusbar">{statusText}</div>}
      {!win.maximized &&
        RESIZE_EDGES.map(({ edge, cls }) => (
          <div
            key={edge}
            className={`resize-handle ${cls}`}
            onPointerDown={onResizePointerDown(edge)}
            onPointerMove={onResizePointerMove}
            onPointerUp={endResize}
            onPointerCancel={endResize}
          />
        ))}
    </div>
  );
}
