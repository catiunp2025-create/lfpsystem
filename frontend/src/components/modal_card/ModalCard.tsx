import type React from "react";
import "./style.css";

type ModalCardProps = {
  children: React.ReactNode;
};

function ModalCard({ children }: ModalCardProps) {
  return (
    <div className="modal-background">
      <div className="modal-content">{children}</div>
    </div>
  );
}

export default ModalCard;
