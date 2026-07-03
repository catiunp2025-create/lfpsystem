import { validateRequiredFields } from "..";
import { type StepData } from "../../../types/newOrder";
import type {
  Address,
  Customer,
  Vehicle,
  VehicleUser,
} from "../../../../../packages/shared/src";
import {
  requiredAddressFields,
  requiredCustomerFields,
  requiredVehicleFields,
  requiredVehicleUserFields,
} from "../../../constants/newOrder";
import "./style.css";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import dayjs from "dayjs";

type ResumeOsProps = {
  currentStepData: StepData;
};

export function ResumeOs({ currentStepData }: ResumeOsProps) {
  const totalValueServices = currentStepData.services
    .reduce((acc, service) => acc + service.value, 0)
    .toFixed(2);
  return (
    <div className="resume-os">
      <div className="resume-os_title">
        <span className="resumo-os_icon">
          <ContentPasteOutlinedIcon sx={{ fontSize: 14 }} />
        </span>
        <h4>Resumo da OS</h4>
      </div>
      <div className="resume-os_section">
        <section>
          <p className="resume-os_label">VEICULO</p>
          {validateRequiredFields<Vehicle>(
            currentStepData.vehicle,
            requiredVehicleFields,
          ) ? (
            <p className="resume-os_primary">
              {currentStepData.vehicle.plate}
              <span className="resume-os_secondary"> - </span>
              <span className="resume-os_secondary">
                {currentStepData.vehicle.model}
              </span>
            </p>
          ) : (
            <p className="resume-os_value-empty">Não selecionado</p>
          )}
        </section>
        <section>
          <div>
            <p className="resume-os_label">MOTORISTA</p>
            {validateRequiredFields<VehicleUser>(
              currentStepData.driver,
              requiredVehicleUserFields,
            ) ? (
              <p className="resume-os_primary">
                {currentStepData.driver.user.name}
              </p>
            ) : (
              <p className="resume-os_value-empty">
                <RemoveOutlinedIcon />
              </p>
            )}
          </div>
          <div>
            <p className="resume-os_label">AJUDANTE</p>
            {validateRequiredFields<VehicleUser>(
              currentStepData.assistant,
              requiredVehicleUserFields,
            ) ? (
              <p className="resume-os_primary">
                {currentStepData.assistant.user.name}
              </p>
            ) : (
              <p className="resume-os_value-empty">
                <RemoveOutlinedIcon />
              </p>
            )}
          </div>
        </section>
        <div className="separator-resume-os"></div>
        <section>
          <div>
            <p className="resume-os_label">CLIENTE</p>
            {validateRequiredFields<Customer>(
              currentStepData.customer,
              requiredCustomerFields,
            ) ? (
              <p className="resume-os_primary">
                {currentStepData.customer.name}
              </p>
            ) : (
              <p className="resume-os_value-empty">Não selecionado</p>
            )}
          </div>
          <div>
            <p className="resume-os_label">ENDERECO</p>
            {validateRequiredFields<Address>(
              currentStepData.address,
              requiredAddressFields,
            ) ? (
              <div>
                <p className="resume-os_primary">
                  {currentStepData.address.street},{" "}
                  {currentStepData.address.number}
                </p>
                <p className="resume-os_secondary">
                  {currentStepData.address.neighborhood} -{" "}
                  {currentStepData.address.city}/{currentStepData.address.state}
                </p>
              </div>
            ) : (
              <p className="resume-os_value-empty">Não selecionado</p>
            )}
          </div>
        </section>
        <div className="separator-resume-os"></div>
        <section>
          <p className="resume-os_label">SERVICOS</p>
          {currentStepData.services.length > 0 ? (
            currentStepData.services.map((service) => (
              <div key={service.id} className="resume-os_list-services">
                <p className="resume-os_primary">{service.name}</p>
                <span className="resume-os_secondary">
                  R$ {service.value.toFixed(2)}
                </span>
              </div>
            ))
          ) : (
            <p className="resume-os_value-empty">Nenhum serviço</p>
          )}
        </section>
        <div className="separator-resume-os"></div>
        <section className="resume-os_total">
          <p className="resume-os_total-label">Total</p>
          <p className="resume-os_total-value">R$ {totalValueServices}</p>
        </section>
        <div className="separator-resume-os"></div>
        <section>
          <p className="resume-os_label">DATA PREVISTA</p>
          {currentStepData.scheduleDate ? (
            <p className="resume-os_primary">
              {dayjs(currentStepData.scheduleDate).format("DD/MM/YYYY")}
            </p>
          ) : (
            <p className="resume-os_value-empty">Não definida</p>
          )}
        </section>
        <section>
          <p className="resume-os_label">OBSERVACOES</p>
          {currentStepData.observations ? (
            <p className="resume-os_primary">{currentStepData.observations}</p>
          ) : (
            <p className="resume-os_value-empty">Nenhuma</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default ResumeOs;
