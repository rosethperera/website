import { useNavigate } from "./NavigationContext";

export default function Clippy() {
  const openWindow = useNavigate();

  return (
    <>
      <div className="clippy" onClick={() => openWindow("about")} role="button" tabIndex={0}>
        📎
      </div>
      <div className="clippy-bubble">It looks like you're checking out my portfolio. Try double-clicking an icon!</div>
    </>
  );
}
