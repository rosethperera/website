import { profile } from "../data/content";

export default function ContactWindow() {
  return (
    <div className="outlook-window">
      <div className="outlook-field">
        <span>To:</span>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </div>
      <div className="outlook-field">
        <span>Subject:</span>
        <span>Let's connect</span>
      </div>
      <div className="outlook-body">
        <p>
          Interested in engineering, energy systems, sustainable infrastructure, or technical
          collaboration? I'd love to connect.
        </p>
        <p>Reach me directly through any of the links below:</p>
      </div>
      <div className="win-action-row">
        <a className="xp-btn" href={`mailto:${profile.email}`}>
          ✉️ Email
        </a>
        <a className="xp-btn" href={profile.linkedin} target="_blank" rel="noreferrer">
          🔗 LinkedIn
        </a>
        <a className="xp-btn" href={profile.github} target="_blank" rel="noreferrer">
          🔗 GitHub
        </a>
      </div>
    </div>
  );
}
