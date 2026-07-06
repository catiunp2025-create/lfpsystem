import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
import api from "../../services/api";
import type { Role } from "../../../../packages/shared/src";

type SidebarProps = {
  open: boolean;
};

type CurrentUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
};

const roleLabel: Record<Role, string> = {
  MANAGER: "Gerente",
  EMPLOYEE: "Funcionário",
};

function Sidebar({ open }: SidebarProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    api.get<CurrentUser>("/auth/me").then((res) => setUser(res.data));
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <aside className={`sidebar ${open ? "open" : "closed"}`}>
      <div className="sidebar-inner">
        <ul className="sidebar-links">
          <h4>
            <span>Menu Principal</span>
            <div className="menu-separator"></div>
          </h4>
          <li>
            <Link to="/dashboard">
              <SpaceDashboardOutlinedIcon /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/new-order">
              <ReceiptLongOutlinedIcon />
              Nova Ordem de Serviço
            </Link>
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
            <button onClick={handleLogout}>
              <LogoutOutlinedIcon />
              Sair
            </button>
          </li>
        </ul>
        <div className="user-account">
          <div className="user-profile">
            <img src={femaleIcon} alt="User profile picture" />
            <div className="user-detail">
              <h3>{user?.name ?? "..."}</h3>
              <span>{user ? roleLabel[user.role] : "..."}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
