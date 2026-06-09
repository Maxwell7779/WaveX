export default function Home({ setPage }) {
  return (
    <div className="home">
      <div className="home-hero">
        <div className="home-icon">W</div>
        <h1>Welcome to WaveX</h1>
        <p>
          Live Gold & BTC charts with Elliott Wave pattern predictions. Select a
          market from the sidebar to get started.
        </p>
      </div>

      <div className="home-cards">
        <button className="market-card" onClick={() => setPage("gold")}>
          <div className="card-icon gold">Au</div>
          <div className="card-info">
            <h3>Gold (XAU/USD)</h3>
            <p>Live candlestick chart with Elliott Wave analysis</p>
          </div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

        <button className="market-card" onClick={() => setPage("btc")}>
          <div className="card-icon btc">₿</div>
          <div className="card-info">
            <h3>Bitcoin (BTC/USD)</h3>
            <p>Live candlestick chart with Elliott Wave analysis</p>
          </div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <style>{`
        .home {
          max-width: 640px;
          margin: 0 auto;
          padding-top: 4rem;
        }
        .home-hero {
          text-align: center;
          margin-bottom: 3rem;
        }
        .home-icon {
          width: 48px;
          height: 48px;
          background: #1a1a1a;
          color: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 20px;
          margin: 0 auto 1.25rem;
        }
        .home-hero h1 {
          font-size: 1.75rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: var(--text);
        }
        .home-hero p {
          font-size: 15px;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 420px;
          margin: 0 auto;
        }
        .home-cards {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .market-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 10px;
          cursor: pointer;
          text-align: left;
          transition: all 0.15s;
          width: 100%;
        }
        .market-card:hover {
          background: var(--bg-secondary);
          border-color: #d0cfc9;
        }
        .card-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          flex-shrink: 0;
        }
        .card-icon.gold { background: #fef3c7; color: #92400e; }
        .card-icon.btc { background: #fff7ed; color: #c2410c; }
        .card-info { flex: 1; }
        .card-info h3 { font-size: 14px; font-weight: 500; color: var(--text); margin-bottom: 2px; }
        .card-info p { font-size: 13px; color: var(--text-muted); }
        .market-card svg { color: var(--text-muted); flex-shrink: 0; }
      `}</style>
    </div>
  );
}
