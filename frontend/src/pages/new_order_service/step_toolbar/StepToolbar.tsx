import type React from "react";
import "./style.css";

type StepToolbarProps = {
  children: React.ReactNode;
};

function StepToolbar({ children }: StepToolbarProps) {
  return <div className="step-toolbar">{children}</div>;
}

export default StepToolbar;