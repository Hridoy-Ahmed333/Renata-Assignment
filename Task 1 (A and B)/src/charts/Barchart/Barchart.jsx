import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  Label,
} from "recharts";
import "./Barchart.css";
import * as XLSX from "xlsx";
import CustomBarToolTip from "./BarchartComps/CustomBarToolTip";
import Legend from "./BarchartComps/Legend";

const BarCharts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/data.xlsx")
      .then((res) => res.arrayBuffer())
      .then((arrayBuffer) => {
        const workbook = XLSX.read(arrayBuffer, { type: "array" });

        const sheetName = "Task 1 (a)";
        const worksheet = workbook.Sheets[sheetName];

        if (worksheet) {
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          setData(jsonData);
        } else {
          console.error(`Sheet "${sheetName}" not found.`);
        }
      });
  }, []);

  const getColor = (value) => {
    if (value >= 35) return "#7f1d1d";
    if (value >= 30) return "#ea580c";
    if (value >= 25) return "#fb923c";
    if (value >= 20) return "#fdba74";
    if (value >= 15) return "#fed7aa";
    return "#fff7ed";
  };

  return (
    <div className="bar-chart-top-container">
      <h2>Bar Chart from Excel Sheet (task-1)</h2>
      <div className="bar-chart-container">
        <ResponsiveContainer className="responsive-bar-container">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Product">
              <Label value="Product" offset={-5} position="insideBottom" />
            </XAxis>
            <YAxis>
              <Label
                value="Total Sales"
                angle={-90}
                position="insideLeft"
                style={{ textAnchor: "middle" }}
              />
            </YAxis>
            <Tooltip content={<CustomBarToolTip />} />
            <Bar dataKey="TotalSales">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.TotalValue)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <Legend />
      </div>
    </div>
  );
};

export default BarCharts;
