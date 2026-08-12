import { useState } from "react";
import { aboutText, awards, education, experiences, featuredProjects, profile, skillGroups } from "../data/content";
import { windowRegistry } from "../os/windowRegistry";
import { NavigationProvider } from "../os/NavigationContext";

const ICON_GRID = [
  { id: "mycomputer", label: "My Computer", glyph: "🖥️", bg: "linear-gradient(155deg,#e6edf5,#a8bcd6)" },
  { id: "mybuilds", label: "My Builds", glyph: "📁", bg: "linear-gradient(155deg,#ffe28a,#e0a83a)" },
  { id: "experience", label: "Experience", glyph: "📄", bg: "linear-gradient(155deg,#dfe9ff,#a9c3f0)" },
  { id: "skills", label: "Skills", glyph: "⚙️", bg: "linear-gradient(155deg,#e8e8e8,#b9c0cc)" },
  { id: "awards", label: "Awards", glyph: "🏆", bg: "linear-gradient(155deg,#fff2b0,#e0b23a)" },
  { id: "resume", label: "resume.pdf", glyph: "📄", bg: "linear-gradient(155deg,#fff,#d7e3f5)" },
  { id: "contact", label: "Contact Me", glyph: "✉️", bg: "linear-gradient(155deg,#a8d8ff,#3f88d6)" },
  { id: "recyclebin", label: "Recycle Bin", glyph: "🗑️", bg: "linear-gradient(155deg,#dfe6ee,#aab6c4)" },
];

function FullscreenWindow({ id, onClose }) {
  const def = windowRegistry[id];
  if (!def) return null;
  const Content = def.Content;
  return (
    <div className="mobile-fullscreen-window">
      <div className="titlebar">
        <div className="tb-left">
          <span className="tb-icon">{def.icon}</span>
          <span className="tb-title">{def.title}</span>
        </div>
        <div className="tb-btns">
          <div className="tb-btn close" onClick={onClose}>
            &times;
          </div>
        </div>
      </div>
      <div className="winbody">
        <Content {...(def.contentProps || {})} />
      </div>
    </div>
  );
}

export default function MobileView() {
  const [activeWindow, setActiveWindow] = useState(null);

  return (
    <NavigationProvider navigate={setActiveWindow}>
    <div className="mobile-app">
      <header className="mobile-hero">
        <h1>{profile.name}</h1>
        <p>{profile.tagline}</p>
        <span className="mobile-hero-badge">🏆 “Raises the bar,” Amazon SDE Internship, Summer 2026</span>
      </header>

      <nav className="mobile-icon-grid">
        {ICON_GRID.map((icon) => (
          <button key={icon.id} className="mobile-icon" onClick={() => setActiveWindow(icon.id)}>
            <div className="ico" style={{ background: icon.bg }}>
              {icon.glyph}
            </div>
            <div className="lbl">{icon.label}</div>
          </button>
        ))}
      </nav>
      <p className="mobile-game-note">
        The full draggable XP desktop, plus playable Tetris &amp; Pac-Man, is available on desktop browsers.
      </p>

      <div className="mobile-sections">
        <section className="mobile-section">
          <div className="mobile-section-header">🖥️ About Me</div>
          <div className="mobile-section-body">
            {aboutText.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </section>

        <section className="mobile-section">
          <div className="mobile-section-header">📁 My Builds</div>
          <div className="mobile-section-body">
            {featuredProjects.map((project) => (
              <div
                key={project.slug}
                className="experience-entry"
                role="button"
                tabIndex={0}
                onClick={() => setActiveWindow(`project-${project.slug}`)}
              >
                <div className="experience-entry-head">
                  <h3>{project.title}</h3>
                  <span className="experience-date">{project.date}</span>
                </div>
                <p>{project.impact}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mobile-section">
          <div className="mobile-section-header">📄 Experience</div>
          <div className="mobile-section-body">
            {experiences.map((item) => (
              <div className="experience-entry" key={item.slug}>
                <div className="experience-entry-head">
                  <h3>{item.title}</h3>
                  <span className="experience-date">{item.date}</span>
                </div>
                <p className="win-eyebrow">{item.org}</p>
                <p>{item.summary}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mobile-section">
          <div className="mobile-section-header">⚙️ Skills</div>
          <div className="mobile-section-body">
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
          </div>
        </section>

        <section className="mobile-section">
          <div className="mobile-section-header">🏆 Awards</div>
          <div className="mobile-section-body">
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
        </section>

        <section className="mobile-section">
          <div className="mobile-section-header">✉️ Contact</div>
          <div className="mobile-section-body">
            <div className="win-action-row">
              <a className="xp-btn" href={`mailto:${profile.email}`}>
                ✉️ {profile.email}
              </a>
              <a className="xp-btn" href={profile.linkedin} target="_blank" rel="noreferrer">
                🔗 LinkedIn
              </a>
              <a className="xp-btn" href={profile.github} target="_blank" rel="noreferrer">
                🔗 GitHub
              </a>
              <a className="xp-btn" href={profile.resumePath} download>
                💾 Download Resume
              </a>
            </div>
          </div>
        </section>
      </div>

      <p className="mobile-footer">© {new Date().getFullYear()} Roseth Perera. Tap an icon above to explore.</p>

      {activeWindow && <FullscreenWindow id={activeWindow} onClose={() => setActiveWindow(null)} />}
    </div>
    </NavigationProvider>
  );
}
