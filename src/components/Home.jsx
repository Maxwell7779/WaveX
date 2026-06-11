export default function Home({ setPage, markets }) {
  return (
    <div className="home">
      <div className="home-hero">
        <div className="home-icon">🌊</div>
        <h1>Welcome To WaveX</h1>
        <p>Free Elliott Wave theory predictions and real time charts.</p>
      </div>

      <div className="home-grid">
        {markets.map((market) => (
          <button
            type="button"
            key={market.id}
            className="market-card"
            onClick={() => setPage(market.id)}
          >
            <div className={`card-icon ${market.id}`}>
              {market.accent.startsWith("/") ? (
                <img
                  src={market.accent}
                  alt={market.title}
                  className="card-icon-image"
                />
              ) : (
                market.accent
              )}
            </div>
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
          padding-top: 3rem;
        }
        .home-hero {
          text-align: center;
          margin-bottom: 2.5rem;
          padding: 2.5rem;
          background: white;
          border: 1px solid var(--border);
          border-radius: 20px;
          box-shadow: 0 20px 45px rgba(20, 20, 20, 0.04);
        }
        .home-icon {
          width: 3.25rem;
          height: 3.25rem;
          background: #1a1a1a;
          color: white;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.05rem;
          margin: 0 auto 1.25rem;
        }
        .home-hero h1 {
          font-family: var(--font-serif);
          font-size: 2.6rem;
          line-height: 1.15;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text);
        }
        .home-hero p {
          font-size: 1.05rem;
          color: var(--text-muted);
          line-height: 1.75;
          max-width: 70ch;
          margin: 0 auto;
        }
        .home-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.5rem;
        }
        .market-card {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          width: 100%;
          padding: 1.75rem;
          border-radius: 1rem;
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
          width: 4.5rem;
          height: 4.5rem;
          border-radius: 16px;
          display: grid;
          place-items: center;
          font-size: 1.4rem;
          font-weight: 700;
          color: #1a1a1a;
          flex-shrink: 0;
          background: var(--bg-secondary);
        }
        .card-icon-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .card-icon.gold { background: #fef3c7; }
        .card-icon.btc { background: #fff7ed; }
        .card-icon.eth { background: #eef2ff; }
        .card-icon.oil { background: #fff1f2; }
        .card-info { flex: 1; min-width: 0; }
        .card-info h3 {
          margin: 0 0 0.75rem;
          font-family: var(--font-serif);
          font-size: 1.3rem;
          line-height: 1.2;
          font-weight: 700;
          color: var(--text);
        }
        .card-info p {
          margin: 0;
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.6;
        }
        .card-arrow {
          font-size: 1.35rem;
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
