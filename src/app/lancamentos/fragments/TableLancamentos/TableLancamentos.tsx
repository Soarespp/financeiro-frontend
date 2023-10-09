import "./TableLancamentos.css";

import IconPencil from "@/img/icon-pencil.png";
import IconTrash from "@/img/icon-trash.png";
import Image from "next/image";

interface propsTableParcelas {
  title: string;
  lancamentos: any;
  setCadOpen: (param: any) => void;
  deleteLancamento: (param: string) => void;
}
export default function TableLancamentos({
  title,
  lancamentos,
  setCadOpen,
  deleteLancamento,
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
          <th>Parcelas</th>
          <th>Valor</th>
          <th>Dt. compra</th>
          <th>Dt. fim</th>
          <th>Actions</th>
        </tr>
        {lancamentos?.map((lancamento: any) => {
          return (
            <tr key={lancamento._id}>
              <td>{lancamento.descricao}</td>
              <td>
                {!lancamento.vezes
                  ? "Recorrente"
                  : `${
                      lancamento.vezes
                    } (x ${lancamento.vlParcela?.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })})`}
              </td>
              <td>
                {lancamento.valor.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>
              <td>{new Date(lancamento.dtCompra).toLocaleDateString()}</td>
              <td>
                {!lancamento.dtFim
                  ? "Recorrente"
                  : new Date(lancamento.dtFim).toLocaleDateString()}
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
                    onClick={() => setCadOpen(lancamento)}
                  />
                  <Image
                    src={IconTrash}
                    alt="Editar"
                    width={40}
                    height={40}
                    onClick={() => deleteLancamento(lancamento._id)}
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
