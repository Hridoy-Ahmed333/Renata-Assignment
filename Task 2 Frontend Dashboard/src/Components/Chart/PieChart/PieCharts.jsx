import React, { useState, useMemo, useEffect } from "react";
import { useDarkMode } from "../../../Context/DarkModeContext";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts";
import {
  getGroupedCounts,
  getGroupedSalarySum,
} from "./Helper_Functions/helper";
import { renderActiveShape } from "./Helper_Functions/CustomActiveShape";
import { COLOR_MAP, dynamicPieChart } from "./Helper_Functions/pieChartHelper";

const GenericPieChart = ({ data, groupBy, countLabel = "People" }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const res = dynamicPieChart(isSmallScreen);

  let inRad = res.x;
  let outRad = res.y;
  const dynamicHeight = outRad * 2 + 120;

  const chartData = useMemo(() => {
    return countLabel === "Income"
      ? getGroupedSalarySum(data, groupBy, countLabel)
      : getGroupedCounts(data, groupBy, countLabel);
  }, [data, groupBy, countLabel]);
  const handlePieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const customRenderActiveShape = (props) =>
    renderActiveShape(props, {
      primary: darkMode ? "#FFD700" : "#000",
      secondary: darkMode ? "#FF9750" : "#113FFF",
      isSmallScreen: isSmallScreen < 620,
    });

  return (
    <ResponsiveContainer width="100%" height={dynamicHeight}>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={customRenderActiveShape}
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={inRad}
          outerRadius={outRad}
          dataKey="value"
          onMouseEnter={handlePieEnter}
          cornerRadius={isSmallScreen < 620 ? 3 : 6}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLOR_MAP[entry.name] || "#8884d8"}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default GenericPieChart;
