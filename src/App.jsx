import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Chart from "./components/Chart";
import "./App.css";

const markets = [
  {
    id: "gold",
    symbol: "XAU/USD",
    title: "Gold",
    subtitle: "Precious metal",
    accent: "Au",
  },
  {
    id: "btc",
    symbol: "BTC/USD",
    title: "Bitcoin",
    subtitle: "Crypto",
    accent: "₿",
  },
  {
    id: "eth",
    symbol: "ETH/USD",
    title: "Ethereum",
    subtitle: "Crypto",
    accent: "Ξ",
  },
  {
    id: "oil",
    symbol: "WTI",
    title: "Crude Oil",
    subtitle: "Energy commodity",
    accent: "🛢",
  },
];

function App() {
  const [page, setPage] = useState("home");
  const activeMarket = markets.find((market) => market.id === page);

  return (
    <div className="layout">
      <Sidebar page={page} setPage={setPage} markets={markets} />
      <main className="main">
        <div className="main-inner">
          {page === "home" && <Home setPage={setPage} markets={markets} />}
          {activeMarket && page !== "home" && (
            <Chart symbol={activeMarket.symbol} title={activeMarket.title} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
