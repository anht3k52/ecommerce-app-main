import React, { createContext, useState } from "react";

const UserType = createContext();

const UserContext = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [idAddress, setIdAddress] = useState(""); // Thêm idAddress vào context

  return (
    <UserType.Provider value={{ userId, setUserId, idAddress, setIdAddress }}>
      {children}
    </UserType.Provider>
  );
}

export { UserType, UserContext };
