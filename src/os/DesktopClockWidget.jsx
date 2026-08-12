import { useEffect, useState } from "react";
import { useNavigate } from "./NavigationContext";

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatTime(date) {
  let h = date.getHours();
  const m = String(date.getMinutes()).padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return { h, m, ampm };
}

export default function DesktopClockWidget() {
  const openWindow = useNavigate();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const { h, m, ampm } = formatTime(now);
  const dateLabel = `${WEEKDAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}`;

  return (
    <div className="clock-widget" onDoubleClick={() => openWindow("datetime")} title="Double-click for Date/Time Properties">
      <div className="clock-widget-time">
        {h}:{m} <span className="clock-widget-ampm">{ampm}</span>
      </div>
      <div className="clock-widget-date">{dateLabel}</div>
    </div>
  );
}
