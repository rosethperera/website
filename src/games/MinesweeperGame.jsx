import { useCallback, useEffect, useRef, useState } from "react";

const COLS = 9;
const ROWS = 9;
const MINES = 10;

const NUMBER_COLORS = {
  1: "#0000fe",
  2: "#008001",
  3: "#fe0000",
  4: "#000180",
  5: "#800002",
  6: "#008080",
  7: "#000000",
  8: "#808080",
};

function emptyBoard() {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({ mine: false, revealed: false, flagged: false, adjacent: 0 }))
  );
}

function neighbors(r, c) {
  const out = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) out.push([nr, nc]);
    }
  }
  return out;
}

function placeMines(board, safeR, safeC) {
  const safe = new Set([`${safeR},${safeC}`, ...neighbors(safeR, safeC).map(([r, c]) => `${r},${c}`)]);
  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (board[r][c].mine || safe.has(`${r},${c}`)) continue;
    board[r][c].mine = true;
    placed++;
  }
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c].mine) continue;
      board[r][c].adjacent = neighbors(r, c).filter(([nr, nc]) => board[nr][nc].mine).length;
    }
  }
}

function floodReveal(board, r, c) {
  const stack = [[r, c]];
  while (stack.length) {
    const [cr, cc] = stack.pop();
    const cell = board[cr][cc];
    if (cell.revealed || cell.flagged) continue;
    cell.revealed = true;
    if (cell.adjacent === 0 && !cell.mine) {
      for (const [nr, nc] of neighbors(cr, cc)) {
        if (!board[nr][nc].revealed && !board[nr][nc].mine) stack.push([nr, nc]);
      }
    }
  }
}

function countNonMineRevealed(board) {
  let count = 0;
  for (const row of board) for (const cell of row) if (cell.revealed && !cell.mine) count++;
  return count;
}

function led(n, digits = 3) {
  const clamped = Math.max(-99, Math.min(999, n));
  const sign = clamped < 0 ? "-" : "";
  const abs = String(Math.abs(clamped)).padStart(clamped < 0 ? digits - 1 : digits, "0");
  return sign + abs;
}

export default function MinesweeperGame() {
  const [board, setBoard] = useState(emptyBoard);
  const [status, setStatus] = useState("ready"); // ready | playing | won | lost
  const [seconds, setSeconds] = useState(0);
  const [flagCount, setFlagCount] = useState(0);
  const [pressed, setPressed] = useState(false);
  const [explodedAt, setExplodedAt] = useState(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (status !== "playing") return;
    const id = setInterval(() => setSeconds((s) => Math.min(999, s + 1)), 1000);
    return () => clearInterval(id);
  }, [status]);

  const resetGame = useCallback(() => {
    setBoard(emptyBoard());
    setStatus("ready");
    setSeconds(0);
    setFlagCount(0);
    setExplodedAt(null);
    startedRef.current = false;
  }, []);

  const revealCell = (r, c) => {
    if (status === "won" || status === "lost") return;
    setBoard((prev) => {
      const cell = prev[r][c];
      if (cell.revealed || cell.flagged) return prev;

      const next = prev.map((row) => row.map((cell) => ({ ...cell })));

      if (!startedRef.current) {
        placeMines(next, r, c);
        startedRef.current = true;
        setStatus("playing");
      }

      if (next[r][c].mine) {
        for (const row of next) for (const cell of row) if (cell.mine) cell.revealed = true;
        setExplodedAt(`${r},${c}`);
        setStatus("lost");
        return next;
      }

      floodReveal(next, r, c);

      if (countNonMineRevealed(next) === ROWS * COLS - MINES) {
        for (const row of next) for (const cell of row) if (cell.mine) cell.flagged = true;
        setStatus("won");
        setFlagCount(MINES);
      }

      return next;
    });
  };

  const toggleFlag = (e, r, c) => {
    e.preventDefault();
    if (status === "won" || status === "lost") return;
    setBoard((prev) => {
      const cell = prev[r][c];
      if (cell.revealed) return prev;
      const next = prev.map((row) => row.map((cell) => ({ ...cell })));
      next[r][c].flagged = !next[r][c].flagged;
      setFlagCount((f) => f + (next[r][c].flagged ? 1 : -1));
      return next;
    });
  };

  const face = explodedAt || status === "lost" ? "😵" : status === "won" ? "😎" : pressed ? "😮" : "🙂";

  return (
    <div className="ms-window">
      <div className="ms-header">
        <div className="ms-led">{led(MINES - flagCount)}</div>
        <button className="ms-face" onClick={resetGame} title="New game">
          {face}
        </button>
        <div className="ms-led">{led(seconds)}</div>
      </div>
      <div
        className="ms-grid"
        style={{ gridTemplateColumns: `repeat(${COLS}, 22px)` }}
        onMouseDown={(e) => e.button === 0 && setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
      >
        {board.map((row, r) =>
          row.map((cell, c) => {
            const isExploded = explodedAt === `${r},${c}`;
            let content = "";
            if (cell.flagged) content = "🚩";
            else if (cell.revealed && cell.mine) content = "💣";
            else if (cell.revealed && cell.adjacent > 0) content = cell.adjacent;

            return (
              <button
                key={`${r}-${c}`}
                className={`ms-cell${cell.revealed ? " revealed" : ""}${isExploded ? " exploded" : ""}`}
                style={cell.revealed && cell.adjacent > 0 ? { color: NUMBER_COLORS[cell.adjacent] } : undefined}
                onClick={() => revealCell(r, c)}
                onContextMenu={(e) => toggleFlag(e, r, c)}
                disabled={status === "won" || status === "lost"}
              >
                {content}
              </button>
            );
          })
        )}
      </div>
      <p className="win-hint ms-hint">Left-click to reveal. Right-click to flag.</p>
    </div>
  );
}
