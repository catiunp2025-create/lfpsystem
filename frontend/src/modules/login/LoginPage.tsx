import React, { useRef } from "react";
import api from "../../services/api";
import "./style.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/LFP-Logo.png";
import { TopBarLogin } from "../../components/top_bar_login/TopBarLogin";
import { TextField, useMediaQuery } from "@mui/material";
import PasswordField from "../../components/password_field/PasswordField";

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
      alert("Email ou senha inválidos");
      navigate("/login");
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

          <TextField
            type="email"
            label="E-mail"
            variant="outlined"
            fullWidth
            required
            inputRef={inputEmail}
          />

          <PasswordField inputRef={inputPass} />

          <button type="submit" className="login-submit">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
