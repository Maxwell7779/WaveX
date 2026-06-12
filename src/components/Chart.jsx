import { useEffect, useRef, useState } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";

const API_KEY = import.meta.env.VITE_TWELVE_DATA_API_KEY;

const TIMEFRAMES = [
  { label: "1H", value: "1h" },
  { label: "4H", value: "4h" },
  { label: "1D", value: "1day" },
  { label: "1W", value: "1week" },
  { label: "1M", value: "1month" },
];

const ZOOM_RANGES = [
  { label: "Recent 20", value: "20" },
  { label: "Recent 40", value: "40" },
  { label: "Recent 60", value: "60" },
  { label: "All", value: "all" },
];

function detectElliottWaves(candles) {
  if (candles.length < 10) return [];
  const waves = [];
  const closes = candles.map((c) => c.close);
  const pivots = [];

  for (let i = 2; i < closes.length - 2; i++) {
    const isHigh =
      closes[i] > closes[i - 1] &&
      closes[i] > closes[i - 2] &&
      closes[i] > closes[i + 1] &&
      closes[i] > closes[i + 2];
    const isLow =
      closes[i] < closes[i - 1] &&
      closes[i] < closes[i - 2] &&
      closes[i] < closes[i + 1] &&
      closes[i] < closes[i + 2];
    if (isHigh)
      pivots.push({
        index: i,
        type: "high",
        value: closes[i],
        time: candles[i].time,
      });
    if (isLow)
      pivots.push({
        index: i,
        type: "low",
        value: closes[i],
        time: candles[i].time,
      });
  }

  const labels = ["1", "2", "3", "4", "5", "A", "B", "C"];
  pivots.slice(-8).forEach((p, i) => {
    waves.push({ time: p.time, value: p.value, label: labels[i] || "?" });
  });
  return waves;
}

