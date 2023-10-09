import { useFinanceiroContext } from "@/context/financeiroContext";
import { userData } from "@/hooks/useUser/useUser";
import { useForm } from "react-hook-form";

interface interfaceCreaAccount {
  onCancel: () => void;
}

export default function CreateAccount({ onCancel }: interfaceCreaAccount) {
  const { register, handleSubmit } = useForm();
  const {
    dataUsuario: { criarUsuario },
  } = useFinanceiroContext();

  const createAccont = (data: Partial<userData>) => {
    if (data && data.pass) {
      criarUsuario?.({ ...data, pass: btoa(data.pass) });
    }
  };

  return (
    <form onSubmit={handleSubmit(createAccont)} className="container-create">
      <h1>CreateAccount</h1>
      <input {...register("name")} placeholder="name" value="Priscila Brum" />
      <input {...register("user")} placeholder="username" value="pri" />
      <input
        {...register("pass")}
        placeholder="senha"
        type="password"
        value="pri"
      />
      <input
        {...register("email")}
        placeholder="email"
        type="email"
        value="brum.pri@hotmail.com"
      />
      <div className="container-actions">
        <button>Criar</button>
        <button type="reset" className="button-account" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
