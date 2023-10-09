import { getDataVencida } from "@/utils/fucDatas";
import { endOfMonth, isBefore } from "date-fns";
import { useState } from "react";

interface LancamentosProps {
  user: string | undefined;
}

const URL_BASE = "http://localhost:8000";
const URL_LANCAMENTOS = "/lancamentos";

export type typeLancamentos = {
  _id: string;
  user: string;
  descricao: string;
  valor: number;
  vezes: number;
  dtFim: Date;
  dtCompra: Date;
  pessoas: {
    name: string;
    _id: string;
  }[];
};

export default function useLancamentos({ user }: LancamentosProps) {
  const URL_API = `${URL_BASE}${URL_LANCAMENTOS}?user=${user}`;
  const [lancamentos, setLancamentos] = useState<typeLancamentos>();

  const getLancamentos = async () => {
    await fetch(URL_API)
      .then((response) => response.json())
      .then((data) => {
        const lancamentosFormatado = data.lancamentos?.map(
          (lancamento: any) => {
            const finalizado = getDataVencida(lancamento);
            return { ...lancamento, finalizado };
          }
        );
        setLancamentos(lancamentosFormatado);
      });
  };

  const cadastrarLancamento = async (lancamento: any) => {
    await fetch(`${URL_BASE}${URL_LANCAMENTOS}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lancamento, user: user }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.sucess) {
          getLancamentos();
        }
      });
  };

  const updateLancamento = async (lancamento: any) => {
    await fetch(`${URL_BASE}${URL_LANCAMENTOS}?_id=${lancamento._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lancamento, user: user }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.sucess) {
          getLancamentos();
        }
      });
  };

  const deleteLancamento = async (idLancamento: any) => {
    await fetch(`${URL_BASE}${URL_LANCAMENTOS}/${idLancamento}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.sucess) {
          getLancamentos();
        }
      });
  };
  return {
    lancamentos,
    getLancamentos,
    cadastrarLancamento,
    updateLancamento,
    deleteLancamento,
  };
}
