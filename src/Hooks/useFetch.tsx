import React from "react";

type RequestReturn<T> = {
  response: Response | null;
  json: T | null;
};

const useFetch = <T = unknown,>() => {
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const request = React.useCallback(
    async (url: string, options?: RequestInit): Promise<RequestReturn<T>> => {
      let response: Response | null = null;
      let json: T | null = null;
      try {
        setError(null);
        setLoading(true);
        response = await fetch(url, options);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Erro na requisição");
        }
        json = await response.json();
      } catch (err: unknown) {
        json = null;
        if (err instanceof Error) {
          setError(err.message);
        } 
      } finally {
        setData(json);
        setLoading(false);
      }
      return { response, json };
    },
    [],
  );

  return {
    data,
    loading,
    error,
    request,
  };
};

export default useFetch;
