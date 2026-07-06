import React, { useRef } from "react";
import api from "../../services/api";
import "./style.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/LFP-Logo.png";
import { TopBarLogin } from "../../components/top_bar_login/TopBarLogin";
import { useMediaQuery } from "@mui/material";

function Login() {
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputPass = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:768px)");

  async function userLogin(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await api.post("auth/login", {
        email: inputEmail.current?.value,
        password: inputPass.current?.value,
      });

      const { accessToken } = response.data;

      if (accessToken) {
        localStorage.setItem("token", accessToken);
        navigate("/dashboard");
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        navigate("/auth/login");
      }
      console.log(error);
    }
  }

  return (
    <div className="container-login">
      <TopBarLogin />
      <div className="login-card">
        <div className="login-banner">
          <img src={logo} alt="Limpa Fossa Parnamirim" />

          <div className="banner-content">
            <h2>Limpa Fossa Parnamirim</h2>

            <p>Serviço Confiável</p>
            <p>Resultados Profissionais</p>
          </div>
        </div>

        {isMobile && (
          <div className="login-banner_mobile">
            <img src={logo} alt="Limpa Fossa Parnamirim" />
          </div>
        )}

        <form onSubmit={userLogin}>
          <h1>Entrar</h1>

          <input type="email" placeholder="E-mail" ref={inputEmail} />

          <input type="password" placeholder="Senha" ref={inputPass} />

          <button>Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
