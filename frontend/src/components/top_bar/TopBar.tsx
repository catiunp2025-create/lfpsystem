import "./style.css";
import { APP_CONFIG } from "../../constants/app";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

type TopBarProps = {
  toggleSidebar: () => void;
  pageTitle: string;
};

export function TopBar({ toggleSidebar, pageTitle }: TopBarProps) {
  return (
    <header className="bloco-superior">
      <button type="button" onClick={toggleSidebar} className="button-sidebar">
        <MenuOutlinedIcon fontSize="small" />
      </button> 
      <div className="topbar-title">
        <span>{APP_CONFIG.name}</span>
        <span className="topbar-divider">-</span>
        <span className="topbar-subtitle">{pageTitle}</span>
      </div>
    </header>
  );
}
