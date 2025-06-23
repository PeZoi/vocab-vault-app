import { useEffect, useState, useCallback } from "react";
import { ApiResponse } from "types";

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: null | any;
  refetch: () => Promise<void>;
}

export const useFetch = <T>(callback: () => Promise<ApiResponse>): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | any>(null);

  const fetchData = useCallback(async (isRefetch = false) => {
    if (!isRefetch) {
      setLoading(true);
    }
    try {
      const response = await callback();
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error: any) {
      setError(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }, [callback]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: () => fetchData(true) };
};

