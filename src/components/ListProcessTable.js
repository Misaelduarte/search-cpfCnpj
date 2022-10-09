import React, { useEffect, useState } from "react";
import { useProcess } from "../hooks/useProcess";
import Loading from "./Loading";

export function ListProcessTable() {
  const { data, isFetching } = useProcess();
  const [filter, setFilter] = useState("");
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    if (isFetching) {
      setNewData(data);
    }
  }, [data, isFetching]);

  function onChangeInputFilter(e) {
    setFilter(e.target.value);
  }

  useEffect(() => {
    if (newData !== undefined && filter === "") {
      setNewData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  function onFilterComarcas() {
    const dataFilter = data.filter((item) => item.comarca === filter);
    console.log("🚀 ~ dataFilter", dataFilter);

    if (dataFilter.length > 0) {
      setNewData(dataFilter);
    } else {
      setNewData([{}]);
    }
  }

  return isFetching ? (
    <div className="mt-10">
      <Loading />
    </div>
  ) : (
    newData.length > 0 && newData !== undefined && (
      <div className="-my-2 py-2 mt-10 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <div className="flex border-2 rounded ml-auto mr-4 w-96">
            <input
              type="text"
              className="px-4 py-2 w-full"
              value={filter}
              onChange={onChangeInputFilter}
              placeholder="Comarca..."
            />
            <button
              onClick={onFilterComarcas}
              className="btn px-6 py-2.5 bg-blue-600 text-white text-sm font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
            >
              Filtrar
            </button>
          </div>
          <table className="min-w-full mt-6">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Nº
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Autor
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Comarca
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Competência
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {newData?.map((process, index) =>
                process?.data?.map((item) => (
                  <tr key={item?.codProc}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm leading-5 text-gray-800">
                            #{index}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="text-sm leading-5 text-blue-900">
                        {item?.nomeAutor}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                      {process?.comarca}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                      {process?.competencia}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                      <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative text-xs">encontrado</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                      <button className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">
                        Ver Detalhes
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans"></div>
        </div>
      </div>
    )
  );
}
