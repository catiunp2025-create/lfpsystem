import "./style.css";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

export function BlocoSuperiorLogin() {
  return (
    <header className="bloco-superior-login">
      <span className="icon-bloco-superior">{<DescriptionOutlinedIcon />}</span>
      <div>
        <p>CATI - Sistema LFP</p>
      </div>
    </header>
  );
}
