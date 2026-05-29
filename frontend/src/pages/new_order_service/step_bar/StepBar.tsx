import { type Step, steppers } from "../../../constants/newOrder";
import type { StepNumber, StepStatus } from "../../../types/newOrder";
import "./style.css";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

type SteppersProps = {
  currentStep?: number;
  maxVisitedStep?: number;
  completedSteps: Set<StepNumber>;
  onStepChange?: (step: StepNumber) => void;
};

export function Steppers({
  currentStep = 1,
  maxVisitedStep = 1,
  completedSteps,
  onStepChange,
}: SteppersProps) {
  const steps: Step[] = steppers;

  // Configura visual das steps de acordo com estado para cada step
  function getStepStatus(step: StepNumber): StepStatus {
    if (step === currentStep) {
      return "active";
    }

    if (completedSteps.has(step)) {
      return "completed";
    }

    if (step <= maxVisitedStep) {
      return "visited";
    }

    return "inactive";
  }

  return (
    <nav className="steppers-container" aria-label="Progresso do formulário">
      {steps.map((step, index) => {
        const status = getStepStatus(step.id);

        return (
          <div key={step.id} className="stepper-item">
            <button
              type="button"
              onClick={() => status !== "inactive" && onStepChange?.(step.id)}
              className={`step-button ${status}`}
              disabled={status === "inactive"}
              aria-current={status === "active" ? "step" : undefined}
              aria-label={`Ir para etapa ${step.id}: ${step.title}`}
            >
              <span className="step-symbol">
                {status === "completed" ? (
                  <CheckOutlinedIcon fontSize="small" />
                ) : (
                  step.id
                )}
              </span>

              <div className="step-details">
                <p className="step-title">{step.title}</p>
                <p className="step-subtitle">{step.subTitle}</p>
              </div>
            </button>
            {index < steps.length - 1 && (
              <div
                className={`step-connector ${status === "completed" ? "completed" : ""}`}
              ></div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export default Steppers;
