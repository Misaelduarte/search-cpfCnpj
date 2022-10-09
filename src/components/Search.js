import React, { useEffect, useState } from "react";
import { comarcas } from "../params";
import Alert from "./Alert";

import { useProcess } from "../hooks/useProcess";

export function Search() {
  const [search, setSearch] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const { data, setData, callApiSearch, setIsFetching, setCount } =
    useProcess();

  function onChangeInputSearch(e) {
    setSearch(e.target.value);
  }

  useEffect(() => {
    if (search === "") {
      setShowMessage(false);
      setData([]);
    }
  }, [search, setData]);

  function onSubmit() {
    setData([]);
    setCount(0);
    setIsFetching(true);

    comarcas?.map((comarca, index) =>
      comarca?.competencias?.map((competencia) =>
        callApiSearch(comarca, competencia, search, index)
      )
    );
  }

  return (
    <>
      <div className="mt-20 m-auto justify-center">
        <div className="flex items-center justify-center">
          <div className="flex border-2 rounded">
            <input
              type="text"
              className="px-4 py-2 w-96 text-lg"
              value={search}
              onChange={onChangeInputSearch}
              placeholder="Search..."
            />
            <button
              onClick={onSubmit}
              className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="search"
                className="w-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          {showMessage && <Alert isSuccess={data.length > 0} />}
        </div>
      </div>
    </>
  );
}
