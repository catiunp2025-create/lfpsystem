import { useEffect } from "react";
import ModalCard from "../modal_card/ModalCard";
import { useForm } from "react-hook-form";
import ActionButton from "../action_button/ActionButton";
import { TextField } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { masks } from "../../utils/Masks";
import type { Vehicle } from "../../../../packages/shared/src";
import { vehicleRoute } from "../../routes/vehicleRoute";
import { toast } from "react-toastify";
import { MaskedTextField } from "../masked_text_field/MaskedTextField";

export type VehicleFormMode = "create" | "update" | "delete";

type VehicleFormProps = {
  handleCloseModal: () => void;
  mode?: VehicleFormMode;
  vehicle?: Vehicle | null;
};

type VehicleInput = {
  model: string;
  color: string;
  plate: string;
};

function VehicleForm({
  handleCloseModal,
  mode = "create",
  vehicle,
}: VehicleFormProps) {
  const isDeleteMode = mode === "delete";
  const isUpdateMode = mode === "update";
  const defaultSx = {
    width: "100%",
    maxWidth: 320,
    background: "white",
  };

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

  useEffect(() => {
    if (isUpdateMode && vehicle) {
      reset({
        model: vehicle.model,
        color: vehicle.color,
        plate: vehicle.plate,
      });
      return;
    }

    reset({ model: "", color: "", plate: "" });
  }, [isUpdateMode, vehicle, reset]);

  const onSubmit = async (data: VehicleInput) => {
    try {
      if (isDeleteMode && vehicle) {
        await vehicleRoute.delete(vehicle.id);
        toast.success("Veículo excluído com sucesso!");
        handleCloseModal();
        return;
      }

      if (isUpdateMode && vehicle) {
        await vehicleRoute.update(vehicle.id, data);
        toast.success("Veículo atualizado com sucesso!");
      } else {
        await vehicleRoute.create(data.model, data.plate, data.color);
        toast.success("Veículo cadastrado com sucesso!");
      }

      reset();
      handleCloseModal();
    } catch (err: any) {
      const message = isDeleteMode
        ? toast.error("Erro ao excluir veículo.")
        : isUpdateMode
          ? toast.error("Erro ao atualizar veículo.")
          : toast.error("Erro ao registrar veículo.");

      console.error(message, err);
    }
  };

  const title = isDeleteMode
    ? "Excluir veículo"
    : isUpdateMode
      ? "Atualizar veículo"
      : "Cadastrar veículo";

  const titleIcon = isDeleteMode ? (
    <DeleteOutlineOutlinedIcon fontSize="large" />
  ) : (
    <LocalShippingOutlinedIcon fontSize="large" />
  );

  return (
    <ModalCard title={title} titleIcon={titleIcon}>
      {isDeleteMode ? (
        <div className="modal_container">
          <p>Tem certeza que deseja excluir este veículo?</p>
          <p>
            <strong>Modelo:</strong> {vehicle?.model}
          </p>
          <p>
            <strong>Placa:</strong> {vehicle?.plate}
          </p>
          <p>
            <strong>Cor:</strong> {vehicle?.color}
          </p>
        </div>
      ) : (
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
            sx={{
              ...defaultSx,
            }}
          />
          <MaskedTextField
            control={control}
            name="plate"
            label="Placa"
            sx={{
              ...defaultSx,
            }}
            controllerProps={{
              rules: {
                required: "Informe a placa",
              },
              disabled: false,
            }}
            maskProps={{
              mask: masks.plate,
            }}
          />
          <TextField
            label="Cor"
            required={true}
            fullWidth
            {...register("color")}
            sx={{
              ...defaultSx,
            }}
          />
        </form>
      )}
      <div className="modal_footer">
        <ActionButton
          disabled={false}
          onClick={handleCloseModal}
          variant="secondary"
        >
          Fechar
        </ActionButton>
        {isDeleteMode ? (
          <ActionButton
            disabled={false}
            onClick={() => void onSubmit({ model: "", color: "", plate: "" })}
            variant="primary"
          >
            Excluir
          </ActionButton>
        ) : (
          <ActionButton
            type="submit"
            form="vehicle-form"
            disabled={!isValid}
            variant="primary"
          >
            {isUpdateMode ? "Atualizar" : "Confirmar"}
          </ActionButton>
        )}
      </div>
    </ModalCard>
  );
}

export default VehicleForm;
