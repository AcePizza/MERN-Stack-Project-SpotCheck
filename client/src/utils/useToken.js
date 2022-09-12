import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";

function useToken() {
  const [isTokenThere, setIsTokenThere] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const userID = jwtDecode(token);
      setUser(userID.sub);
      setIsTokenThere(true);
      setLoading(false);
    } catch (error) {
      setError({ message: error.message });
    }
  }, []);

  return { isTokenThere, error, loading, user };
}

export default useToken;
