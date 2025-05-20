import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUserRoleOrAddVisitor } from "../Utills/getRole";

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const initialRole = getCurrentUserRoleOrAddVisitor();
    setRole(initialRole);
  }, []);

  return (
    <UserContext.Provider value={{ role, setRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
