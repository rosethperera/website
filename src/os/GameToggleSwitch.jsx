import { useGameLayer } from "./GameLayerContext";

export default function GameToggleSwitch() {
  const { gameLayerOn, toggle } = useGameLayer();

  return (
    <div className="game-toggle-widget" role="group" aria-label="Game layer toggle">
      <span className="game-toggle-label">Game layer</span>
      <button
        className={`game-toggle${gameLayerOn ? "" : " off"}`}
        onClick={toggle}
        aria-pressed={gameLayerOn}
        title={gameLayerOn ? "Turn game layer off" : "Turn game layer on"}
      >
        <span className="game-toggle-knob" />
      </button>
    </div>
  );
}
