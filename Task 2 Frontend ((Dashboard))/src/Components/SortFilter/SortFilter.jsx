import { useEffect, useState } from "react";
import "./SortFilter.css";
import { addEntry } from "../../APIs/dashboardAPI";
import toast from "react-hot-toast";
import AddUserModal from "../Modal/AddUserModal";
import SelectBox from "../Select/SelectBox.jsx";
import { filterOptions, sortOptions, orderOptions } from "./option.js";
import {
  openModalHelper,
  closeModalHelper,
  handleChangeHelper,
  createNew,
} from "./helper.js";

function SortFilter({ setFilter, setSort, setOrder, setRe, re }) {
  const [text, setText] = useState("+");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    division: "",
    gender: "",
    maritalStatus: "",
    age: "",
    income: "",
  });

  useEffect(() => {
    function handleResize() {
      setText(window.innerWidth > 850 ? "Add Customer +" : "+");
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const role = JSON.parse(localStorage.getItem("currentUser"))?.role;
  function openModal() {
    openModalHelper(role, setIsModalOpen);
  }
  function closeModal() {
    closeModalHelper(setIsModalOpen, setFormData);
  }
  function handleChange(e) {
    handleChangeHelper(e, setFormData);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const newUser = createNew(formData);
    const data = await addEntry(newUser);
    setRe(!re);
    toast.success(data.message);
    closeModal();
  }

  return (
    <div className="sort-filter">
      <SelectBox
        id="filter"
        label="Filter"
        options={filterOptions}
        onChange={(e) => {
          const selected = e.target.value;
          if (selected === "none") {
            setFilter({ field: "None", value: "" });
          } else {
            const [field, value] = selected.split(":");
            setFilter({ field, value });
          }
        }}
      />
      <SelectBox
        id="sort"
        label="Sort"
        options={sortOptions}
        onChange={(e) => setSort(e.target.value)}
      />
      <SelectBox
        id="order"
        label="Order By"
        options={orderOptions}
        onChange={(e) => setOrder(e.target.value)}
      />
      <div
        className={`select-box new-btn ${
          role !== "Admin" ? "inactive-admin" : ""
        }`}
        style={{ cursor: role !== "Admin" ? "not-allowed" : "pointer" }}
        onClick={openModal}
      >
        {text}
      </div>
      {isModalOpen && (
        <AddUserModal
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={closeModal}
          mode="add"
        />
      )}
    </div>
  );
}

export default SortFilter;
