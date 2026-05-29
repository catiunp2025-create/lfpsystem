import "./style.css";

type StepHeaderProps = {
  currentStep: number;
  stepTitle: string;
  stepSubtitle: string;

  children?: React.ReactNode;
};

function StepHeader({
  currentStep,
  stepTitle,
  stepSubtitle,
  children,
}: StepHeaderProps) {
  return (
    <div className="step-header">
      <div className="step-header_details">
        <p className="step-header_title">Etapa {currentStep}</p>
        <h2>{stepTitle}</h2>
        <p>{stepSubtitle}</p>
      </div>
      {children && <div className="step-header_actions">{children}</div>}
    </div>
  );
}

export default StepHeader;
