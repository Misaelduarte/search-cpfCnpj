import React, { useEffect, useState } from "react";
import { comarcas } from "../params";

import { useProcess } from "../hooks/useProcess";

import { cpfMask, cnpjMask } from "../helpers";

import { cpf, cnpj } from "cpf-cnpj-validator";

export function Search() {
  const [search, setSearch] = useState("");
  const [inputSearchError, setInputSearchError] = useState(false);
  const [messageError, setMessageError] = useState("");

  const {
    setData,
    callApiSearch,
    setIsFetching,
    setCount,
    isButtonSearchDisabled,
    setIsButtonSearchDisabled,
    setIsSearchNotFound,
  } = useProcess();

  useEffect(() => {
    if (search === "") {
      setData([]);
    }
  }, [search]);

  function onChangeInputSearch(e) {
    const value = e.target.value;

    setInputSearchError(false);

    if (value.length > 18) {
      return;
    }

    if (value.length <= 14) {
      setSearch(cpfMask(value));
    } else {
      setSearch(cnpjMask(value));
    }
  }

  function validateCpfCnpj(value) {
    if (value.length === 0) {
      setMessageError("Campo vazio!");
      setInputSearchError(true);
      return false;
    }

    if (value.length < 14) {
      setMessageError("CPF ou CNPJ inválido!");
      setInputSearchError(true);
      return false;
    }

    if (value.length === 14) {
      if (cpf.isValid(value) === false) {
        setMessageError("CPF inválido!");
        setInputSearchError(true);
        return false;
      }
    }

    if (value.length > 14 && value.length <= 18) {
      if (cnpj.isValid(value) === false) {
        setMessageError("CNPJ inválido!");
        setInputSearchError(true);
        return false;
      }
    }

    setInputSearchError(false);
    return true;
  }

  function onSubmit() {
    if (validateCpfCnpj(search)) {
      setIsButtonSearchDisabled(true);
      setData([]);
      setCount(0);
      setIsFetching(true);
      setIsSearchNotFound(false);

      comarcas?.map((comarca, index) =>
        comarca?.competencias?.map((competencia) =>
          callApiSearch(comarca, competencia, search, index)
        )
      );
    }
  }

  return (
    <>
      <div className="mt-20 m-auto justify-center">
        <div className="flex items-center justify-center">
          <div className="flex flex-col">
            <div className="flex border-2 rounded">
              <input
                type="text"
                className={`px-4 py-2 w-96 text-lg ${
                  inputSearchError && "border-2 border-red-400 outline-none"
                }`}
                value={search}
                onChange={onChangeInputSearch}
                placeholder="Search..."
              />
              <button
                onClick={onSubmit}
                disabled={isButtonSearchDisabled}
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
            {inputSearchError && (
              <span className="text-sm text-red-500 pl-2 pt-1">
                {messageError}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
