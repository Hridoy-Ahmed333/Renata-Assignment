import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatDataForLineChart } from "./HelperFunctions/formatDataLineChart";

const colors = {
  Total: "#333",
  Male: "#2196f3",
  Female: "#e91e63",
  Married: "#4caf50",
  Single: "#ff9800",
  Divorced: "#9c27b0",
  Dhaka: "#8884d8",
  Rajshahi: "#82ca9d",
  Khulna: "#ff7300",
  Barishal: "#ff0000",
  Mymensingh: "#00bcd4",
  Sylhet: "#8bc34a",
  Rangpur: "#ffc107",
  Chattogram: "#3f51b5",
};

const LineChartComp = ({ selectedCategory = "division", data }) => {
  const rawData = data;
  const chartData = formatDataForLineChart(rawData, selectedCategory);

  let keys = [];
  if (selectedCategory === "Gender") {
    keys = ["Total", "Male", "Female"];
  } else if (selectedCategory === "Marital Status") {
    keys = ["Married", "Single", "Divorced"];
  } else {
    keys = [...new Set(rawData.map((d) => d.Division))];
  }

  return (
    <ResponsiveContainer width="100%" height={420}>
      <LineChart data={chartData} margin={{ left: 10, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="range" />
        <YAxis
          allowDecimals={false}
          domain={[0, (dataMax) => Math.max(5, dataMax)]}
        />
        <Tooltip />
        <Legend />
        {keys.map((key) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors[key] || "#000"}
            strokeWidth={3}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComp;
