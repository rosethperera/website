import { useState } from "react";
import { profile } from "../data/content";

export default function MailComposerWindow({ project }) {
  const [subject, setSubject] = useState(`Inquiry about ${project.title}`);
  const [body, setBody] = useState(
    `Hey Roseth, I'd love to hear more about ${project.title}, would you be up for connecting sometime?`
  );
  const [from, setFrom] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!from.trim() || !from.includes("@")) {
      setError("Enter your email address so Roseth can reply.");
      return;
    }
    setError("");
    const fullBody = `${body}\n\nFrom: ${from}`;
    const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullBody)}`;
    window.location.href = mailto;
    setSent(true);
  };

  return (
    <div className="outlook-window">
      <div className="outlook-field">
        <span>To:</span>
        <span className="outlook-locked-field">{profile.email}</span>
      </div>
      <div className="outlook-field">
        <span>From:</span>
        <input
          className="outlook-input"
          type="email"
          placeholder="your@email.com"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
      </div>
      <div className="outlook-field">
        <span>Subject:</span>
        <input className="outlook-input" value={subject} onChange={(e) => setSubject(e.target.value)} />
      </div>
      <div className="outlook-body">
        <textarea className="outlook-textarea" rows={6} value={body} onChange={(e) => setBody(e.target.value)} />
      </div>
      {error && <p className="outlook-error">{error}</p>}
      {sent && <p className="outlook-sent">Your email client should now be open with this message ready to send.</p>}
      <div className="win-action-row">
        <button className="xp-btn" onClick={handleSend}>
          ✉️ Send
        </button>
      </div>
      <p className="win-hint">
        Send opens your own email app pre-filled with this message. Nothing leaves your device until you actually
        hit send there.
      </p>
    </div>
  );
}
