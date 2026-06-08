import "./style.css";
import type React from "react";

type ActionButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant: "primary" | "secondary";
};

function ActionButton({
  children,
  onClick: onCLick,
  disabled: disable = false,
  startIcon,
  endIcon,
  variant = "primary",
}: ActionButtonProps) {
  return (
    <button
      type="button"
      className={`action-button ${variant}`}
      disabled={disable}
      onClick={onCLick}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
}

export default ActionButton;
