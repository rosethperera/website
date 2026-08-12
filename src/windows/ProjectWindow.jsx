import { featuredProjects } from "../data/content";

function TagList({ items }) {
  return (
    <p>
      {items.map((item) => (
        <span className="tag" key={item}>
          {item}
        </span>
      ))}
    </p>
  );
}

function BulletList({ items }) {
  return (
    <ul className="win-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function ProjectWindow({ slug }) {
  const project = featuredProjects.find((p) => p.slug === slug);
  if (!project) return <p>Project not found.</p>;

  return (
    <div>
      <h2>{project.title}</h2>
      <p className="win-eyebrow">
        {project.category} · {project.date}
      </p>
      <p>
        <strong>{project.impact}</strong>
      </p>
      <p>{project.summary}</p>

      <h3>My Role</h3>
      <p>{project.role}</p>

      <h3>Stack</h3>
      <TagList items={project.stack} />

      <h3>System Design</h3>
      <BulletList items={project.systemDesign} />

      <h3>Challenges</h3>
      <BulletList items={project.challenges} />

      <h3>Results</h3>
      <BulletList items={project.results} />

      <h3>Reflection</h3>
      <p>{project.reflection}</p>

      <h3>Key Metrics</h3>
      <TagList items={project.metrics} />

      {project.gallery && (
        <>
          <h3>Project Media</h3>
          <div className="project-gallery">
            {project.gallery.map((item) => (
              <figure key={item.src} className="project-gallery-item">
                <img src={item.src} alt={item.alt} loading="lazy" />
                <figcaption>{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
