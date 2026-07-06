import ModalCard from "../../../components/modal_card/ModalCard";
import { Controller, useForm } from "react-hook-form";
import api from "../../../services/api";
import ActionButton from "../../../components/action_button/ActionButton";
import { TextField } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { IMaskInput } from "react-imask";
import { masks } from "../../../utils/Masks";

type VehicleFormProps = {
  handleCloseModal: () => void;
};

type VehicleInput = {
  model: string;
  color: string;
  plate: string;
};

function VehicleForm({ handleCloseModal }: VehicleFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
    control,
  } = useForm<VehicleInput>({
    mode: "onChange",
    defaultValues: { model: "", color: "", plate: "" },
  });

  const onSubmit = async (data: VehicleInput) => {
    try {
      await api.post("/vehicles", data);
      reset();
      handleCloseModal();
    } catch (err: any) {
      console.error("Erro ao registrar veículo", err);
      alert("Erro ao registrar veículo.");
    }
  };

  return (
    <ModalCard
      title="Cadastrar veículo"
      titleIcon={<LocalShippingOutlinedIcon fontSize="large" />}
    >
      <form
        id="vehicle-form"
        className="modal_container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          label="Modelo"
          required={true}
          fullWidth
          {...register("model")}
          sx={{ width: "100%", maxWidth: 320, background: "white" }}
        />
        <Controller
          name="plate"
          control={control}
          render={({ field }) => (
            <TextField
              label="Placa"
              required={true}
              fullWidth
              sx={{ width: "100%", maxWidth: 320, background: "white" }}
              value={field.value}
              slotProps={{
                input: {
                  inputComponent: IMaskInput as any,
                  inputProps: {
                    mask: masks.plate,
                    prepare: (value: string) => value.toUpperCase(),
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
          label="Cor"
          required={true}
          fullWidth
          {...register("color")}
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

export default VehicleForm;
