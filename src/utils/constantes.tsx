export const URL_CONEXAO =
  process.env.NEXT_PUBLIC_PROD === "PROD"
    ? process.env.NEXT_PUBLIC_PROD_URL_API
    : process.env.NEXT_PUBLIC_LOCAL_URL_API;

export const URL_USER = "/user";
export const URL_CARTEIRA = "/carteira";
export const URL_LANCAMENTOS = "/lancamentos";
export const URL_PARCELADOS = "/parcelados";
