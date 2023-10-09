"use client";
import { Header } from "@/components";
import { useFinanceiroContext } from "@/context/financeiroContext";
import { getSomaValoresMes } from "@/utils/getSomaValoresMes";
import { useEffect, useState } from "react";
import Month from "./fragments/Month";
import ArrowRigth from "../../img/arrow.png";
import ArrowLeft from "../../img/arrow-left.png";
import Image from "next/image";
import { addMonths, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export default function Simplificado() {
  const [dadosCalculado, setDadosCalculado] = useState({
    parcelados: 0,
    lancamentos: 0,
    total: 0,
  });
  const [meses, setMeses] = useState({
    prev: addMonths(new Date(), -1),
    current: new Date(),
    next: addMonths(new Date(), 1),
  });
  const { dataLancamentos, dataParcelados, dataCarteira } =
    useFinanceiroContext();

  useEffect(() => {
    const vlParcelados = getSomaValoresMes(
      "dtCompra",
      dataParcelados.parcelados,
      "vlParcela",
      meses.current
    );
    const vlLancamentos = getSomaValoresMes(
      "dtCompra",
      dataLancamentos.lancamentos,
      "vlParcela",
      meses.current
    );

    const vlVariaveis =
      dataCarteira.carteira?.variaveis.reduce(
        (soma: number, item: any) => soma + Number(item.valor),
        0
      ) || 0;

    const vlCartoes =
      dataCarteira.carteira?.cartoes.reduce(
        (soma: number, item) => soma + Number(item.valor),
        0
      ) || 0;

    const vlAjustado = vlCartoes > 0 ? vlCartoes - vlParcelados : 0;

    const total =
      Number(dataCarteira.carteira?.salario) +
      vlVariaveis -
      vlLancamentos -
      vlParcelados -
      vlAjustado +
      0;

    setDadosCalculado({
      parcelados: vlParcelados,
      lancamentos: vlLancamentos,
      total: total,
    });
  }, [
    dataParcelados.parcelados,
    dataLancamentos.lancamentos,
    dataCarteira.carteira,
    meses,
  ]);

  const changeMonth = (direction: "prev" | "next") => {
    const val = direction === "prev" ? -1 : 1;
    setMeses((old) => ({
      prev: addMonths(old.prev, val),
      current: addMonths(old.current, val),
      next: addMonths(old.next, val),
    }));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        flex: 1,
      }}
    >
      <div
        className="container-abstracte"
        style={{
          display: "grid",
          justifyContent: "center",
          gridTemplateColumns: "40% 40%",
          flex: 1,
          gap: "10%",
          margin: "25px 8px",
          filter: "blur(2px)",
        }}
      >
        <Month
          title={format(meses.prev, "MMMM/yyyy", { locale: ptBR })}
          lancamentos={0}
          parcelados={0}
          salario={0}
          cartoes={dataCarteira.carteira?.cartoes}
          variaveis={dataCarteira.carteira?.variaveis}
          total={0}
        />
        <Month
          title={format(meses.next, "MMMM/yyyy", { locale: ptBR })}
          cartoes={[]}
          variaveis={[]}
          lancamentos={0}
          parcelados={0}
          salario={0}
          total={0}
        />
      </div>
      <div
        style={{
          position: "absolute",
          width: "100vw",
          height: "76vh",
          display: "grid",
          justifyContent: "center",
        }}
      >
        <div
          className="containier-main"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(340px,550px)",
            backgroundColor: "#fff",
            margin: "18px",
          }}
        >
          <Month
            title={format(meses.current, "MMMM/yyyy", { locale: ptBR })}
            cartoes={dataCarteira.carteira?.cartoes}
            variaveis={dataCarteira.carteira?.variaveis}
            lancamentos={+dadosCalculado.lancamentos}
            parcelados={+dadosCalculado.parcelados}
            salario={Number(dataCarteira.carteira?.salario)}
            total={dadosCalculado.total}
          />
        </div>
      </div>
      <div
        style={{
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Image
          src={ArrowLeft}
          alt="Voltar"
          width={50}
          height={50}
          onClick={() => changeMonth("prev")}
        />
        <Image
          src={ArrowRigth}
          alt="Proximo"
          width={50}
          height={50}
          onClick={() => changeMonth("next")}
        />
      </div>
    </div>
  );
}
