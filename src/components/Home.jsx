export default function Home({ setPage, markets }) {
  return (
    <div className="home">
      <div className="home-hero">
        <div className="home-icon">W</div>
        <h1>WaveX Market Dashboard</h1>
        <p>
          Explore the freshest charts for gold, crypto and energy. Tap any
          market to open a clean Elliott Wave chart view.
        </p>
      </div>

      <div className="home-grid">
        {markets.map((market) => (
          <button
            type="button"
            key={market.id}
            className="market-card"
            onClick={() => setPage(market.id)}
          >
            <div className={`card-icon ${market.id}`}>{market.accent}</div>
            <div className="card-info">
              <h3>{market.title}</h3>
              <p>{market.subtitle}</p>
            </div>
            <span className="card-arrow">→</span>
          </button>
        ))}
      </div>

      <style>{`
        .home {
          width: 100%;
          padding-top: 1.25rem;
        }
        .home-hero {
          text-align: center;
          margin-bottom: 1.25rem;
          padding: 1.5rem;
          background: white;
          border: 1px solid var(--border);
          border-radius: 20px;
          box-shadow: 0 20px 45px rgba(20, 20, 20, 0.04);
        }
        .home-icon {
          width: 52px;
          height: 52px;
          background: #1a1a1a;
          color: white;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 20px;
          margin: 0 auto 0.75rem;
        }
        .home-hero h1 {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text);
        }
        .home-hero p {
          font-size: 15px;
          color: var(--text-muted);
          line-height: 1.65;
          max-width: 560px;
          margin: 0 auto;
        }
        .home-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }
        .market-card {
          display: flex;
          align-items: center;
          gap: 1.1rem;
          width: 100%;
          padding: 1.4rem 1.5rem;
          border-radius: 18px;
          background: white;
          border: 1px solid var(--border);
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
          text-align: left;
        }
        .market-card:hover {
          transform: translateY(-2px);
          border-color: #dcdad5;
          box-shadow: 0 18px 40px rgba(20, 20, 20, 0.05);
        }
        .card-icon {
          width: 62px;
          height: 62px;
          border-radius: 16px;
          display: grid;
          place-items: center;
          font-size: 22px;
          font-weight: 700;
          color: #1a1a1a;
          flex-shrink: 0;
          background: var(--bg-secondary);
        }
        .card-icon.gold { background: #fef3c7; }
        .card-icon.btc  { background: #fff7ed; }
        .card-icon.eth  { background: #eef2ff; }
        .card-icon.oil  { background: #fff1f2; }
        .card-info { flex: 1; min-width: 0; }
        .card-info h3 {
          margin: 0 0 0.3rem;
          font-size: 18px;
          font-weight: 700;
          color: var(--text);
        }
        .card-info p {
          margin: 0;
          color: var(--text-muted);
          font-size: 14px;
          line-height: 1.5;
        }
        .card-arrow {
          font-size: 22px;
          color: var(--text-muted);
        }
        @media (max-width: 900px) {
          .home-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
