import { useEffect } from "react";
import { useWindowManager } from "./WindowManagerContext";
import { windowRegistry } from "./windowRegistry";
import Window from "./Window";
import DesktopIcons from "./DesktopIcons";
import Clippy from "./Clippy";
import Taskbar from "./Taskbar";
import GameToggleSwitch from "./GameToggleSwitch";
import { useOpenWindow } from "./useOpenWindow";
import { NavigationProvider } from "./NavigationContext";

function OpenWindows() {
  const { windows } = useWindowManager();

  return Object.keys(windows).map((id) => {
    const def = windowRegistry[id];
    if (!def) return null;
    const Content = def.Content;
    return (
      <Window key={id} id={id} title={def.title} icon={def.icon} width={def.width} statusText={def.statusText} menuItems={def.menuItems}>
        <Content {...(def.contentProps || {})} />
      </Window>
    );
  });
}

export default function Desktop() {
  const openWindow = useOpenWindow();

  useEffect(() => {
    openWindow("about");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavigationProvider navigate={openWindow}>
      <div className="desktop">
        <div className="hill2" />
        <div className="hill" />

        <DesktopIcons />
        <OpenWindows />
        <Clippy />
        <GameToggleSwitch />
        <Taskbar />
      </div>
    </NavigationProvider>
  );
}
