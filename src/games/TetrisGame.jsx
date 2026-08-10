import { useEffect, useRef, useState } from "react";
import { useGameLayer } from "../os/GameLayerContext";

const COLS = 10;
const ROWS = 20;
const CELL = 20;

// Authentic guideline piece colors.
const COLORS = { I: "#31C7EF", O: "#F7D308", T: "#AD4D9C", S: "#42B642", Z: "#EF2029", J: "#5A65AD", L: "#EF7921" };
const SHAPES = {
  I: [[0, 1], [1, 1], [2, 1], [3, 1]],
  O: [[1, 0], [2, 0], [1, 1], [2, 1]],
  T: [[1, 0], [0, 1], [1, 1], [2, 1]],
  S: [[1, 0], [2, 0], [0, 1], [1, 1]],
  Z: [[0, 0], [1, 0], [1, 1], [2, 1]],
  J: [[0, 0], [0, 1], [1, 1], [2, 1]],
  L: [[2, 0], [0, 1], [1, 1], [2, 1]],
};

function rotateShape(shape, times) {
  let s = shape;
  for (let t = 0; t < times; t++) s = s.map(([x, y]) => [3 - y, x]);
  return s;
}

export default function TetrisGame() {
  const boardRef = useRef(null);
  const nextRef = useRef(null);
  const { gameLayerOn } = useGameLayer();
  const gameOnRef = useRef(gameLayerOn);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);

  useEffect(() => {
    gameOnRef.current = gameLayerOn;
  }, [gameLayerOn]);

  useEffect(() => {
    const ctx = boardRef.current.getContext("2d");
    const nctx = nextRef.current.getContext("2d");

    const state = {
      grid: Array.from({ length: ROWS }, () => Array(COLS).fill(null)),
      bag: [],
      cur: null,
      curColor: null,
      curX: 3,
      curY: -1,
      curRot: 0,
      nextPiece: null,
      score: 0,
      lines: 0,
      dropInterval: 700,
      lastDrop: 0,
      running: true,
    };

    function refillBag() {
      const keys = Object.keys(SHAPES);
      for (let i = keys.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [keys[i], keys[j]] = [keys[j], keys[i]];
      }
      state.bag.push(...keys);
    }
    function nextFromBag() {
      if (state.bag.length === 0) refillBag();
      return state.bag.shift();
    }

    function getCells(px = state.curX, py = state.curY, rot = state.curRot) {
      return rotateShape(SHAPES[state.cur], rot).map(([x, y]) => [x + px, y + py]);
    }
    function collides(cells) {
      return cells.some(([x, y]) => x < 0 || x >= COLS || y >= ROWS || (y >= 0 && state.grid[y][x]));
    }

    function drawNext() {
      nctx.fillStyle = "#0d0d18";
      nctx.fillRect(0, 0, 80, 60);
      const shape = SHAPES[state.nextPiece];
      const color = COLORS[state.nextPiece];
      const s = 14;
      shape.forEach(([x, y]) => {
        nctx.fillStyle = color;
        nctx.fillRect(10 + x * s, 6 + y * s, s - 2, s - 2);
      });
    }

    function spawn() {
      const key = state.nextPiece || nextFromBag();
      state.nextPiece = nextFromBag();
      state.cur = key;
      state.curColor = COLORS[key];
      state.curRot = 0;
      state.curX = 3;
      state.curY = -1;
      drawNext();
      if (collides(getCells())) state.running = false;
    }

    function clearLines() {
      let cleared = 0;
      for (let y = ROWS - 1; y >= 0; y--) {
        if (state.grid[y].every((c) => c)) {
          state.grid.splice(y, 1);
          state.grid.unshift(Array(COLS).fill(null));
          cleared++;
          y++;
        }
      }
      if (cleared > 0) {
        state.lines += cleared;
        state.score += [0, 100, 300, 500, 800][cleared] || 0;
        setScore(state.score);
        setLines(state.lines);
      }
    }
    function lockPiece() {
      getCells().forEach(([x, y]) => {
        if (y >= 0) state.grid[y][x] = state.curColor;
      });
      clearLines();
      spawn();
    }

    function move(dx) {
      const cells = getCells(state.curX + dx, state.curY);
      if (!collides(cells)) state.curX += dx;
    }
    function rotate() {
      const nr = (state.curRot + 1) % 4;
      const cells = getCells(state.curX, state.curY, nr);
      if (!collides(cells)) state.curRot = nr;
      else if (!collides(getCells(state.curX - 1, state.curY, nr))) {
        state.curX--;
        state.curRot = nr;
      } else if (!collides(getCells(state.curX + 1, state.curY, nr))) {
        state.curX++;
        state.curRot = nr;
      }
    }
    function softDrop() {
      const cells = getCells(state.curX, state.curY + 1);
      if (!collides(cells)) state.curY++;
      else lockPiece();
    }
    function hardDrop() {
      while (!collides(getCells(state.curX, state.curY + 1))) state.curY++;
      lockPiece();
    }
    function ghostY() {
      let gy = state.curY;
      while (!collides(getCells(state.curX, gy + 1))) gy++;
      return gy;
    }

    function drawCell(x, y, color, ghost = false) {
      if (ghost) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.strokeRect(x * CELL + 2, y * CELL + 2, CELL - 4, CELL - 4);
        return;
      }
      ctx.fillStyle = color;
      ctx.fillRect(x * CELL, y * CELL, CELL, CELL);
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      ctx.fillRect(x * CELL, y * CELL, CELL, 3);
      ctx.fillRect(x * CELL, y * CELL, 3, CELL);
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillRect(x * CELL, y * CELL + CELL - 3, CELL, 3);
      ctx.fillRect(x * CELL + CELL - 3, y * CELL, 3, CELL);
    }
    function draw() {
      ctx.fillStyle = "#0d0d18";
      ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      for (let x = 0; x <= COLS; x++) {
        ctx.beginPath();
        ctx.moveTo(x * CELL, 0);
        ctx.lineTo(x * CELL, ROWS * CELL);
        ctx.stroke();
      }
      for (let y = 0; y <= ROWS; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * CELL);
        ctx.lineTo(COLS * CELL, y * CELL);
        ctx.stroke();
      }
      for (let y = 0; y < ROWS; y++)
        for (let x = 0; x < COLS; x++) if (state.grid[y][x]) drawCell(x, y, state.grid[y][x]);
      const gy = ghostY();
      getCells(state.curX, gy).forEach(([x, y]) => {
        if (y >= 0) drawCell(x, y, state.curColor, true);
      });
      getCells().forEach(([x, y]) => {
        if (y >= 0) drawCell(x, y, state.curColor);
      });
    }

    let rafId;
    function loop(ts) {
      if (!state.lastDrop) state.lastDrop = ts;
      if (gameOnRef.current && state.running && ts - state.lastDrop > state.dropInterval) {
        softDrop();
        state.lastDrop = ts;
      }
      draw();
      rafId = requestAnimationFrame(loop);
    }

    function onKeyDown(e) {
      if (!gameOnRef.current || !state.running) return;
      if (e.key === "ArrowLeft") move(-1);
      else if (e.key === "ArrowRight") move(1);
      else if (e.key === "ArrowDown") softDrop();
      else if (e.key === "ArrowUp") rotate();
      else if (e.key === " ") {
        e.preventDefault();
        hardDrop();
      } else return;
      e.preventDefault();
    }

    spawn();
    rafId = requestAnimationFrame(loop);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="tetris-wrap">
      <div className="board-frame">
        <canvas ref={boardRef} width={COLS * CELL} height={ROWS * CELL} />
      </div>
      <div className="tetris-side">
        <div className="tetris-panel">
          <h3>NEXT</h3>
          <canvas ref={nextRef} width={80} height={60} />
        </div>
        <div className="tetris-panel">
          <h3>SCORE</h3>
          <div className="tetris-val">{score}</div>
        </div>
        <div className="tetris-panel">
          <h3>LINES</h3>
          <div className="tetris-val">{lines}</div>
        </div>
        <div className="tetris-panel tetris-hint">
          ←→ move
          <br />
          ↑ rotate
          <br />
          ↓ soft drop
          <br />
          space hard drop
        </div>
      </div>
    </div>
  );
}
