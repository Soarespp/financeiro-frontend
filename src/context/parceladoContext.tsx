"use client";

import { useParcelados } from "@/hooks";
import React, { useContext, useEffect, useState } from "react";

export interface ParceladoProviderType {
  parcelados: any;
  cadastroParcelado: (param: any) => void;
  excluirParcela: (param: string) => void;
}

export const ParceladoContext = React.createContext(
  {} as ParceladoProviderType
);

export const useParceladoContext = () => useContext(ParceladoContext);

export const ParceladoProvider = ({ children }: { children: any }) => {
  const { getParcelados, parcelados, cadastrarParcela, deleteParcela } =
    useParcelados({
      user: "649c8a77a21727d9a719f885",
    });

  const excluirParcela = (idParcela: string) => {
    deleteParcela(idParcela);
  };

  const cadastroParcelado = (parcela: any) => {
    if (parcela._id) {
      return;
    }

    cadastrarParcela(parcela);
  };

  useEffect(() => {
    getParcelados();
  }, []);

  const Provider = {
    parcelados,
    cadastroParcelado,
    excluirParcela,
  };

  return (
    <ParceladoContext.Provider value={Provider}>
      {children}
    </ParceladoContext.Provider>
  );
};
