import { useEffect, useRef, useState } from "react";
import { useGameLayer } from "../os/GameLayerContext";

// Ghost AI here follows the publicly documented arcade Pac-Man mechanics
// (scatter/chase cycling, per-ghost personality targeting, frightened/eaten
// states) as described in community reverse-engineering writeups such as
// "The Pac-Man Dossier". No third-party source code was used.

const TILE = 8;
const COLS = 28;
const ROWS = 31;

// 0 empty(dot) 1 wall 2 empty(no dot) 3 power pellet 4 empty(ghost house)
const RAW_MAZE = [
  "1111111111111111111111111111",
  "1000000000000000000000000001",
  "1011110111111011111101111101",
  "1311110111111011111101111131",
  "1011110111111011111101111101",
  "1000000000000000000000000001",
  "1011110110111111110110111101",
  "1011110110111111110110111101",
  "1000000110000110000110000001",
  "1111110111110110111110111111",
  "2222210111110110111110122222",
  "2222210110000000000110122222",
  "2222210110111441110110122222",
  "1111110110144444401110111111",
  "0000000000144444401000000000",
  "1111110110144444401110111111",
  "2222210110111111110110122222",
  "2222210110000000000110122222",
  "2222210110111111110110122222",
  "1111110110111111110110111111",
  "1000000000000110000000000001",
  "1011110111111011111101111101",
  "1011110111111011111101111101",
  "1300110000000000000011003001",
  "1110110110111111110110110111",
  "1110110110111111110110110111",
  "1000000110000110000110000001",
  "1011111111110110111111111101",
  "1011111111110110111111111101",
  "1000000000000000000000000001",
  "1111111111111111111111111111",
].map((r) => r.split("").map(Number));

// Blinky (red), Pinky (pink), Inky (cyan), Clyde (orange).
const GHOST_DEFS = [
  { name: "blinky", color: "#FF0000", spawn: { x: 13, y: 14 }, corner: { x: 26, y: 1 } },
  { name: "pinky", color: "#FFB8FF", spawn: { x: 14, y: 14 }, corner: { x: 1, y: 1 } },
  { name: "inky", color: "#00FFFF", spawn: { x: 13, y: 15 }, corner: { x: 26, y: 29 } },
  { name: "clyde", color: "#FFB852", spawn: { x: 14, y: 15 }, corner: { x: 1, y: 29 } },
];

// Classic level-1 scatter/chase schedule (seconds), then chase forever.
const MODE_SCHEDULE = [
  { mode: "scatter", seconds: 7 },
  { mode: "chase", seconds: 20 },
  { mode: "scatter", seconds: 7 },
  { mode: "chase", seconds: 20 },
  { mode: "scatter", seconds: 5 },
  { mode: "chase", seconds: 20 },
  { mode: "scatter", seconds: 5 },
  { mode: "chase", seconds: Infinity },
];
const FRIGHTENED_SECONDS = 7;
const FPS_ASSUMED = 60;
const DIR_PRIORITY = [{ x: 0, y: -1 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }];

