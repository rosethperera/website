// Drop a new .md file into src/posts/ to publish a post. No component
// changes needed: this loader picks it up automatically at build time.
const modules = import.meta.glob("../posts/*.md", { eager: true, query: "?raw", import: "default" });

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw.trim() };
  const [, frontmatter, body] = match;
  const meta = {};
  frontmatter.split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    meta[key] = value;
  });
  return { meta, body: body.trim() };
}

export const posts = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.split("/").pop().replace(/\.md$/, "");
    const { meta, body } = parseFrontmatter(raw);
    return { slug, title: meta.title || slug, date: meta.date || "", excerpt: meta.excerpt || "", body };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));
