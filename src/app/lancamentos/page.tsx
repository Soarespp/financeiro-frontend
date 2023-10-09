"use client";
import { useState } from "react";
import { useFinanceiroContext } from "@/context/financeiroContext";
import CadastroLancamento from "./fragments/CadastroLancamento";
import TableLancamentos from "./fragments/TableLancamentos";

const Lancamentos = () => {
  const [cadOpen, setCadOpen] = useState<any>();
  const {
    dataLancamentos: { lancamentos, deleteLancamento },
  } = useFinanceiroContext();

  if (cadOpen) {
    return (
      <CadastroLancamento
        onClose={() => setCadOpen(undefined)}
        cadOpen={cadOpen}
      />
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "4px 12px",
        }}
      >
        <h2>Lançamentos adicionais</h2>
        <button
          style={{
            borderRadius: "10px",
            minWidth: "100px",
            minHeight: "40px",
            backgroundColor: "#373636",
            color: "#8b9aff",
          }}
          onClick={() => setCadOpen({})}
        >
          Cadastrar
        </button>
      </div>
      <TableLancamentos
        title="Abertos"
        lancamentos={lancamentos?.filter((item: any) => !item.finalizado)}
        setCadOpen={setCadOpen}
        deleteLancamento={deleteLancamento}
      />
      <TableLancamentos
        title="Finalizados"
        lancamentos={lancamentos?.filter((item: any) => item.finalizado)}
        setCadOpen={setCadOpen}
        deleteLancamento={deleteLancamento}
      />
    </div>
  );
};

export default Lancamentos;
