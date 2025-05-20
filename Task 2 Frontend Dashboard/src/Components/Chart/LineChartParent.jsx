import React, { useState } from "react";
import { useDarkMode } from "../../Context/DarkModeContext";
import LineChartSelection from "./LineChart/LineChartSelection/LineChartSelection";
import LineChart from "./LineChart/LineChartComp";

function LineChartParent({ data }) {
  const [selectedCategory, setSelectedCategory] = useState("Division");
  const { darkMode } = useDarkMode();
  return (
    <div
      className={`chart-cont-div1 top-cont ${darkMode ? "dark" : "light"}`}
      style={{ color: darkMode ? "white" : "black" }}
    >
      <div className="line-Chart-Options">
        <div className="op-text">Select an Option</div>
        <LineChartSelection setSelectedCategory={setSelectedCategory} />
      </div>
      <div className="chart-cont-div2 top-cont">
        <div className="op-text">{`Line Chart Based on Income and ${selectedCategory}`}</div>
        <LineChart selectedCategory={selectedCategory} data={data} />
      </div>
    </div>
  );
}

export default LineChartParent;
