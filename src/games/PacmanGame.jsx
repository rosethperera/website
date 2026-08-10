import { useEffect, useRef, useState } from "react";
import { useGameLayer } from "../os/GameLayerContext";

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
const GHOST_COLORS = ["#FF0000", "#FFB8FF", "#00FFFF", "#FFB852"];

export default function PacmanGame() {
  const canvasRef = useRef(null);
  const { gameLayerOn } = useGameLayer();
  const gameOnRef = useRef(gameLayerOn);
  const [score, setScore] = useState(0);

  useEffect(() => {
    gameOnRef.current = gameLayerOn;
  }, [gameLayerOn]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const grid = RAW_MAZE.map((r) => r.slice());
    const pac = { x: 14, y: 23, dir: { x: 0, y: 0 }, nextDir: { x: 0, y: 0 }, mouth: 0, mouthDir: 1 };
    const ghosts = [
      { x: 13, y: 14, dir: { x: 1, y: 0 }, color: GHOST_COLORS[0] },
      { x: 14, y: 14, dir: { x: -1, y: 0 }, color: GHOST_COLORS[1] },
      { x: 13, y: 15, dir: { x: 1, y: 0 }, color: GHOST_COLORS[2] },
      { x: 14, y: 15, dir: { x: -1, y: 0 }, color: GHOST_COLORS[3] },
    ];
    let localScore = 0;
    let frame = 0;

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
        localScore += grid[gy][gx] === 3 ? 50 : 10;
        grid[gy][gx] = 2;
        setScore(localScore);
      }
      pac.mouth += pac.mouthDir * 0.15;
      if (pac.mouth > 1 || pac.mouth < 0) pac.mouthDir *= -1;
    }

    function updateGhosts() {
      ghosts.forEach((g) => {
        const gx = Math.round(g.x);
        const gy = Math.round(g.y);
        if (Math.abs(g.x - gx) < 0.02 && Math.abs(g.y - gy) < 0.02) {
          const dirs = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }];
          const valid = dirs.filter((d) => canMove(gx, gy, d) && !(d.x === -g.dir.x && d.y === -g.dir.y));
          if (valid.length) {
            valid.sort((a, b) => {
              const da = Math.hypot(gx + a.x - pac.x, gy + a.y - pac.y);
              const db = Math.hypot(gx + b.x - pac.x, gy + b.y - pac.y);
              return da - db;
            });
            g.dir = Math.random() < 0.5 ? valid[0] : valid[Math.floor(Math.random() * valid.length)];
          }
        }
        g.x += g.dir.x * 0.09;
        g.y += g.dir.y * 0.09;
        if (g.x < 0) g.x = COLS - 1;
        if (g.x >= COLS) g.x = 0;
      });
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
      ctx.fillStyle = g.color;
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

    let rafId;
    function loop() {
      frame++;
      if (gameOnRef.current) {
        updatePac();
        updateGhosts();
      }
      drawMaze();
      ghosts.forEach(drawGhost);
      drawPac();
      rafId = requestAnimationFrame(loop);
    }

    function onKeyDown(e) {
      if (!gameOnRef.current) return;
      if (e.key === "ArrowLeft") pac.nextDir = { x: -1, y: 0 };
      else if (e.key === "ArrowRight") pac.nextDir = { x: 1, y: 0 };
      else if (e.key === "ArrowUp") pac.nextDir = { x: 0, y: -1 };
      else if (e.key === "ArrowDown") pac.nextDir = { x: 0, y: 1 };
      else return;
      e.preventDefault();
    }

    canvas.width = COLS * TILE;
    canvas.height = ROWS * TILE;
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
        <span className="pacman-1up">1UP</span>
      </div>
      <div className="pacman-frame">
        <canvas ref={canvasRef} />
      </div>
      <div className="pacman-controls">ARROW KEYS to move</div>
    </div>
  );
}
