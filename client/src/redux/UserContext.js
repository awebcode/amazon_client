import React, { createContext, useContext, useEffect, useState } from "react";
import { useMeQuery } from "./auth";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
    const { data: userData } = useMeQuery();
    useEffect(() => {
      if (userData) {
        setUser(userData?.user); // Set the user data in the context
      }
    }, [userData, setUser]);
  return (
    <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
