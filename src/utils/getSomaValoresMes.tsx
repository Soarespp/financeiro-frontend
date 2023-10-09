import { getDataDentroPeriodo, getDataVencida } from "./fucDatas";

export const getSomaValoresMes = (
  filedCompra: string,
  dados: Array<any>,
  fieldValor: string,
  dataCompare: Date = new Date()
) => {
  const dadosFiltrados =
    dados
      ?.filter((item: any) => {
        return !getDataVencida(item, dataCompare);
      })
      .filter((item) => getDataDentroPeriodo(item, filedCompra, dataCompare)) ||
    [];

  let dataReturb = dadosFiltrados.reduce(
    (soma, current) => soma + current[fieldValor],
    0
  );

  return dataReturb;
};
