import React from "react";
import { useNavigate } from "react-router-dom";
import UserProfileView from "../views/UserProfileView";

function ProtectedRoute() {
  const isTheTokenThere = localStorage.getItem("token");
  const redirectTo = useNavigate();

  return <>{isTheTokenThere ? <UserProfileView /> : redirectTo("/login")}</>;
}

export default ProtectedRoute;
