import "./style.css";
import type React from "react";

type SelectableCardProps = {
  icon?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
  variant?: "vehicle" | "driver" | "assistant" | "customer" | "address";
  className?: string;
};

function SelectableCard({
  icon,
  title,
  subtitle,
  isSelected = false,
  onClick,
  variant,
  className,
}: SelectableCardProps) {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      className={`
        selectable-card 
        ${isSelected ? "selected" : ""} 
        ${variant ? `selectable-card--${variant}` : ""} 
        ${className ?? ""}`}
      onClick={onClick}
    >
      {icon && <div className="selectable-card-icon">{icon}</div>}
      <div className="selectable-card-content">
        <p className="selectable-card-title">{title}</p>
        {subtitle && <p className="selectable-sub-title">{subtitle}</p>}
      </div>
    </button>
  );
}

export default SelectableCard;
