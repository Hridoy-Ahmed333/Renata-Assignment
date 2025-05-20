const generateIncomeRanges = (data, step = 10000) => {
  const maxIncome = Math.max(...data.map((d) => parseInt(d.Income, 10)));
  const ranges = [];

  for (let start = 0; start <= maxIncome; start += step) {
    const end = start + step - 1;
    ranges.push([start, end]);
  }

  return ranges;
};

const formatRangeLabel = (min, max) => `${min / 1000}k–${(max + 1) / 1000}k`;

export const formatDataForLineChart = (rawData, mode = "district") => {
  const incomeRanges = generateIncomeRanges(rawData);

  let keys = [];
  if (mode === "Gender") {
    keys = ["Total", "Male", "Female"];
  } else if (mode === "Marital Status") {
    keys = ["Total", "Married", "Single", "Divorced"];
  } else {
    keys = [...new Set(rawData.map((d) => d.Division))];
  }

  const incomeBuckets = incomeRanges.map(([min, max]) => {
    const bucket = {
      range: formatRangeLabel(min, max),
    };
    keys.forEach((k) => (bucket[k] = 0));
    return bucket;
  });

  rawData.forEach((entry) => {
    const income = parseInt(entry.Income, 10);

    const rangeKey = incomeBuckets.find((b) => {
      const [minLabel, maxLabel] = b.range.split("–");
      const min = parseFloat(minLabel) * 1000;
      const max = parseFloat(maxLabel) * 1000 - 1;
      return income >= min && income <= max;
    });

    if (!rangeKey) return;

    if (mode === "Gender") {
      rangeKey.Total++;
      if (entry.Gender === "M") rangeKey.Male++;
      if (entry.Gender === "F") rangeKey.Female++;
    } else if (mode === "Marital Status") {
      rangeKey.Total++;
      const status = entry.MaritalStatus;
      if (["Married", "Single", "Divorced"].includes(status)) {
        rangeKey[status]++;
      }
    } else {
      if (entry.Division) {
        rangeKey[entry.Division]++;
      }
    }
  });

  return incomeBuckets;
};
