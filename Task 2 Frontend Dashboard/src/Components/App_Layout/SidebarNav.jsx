import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContexts";
import { AiOutlineHome } from "react-icons/ai";
import { BiBarChartAlt2 } from "react-icons/bi";
import { MdInventory2 } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { FiSettings, FiMenu, FiX } from "react-icons/fi";
import { AiOutlineBook } from "react-icons/ai";
import { HiLogin, HiLogout } from "react-icons/hi";
import { FiLogIn, FiLogOut } from "react-icons/fi";

export default function SidebarNav({ isSidebarOpen }) {
  const navigate = useNavigate();
  const { role, setRole } = useUser();

  const navItems = [
    { label: "Dashboard", path: "/", icon: <BiBarChartAlt2 /> },
    { label: "Users", path: "/users", icon: <HiUsers /> },
    { label: "Read Me", path: "/read", icon: <AiOutlineBook /> },
    {
      label: role === "Visitor" ? "Login" : "Logout",
      path: "/login",
      icon: role === "Visitor" ? <FiLogIn /> : <FiLogOut />,
    },
  ];

  const handleNavClick = (item) => {
    if (item.path === "/login") {
      localStorage.removeItem("currentUser");
      setRole("Visitor");
      navigate("/login");
    } else if (
      item.path === "/users" &&
      role !== "Admin" &&
      role !== "Sales Representative"
    ) {
      toast.error("Only admin and Sales representatives can visit this page.");
    } else {
      navigate(item.path);
    }
  };
  const getNavItemClass = (item) => {
    const isActive = location.pathname === item.path;
    const isUsersRoute = item.path === "/users";
    const isUnauthorized =
      isUsersRoute && role !== "Admin" && role !== "Sales Representative";

    return `nav-item ${isActive ? "active-nav" : ""} ${
      isUnauthorized ? "inactive" : ""
    }`;
  };

  return (
    <ul>
      {navItems.map((item, index) => (
        <li
          key={index}
          className={getNavItemClass(item)}
          onClick={() => handleNavClick(item)}
        >
          <span className="icon">{item.icon}</span>
          {isSidebarOpen && <span className="label">{item.label}</span>}
        </li>
      ))}
    </ul>
  );
}
