import { profile } from "../data/content";

export default function ResumeWindow() {
  return (
    <div className="resume-window">
      <div className="resume-toolbar">
        <a className="xp-btn" href={profile.resumePath} download>
          💾 Download PDF
        </a>
        <a className="xp-btn" href={profile.resumePath} target="_blank" rel="noreferrer">
          🔗 Open in new tab
        </a>
      </div>
      <div className="resume-frame-shell">
        <iframe className="resume-frame" src={`${profile.resumePath}#view=FitH`} title="Roseth Perera Resume PDF" />
      </div>
    </div>
  );
}
