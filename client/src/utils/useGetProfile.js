import React, { useEffect, useState } from "react";

function useGetProfile() {
  const [fetchData, setFetchData] = useState(() => {
    return null;
  });

  const fetchProfileFromBackend = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const myHeaders = new Headers();
        myHeaders.append();

        const fetchedData = await fetch(
          "http://localhost:5000/users/findoneuser"
        );
        const response = await fetchedData.json();
        setFetchData(response);
      } catch (error) {
        console.log({ msg: "Something went wrong", error: error });
      }
    } else {
      console.log("No token found");
    }
  };

  useEffect(() => {
    fetchProfileFromBackend();
  }, []);

  return fetchData;
}

export default useGetProfile;
