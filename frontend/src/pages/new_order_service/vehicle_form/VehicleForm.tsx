import ModalCard from "../../../components/modal_card/ModalCard";
import { useForm } from "react-hook-form";
import api from "../../../services/api";
import ActionButton from "../../../components/action_button/ActionButton";
import { TextField } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

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
          {...register("model")}
          sx={{ width: 320, background: "white" }}
        />
        <TextField
          label="Placa"
          required={true}
          {...register("plate")}
          sx={{ width: 320, background: "white" }}
        />
        <TextField
          label="Cor"
          required={true}
          {...register("color")}
          sx={{ width: 320, background: "white" }}
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
