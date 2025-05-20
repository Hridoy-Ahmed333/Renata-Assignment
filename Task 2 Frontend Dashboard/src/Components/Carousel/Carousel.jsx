import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import {
  FaUser,
  FaUsers,
  FaMoneyBillWave,
  FaDollarSign,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { useDarkMode } from "../../Context/DarkModeContext";
import "./carousel.css";
import { fetchData } from "../../APIs/dashboardAPI";

const Carousel = () => {
  const { darkMode } = useDarkMode();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

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
      <div>Loading... (It might take a few minutes to start the server)</div>
    );

  const customers = data.length || 0;
  const totalIncome = data.reduce((acc, row) => acc + (row.Income || 0), 0);
  const avgIncome = customers > 0 ? (totalIncome / customers).toFixed(2) : 0;
  const division = new Set(data.map((row) => row.Division)).size;
  return (
    <div className={`widget-container ${darkMode ? "dark" : "light"}`}>
      <div className="widget-container-1">
        <div className="widget-container-2">
          <CarContainer value={customers} label="Customers" Icon={FaUsers} />
        </div>
        <div className="widget-container-2">
          <CarContainer
            value={totalIncome}
            label="Total Income"
            Icon={AiOutlineDollarCircle}
          />
        </div>
      </div>
      <div className="widget-container-1">
        <div className="widget-container-2">
          <CarContainer
            value={avgIncome}
            label="Avg Income"
            Icon={FaDollarSign}
          />
        </div>
        <div className="widget-container-2">
          <CarContainer
            value={division}
            label="Division"
            Icon={FaMapMarkedAlt}
          />
        </div>
      </div>
    </div>
  );
};

function CarContainer({ value, label, Icon }) {
  return (
    <div className="car-container">
      <Icon title={label} className="car-container-el icon" />
      <div className="car-container-el number">{value}</div>
      <div className="car-container-el label">{label}</div>
    </div>
  );
}

export default Carousel;