export default function Chart({ symbol, title }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const seriesRef = useRef(null);
  const candlesRef = useRef([]);
  const [waves, setWaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(null);
  const [change, setChange] = useState(null);
  const [interval, setInterval] = useState("1h");
  const [zoomRange, setZoomRange] = useState("60");
  const [error, setError] = useState(null);

  const applyZoomRange = (candles) => {
    if (!chartInstance.current || !candles.length) return;

    if (zoomRange === "all") {
      chartInstance.current.timeScale().fitContent();
      return;
    }

    const visibleCount = Math.min(candles.length, parseInt(zoomRange, 10));
    const fromIndex = Math.max(0, candles.length - visibleCount);
    chartInstance.current.timeScale().setVisibleRange({
      from: candles[fromIndex].time,
      to: candles[candles.length - 1].time,
    });
  };

  useEffect(() => {
    if (!chartRef.current) return;

    const chartHeight = Math.floor(window.innerHeight * 0.62);

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: chartHeight,
      layout: { background: { color: "#ffffff" }, textColor: "#555" },
      grid: {
        vertLines: { color: "#f4f3f0" },
        horzLines: { color: "#f4f3f0" },
      },
      crosshair: { mode: 1 },
      rightPriceScale: { borderColor: "#e8e7e3" },
      timeScale: {
        borderColor: "#e8e7e3",
        timeVisible: true,
        rightOffset: 12,
        barSpacing: 4,
        minBarSpacing: 1,
        fixRightEdge: true,
      },
    });

    chartInstance.current = chart;
    seriesRef.current = chart.addSeries(CandlestickSeries, {
      upColor: "#16a34a",
      downColor: "#dc2626",
      borderVisible: false,
      wickUpColor: "#16a34a",
      wickDownColor: "#dc2626",
    });

    const ro = new ResizeObserver(() => {
      if (chartInstance.current && chartRef.current) {
        chartInstance.current.applyOptions({
          width: chartRef.current.clientWidth,
        });
      }
    });
    ro.observe(chartRef.current);
    return () => {
      ro.disconnect();
      chartInstance.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!seriesRef.current) return;
    setLoading(true);
    setError(null);

    fetch(
      `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&outputsize=100&apikey=${API_KEY}`,
    )
      .then((r) => r.json())
      .then((data) => {
        if (!data || data.status === "error" || !data.values) {
          throw new Error(data?.message || "No chart data available");
        }

        const candles = data.values.reverse().map((d) => ({
          time: Math.floor(new Date(d.datetime).getTime() / 1000),
          open: parseFloat(d.open),
          high: parseFloat(d.high),
          low: parseFloat(d.low),
          close: parseFloat(d.close),
        }));

        if (candles.length < 2) {
          throw new Error("Not enough candle data to render chart.");
        }

        seriesRef.current.setData(candles);
        const last = candles[candles.length - 1];
        const prev = candles[candles.length - 2];
        setPrice(last.close);
        setChange((((last.close - prev.close) / prev.close) * 100).toFixed(2));
        setWaves(detectElliottWaves(candles));
        candlesRef.current = candles;
        applyZoomRange(candles);
      })
      .catch((err) => {
        console.error("Chart data error:", err);
        setError(err.message || "Failed to load chart data.");
      })
      .finally(() => setLoading(false));
  }, [symbol, interval]);

  useEffect(() => {
    applyZoomRange(candlesRef.current);
  }, [zoomRange]);

  const currentWave = waves[waves.length - 1];
  const isUp = change > 0;
  const selectedTimeframe =
    TIMEFRAMES.find((item) => item.value === interval)?.label || "1H";

  return (
    <div className="chart-page">
      <div className="chart-header">
        <div>
          <h2 className="chart-title">{title}</h2>
          <p className="chart-symbol">
            {symbol} · {selectedTimeframe}
          </p>
        </div>
        <div className="chart-actions">
          <div className="interval-select">
            <label htmlFor="timeframe">Interval</label>
            <select
              id="timeframe"
              value={interval}
              onChange={(event) => setInterval(event.target.value)}
            >
              {TIMEFRAMES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div className="zoom-select">
            <label htmlFor="zoomRange">Zoom range</label>
            <select
              id="zoomRange"
              value={zoomRange}
              onChange={(event) => setZoomRange(event.target.value)}
            >
              {ZOOM_RANGES.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
          {price && (
            <div className="chart-price">
              <span className="price-value">${price.toLocaleString()}</span>
              <span className={`price-change ${isUp ? "up" : "down"}`}>
                {isUp ? "+" : ""}
                {change}%
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="chart-container">
        <div ref={chartRef} style={{ width: "100%" }} />
        {loading && <div className="chart-overlay">Loading chart data...</div>}
        {!loading && error && <div className="chart-overlay">{error}</div>}
      </div>

      {waves.length > 0 && !loading && !error && (
        <div className="wave-panel">
          <h3 className="wave-title">Elliott Wave Analysis</h3>
          <div className="wave-badges">
            {waves.map((w, i) => (
              <span
                key={i}
                className={`wave-badge ${
                  i === waves.length - 1
                    ? "wave-current"
                    : i < 5
                      ? "wave-impulse"
                      : "wave-corrective"
                }`}
              >
                Wave {w.label}
              </span>
            ))}
          </div>
          {currentWave && (
            <p className="wave-desc">
              Currently at <strong>Wave {currentWave.label}</strong> —{" "}
              {parseInt(currentWave.label) <= 5
                ? "Impulse phase"
                : "Corrective phase"}
            </p>
          )}
        </div>
      )}

      <style>{`
        .chart-page { width: 100%; }
        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .chart-title {
          font-family: var(--font-serif);
          font-size: 2.4rem;
          line-height: 1.15;
          font-weight: 700;
          margin-bottom: 0.35rem;
        }
        .chart-symbol {
          font-size: 0.95rem;
          color: var(--text-muted);
        }
        .chart-actions {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-wrap: wrap;
        }
        .interval-select {
          display: inline-flex;
          flex-direction: column;
          gap: 0.75rem;
          font-size: 0.95rem;
          color: var(--text-muted);
        }
        .interval-select label { font-weight: 600; }
        .interval-select select {
          min-width: 110px;
          padding: 0.75rem 0.9rem;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: white;
          color: var(--text);
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .interval-select select:focus,
        .zoom-select select:focus {
          border-color: #b9b4a8;
          box-shadow: 0 0 0 4px rgba(228, 226, 217, 0.45);
        }
        .zoom-select {
          display: inline-flex;
          flex-direction: column;
          gap: 0.75rem;
          font-size: 0.95rem;
          color: var(--text-muted);
        }
        .zoom-select label { font-weight: 600; }
        .zoom-select select {
          min-width: 130px;
          padding: 0.75rem 0.9rem;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: white;
          color: var(--text);
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .chart-price { text-align: right; }
        .price-value { font-size: 2rem; font-weight: 700; display: block; }
        .price-change { font-size: 1rem; font-weight: 500; }
        .price-change.up { color: #16a34a; }
        .price-change.down { color: #dc2626; }
        .chart-container {
          position: relative;
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
        }
        .chart-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.92);
          color: var(--text-muted);
          font-size: 1rem;
          padding: 1.25rem;
          text-align: center;
          z-index: 1;
        }
        .wave-panel {
          margin-top: 2rem;
          padding: 2rem;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: var(--bg-secondary);
        }
        .wave-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--text);
        }
        .wave-badges {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }
        .wave-badge {
          padding: 0.4rem 0.9rem;
          border-radius: 999px;
          font-size: 0.95rem;
          font-weight: 500;
        }
        .wave-impulse { background: #f0fdf4; color: #166534; }
        .wave-corrective { background: #fff7ed; color: #9a3412; }
        .wave-current { background: #1a1a1a; color: white; }
        .wave-desc {
          font-size: 0.95rem;
          color: var(--text-muted);
          margin: 0;
        }
        .wave-desc strong { color: var(--text); }
      `}</style>
    </div>
  );
}
