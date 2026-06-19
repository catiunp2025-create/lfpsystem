import ModalCard from "../../../components/modal_card/ModalCard";
import { Controller, useWatch, useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import api from "../../../services/api";
import ActionButton from "../../../components/action_button/ActionButton";
import type { IdentificationType } from "../../../../../packages/shared/src";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { masks } from "../../../utils/Masks";

type CustomerFormProps = {
  handleCloseModal: () => void;
};

type CustomerInput = {
  name: string;
  type: IdentificationType;
  value: string;
};

function CustomerForm({ handleCloseModal }: CustomerFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<CustomerInput>({
    mode: "onChange",
    defaultValues: { name: "", type: "CNPJ", value: "" },
  });
  const identificationType = useWatch({
    control,
    name: "type",
  });

  const onSubmit = async (data: CustomerInput) => {
    try {
      await api.post("/customers", data);
      reset();
      handleCloseModal();
    } catch (err: any) {
      console.error("Erro ao registrar veículo", err);
      alert("Erro ao registrar veículo.");
    }
  };

  return (
    <ModalCard>
      <form
        id="customer-form"
        className="modal_container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          label="Nome"
          {...register("name")}
          sx={{ width: 320, background: "white" }}
        />

        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <FormControl sx={{ width: 320, background: "white" }}>
              <InputLabel>Tipo</InputLabel>

              <Select {...field} label="Tipo">
                <MenuItem value="CPF">CPF</MenuItem>

                <MenuItem value="CNPJ">CNPJ</MenuItem>
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="value"
          control={control}
          render={({ field }) => (
            <TextField
              sx={{ width: 320, background: "white" }}
              label={identificationType}
              value={field.value}
              onChange={(event) => {
                field.onChange(event.target.value);
              }}
              slotProps={{
                input: {
                  inputComponent: IMaskInput as any,
                  inputProps: {
                    mask: identificationType === "CPF" ? masks.cpf : masks.cnpj,
                    onAccept: (value: string) => {
                      field.onChange(value);
                    },
                  },
                },
              }}
            />
          )}
        />
      </form>
      <div className="modal_footer">
        <ActionButton
          disabled={false}
          onClick={handleCloseModal}
          variant="secondary"
        >
          Fechar
        </ActionButton>
        <ActionButton
          type="submit"
          form="customer-form"
          disabled={!isValid}
          variant="primary"
        >
          Confirmar
        </ActionButton>
      </div>
    </ModalCard>
  );
}

export default CustomerForm;
