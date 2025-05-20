import toast from "react-hot-toast";

export function openModalHelper(role, data, setFormData, setIsModalOpen) {
  if (role !== "Admin") {
    toast.error("Only Admin Can Edit Customers");
    return;
  }
  setFormData({
    id: data.ID,
    name: data["Customer Name"] || "",
    division: data.Division || "",
    gender: data.Gender || "",
    maritalStatus: data.MaritalStatus || "",
    age: data.Age || "",
    income: data.Income || "",
  });
  setIsModalOpen(true);
}

export function handleChangeHelper(e, setFormData) {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
}

export function closeModalHelper(setIsModalOpen, setFormData) {
  setIsModalOpen(false);
  setFormData({
    name: "",
    division: "",
    gender: "",
    maritalStatus: "",
    age: "",
    income: "",
  });
}

export function createUser(formData) {
  return {
    ID: formData.id,
    "Customer Name": formData.name,
    Division: formData.division,
    Gender: formData.gender,
    MaritalStatus: formData.maritalStatus,
    Age: parseInt(formData.age),
    Income: parseFloat(formData.income),
  };
}
