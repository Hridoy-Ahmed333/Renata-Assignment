import React, { useState } from "react";
import "./LineChartSelection.css";

function LineChartSelection({ setSelectedCategory }) {
  const [activeBtn, setActiveBtn] = useState("btn1");
  function clickbtn(btn) {
    if (btn === 1) {
      setActiveBtn("btn1");
      setSelectedCategory("Division");
    }
    if (btn === 2) {
      setActiveBtn("btn2");
      setSelectedCategory("Gender");
    }
    if (btn === 3) {
      setActiveBtn("btn3");
      setSelectedCategory("Marital Status");
    }
  }

  return (
    <div className="lineChartSelection-cont">
      <div
        className={`line-chart-select-btn  ${
          activeBtn === "btn1" ? "active" : ""
        } `}
        onClick={() => clickbtn(1)}
      >
        Division
      </div>
      <div
        className={`line-chart-select-btn ${
          activeBtn === "btn2" ? "active" : ""
        } `}
        onClick={() => clickbtn(2)}
      >
        Gender
      </div>
      <div
        className={`line-chart-select-btn  ${
          activeBtn === "btn3" ? "active" : ""
        } `}
        onClick={() => clickbtn(3)}
      >
        Marital Status
      </div>
    </div>
  );
}

export default LineChartSelection;
