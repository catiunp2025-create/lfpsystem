import { type Step, steppers } from "../../../constants/stepbar";
import "./style.css";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

type SteppersProps = {
  currentStep?: number;
  maxVisitedStep?: number;
  completedSteps: Set<number>;
  onStepChange?: (step: number) => void;
};

export function Steppers({
  currentStep = 1,
  maxVisitedStep = 1,
  completedSteps,
  onStepChange,
}: SteppersProps) {
  const steps: Step[] = steppers;

  return (
    <nav className="stepper-container" aria-label="Progresso do formulário">
      {steps.map((step, index) => {
        const isActive = step.id === currentStep;
        const isCompleted = completedSteps.has(step.id);
        const isVisited = step.id <= maxVisitedStep;

        return (
          <div key={step.id} className="stepper-item">
            <button
              type="button"
              onClick={() => isVisited && onStepChange?.(step.id)}
              className={`step-button ${
                isActive
                  ? "active"
                  : isCompleted
                    ? "completed"
                    : isVisited
                      ? "visited"
                      : "inactive"
              }`}
              disabled={!isVisited}
              aria-current={isActive ? "step" : undefined}
              aria-label={`Ir para etapa ${step.id}: ${step.title}`}
            >
              <span className="step-symbol">
                {isCompleted ? <CheckOutlinedIcon fontSize="small" /> : step.id}
              </span>

              <div className="step-details">
                <p className="step-title">{step.title}</p>
                <p className="step-subtitle">{step.subTitle}</p>
              </div>
            </button>
            {index < steps.length - 1 && (
              <div
                className={`step-connector ${isCompleted ? "completed" : ""}`}
              ></div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export default Steppers;
