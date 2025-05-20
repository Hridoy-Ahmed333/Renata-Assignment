import toast from "react-hot-toast";

const BASE = import.meta.env.VITE_API_URL;

export async function fetchData() {
  try {
    const response = await fetch(`${BASE}/api/data`);
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();
    return data;
  } catch (error) {
    toast.error(error);
  }
}

export async function addEntry(newUser) {
  try {
    const response = await fetch(`${BASE}/api/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([newUser]),
    });
    if (!response.ok) throw new Error("Failed to add entry");
    return response.json();
  } catch (error) {
    toast.error(error);
    throw error;
  }
}

export async function editEntry(id, updatedFields) {
  try {
    const response = await fetch(`${BASE}/api/data/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    });
    if (!response.ok) throw new Error("Failed to update entry");
    const result = await response.json();
    return result;
  } catch (error) {
    toast.error(error);
  }
}

export const deleteUser = async (id) => {
  const res = await fetch(`${BASE}/api/data/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete user");
  return res.json();
};
