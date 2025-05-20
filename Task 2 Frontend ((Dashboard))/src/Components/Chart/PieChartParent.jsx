import React, { useState } from "react";
import { useDarkMode } from "../../Context/DarkModeContext";

import PieCharts from "./PieChart/PieCharts";
import GroupBy from "./PieChart/GroupBy";
import CountBy from "./PieChart/CountBy";

function PieChartParent({ data }) {
  const [selectedGroup, setSelectedGroup] = useState("Division");
  const [label, setLabel] = useState("People");
  const { darkMode } = useDarkMode();
  return (
    <div
      className={`chart-cont-div1 bottom-cont ${darkMode ? "dark" : "light"}`}
    >
      <div className="selection-container">
        <CountBy setLabel={setLabel} />
        <GroupBy setSelectedGroup={setSelectedGroup} />
      </div>
      <div className="pie-chart-cont">
        <PieCharts data={data} groupBy={selectedGroup} countLabel={label} />
      </div>
    </div>
  );
}

export default PieChartParent;
