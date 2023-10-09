import { URL_CARTEIRA, URL_CONEXAO } from "@/utils/constantes";
import { useState } from "react";

export type carteiraData = {
  _id: string;
  salario: Number;
  cartoes: typeCartoes;
  variaveis: Array<{ descricao: string; valor: number }>;
  __v: Number;
};

export type typeCartoes = { descricao: string; valor: number }[];

export interface CarteiraType {
  carteira: carteiraData | undefined;
  deleteCarteira: (idCarteira: string, user: string) => void;
  cadastrarCarteira: (param: any) => void;
  updateCarteira: (param: any) => void;
}

export default function useCarteira() {
  const URL_API = `${URL_CONEXAO}${URL_CARTEIRA}`;
  const [carteira, setCarteira] = useState<carteiraData>();

  const getCarteira = async (user: string) => {
    await fetch(`${URL_API}?user=${user}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.carteiras.length > 0) {
          setCarteira(data.carteiras[0]);
        }
      });
  };

  const cadastrarCarteira = async (carteira: any) => {
    await fetch(`${URL_CONEXAO}${URL_CARTEIRA}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(carteira),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.sucess) {
          getCarteira(carteira.user);
        }
      });
  };

  const updateCarteira = async (carteira: any) => {
    await fetch(`${URL_CONEXAO}${URL_CARTEIRA}?_id=${carteira._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(carteira),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.sucess) {
          getCarteira(carteira.user);
        }
      });
  };

  const deleteCarteira = async (idCarteira: any, user: string) => {
    await fetch(`${URL_CONEXAO}${URL_CARTEIRA}/${idCarteira}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.sucess) {
          getCarteira(user);
        }
      });
  };

  return {
    carteira,
    getCarteira,
    cadastrarCarteira,
    updateCarteira,
    deleteCarteira,
  };
}
