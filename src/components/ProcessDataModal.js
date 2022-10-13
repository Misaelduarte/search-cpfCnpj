import React, { useState } from "react";
import copy from "copy-to-clipboard";

export function ProcessDataModal({ closeModal, process }) {
  const [isCopy, setIsCopy] = useState(false);

  function assembleCopyText(content) {
    const renderTextCopy = `${content.codCnj} – Figura como ${content.tipoReu}`;
    copy(renderTextCopy);
  }

  function onCopyContent(content) {
    assembleCopyText(content);
    setIsCopy(true);

    setTimeout(() => {
      closeModal();
      setIsCopy(false);
    }, 700);
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full">
        <div className="relative w-auto my-6 mx-auto">
          {/*content*/}
          <div className="border-0 rounded-lg max-w-3xl shadow-lg bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Process</h3>
              <button
                onClick={closeModal}
                type="button"
                className="flex items-center justify-center h-10 w-10 hover:bg-gray-300 rounded-full transition-all"
              >
                <svg
                  className="h-6 w-6"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <line x1="18" y1="6" x2="6" y2="18" />{" "}
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            {/*body*/}
            <div className="flex px-20 w-full">
              <ul className="my-4 text-slate-500">
                <li className="flex flex-col text-base text-body-color mb-4">
                  <strong className="flex">Autor:</strong>
                  <p>{process?.nomeAutor}</p>
                </li>
                <li className="flex flex-col text-base text-body-color mb-4">
                  <strong className="flex">Cod. Cnj:</strong>
                  <p>{process?.codCnj}</p>
                </li>
                <li className="flex flex-col text-base text-body-color mb-4">
                  <strong className="flex">Tipo:</strong>
                  <p>{process?.tipoReu}</p>
                </li>
                <li className="flex flex-col text-base text-body-color mb-4">
                  <strong className="flex">Nome do Reu:</strong>
                  <p>{process?.nomeReu}</p>
                </li>
                <li className="flex flex-col text-base text-body-color mb-4">
                  <strong className="flex">Cod. Proc:</strong>
                  <p>{process?.codProc}</p>
                </li>
                <li className="flex flex-col text-base text-body-color mb-4">
                  <strong className="flex">Desc. Serv.:</strong>
                  <p>{process?.descServ}</p>
                </li>
                <li className="flex flex-col text-base text-body-color mb-4">
                  <strong className="flex">Desc Fase:</strong>
                  <p>{process?.descrFase}</p>
                </li>
                <li className="flex flex-col text-base text-body-color mb-4">
                  <strong className="flex">Nome da Comarca:</strong>
                  <p>{process?.nomeComarca}</p>
                </li>
              </ul>
              <div className="px-20" />
            </div>
            {/*footer*/}
            {isCopy && (
              <div className="absolute right-10 bottom-1 text-sm">
                <span>Copiado!</span>
              </div>
            )}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => closeModal()}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => onCopyContent(process)}
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
