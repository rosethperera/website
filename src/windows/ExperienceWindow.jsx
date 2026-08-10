import { experiences } from "../data/content";

export default function ExperienceWindow() {
  return (
    <div>
      <h2>Work &amp; Technical Experience</h2>
      <p className="win-hint">Most recent first.</p>
      {experiences.map((item) => (
        <div className="experience-entry" key={item.slug}>
          <div className="experience-entry-head">
            <h3>{item.title}</h3>
            <span className="experience-date">{item.date}</span>
          </div>
          <p className="win-eyebrow">
            {item.org}
            {item.location ? ` · ${item.location}` : ""}
          </p>
          {item.highlight === "raises-the-bar" && (
            <p className="achievement-badge">🏆 Rated "raises the bar" by manager &amp; mentor</p>
          )}
          <ul className="win-list">
            {item.bullets.map((bullet) => (
              <li key={bullet.slice(0, 30)}>{bullet}</li>
            ))}
          </ul>
          {item.stack?.length > 0 && (
            <p>
              {item.stack.map((s) => (
                <span className="tag" key={s}>
                  {s}
                </span>
              ))}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
