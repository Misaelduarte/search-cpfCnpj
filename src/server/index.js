import express from "express";
import axios from "axios";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(7777);

app.use(cors());
app.post("/search", (req, res) => {
  let { cpfcnpj, comarca, competencia } = req.body;

  const data = {
    anoInicial: "2000",
    anoFinal: 2022,
    origem: "1",
    totalProcessoPesquisa: 300,
    tipoConsulta: "publica",
    isPortalDeServicos: 1,
    isPortal: "S",
    pIsProcAtivos: "N",
    secao: "RJ",
    tipoSegundaInstancia: "1",
    validarSecao: true,
    comarca,
    competencia,
    codCom: null,
    codComp: null,
    cpfcnpj,
    aba: "cpfcnpj",
    radio: "1",
  };

  axios
    .post(
      "https://www3.tjrj.jus.br/consultaprocessual/api/processos/por-cpf-cnpj",
      data,
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "recaptcha-token":
            "03AIIukzih1LETzwc9jaMMjaFumPL39cLJSYQcxIPXcct_5ZuAmpleQv8IOy_kYjngEfqVi-k_9qcNAFkzWhYbJnBzYgnWkn-VYr_idayxrpAfVywBtKcaMuSg1aCqWo-v2JlatitY6P08rfZdW7eMSteAif_k-1e4oEl9OVDO0ZL50nAlj0w7-akUn7MJY8qRfa-dUYarwW3sAehoMHtdkMDl3Y2hFeapXtI4pzpPfHUQGLcw9qZ3hFJzI621P_PmVQuJjGKG67dJ0VVCVEFfRy-lc5MI1Qz4x2vYY0-3J1xEUF0hdQ0a1gVizQaQ19sPHk2zcsgPVm9Eek99EHwtWv2fOaCddyWacf7hOl3scz9_VwdH7_9ESqj8cZCo03xt8XPlGzUYthwbrIx1Ct0x202JuLdys2M1IANMjAvdyA1O_ewSLBI980Fm4KI1aZvIvoGF7FMCudD5rFBMLc4OVbmecQtj9sJK0TqGi_kZxq3CKubn3rEqhFiPb9iWvXkX5KZor0r8wDBjukFXaYZR9DslFGrFDXfvmQ",
        },
      }
    )
    .then(function (response) {
      console.log(response.data);
      console.log(response.status);
      console.log("🚀 ~ req", req.body);
      return res.json({ data: response.data, comarca, competencia });
    })
    .catch(function (error) {
      if (error) {
        console.log(error);
      }
    });
});
