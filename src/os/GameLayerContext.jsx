import { createContext, useCallback, useContext, useEffect, useState } from "react";

const GameLayerContext = createContext(null);
const STORAGE_KEY = "xp-portfolio-game-layer";

function readInitial() {
  if (typeof window === "undefined") return true;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === null ? true : stored === "1";
  } catch {
    return true;
  }
}

export function GameLayerProvider({ children }) {
  const [gameLayerOn, setGameLayerOn] = useState(readInitial);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, gameLayerOn ? "1" : "0");
    } catch {
      // storage unavailable, non-fatal, toggle still works for this session
    }
  }, [gameLayerOn]);

  const toggle = useCallback(() => setGameLayerOn((v) => !v), []);

  return (
    <GameLayerContext.Provider value={{ gameLayerOn, toggle }}>{children}</GameLayerContext.Provider>
  );
}

export function useGameLayer() {
  const ctx = useContext(GameLayerContext);
  if (!ctx) throw new Error("useGameLayer must be used within GameLayerProvider");
  return ctx;
}
