import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api";

const ProcessContext = createContext({});

const REQUEST_SEARCH_LENGTH = 289;

export function ProcessProvider({ children }) {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isSearchNotFound, setIsSearchNotFound] = useState(false);
  const [isButtonSearchDisabled, setIsButtonSearchDisabled] = useState(false);
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
    if (count === REQUEST_SEARCH_LENGTH) {
      setIsFetching(false);
      setIsButtonSearchDisabled(false);

      if (data.length <= 0) {
        setIsSearchNotFound(true);
      }
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
        isSearchNotFound,
        setIsSearchNotFound,
        isButtonSearchDisabled,
        setIsButtonSearchDisabled,
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
