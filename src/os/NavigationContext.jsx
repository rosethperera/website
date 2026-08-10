import { createContext, useContext } from "react";

const NavigationContext = createContext(null);

// Lets content components (About, My Builds, My Computer) request a window
// open without caring whether they're rendered inside the draggable desktop
// (opens a real Window) or the mobile fallback (opens a fullscreen sheet).
export function NavigationProvider({ navigate, children }) {
  return <NavigationContext.Provider value={navigate}>{children}</NavigationContext.Provider>;
}

export function useNavigate() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error("useNavigate must be used within NavigationProvider");
  return ctx;
}
