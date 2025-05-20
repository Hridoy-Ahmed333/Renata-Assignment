import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./layout.css";
import { AiOutlineHome } from "react-icons/ai";
import { MdInventory2 } from "react-icons/md";
import { FiSettings, FiMenu, FiX } from "react-icons/fi";
import { HiLogin, HiLogout } from "react-icons/hi";
import { useDarkMode } from "../../Context/DarkModeContext";
import SidebarNav from "./SidebarNav";

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("/");
  const { darkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className={`dashboard ${darkMode ? "dark" : "light"}`}>
      <div className="darkmode-btn" onClick={toggleDarkMode}>
        <div className={`cng-btn ${darkMode ? "d" : "l"}`}>
          <div className={`darkmode ${darkMode ? "d" : "l"}`}>
            {darkMode ? "Dark" : "Light"}
          </div>
        </div>
      </div>

      <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="toggle-container">
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
        <nav>
          <SidebarNav
            isSidebarOpen={isSidebarOpen}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
        </nav>
      </aside>

      <main className={`main-content ${isSidebarOpen ? "open" : "closed"}`}>
        <Outlet />
      </main>
    </div>
  );
}
