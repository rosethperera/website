import { Filter } from "bad-words";

const filter = new Filter();

const MIN_LENGTH = 2;
const MAX_LENGTH = 500;
const URL_PATTERN = /https?:\/\/\S+/gi;

// Basic first-line-of-defense filter, not a guarantee. The admin
// password-gated delete flow is the real backstop for anything that slips
// through (see NotepadWindow).
export function moderateNote(rawText) {
  const text = rawText.trim();

  if (text.length < MIN_LENGTH) {
    return { ok: false, reason: "That note's a little too short, try adding some detail." };
  }
  if (text.length > MAX_LENGTH) {
    return { ok: false, reason: `Keep it under ${MAX_LENGTH} characters.` };
  }
  if (filter.isProfane(text)) {
    return { ok: false, reason: "That note couldn't be posted, try rephrasing." };
  }

  const urlMatches = text.match(URL_PATTERN) || [];
  const textWithoutUrls = text.replace(URL_PATTERN, "").trim();
  if (urlMatches.length > 0 && textWithoutUrls.length < 10) {
    return { ok: false, reason: "That note couldn't be posted, try rephrasing." };
  }

  const letters = text.replace(/[^a-zA-Z]/g, "");
  if (letters.length > 12 && letters === letters.toUpperCase()) {
    return { ok: false, reason: "That note couldn't be posted, try rephrasing." };
  }

  return { ok: true, text };
}
