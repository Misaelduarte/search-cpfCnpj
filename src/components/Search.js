import React, { useState } from "react";
import { comarcas } from "../params";
import Alert from "./Alert";

import { api } from "../api";
import { ListProcess } from "./ListProcess";

function Search() {
  const [search, setSearch] = useState();
  const [data, setData] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  function onChangeInputSearch(e) {
    setSearch(e.target.value);

    if (e.target.value === "") {
      setData([]);
      setShowMessage(false);
    }
  }

  async function callApiSearch(comarca, competencia) {
    await api
      .post("/search", {
        // cpfcnpj: "31.160.674/0001-87",
        cpfcnpj: search,
        comarca: comarca.codigo,
        competencia: competencia.codigo,
      })
      .then((res) => {
        setData((data) => [...data, res.data]);
        console.log("🚀 ~ data", data);
        setShowMessage(true);
        return res.data;
      });
  }

  function onSubmit() {
    comarcas.map((comarca) =>
      comarca.competencias.map((competencia) =>
        callApiSearch(comarca, competencia)
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
              className="px-4 py-2 w-80"
              value={search}
              onChange={onChangeInputSearch}
              placeholder="Search..."
            />
            <button
              onClick={onSubmit}
              className="flex items-center justify-center px-4 border-l"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          {showMessage && <Alert isSuccess={data.length > 0} />}
        </div>

        {data.length > 0 &&
          data?.map((item) =>
            item.data.map((info) => (
              <ListProcess
                data={info}
                comarca={item.comarca}
                competencia={item.competencia}
              />
            ))
          )}
      </div>
    </>
  );
}

export default Search;
