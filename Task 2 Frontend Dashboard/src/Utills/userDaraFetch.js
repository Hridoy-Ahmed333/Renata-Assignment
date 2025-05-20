import { syncUsersToLocalStorage } from "./loadingData";

export function initianData() {
  const admin = {
    email: "abc@gmail.com",
    role: "Admin",
    password: "abc",
  };

  const salesRepresentative = {
    email: "xyz@gmail.com",
    role: "Sales Representative",
    password: "xyz",
  };

  const viewer = {
    email: "pqr@gmail.com",
    role: "Viewer",
    password: "pqr",
  };

  const defaultUsers = [admin, salesRepresentative, viewer];

  syncUsersToLocalStorage(defaultUsers);
}

export function userData() {
  return null;
}

export function register(newUser) {
  const { email, password, role } = newUser;

  if (!email || !password || !role) {
    return { success: false, message: "All fields are required." };
  }

  const storedData = localStorage.getItem("data");
  let users = storedData ? JSON.parse(storedData) : [];

  const userExists = users.some((u) => u.email === email);
  if (userExists) {
    return { success: false, message: "User with this email already exists." };
  }

  users.push({ email, password, role });
  localStorage.setItem("data", JSON.stringify(users));

  return {
    success: true,
    message: "Registration successful.",
    user: { email: email, role: role },
  };
}

export function login(email, password) {
  const storedData = localStorage.getItem("data");
  if (!storedData) {
    return { success: false, message: "No user data found." };
  }

  const users = JSON.parse(storedData);
  const user = users.find((u) => u.email === email);

  if (!user) {
    return { success: false, message: "User not found." };
  }

  if (user.password !== password) {
    return { success: false, message: "Incorrect password." };
  }

  return {
    success: true,
    message: "Login successful.",
    user: { email: user.email, role: user.role },
  };
}
