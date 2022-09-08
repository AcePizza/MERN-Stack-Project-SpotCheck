import React, { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

export const AutenticationContext = createContext();

export const AutenticationContextProvider = (props) => {
  const [isDataLoading, setIsDataLoading] = useState();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const getToken = () => {
    const isTokenThere = localStorage.getItem("token");
    return isTokenThere;
  };

  const logoutUser = () => {
    console.log("Is this running?");
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
