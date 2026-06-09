import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Chart from "./components/Chart";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="layout">
      <Sidebar page={page} setPage={setPage} />
      <main className="main">
        {page === "home" && <Home setPage={setPage} />}
        {page === "gold" && <Chart symbol="XAU/USD" title="Gold" />}
        {page === "btc" && <Chart symbol="BTC/USD" title="Bitcoin" />}
      </main>
    </div>
  );
}

export default App;
