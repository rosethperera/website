import { createContext, useCallback, useContext, useRef, useState } from "react";

const WindowManagerContext = createContext(null);

const CASCADE_STEP = 26;
const CASCADE_LIMIT = 8;

export function WindowManagerProvider({ children }) {
  const [windows, setWindows] = useState({});
  const zCounter = useRef(10);
  const openCount = useRef(0);

  const openWindow = useCallback((id, meta = {}) => {
    setWindows((prev) => {
      zCounter.current += 1;
      if (prev[id]) {
        return { ...prev, [id]: { ...prev[id], minimized: false, zIndex: zCounter.current } };
      }
      const cascade = openCount.current % CASCADE_LIMIT;
      openCount.current += 1;
      return {
        ...prev,
        [id]: {
          x: (meta.defaultX ?? 140) + cascade * CASCADE_STEP,
          y: (meta.defaultY ?? 80) + cascade * CASCADE_STEP,
          width: meta.width ?? 480,
          height: meta.height ?? null,
          zIndex: zCounter.current,
          minimized: false,
          maximized: Boolean(meta.openMaximized),
        },
      };
    });
  }, []);

  const closeWindow = useCallback((id) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const focusWindow = useCallback((id) => {
    zCounter.current += 1;
    const z = zCounter.current;
    setWindows((prev) => (prev[id] ? { ...prev, [id]: { ...prev[id], zIndex: z } } : prev));
  }, []);

  const toggleMinimize = useCallback((id) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      const willMinimize = !prev[id].minimized;
      if (!willMinimize) zCounter.current += 1;
      return {
        ...prev,
        [id]: { ...prev[id], minimized: willMinimize, zIndex: willMinimize ? prev[id].zIndex : zCounter.current },
      };
    });
  }, []);

  const toggleMaximize = useCallback((id) => {
    zCounter.current += 1;
    const z = zCounter.current;
    setWindows((prev) =>
      prev[id] ? { ...prev, [id]: { ...prev[id], maximized: !prev[id].maximized, zIndex: z } } : prev
    );
  }, []);

  const commitPosition = useCallback((id, x, y) => {
    setWindows((prev) => (prev[id] ? { ...prev, [id]: { ...prev[id], x, y } } : prev));
  }, []);

  const commitGeometry = useCallback((id, patch) => {
    setWindows((prev) => (prev[id] ? { ...prev, [id]: { ...prev[id], ...patch } } : prev));
  }, []);

  const isOpen = useCallback((id) => Boolean(windows[id]), [windows]);

  const value = {
    windows,
    openWindow,
    closeWindow,
    focusWindow,
    toggleMinimize,
    toggleMaximize,
    commitPosition,
    commitGeometry,
    isOpen,
  };

  return <WindowManagerContext.Provider value={value}>{children}</WindowManagerContext.Provider>;
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) throw new Error("useWindowManager must be used within WindowManagerProvider");
  return ctx;
}
