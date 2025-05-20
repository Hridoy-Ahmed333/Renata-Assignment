import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Status from "./GaugeChartComps/Status";
import MonthSelector from "./GaugeChartComps/MonthSelector";
import Charts from "./GaugeChartComps/Charts";
import "./GaugeCharts.css";

const getStatus = (value) => {
  if (value <= 3000000) return "Low";
  if (value < 7000000) return "Medium";
  return "High";
};

const GaugeCharts = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    fetch("/data.xlsx")
      .then((res) => res.arrayBuffer())
      .then((arrayBuffer) => {
        const workbook = XLSX.read(arrayBuffer, { type: "array" });

        const sheetName = "Task 1 (b)";
        const worksheet = workbook.Sheets[sheetName];

        if (worksheet) {
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          setSalesData(jsonData);
        } else {
          console.error(`Sheet "${sheetName}" not found.`);
        }
      });
  }, []);
  const val = salesData.filter((el) => el.month === selectedMonth);
  const value = selectedMonth ? val[0]?.sales : 0;
  const status = selectedMonth
    ? getStatus(value)
    : "Select a month to view the status";

  return (
    <div className="gauge-chart-top-container">
      <MonthSelector
        salesData={salesData}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <div className="gauge-chart-container">
        <Charts value={value} selectedMonth={selectedMonth} />
        <Status status={status} />
      </div>
    </div>
  );
};

export default GaugeCharts;
