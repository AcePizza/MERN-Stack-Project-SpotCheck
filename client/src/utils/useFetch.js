import React, { useEffect, useState } from "react";

function useFetch(url, page) {
  const [fetchData, setFetchData] = useState(() => {
    return null;
  });

  console.log("url : ", url);

  const fetchDataFromBackend = async (url) => {
    try {
      const fetchedData = await fetch(url);
      const respose = await fetchedData.json();
      console.log(respose);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataFromBackend(url);
  }, []);

  return <div>useFetch</div>;
}

export default useFetch;