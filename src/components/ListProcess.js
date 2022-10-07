import React from "react";

export function ListProcess({ data, comarca, competencia }) {
  return (
    <div className="px-4 md:px-10 py-4 md:py-7 xl:w-3/4 2xl:w-4/5 w-full">
      <div className="bg-white dark:bg-gray-700 px-4 md:px-10 pb-5">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <tbody>
              <tr
                tabindex="0"
                className="focus:outline-none text-sm leading-none text-gray-600 dark:text-gray-200   h-16"
              >
                <td className="w-1/2">
                  <div className="flex items-center">
                    <div className="w-auto p-2 h-10 bg-red-700 rounded-sm flex items-center justify-center">
                      <p className="text-xs font-bold leading-3 text-white">
                        PROCESS
                      </p>
                    </div>
                    <div className="pl-2">
                      <p className="text-sm font-medium leading-none text-gray-800 dark:text-white ">
                        Author
                      </p>
                      <p className="text-xs leading-3 text-gray-600 dark:text-gray-200   mt-2">
                        {data?.nomeAutor}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="pl-16">
                  <p>comar. {comarca}</p>
                </td>
                <td>
                  <p className="pl-16">compet. {competencia}</p>
                </td>
                <td>
                  <p className="pl-16">codCnj {data?.codCnj}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
