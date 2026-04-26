import page from "../../assets/page.png";
import "./style.css";

type BlocoSuperiorProps = {
  toggleSidebar: () => void;
};

export function BlocoSuperior({ toggleSidebar }: BlocoSuperiorProps) {
  return (
    <header className="bloco-superior">
      <button
        type="button"
        onClick={toggleSidebar}
        className="button-sidebar"
      >
        {/*<img src={page} alt="Ícone do sistema" />*/}☰
      </button>
      <div>
        <p>CATI - Sistema LFP</p>
      </div>
    </header>
  );
}
