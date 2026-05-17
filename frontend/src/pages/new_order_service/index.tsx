import "./style.css";
import { MainLayout } from "../../components/layout/MainLayout";
import { Steppers } from "./step_bar/StepBar";
import { ResumeOs } from "./resume_os/ResumeOs";
import { useState } from "react";

/* Para usar nas Steps como tipo de props */
export type BaseStepProps = {
  onNext: () => void;
  onBack?: () => void;
  completeCurrentStep: () => void;
};

function NewOrderService() {
  const [currentStep, setCurrentStep] = useState(1);
  const [maxVisitedStep, setMaxVisitedStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [currentVehicle, setCurrentVehicle] = useState(1);

  /* Adicionar conforme cria as Steps */
  /* const stepsConfig = [StepVeiculo, StepCliente, StepServicos, StepFinalizar];
  const CurrentComponent = stepsConfig[currentStep - 1]; */

  const completeCurrentStep = () => {
    setCompletedSteps((prev) => new Set(prev).add(currentStep));
  };

  const nextStep = () => {
    completeCurrentStep();

    setCurrentStep((prev) => {
      const next = prev + 1;

      setMaxVisitedStep((visited) => Math.max(visited, next));

      return next;
    });
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleStepChange = (step: number) => {
    if (step <= maxVisitedStep) {
      setCurrentStep(step);
    }
  };

  return (
    <MainLayout pageTitle="Nova ordem de serviço">
      <Steppers
        currentStep={currentStep}
        maxVisitedStep={maxVisitedStep}
        completedSteps={completedSteps}
        onStepChange={handleStepChange}
      />
      <div className="content-steppers">
        <div className="step-content">
          <h2>Conteúdo da Step</h2>
          {/* <CurrentComponent
        onNext={curentStep < 4 ? nextStep : undefined}
        onBack={currentStep > 1 ? prevStep : undefined}
        completeCurrentStep={completeCurrentStep}
      /> */}
          {/* Formato do botão voltar nas Steps 2+
        {onBack && <button onClick={onBack}>Voltar</button>} */}
        </div>
        <div className="resume-content">
          <ResumeOs />
        </div>
      </div>
    </MainLayout>
  );
}

export default NewOrderService;
