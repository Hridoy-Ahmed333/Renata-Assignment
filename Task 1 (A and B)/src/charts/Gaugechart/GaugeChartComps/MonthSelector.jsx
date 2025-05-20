import React from "react";
import "./MonthSelector.css";

function MonthSelector({ salesData, selectedMonth, setSelectedMonth }) {
  return (
    <div className="month-selector">
      {salesData.map((el) => (
        <div
          key={el.month}
          onClick={() => setSelectedMonth(el.month)}
          className={`month-box ${
            selectedMonth === el.month ? "selected" : ""
          }`}
        >
          {el.month}
        </div>
      ))}
    </div>
  );
}

export default MonthSelector;
