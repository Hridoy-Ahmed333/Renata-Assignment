// Handles search filtering based on customer name
export function handleSearch(query, originalData, setSearchedData) {
  const trimmedQuery = query.trim();

  if (trimmedQuery === "") {
    setSearchedData(null);
  } else {
    const filtered = originalData.filter((item) => {
      const name = item["Customer Name"];
      return (
        name && String(name).toLowerCase().includes(trimmedQuery.toLowerCase())
      );
    });
    setSearchedData(filtered);
  }
}

// Handles processing data based on filter, sort, and order
export function processData(data, filter, sort, order) {
  let result = [...data];

  // Apply filter
  if (filter.field !== "None" && filter.value.trim() !== "") {
    result = result.filter((item) => {
      const fieldValue = item[filter.field];
      return (
        fieldValue &&
        String(fieldValue).toLowerCase().includes(filter.value.toLowerCase())
      );
    });
  }

  // Apply sorting
  if (sort !== "none") {
    result.sort((a, b) => {
      const valA = a[sort];
      const valB = b[sort];

      if (typeof valA === "number" && typeof valB === "number") {
        return valA - valB;
      }

      return String(valA).localeCompare(String(valB));
    });
  }

  // Apply order
  if (order === "descending") {
    result.reverse();
  }

  return result;
}
