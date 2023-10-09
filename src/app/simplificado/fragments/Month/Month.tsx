interface propsMonth {
  title: string;
  salario: number;
  parcelados: number;
  lancamentos: number;
  cartoes?: { descricao: string; valor: number }[];
  variaveis?: { descricao: string; valor: number }[];
  total: number;
}

const getColorValor = (typeValor: "pos" | "neg" | "neutro") => {
  if (typeValor === "neutro") {
    return "#000";
  }

  return typeValor === "neg" ? "red" : "green";
};

const renderItemGrid = (
  descricao: string,
  valor: number = 0,
  colorChange: "pos" | "neg" | "neutro" = "neutro"
) => {
  return (
    <>
      <p
        style={{
          display: "flex",
          justifyContent: "end",
          marginRight: "18px",
          fontWeight: "700",
        }}
      >
        {`${descricao} :`}
      </p>
      <p style={{ color: getColorValor(colorChange) }}>
        {valor.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
      </p>
    </>
  );
};

const Month = ({
  title,
  salario,
  parcelados,
  lancamentos,
  cartoes = [],
  variaveis = [],
  total,
}: propsMonth) => {
  return (
    <div
      style={{
        border: "1px solid #000",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        fontSize: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          width: "100%",
          height: "60px",
          boxShadow: "0px 3px 2px 0px grey",
        }}
      >
        <h2>{title}</h2>
      </div>
      <div
        style={{
          display: "grid",
          flex: 1,
          marginTop: "16px",
          paddingInline: "8px",
          justifyContent: "center",
          gridTemplateColumns: "repeat(2,50%)",
        }}
      >
        {renderItemGrid("Salário", salario)}
        {variaveis
          ?.filter((item) => item.valor >= 0)
          .map((variavel) =>
            renderItemGrid(variavel.descricao, Number(variavel.valor), "pos")
          )}
        {renderItemGrid("Lancamentos", lancamentos, "neg")}
        {renderItemGrid("Parcelados", parcelados, "neg")}
        {cartoes?.map((cartao) =>
          renderItemGrid(cartao.descricao, +cartao.valor, "neg")
        )}

        {variaveis
          ?.filter((item) => item.valor < 0)
          .map((variavel) =>
            renderItemGrid(variavel.descricao, +variavel.valor * -1, "neg")
          )}
        {renderItemGrid("Total", total)}
      </div>
    </div>
  );
};

export default Month;
