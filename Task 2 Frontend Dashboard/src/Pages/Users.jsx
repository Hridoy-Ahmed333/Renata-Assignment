import { useEffect, useState } from "react";
import "./User.css";
import SortFilter from "../Components/SortFilter/SortFilter";
import { fetchData } from "../APIs/dashboardAPI";
import AllUsers from "../Components/List/AllUsers";
import { useDarkMode } from "../Context/DarkModeContext";
import { handleSearch, processData } from "../Utills/dataProcessor.js";

function Users() {
  const [originalData, setOriginalData] = useState([]);
  const [searchedData, setSearchedData] = useState(null);
  const [processedData, setProcessedData] = useState([]);
  const [filter, setFilter] = useState({ field: "None", value: "" });
  const [sort, setSort] = useState("none");
  const [order, setOrder] = useState("ascending");
  const [loading, setLoading] = useState(true);
  const [re, setRe] = useState(false);
  const { darkMode } = useDarkMode();
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const result = await fetchData();
      setOriginalData(result);
      setLoading(false);
    }
    loadData();
  }, [re]);

  useEffect(() => {
    const baseData = searchedData ?? originalData;
    const result = processData(baseData, filter, sort, order);
    setProcessedData(result);
  }, [originalData, searchedData, filter, sort, order]);
  if (loading) {
    return (
      <div>
        <div>Loading... (It might take a few minutes to start the server)</div>
      </div>
    );
  }
  return (
    <div>
      <div className={`top-bar-user ${darkMode ? "dark" : "light"}`}>
        <h1 className="Tag-all-user">All Users</h1>
        <input
          type="text"
          placeholder="Search by Customer Name"
          onChange={(e) =>
            handleSearch(e.target.value, originalData, setSearchedData)
          }
          className="search-input"
        />
        <SortFilter
          setFilter={setFilter}
          setSort={setSort}
          setOrder={setOrder}
          setRe={setRe}
          re={re}
        />
      </div>
      <AllUsers data={processedData} setRe={setRe} re={re} />
    </div>
  );
}

export default Users;
