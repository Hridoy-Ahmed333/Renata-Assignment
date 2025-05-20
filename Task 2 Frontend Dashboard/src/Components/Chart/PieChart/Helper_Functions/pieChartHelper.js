export const COLOR_MAP = {
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

export function dynamicPieChart(isSmallScreen) {
  if (isSmallScreen < 390) {
    return { x: 36, y: 42 };
  } else if (isSmallScreen < 730) {
    return { x: 50, y: 70 };
  } else if (isSmallScreen < 840) {
    return { x: 60, y: 90 };
  } else if (isSmallScreen < 1080) {
    return { x: 70, y: 100 };
  } else {
    return { x: 110, y: 150 };
  }
}
