"use client";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useFinanceiroContext } from "@/context/financeiroContext";
import IconeHome from "../../img/icon-home.png";
import IconeExit from "../../img/icone-exit.png";
import Image from "next/image";

const Header = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { logout } = useFinanceiroContext();

  const clickLogout = () => {
    router.push("/");
    logout?.();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div
        style={{
          borderBottom: "1px solid #000",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#373636",
          color: "#8b9aff",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "24px 12px 12px 12px",
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <h1>Controle financeiro</h1>
          <h4>{`By Pepeu's tec`}</h4>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={IconeHome}
            alt="Imagem home"
            width={50}
            height={50}
            color="#8b9aff"
            onClick={() => router.push("/")}
          />
          <Image
            src={IconeExit}
            alt="Exit"
            width={50}
            height={50}
            onClick={clickLogout}
          />
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
