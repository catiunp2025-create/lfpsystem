import "./style.css";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CircleNotificationsOutlinedIcon from "@mui/icons-material/CircleNotificationsOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import femaleIcon from "../../assets/female-icon.png";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";

type SidbebarProps = {
  open: boolean;
};

function Sidebar({ open }: SidbebarProps) {
  return (
    <aside className={`sidebar ${open ? "open" : "closed"}`}>
      <div className="sidebar-inner">
        <ul className="sidebar-links">
          <h4>
            <span>Menu Principal</span>
            <div className="menu-separator"></div>
          </h4>
          <li>
            <a href="http://localhost:5173/home">
              <SpaceDashboardOutlinedIcon /> Dashboard
            </a>
          </li>
          <li>
            <a href="http://localhost:5173/new-order">
              <ReceiptLongOutlinedIcon />
              Nova Ordem de Serviço
            </a>
          </li>
          <li>
            <a href="#">
              <LocalShippingOutlinedIcon />
              Cadastrar Veículo
            </a>
          </li>
          <li>
            <a href="#">
              <BadgeOutlinedIcon />
              Cadastrar Funcionário
            </a>
          </li>
          <li>
            <a href="#">
              <Groups2OutlinedIcon />
              Grupos
            </a>
          </li>
          <li>
            <a href="#">
              <CircleNotificationsOutlinedIcon />
              Notificações
            </a>
          </li>
          <li>
            <a href="#">
              <SummarizeOutlinedIcon />
              Relatórios
            </a>
          </li>
          <h4>
            <span>Conta</span>
            <div className="menu-separator"></div>
          </h4>
          <li>
            <a href="#">
              <AccountCircleOutlinedIcon />
              Perfil
            </a>
          </li>
          <li>
            <a href="#">
              <SettingsOutlinedIcon />
              Configurações
            </a>
          </li>
          <li>
            <a href="#">
              <LogoutOutlinedIcon />
              Sair
            </a>
          </li>
        </ul>
        <div className="user-account">
          <div className="user-profile">
            <img src={femaleIcon} alt="User profile picture" />
            <div className="user-detail">
              {/* pegar nome de user */}
              <h3>Eva Murphy</h3>
              {/* pegar cargo de user */}
              <span>Gerente</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
