import { awards } from "../data/content";

export default function AwardsWindow() {
  return (
    <div>
      <h2>Honors &amp; Awards</h2>
      {awards.map((item) => (
        <div className="experience-entry" key={item.title}>
          <div className="experience-entry-head">
            <h3>{item.title}</h3>
            <span className="experience-date">{item.date}</span>
          </div>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
}
