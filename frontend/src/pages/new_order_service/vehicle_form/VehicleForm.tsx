import ModalCard from "../../../components/modal_card/ModalCard";
import { useForm } from "react-hook-form";
import api from "../../../services/api";
import ActionButton from "../../../components/action_button/ActionButton";

type VehicleFormProps = {
  handleCloseModal: () => void;
};

type Vehicleinput = {
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
  } = useForm<Vehicleinput>({
    mode: "onChange",
    defaultValues: { model: "", color: "", plate: "" },
  });

  const onSubmit = async (data: Vehicleinput) => {
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
    <ModalCard>
      <form
        id="vehicle-form"
        className="modal_container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="modal_input">
          <label htmlFor="model">Modelo</label>
          <input
            id="model"
            type="text"
            {...register("model", { required: "Informe o modelo" })}
          />
        </div>
        <div className="modal_input">
          <label htmlFor="color">Cor</label>
          <input
            id="color"
            type="text"
            {...register("color", { required: "Informe a cor" })}
          />
        </div>
        <div className="modal_input">
          <label htmlFor="plate">Placa</label>
          <input
            id="plate"
            type="text"
            {...register("plate", { required: "Informe a placa" })}
          />
        </div>
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
