import React from "react";
import { PieChart, Pie, Cell, Text, Tooltip } from "recharts";

const RADIAN = Math.PI / 180;

const formatValue = (value) => {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + "m";
  }
  return (value / 1000).toFixed(1) + "k";
};

const gaugeData = [
  { name: "Low", value: 30, color: "#E62828", range: "0 to 3m" },
  { name: "Medium", value: 40, color: "#E6A528", range: "3m to 7m" },
  { name: "High", value: 30, color: "#4187F5", range: "7m to 10m" },
];

const cx = 200;
const cy = 220;
const iR = 120;
const oR = 140;

const renderNeedle = (value, data, cx, cy, iR, oR, color) => {
  let total = -15;
  data.forEach((v) => {
    total += v.value;
  });

  const ang = 225 * (1 - value / total);
  const length = (iR + 2 * oR) / 4.5;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 10;
  const x0 = cx;
  const y0 = cy;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle
      key="needle-base"
      cx={x0}
      cy={y0}
      r={r}
      fill={color}
      stroke="none"
    />,
    <path
      key="needle-path"
      d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} Z`}
      fill={color}
    />,
  ];
};

const axisLabels = [
  { angle: 225, label: "10.0k" },
  { angle: 198, label: "1.0m" },
  { angle: 144, label: "3.0m" },
  { angle: 90, label: "5.0m" },
  { angle: 30, label: "7.0m" },
  { angle: -18, label: "9.0m" },
  { angle: -45, label: "10.0m" },
];

function Charts({ value, selectedMonth }) {
  const percentageValue = (value / 10000000) * 100;

  return (
    <div style={{ width: 400, height: 400 }}>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          startAngle={225}
          endAngle={-45}
          data={gaugeData}
          cx={cx}
          cy={cy}
          innerRadius={iR}
          outerRadius={oR}
          stroke="none"
          paddingAngle={2}
          cornerRadius={20}
        >
          {gaugeData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>

        <Tooltip
          content={({ payload }) => {
            if (payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    padding: "5px 10px",
                    fontSize: "14px",
                  }}
                >
                  <strong>{data.name}:</strong> {data.range}
                </div>
              );
            }
            return null;
          }}
        />

        {renderNeedle(percentageValue, gaugeData, cx, cy, iR, oR, "#5A5A5A")}

        {axisLabels.map((item, index) => {
          const radius = oR + 40;
          const tickStartRadius = oR + 10;
          const tickEndRadius = oR + 20;
          const angle = item.angle;
          const x = cx + radius * Math.cos(-RADIAN * angle);
          const y = cy + radius * Math.sin(-RADIAN * angle);

          const x1 = cx + tickStartRadius * Math.cos(-RADIAN * angle);
          const y1 = cy + tickStartRadius * Math.sin(-RADIAN * angle);

          const x2 = cx + tickEndRadius * Math.cos(-RADIAN * angle);
          const y2 = cy + tickEndRadius * Math.sin(-RADIAN * angle);

          return (
            <g key={`tick-label-${index}`}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#666"
                strokeWidth={1}
              />
              <text
                x={x}
                y={y}
                textAnchor="middle"
                alignmentBaseline="middle"
                fontSize="14"
                fill="#333"
              >
                {item.label}
              </text>
            </g>
          );
        })}
        <text
          x={cx}
          y={cy + 80}
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize="24"
          fontWeight="bold"
          fill="#000"
        >
          {selectedMonth ? formatValue(value) : "0"}
        </text>
      </PieChart>
    </div>
  );
}

export default Charts;
