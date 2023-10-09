import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { addMonths, differenceInMonths, format, isDate } from "date-fns";

import { useFinanceiroContext } from "@/context/financeiroContext";
import { typeLancamentos } from "@/hooks/useLancamentos/useLancamentos";

interface CadastroLancamentoProps {
  onClose: () => void;
  cadOpen: any;
}

const CadastroLancamento = ({ onClose, cadOpen }: CadastroLancamentoProps) => {
  const [haveDtEnd, setHaveDtEnd] = useState<boolean>(
    !cadOpen._id ? true : !!cadOpen.dtFim
  );
  const {
    dataLancamentos: { cadastroLancamento },
  } = useFinanceiroContext();
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      ...cadOpen,
      vezes: !!cadOpen?.vezes ? String(cadOpen?.vezes) : "1",
      dtCompra: !!cadOpen?.dtCompra
        ? format(new Date(cadOpen?.dtCompra), "yyyy-MM-dd")
        : format(new Date(), "yyyy-MM-dd"),
      dtFim: !!cadOpen?.dtFim
        ? format(new Date(cadOpen?.dtFim), "yyyy-MM-dd")
        : format(addMonths(new Date(), 1), "yyyy-MM-dd"),
    },
  });

  const campoParcelas = watch("vezes");
  const campoDtCompra = watch("dtCompra");

  const calculaParcelas = (field: string, valor: any) => {
    if (!haveDtEnd) {
      return;
    }

    const oldVezes = Number(campoParcelas || 1);

    if (field === "dtCompra") {
      if (isDate(new Date(valor))) {
        const newDate = addMonths(valor, oldVezes);
        setValue("dtFim", format(newDate, "yyyy-MM-dd"));
      }
      return;
    }

    if (!isDate(new Date(campoDtCompra))) {
      return;
    }

    const oldDtCompra = new Date(campoDtCompra);

    if (field === "dtFim") {
      if (isDate(new Date(valor))) {
        const qt = differenceInMonths(valor, oldDtCompra);
        if (qt < 0) {
          setValue(
            "dtCompra",
            format(addMonths(new Date(valor), qt), "yyyy-MM-dd")
          );
          setValue("vezes", qt * -1);
          return;
        }
        setValue("vezes", qt);
      }
      return;
    }

    const newDate = addMonths(oldDtCompra, valor);
    setValue("dtFim", format(newDate, "yyyy-MM-dd"));
  };

  const onSubmit = (data: typeLancamentos) => {
    let dataUpdate = { ...cadOpen, ...data };
    cadastroLancamento(dataUpdate);
    onClose();
  };

  useEffect(() => {
    if (!haveDtEnd) {
      setValue("vezes", null);
      setValue("dtFim", null);
    }
  }, [haveDtEnd]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "grid",
        maxWidth: "600px",
        margin: "16px auto",
      }}
    >
      <div
        style={{
          display: "grid",
          maxWidth: "600px",
          padding: "20px",
          gap: "16px",
          margin: "0px 16px",
          boxShadow: "1px 3px 3px 3px #8b9aff",
          borderRadius: "16px",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <p style={{ gridColumnStart: 1, gridColumnEnd: 3 }}>
          Cadastro Lançamento
        </p>

        <input
          {...register("dtCompra")}
          type="date"
          placeholder="Dt. Compra"
          onChange={(event) => {
            calculaParcelas("dtCompra", new Date(event.target.value));
          }}
        />
        <input
          style={{ gridColumnStart: 1, gridColumnEnd: 3 }}
          {...register("descricao")}
          placeholder="descrição"
          defaultValue={cadOpen?.descricao?.toString()}
        />
        <input
          {...register("valor")}
          type="number"
          placeholder="Valor da compra"
        />
        <div style={{ gridColumnStart: 1, gridColumnEnd: 3 }}>
          <p>Sem dt fim</p>
          <input
            type="checkbox"
            title="teste"
            checked={!haveDtEnd}
            onChange={(event) => {
              setHaveDtEnd((oldVal) => !oldVal);
            }}
          />
        </div>
        {haveDtEnd && (
          <>
            <input
              type="number"
              {...register("vezes")}
              placeholder="Qt. de parcelas"
              onChange={(event) => {
                calculaParcelas("vezes", Number(event.target.value || 1));
              }}
            />

            <input
              {...register("dtFim")}
              type="date"
              placeholder="Dt. Fim Compra"
              onChange={(event) => {
                calculaParcelas("dtFim", new Date(event.target.value));
              }}
            />
          </>
        )}
        <button
          style={{
            backgroundColor: "inherit",
            minWidth: "40%",
            borderRadius: "16px",
            minHeight: "30px",
          }}
          onClick={onClose}
        >
          Cancelar
        </button>
        <button
          type="submit"
          style={{
            backgroundColor: "#373636",
            color: "#8b9aff",
            minWidth: "40%",
            borderRadius: "16px",
            minHeight: "30px",
          }}
        >
          Salvar
        </button>
      </div>
    </form>
  );
};

export default CadastroLancamento;
