import React, { useState, useEffect } from "react";
import AddUserModal from "../../Modal/AddUserModal";
import { deleteUser, editEntry } from "../../../APIs/dashboardAPI";
import toast from "react-hot-toast";
import { useDarkMode } from "../../../Context/DarkModeContext";
import {
  openModalHelper,
  handleChangeHelper,
  closeModalHelper,
  createUser,
} from "./helper.js";
import UserInfoSection from "./UserInfoSection";
import UserActionButtons from "./UserActionButtons";
import "./row.css";

function UserRow({ rowData: data, setRe, re }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    division: "",
    gender: "",
    maritalStatus: "",
    age: "",
    income: "",
  });

  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 1000);
  const { darkMode } = useDarkMode();
  const role = JSON.parse(localStorage.getItem("currentUser")).role;

  useEffect(() => {
    const handleResize = () => setIsWideScreen(window.innerWidth > 1000);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openModal = () =>
    openModalHelper(role, data, setFormData, setIsModalOpen);
  const handleChange = (e) => handleChangeHelper(e, setFormData);
  const closeModal = () => closeModalHelper(setIsModalOpen, setFormData);

  async function handleSubmit(e) {
    e.preventDefault();
    const newUser = createUser(formData);
    const datas = await editEntry(data.ID, newUser);
    setRe(!re);
    toast.success(datas.message);
    closeModal();
  }

  async function handleDelete(e) {
    e.preventDefault();
    if (role !== "Admin") {
      toast.error("Only Admin Can Delete Customers");
      return;
    }
    const datas = await deleteUser(data.ID);
    setRe(!re);
    toast.success(datas.message);
    closeModal();
  }

  if (!data)
    return (
      <div>
        <div>Loading... (It might take a few minutes to start the server)</div>
      </div>
    );

  return (
    <div className="list-conatainer">
      <div
        className={`user-list ${darkMode ? "dark" : "light"}`}
        style={{ color: darkMode ? "#f0f0f0" : "#333" }}
      >
        <div className="user-info">
          <UserInfoSection
            label="Name"
            value={data["Customer Name"]}
            isWideScreen={isWideScreen}
          />
          <UserInfoSection
            label="Division"
            value={data.Division}
            isWideScreen={isWideScreen}
          />
        </div>

        <div className="user-info">
          <UserInfoSection
            label="Age"
            value={data.Age}
            isWideScreen={isWideScreen}
          />
          <UserInfoSection
            label="Marital Status"
            value={data.MaritalStatus}
            isWideScreen={isWideScreen}
          />
        </div>

        <div className="user-info">
          <UserInfoSection
            label="Gender"
            value={data.Gender === "M" ? "Male" : "Female"}
            isWideScreen={isWideScreen}
          />
          <UserInfoSection
            label="Income"
            value={`${data.Income} (Tk)`}
            isWideScreen={isWideScreen}
          />
        </div>

        <UserActionButtons
          role={role}
          onEdit={openModal}
          onDelete={handleDelete}
        />
      </div>

      {isModalOpen && (
        <AddUserModal
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={closeModal}
          mode="edit"
        />
      )}
    </div>
  );
}

export default UserRow;
