import { useFinanceiroContext } from "@/context/financeiroContext";
import { addMonths, differenceInMonths, format, isDate } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import IconTrash from "@/img/icon-trash.png";
import IconAdd from "@/img/icon-add.png";

interface CadastroParceladoProps {
  onClose: () => void;
  cadOpen: any;
}

const CadastroParcelado = ({ onClose, cadOpen }: CadastroParceladoProps) => {
  const [haveDtEnd, setHaveDtEnd] = useState<boolean>(
    !cadOpen._id ? true : !!cadOpen.dtFim
  );

  const {
    dataParcelados: { cadastroParcelado },
  } = useFinanceiroContext();

  const { register, handleSubmit, watch, setValue, control } = useForm({
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pessoas",
  });

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

  const campoParcelas = watch("vezes");
  const campoDtCompra = watch("dtCompra");

  const onSubmit = (data: any) => {
    cadastroParcelado({ ...cadOpen, ...data });
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
        <h2 style={{ gridColumnStart: 1, gridColumnEnd: 3 }}>
          Cadastro parcelado
        </h2>
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
        <div
          style={{
            gridColumnStart: 1,
            gridColumnEnd: 3,
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <input
            type="checkbox"
            title="teste"
            checked={!haveDtEnd}
            onChange={(event) => {
              setHaveDtEnd((oldVal) => !oldVal);
            }}
          />
          <p>Sem dt fim</p>
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
        <div
          style={{
            margin: "12px 0px",
            gridColumnStart: 1,
            gridColumnEnd: 3,
            boxShadow: "0px 2px 2px 2px #ddd",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              boxShadow: "0px 2px 2px 2px #ddd",
              padding: "8px",
            }}
          >
            <h3>Dividir com:</h3>
            <Image
              style={{
                gridColumnStart: 5,
                gridColumnEnd: 6,
                borderRadius: "12px",
              }}
              src={IconAdd}
              alt="Editar"
              width={30}
              height={30}
              onClick={() => append({ name: "" })}
            />
          </div>
          {fields.map((terceiro, keyTerceiro) => (
            <div
              key={keyTerceiro}
              style={{
                display: "grid",
                gridTemplateAreas: "repeat(5, 20%)",
                padding: "8px",
                gap: "8px",
              }}
            >
              <input
                style={{
                  gridColumnStart: 1,
                  gridColumnEnd: 5,
                }}
                {...register(`pessoas.${keyTerceiro}.name`)}
                placeholder="Nome do terceiro"
              />
              <Image
                style={{
                  gridColumnStart: 5,
                  gridColumnEnd: 6,
                  borderRadius: "12px",
                }}
                src={IconTrash}
                alt="Editar"
                width={40}
                height={40}
                onClick={() => remove(keyTerceiro)}
              />
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          style={{
            backgroundColor: "inherit",
            minWidth: "40%",
            borderRadius: "16px",
            minHeight: "30px",
          }}
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

export default CadastroParcelado;
