import { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

const API_KEY = import.meta.env.VITE_TWELVE_DATA_API_KEY;

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
  const [waves, setWaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(null);
  const [change, setChange] = useState(null);

  useEffect(() => {
    if (!chartRef.current) return;
    chartInstance.current = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 420,
      layout: { background: { color: "#ffffff" }, textColor: "#555" },
      grid: {
        vertLines: { color: "#f4f3f0" },
        horzLines: { color: "#f4f3f0" },
      },
      crosshair: { mode: 1 },
      rightPriceScale: { borderColor: "#e8e7e3" },
      timeScale: { borderColor: "#e8e7e3", timeVisible: true },
    });

    seriesRef.current = chartInstance.current.addCandlestickSeries({
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
    fetch(
      `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1h&outputsize=100&apikey=${API_KEY}`,
    )
      .then((r) => r.json())
      .then((data) => {
        if (!data.values) return;
        const candles = data.values.reverse().map((d) => ({
          time: Math.floor(new Date(d.datetime).getTime() / 1000),
          open: parseFloat(d.open),
          high: parseFloat(d.high),
          low: parseFloat(d.low),
          close: parseFloat(d.close),
        }));
        seriesRef.current.setData(candles);
        const last = candles[candles.length - 1];
        const prev = candles[candles.length - 2];
        setPrice(last.close);
        setChange((((last.close - prev.close) / prev.close) * 100).toFixed(2));
        setWaves(detectElliottWaves(candles));
        setLoading(false);
        chartInstance.current.timeScale().fitContent();
      })
      .catch(() => setLoading(false));
  }, [symbol]);

  const currentWave = waves[waves.length - 1];
  const isUp = change > 0;

  return (
    <div className="chart-page">
      <div className="chart-header">
        <div>
          <h2 className="chart-title">{title}</h2>
          <p className="chart-symbol">{symbol} · 1H</p>
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

      {loading ? (
        <div className="chart-loading">Loading chart data...</div>
      ) : (
        <div className="chart-container">
          <div ref={chartRef} style={{ width: "100%" }} />
        </div>
      )}

      {waves.length > 0 && !loading && (
        <div className="wave-panel">
          <h3 className="wave-title">Elliott Wave Analysis</h3>
          <div className="wave-badges">
            {waves.map((w, i) => (
              <span
                key={i}
                className={`wave-badge ${i === waves.length - 1 ? "wave-current" : i < 5 ? "wave-impulse" : "wave-corrective"}`}
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
        .chart-page { max-width: 900px; width: 100%; }
        .chart-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem; }
        .chart-title { font-size: 1.4rem; font-weight: 600; margin-bottom: 2px; }
        .chart-symbol { font-size: 13px; color: var(--text-muted); }
        .chart-price { text-align: right; }
        .price-value { font-size: 1.5rem; font-weight: 600; display: block; }
        .price-change { font-size: 13px; font-weight: 500; }
        .price-change.up { color: #16a34a; }
        .price-change.down { color: #dc2626; }
        .chart-loading { height: 420px; display: flex; align-items: center; justify-content: center; color: var(--text-muted); font-size: 14px; background: var(--bg-secondary); border-radius: 10px; }
        .chart-container { border: 1px solid var(--border); border-radius: 10px; overflow: hidden; }
        .wave-panel { margin-top: 1.5rem; padding: 1.25rem; border: 1px solid var(--border); border-radius: 10px; background: var(--bg-secondary); }
        .wave-title { font-size: 13px; font-weight: 600; margin-bottom: 10px; color: var(--text); }
        .wave-badges { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 10px; }
        .wave-badge { padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 500; }
        .wave-impulse { background: #f0fdf4; color: #166534; }
        .wave-corrective { background: #fff7ed; color: #9a3412; }
        .wave-current { background: #1a1a1a; color: white; }
        .wave-desc { font-size: 13px; color: var(--text-muted); }
        .wave-desc strong { color: var(--text); }
      `}</style>
    </div>
  );
}
