import "./TableParcelados.css";

import IconPencil from "@/img/icon-pencil.png";
import IconTrash from "@/img/icon-trash.png";
import Image from "next/image";

interface propsTableParcelas {
  title: string;
  parcelados: any;
  setCadOpen: (param: any) => void;
  excluirParcela: (param: string) => void;
}
export default function TableParcelados({
  title,
  parcelados,
  setCadOpen,
  excluirParcela,
}: propsTableParcelas) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflowX: "scroll",
        margin: "8px 16px",
      }}
    >
      <h2>{title}</h2>
      <table>
        <tr>
          <th>Descrição</th>
          <th>Vezes</th>
          <th>Valor</th>
          <th>Pessoas</th>
          <th>Dt. compra</th>
          <th>Dt. fim</th>
          <th>Actions</th>
        </tr>
        {parcelados?.map((parcela: any) => {
          return (
            <tr key={parcela._id}>
              <td>{parcela.descricao}</td>
              <td>
                {!parcela.vezes
                  ? "Recorrente"
                  : `${parcela.vezes} - (x ${parcela.vlParcela.toLocaleString(
                      "pt-br",
                      {
                        style: "currency",
                        currency: "BRL",
                      }
                    )})`}
              </td>
              <td>
                {parcela.valor.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>
              <td>{parcela.pessoas.length === 0 ? "Individual" : "Rateado"}</td>
              <td>{new Date(parcela.dtCompra).toLocaleDateString()}</td>
              <td>
                {!parcela.dtFim
                  ? "Recorrente"
                  : new Date(parcela.dtFim).toLocaleDateString()}
              </td>
              <td>
                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <Image
                    src={IconPencil}
                    alt="Editar"
                    width={40}
                    height={40}
                    onClick={() => setCadOpen(parcela)}
                  />
                  <Image
                    src={IconTrash}
                    alt="Editar"
                    width={40}
                    height={40}
                    onClick={() => excluirParcela(parcela._id)}
                  />
                </div>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
