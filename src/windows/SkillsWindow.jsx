import { education, skillGroups } from "../data/content";

export default function SkillsWindow() {
  return (
    <div>
      <h2>Installed Hardware &amp; Software</h2>
      {skillGroups.map((group) => (
        <div key={group.title}>
          <h3>{group.title}</h3>
          <p>
            {group.items.map((item) => (
              <span className="tag" key={item}>
                {item}
              </span>
            ))}
          </p>
        </div>
      ))}
      <h3>Education</h3>
      <p>
        <strong>{education.school}</strong>
        <br />
        {education.degree}
        <br />
        {education.expected}
      </p>
      <p>
        {education.coursework.map((c) => (
          <span className="tag" key={c}>
            {c}
          </span>
        ))}
      </p>
    </div>
  );
}
