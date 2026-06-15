import "./style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import type { StepData } from "../../../types/newOrder";
import ActionButton from "../../../components/action_button/ActionButton";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

type OrderReviewProps = {
  currentStepData: StepData;
  handleCloseModal?: () => void;
};

function OrderReview({ currentStepData, handleCloseModal }: OrderReviewProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit() {
    setLoading(true);
    setError(null);

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

      navigate("/home");
    } catch {
      setError("Não foi possível criar a ordem de serviço.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="order-review">
      <div className="order-review_header">
        <h3>Revisar Ordem de Serviço</h3>
      </div>
      <div className="order-review_body">
        <p><strong>Veículo:</strong> {currentStepData.vehicle?.plate} — {currentStepData.vehicle?.model}</p>
        <p><strong>Motorista:</strong> {currentStepData.driver?.user?.name}</p>
        <p><strong>Assistente:</strong> {currentStepData.assistant?.user?.name}</p>
        <p><strong>Cliente:</strong> {currentStepData.customer?.name}</p>
        <p><strong>Endereço:</strong> {currentStepData.address?.street}, {currentStepData.address?.number}</p>
        <p><strong>Serviços:</strong> {currentStepData.services.map((s) => s.name).join(", ")}</p>
        <p><strong>Data:</strong> {currentStepData.scheduleDate}</p>
        {currentStepData.observations && (
          <p><strong>Observações:</strong> {currentStepData.observations}</p>
        )}
      </div>
      {error && <p className="order-review_error">{error}</p>}
      <div className="order-review_footer">
        <ActionButton onClick={handleCloseModal} variant="secondary" disabled={loading}>
          Cancelar
        </ActionButton>
        <ActionButton
          onClick={handleSubmit}
          variant="primary"
          disabled={loading}
          startIcon={<CheckCircleOutlineOutlinedIcon fontSize="small" />}
        >
          {loading ? "Criando..." : "Confirmar OS"}
        </ActionButton>
      </div>
    </div>
  );
}

export default OrderReview;
