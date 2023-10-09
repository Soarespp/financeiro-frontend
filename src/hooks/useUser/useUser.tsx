import { useEffect, useState } from "react";

const URL_BASE = "http://localhost:8000";
const URL_USER = "/user";

export type userData = {
  _id: string;
  user: string;
  login: string;
  name: string;
  pass: string;
};

export interface interfaceUsuario {
  usuario: userData | undefined;
  getUsuario: (param: string) => void;
  criarUsuario: (param: Partial<userData>) => void;
  logoutUser: () => void;
  loginUser: (param1: string, param2: string) => void;
}

export default function useUser() {
  const URL_API = `${URL_BASE}${URL_USER}`;
  const [usuario, setUsuario] = useState<userData | undefined>();

  const logoutUser = () => setUsuario(undefined);

  const getUsuario = async (user: string) => {
    await fetch(`${URL_API}?_id=${user}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.user?.length > 0) {
          setUsuario(data.user[0]);
        }
      });
  };

  const criarUsuario = async (usuario: Partial<userData>) => {
    await fetch(URL_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.sucess) {
          setUsuario(data.user);
          try {
            localStorage?.setItem("user-id", data.user._id);
          } catch {
            console.log("error");
          }
        }
      });
  };

  const loginUser = async (user: string, pass: string) => {
    await fetch(`${URL_API}/login?user=${user}&pass=${pass}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.usuario) {
          setUsuario(data.usuario);
          try {
            localStorage?.setItem("user-id", data.usuario._id);
          } catch {
            console.log("error");
          }
        }
      });
  };

  return {
    usuario,
    getUsuario,
    criarUsuario,
    logoutUser,
    loginUser,
  };
}
