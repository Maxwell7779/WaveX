export default function Sidebar({ page, setPage, markets }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">W</span>
        <span className="logo-text">WaveX</span>
      </div>

      <nav className="sidebar-nav">
        <p className="nav-label">Markets</p>
        <button
          type="button"
          className={`nav-item ${page === "home" ? "active" : ""}`}
          onClick={() => setPage("home")}
        >
          <span className="nav-icon">🏠</span>
          Home
        </button>
        {markets.map((market) => (
          <button
            type="button"
            key={market.id}
            className={`nav-item ${page === market.id ? "active" : ""}`}
            onClick={() => setPage(market.id)}
          >
            <span className="nav-icon">{market.accent}</span>
            {market.title}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p className="footer-title">WaveX insights</p>
        <p className="footer-text">
          Clean market charts with Elliott Wave analysis for today’s top
          instruments.
        </p>
      </div>

      <style>{`
        .sidebar {
          width: var(--sidebar-width);
          min-width: var(--sidebar-width);
          height: 100vh;
          position: sticky;
          top: 0;
          background: var(--bg-secondary);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          padding: 1rem 0;
          overflow-y: auto;
        }
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0.75rem 1rem 1.5rem;
        }
        .logo-icon {
          width: 34px;
          height: 34px;
          background: #1a1a1a;
          color: white;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 16px;
        }
        .logo-text {
          font-size: 15px;
          font-weight: 700;
          color: var(--text);
        }
        .sidebar-nav {
          flex: 1;
          padding: 0 0.75rem;
        }
        .nav-label {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.75rem;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 12px 14px;
          border: none;
          background: transparent;
          border-radius: 12px;
          cursor: pointer;
          font-size: 14px;
          color: var(--text-muted);
          text-align: left;
          transition: all 0.18s ease;
          margin-bottom: 6px;
        }
        .nav-item:hover {
          background: var(--bg);
          color: var(--text);
          transform: translateX(2px);
        }
        .nav-item.active {
          background: white;
          color: var(--text);
          font-weight: 600;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
        }
        .nav-icon {
          width: 28px;
          height: 28px;
          display: grid;
          place-items: center;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.8);
          color: #1a1a1a;
          font-size: 13px;
        }
        .sidebar-footer {
          padding: 1rem 1rem 1.25rem;
          border-top: 1px solid var(--border);
        }
        .footer-title {
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 4px;
          color: var(--text);
        }
        .footer-text {
          font-size: 12px;
          color: var(--text-muted);
          line-height: 1.5;
          margin: 0;
        }
      `}</style>
    </aside>
  );
}
