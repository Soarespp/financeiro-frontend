"use client";

import { useParcelados, useUser } from "@/hooks";
import useCarteira, { CarteiraType } from "@/hooks/useCarteira";
import useLancamentos from "@/hooks/useLancamentos";
import { interfaceUsuario } from "@/hooks/useUser/useUser";
import React, { useContext, useEffect, useState } from "react";

interface ParceladoType {
  parcelados: any;
  cadastroParcelado: (param: any) => void;
  excluirParcela: (param: string) => void;
}

interface LancamentoType {
  lancamentos: any;
  deleteLancamento: (param: string) => void;
  cadastroLancamento: (param: any) => void;
}

interface FinanceiroType {
  financeiro: [];
  logout: () => void;
  dataParcelados: ParceladoType;
  dataLancamentos: LancamentoType;
  dataCarteira: CarteiraType;
  dataUsuario: Partial<interfaceUsuario>;
}

export const FinanceiroContext = React.createContext({} as FinanceiroType);

export const useFinanceiroContext = () => useContext(FinanceiroContext);

export const FinanceiroProvider = ({ children }: { children: any }) => {
  const [financeiro, setFinanceiro] = useState<[]>([]);

  const dataCarteira = useCarteira();

  const { usuario, getUsuario, criarUsuario, logoutUser, loginUser } =
    useUser();

  const {
    getParcelados,
    parcelados,
    cadastrarParcela,
    deleteParcela,
    updateParcela,
  } = useParcelados({
    user: usuario?._id,
  });

  const {
    lancamentos,
    getLancamentos,
    deleteLancamento,
    updateLancamento,
    cadastrarLancamento,
  } = useLancamentos({
    user: usuario?._id,
  });

  const excluirParcela = (idParcela: string) => {
    deleteParcela(idParcela);
  };

  const cadastroParcelado = (parcela: any) => {
    if (parcela._id) {
      updateParcela(parcela);
      return;
    }

    cadastrarParcela(parcela);
  };

  const cadastroLancamento = (lancamento: any) => {
    if (lancamento._id) {
      updateLancamento(lancamento);
      return;
    }

    cadastrarLancamento(lancamento);
  };

  const logout = () => {
    logoutUser();
    try {
      localStorage?.clear();
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    if (!!usuario?._id) {
      dataCarteira.getCarteira(usuario?._id);
      getParcelados();
      getLancamentos();
    }
  }, [usuario]);

  const dataParcelados = { parcelados, cadastroParcelado, excluirParcela };
  const dataLancamentos = { lancamentos, deleteLancamento, cadastroLancamento };
  const dataUsuario = { usuario, getUsuario, criarUsuario, loginUser };

  const ProviderFinan = {
    financeiro,
    logout,
    dataParcelados,
    dataLancamentos,
    dataCarteira,
    dataUsuario,
  };

  return (
    <FinanceiroContext.Provider value={ProviderFinan}>
      {children}
    </FinanceiroContext.Provider>
  );
};
