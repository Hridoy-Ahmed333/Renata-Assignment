import React, { useState } from "react";
import "./Home.css";
import BarCharts from "../charts/Barchart/Barchart";
import GaugeCharts from "../charts/Gaugechart/GaugeCharts";

function Home() {
  const [bar, setBar] = useState(true);
  function handleTabClick1(flag) {
    if (!flag) {
      setBar((bar) => !bar);
    } else {
      return;
    }
  }
  function handleTabClick2(flag) {
    if (flag) {
      setBar((bar) => !bar);
    } else {
      return;
    }
  }

  return (
    <div className="homepage-container">
      <div className="chart-tab">
        <div
          className={`chat-tab-btn ${bar ? "chat-tab-btn-active" : ""}`}
          onClick={() => handleTabClick1(bar)}
        >
          Bar chart
        </div>
        <div
          className={`chat-tab-btn ${bar ? "" : "chat-tab-btn-active"}`}
          onClick={() => handleTabClick2(bar)}
        >
          Gaugechart
        </div>
      </div>
      <div className="ch-cont">{bar ? <BarCharts /> : <GaugeCharts />}</div>
    </div>
  );
}

export default Home;
