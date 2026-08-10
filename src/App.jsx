import { useEffect, useState } from "react";
import { GameLayerProvider } from "./os/GameLayerContext";
import { WindowManagerProvider } from "./os/WindowManagerContext";
import Desktop from "./os/Desktop";
import MobileView from "./mobile/MobileView";

const MOBILE_BREAKPOINT = 860;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}

function App() {
  const isMobile = useIsMobile();

  useEffect(() => {
    document.body.classList.toggle("mode-mobile", isMobile);
    document.body.classList.toggle("mode-desktop", !isMobile);
  }, [isMobile]);

  return (
    <GameLayerProvider>
      {isMobile ? (
        <MobileView />
      ) : (
        <WindowManagerProvider>
          <Desktop />
        </WindowManagerProvider>
      )}
    </GameLayerProvider>
  );
}

export default App;
