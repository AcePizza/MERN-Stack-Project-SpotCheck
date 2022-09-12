import React, { useEffect, useState } from "react";

function useGetProfile() {
  console.log("Does this run");
  const [fetchData, setFetchData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfileFromBackend = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      try {
        const response = await fetch(
          "http://localhost:5000/users/findoneuser",
          requestOptions
        );
        const results = await response.json();
        setFetchData(results);
        setLoading(false);
      } catch (error) {
        setError({
          msg: "fetch failed",
          error: error,
          message: error.message,
        });
        setLoading(false);
      }
    } else {
      setError({ message: "No token found" });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileFromBackend();
  }, []);

  return { fetchData, error, loading };
}

export default useGetProfile;
