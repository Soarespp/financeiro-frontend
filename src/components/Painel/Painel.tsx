"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import IconCalculo from "../../img/img-calculos.png";
import IconLancamentos from "../../img/lancamentos.png";
import IconParcelados from "../../img/marquina-cartao.png";
import IconConfiguracoes from "../../img/icon-usuario-config.png";
import Card from "./fragments/Card";

export default function Painel() {
  const router = useRouter();
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "row",
      }}
    >
      <div
        style={{
          display: "grid",
          justifyContent: "center",
          gap: "16px",
          margin: "16px",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr)",
          width: "100vw",
        }}
      >
        <Card
          title="Dadods financeiros"
          img={IconCalculo}
          onClick={() => router.push("/simplificado")}
        />
        <Card
          title="Cartão/Parcelados"
          img={IconParcelados}
          onClick={() => router.push("/parcelados")}
        />
        <Card
          title="Lançamentos diversos"
          img={IconLancamentos}
          onClick={() => router.push("/lancamentos")}
        />
        <Card
          title="Configurações"
          img={IconConfiguracoes}
          onClick={() => router.push("/user")}
        />
      </div>
    </div>
  );
}
