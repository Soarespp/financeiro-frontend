"use client";
import { useState } from "react";
import CadastroParcelado from "./fragments/CadastroParcelado";
import { useFinanceiroContext } from "@/context/financeiroContext";
import TableParcelados from "./fragments/TableParcelados";

const Parcelados = () => {
  const [cadOpen, setCadOpen] = useState<any>();
  const {
    dataParcelados: { parcelados, excluirParcela },
  } = useFinanceiroContext();

  if (cadOpen) {
    return (
      <CadastroParcelado
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
        <h1>Compras parceladas</h1>
        <button
          onClick={() => setCadOpen({})}
          style={{
            borderRadius: "10px",
            minWidth: "100px",
            backgroundColor: "#373636",
            color: "#8b9aff",
            minHeight: "40px",
          }}
        >
          Cadastrar
        </button>
      </div>
      <TableParcelados
        title="Abertos"
        parcelados={parcelados?.filter((item: any) => !item.finalizado)}
        setCadOpen={setCadOpen}
        excluirParcela={excluirParcela}
      />
      <TableParcelados
        title="Finalizados"
        parcelados={parcelados?.filter((item: any) => item.finalizado)}
        setCadOpen={setCadOpen}
        excluirParcela={excluirParcela}
      />
    </div>
  );
};

export default Parcelados;
