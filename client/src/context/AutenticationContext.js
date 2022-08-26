import React, { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

export const AutenticationContext = createContext();

export const AutenticationContextProvider = (props) => {
  const [isDataLoading, setIsDataLoading] = useState();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const getToken = () => {
    const isTokenThere = localStorage.getItem("token");
    if (isTokenThere) {
      return true;
    } else {
      return false;
    }
  };

  // const getDataFromToken = () => {
  //   const jwtToken = localStorage.getItem("token");
  //   if (jwtToken) {
  //     const decodedToken = jwt_decode(jwtToken);
  //   }
  // };

  const logoutUser = () => {
    localStorage.removeItem("token");
  };

  useEffect(() => {
    setIsUserLoggedIn(getToken());
  }, []);

  return (
    <AutenticationContext.Provider
      value={(isDataLoading, isUserLoggedIn, logoutUser)}
    >
      {props.children}
    </AutenticationContext.Provider>
  );
};
