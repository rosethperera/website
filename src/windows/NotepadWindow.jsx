import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";
import { moderateNote } from "../lib/noteModeration";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

function relativeTime(isoString) {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(isoString).toLocaleDateString();
}

export default function NotepadWindow({ project }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [draft, setDraft] = useState("");
  const [postError, setPostError] = useState("");
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from("notes")
        .select("id, text, created_at")
        .eq("project_slug", project.slug)
        .order("created_at", { ascending: false });
      if (cancelled) return;
      if (error) setLoadError("Couldn't load notes right now — try again in a bit.");
      else setNotes(data || []);
      setLoading(false);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [project.slug]);

  async function handlePost() {
    const result = moderateNote(draft);
    if (!result.ok) {
      setPostError(result.reason);
      return;
    }
    setPostError("");
    setPosting(true);
    const { data, error } = await supabase
      .from("notes")
      .insert({ project_slug: project.slug, text: result.text })
      .select("id, text, created_at")
      .single();
    setPosting(false);
    if (error) {
      setPostError("That note couldn't be posted — try again.");
      return;
    }
    setNotes((prev) => [data, ...prev]);
    setDraft("");
  }

  async function handleDelete(noteId) {
    const entered = window.prompt("Enter the admin password to delete this note:");
    if (entered === null) return;
    if (!ADMIN_PASSWORD || entered !== ADMIN_PASSWORD) {
      window.alert("Incorrect password.");
      return;
    }
    const { error } = await supabase.from("notes").delete().eq("id", noteId);
    if (error) {
      window.alert("Couldn't delete that note — try again.");
      return;
    }
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="notepad-window">
        <div className="notepad-notice">
          <p className="notepad-notice-icon">📝</p>
          <h3>Notepad isn't set up yet</h3>
          <p>This project's public notepad needs a Supabase project connected before notes can be posted.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="notepad-window">
      <div className="notepad-compose">
        <textarea
          className="notepad-textarea"
          rows={3}
          placeholder={`Leave a note about ${project.title}…`}
          value={draft}
          maxLength={500}
          onChange={(e) => setDraft(e.target.value)}
        />
        {postError && <p className="outlook-error">{postError}</p>}
        <div className="win-action-row">
          <button className="xp-btn" onClick={handlePost} disabled={posting || !draft.trim()}>
            📌 {posting ? "Posting…" : "Post note"}
          </button>
        </div>
      </div>

      <div className="notepad-list">
        {loading && <p className="win-hint">Loading notes…</p>}
        {loadError && <p className="outlook-error">{loadError}</p>}
        {!loading && !loadError && notes.length === 0 && (
          <p className="win-hint">No notes yet — be the first to leave one.</p>
        )}
        {notes.map((note) => (
          <div className="notepad-entry" key={note.id}>
            <p className="notepad-entry-text">{note.text}</p>
            <div className="notepad-entry-meta">
              <span>{relativeTime(note.created_at)}</span>
              <button className="notepad-delete-btn" title="Delete note" onClick={() => handleDelete(note.id)}>
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
