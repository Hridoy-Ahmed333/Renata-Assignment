export const getGroupedCounts = (data, groupBy = "", countLabel = "People") => {
  if (!Array.isArray(data) || !groupBy) return [];

  const counts = data.reduce((acc, item) => {
    const key = item[groupBy];
    if (key) {
      acc[key] = (acc[key] || 0) + 1;
    }
    return acc;
  }, {});
  return Object.entries(counts).map(([name, value]) => {
    const displayName = name === "M" ? "Male" : name === "F" ? "Female" : name;
    return {
      name: displayName,
      value,
      label: countLabel,
    };
  });
};

export const getGroupedSalarySum = (
  data,
  groupBy = "",
  countLabel = "Income"
) => {
  if (!Array.isArray(data) || !groupBy) return [];

  const sums = data.reduce((acc, item) => {
    const key = item[groupBy];
    const income = Number(item.Income);

    if (key && !isNaN(income)) {
      acc[key] = (acc[key] || 0) + income;
    }
    return acc;
  }, {});

  return Object.entries(sums).map(([name, value]) => {
    const displayName = name === "M" ? "Male" : name === "F" ? "Female" : name;
    return {
      name: displayName,
      value,
      label: countLabel,
    };
  });
};
