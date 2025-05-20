import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const value = JSON.parse(localStorage.getItem("currentUser"));
  const role = value?.role;
  const userRole = role;

  if (allowedRoles.includes(userRole)) {
    return children;
  }
  return <Navigate to="/*" />;
};

export default ProtectedRoute;
