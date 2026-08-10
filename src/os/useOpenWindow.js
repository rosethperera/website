import { useWindowManager } from "./WindowManagerContext";
import { windowMeta } from "./windowMeta";

export function useOpenWindow() {
  const { openWindow } = useWindowManager();
  return (id) => openWindow(id, windowMeta[id]);
}
