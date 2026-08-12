import { posts } from "../lib/posts";
import { useNavigate } from "../os/NavigationContext";

export default function WritingWindow() {
  const openWindow = useNavigate();

  return (
    <div>
      <h2>Writing</h2>
      <p className="win-hint">Notes on things I built and what broke along the way.</p>
      <ul className="win-list post-list">
        {posts.map((post) => {
          const id = `post-${post.slug}`;
          return (
            <li
              key={post.slug}
              className="post-list-item"
              onDoubleClick={() => openWindow(id)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => (e.key === "Enter" ? openWindow(id) : null)}
            >
              <span className="post-list-title">📝 {post.title}</span>
              <span className="post-list-date">{post.date}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
