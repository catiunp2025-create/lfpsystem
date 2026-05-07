import "./style.css";

type BlocoSuperiorProps = {
  toggleSidebar: () => void;
};

export function BlocoSuperior({ toggleSidebar }: BlocoSuperiorProps) {
  return (
    <header className="bloco-superior">
      <button type="button" onClick={toggleSidebar} className="button-sidebar">
        ☰
      </button>
      <div>
        <p>CATI - Sistema LFP</p>
      </div>
    </header>
  );
}
