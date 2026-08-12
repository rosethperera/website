import { posts } from "../lib/posts";
import { renderMarkdown } from "../lib/markdown";

export default function PostWindow({ slug }) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="post-reader">
      <h2>{post.title}</h2>
      <p className="win-eyebrow">{post.date}</p>
      <div className="post-reader-body">{renderMarkdown(post.body)}</div>
    </div>
  );
}
