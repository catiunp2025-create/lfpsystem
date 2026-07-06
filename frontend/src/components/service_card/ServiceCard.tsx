import type { Service } from "../../../../packages/shared/src";
import { formatCurrency } from "../../utils/FormatCurrency";
import "./style.css";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";

type ServiceCardProps = {
  service: Service;
  selected: boolean;
  compact?: boolean;
  onClick: () => void;
};

function ServiceCard({
  service,
  selected,
  compact,
  onClick,
}: ServiceCardProps) {
  return (
    <button
      className={`service-card ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className="service-card_checkbox">
        {selected ? (
          <CheckBoxOutlinedIcon
            sx={{
              color: "var(--color-primary)",
              fontSize: 28,
            }}
          />
        ) : (
          <CheckBoxOutlineBlankOutlinedIcon
            sx={{
              color: "var(--color-border-light)",
              fontSize: 28,
            }}
          />
        )}
      </div>

      <div className="service-card_content">
        <h3 className="service-card_title">{service.name}</h3>
        {!compact && (
          <p className="service-card_description">{service.description}</p>
        )}
      </div>

      <span className="service-card_value">
        {formatCurrency(service.value)}
      </span>
    </button>
  );
}

export default ServiceCard;
