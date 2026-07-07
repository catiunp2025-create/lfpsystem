import "./style.css";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import type { StepData } from "../../../types/newOrder";
import ActionButton from "../../../components/action_button/ActionButton";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ModalCard from "../../../components/modal_card/ModalCard";
import ReviewField from "./review_field/ReviewlField";
import { Box, Chip, Divider } from "@mui/material";
import ReviewSection from "./review_section/ReviewSection";

type OrderReviewProps = {
  currentStepData: StepData;
  handleCloseModal?: () => void;
};

function OrderReview({ currentStepData, handleCloseModal }: OrderReviewProps) {
  const navigate = useNavigate();

  async function handleSubmit() {
    const vehicleUserIds = [
      currentStepData.driver?.id,
      currentStepData.assistant?.id,
    ].filter(Boolean) as string[];

    try {
      await api.post("/order-services", {
        vehicleUserIds,
        date: new Date(currentStepData.scheduleDate!),
        addressId: currentStepData.address.id,
        serviceIds: currentStepData.services.map((s) => s.id),
      });

      navigate("/dashboard");
    } catch {
      alert("Erro ao criar ordem de serviço.");
    }
  }

  return (
    <ModalCard
      title="Revisar Ordem de Serviço"
      titleIcon={<PostAddOutlinedIcon fontSize="large" />}
    >
      <div className="modal_container">
        <ReviewSection title="Dados Gerais">
          <ReviewField label="Cliente" value={currentStepData.customer?.name} />
          <ReviewField
            label="Endereço"
            value={`${currentStepData.address?.street} — ${currentStepData.address?.number}`}
          />
          <Divider sx={{ gridColumn: "span 2" }} />
          <ReviewField
            label="Veículo"
            value={`${currentStepData.vehicle?.plate} — ${currentStepData.vehicle?.model}`}
          />
          <ReviewField
            label="Motorista"
            value={currentStepData.driver?.user.name}
          />
          <ReviewField
            label="Assistente"
            value={currentStepData.assistant?.user.name}
          />
        </ReviewSection>
        <ReviewSection title="Serviços">
          <Box
            sx={{
              display: {
                xs: "flex",
                md: "grid",
              },
              flexDirection: {
                xs: "column",
              },
              gridTemplateColumns: { md: "repeat(3, 1fr)" },
              gap: 1,
            }}
          >
            {currentStepData.services.map((service) => (
              <Chip key={service.id} label={service.name} />
            ))}
          </Box>
        </ReviewSection>
        <ReviewSection title="Informações adicionais">
          {currentStepData.scheduleDate && (
            <ReviewField
              label="Data Prevista"
              value={currentStepData.scheduleDate}
            />
          )}
          {currentStepData.observations && (
            <ReviewField
              label="Observações"
              value={currentStepData.observations}
            />
          )}
        </ReviewSection>
      </div>
      <div className="modal_footer">
        <ActionButton
          disabled={false}
          onClick={handleCloseModal}
          variant="secondary"
        >
          Cancelar
        </ActionButton>
        <ActionButton
          onClick={handleSubmit}
          variant="primary"
          disabled={false}
          startIcon={<CheckCircleOutlineOutlinedIcon fontSize="small" />}
        >
          Confirmar OS
        </ActionButton>
      </div>
    </ModalCard>
  );
}

export default OrderReview;
