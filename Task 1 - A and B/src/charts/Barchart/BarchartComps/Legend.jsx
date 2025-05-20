import React from "react";
import "./Legend.css";
function Legend() {
  return (
    <div className="bar-legend-container">
      <div className=".bar-legend-container-total-value">
        <div className="bar-top-total-val">TotalValue</div>
      </div>
      <div className="bar-legend">
        <div className="bar-legend-color" />
        <div className="bar-legend-value">
          {(() => {
            const elements = [];
            for (let i = 40; i >= 10; i--) {
              if (i % 5 === 0) {
                elements.push(<div key={i}>{i}</div>);
              }
            }
            return elements;
          })()}
        </div>
      </div>
    </div>
  );
}

export default Legend;
