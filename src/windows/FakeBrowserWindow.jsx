import { useEffect, useRef, useState } from "react";

const IFRAME_LOAD_TIMEOUT_MS = 3500;

function faviconFor(mode) {
  return mode === "repo" ? "🐙" : "🌐";
}

export default function FakeBrowserWindow({ project, mode }) {
  const url = mode === "repo" ? project.repoUrl : project.liveUrl;
  const status = mode === "repo" ? project.repoStatus : project.liveStatus;
  const note = mode === "repo" ? project.repoNote : project.liveNote;

  // GitHub sends X-Frame-Options: deny / frame-ancestors 'none' (confirmed),
  // so repo links never attempt an iframe — straight to the fallback card
  // with a real "open in new tab" escape hatch. Live-deployment hosts vary,
  // so those get a real attempt with a load-timeout fallback.
  const [iframeFailed, setIframeFailed] = useState(mode === "repo");
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (mode !== "live" || !url) return;
    timeoutRef.current = window.setTimeout(() => {
      if (!iframeLoaded) setIframeFailed(true);
    }, IFRAME_LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, url]);

  const addressText = url || (status === "private" ? "file:///private/access-denied" : "about:blank");

  return (
    <div className="browser-window">
      <div className="browser-toolbar">
        <button className="browser-nav-btn" disabled title="Back">
          &#8592;
        </button>
        <button className="browser-nav-btn" disabled title="Forward">
          &#8594;
        </button>
        <button
          className="browser-nav-btn"
          title="Refresh"
          onClick={() => {
            setIframeLoaded(false);
            setIframeFailed(mode === "repo" || !url);
          }}
        >
          &#8635;
        </button>
        <div className="browser-address-bar">
          <span className="browser-favicon">{faviconFor(mode)}</span>
          {addressText}
        </div>
      </div>

      <div className="browser-content">
        {url && !iframeFailed && (
          <iframe
            key={url}
            className="browser-iframe"
            src={url}
            title={`${project.title} — ${mode === "repo" ? "Repository" : "Live site"}`}
            onLoad={() => setIframeLoaded(true)}
            onError={() => setIframeFailed(true)}
          />
        )}

        {(iframeFailed || !url) && (
          <div className="browser-fallback">
            {status === "private" && (
              <div className="browser-notice">
                <p className="browser-notice-icon">🔒</p>
                <h3>This project's code is private</h3>
                <p>{note || "Amazon internal code — no public repository exists for this project."}</p>
              </div>
            )}
            {status === "none" && (
              <div className="browser-notice">
                <p className="browser-notice-icon">🚫</p>
                <h3>No live deployment</h3>
                <p>{note || "This project has no public live deployment to visit."}</p>
              </div>
            )}
            {status === "pending" && (
              <div className="browser-notice">
                <p className="browser-notice-icon">🔧</p>
                <h3>Link coming soon</h3>
                <p>This one hasn't been wired up yet — check back soon.</p>
              </div>
            )}
            {url && status !== "private" && status !== "none" && status !== "pending" && (
              <div className="browser-notice">
                <p className="browser-notice-icon">{faviconFor(mode)}</p>
                <h3>{project.title}</h3>
                <p>
                  {mode === "repo"
                    ? "GitHub blocks embedding repositories in other sites, so this can't be shown inline."
                    : "This site couldn't be embedded here."}
                </p>
              </div>
            )}
            {url && (
              <button className="xp-btn browser-open-tab" onClick={() => window.open(url, "_blank", "noopener,noreferrer")}>
                🔗 Open in new tab
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
