import { useEffect, useRef, useState } from "react";
import { useGameLayer } from "../os/GameLayerContext";

// Rotation/kick data below is the publicly published Tetris Guideline "SRS"
// (Super Rotation System) specification — the same numbers appear in the
// official guideline docs and independently across countless from-scratch
// implementations, since it's a technical standard rather than any single
// project's original code. No third-party source was copied.

const COLS = 10;
const ROWS = 20;
const CELL = 20;

const COLORS = { I: "#31C7EF", O: "#F7D308", T: "#AD4D9C", S: "#42B642", Z: "#EF2029", J: "#5A65AD", L: "#EF7921" };

// Each piece: 4 rotation states (spawn, R, 2, L), 4 minoes each, in a 4x4 box.
const SHAPES = {
  I: [
    [[0, 1], [1, 1], [2, 1], [3, 1]],
    [[2, 0], [2, 1], [2, 2], [2, 3]],
    [[0, 2], [1, 2], [2, 2], [3, 2]],
    [[1, 0], [1, 1], [1, 2], [1, 3]],
  ],
  O: [
    [[1, 0], [2, 0], [1, 1], [2, 1]],
    [[1, 0], [2, 0], [1, 1], [2, 1]],
    [[1, 0], [2, 0], [1, 1], [2, 1]],
    [[1, 0], [2, 0], [1, 1], [2, 1]],
  ],
  T: [
    [[1, 0], [0, 1], [1, 1], [2, 1]],
    [[1, 0], [1, 1], [2, 1], [1, 2]],
    [[0, 1], [1, 1], [2, 1], [1, 2]],
    [[1, 0], [0, 1], [1, 1], [1, 2]],
  ],
  S: [
    [[1, 0], [2, 0], [0, 1], [1, 1]],
    [[1, 0], [1, 1], [2, 1], [2, 2]],
    [[1, 1], [2, 1], [0, 2], [1, 2]],
    [[0, 0], [0, 1], [1, 1], [1, 2]],
  ],
  Z: [
    [[0, 0], [1, 0], [1, 1], [2, 1]],
    [[2, 0], [1, 1], [2, 1], [1, 2]],
    [[0, 1], [1, 1], [1, 2], [2, 2]],
    [[1, 0], [0, 1], [1, 1], [0, 2]],
  ],
  J: [
    [[0, 0], [0, 1], [1, 1], [2, 1]],
    [[1, 0], [2, 0], [1, 1], [1, 2]],
    [[0, 1], [1, 1], [2, 1], [2, 2]],
    [[1, 0], [1, 1], [0, 2], [1, 2]],
  ],
  L: [
    [[2, 0], [0, 1], [1, 1], [2, 1]],
    [[1, 0], [1, 1], [1, 2], [2, 2]],
    [[0, 1], [1, 1], [2, 1], [0, 2]],
    [[0, 0], [1, 0], [1, 1], [1, 2]],
  ],
};

