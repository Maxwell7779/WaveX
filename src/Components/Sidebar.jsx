export default function Sidebar({ page, setPage }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">W</span>
        <span className="logo-text">WaveX</span>
      </div>

      <nav className="sidebar-nav">
        <p className="nav-label">Markets</p>
        <button
          className={`nav-item ${page === "home" ? "active" : ""}`}
          onClick={() => setPage("home")}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9,22 9,12 15,12 15,22" />
          </svg>
          Home
        </button>
        <button
          className={`nav-item ${page === "gold" ? "active" : ""}`}
          onClick={() => setPage("gold")}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          Gold (XAU/USD)
        </button>
        <button
          className={`nav-item ${page === "btc" ? "active" : ""}`}
          onClick={() => setPage("btc")}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          Bitcoin (BTC/USD)
        </button>
      </nav>

      <div className="sidebar-footer">
        <p className="footer-text">WaveX · Elliott Wave Analysis</p>
      </div>

      <style>{`
        .sidebar {
          width: var(--sidebar-width);
          min-width: var(--sidebar-width);
          height: 100vh;
          background: var(--bg-secondary);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          padding: 1rem 0;
        }
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0.5rem 1rem 1.5rem;
        }
        .logo-icon {
          width: 28px;
          height: 28px;
          background: #1a1a1a;
          color: white;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
        }
        .logo-text {
          font-size: 15px;
          font-weight: 600;
          color: var(--text);
        }
        .sidebar-nav {
          flex: 1;
          padding: 0 0.5rem;
        }
        .nav-label {
          font-size: 11px;
          font-weight: 500;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0 0.75rem;
          margin-bottom: 4px;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 8px 12px;
          border: none;
          background: transparent;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          color: var(--text-muted);
          text-align: left;
          transition: all 0.15s;
          margin-bottom: 2px;
        }
        .nav-item:hover {
          background: var(--bg-hover);
          color: var(--text);
        }
        .nav-item.active {
          background: var(--bg-hover);
          color: var(--text);
          font-weight: 500;
        }
        .sidebar-footer {
          padding: 1rem;
          border-top: 1px solid var(--border);
        }
        .footer-text {
          font-size: 11px;
          color: var(--text-muted);
        }
      `}</style>
    </aside>
  );
}
