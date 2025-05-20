import "./Dashboard.css";
import Carousel from "../Components/Carousel/Carousel";
import ChartSection from "../Components/Chart/ChartSection";
import { useDarkMode } from "../Context/DarkModeContext";
import { useUser } from "../Context/UserContexts";

function Dashboard() {
  const { darkMode } = useDarkMode();
  const { role } = useUser();
  return (
    <div>
      <div
        className="dashboard-title"
        style={{ color: darkMode ? "white" : "black" }}
      >
        {`${role}'s Dashboard`}
      </div>
      <div className="dash-desc">
        Login as Admin or Sales Representative to view users
      </div>
      <div>
        <div className="dashboard-container">
          <Carousel />
          <ChartSection />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