// SRS wall-kick offset tables, keyed by "<fromRot><toRot>". Defined in
// standard y-up convention; negated on use since our board's y grows downward.
const JLSTZ_KICKS = {
  "01": [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
  "10": [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
  "12": [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
  "21": [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
  "23": [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
  "32": [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
  "30": [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
  "03": [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
};
const I_KICKS = {
  "01": [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]],
  "10": [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
  "12": [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]],
  "21": [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]],
  "23": [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
  "32": [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]],
  "30": [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]],
  "03": [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]],
};

const LOCK_DELAY_FRAMES = 30;
const LOCK_RESET_LIMIT = 15;

export default function TetrisGame() {
  const boardRef = useRef(null);
  const nextRef = useRef(null);
  const holdRef = useRef(null);
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
    const hctx = holdRef.current.getContext("2d");

    const state = {
      grid: Array.from({ length: ROWS }, () => Array(COLS).fill(null)),
      bag: [],
      cur: null,
      curColor: null,
      curX: 3,
      curY: -1,
      curRot: 0,
      nextPiece: null,
      holdPiece: null,
      canHold: true,
      score: 0,
      lines: 0,
      dropInterval: 700,
      lastDrop: 0,
      grounded: false,
      lockTimer: 0,
      lockResets: 0,
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

    function getCells(px = state.curX, py = state.curY, rot = state.curRot, piece = state.cur) {
      return SHAPES[piece][rot].map(([x, y]) => [x + px, y + py]);
    }
    function collides(cells) {
      return cells.some(([x, y]) => x < 0 || x >= COLS || y >= ROWS || (y >= 0 && state.grid[y][x]));
    }

    function drawNext() {
      nctx.fillStyle = "#0d0d18";
      nctx.fillRect(0, 0, 80, 60);
      drawMini(nctx, state.nextPiece);
    }
    function drawHold() {
      hctx.fillStyle = "#0d0d18";
      hctx.fillRect(0, 0, 80, 60);
      if (state.holdPiece) drawMini(hctx, state.holdPiece, !state.canHold);
    }
    function drawMini(c, piece, dim = false) {
      const shape = SHAPES[piece][0];
      const color = COLORS[piece];
      const s = 14;
      c.globalAlpha = dim ? 0.4 : 1;
      shape.forEach(([x, y]) => {
        c.fillStyle = color;
        c.fillRect(10 + x * s, 6 + y * s, s - 2, s - 2);
      });
      c.globalAlpha = 1;
    }

    function resetActivePosition() {
      state.curRot = 0;
      state.curX = 3;
      state.curY = -1;
      state.grounded = false;
      state.lockTimer = 0;
      state.lockResets = 0;
    }

    function spawnPiece(key) {
      state.cur = key;
      state.curColor = COLORS[key];
      resetActivePosition();
      drawNext();
      if (collides(getCells())) state.running = false;
    }

    function spawn() {
      const key = state.nextPiece || nextFromBag();
      state.nextPiece = nextFromBag();
      spawnPiece(key);
    }

    function holdSwap() {
      if (!state.canHold || !state.running) return;
      state.canHold = false;
      if (state.holdPiece === null) {
        state.holdPiece = state.cur;
        spawn();
      } else {
        const swapped = state.holdPiece;
        state.holdPiece = state.cur;
        spawnPiece(swapped);
      }
      drawHold();
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
      state.canHold = true;
      spawn();
    }

    function isGrounded() {
      return collides(getCells(state.curX, state.curY + 1));
    }
    function onSettleCheck() {
      state.grounded = isGrounded();
      if (!state.grounded) {
        state.lockTimer = 0;
        state.lockResets = 0;
      }
    }
    function registerActionWhileGrounded() {
      if (!state.grounded) return;
      if (state.lockResets < LOCK_RESET_LIMIT) {
        state.lockTimer = 0;
        state.lockResets++;
      }
    }

    function move(dx) {
      const cells = getCells(state.curX + dx, state.curY);
      if (!collides(cells)) {
        state.curX += dx;
        registerActionWhileGrounded();
        onSettleCheck();
      }
    }
    function rotate(dir) {
      const from = state.curRot;
      const to = (from + dir + 4) % 4;
      const table = state.cur === "O" ? null : state.cur === "I" ? I_KICKS : JLSTZ_KICKS;
      const tests = table ? table[`${from}${to}`] : [[0, 0]];
      for (const [kx, ky] of tests) {
        // kick tables are y-up; board grid is y-down, so flip the vertical offset
        const nx = state.curX + kx;
        const ny = state.curY - ky;
        if (!collides(getCells(nx, ny, to))) {
          state.curX = nx;
          state.curY = ny;
          state.curRot = to;
          registerActionWhileGrounded();
          onSettleCheck();
          return;
        }
      }
    }
    function softDrop() {
      const cells = getCells(state.curX, state.curY + 1);
      if (!collides(cells)) {
        state.curY++;
        onSettleCheck();
      } else {
        lockPiece();
      }
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
      if (gameOnRef.current && state.running) {
        if (state.grounded) {
          state.lockTimer++;
          if (state.lockTimer >= LOCK_DELAY_FRAMES || state.lockResets >= LOCK_RESET_LIMIT) {
            lockPiece();
            state.lastDrop = ts;
          }
        } else if (ts - state.lastDrop > state.dropInterval) {
          softDrop();
          state.lastDrop = ts;
        }
      }
      draw();
      rafId = requestAnimationFrame(loop);
    }

    function onKeyDown(e) {
      if (!gameOnRef.current || !state.running) return;
      if (e.key === "ArrowLeft") move(-1);
      else if (e.key === "ArrowRight") move(1);
      else if (e.key === "ArrowDown") softDrop();
      else if (e.key === "ArrowUp") rotate(1);
      else if (e.key === "z" || e.key === "Z") rotate(-1);
      else if (e.key === "c" || e.key === "C" || e.key === "Shift") holdSwap();
      else if (e.key === " ") {
        e.preventDefault();
        hardDrop();
      } else return;
      e.preventDefault();
    }

    spawn();
    drawHold();
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
          <h3>HOLD</h3>
          <canvas ref={holdRef} width={80} height={60} />
        </div>
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
          ↑ rotate cw · z ccw
          <br />
          ↓ soft drop
          <br />
          space hard drop
          <br />
          c hold
        </div>
      </div>
    </div>
  );
}
