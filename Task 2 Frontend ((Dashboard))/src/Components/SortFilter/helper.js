import toast from "react-hot-toast";

export function openModalHelper(role, setIsModalOpen) {
  if (role !== "Admin") {
    toast.error("Only Admin Can Add Customers");
    return;
  }
  setIsModalOpen(true);
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

export function generateID() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetters =
    letters.charAt(Math.floor(Math.random() * letters.length)) +
    letters.charAt(Math.floor(Math.random() * letters.length));
  const randomDigits = Math.floor(10000 + Math.random() * 90000);
  return randomLetters + randomDigits;
}

export function handleChangeHelper(e, setFormData) {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
}

export function createNew(formData) {
  return {
    ID: generateID(),
    "Customer Name": formData.name,
    Division: formData.division,
    Gender: formData.gender,
    MaritalStatus: formData.maritalStatus,
    Age: parseInt(formData.age),
    Income: parseFloat(formData.income),
  };
}
