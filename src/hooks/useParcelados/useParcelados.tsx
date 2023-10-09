import { URL_CONEXAO, URL_PARCELADOS } from "@/utils/constantes";
import { getDataVencida } from "@/utils/fucDatas";
import { useState } from "react";

interface ParceladosProps {
  user: string | undefined;
}

export default function useParcelados({ user }: ParceladosProps) {
  const URL_API = `${URL_CONEXAO}${URL_PARCELADOS}?user=${user}`;
  const [parcelados, setParcelados] = useState();

  const getParcelados = async () => {
    await fetch(URL_API)
      .then((response) => response.json())
      .then((data) => {
        const parceladosFormatado = data.parcelados?.map((parcela: any) => {
          const finalizado = getDataVencida(parcela);

          return { ...parcela, finalizado };
        });
        setParcelados(parceladosFormatado);
      });
  };

  const cadastrarParcela = async (parcela: any) => {
    await fetch(`${URL_CONEXAO}${URL_PARCELADOS}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...parcela, user: user }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.sucess) {
          getParcelados();
        }
      });
  };

  const updateParcela = async (parcela: any) => {
    await fetch(`${URL_CONEXAO}${URL_PARCELADOS}?_id=${parcela._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...parcela, user: user }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.sucess) {
          getParcelados();
        }
      });
  };

  const deleteParcela = async (idParcela: any) => {
    await fetch(`${URL_CONEXAO}${URL_PARCELADOS}/${idParcela}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.sucess) {
          getParcelados();
        }
      });
  };
  return {
    parcelados,
    getParcelados,
    cadastrarParcela,
    updateParcela,
    deleteParcela,
  };
}
