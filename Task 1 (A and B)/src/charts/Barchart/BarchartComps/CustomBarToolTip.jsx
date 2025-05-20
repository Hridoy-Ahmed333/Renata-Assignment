import React from "react";
import "./CustomBarToolTip.css";

function CustomBarToolTip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-bar-tooltip">
        <p>
          <span>Product:</span> {label}
        </p>
        <p>
          <span>TotalSales:</span> {data.TotalSales}
        </p>
        <p>
          <span>TotalValue:</span> {data.TotalValue}
        </p>
      </div>
    );
  }
  return null;
}

export default CustomBarToolTip;
