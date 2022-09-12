import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserProfileView from "../views/UserProfileView";

function ProtectedRoute() {
  const isTheTokenThere = localStorage.getItem("token");
  const redirectTo = useNavigate();

  useEffect(() => {
    if (isTheTokenThere == null) {
      redirectTo("/home");
    }
  }, []);

  return (
    <>
      <UserProfileView />
    </>
  );
}

export default ProtectedRoute;
