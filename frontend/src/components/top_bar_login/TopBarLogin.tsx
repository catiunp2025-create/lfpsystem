import "./style.css";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { APP_CONFIG } from "../../constants/app";

export function TopBarLogin() {
  return (
    <div className="bloco-superior-login">
      <span className="icon-bloco-superior">
        {<DescriptionOutlinedIcon fontSize="small" />}
      </span>
      <div>
        <span>{`${APP_CONFIG.name} - ${APP_CONFIG.fullName}`}</span>
      </div>
    </div>
  );
}
