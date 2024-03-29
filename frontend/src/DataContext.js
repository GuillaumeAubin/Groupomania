import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";

export const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [dataUser, setDataUser] = useState([]);
  const LStoken = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  const [dataUserId, setDataUserId] = useState("");
  // const isModerator = localStorage.getItem('moderator')

  useEffect(() => {
    userId ? Axios.get(`http://localhost:4200/api/user/${userId}`).then((response) => {
      //console.log(response.data);
      setDataUserId(response.data.id);
      setDataUser(response.data);
    }) : console.log("idNull");
  }, [userId]);

  return (
    <DataContext.Provider
      value={{
        dataUser,
        LStoken,
        dataUserId,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
