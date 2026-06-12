export default function Sidebar({ page, setPage, markets }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">🌊</span>
        <span className="logo-text">WaveX</span>
      </div>

      <nav className="sidebar-nav">
        <p className="nav-label">Markets</p>
        <button
          type="button"
          className={`nav-item ${page === "home" ? "active" : ""}`}
          onClick={() => setPage("home")}
        >
          <span className="nav-icon">🌊</span>
          Home
        </button>
        {markets.map((market) => (
          <button
            type="button"
            key={market.id}
            className={`nav-item ${page === market.id ? "active" : ""}`}
            onClick={() => setPage(market.id)}
          >
            <span className="nav-icon">
              {market.accent.startsWith("/") ? (
                <img
                  src={market.accent}
                  alt={market.title}
                  className="nav-icon-image"
                />
              ) : (
                market.accent
              )}
            </span>
            {market.title}
          </button>
        ))}
      </nav>

      <style>{`
        .sidebar {
          width: var(--sidebar-width);
          min-width: var(--sidebar-width);
          height: 100vh;
          position: sticky;
          top: 0;
          background: #d8d5cc;
          border-right: 1px solid #c5c1b7;
          display: flex;
          flex-direction: column;
          padding: 1rem 0;
          overflow-y: auto;
        }
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem 1rem 1.75rem;
        }
        .logo-icon {
          width: 2.2rem;
          height: 2.2rem;
          background: #1a1a1a;
          color: white;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.1rem;
        }
        .logo-text {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text);
        }
        .sidebar-nav {
          flex: 1;
          padding: 0 0.75rem;
        }
        .nav-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 1rem;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: 100%;
          padding: 1rem 1.1rem;
          border: none;
          background: transparent;
          border-radius: 12px;
          cursor: pointer;
          font-size: 1.05rem;
          color: var(--text-muted);
          text-align: left;
          transition: all 0.18s ease;
          margin-bottom: 0.5rem;
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
          width: 2.4rem;
          height: 2.4rem;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.85);
          color: #1a1a1a;
          font-size: 1rem;
        }
        .nav-icon-image {
          width: 1.25rem;
          height: 1.25rem;
          object-fit: contain;
        }
      `}</style>
    </aside>
  );
}