export default function PacmanGame() {
  const canvasRef = useRef(null);
  const { gameLayerOn } = useGameLayer();
  const gameOnRef = useRef(gameLayerOn);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    gameOnRef.current = gameLayerOn;
  }, [gameLayerOn]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = COLS * TILE;
    canvas.height = ROWS * TILE;

    const freshGrid = () => RAW_MAZE.map((r) => r.slice());
    let grid = freshGrid();
    const houseTiles = [];
    for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) if (grid[y][x] === 4) houseTiles.push({ x, y });
    const houseCenter = houseTiles.reduce(
      (acc, t) => ({ x: acc.x + t.x / houseTiles.length, y: acc.y + t.y / houseTiles.length }),
      { x: 0, y: 0 }
    );

    const pac = { x: 14, y: 23, dir: { x: 0, y: 0 }, nextDir: { x: 0, y: 0 }, mouth: 0, mouthDir: 1 };
    function makeGhosts() {
      return GHOST_DEFS.map((def) => ({
        ...def,
        x: def.spawn.x,
        y: def.spawn.y,
        dir: { x: -1, y: 0 },
        state: "alive", // 'alive' | 'frightened' | 'eaten'
      }));
    }
    let ghosts = makeGhosts();

    let localScore = 0;
    let localLives = 3;
    let frame = 0;
    let modeIndex = 0;
    let modeTimerFrames = 0;
    let globalMode = MODE_SCHEDULE[0].mode;
    let frightenedFrames = 0;
    let eatCombo = 0;
    let resetPauseFrames = 0; // brief freeze after losing a life
    let over = false;

    function isWall(x, y) {
      let ix = Math.floor(x);
      let iy = Math.floor(y);
      if (ix < 0) ix = COLS - 1;
      if (ix >= COLS) ix = 0;
      if (iy < 0 || iy >= ROWS) return true;
      return grid[iy][ix] === 1;
    }
    function canMove(ex, ey, dir) {
      return !isWall(ex + dir.x, ey + dir.y);
    }

    function updatePac() {
      if (canMove(pac.x, pac.y, pac.nextDir)) pac.dir = { ...pac.nextDir };
      if (canMove(pac.x, pac.y, pac.dir)) {
        pac.x += pac.dir.x * 0.15;
        pac.y += pac.dir.y * 0.15;
      }
      if (pac.x < 0) pac.x = COLS - 1;
      if (pac.x >= COLS) pac.x = 0;
      const gx = Math.round(pac.x);
      const gy = Math.round(pac.y);
      if (grid[gy] && (grid[gy][gx] === 0 || grid[gy][gx] === 3)) {
        if (grid[gy][gx] === 3) {
          localScore += 50;
          frightenedFrames = FRIGHTENED_SECONDS * FPS_ASSUMED;
          eatCombo = 0;
          ghosts.forEach((g) => {
            if (g.state === "alive") {
              g.state = "frightened";
              const rev = { x: -g.dir.x, y: -g.dir.y };
              if (canMove(g.x, g.y, rev)) g.dir = rev;
            }
          });
        } else {
          localScore += 10;
        }
        grid[gy][gx] = 2;
        setScore(localScore);
      }
      pac.mouth += pac.mouthDir * 0.15;
      if (pac.mouth > 1 || pac.mouth < 0) pac.mouthDir *= -1;
    }

    function chaseTarget(g) {
      const blinky = ghosts[0];
      switch (g.name) {
        case "blinky":
          return { x: pac.x, y: pac.y };
        case "pinky":
          return { x: pac.x + pac.dir.x * 4, y: pac.y + pac.dir.y * 4 };
        case "inky": {
          const ax = pac.x + pac.dir.x * 2;
          const ay = pac.y + pac.dir.y * 2;
          return { x: blinky.x + 2 * (ax - blinky.x), y: blinky.y + 2 * (ay - blinky.y) };
        }
        case "clyde": {
          const dist = Math.hypot(g.x - pac.x, g.y - pac.y);
          return dist > 8 ? { x: pac.x, y: pac.y } : g.corner;
        }
        default:
          return { x: pac.x, y: pac.y };
      }
    }

    // Real BFS shortest-path first-step, rather than single-step greedy
    // distance minimization. Greedy target-seeking has no notion of walls
    // beyond the immediate neighbor, so it can thrash forever in a
    // single-tile-wide chokepoint (e.g. the ghost-house door); BFS finds an
    // actual path through the maze graph so that can't happen.
    function bfsFirstStep(startX, startY, targetX, targetY) {
      const sx = Math.round(startX);
      const sy = Math.round(startY);
      let tx = Math.round(targetX);
      let ty = Math.round(targetY);
      tx = Math.max(0, Math.min(COLS - 1, tx));
      ty = Math.max(0, Math.min(ROWS - 1, ty));
      if (sx === tx && sy === ty) return null;

      const visited = Array.from({ length: ROWS }, () => new Array(COLS).fill(false));
      visited[sy][sx] = true;
      const queue = [{ x: sx, y: sy, first: null }];
      let head = 0;
      while (head < queue.length) {
        const cur = queue[head++];
        for (const d of DIR_PRIORITY) {
          let nx = cur.x + d.x;
          const ny = cur.y + d.y;
          if (nx < 0) nx = COLS - 1;
          else if (nx >= COLS) nx = 0;
          if (ny < 0 || ny >= ROWS || grid[ny][nx] === 1 || visited[ny][nx]) continue;
          const first = cur.first || d;
          if (nx === tx && ny === ty) return first;
          visited[ny][nx] = true;
          queue.push({ x: nx, y: ny, first });
        }
      }
      return null; // target unreachable, hold current direction
    }

    function chooseDirection(g, target, random) {
      const gx = Math.round(g.x);
      const gy = Math.round(g.y);
      if (random) {
        const candidates = DIR_PRIORITY.filter(
          (d) => canMove(gx, gy, d) && !(d.x === -g.dir.x && d.y === -g.dir.y)
        );
        const pool = candidates.length ? candidates : DIR_PRIORITY.filter((d) => canMove(gx, gy, d));
        return pool.length ? pool[Math.floor(Math.random() * pool.length)] : g.dir;
      }
      const step = bfsFirstStep(g.x, g.y, target.x, target.y);
      return step || g.dir;
    }

    function updateGhostMode() {
      if (frightenedFrames > 0) {
        frightenedFrames--;
        if (frightenedFrames === 0) {
          ghosts.forEach((g) => {
            if (g.state === "frightened") g.state = "alive";
          });
        }
        return;
      }
      const step = MODE_SCHEDULE[modeIndex];
      if (step.seconds !== Infinity) {
        modeTimerFrames++;
        if (modeTimerFrames >= step.seconds * FPS_ASSUMED) {
          modeTimerFrames = 0;
          modeIndex = Math.min(modeIndex + 1, MODE_SCHEDULE.length - 1);
          globalMode = MODE_SCHEDULE[modeIndex].mode;
          ghosts.forEach((g) => {
            if (g.state === "alive") {
              const rev = { x: -g.dir.x, y: -g.dir.y };
              if (canMove(g.x, g.y, rev)) g.dir = rev;
            }
          });
        }
      }
    }

    // Must exceed half the largest per-frame step (eaten speed 0.18) or a
    // ghost's position can step clean over the detection window at a tile
    // boundary and never get a direction re-check, letting it drift through
    // walls indefinitely in a straight line.
    const CENTER_EPSILON = 0.1;

    function clampGhostToBounds(g) {
      if (g.y < 0) g.y = 0;
      if (g.y > ROWS - 1) g.y = ROWS - 1;
    }

    function updateGhosts() {
      updateGhostMode();
      ghosts.forEach((g) => {
        const gx = Math.round(g.x);
        const gy = Math.round(g.y);
        const atCenter = Math.abs(g.x - gx) < CENTER_EPSILON && Math.abs(g.y - gy) < CENTER_EPSILON;

        if (g.state === "eaten") {
          if (atCenter && Math.hypot(gx - houseCenter.x, gy - houseCenter.y) < 0.6) {
            g.state = "alive";
          } else if (atCenter) {
            g.dir = chooseDirection(g, houseCenter, false);
          }
          const speed = 0.18;
          g.x += g.dir.x * speed;
          g.y += g.dir.y * speed;
          clampGhostToBounds(g);
          return;
        }

        if (atCenter) {
          if (g.state === "frightened") {
            g.dir = chooseDirection(g, null, true);
          } else {
            const target = globalMode === "scatter" ? g.corner : chaseTarget(g);
            g.dir = chooseDirection(g, target, false);
          }
        }
        const speed = g.state === "frightened" ? 0.06 : 0.09;
        g.x += g.dir.x * speed;
        g.y += g.dir.y * speed;
        if (g.x < 0) g.x = COLS - 1;
        if (g.x >= COLS) g.x = 0;
        clampGhostToBounds(g);

        const dist = Math.hypot(g.x - pac.x, g.y - pac.y);
        if (dist < 0.6) {
          if (g.state === "frightened") {
            g.state = "eaten";
            localScore += [200, 400, 800, 1600][Math.min(eatCombo, 3)];
            eatCombo++;
            setScore(localScore);
          } else {
            loseLife();
          }
        }
      });
    }

    function loseLife() {
      if (resetPauseFrames > 0 || over) return;
      localLives--;
      setLives(localLives);
      if (localLives <= 0) {
        over = true;
        setGameOver(true);
        return;
      }
      resetPauseFrames = 60;
      pac.x = 14;
      pac.y = 23;
      pac.dir = { x: 0, y: 0 };
      pac.nextDir = { x: 0, y: 0 };
      ghosts = makeGhosts();
      frightenedFrames = 0;
    }

    function resetGame() {
      grid = freshGrid();
      localScore = 0;
      localLives = 3;
      modeIndex = 0;
      modeTimerFrames = 0;
      globalMode = MODE_SCHEDULE[0].mode;
      frightenedFrames = 0;
      eatCombo = 0;
      resetPauseFrames = 0;
      over = false;
      pac.x = 14;
      pac.y = 23;
      pac.dir = { x: 0, y: 0 };
      pac.nextDir = { x: 0, y: 0 };
      ghosts = makeGhosts();
      setScore(0);
      setLives(3);
      setGameOver(false);
    }

    function drawMaze() {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let y = 0; y < ROWS; y++)
        for (let x = 0; x < COLS; x++) {
          const v = grid[y][x];
          if (v === 1) {
            ctx.strokeStyle = "#2121ff";
            ctx.lineWidth = 1.4;
            ctx.strokeRect(x * TILE + 1.5, y * TILE + 1.5, TILE - 3, TILE - 3);
          } else if (v === 0) {
            ctx.fillStyle = "#ffb897";
            ctx.beginPath();
            ctx.arc(x * TILE + TILE / 2, y * TILE + TILE / 2, 1.1, 0, 7);
            ctx.fill();
          } else if (v === 3) {
            ctx.fillStyle = "#ffb897";
            const pulse = 2 + Math.sin(frame * 0.15) * 0.8;
            ctx.beginPath();
            ctx.arc(x * TILE + TILE / 2, y * TILE + TILE / 2, pulse, 0, 7);
            ctx.fill();
          }
        }
    }
    function drawPac() {
      const cx = pac.x * TILE + TILE / 2;
      const cy = pac.y * TILE + TILE / 2;
      let angle = 0;
      if (pac.dir.x === 1) angle = 0;
      else if (pac.dir.x === -1) angle = Math.PI;
      else if (pac.dir.y === 1) angle = Math.PI / 2;
      else if (pac.dir.y === -1) angle = -Math.PI / 2;
      const openAmt = 0.15 + Math.abs(pac.mouth) * 0.25;
      ctx.fillStyle = "#FFFF00";
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, TILE / 2, angle + openAmt * Math.PI, angle + (2 - openAmt) * Math.PI);
      ctx.fill();
    }
    function drawGhost(g) {
      const cx = g.x * TILE + TILE / 2;
      const cy = g.y * TILE + TILE / 2;
      const r = TILE / 2 - 0.5;

      if (g.state === "eaten") {
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(cx - 2.2, cy - 2, 1.6, 0, 7);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cx + 2.2, cy - 2, 1.6, 0, 7);
        ctx.fill();
        ctx.fillStyle = "#0033ff";
        const ex = g.dir.x * 0.8;
        const ey = g.dir.y * 0.8;
        ctx.beginPath();
        ctx.arc(cx - 2.2 + ex, cy - 2 + ey, 0.8, 0, 7);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cx + 2.2 + ex, cy - 2 + ey, 0.8, 0, 7);
        ctx.fill();
        return;
      }

      const flashing = g.state === "frightened" && frightenedFrames < 2 * FPS_ASSUMED && frame % 20 < 10;
      ctx.fillStyle = g.state === "frightened" ? (flashing ? "#fff" : "#2121ff") : g.color;
      ctx.beginPath();
      ctx.arc(cx, cy - 1, r, Math.PI, 0);
      ctx.lineTo(cx + r, cy + r);
      for (let i = 0; i < 3; i++) {
        ctx.lineTo(cx + r - (r * 2 / 3) * (i + 0.5), cy + r - 2);
        ctx.lineTo(cx + r - (r * 2 / 3) * (i + 1), cy + r);
      }
      ctx.lineTo(cx - r, cy + r);
      ctx.closePath();
      ctx.fill();

      if (g.state === "frightened") {
        ctx.fillStyle = "#ffb897";
        ctx.beginPath();
        ctx.arc(cx - 2.2, cy - 1, 1.1, 0, 7);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cx + 2.2, cy - 1, 1.1, 0, 7);
        ctx.fill();
        return;
      }

      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(cx - 2.2, cy - 2, 1.6, 0, 7);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx + 2.2, cy - 2, 1.6, 0, 7);
      ctx.fill();
      ctx.fillStyle = "#0033ff";
      const ex = g.dir.x * 0.8;
      const ey = g.dir.y * 0.8;
      ctx.beginPath();
      ctx.arc(cx - 2.2 + ex, cy - 2 + ey, 0.8, 0, 7);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx + 2.2 + ex, cy - 2 + ey, 0.8, 0, 7);
      ctx.fill();
    }

    function drawOverlayText(text, subtext) {
      ctx.fillStyle = "rgba(0,0,0,0.55)";
      ctx.fillRect(0, canvas.height / 2 - 18, canvas.width, 36);
      ctx.fillStyle = "#FFFF00";
      ctx.font = "8px monospace";
      ctx.textAlign = "center";
      ctx.fillText(text, canvas.width / 2, canvas.height / 2 - 2);
      if (subtext) {
        ctx.fillStyle = "#fff";
        ctx.font = "6px monospace";
        ctx.fillText(subtext, canvas.width / 2, canvas.height / 2 + 10);
      }
      ctx.textAlign = "start";
    }

    let rafId;
    function loop() {
      frame++;
      if (gameOnRef.current && !over) {
        if (resetPauseFrames > 0) {
          resetPauseFrames--;
        } else {
          updatePac();
          updateGhosts();
        }
      }
      drawMaze();
      ghosts.forEach(drawGhost);
      drawPac();
      if (over) drawOverlayText("GAME OVER", "press any arrow key");
      else if (resetPauseFrames > 0) drawOverlayText("READY!");
      rafId = requestAnimationFrame(loop);
    }

    function onKeyDown(e) {
      if (!gameOnRef.current) return;
      if (over) {
        if (e.key.startsWith("Arrow")) {
          resetGame();
          e.preventDefault();
        }
        return;
      }
      if (e.key === "ArrowLeft") pac.nextDir = { x: -1, y: 0 };
      else if (e.key === "ArrowRight") pac.nextDir = { x: 1, y: 0 };
      else if (e.key === "ArrowUp") pac.nextDir = { x: 0, y: -1 };
      else if (e.key === "ArrowDown") pac.nextDir = { x: 0, y: 1 };
      else return;
      e.preventDefault();
    }

    rafId = requestAnimationFrame(loop);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="pacman-wrap">
      <div className="pacman-hud">
        <span>
          SCORE <span>{String(score).padStart(2, "0")}</span>
        </span>
        <span className="pacman-1up">LIVES {"●".repeat(Math.max(lives, 0))}</span>
      </div>
      <div className="pacman-frame">
        <canvas ref={canvasRef} />
      </div>
      <div className="pacman-controls">{gameOver ? "GAME OVER. Press an arrow key to restart." : "ARROW KEYS to move"}</div>
    </div>
  );
}
