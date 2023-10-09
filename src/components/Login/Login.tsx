"use client";
import { useFinanceiroContext } from "@/context/financeiroContext";
import { ReactNode, useEffect, useState } from "react";
import CreateAccount from "../CreateAccount";
import "./Login.css";

type typeLogin = "login" | "logado" | "create";

export default function Login({ children }: { children: ReactNode }) {
  const {
    dataUsuario: { usuario, loginUser, getUsuario },
  } = useFinanceiroContext();
  const [logado, setLogado] = useState<typeLogin>("login");
  const [user, setUser] = useState({ user: "", pass: "" });

  useEffect(() => {
    try {
      const userSession = localStorage?.getItem("user-id") || "";
      if (userSession) {
        getUsuario?.(userSession);
      }
    } catch {
      console.log("error");
    }
  }, []);

  useEffect(() => {
    setLogado(usuario?._id ? "logado" : "login");
  }, [usuario]);

  const clickLogin = () => {
    if (user.pass.length > 0 && user.user.length > 0) {
      loginUser?.(user.user, btoa(user.pass));
    }
  };

  if (logado === "logado") {
    return <div>{children}</div>;
  }

  return (
    <div className="container-geral">
      <div className="container-img" />
      <div className="container-menu">
        {logado === "create" ? (
          <CreateAccount onCancel={() => setLogado("login")} />
        ) : (
          <div className="container">
            <header>
              <h1>Login</h1>
            </header>
            <input
              placeholder="user"
              onChange={(event) => {
                setUser((old) => ({ ...old, user: event.target.value }));
              }}
            />
            <input
              placeholder="pass"
              type="password"
              onChange={(event) => {
                setUser((old) => ({ ...old, pass: event.target.value }));
              }}
            />
            <div className="container-actions">
              <button onClick={() => clickLogin()}>Logar</button>
              {/* <button
                className="button-account"
                onClick={() => setLogado("create")}
              >
                Criar Conta
              </button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
