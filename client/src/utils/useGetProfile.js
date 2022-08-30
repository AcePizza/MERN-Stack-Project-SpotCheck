import React, { useEffect, useState } from "react";

function useGetProfile() {
  const [fetchData, setFetchData] = useState(() => {
    return null;
  });

  const fetchProfileFromBackend = async () => {
    const token = localStorage.getItem("token");

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
    } catch (error) {
      console.log({
        msg: "fetch failed",
        error: error,
        message: error.message,
      });
    }
  };

  useEffect(() => {
    fetchProfileFromBackend();
  }, []);

  return fetchData;
}

export default useGetProfile;
