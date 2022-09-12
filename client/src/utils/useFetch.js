import React, { useEffect, useState } from "react";

const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); //For later
  const [error, setError] = useState(null);

  const runFetchWithUrl = async (url) => {
    try {
      const fetchedData = await fetch(url);
      const response = await fetchedData.json();
      setData(response);
      setLoading(false);
    } catch (error) {
      setError({ error: error, message: error.message });
      setLoading(false);
    }
  };

  const runFetchWithOptions = async (url, options) => {
    console.log("options", options);
    try {
      const fetchedData = await fetch(url, options);
      const response = await fetchedData.json();
      setData(response);
      setLoading(false);
    } catch (error) {
      setError({ error: error, message: error.message });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (options) {
      runFetchWithOptions(url, options);
    } else {
      runFetchWithUrl(url);
    }
  }, []);

  return { data, loading, error, runFetchWithOptions, runFetchWithUrl };
};

export default useFetch;
