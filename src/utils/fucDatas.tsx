import { endOfMonth, isAfter, isBefore } from "date-fns";

export const getDataVencida = (field: any, dtValidando = new Date()) => {
  if (!field.dtFim) {
    return false;
  }
  const dtFim = endOfMonth(new Date(field.dtFim));
  const resultBefore = isAfter(endOfMonth(dtValidando), dtFim);

  return resultBefore;
};

export const getDataDentroPeriodo = (
  field: any,
  fieldName: string,
  dataCompare: Date = new Date()
) => {
  if (!field.dtFim) {
    return true;
  }
  const dataValida = endOfMonth(new Date(field[fieldName]));

  return !!field[fieldName] && isBefore(dataValida, dataCompare);
};
