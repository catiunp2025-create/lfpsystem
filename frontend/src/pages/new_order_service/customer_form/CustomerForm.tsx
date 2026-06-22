import ModalCard from "../../../components/modal_card/ModalCard";
import { Controller, useWatch, useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import api from "../../../services/api";
import ActionButton from "../../../components/action_button/ActionButton";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import type { IdentificationType } from "../../../../../packages/shared/src";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { masks } from "../../../utils/Masks";
import FormSection from "../../../components/form_section/FormSection";

type CustomerFormProps = {
  handleCloseModal: () => void;
};

type CustomerInput = {
  name: string;
  type: IdentificationType;
  value: string;
  address: AddressInput;
};

type AddressInput = {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  postCode: string;
  city: string;
  state: string;
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
    const { address } = data;
    try {
      const { data: customer } = await api.post("/customers", {
        name: data.name,
        type: data.type,
        value: data.value,
      });
      await api.post(`/customers/${customer.id}/address`, address);

      reset();
      handleCloseModal();
    } catch (err: any) {
      console.error("Erro ao registrar cliente", err);
      alert("Erro ao registrar cliente.");
    }
  };

  return (
    <ModalCard
      title="Cadastrar cliente"
      titleIcon={<PersonAddAltOutlinedIcon fontSize="large" />}
    >
      <form
        id="customer-form"
        className="modal_container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormSection title="Dados pessoais">
          <TextField
            label="Nome"
            required={true}
            {...register("name")}
            sx={{ background: "white", gridColumn: "span 2" }}
          />

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <FormControl sx={{ background: "white" }}>
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
                required={true}
                sx={{ background: "white" }}
                label={identificationType}
                value={field.value}
                onChange={(event) => {
                  field.onChange(event.target.value);
                }}
                slotProps={{
                  input: {
                    inputComponent: IMaskInput as any,
                    inputProps: {
                      mask:
                        identificationType === "CPF" ? masks.cpf : masks.cnpj,
                      onAccept: (value: string) => {
                        field.onChange(value);
                      },
                    },
                  },
                }}
              />
            )}
          />
        </FormSection>
        <FormSection title="Endereço">
          <Controller
            name="address.postCode"
            control={control}
            render={({ field }) => (
              <TextField
                label="CEP"
                required={true}
                sx={{ background: "white" }}
                value={field.value}
                slotProps={{
                  input: {
                    inputComponent: IMaskInput as any,
                    inputProps: {
                      mask: masks.postCode,
                      onAccept: (value: string) => {
                        field.onChange(value);
                      },
                    },
                  },
                }}
              />
            )}
          />
          <TextField
            label="Bairro"
            required={true}
            {...register("address.neighborhood")}
            sx={{ background: "white" }}
          />
          <TextField
            label="Cidade"
            required={true}
            {...register("address.city")}
            sx={{ background: "white" }}
          />
          <TextField
            label="Estado"
            required={true}
            {...register("address.state")}
            sx={{ background: "white" }}
          />
          <TextField
            label="Rua"
            required={true}
            {...register("address.street")}
            sx={{ background: "white", gridColumn: "span 2" }}
          />
          <TextField
            label="Número"
            required={true}
            {...register("address.number")}
            sx={{ background: "white" }}
          />
          <TextField
            label="Complemento"
            {...register("address.complement")}
            sx={{ background: "white" }}
          />
        </FormSection>
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
