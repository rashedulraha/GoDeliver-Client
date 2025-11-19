import axios from "axios";
import React, { useEffect, useState } from "react";

const useFetchCounters = (url) => {
  const [fetchData, setFetchData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const res = await axios(url);
        setFetchData(res.data);
        console.log(res.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [url]);

  {
    return { fetchData, error, loading };
  }
};

export default useFetchCounters;
