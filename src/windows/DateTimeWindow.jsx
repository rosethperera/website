import { useEffect, useMemo, useState } from "react";
import { useWindowManager } from "../os/WindowManagerContext";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["M", "Tu", "W", "Th", "F", "Sa", "Su"];

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

// Convert JS's Sunday-first getDay() (0-6) to this dialog's Monday-first column index (0-6).
function mondayFirstIndex(date) {
  return (date.getDay() + 6) % 7;
}

function formatDigital(date) {
  let h = date.getHours();
  const m = String(date.getMinutes()).padStart(2, "0");
  const s = String(date.getSeconds()).padStart(2, "0");
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${m}:${s}`;
}

function ClockFace({ now }) {
  const seconds = now.getSeconds();
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6;
  const hourDeg = hours * 30;

  const ticks = Array.from({ length: 12 }, (_, i) => {
    const angle = i * 30 - 90;
    const rad = (angle * Math.PI) / 180;
    const radius = 68;
    const x = 75 + radius * Math.cos(rad);
    const y = 75 + radius * Math.sin(rad);
    return (
      <span key={i} className="dt-clock-tick" style={{ left: `${x}px`, top: `${y}px` }} />
    );
  });

  return (
    <div className="dt-clock-face">
      {ticks}
      <div className="dt-clock-hand dt-clock-hand-hour" style={{ transform: `translateX(-50%) rotate(${hourDeg}deg)` }} />
      <div className="dt-clock-hand dt-clock-hand-minute" style={{ transform: `translateX(-50%) rotate(${minuteDeg}deg)` }} />
      <div className="dt-clock-hand dt-clock-hand-second" style={{ transform: `translateX(-50%) rotate(${secondDeg}deg)` }} />
      <div className="dt-clock-pivot" />
    </div>
  );
}

export default function DateTimeWindow() {
  const { closeWindow } = useWindowManager();
  const [now, setNow] = useState(() => new Date());
  const [tab, setTab] = useState("date");
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth());
  const [viewYear, setViewYear] = useState(() => new Date().getFullYear());
  const [dst, setDst] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeZone = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/_/g, " ");
    } catch {
      return "Local time";
    }
  }, []);

  const isCurrentMonth = viewMonth === now.getMonth() && viewYear === now.getFullYear();
  const total = daysInMonth(viewYear, viewMonth);
  const leadBlanks = mondayFirstIndex(new Date(viewYear, viewMonth, 1));
  const cells = [
    ...Array.from({ length: leadBlanks }, (_, i) => <td key={`b${i}`} className="empty" />),
    ...Array.from({ length: total }, (_, i) => {
      const day = i + 1;
      const isToday = isCurrentMonth && day === now.getDate();
      return (
        <td key={day} className={isToday ? "today" : undefined}>
          {day}
        </td>
      );
    }),
  ];
  const rows = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));

  const resetToToday = () => {
    setViewMonth(now.getMonth());
    setViewYear(now.getFullYear());
  };

  return (
    <div className="dt-dialog">
      <div className="dt-tabs">
        <div className={`dt-tab${tab === "date" ? " active" : ""}`} onClick={() => setTab("date")}>
          Date &amp; Time
        </div>
        <div className={`dt-tab${tab === "zone" ? " active" : ""}`} onClick={() => setTab("zone")}>
          Time Zone
        </div>
      </div>

      <div className="dt-tabpanel">
        {tab === "date" ? (
          <div className="dt-date-time-row">
            <div className="dt-groupbox dt-date-group">
              <span className="dt-groupbox-label">Date</span>
              <div className="dt-date-controls">
                <select
                  className="dt-select"
                  value={viewMonth}
                  onChange={(e) => setViewMonth(Number(e.target.value))}
                >
                  {MONTHS.map((m, i) => (
                    <option key={m} value={i}>
                      {m}
                    </option>
                  ))}
                </select>
                <div className="dt-spinner">
                  <input
                    className="dt-year-input"
                    type="text"
                    value={viewYear}
                    onChange={(e) => {
                      const v = parseInt(e.target.value, 10);
                      if (!Number.isNaN(v)) setViewYear(v);
                    }}
                  />
                  <div className="dt-spinner-btns">
                    <button type="button" onClick={() => setViewYear((y) => y + 1)}>
                      ▲
                    </button>
                    <button type="button" onClick={() => setViewYear((y) => y - 1)}>
                      ▼
                    </button>
                  </div>
                </div>
              </div>
              <table className="dt-cal-table">
                <thead>
                  <tr>
                    {WEEKDAYS.map((d) => (
                      <th key={d}>{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={i}>{row}</tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="dt-groupbox dt-time-group">
              <span className="dt-groupbox-label">Time</span>
              <ClockFace now={now} />
              <div className="dt-digital-row">
                <input className="dt-digital-input" type="text" value={formatDigital(now)} readOnly />
              </div>
            </div>
          </div>
        ) : (
          <div className="dt-zone-tab">
            <label className="dt-checkbox-row">
              <input type="checkbox" checked={dst} onChange={(e) => setDst(e.target.checked)} />
              Automatically adjust clock for daylight saving changes
            </label>
          </div>
        )}
      </div>

      <p className="dt-zone-footer">Current time zone: {timeZone}</p>

      <div className="dt-btn-row">
        <button className="dt-btn" onClick={() => closeWindow("datetime")}>
          OK
        </button>
        <button className="dt-btn" onClick={() => closeWindow("datetime")}>
          Cancel
        </button>
        <button className="dt-btn" disabled={isCurrentMonth} onClick={resetToToday}>
          Apply
        </button>
      </div>
    </div>
  );
}
