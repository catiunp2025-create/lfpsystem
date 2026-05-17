import "./style.css";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";

export function ResumeOs() {
  return (
    <div className="resume-os">
      <div className="resume-os_title">
        <span className="resumo-os_icon">
          <ContentPasteOutlinedIcon sx={{ fontSize: 14 }} />
        </span>
        <h4>Resumo da OS</h4>
      </div>
      <div className="resume-os_section">
        <section>
          <p className="resume-os_label">VEICULO</p>
          <p className="resume-os_primary">
            DEF-4G56
            <span className="resume-os_secondary"> - </span>
            <span className="resume-os_secondary">Renault Master</span>
          </p>
        </section>
        <section>
          <div>
            <p className="resume-os_label">MOTORISTA</p>
            <p className="resume-os_primary">Rafael Santos Costa</p>
          </div>
          <div>
            <p className="resume-os_label">AJUDANTE</p>
            <p className="resume-os_primary">Fernando Almeida Junior</p>
          </div>
        </section>
        <div className="separator-resume-os"></div>
        <section>
          <div>
            <p className="resume-os_label">CLIENTE</p>
            <p className="resume-os_primary">Restaurante Sabor da Terra</p>
          </div>
          <div>
            <p className="resume-os_label">ENDERECO</p>
            <p className="resume-os_primary">Rua XV de Novembro, 320</p>
            <span className="resume-os_secondary">Boa Vista — Curitiba/PR</span>
          </div>
        </section>
        <div className="separator-resume-os"></div>
        <section>
          <p className="resume-os_label">SERVICOS</p>
          {/* Fazer map da lista de serviços selecionados */}
          <div className="resume-os_list-services">
            <p className="resume-os_primary">Sanitizacao de Ambientes</p>
            <span className="resume-os_secondary">R$ 450,00</span>
          </div>
        </section>
        <div className="separator-resume-os"></div>
        <section className="resume-os_total">
          <p className="resume-os_total-label">Total</p>
          <p className="resume-os_total-value">R$ 580,00</p>
        </section>
        <div className="separator-resume-os"></div>
        <section>
          <p className="resume-os_label">Data prevista</p>
          <p className="resume-os_primary">07/05/2026</p>
        </section>
      </div>
    </div>
  );
}

export default ResumeOs;
