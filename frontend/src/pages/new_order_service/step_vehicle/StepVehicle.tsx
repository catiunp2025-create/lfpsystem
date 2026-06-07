import "./style.css";
import type { Vehicle, VehicleUser } from "../../../../../packages/shared/src";
import {
  MODAL_TYPE,
  type BaseStepProps,
  type TypeVehicleUser,
} from "../../../types/newOrder";
import StepHeader from "../step_header/StepHeader";
import SelectableCard from "../../../components/selectable_card/SelectableCard";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import ActionButton from "../../../components/action_button/ActionButton";
import {
  mockVehicles,
  mockVehicleUsers,
} from "../../../mocks/stepvehicle.mock";

type StepVehicleProps = BaseStepProps & {
  handleSelectVehicleStep: (vehicle: Vehicle) => void;
  handleSelectVehicleUserStep: (
    vehicleUser: VehicleUser,
    vehicleUserType: TypeVehicleUser,
  ) => void;
};

function StepVehicle({
  currentStep,
  currentStepData,
  onNext,
  validateStep,
  handleOpenModal,
  handleSelectVehicleStep,
  handleSelectVehicleUserStep,
}: StepVehicleProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [employees, setEmployees] = useState<VehicleUser[]>([]);
  const [loadingVehicles, setLoadingVehicles] = useState(false);
  const [errorVehicles, setErrorVehicles] = useState<string | null>(null);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [errorEmployees, setErrorEmployees] = useState<string | null>(null);

  const drivers = employees.filter((employee) => employee.type === "DRIVER");

  const assistants = employees.filter(
    (employee) => employee.type === "ASSISTANT",
  );

  async function fetchVehicleListData() {
    setLoadingVehicles(true);
    setErrorVehicles(null);

    try {
      // const response = await api.get("/vehicles");
      setVehicles(mockVehicles); // response.data | mockVehicles
    } catch (errorVehicles) {
      setErrorVehicles("Não foi possível listar veículos");
    } finally {
      setLoadingVehicles(false);
    }
  }

  async function fetchVehicleUserListData() {
    setLoadingEmployees(true);
    setErrorEmployees(null);

    try {
      // const response = await api.get("/vehicle-users");
      setEmployees(mockVehicleUsers); // response.data | mockVehicleUsers
    } catch (error) {
      setErrorEmployees("Não foi possível listar funcionários");
    } finally {
      setLoadingEmployees(false);
    }
  }

  useEffect(() => {
    fetchVehicleListData();
    fetchVehicleUserListData();
  }, []);

  return (
    <div className="step-vehicle">
      <StepHeader
        currentStep={currentStep}
        stepTitle="Selecionar Veiculo"
        stepSubtitle="Escolha o veiculo e a equipe que realizara o servico"
      >
        {
          <ActionButton
            onClick={() =>
              handleOpenModal && handleOpenModal(MODAL_TYPE.VEHICLE)
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
      <section className="step-vehicle_content">
        <div className="step-vehicle_lists">
          <h3 className="step-list-titles">Veículos</h3>
          <div className="step-vehicle_list-vehicles">
            {loadingVehicles ? (
              <div className="loading-skeleton">Carregando dados...</div>
            ) : errorVehicles ? (
              <div>
                <span>{errorVehicles}</span>
                <button className="button-retry" onClick={fetchVehicleListData}>
                  Tentar novamente
                </button>
              </div>
            ) : !vehicles.length ? (
              <p>Ainda sem veículos</p>
            ) : (
              vehicles.map((vehicle) => (
                <SelectableCard
                  key={vehicle.id}
                  icon={<LocalShippingOutlinedIcon sx={{ fontSize: 16 }} />}
                  title={vehicle.plate}
                  subtitle={
                    <>
                      {vehicle.model} - {vehicle.color}
                    </>
                  }
                  isSelected={currentStepData.vehicle?.id === vehicle.id}
                  onClick={() => handleSelectVehicleStep(vehicle)}
                />
              ))
            )}
          </div>
        </div>
        <div className="content-separator-vertical"></div>
        <div className="step-vehicle_lists">
          <h3 className="step-list-titles">Motoristas</h3>
          <div className="step-vehicle_list-drivers">
            {loadingEmployees ? (
              <div className="loading-skeleton">Carregando dados...</div>
            ) : errorEmployees ? (
              <div>
                <span>{errorVehicles}</span>
                <button className="button-retry" onClick={fetchVehicleListData}>
                  Tentar novamente
                </button>
              </div>
            ) : !drivers.length ? (
              <p>Ainda sem motoristas</p>
            ) : (
              drivers.map((driver) => (
                <SelectableCard
                  key={driver.id}
                  icon={<PersonOutlineOutlinedIcon sx={{ fontSize: 16 }} />}
                  title="MOTORISTA"
                  subtitle={driver.user.name}
                  isSelected={currentStepData.driver?.id === driver.id}
                  onClick={() => handleSelectVehicleUserStep(driver, "driver")}
                />
              ))
            )}
          </div>
        </div>
        <div className="content-separator-vertical"></div>
        <div className="step-vehicle_lists">
          <h3 className="step-list-titles">Assistentes</h3>
          <div className="step-vehicle_list-assistants">
            {loadingEmployees ? (
              <div className="loading-skeleton">Carregando dados...</div>
            ) : errorEmployees ? (
              <div>
                <span>{errorVehicles}</span>
                <button className="button-retry" onClick={fetchVehicleListData}>
                  Tentar novamente
                </button>
              </div>
            ) : !assistants.length ? (
              <p>Ainda sem assistentes</p>
            ) : (
              assistants.map((assistant) => (
                <SelectableCard
                  key={assistant.id}
                  icon={<PersonOutlineOutlinedIcon sx={{ fontSize: 16 }} />}
                  title="ASSISTENTE"
                  subtitle={assistant.user.name}
                  isSelected={currentStepData.assistant?.id === assistant.id}
                  onClick={() =>
                    handleSelectVehicleUserStep(assistant, "assistant")
                  }
                />
              ))
            )}
          </div>
        </div>
      </section>
      <div className="content-separator-horizontal"></div>
      <div className="step-vehicle_footer">
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

export default StepVehicle;
