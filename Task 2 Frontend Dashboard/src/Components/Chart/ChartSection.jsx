import React, { useState, useEffect } from "react";
import "./ChartSection.css";
import * as XLSX from "xlsx";
import LineChartParent from "./LineChartParent";
import PieChartParent from "./PieChartParent";
import { fetchData } from "../../APIs/dashboardAPI";
import { LoadingComponent } from "../LoadingComponent";

function ChartSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const result = await fetchData();
      setData(result);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading)
    return (
      <div>
        <LoadingComponent />
      </div>
    );

  return (
    <div className="chart-cont-top">
      <LineChartParent data={data} />
      <PieChartParent data={data} />
    </div>
  );
}

export default ChartSection;
