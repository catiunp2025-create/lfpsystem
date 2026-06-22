import type React from "react";
import "./style.css";

type ModalCardProps = {
  children: React.ReactNode;
  title: string;
  titleIcon?: React.ReactNode;
};

function ModalCard({ children, title, titleIcon }: ModalCardProps) {
  return (
    <div className="modal-background">
      <div className="modal-content">
        <div className="modal-header">
          {titleIcon}
          <h2 className="modal-title">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
}

export default ModalCard;
