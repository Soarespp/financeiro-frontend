"use client";
import { useFieldArray, useForm } from "react-hook-form";
import { useFinanceiroContext } from "@/context/financeiroContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import IconTrash from "@/img/icon-trash.png";

const User = () => {
  const router = useRouter();
  const {
    dataUsuario: { usuario },
    dataCarteira: { carteira, updateCarteira },
  } = useFinanceiroContext();

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      ...usuario,
      ...carteira,
      user: usuario?.user,
      salario: String(carteira?.salario),
    },
  });

  const {
    fields: fieldsVariaveis,
    append: appendVariaveis,
    remove: removeVariaveis,
  } = useFieldArray({
    control,
    name: "variaveis",
  });

  const {
    fields: fieldsCartoes,
    append: appendCartoes,
    remove: removeCartoes,
  } = useFieldArray({
    control,
    name: "cartoes",
  });

  const onSave = (data: any) => {
    updateCarteira({ ...data, _id: carteira?._id, user: usuario?._id });
    router.push("/");
  };

  const onClose = () => {
    reset();
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSave)}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 45%)",
        justifyContent: "center",
        boxShadow: "1px 3px 3px 3px #8b9aff",
        borderRadius: "16px",
        gap: 8,
        margin: "8px",
        padding: "8px",
        maxWidth: "600px",
      }}
    >
      <h2 style={{ gridColumnStart: 1, gridColumnEnd: 3 }}>
        Configurações do usuário:
      </h2>
      <div style={{ display: "grid", gridColumnStart: 1, gridColumnEnd: 3 }}>
        <p>Nome</p>
        <input {...register("name")} />
      </div>
      <div style={{ display: "grid", gridColumnStart: 1, gridColumnEnd: 2 }}>
        <p>Login</p>
        <input {...register("user")} />
      </div>
      <div style={{ display: "grid", gridColumnStart: 1, gridColumnEnd: 2 }}>
        <p>Senha</p>
        <input {...register("pass")} type="password" />
      </div>
      <h3 style={{ gridColumnStart: 1, gridColumnEnd: 3 }}>Confugrações</h3>
      <div style={{ display: "grid", gridColumnStart: 1, gridColumnEnd: 3 }}>
        <p>Salário</p>
        <input {...register("salario")} type="number" />
      </div>
      <h3>Variaveis</h3>
      <button
        type="button"
        style={{
          backgroundColor: "inherit",
          borderRadius: "16px",
          minHeight: "30px",
        }}
        onClick={() => {
          appendVariaveis({ descricao: "", valor: 0 });
        }}
      >
        Incluir
      </button>
      {fieldsVariaveis.map((variavel, keyVariavel) => (
        <div
          key={keyVariavel}
          style={{
            gridColumnStart: 1,
            gridColumnEnd: 3,
            display: "grid",
            gap: 8,
            gridTemplateColumns: "45% 45% 10%",
          }}
        >
          <input
            {...register(`variaveis.${keyVariavel}.descricao`)}
            placeholder="Descricao"
          />
          <input
            {...register(`variaveis.${keyVariavel}.valor`)}
            placeholder="Valor"
            type="number"
          />
          <Image
            src={IconTrash}
            alt="Editar"
            width={40}
            height={40}
            onClick={() => removeVariaveis(keyVariavel)}
          />
        </div>
      ))}
      <h3>Cartões</h3>
      <button
        type="button"
        style={{
          backgroundColor: "inherit",
          borderRadius: "16px",
          minHeight: "30px",
        }}
        onClick={() => {
          appendCartoes({ descricao: "", valor: 0 });
        }}
      >
        Incluir
      </button>
      {fieldsCartoes.map((cartoes, keyVariavel) => (
        <div
          key={keyVariavel}
          style={{
            gridColumnStart: 1,
            gridColumnEnd: 3,
            display: "grid",
            gap: 8,
            gridTemplateColumns: "45% 45% 10%",
          }}
        >
          <input
            {...register(`cartoes.${keyVariavel}.descricao`)}
            placeholder="Descricao"
          />
          <input
            {...register(`cartoes.${keyVariavel}.valor`)}
            placeholder="Valor"
            type="number"
          />
          <Image
            src={IconTrash}
            alt="Editar"
            width={40}
            height={40}
            onClick={() => removeCartoes(keyVariavel)}
          />
        </div>
      ))}
      <button
        onClick={() => onClose()}
        style={{
          backgroundColor: "inherit",
          borderRadius: "16px",
          minHeight: "30px",
        }}
      >
        cancel
      </button>
      <button
        type="submit"
        style={{
          backgroundColor: "#373636",
          color: "#8b9aff",
          borderRadius: "16px",
          minHeight: "30px",
        }}
      >
        save
      </button>
    </form>
  );
};

export default User;
