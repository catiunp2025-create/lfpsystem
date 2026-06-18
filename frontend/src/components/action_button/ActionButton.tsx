import "./style.css";
import type React from "react";

type ActionButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant: "primary" | "secondary";
  type?: "button" | "submit";
  form?: string;
};

function ActionButton({
  children,
  onClick: onCLick,
  disabled: disable = false,
  startIcon,
  endIcon,
  variant = "primary",
  type = "button",
  form,
}: ActionButtonProps) {
  return (
    <button
      type={type}
      className={`action-button ${variant}`}
      disabled={disable}
      onClick={onCLick}
      form={form}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
}

export default ActionButton;
