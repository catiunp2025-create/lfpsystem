import ActionButton from "../../../components/action_button/ActionButton";
import ModalCard from "../../../components/modal_card/ModalCard";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import api from "../../../services/api";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { TextField } from "@mui/material";

type ServiceFormProps = {
  handleCloseModal: () => void;
};

type ServiceInput = {
  name: string;
  value: number;
  description?: string;
};

function ServiceForm({ handleCloseModal }: ServiceFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    control,
    reset,
  } = useForm<ServiceInput>({
    mode: "onChange",
    defaultValues: { name: "", value: 0, description: "" },
  });

  const onSubmit = async (data: ServiceInput) => {
    try {
      await api.post("/services", data);
      reset();
      handleCloseModal();
    } catch (err: any) {
      console.error("Erro ao registrar serviço", err);
      alert("Erro ao registrar serviço.");
    }
  };

  return (
    <ModalCard
      title="Cadastrar Serviço"
      titleIcon={<NoteAddOutlinedIcon fontSize="large" />}
    >
      <form
        id="vehicle-form"
        className="modal_container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          label="Nome"
          required={true}
          {...register("name")}
          fullWidth
          sx={{ width: "100%", maxWidth: 320, background: "white" }}
        />
        <Controller
          name="value"
          control={control}
          render={({ field }) => (
            <NumericFormat
              customInput={TextField}
              label="Valor"
              required={true}
              fullWidth
              sx={{ width: "100%", maxWidth: 320, background: "white" }}
              value={field.value || ""}
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              decimalScale={2}
              fixedDecimalScale
              onValueChange={(values) => {
                field.onChange(values.floatValue);
              }}
            />
          )}
        />
        <TextField
          label="Descrição"
          multiline
          minRows={3}
          maxRows={8}
          {...register("description")}
          fullWidth
          sx={{ width: "100%", maxWidth: 320, background: "white" }}
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
          form="vehicle-form"
          disabled={!isValid}
          variant="primary"
        >
          Confirmar
        </ActionButton>
      </div>
    </ModalCard>
  );
}

export default ServiceForm;
