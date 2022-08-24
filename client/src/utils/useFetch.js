import React, { useEffect, useState } from "react";

function useFetch(url, page) {
  const [fetchData, setFetchData] = useState(() => {
    return null;
  });

  const fetchDataFromBackend = async (url) => {
    try {
      const fetchedData = await fetch(url);
      const response = await fetchedData.json();
      setFetchData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataFromBackend(url);
  }, []);

  return fetchData;
}

export default useFetch;
