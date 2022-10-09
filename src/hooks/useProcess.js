import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api";

const ProcessContext = createContext({});

const REQUEST_SEARCH_LENGTH = 192;

export function ProcessProvider({ children }) {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [count, setCount] = useState(0);

  function callApiSearch(comarca, competencia, search, index) {
    api
      .post("/search", {
        // cpfcnpj: "31.160.674/0001-87",
        cpfcnpj: search,
        comarca: comarca.codigo,
        competencia: competencia.codigo,
      })
      .then((res) => {
        setCount((state) => state + 1);
        if (res.data.data.length > 0) {
          setData((data) => [...data, res.data]);
          return res.data;
        }
      });
  }

  useEffect(() => {
    console.log("🚀 ~ count", count);
    if (count === REQUEST_SEARCH_LENGTH) {
      setIsFetching(false);
    }
  }, [count, data.length]);

  return (
    <ProcessContext.Provider
      value={{
        data,
        setData,
        callApiSearch,
        isFetching,
        setIsFetching,
        count,
        setCount,
      }}
    >
      {children}
    </ProcessContext.Provider>
  );
}

export function useProcess() {
  const context = useContext(ProcessContext);

  return context;
}
