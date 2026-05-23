import "./style.css";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import type { RegisterType } from "../../../types/newOrder";
import ActionButton from "../../../components/action_button/ActionButton";

type StepHeaderProps = {
  currentStep: number;
  stepTitle: string;
  stepSubtitle: string;
  registerType: RegisterType;
  handleNewRegisterChange?: (type: RegisterType) => void;
};

function StepHeader({
  currentStep,
  stepTitle,
  stepSubtitle,
  registerType,
  handleNewRegisterChange,
}: StepHeaderProps) {
  return (
    <div className="step-header">
      <section className="step-header_details">
        <p className="step-header_title">Etapa {currentStep}</p>
        <h2>{stepTitle}</h2>
        <p>{stepSubtitle}</p>
      </section>
      <section className="step-header_button-new">
        {handleNewRegisterChange && registerType && (
          <ActionButton
            onClick={() => handleNewRegisterChange(registerType)}
            disabled={false}
            startIcon={<AddOutlinedIcon fontSize="small" />}
            variant="primary"
          >
            Novo
          </ActionButton>
        )}
      </section>
    </div>
  );
}

export default StepHeader;
