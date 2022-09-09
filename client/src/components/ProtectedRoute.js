import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserProfileView from "../views/UserProfileView";

function ProtectedRoute() {
  const isTheTokenThere = localStorage.getItem("token");
  const redirectTo = useNavigate();

  console.log("isTokenThere", isTheTokenThere);

  useEffect(() => {}, []);

  return (
    <>{isTheTokenThere === null ? redirectTo("/login") : <UserProfileView />}</>
  );
}

export default ProtectedRoute;
