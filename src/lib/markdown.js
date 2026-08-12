// Minimal, dependency-free Markdown renderer for post bodies. Supports the
// subset used by writeups on this site: headings, paragraphs, bold/italic,
// inline code, code fences, links, blockquotes, and unordered lists.
import { Fragment, createElement } from "react";

function renderInline(text, keyPrefix) {
  const nodes = [];
  const pattern = /(\*\*.+?\*\*|\*.+?\*|`.+?`|\[.+?\]\(.+?\))/g;
  let lastIndex = 0;
  let match;
  let i = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const token = match[0];
    const key = `${keyPrefix}-${i++}`;
    if (token.startsWith("**")) {
      nodes.push(createElement("strong", { key }, token.slice(2, -2)));
    } else if (token.startsWith("`")) {
      nodes.push(createElement("code", { key }, token.slice(1, -1)));
    } else if (token.startsWith("[")) {
      const linkMatch = token.match(/^\[(.+?)\]\((.+?)\)$/);
      nodes.push(
        createElement("a", { key, href: linkMatch[2], target: "_blank", rel: "noreferrer" }, linkMatch[1])
      );
    } else if (token.startsWith("*")) {
      nodes.push(createElement("em", { key }, token.slice(1, -1)));
    }
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

export function renderMarkdown(body) {
  const lines = body.split("\n");
  const blocks = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i++;
      continue;
    }

    if (line.startsWith("```")) {
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      blocks.push(createElement("pre", { key: key++ }, createElement("code", null, codeLines.join("\n"))));
      continue;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.*)$/);
    if (headingMatch) {
      const tag = `h${headingMatch[1].length + 1}`;
      blocks.push(createElement(tag, { key: key++ }, renderInline(headingMatch[2], `k${key}`)));
      i++;
      continue;
    }

    if (line.startsWith("> ")) {
      const quoteLines = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      blocks.push(createElement("blockquote", { key: key++ }, quoteLines.join(" ")));
      continue;
    }

    if (line.startsWith("- ")) {
      const items = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      blocks.push(
        createElement(
          "ul",
          { key: key++, className: "win-list" },
          items.map((item, idx) => createElement("li", { key: idx }, renderInline(item, `li${key}-${idx}`)))
        )
      );
      continue;
    }

    const paraLines = [];
    while (i < lines.length && lines[i].trim() !== "" && !lines[i].match(/^(#{1,3}\s|```|> |- )/)) {
      paraLines.push(lines[i]);
      i++;
    }
    blocks.push(createElement("p", { key: key++ }, renderInline(paraLines.join(" "), `p${key}`)));
  }

  return createElement(Fragment, null, blocks);
}
