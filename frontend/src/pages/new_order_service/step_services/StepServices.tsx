import "./style.css";
import StepHeader from "../step_header/StepHeader";
import { MODAL_TYPE, type BaseStepProps } from "../../../types/newOrder";
import type { Service } from "../../../../../packages/shared/src";
import ActionButton from "../../../components/action_button/ActionButton";
import ServiceCard from "../../../components/service_card/ServiceCard";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";

type StepServicesProps = BaseStepProps & {
  refresh: number;
  handleToggleService: (services: Service) => void;
};

function StepServices({
  currentStep,
  currentStepData,
  onBack,
  onNext,
  validateStep,
  refresh,
  handleToggleService,
  handleOpenModal,
}: StepServicesProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [serviceLoading, setServiceLoading] = useState(false);
  const [serviceError, setServiceError] = useState<string | null>(null);

  async function fetchServiceList() {
    setServiceLoading(true);
    setServiceError(null);

    try {
      const response = await api.get("/services");
      setServices(response.data);
    } catch (error) {
      setServiceError("Não foi possível listar os servicos");
    } finally {
      setServiceLoading(false);
    }
  }

  useEffect(() => {
    fetchServiceList();
  }, []);

  useEffect(() => {
    fetchServiceList();
  }, [refresh]);

  return (
    <div className="step-services">
      <StepHeader
        currentStep={currentStep}
        stepTitle="Selecionar Servicos"
        stepSubtitle="Escolha um ou mais servicos para compor a ordem."
      >
        {
          <ActionButton
            onClick={() =>
              handleOpenModal && handleOpenModal(MODAL_TYPE.SERVICE)
            }
            disabled={false}
            startIcon={<AddOutlinedIcon fontSize="small" />}
            variant="primary"
          >
            Novo
          </ActionButton>
        }
      </StepHeader>
      <div className="content-separator-horizontal"></div>
      <section className="step-servies_list">
        {serviceLoading ? (
          <p>Carregando...</p>
        ) : serviceError ? (
          <div>
            <span>{serviceError}</span>
            <button className="button-retry" onClick={fetchServiceList}>
              Tentar novamente
            </button>
          </div>
        ) : !services.length ? (
          <p>Ainda sem serviços</p>
        ) : (
          services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              selected={currentStepData.services.some(
                (item) => item.id === service.id,
              )}
              onClick={() => handleToggleService(service)}
            />
          ))
        )}
      </section>
      <div className="content-separator-horizontal"></div>
      <div className="step-services_footer">
        <ActionButton
          onClick={onBack}
          disabled={false}
          variant="secondary"
          startIcon={<KeyboardBackspaceOutlinedIcon fontSize="small" />}
        >
          Voltar
        </ActionButton>
        <ActionButton
          onClick={onNext}
          disabled={!validateStep()}
          variant="primary"
          endIcon={<EastOutlinedIcon fontSize="small" />}
        >
          Próximo
        </ActionButton>
      </div>
    </div>
  );
}

export default StepServices;
